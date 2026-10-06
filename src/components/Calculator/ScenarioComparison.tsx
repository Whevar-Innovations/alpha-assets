import React from 'react';
import type { Currency } from './types';
import { formatCurrency } from '../../utils/pensionMath';

export interface ScenarioComparisonProps {
  baseValue: number;
  likelyValue: number;
  bestValue: number;
  baseRate?: number;
  likelyRate?: number;
  bestRate?: number;
  currency: Currency;
  selectedScenario?: 'base' | 'likely' | 'best';
  onSelectScenario?: (scenario: 'base' | 'likely' | 'best') => void;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({
  baseValue,
  likelyValue,
  bestValue,
  baseRate = 9.5,
  likelyRate = 12.5,
  bestRate = 15.0,
  currency,
  selectedScenario = 'likely',
  onSelectScenario,
}) => {
  return (
    <div className="pt-4 border-t border-white/15">
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-left">
        {/* Base Case */}
        <button
          type="button"
          onClick={() => onSelectScenario?.('base')}
          className={`p-2.5 sm:p-3 rounded-xl transition-all duration-150 text-left ${
            selectedScenario === 'base'
              ? 'bg-white/15 border border-white/30 shadow-inner'
              : 'bg-white/5 hover:bg-white/10 border border-transparent'
          }`}
        >
          <div className="text-[11px] sm:text-xs font-medium text-white/60">
            Base ({baseRate.toFixed(1)}%)
          </div>
          <div className="text-xs sm:text-sm md:text-base font-bold text-white mt-0.5 truncate">
            {formatCurrency(baseValue, currency, true)}
          </div>
        </button>

        {/* Most Likely (Primary Default) */}
        <button
          type="button"
          onClick={() => onSelectScenario?.('likely')}
          className={`p-2.5 sm:p-3 rounded-xl transition-all duration-150 text-left relative ${
            selectedScenario === 'likely'
              ? 'bg-white/20 border border-brand-green shadow-sm ring-1 ring-brand-green/50'
              : 'bg-white/10 hover:bg-white/15 border border-transparent'
          }`}
        >
          <div className="text-[11px] sm:text-xs font-semibold text-brand-green flex items-center justify-between">
            <span>Most likely ({likelyRate.toFixed(1)}%)</span>
          </div>
          <div className="text-xs sm:text-sm md:text-base font-bold text-white mt-0.5 truncate">
            {formatCurrency(likelyValue, currency, true)}
          </div>
        </button>

        {/* Best Case */}
        <button
          type="button"
          onClick={() => onSelectScenario?.('best')}
          className={`p-2.5 sm:p-3 rounded-xl transition-all duration-150 text-left ${
            selectedScenario === 'best'
              ? 'bg-white/15 border border-white/30 shadow-inner'
              : 'bg-white/5 hover:bg-white/10 border border-transparent'
          }`}
        >
          <div className="text-[11px] sm:text-xs font-medium text-white/60">
            Best case ({bestRate.toFixed(1)}%)
          </div>
          <div className="text-xs sm:text-sm md:text-base font-bold text-white mt-0.5 truncate">
            {formatCurrency(bestValue, currency, true)}
          </div>
        </button>
      </div>
    </div>
  );
};
