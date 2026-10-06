import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Share2, ArrowRight, ShieldCheck, TrendingUp, Building2, User, Landmark } from 'lucide-react';
import type {
  Currency,
  SchemeType,
  CalculationMode,
  ContributionMethod,
  PensionInputState,
} from './types';
import {
  calculatePensionAccumulation,
  calculatePensionGoal,
  formatCurrency,
} from '../../utils/pensionMath';
import { InputSliderGroup } from './InputSliderGroup';
import { PensionGrowthChart } from './PensionGrowthChart';
import { ScenarioComparison } from './ScenarioComparison';
import { BreakdownTable } from './BreakdownTable';
import { AdvisorCallModal } from './AdvisorCallModal';
import { SharePlanModal } from './SharePlanModal';

const SCHEME_CONFIGS: Record<SchemeType, { label: string; icon: React.FC<{ className?: string }>; desc: string }> = {
  umbrella: {
    label: 'Umbrella Scheme',
    icon: Building2,
    desc: 'Multi-employer pooled pension fund with employer matching.',
  },
  individual: {
    label: 'Individual / Voluntary',
    icon: User,
    desc: 'Flexible personal retirement plan for individuals & self-employed.',
  },
  occupational: {
    label: 'Occupational Scheme',
    icon: Landmark,
    desc: 'Segregated institutional pension scheme tailored for corporate sponsors.',
  },
};

export const PensionCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Read initial states from URL query params if provided
  const queryMode = searchParams.get('mode');
  const initialMode: CalculationMode = queryMode === 'goal' ? 'goal' : 'grow';

  const queryCurrency = searchParams.get('currency');
  const initialCurrency: Currency = queryCurrency === 'USD' ? 'USD' : 'UGX';

  const queryScheme = searchParams.get('scheme');
  const initialScheme: SchemeType =
    queryScheme === 'individual' || queryScheme === 'occupational' ? queryScheme : 'umbrella';

  const initialCurAge = parseInt(searchParams.get('curAge') ?? '30', 10);
  const initialRetAge = parseInt(searchParams.get('retAge') ?? '60', 10);
  const initialPotVal = parseInt(searchParams.get('initPot') ?? '5000000', 10);
  const initialMonthly = parseInt(searchParams.get('monthly') ?? '250000', 10);
  const initialReturn = parseFloat(searchParams.get('returnRate') ?? '12.5');

  // Interactive UI State
  const [mode, setMode] = useState<CalculationMode>(initialMode);
  const [currency] = useState<Currency>(initialCurrency);
  const [schemeType, setSchemeType] = useState<SchemeType>(initialScheme);
  const [currentAge, setCurrentAge] = useState<number>(initialCurAge);
  const [retirementAge, setRetirementAge] = useState<number>(initialRetAge);
  const [initialPot, setInitialPot] = useState<number>(initialPotVal);

  // Contribution Method (fixed vs percentage of salary)
  const [contributionMethod, setContributionMethod] = useState<ContributionMethod>('fixed');
  const [monthlyContribution, setMonthlyContribution] = useState<number>(initialMonthly);
  const [grossMonthlySalary, setGrossMonthlySalary] = useState<number>(3000000);
  const [employeeRatePercent, setEmployeeRatePercent] = useState<number>(5);
  const [employerRatePercent, setEmployerRatePercent] = useState<number>(10);
  const [voluntaryMonthlyTopup, setVoluntaryMonthlyTopup] = useState<number>(0);

  // Return & Scenarios
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(initialReturn);
  const [showRange, setShowRange] = useState<boolean>(false);
  const [selectedScenario, setSelectedScenario] = useState<'base' | 'likely' | 'best'>('likely');

  // Goal Mode State
  const [goalType, setGoalType] = useState<'monthly_income' | 'lump_sum'>('monthly_income');
  const [targetRetirementIncome, setTargetRetirementIncome] = useState<number>(3500000);
  const [targetLumpSum, setTargetLumpSum] = useState<number>(500000000);

  // Modals
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Currency multiplier/ranges
  const isUGX = currency === 'UGX';
  const potMin = 0;
  const potMax = isUGX ? 1000000000 : 500000;
  const monthlyMin = 0;
  const monthlyMax = isUGX ? 50000000 : 15000;

  // Compute Active Return Rate based on scenario selection
  const activeRate = useMemo(() => {
    if (selectedScenario === 'base') return Math.max(4, expectedReturnRate - 3.0);
    if (selectedScenario === 'best') return expectedReturnRate + 2.5;
    return expectedReturnRate;
  }, [expectedReturnRate, selectedScenario]);

  // Compute Growth Accumulation
  const accumulationInputs: PensionInputState = useMemo(() => ({
    mode,
    currency,
    schemeType,
    currentAge,
    retirementAge,
    initialPot,
    monthlyContribution,
    contributionMethod,
    grossMonthlySalary,
    employeeRatePercent,
    employerRatePercent,
    voluntaryMonthlyTopup,
    expectedReturnRate: activeRate,
    annualEscalationRate: 0,
  }), [
    mode,
    currency,
    schemeType,
    currentAge,
    retirementAge,
    initialPot,
    monthlyContribution,
    contributionMethod,
    grossMonthlySalary,
    employeeRatePercent,
    employerRatePercent,
    voluntaryMonthlyTopup,
    activeRate,
  ]);

  const accumulationResult = useMemo(
    () => calculatePensionAccumulation(accumulationInputs),
    [accumulationInputs]
  );

  // Compute Goal Mode Result
  const goalResult = useMemo(() => {
    return calculatePensionGoal({
      targetRetirementIncome,
      targetLumpSum,
      goalType,
      currency,
      schemeType,
      currentAge,
      retirementAge,
      initialPot,
      expectedReturnRate: activeRate,
    });
  }, [
    targetRetirementIncome,
    targetLumpSum,
    goalType,
    currency,
    schemeType,
    currentAge,
    retirementAge,
    initialPot,
    activeRate,
  ]);

  // Active projection display
  const activeProjectedPot = mode === 'grow' ? accumulationResult.projectedPot : goalResult.targetLumpSum;
  const activeMonthlyIncome = mode === 'grow' ? accumulationResult.estimatedMonthlyIncome : (goalType === 'monthly_income' ? targetRetirementIncome : goalResult.projectedMonthlyIncome);
  const activeChartData = mode === 'grow' ? accumulationResult.yearlyBreakdown : goalResult.yearlyBreakdown;
  const yearsHorizon = Math.max(1, retirementAge - currentAge);

  const handleOpenAccount = () => {
    void navigate(`/contact?service=pension-retirement&pot=${activeProjectedPot.toString()}&currency=${currency}`);
  };

  return (
    <div className="w-full">
      {/* ── Mode Switcher Tabs ─────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-start gap-4 mb-8">
        <div className="inline-flex p-1.5 bg-gray-100 rounded-full border border-gray-200 shadow-inner">
          <button
            type="button"
            onClick={() => { setMode('grow'); }}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              mode === 'grow'
                ? 'bg-brand-dark text-white shadow-md'
                : 'text-brand-gray/80 hover:text-brand-dark'
            }`}
          >
            Grow my pension
          </button>
          <button
            type="button"
            onClick={() => { setMode('goal'); }}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              mode === 'goal'
                ? 'bg-brand-dark text-white shadow-md'
                : 'text-brand-gray/80 hover:text-brand-dark'
            }`}
          >
            Plan for a retirement goal
          </button>
        </div>
      </div>

      {/* ── Main Split-Panel Card Layout ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* ════ LEFT PANEL: Controls & Inputs (Light Card) ═════ */}
        <div className="lg:col-span-5 bg-[#e1efef]/60 border border-brand-primary/20 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Scheme Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-gray/80 block">
                PENSION SCHEME
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(SCHEME_CONFIGS) as SchemeType[]).map((key) => {
                  const cfg = SCHEME_CONFIGS[key];
                  const Icon = cfg.icon;
                  const isSelected = schemeType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => { setSchemeType(key); }}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-brand-dark text-white border-brand-dark shadow-sm'
                          : 'bg-white text-brand-dark border-gray-200 hover:border-brand-primary'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-brand-green' : 'text-brand-primary'}`} />
                      <span className="text-[11px] font-bold leading-tight block truncate">
                        {cfg.label.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-brand-gray/70 pt-0.5">
                {SCHEME_CONFIGS[schemeType].desc}
              </p>
            </div>

            {/* Age Horizon Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputSliderGroup
                  id="current-age"
                  label="CURRENT AGE"
                  value={currentAge}
                  min={18}
                  max={69}
                  suffix="yrs"
                  minLabel="18 yrs (min legal)"
                  maxLabel="69 yrs"
                  presets={[
                    { label: '25 yrs', value: 25 },
                    { label: '30 yrs', value: 30 },
                    { label: '35 yrs', value: 35 },
                    { label: '45 yrs', value: 45 },
                  ]}
                  onChange={(val) => {
                    setCurrentAge(val);
                    if (val >= retirementAge) {
                      setRetirementAge(Math.min(70, val + 5));
                    }
                  }}
                />
                <InputSliderGroup
                  id="retirement-age"
                  label="RETIREMENT AGE"
                  value={retirementAge}
                  min={Math.max(currentAge + 1, 45)}
                  max={70}
                  suffix="yrs"
                  minLabel={`${Math.max(currentAge + 1, 45).toString()} yrs`}
                  maxLabel="70 yrs (max URBRA)"
                  helperText="Uganda statutory retirement age is 60 (URBRA ceiling: 70 years)."
                  presets={[
                    { label: '55 (Early)', value: 55 },
                    { label: '60 (Statutory)', value: 60 },
                    { label: '65 (Late)', value: 65 },
                    { label: '70 (Max URBRA)', value: 70 },
                  ]}
                  onChange={(val) => {
                    setRetirementAge(val);
                  }}
                />
              </div>
            </div>

            {/* Mode A: Accumulation Mode Inputs */}
            {mode === 'grow' ? (
              <>
                {/* Initial Starting Pot */}
                <InputSliderGroup
                  id="initial-pot"
                  label="INITIAL AMOUNT / EXISTING BALANCE"
                  value={initialPot}
                  min={potMin}
                  max={potMax}
                  step={isUGX ? 500000 : 100}
                  prefix={currency}
                  helperText="Fund minimum: UGX 100,000 (or equivalent)"
                  minLabel={`${currency} 0`}
                  maxLabel={formatCurrency(potMax, currency, true)}
                  presets={
                    isUGX
                      ? [
                          { label: '0', value: 0 },
                          { label: '5M', value: 5000000 },
                          { label: '20M', value: 20000000 },
                          { label: '50M', value: 50000000 },
                        ]
                      : [
                          { label: '0', value: 0 },
                          { label: '$1.5k', value: 1500 },
                          { label: '$5k', value: 5000 },
                          { label: '$15k', value: 15000 },
                        ]
                  }
                  onChange={setInitialPot}
                />

                {/* Contribution Method Selector */}
                {schemeType === 'umbrella' || schemeType === 'occupational' ? (
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-wider text-brand-gray/80">
                        CONTRIBUTION TYPE
                      </label>
                      <div className="inline-flex p-0.5 bg-white rounded-lg border border-gray-200 text-[11px] font-semibold">
                        <button
                          type="button"
                          onClick={() => { setContributionMethod('fixed'); }}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            contributionMethod === 'fixed'
                              ? 'bg-brand-primary text-white'
                              : 'text-brand-gray hover:text-brand-dark'
                          }`}
                        >
                          Fixed Amount
                        </button>
                        <button
                          type="button"
                          onClick={() => { setContributionMethod('salary'); }}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            contributionMethod === 'salary'
                              ? 'bg-brand-primary text-white'
                              : 'text-brand-gray hover:text-brand-dark'
                          }`}
                        >
                          Salary % + Employer
                        </button>
                      </div>
                    </div>

                    {contributionMethod === 'salary' ? (
                      <div className="space-y-4 bg-white/80 p-4 rounded-2xl border border-gray-200/80">
                        <InputSliderGroup
                          id="gross-salary"
                          label="GROSS MONTHLY SALARY"
                          value={grossMonthlySalary}
                          min={isUGX ? 500000 : 150}
                          max={isUGX ? 50000000 : 15000}
                          step={isUGX ? 250000 : 100}
                          prefix={currency}
                          onChange={setGrossMonthlySalary}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <InputSliderGroup
                            id="employee-rate"
                            label="YOUR SHARE (%)"
                            value={employeeRatePercent}
                            min={0}
                            max={30}
                            suffix="%"
                            onChange={setEmployeeRatePercent}
                          />
                          <InputSliderGroup
                            id="employer-rate"
                            label="EMPLOYER MATCH (%)"
                            value={employerRatePercent}
                            min={0}
                            max={30}
                            suffix="%"
                            onChange={setEmployerRatePercent}
                          />
                        </div>
                        <InputSliderGroup
                          id="voluntary-topup"
                          label="ADDITIONAL VOLUNTARY TOP-UP"
                          value={voluntaryMonthlyTopup}
                          min={0}
                          max={isUGX ? 5000000 : 1500}
                          step={isUGX ? 50000 : 25}
                          prefix={currency}
                          onChange={setVoluntaryMonthlyTopup}
                        />
                        <div className="text-[11px] text-brand-dark/80 font-medium pt-1 border-t border-gray-100 flex justify-between">
                          <span>Total Monthly Deposit:</span>
                          <span className="font-bold text-brand-primary">
                            {formatCurrency(
                              grossMonthlySalary * ((employeeRatePercent + employerRatePercent) / 100) + voluntaryMonthlyTopup,
                              currency
                            )} / mo
                          </span>
                        </div>
                      </div>
                    ) : (
                      <InputSliderGroup
                        id="monthly-contribution"
                        label="MONTHLY CONTRIBUTION"
                        value={monthlyContribution}
                        min={monthlyMin}
                        max={monthlyMax}
                        step={isUGX ? 50000 : 25}
                        prefix={currency}
                        helperText="Set it to 0 for a lump-sum-only plan."
                        minLabel={`${currency} 0`}
                        maxLabel={formatCurrency(monthlyMax, currency, true)}
                        presets={
                          isUGX
                            ? [
                                { label: '100k', value: 100000 },
                                { label: '250k', value: 250000 },
                                { label: '500k', value: 500000 },
                                { label: '1M', value: 1000000 },
                              ]
                            : [
                                { label: '$50', value: 50 },
                                { label: '$150', value: 150 },
                                { label: '$300', value: 300 },
                                { label: '$500', value: 500 },
                              ]
                        }
                        onChange={setMonthlyContribution}
                      />
                    )}
                  </div>
                ) : (
                  <InputSliderGroup
                    id="monthly-contribution"
                    label="MONTHLY CONTRIBUTION"
                    value={monthlyContribution}
                    min={monthlyMin}
                    max={monthlyMax}
                    step={isUGX ? 50000 : 25}
                    prefix={currency}
                    helperText="Set it to 0 for a lump-sum-only plan."
                    minLabel={`${currency} 0`}
                    maxLabel={formatCurrency(monthlyMax, currency, true)}
                    presets={
                      isUGX
                        ? [
                            { label: '100k', value: 100000 },
                            { label: '250k', value: 250000 },
                            { label: '500k', value: 500000 },
                            { label: '1M', value: 1000000 },
                          ]
                        : [
                            { label: '$50', value: 50 },
                            { label: '$150', value: 150 },
                            { label: '$300', value: 300 },
                            { label: '$500', value: 500 },
                          ]
                    }
                    onChange={setMonthlyContribution}
                  />
                )}
              </>
            ) : (
              /* Mode B: Goal Mode Target Inputs */
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-gray/80">
                    TARGET DEFINITION
                  </label>
                  <div className="inline-flex p-0.5 bg-white rounded-lg border border-gray-200 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => { setGoalType('monthly_income'); }}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        goalType === 'monthly_income'
                          ? 'bg-brand-primary text-white'
                          : 'text-brand-gray hover:text-brand-dark'
                      }`}
                    >
                      Monthly Income
                    </button>
                    <button
                      type="button"
                      onClick={() => { setGoalType('lump_sum'); }}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        goalType === 'lump_sum'
                          ? 'bg-brand-primary text-white'
                          : 'text-brand-gray hover:text-brand-dark'
                      }`}
                    >
                      Total Lump Sum
                    </button>
                  </div>
                </div>

                {goalType === 'monthly_income' ? (
                  <InputSliderGroup
                    id="target-income"
                    label="DESIRED MONTHLY RETIREMENT INCOME"
                    value={targetRetirementIncome}
                    min={isUGX ? 500000 : 150}
                    max={isUGX ? 30000000 : 10000}
                    step={isUGX ? 250000 : 50}
                    prefix={currency}
                    helperText="Projected monthly income across a 20-year retirement drawdown."
                    onChange={setTargetRetirementIncome}
                  />
                ) : (
                  <InputSliderGroup
                    id="target-lump-sum"
                    label="TARGET RETIREMENT NEST EGG"
                    value={targetLumpSum}
                    min={isUGX ? 10000000 : 5000}
                    max={isUGX ? 3000000000 : 1000000}
                    step={isUGX ? 10000000 : 2500}
                    prefix={currency}
                    onChange={setTargetLumpSum}
                  />
                )}

                <InputSliderGroup
                  id="goal-initial-pot"
                  label="CURRENT STARTING BALANCE"
                  value={initialPot}
                  min={potMin}
                  max={potMax}
                  step={isUGX ? 500000 : 100}
                  prefix={currency}
                  onChange={setInitialPot}
                />
              </div>
            )}

            {/* Expected Annual Rate */}
            <InputSliderGroup
              id="expected-return"
              label="EXPECTED ANNUAL RETURN RATE"
              value={expectedReturnRate}
              min={6}
              max={18}
              step={0.5}
              suffix="% p.a."
              helperText="Compounded monthly based on East African long-term capital benchmarks."
              presets={[
                { label: 'Conservative (9.5%)', value: 9.5 },
                { label: 'Balanced (12.5%)', value: 12.5 },
                { label: 'Optimistic (15.0%)', value: 15.0 },
              ]}
              onChange={setExpectedReturnRate}
            />
          </div>

          {/* Guarantee & Regulation Footnote */}
          <div className="pt-4 border-t border-brand-primary/10 flex items-center gap-2 text-xs text-brand-dark/70">
            <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
            <span>Regulated by the Capital Markets Authority (CMA) of Uganda.</span>
          </div>
        </div>

        {/* ════ RIGHT PANEL: Visualizer & Projection (Dark Teal) ═════ */}
        <div className="lg:col-span-7 bg-[#002e2e] text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden border border-teal-900/40">
          {/* Subtle Background Radial Aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="space-y-6 relative z-10">
            {/* Header / Hero Numbers */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-green block mb-1">
                  PROJECTED VALUE · AGE {retirementAge.toString()} (YEAR {yearsHorizon.toString()})
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-teal-200/70">
                    {currency}
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                    {Math.round(activeProjectedPot).toLocaleString('en-US')}
                  </span>
                </div>
                {activeMonthlyIncome > 0 && (
                  <div className="mt-2 text-xs sm:text-sm text-teal-100/80 font-light flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-brand-green" />
                    <span>
                      Est. monthly retirement payout:{' '}
                      <strong className="font-semibold text-white">
                        {formatCurrency(activeMonthlyIncome, currency)}
                      </strong>{' '}
                      / month
                    </span>
                  </div>
                )}
              </div>

              {/* Share Button */}
              <button
                type="button"
                onClick={() => { setIsShareModalOpen(true); }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm transition-colors border border-white/15 shrink-0"
              >
                <Share2 className="w-3.5 h-3.5 text-brand-green" />
                <span className="hidden sm:inline">Share my plan</span>
              </button>
            </div>

            {/* Mode B Goal Banner Note */}
            {mode === 'goal' && (
              <div className="bg-brand-primary/40 border border-brand-green/30 rounded-2xl p-4 text-xs text-white flex items-center justify-between gap-4">
                <div>
                  <span className="text-brand-green font-bold block mb-0.5">Required Monthly Savings:</span>
                  <span className="text-xl font-bold text-white">
                    {formatCurrency(goalResult.requiredMonthlySavings, currency)} / month
                  </span>
                </div>
                <span className="text-[11px] text-teal-100/80 text-right">
                  Over {yearsHorizon.toString()} years until age {retirementAge.toString()}
                </span>
              </div>
            )}

            {/* Growth Visualizer SVG Chart */}
            <div className="pt-2">
              <PensionGrowthChart
                data={activeChartData}
                currency={currency}
                showRange={showRange}
                targetRetirementAge={retirementAge}
              />
            </div>

            {/* Chart Legend & Range Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/90 pt-1">
              <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#427878]"></span>
                  <span>
                    Deposits{' '}
                    <strong className="font-semibold text-white">
                      {formatCurrency(
                        mode === 'grow' ? accumulationResult.totalDeposits : goalResult.totalDeposits,
                        currency,
                        true
                      )}
                    </strong>
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-brand-green"></span>
                  <span>
                    Growth{' '}
                    <strong className="font-semibold text-brand-green">
                      {formatCurrency(
                        mode === 'grow' ? accumulationResult.totalCompoundGrowth : goalResult.totalCompoundGrowth,
                        currency,
                        true
                      )}
                    </strong>
                  </span>
                </span>
              </div>

              {/* Range Toggle */}
              <label className="inline-flex items-center gap-2 cursor-pointer text-[11px] text-white/70 hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={showRange}
                  onChange={(e) => { setShowRange(e.target.checked); }}
                  className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary h-3.5 w-3.5 accent-brand-green"
                />
                <span>Range: Base to Best case</span>
              </label>
            </div>

            {/* CTAs Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleOpenAccount}
                className="flex-1 py-3 px-6 rounded-full bg-[#b2d8d8] text-brand-dark font-bold text-xs sm:text-sm hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Open your pension account</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => { setIsAdvisorModalOpen(true); }}
                className="py-3 px-6 rounded-full border border-white/30 text-white font-semibold text-xs sm:text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>Talk to an Advisor</span>
              </button>
            </div>

            {/* Base, Most Likely, Best Case Cards */}
            <ScenarioComparison
              baseValue={accumulationResult.baseCasePot}
              likelyValue={accumulationResult.projectedPot}
              bestValue={accumulationResult.bestCasePot}
              currency={currency}
              selectedScenario={selectedScenario}
              onSelectScenario={setSelectedScenario}
            />

            {/* Expandable Schedule & Details */}
            <BreakdownTable
              breakdown={activeChartData}
              currency={currency}
              estimatedMonthlyIncome={activeMonthlyIncome}
              schemeName={SCHEME_CONFIGS[schemeType].label}
            />
          </div>
        </div>
      </div>

      {/* ── Modals ─────────────────────────────────────────────── */}
      <AdvisorCallModal
        isOpen={isAdvisorModalOpen}
        onClose={() => { setIsAdvisorModalOpen(false); }}
        projectedPot={activeProjectedPot}
        monthlySavings={mode === 'grow' ? monthlyContribution : goalResult.requiredMonthlySavings}
        currency={currency}
        schemeTitle={SCHEME_CONFIGS[schemeType].label}
      />

      <SharePlanModal
        isOpen={isShareModalOpen}
        onClose={() => { setIsShareModalOpen(false); }}
        inputs={accumulationInputs}
        result={accumulationResult}
      />
    </div>
  );
};
