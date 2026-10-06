export type Currency = 'UGX' | 'USD';

export type SchemeType = 'umbrella' | 'individual' | 'occupational';

export type CalculationMode = 'grow' | 'goal';

export type ContributionMethod = 'fixed' | 'salary';

export interface PensionInputState {
  mode: CalculationMode;
  currency: Currency;
  schemeType: SchemeType;
  currentAge: number;
  retirementAge: number;
  initialPot: number;
  // If fixed contribution:
  monthlyContribution: number;
  // If salary-based contribution:
  contributionMethod: ContributionMethod;
  grossMonthlySalary: number;
  employeeRatePercent: number; // e.g., 5%
  employerRatePercent: number; // e.g., 10%
  voluntaryMonthlyTopup: number;
  // Return assumptions
  expectedReturnRate: number; // e.g. 12.5%
  // Optional annual contribution escalation:
  annualEscalationRate: number; // e.g. 0% or 3%
}

export interface PensionGoalInputState {
  targetRetirementIncome: number; // desired monthly income in retirement
  targetLumpSum: number; // or direct target pot
  goalType: 'monthly_income' | 'lump_sum';
  currency: Currency;
  schemeType: SchemeType;
  currentAge: number;
  retirementAge: number;
  initialPot: number;
  expectedReturnRate: number;
}

export interface YearProjectionPoint {
  year: number;
  age: number;
  personalDeposits: number;
  employerDeposits: number;
  totalDeposits: number;
  interestEarned: number;
  totalValue: number;
  baseCaseValue: number;
  bestCaseValue: number;
}

export interface PensionProjectionResult {
  projectedPot: number;
  estimatedMonthlyIncome: number;
  totalPersonalDeposits: number;
  totalEmployerDeposits: number;
  totalDeposits: number;
  totalCompoundGrowth: number;
  yearsToRetirement: number;
  baseCasePot: number;
  bestCasePot: number;
  yearlyBreakdown: YearProjectionPoint[];
}

export interface PensionGoalResult {
  requiredMonthlySavings: number;
  targetLumpSum: number;
  projectedMonthlyIncome: number;
  totalDeposits: number;
  totalCompoundGrowth: number;
  yearsToRetirement: number;
  yearlyBreakdown: YearProjectionPoint[];
}
