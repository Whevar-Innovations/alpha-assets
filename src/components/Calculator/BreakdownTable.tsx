import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, Download } from 'lucide-react';
import type { YearProjectionPoint, Currency } from './types';
import { formatCurrency } from '../../utils/pensionMath';

export interface BreakdownTableProps {
  breakdown: YearProjectionPoint[];
  currency: Currency;
  estimatedMonthlyIncome?: number;
  schemeName?: string;
}

export const BreakdownTable: React.FC<BreakdownTableProps> = ({
  breakdown,
  currency,
  estimatedMonthlyIncome,
  schemeName = 'Pension Scheme',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportCSV = () => {
    if (breakdown.length === 0) return;
    const headers = ['Year', 'Age', 'Personal Deposits', 'Employer Match', 'Total Contributed', 'Compound Growth', 'Total Projected Pot'];
    const rows = breakdown.map((d) => [
      d.year.toString(),
      d.age.toString(),
      d.personalDeposits.toString(),
      d.employerDeposits.toString(),
      d.totalDeposits.toString(),
      d.interestEarned.toString(),
      d.totalValue.toString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const sanitizedScheme = schemeName.replace(/\s+/g, '_');
    link.setAttribute('download', `Alpha_${sanitizedScheme}_Projection.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-4 border-t border-white/15">
      {/* Toggle Header Button */}
      <button
        type="button"
        onClick={() => { setIsOpen(!isOpen); }}
        className="w-full flex items-center justify-between text-left py-2 text-sm font-semibold text-white/90 hover:text-white transition-colors duration-150 group"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span>Details & Year-by-Year Breakdown</span>
          <span className="text-xs font-normal text-white/50 group-hover:text-white/80">
            ({breakdown.length.toString()} year schedule)
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-brand-green" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-white" />
        )}
      </button>

      {/* Expandable Body */}
      {isOpen && (
        <div className="mt-4 pt-3 pb-2 space-y-4 animate-fade-in">
          {/* Action Row */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/70">
              Compound calculation frequency: Monthly
            </span>
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-brand-green" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-black/20 scrollbar-thin">
            <table className="w-full text-left text-xs text-white/80 divide-y divide-white/10">
              <thead className="bg-white/10 sticky top-0 backdrop-blur-md text-[11px] uppercase tracking-wider text-brand-green">
                <tr>
                  <th scope="col" className="py-2.5 px-3">Year / Age</th>
                  <th scope="col" className="py-2.5 px-3">Member Deposits</th>
                  <th scope="col" className="py-2.5 px-3">Employer Match</th>
                  <th scope="col" className="py-2.5 px-3">Compound Growth</th>
                  <th scope="col" className="py-2.5 px-3 text-right">Projected Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {breakdown.map((row) => (
                  <tr key={row.year} className="hover:bg-white/5 transition-colors">
                    <td className="py-2 px-3 font-semibold text-white">
                      {row.year === 0 ? 'Start' : `Yr ${row.year.toString()}`} (Age {row.age.toString()})
                    </td>
                    <td className="py-2 px-3">{formatCurrency(row.personalDeposits, currency)}</td>
                    <td className="py-2 px-3">
                      {row.employerDeposits > 0 ? formatCurrency(row.employerDeposits, currency) : '—'}
                    </td>
                    <td className="py-2 px-3 text-brand-green font-medium">
                      +{formatCurrency(row.interestEarned, currency)}
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-white">
                      {formatCurrency(row.totalValue, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Assumptions & Actuarial Footnote */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-white/90">
              <Info className="w-3.5 h-3.5 text-brand-green" />
              <span>Assumptions & Methodological Notes</span>
            </div>
            <p className="leading-relaxed">
              • Returns are compounded monthly before statutory taxes and administration fees.
            </p>
            {estimatedMonthlyIncome !== undefined && estimatedMonthlyIncome > 0 && (
              <p className="leading-relaxed">
                • Estimated monthly retirement annuity assumes a 20-year drawdown post-retirement at an illustrative annual yield of 8.5% p.a.
              </p>
            )}
            <p className="leading-relaxed text-white/50">
              Alpha Asset Managers Ltd is licensed and regulated by the Capital Markets Authority (CMA) of Uganda and registered under the Uganda Retirement Benefits Regulatory Authority (URBRA) guidelines. Projections are illustrative and do not guarantee future returns.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
