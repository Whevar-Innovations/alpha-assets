import React from 'react';
import { set, unset } from 'sanity';
import type { StringInputProps } from 'sanity';
import * as LucideIcons from 'lucide-react';

const PRESET_ICONS = [
  // Finance / Investment
  'PiggyBank', 'Coins', 'TrendingUp', 'BarChart2', 'Wallet', 'BadgeDollarSign', 'Building2',
  // People / Services
  'Users', 'Sliders', 'Layers', 'Briefcase', 'Handshake', 'HeartHandshake',
  // Trust / Ethics
  'Shield', 'ShieldCheck', 'Lock', 'Star', 'Award', 'CheckCircle',
  // Strategy / Direction
  'Compass', 'Target', 'Lightbulb', 'Eye', 'Telescope', 'Map',
  // General
  'Heart', 'Globe', 'Zap', 'Settings2',
] as const;

type PresetIcon = (typeof PRESET_ICONS)[number];

export const IconPickerInput: React.FC<StringInputProps> = ({ value, onChange }) => {
  const handleSelect = (iconName: PresetIcon) => {
    onChange(iconName === value ? unset() : set(iconName));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {value && (
        <div style={{ fontSize: '12px', color: '#666', padding: '4px 0' }}>
          Selected: <strong style={{ color: '#005b5c' }}>{value}</strong>
        </div>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
          gap: '8px',
        }}
      >
        {PRESET_ICONS.map((name) => {
          const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType | undefined>)[name];
          if (!IconComponent) return null;
          const isSelected = value === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => { handleSelect(name); }}
              title={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 4px 6px',
                gap: '6px',
                border: isSelected ? '2px solid #005b5c' : '1px solid #e0e0e0',
                borderRadius: '10px',
                background: isSelected ? '#e8f4e8' : '#fafafa',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                outline: 'none',
              }}
            >
              <IconComponent size={22} color={isSelected ? '#005b5c' : '#555'} />
              <span
                style={{
                  fontSize: '8px',
                  color: isSelected ? '#005b5c' : '#999',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  fontWeight: isSelected ? 700 : 400,
                  wordBreak: 'break-all',
                }}
              >
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
