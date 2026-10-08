import React from "react";

interface StatBarProps {
  label: string;
  value: number;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value }) => {
  const maxStat = 255;
  const percentage = Math.min((value / maxStat) * 100 * 2, 100); // normalized visually

  const getBarColor = (val: number) => {
    if (val < 50) return "bg-red-500";
    if (val < 80) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
        <span className="uppercase tracking-wider">{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor(value)} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
