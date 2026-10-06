import type {
  PensionInputState,
  PensionProjectionResult,
  YearProjectionPoint,
  PensionGoalInputState,
  PensionGoalResult,
  Currency,
} from '../components/Calculator/types';

/**
 * Format currency numbers cleanly (e.g. UGX 68,501,865 or UGX 68.5 m)
 */
export const formatCurrency = (
  amount: number,
  currency: Currency = 'UGX',
  compact = false
): string => {
  if (isNaN(amount)) {
    return `${currency} 0`;
  }

  if (compact) {
    if (Math.abs(amount) >= 1_000_000_000) {
      return `${currency} ${(amount / 1_000_000_000).toFixed(1)} bn`;
    }
    if (Math.abs(amount) >= 1_000_000) {
      return `${currency} ${(amount / 1_000_000).toFixed(1)} m`;
    }
    if (Math.abs(amount) >= 1_000) {
      return `${currency} ${(amount / 1_000).toFixed(0)} k`;
    }
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }

  return `${currency} ${Math.round(amount).toLocaleString('en-US')}`;
};

/**
 * Parses numeric text input removing commas and currency symbols safely
 */
export const parseFormattedNumber = (value: string): number => {
  const clean = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Calculate post-retirement monthly annuity income assuming standard 20-year drawdown
 * at a conservative post-retirement interest rate of 8.5% p.a.
 */
export const calculateMonthlyAnnuity = (
  totalPot: number,
  postRetirementRateAnnual = 0.085,
  drawdownYears = 20
): number => {
  if (totalPot <= 0) return 0;
  const monthlyRate = postRetirementRateAnnual / 12;
  const totalMonths = drawdownYears * 12;
  // Annuity formula: PMT = PV * (r / (1 - (1 + r)^(-n)))
  const factor = (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return totalPot * factor;
};

/**
 * Calculate required lump sum to yield a desired monthly income in retirement
 */
export const calculateRequiredLumpSumForIncome = (
  monthlyIncome: number,
  postRetirementRateAnnual = 0.085,
  drawdownYears = 20
): number => {
  if (monthlyIncome <= 0) return 0;
  const monthlyRate = postRetirementRateAnnual / 12;
  const totalMonths = drawdownYears * 12;
  const factor = (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return monthlyIncome / factor;
};

/**
 * Calculates complete forward accumulation projection for a pension scheme
 */
export const calculatePensionAccumulation = (
  inputs: PensionInputState
): PensionProjectionResult => {
  const currentAge = Math.max(18, Math.min(inputs.currentAge, 74));
  const retirementAge = Math.max(currentAge + 1, Math.min(inputs.retirementAge, 75));
  const yearsToRetirement = retirementAge - currentAge;

  const initialPot = Math.max(0, inputs.initialPot);

  // Return rates (annual)
  const likelyRate = inputs.expectedReturnRate / 100;
  // Base case: conservative scenario (-2.5% or 9%)
  const baseRate = Math.max(0.04, likelyRate - 0.03);
  // Best case: optimistic scenario (+2.5%)
  const bestRate = likelyRate + 0.025;

  const monthlyLikelyRate = likelyRate / 12;
  const monthlyBaseRate = baseRate / 12;
  const monthlyBestRate = bestRate / 12;

  // Monthly deposit calculation
  let basePersonalMonthly: number;
  let baseEmployerMonthly: number;

  if (inputs.contributionMethod === 'salary') {
    const gross = Math.max(0, inputs.grossMonthlySalary);
    basePersonalMonthly = gross * (inputs.employeeRatePercent / 100) + Math.max(0, inputs.voluntaryMonthlyTopup);
    baseEmployerMonthly = gross * (inputs.employerRatePercent / 100);
  } else {
    basePersonalMonthly = Math.max(0, inputs.monthlyContribution);
    baseEmployerMonthly = 0;
  }

  const yearlyBreakdown: YearProjectionPoint[] = [];

  // Start point (Year 0)
  yearlyBreakdown.push({
    year: 0,
    age: currentAge,
    personalDeposits: initialPot,
    employerDeposits: 0,
    totalDeposits: initialPot,
    interestEarned: 0,
    totalValue: initialPot,
    baseCaseValue: initialPot,
    bestCaseValue: initialPot,
  });

  let runningLikelyPot = initialPot;
  let runningBasePot = initialPot;
  let runningBestPot = initialPot;
  let cumulativePersonal = initialPot;
  let cumulativeEmployer = 0;

  const escalationRate = inputs.annualEscalationRate / 100;

  for (let year = 1; year <= yearsToRetirement; year++) {
    const yearEscalationFactor = Math.pow(1 + escalationRate, year - 1);
    const personalMonthly = basePersonalMonthly * yearEscalationFactor;
    const employerMonthly = baseEmployerMonthly * yearEscalationFactor;
    const totalMonthly = personalMonthly + employerMonthly;

    for (let m = 1; m <= 12; m++) {
      // Add interest for the month
      runningLikelyPot = runningLikelyPot * (1 + monthlyLikelyRate) + totalMonthly;
      runningBasePot = runningBasePot * (1 + monthlyBaseRate) + totalMonthly;
      runningBestPot = runningBestPot * (1 + monthlyBestRate) + totalMonthly;

      cumulativePersonal += personalMonthly;
      cumulativeEmployer += employerMonthly;
    }

    const cumulativeDeposits = cumulativePersonal + cumulativeEmployer;
    const compoundGrowth = Math.max(0, runningLikelyPot - cumulativeDeposits);

    yearlyBreakdown.push({
      year,
      age: currentAge + year,
      personalDeposits: Math.round(cumulativePersonal),
      employerDeposits: Math.round(cumulativeEmployer),
      totalDeposits: Math.round(cumulativeDeposits),
      interestEarned: Math.round(compoundGrowth),
      totalValue: Math.round(runningLikelyPot),
      baseCaseValue: Math.round(runningBasePot),
      bestCaseValue: Math.round(runningBestPot),
    });
  }

  const totalPersonalDeposits = Math.round(cumulativePersonal);
  const totalEmployerDeposits = Math.round(cumulativeEmployer);
  const totalDeposits = totalPersonalDeposits + totalEmployerDeposits;
  const projectedPot = Math.round(runningLikelyPot);
  const totalCompoundGrowth = Math.max(0, projectedPot - totalDeposits);
  const estimatedMonthlyIncome = Math.round(calculateMonthlyAnnuity(projectedPot));

  return {
    projectedPot,
    estimatedMonthlyIncome,
    totalPersonalDeposits,
    totalEmployerDeposits,
    totalDeposits,
    totalCompoundGrowth,
    yearsToRetirement,
    baseCasePot: Math.round(runningBasePot),
    bestCasePot: Math.round(runningBestPot),
    yearlyBreakdown,
  };
};

/**
 * Calculates the required monthly contribution to reach a target retirement pot or income
 */
export const calculatePensionGoal = (
  goalInputs: PensionGoalInputState
): PensionGoalResult => {
  const currentAge = Math.max(18, Math.min(goalInputs.currentAge, 74));
  const retirementAge = Math.max(currentAge + 1, Math.min(goalInputs.retirementAge, 75));
  const yearsToRetirement = retirementAge - currentAge;
  const totalMonths = yearsToRetirement * 12;

  const targetLumpSum =
    goalInputs.goalType === 'monthly_income'
      ? calculateRequiredLumpSumForIncome(goalInputs.targetRetirementIncome)
      : Math.max(0, goalInputs.targetLumpSum);

  const initialPot = Math.max(0, goalInputs.initialPot);
  const annualRate = goalInputs.expectedReturnRate / 100;
  const monthlyRate = annualRate / 12;

  // Future value of initial lump sum: FV_init = P0 * (1 + r)^n
  const fvInitial = initialPot * Math.pow(1 + monthlyRate, totalMonths);
  const remainingNeeded = Math.max(0, targetLumpSum - fvInitial);

  // PMT = FV * r / ((1 + r)^n - 1)
  const compoundFactor = Math.pow(1 + monthlyRate, totalMonths) - 1;
  const requiredMonthlySavings =
    compoundFactor > 0 ? (remainingNeeded * monthlyRate) / compoundFactor : 0;

  // Generate breakdown using forward accumulation with calculated required savings
  const forwardAccumulation = calculatePensionAccumulation({
    mode: 'grow',
    currency: goalInputs.currency,
    schemeType: goalInputs.schemeType,
    currentAge,
    retirementAge,
    initialPot,
    monthlyContribution: Math.round(requiredMonthlySavings),
    contributionMethod: 'fixed',
    grossMonthlySalary: 0,
    employeeRatePercent: 0,
    employerRatePercent: 0,
    voluntaryMonthlyTopup: 0,
    expectedReturnRate: goalInputs.expectedReturnRate,
    annualEscalationRate: 0,
  });

  return {
    requiredMonthlySavings: Math.round(requiredMonthlySavings),
    targetLumpSum: Math.round(targetLumpSum),
    projectedMonthlyIncome: Math.round(calculateMonthlyAnnuity(targetLumpSum)),
    totalDeposits: forwardAccumulation.totalDeposits,
    totalCompoundGrowth: forwardAccumulation.totalCompoundGrowth,
    yearsToRetirement,
    yearlyBreakdown: forwardAccumulation.yearlyBreakdown,
  };
};
