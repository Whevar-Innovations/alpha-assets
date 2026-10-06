import React, { useState } from 'react';
import { parseFormattedNumber } from '../../utils/pensionMath';

export interface InputSliderGroupProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  helperText?: string;
  minLabel?: string;
  maxLabel?: string;
  presets?: { label: string; value: number }[];
  onChange: (newValue: number) => void;
  disabled?: boolean;
}

export const InputSliderGroup: React.FC<InputSliderGroupProps> = ({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  helperText,
  minLabel,
  maxLabel,
  presets,
  onChange,
  disabled = false,
}) => {
  // Local edit buffer: string when focused/editing, null when resting
  const [editingText, setEditingText] = useState<string | null>(null);

  const displayValue =
    editingText ?? (isNaN(value) ? '0' : Math.round(value).toLocaleString('en-US'));

  const handleFocus = () => {
    // Strip commas and non-digits so user can easily edit/type
    const rawNum = isNaN(value) ? 0 : Math.round(value);
    setEditingText(rawNum > 0 ? rawNum.toString() : '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setEditingText(raw);

    const num = parseFormattedNumber(raw);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  const handleBlur = () => {
    const num = parseFormattedNumber(editingText ?? '');
    const clamped = Math.max(min, Math.min(num, max));
    onChange(clamped);
    setEditingText(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange(val);
    if (editingText !== null) {
      setEditingText(null);
    }
  };

  // Calculate percentage fill for custom slider background track
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className="space-y-2">
      {/* Label */}
      <div className="flex justify-between items-center">
        <label htmlFor={`${id}-input`} className="text-xs font-bold uppercase tracking-wider text-brand-gray/80">
          {label}
        </label>
      </div>

      {/* Formatted Number Input Box */}
      <div className="relative flex items-center rounded-xl border border-gray-200 bg-white shadow-sm focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all duration-150">
        {prefix && (
          <span className="pl-4 pr-1 text-sm font-semibold text-brand-dark/70 select-none">
            {prefix}
          </span>
        )}
        <input
          id={`${id}-input`}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="0"
          className={`w-full py-2.5 px-3 text-lg font-bold text-brand-dark bg-transparent focus:outline-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label={label}
        />
        {suffix && (
          <span className="pr-4 pl-1 text-sm font-medium text-brand-gray/60 select-none">
            {suffix}
          </span>
        )}
      </div>

      {/* Range Slider */}
      <div className="pt-2">
        <div className="relative flex items-center">
          <input
            id={`${id}-slider`}
            type="range"
            min={min}
            max={max}
            step={step}
            value={Math.min(max, Math.max(min, isNaN(value) ? min : value))}
            onChange={handleSliderChange}
            disabled={disabled}
            style={{
              background: `linear-gradient(to right, #005b5c ${percentage.toFixed(1)}%, #d1e5e5 ${percentage.toFixed(1)}%)`,
            }}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            aria-label={`${label} slider`}
          />
        </div>

        {/* Min / Max Labels */}
        {(minLabel !== undefined || maxLabel !== undefined) && (
          <div className="flex justify-between items-center text-[11px] font-medium text-brand-gray/60 mt-1.5">
            <span>{minLabel ?? min.toLocaleString()}</span>
            <span>{maxLabel ?? max.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Optional Preset Pills */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                onChange(preset.value);
                setEditingText(null);
              }}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all duration-150 ${
                Math.round(value) === preset.value
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-white text-brand-dark border-gray-200 hover:border-brand-primary hover:bg-brand-cardBg/50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      {/* Helper text */}
      {helperText && (
        <p className="text-[12px] text-brand-gray/70 pt-0.5 leading-snug">
          {helperText}
        </p>
      )}
    </div>
  );
};
