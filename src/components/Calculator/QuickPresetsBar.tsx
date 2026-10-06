import React from 'react';
import { Sprout, Briefcase, Building2, Timer } from 'lucide-react';
import type { Currency, QuickPreset } from './types';

const PRESET_OPTIONS: QuickPreset[] = [
  {
    id: 'starter',
    title: 'Starting Out',
    subtitle: 'Age 25 · 150k/mo',
    icon: Sprout,
    currentAge: 25,
    retirementAge: 60,
    initialPot: { UGX: 0, USD: 0 },
    monthlyContribution: { UGX: 150000, USD: 50 },
    schemeType: 'individual',
    contributionMethod: 'fixed',
  },
  {
    id: 'mid-career',
    title: 'Mid-Career',
    subtitle: 'Age 35 · 500k/mo',
    icon: Briefcase,
    currentAge: 35,
    retirementAge: 60,
    initialPot: { UGX: 15000000, USD: 4000 },
    monthlyContribution: { UGX: 500000, USD: 150 },
    schemeType: 'umbrella',
    contributionMethod: 'fixed',
  },
  {
    id: 'corporate-match',
    title: 'Employer Match',
    subtitle: '5% + 10% co-match',
    icon: Building2,
    currentAge: 32,
    retirementAge: 60,
    initialPot: { UGX: 10000000, USD: 2500 },
    monthlyContribution: { UGX: 525000, USD: 150 },
    schemeType: 'umbrella',
    contributionMethod: 'salary',
    grossSalary: { UGX: 3500000, USD: 1000 },
    employeeRatePercent: 5,
    employerRatePercent: 10,
  },
  {
    id: 'retirement-sprint',
    title: 'Pre-Retirement',
    subtitle: 'Age 50 · Catch-up',
    icon: Timer,
    currentAge: 50,
    retirementAge: 60,
    initialPot: { UGX: 60000000, USD: 16000 },
    monthlyContribution: { UGX: 1500000, USD: 400 },
    schemeType: 'occupational',
    contributionMethod: 'fixed',
  },
];

export interface QuickPresetsBarProps {
  currency: Currency;
  activePresetId: string | null;
  onSelectPreset: (preset: QuickPreset) => void;
}

export const QuickPresetsBar: React.FC<QuickPresetsBarProps> = ({
  activePresetId,
  onSelectPreset,
}) => {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gray/80">
          QUICK START PERSONAS
        </span>
        <span className="text-[11px] text-brand-gray/60 hidden sm:inline">
          Pick a profile to load instant parameters
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Pension Quick Start Personas"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
      >
        {PRESET_OPTIONS.map((preset) => {
          const Icon = preset.icon;
          const isSelected = activePresetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => {
                onSelectPreset(preset);
              }}
              className={`p-3 rounded-2xl border text-left transition-all duration-150 flex items-start gap-2.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/40 ${
                isSelected
                  ? 'bg-brand-dark text-white border-brand-dark shadow-sm'
                  : 'bg-white text-brand-dark border-gray-200/90 hover:border-brand-primary/60 hover:bg-white/95'
              }`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-white/10 text-brand-green'
                    : 'bg-brand-cardBg/60 text-brand-primary group-hover:bg-brand-cardBg'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold leading-tight block truncate">
                  {preset.title}
                </span>
                <span
                  className={`text-[10px] block truncate mt-0.5 ${
                    isSelected ? 'text-teal-200/80' : 'text-brand-gray/70'
                  }`}
                >
                  {preset.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
