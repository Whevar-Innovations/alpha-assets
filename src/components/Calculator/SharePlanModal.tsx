import React, { useState } from 'react';
import { X, Copy, Check, Share2, Printer } from 'lucide-react';
import { Button } from '../UI/Button';
import { formatCurrency } from '../../utils/pensionMath';
import type { PensionInputState, PensionProjectionResult } from './types';

export interface SharePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: PensionInputState;
  result: PensionProjectionResult;
}

export const SharePlanModal: React.FC<SharePlanModalProps> = ({
  isOpen,
  onClose,
  inputs,
  result,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate shareable URL
  const generateShareUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('mode', inputs.mode);
    url.searchParams.set('currency', inputs.currency);
    url.searchParams.set('scheme', inputs.schemeType);
    url.searchParams.set('curAge', inputs.currentAge.toString());
    url.searchParams.set('retAge', inputs.retirementAge.toString());
    url.searchParams.set('initPot', inputs.initialPot.toString());
    url.searchParams.set('monthly', inputs.monthlyContribution.toString());
    url.searchParams.set('returnRate', inputs.expectedReturnRate.toString());
    return url.toString();
  };

  const shareUrl = generateShareUrl();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      // Fallback
      setCopied(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fade-in print:hidden"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-brand-dark animate-modal-in border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-brand-dark/50 hover:text-brand-dark hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-brand-cardBg flex items-center justify-center text-brand-primary mb-2">
            <Share2 className="w-5 h-5" />
          </div>
          <h3 id="share-modal-title" className="text-2xl font-light text-brand-dark">
            Share Your Pension Plan
          </h3>
          <p className="text-xs sm:text-sm text-brand-gray/80 font-light">
            Share a direct link to your simulated retirement model or print a summary copy.
          </p>
        </div>

        {/* Plan Summary Card */}
        <div className="bg-brand-cardBg rounded-2xl p-4 mb-5 text-xs space-y-2 border border-brand-primary/20">
          <div className="flex justify-between">
            <span className="text-brand-gray">Projected Nest Egg:</span>
            <span className="font-bold text-brand-dark">
              {formatCurrency(result.projectedPot, inputs.currency)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-gray">Estimated Monthly Pension:</span>
            <span className="font-semibold text-brand-primary">
              {formatCurrency(result.estimatedMonthlyIncome, inputs.currency)} / mo
            </span>
          </div>
          <div className="flex justify-between text-brand-gray">
            <span>Retirement Horizon:</span>
            <span>{result.yearsToRetirement.toString()} years (Age {inputs.currentAge.toString()} → {inputs.retirementAge.toString()})</span>
          </div>
        </div>

        {/* Link box */}
        <div className="space-y-3">
          <label htmlFor="share-link-input" className="block text-xs font-bold uppercase tracking-wider text-brand-gray">
            Shareable URL
          </label>
          <div className="flex items-center gap-2">
            <input
              id="share-link-input"
              type="text"
              readOnly
              value={shareUrl}
              className="w-full px-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 text-gray-600 focus:outline-none"
            />
            <button
              onClick={() => {
                void handleCopyLink();
              }}
              type="button"
              className="px-3.5 py-2 rounded-xl bg-brand-primary text-white text-xs font-semibold hover:bg-brand-dark transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-brand-green" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Print Option */}
        <div className="pt-6 border-t border-gray-100 mt-6 flex justify-between gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-gray-300 text-xs font-semibold text-brand-dark hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4 text-brand-primary" />
            <span>Print Summary</span>
          </button>
          <Button variant="secondary" onClick={onClose} className="text-xs py-2.5 px-6">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
