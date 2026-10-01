import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, pendingCount = 0 }) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-surface-container">
      <div className="flex justify-around items-center h-16 px-space-xs max-w-4xl mx-auto">
        {/* Dashboard Tab */}
        <button
          onClick={() => onTabChange('dashboard')}
          aria-current={activeTab === 'dashboard' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'dashboard'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">space_dashboard</span>
          <span className="font-label-sm text-[10px] tracking-tight">Dashboard</span>
        </button>

        {/* Pickup Ops Tab */}
        <button
          onClick={() => onTabChange('pickup-ops')}
          aria-current={activeTab === 'pickup-ops' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors relative cursor-pointer ${
            activeTab === 'pickup-ops'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-2.5 bg-tertiary-container text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center leading-tight">
                {pendingCount}
              </span>
            )}
          </div>
          <span className="font-label-sm text-[10px] tracking-tight">Pickup Ops</span>
        </button>

        {/* Center Report Action Button */}
        <button
          onClick={() => onTabChange('report')}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-on-surface-variant hover:text-on-surface transition-colors -mt-4 cursor-pointer group"
          aria-label="Report E-Waste"
        >
          <div
            className={`w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_4px_14px_rgba(0,105,72,0.4)] group-active:scale-95 group-hover:bg-primary-container transition-all ${
              activeTab === 'report' ? 'ring-4 ring-primary-fixed/40' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">add</span>
          </div>
          <span
            className={`font-label-sm text-[10px] tracking-tight mt-0.5 ${
              activeTab === 'report' ? 'text-primary font-bold' : ''
            }`}
          >
            Report
          </span>
        </button>

        {/* Drop Hubs / Points Tab */}
        <button
          onClick={() => onTabChange('points')}
          aria-current={activeTab === 'points' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'points'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">pin_drop</span>
          <span className="font-label-sm text-[10px] tracking-tight">Points</span>
        </button>

        {/* Impact Telemetry Tab */}
        <button
          onClick={() => onTabChange('impact')}
          aria-current={activeTab === 'impact' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'impact'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">eco</span>
          <span className="font-label-sm text-[10px] tracking-tight">Impact</span>
        </button>
      </div>
    </nav>
  );
};
