import React, { useState } from 'react';
import { X, Phone, CheckCircle2, User, Mail, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../UI/Button';
import { formatCurrency } from '../../utils/pensionMath';
import { useSanityPage } from '../../sanity/hooks/useSanityPage';
import { SITE_SETTINGS_QUERY } from '../../sanity/lib/queries';
import { siteSettingsDefaults } from '../../sanity/defaults/siteSettings';
import { submitFormData } from '../../utils/formSubmission';
import type { Currency } from './types';

export interface AdvisorCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectedPot: number;
  monthlySavings: number;
  currency: Currency;
  schemeTitle: string;
}

export const AdvisorCallModal: React.FC<AdvisorCallModalProps> = ({
  isOpen,
  onClose,
  projectedPot,
  monthlySavings,
  currency,
  schemeTitle,
}) => {
  const { data: siteSettings } = useSanityPage(SITE_SETTINGS_QUERY, siteSettingsDefaults);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [honey, setHoney] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const targetEmail = siteSettings.contactInfo?.email ?? 'invest@alphaeastafrica.com';

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await submitFormData(targetEmail, {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().length > 0 ? email.trim() : 'Not provided',
      notes: notes.trim().length > 0 ? notes.trim() : 'None provided',
      pensionScheme: schemeTitle,
      simulatedTargetNestEgg: formatCurrency(projectedPot, currency),
      monthlyContribution: `${formatCurrency(monthlySavings, currency)} / mo`,
      currency,
      _honey: honey,
      _subject: `New Advisor Consultation Request: ${fullName.trim()} (${schemeTitle})`,
    });

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setErrorMessage(
        result.message ?? `Unable to send your request. Please call us directly or retry.`
      );
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setHoney('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="advisor-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-brand-dark animate-modal-in overflow-hidden border border-gray-100">
        {/* Close button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-brand-dark/50 hover:text-brand-dark hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                Alpha Pensions Advisory
              </span>
              <h3 id="advisor-modal-title" className="text-2xl font-light text-brand-dark">
                Speak to a Retirement Advisor
              </h3>
              <p className="text-xs sm:text-sm text-brand-gray/80 leading-relaxed font-light">
                Leave your details below and a dedicated Alpha pension specialist will reach out to discuss structuring your <strong className="font-semibold text-brand-dark">{schemeTitle}</strong>.
              </p>
            </div>

            {/* Plan Snapshot Card */}
            <div className="bg-brand-cardBg rounded-2xl p-4 mb-6 text-xs text-brand-dark flex justify-between items-center border border-brand-primary/20">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-brand-primary font-bold block">
                  Simulated Target Nest Egg
                </span>
                <span className="text-lg font-bold text-brand-dark">
                  {formatCurrency(projectedPot, currency)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-brand-gray/80 block">
                  Monthly Contribution
                </span>
                <span className="text-sm font-semibold text-brand-primary">
                  {formatCurrency(monthlySavings, currency)} / mo
                </span>
              </div>
            </div>

            <form onSubmit={(e) => { void handleSubmit(e); }} className="space-y-4">
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="_honey"
                  value={honey}
                  onChange={(e) => { setHoney(e.target.value); }}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="modal-name" className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-brand-gray/50" />
                  <input
                    id="modal-name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="e.g. Sarah Mukasa"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-phone" className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 w-4 h-4 text-brand-gray/50" />
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    disabled={isSubmitting}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="e.g. +256 700 000 000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Email Address (Optional)
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-brand-gray/50" />
                  <input
                    id="modal-email"
                    type="email"
                    disabled={isSubmitting}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="e.g. sarah@company.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-notes" className="block text-xs font-bold uppercase tracking-wider text-brand-gray mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="modal-notes"
                  rows={2}
                  disabled={isSubmitting}
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Questions about corporate umbrella schemes, vesting periods, or voluntary top-ups..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-50"
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full justify-center py-3 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Request...</span>
                    </span>
                  ) : (
                    'Request Advisor Callback'
                  )}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto text-brand-primary">
              <CheckCircle2 className="w-10 h-10 text-brand-primary" />
            </div>
            <h3 className="text-2xl font-light text-brand-dark">Request Received</h3>
            <p className="text-sm text-brand-gray leading-relaxed max-w-sm mx-auto font-light">
              Thank you, <strong className="font-semibold text-brand-dark">{fullName || 'Valued Client'}</strong>. Our pension advisory team will contact you shortly at <strong className="font-semibold text-brand-dark">{phone}</strong>.
            </p>
            <div className="pt-4">
              <Button variant="secondary" onClick={handleReset}>
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
