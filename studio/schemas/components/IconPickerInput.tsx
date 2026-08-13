import React, { useState, useMemo } from 'react';
import { set, unset } from 'sanity';
import type { StringInputProps } from 'sanity';
import * as LucideIcons from 'lucide-react';

const ICON_CATEGORIES = [
  {
    label: 'Finance & Investment',
    icons: ['PiggyBank', 'Coins', 'TrendingUp', 'TrendingDown', 'BarChart2', 'BarChart4', 'Wallet', 'BadgeDollarSign', 'Building2', 'Landmark', 'Receipt', 'Banknote', 'CircleDollarSign', 'CandlestickChart'],
  },
  {
    label: 'People & Services',
    icons: ['Users', 'User', 'UserCheck', 'Sliders', 'Layers', 'Briefcase', 'Handshake', 'HeartHandshake', 'UserPlus', 'UsersRound', 'ContactRound'],
  },
  {
    label: 'Trust & Security',
    icons: ['Shield', 'ShieldCheck', 'ShieldAlert', 'Lock', 'KeyRound', 'Star', 'Award', 'BadgeCheck', 'CheckCircle', 'CheckCircle2', 'ClipboardCheck'],
  },
  {
    label: 'Strategy & Growth',
    icons: ['Compass', 'Target', 'Lightbulb', 'Eye', 'Telescope', 'Map', 'Rocket', 'Flame', 'ArrowUpRight', 'LineChart', 'Gauge', 'Activity'],
  },
  {
    label: 'Communication',
    icons: ['Heart', 'Globe', 'Globe2', 'Mail', 'Phone', 'MessageSquare', 'Bell', 'Megaphone', 'Share2'],
  },
  {
    label: 'Operations',
    icons: ['Settings2', 'Zap', 'Cpu', 'Database', 'Network', 'LayoutDashboard', 'Workflow', 'GitMerge', 'Boxes'],
  },
  {
    label: 'Nature & Wellbeing',
    icons: ['Leaf', 'TreePine', 'Sun', 'Cloud', 'Droplets', 'Sprout'],
  },
] as const;

export const IconPickerInput: React.FC<StringInputProps> = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (iconName: string) => {
    onChange(iconName === value ? unset() : set(iconName));
  };

  const handleClear = () => {
    onChange(unset());
  };

  const filteredCategories = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return ICON_CATEGORIES;

    return ICON_CATEGORIES.map(category => ({
      ...category,
      icons: category.icons.filter(icon => icon.toLowerCase().includes(term))
    })).filter(category => category.icons.length > 0);
  }, [searchTerm]);

  const SelectedIconComponent = value ? (LucideIcons as unknown as Record<string, React.ElementType | undefined>)[value] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Selected Icon Header */}
      {value && SelectedIconComponent && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#e8f4e8',
          border: '1px solid #005b5c',
          borderRadius: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', display: 'flex' }}>
              <SelectedIconComponent size={24} color="#005b5c" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Selected Icon</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#005b5c' }}>{value}</div>
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleClear}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              color: '#d32f2f',
              background: 'transparent',
              border: '1px solid #ffcdd2',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
           <LucideIcons.Search size={16} color="#888" />
        </div>
        <input 
          type="text" 
          placeholder="Search icons..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px 10px 36px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Icon Grid */}
      <div style={{ 
        maxHeight: '400px', 
        overflowY: 'auto', 
        paddingRight: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {filteredCategories.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
            No icons found matching "{searchTerm}"
          </div>
        ) : (
          filteredCategories.map(category => (
            <div key={category.label}>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: '#555', 
                marginBottom: '12px',
                borderBottom: '1px solid #eee',
                paddingBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {category.label}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
                  gap: '10px',
                }}
              >
                {category.icons.map((name) => {
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
                        padding: '12px 4px 8px',
                        gap: '8px',
                        border: isSelected ? '2px solid #005b5c' : '1px solid #eaeaea',
                        borderRadius: '8px',
                        background: isSelected ? '#e8f4e8' : '#fafafa',
                        cursor: 'pointer',
                        transition: 'all 0.1s ease',
                        outline: 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = '#f0f0f0';
                          e.currentTarget.style.borderColor = '#ccc';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = '#fafafa';
                          e.currentTarget.style.borderColor = '#eaeaea';
                        }
                      }}
                    >
                      <IconComponent size={24} strokeWidth={1.5} color={isSelected ? '#005b5c' : '#444'} />
                      <span
                        style={{
                          fontSize: '10px',
                          color: isSelected ? '#005b5c' : '#666',
                          textAlign: 'center',
                          lineHeight: 1.1,
                          fontWeight: isSelected ? 600 : 400,
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
          ))
        )}
      </div>
    </div>
  );
};
