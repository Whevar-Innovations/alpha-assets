import React, { useState, useRef } from 'react';
import type { YearProjectionPoint, Currency } from './types';
import { formatCurrency } from '../../utils/pensionMath';

export interface PensionGrowthChartProps {
  data: YearProjectionPoint[];
  currency: Currency;
  showRange?: boolean;
  targetRetirementAge?: number;
}

export const PensionGrowthChart: React.FC<PensionGrowthChartProps> = ({
  data,
  currency,
  showRange = false,
  targetRetirementAge,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-white/50 text-sm">
        No projection data available
      </div>
    );
  }

  // Viewbox coordinates
  const width = 700;
  const height = 300;
  const padLeft = 20;
  const padRight = 80;
  const padTop = 35;
  const padBottom = 35;

  const chartWidth = width - padLeft - padRight;
  const chartHeight = height - padTop - padBottom;

  // Find max Y across all data points
  const maxValue = Math.max(
    ...data.map((d) => (showRange ? Math.max(d.bestCaseValue, d.totalValue) : d.totalValue)),
    1000
  );

  // Helper coordinate mappers
  const getX = (index: number) => {
    if (data.length <= 1) return padLeft;
    return padLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    const ratio = Math.min(1, Math.max(0, val / maxValue));
    return height - padBottom - ratio * chartHeight;
  };

  // Build SVG Path strings
  const buildSmoothPath = (points: { x: number; y: number }[]): string => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x.toString()} ${points[0].y.toString()}`;

    let path = `M ${points[0].x.toString()} ${points[0].y.toString()}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i !== points.length - 2 ? points[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  };

  const totalPoints = data.map((d, i) => ({ x: getX(i), y: getY(d.totalValue) }));
  const depositPoints = data.map((d, i) => ({ x: getX(i), y: getY(d.totalDeposits) }));
  const bestPoints = data.map((d, i) => ({ x: getX(i), y: getY(d.bestCaseValue) }));

  const totalLine = buildSmoothPath(totalPoints);
  const depositLine = buildSmoothPath(depositPoints);
  const bestLine = buildSmoothPath(bestPoints);

  const baselineY = height - padBottom;
  const totalArea = `${totalLine} L ${getX(data.length - 1).toString()} ${baselineY.toString()} L ${getX(0).toString()} ${baselineY.toString()} Z`;
  const depositArea = `${depositLine} L ${getX(data.length - 1).toString()} ${baselineY.toString()} L ${getX(0).toString()} ${baselineY.toString()} Z`;

  // Range polygon (from Base case to Best case)
  const rangeArea = showRange
    ? `${bestLine} L ${getX(data.length - 1).toString()} ${getY(data[data.length - 1].baseCaseValue).toString()} ` +
      data
        .slice()
        .reverse()
        .map((d, idx) => {
          const revIdx = data.length - 1 - idx;
          return `L ${getX(revIdx).toFixed(1)} ${getY(d.baseCaseValue).toFixed(1)}`;
        })
        .join(' ') +
      ' Z'
    : '';

  // Gridlines & horizontal guide ticks (4 lines)
  const gridTicks = [0.25, 0.5, 0.75, 1.0].map((fraction) => ({
    val: maxValue * fraction,
    y: getY(maxValue * fraction),
  }));

  // Key X milestone ticks
  const xTicks: { label: string; index: number; x: number }[] = [];
  if (data.length > 0) {
    xTicks.push({ label: 'Start', index: 0, x: getX(0) });
    if (data.length > 6) {
      const mid = Math.floor(data.length / 2);
      xTicks.push({
        label: data[mid].year > 0 ? `Year ${data[mid].year.toString()}` : `Age ${data[mid].age.toString()}`,
        index: mid,
        x: getX(mid),
      });
    }
    const lastIdx = data.length - 1;
    xTicks.push({
      label: targetRetirementAge !== undefined
        ? `Age ${targetRetirementAge.toString()}`
        : data[lastIdx].year > 0
        ? `Year ${data[lastIdx].year.toString()}`
        : `Age ${data[lastIdx].age.toString()}`,
      index: lastIdx,
      x: getX(lastIdx),
    });
  }

  // Interactive scrubber handling
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * width;
    const clampedX = Math.max(padLeft, Math.min(width - padRight, svgX));
    const ratio = (clampedX - padLeft) / chartWidth;
    const index = Math.round(ratio * (data.length - 1));
    setHoverIndex(Math.max(0, Math.min(data.length - 1, index)));
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches[0].clientX - rect.left;
    const svgX = (clientX / rect.width) * width;
    const clampedX = Math.max(padLeft, Math.min(width - padRight, svgX));
    const ratio = (clampedX - padLeft) / chartWidth;
    const index = Math.round(ratio * (data.length - 1));
    setHoverIndex(Math.max(0, Math.min(data.length - 1, index)));
  };

  const activePointIndex = hoverIndex ?? data.length - 1;
  const activeData = data[activePointIndex];
  const activeX = getX(activePointIndex);
  const activeY = getY(activeData.totalValue);

  return (
    <div className="relative w-full select-none" ref={containerRef}>
      {/* SVG Chart */}
      <svg
        viewBox={`0 0 ${width.toString()} ${height.toString()}`}
        className="w-full h-auto overflow-visible cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setHoverIndex(null); }}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => { setHoverIndex(null); }}
        aria-label="Pensions growth projection chart"
      >
        <defs>
          {/* Growth Area Gradient */}
          <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ca3a4" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#005b5c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#002e2e" stopOpacity="0.2" />
          </linearGradient>

          {/* Deposits Area Gradient */}
          <linearGradient id="depositsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e4e4e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0a2222" stopOpacity="0.4" />
          </linearGradient>

          {/* Range Fill Gradient */}
          <linearGradient id="rangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b0de96" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#005b5c" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Horizontal Gridlines & Y-Axis Labels */}
        {gridTicks.map((tick) => (
          <g key={tick.y}>
            <line
              x1={padLeft}
              y1={tick.y}
              x2={width - padRight}
              y2={tick.y}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeDasharray="4 4"
            />
            <text
              x={width - padRight + 8}
              y={tick.y + 4}
              fill="rgba(255, 255, 255, 0.45)"
              fontSize="11"
              fontWeight="500"
              fontFamily="sans-serif"
            >
              {formatCurrency(tick.val, currency, true)}
            </text>
          </g>
        ))}

        {/* Baseline Axis */}
        <line
          x1={padLeft}
          y1={baselineY}
          x2={width - padRight}
          y2={baselineY}
          stroke="rgba(255, 255, 255, 0.2)"
        />

        {/* Shaded Scenario Range if active */}
        {showRange && (
          <path d={rangeArea} fill="url(#rangeGradient)" />
        )}

        {/* Shaded Growth Total Area */}
        <path d={totalArea} fill="url(#growthGradient)" />

        {/* Shaded Deposits Area */}
        <path d={depositArea} fill="url(#depositsGradient)" />

        {/* Deposit Stroke Curve */}
        <path
          d={depositLine}
          fill="none"
          stroke="#427878"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Total Value Hero Stroke Curve */}
        <path
          d={totalLine}
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* X-Axis Milestone Labels */}
        {xTicks.map((tick) => (
          <text
            key={tick.label}
            x={tick.x}
            y={height - 10}
            fill="rgba(255, 255, 255, 0.6)"
            fontSize="11"
            textAnchor={tick.index === 0 ? 'start' : tick.index === data.length - 1 ? 'end' : 'middle'}
            fontFamily="sans-serif"
          >
            {tick.label}
          </text>
        ))}

        {/* Scrubber vertical guide line when hovering */}
        {hoverIndex !== null && (
          <g>
            <line
              x1={activeX}
              y1={padTop}
              x2={activeX}
              y2={baselineY}
              stroke="rgba(176, 222, 150, 0.7)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            {/* Scrubber dot on deposits */}
            <circle
              cx={activeX}
              cy={getY(activeData.totalDeposits)}
              r="4"
              fill="#427878"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>
        )}

        {/* Active Hero Point Dot */}
        <circle
          cx={activeX}
          cy={activeY}
          r="6"
          fill="#ffffff"
          stroke="#002e2e"
          strokeWidth="2.5"
        />
        <circle
          cx={activeX}
          cy={activeY}
          r="10"
          fill="none"
          stroke="rgba(176, 222, 150, 0.6)"
          strokeWidth="2"
        />
      </svg>

      {/* Floating Endpoint Milestone Pill Badge */}
      {hoverIndex === null && (
        <div
          className="absolute hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white text-brand-dark rounded-full shadow-lg font-bold text-xs pointer-events-none transition-all duration-200"
          style={{
            right: `${(((padRight - 20) / width) * 100).toString()}%`,
            top: `${((getY(data[data.length - 1].totalValue) / height) * 100 - 12).toString()}%`,
            transform: 'translateY(-100%)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
          <span>
            {formatCurrency(data[data.length - 1].totalValue, currency, true)} at{' '}
            {targetRetirementAge !== undefined ? `age ${targetRetirementAge.toString()}` : `year ${data[data.length - 1].year.toString()}`}
          </span>
        </div>
      )}

      {/* Interactive Floating Scrub Tooltip */}
      {hoverIndex !== null && (
        <div
          className="absolute z-20 pointer-events-none bg-brand-dark/95 border border-white/20 text-white rounded-xl p-3 shadow-2xl backdrop-blur-md transition-transform duration-75 text-xs"
          style={{
            left: `${Math.min(75, Math.max(25, (activeX / width) * 100)).toString()}%`,
            top: '10px',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="font-bold text-brand-green border-b border-white/10 pb-1 mb-1.5 flex justify-between gap-4">
            <span>{activeData.year > 0 ? `Year ${activeData.year.toString()}` : 'Start'} (Age {activeData.age.toString()})</span>
            <span>{formatCurrency(activeData.totalValue, currency)}</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between gap-4 text-white/80">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-[#427878]"></span>
                Total Contributed:
              </span>
              <span className="font-semibold">{formatCurrency(activeData.totalDeposits, currency)}</span>
            </div>
            {activeData.employerDeposits > 0 && (
              <div className="flex justify-between gap-4 text-white/60 pl-3.5 text-[10px]">
                <span>Employer Match:</span>
                <span>{formatCurrency(activeData.employerDeposits, currency)}</span>
              </div>
            )}
            <div className="flex justify-between gap-4 text-brand-green">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-brand-green"></span>
                Compound Growth:
              </span>
              <span className="font-semibold">{formatCurrency(activeData.interestEarned, currency)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
