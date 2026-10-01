import React, { useState } from 'react';
import { ManifestItem, DropHub, KpiMetrics, TabType } from '../types';
import { monthlyInflowData } from '../data/mockData';

interface DashboardViewProps {
  metrics: KpiMetrics;
  manifests: ManifestItem[];
  hubs: DropHub[];
  onOpenReport: (prefillZone?: string) => void;
  onOpenZone: (hub: DropHub) => void;
  onAdvanceStatus: (id: string) => void;
  onNavigateTab: (tab: TabType) => void;
  onReset: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  manifests,
  hubs,
  onOpenReport,
  onOpenZone,
  onAdvanceStatus,
  onNavigateTab,
  onReset,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('May');
  const [chartHint, setChartHint] = useState<string>(
    'Peak intake reached in May during Lab Decommission Drive.'
  );

  const handleMonthClick = (month: string, kg: number, note: string) => {
    setSelectedMonth(month);
    setChartHint(`${month}: ${kg} kg collected across 8 active telemetry bins. ${note}`);
  };

  const getStatusBadge = (status: ManifestItem['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="bg-surface-container text-tertiary font-label-sm text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border border-tertiary-fixed/30">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
            Pending
          </span>
        );
      case 'Assigned':
        return (
          <span className="bg-secondary-container/20 text-secondary font-label-sm text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border border-secondary-container/40">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Assigned
          </span>
        );
      case 'Collected':
        return (
          <span className="bg-primary-fixed/40 text-on-primary-fixed-variant font-label-sm text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border border-primary-fixed/60">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            Collected
          </span>
        );
      case 'Verified':
        return (
          <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border border-surface-container-highest">
            <span className="material-symbols-outlined text-[13px] text-primary font-bold">check</span>
            Verified
          </span>
        );
      default:
        return (
          <span className="bg-surface-container text-outline font-label-sm text-[11px] px-2 py-0.5 rounded-full">
            {status}
          </span>
        );
    }
  };

  const getItemIcon = (title: string, category?: string) => {
    const text = (title + ' ' + (category || '')).toLowerCase();
    if (text.includes('laptop') || text.includes('thinkpad')) return 'laptop_mac';
    if (text.includes('magsafe') || text.includes('charger') || text.includes('adapter')) return 'electrical_services';
    if (text.includes('projector') || text.includes('display') || text.includes('monitor')) return 'videocam';
    if (text.includes('uart') || text.includes('pcb') || text.includes('circuit')) return 'developer_board';
    if (text.includes('battery')) return 'battery_alert';
    return 'devices';
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile pb-space-2xl gap-space-lg max-w-4xl mx-auto">
      {/* Status & Context Pill Bar */}
      <div className="flex flex-wrap items-center justify-between gap-space-xs mt-space-2xs">
        <div className="flex items-center gap-space-2xs bg-surface-container-low px-space-sm py-1 rounded-full shadow-xs border border-surface-container">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="font-label-sm text-label-sm text-primary font-bold">
            Campus Operations Online
          </span>
          <span className="text-outline-variant font-body-sm text-body-sm px-1">•</span>
          <span className="font-code-num text-code-num text-outline font-semibold">SVIT Cluster</span>
        </div>

        <div className="flex items-center gap-space-2xs">
          <span className="bg-surface-container text-on-surface-variant px-space-xs py-0.5 rounded-full font-label-sm text-[10px] tracking-wide uppercase font-semibold">
            Pilot Demo
          </span>
          <button
            onClick={onReset}
            className="flex items-center gap-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant active:scale-95 px-space-xs py-1 rounded-lg text-label-sm font-label-sm transition-all shadow-xs cursor-pointer"
            id="reset-demo-btn"
            title="Reset to SVIT baseline"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Command Center Header Overview */}
      <div className="flex flex-col gap-space-2xs">
        <div className="flex items-center gap-space-xs">
          <span className="px-space-xs py-0.5 bg-primary-fixed/30 text-on-primary-fixed-variant rounded font-label-sm text-[10px] font-bold uppercase tracking-wider">
            SVIT • Sustainability Platform
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-bold">
          Campus E-Waste Command Center
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          Track, collect, and responsibly route institutional and student electronic waste across
          campus laboratories and dormitories.
        </p>
      </div>

      {/* KPI Cards Grid (4 Mobile Bento Tiles) */}
      <div className="grid grid-cols-2 gap-space-sm w-full">
        {/* Total Weight */}
        <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-md transition-shadow border border-surface-container">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-outline">Collected</span>
            <div className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">scale</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-metric-xl text-metric-xl text-on-surface font-bold tracking-tight">
              {metrics.weight}
            </span>
            <span className="font-label-md text-label-md text-outline font-medium">kg</span>
          </div>
          <div className="flex items-center gap-1 mt-space-2xs text-primary font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>+14% this month</span>
          </div>
        </div>

        {/* Processed Units */}
        <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-md transition-shadow border border-surface-container">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-outline">Processed</span>
            <div className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">devices</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-metric-xl text-metric-xl text-on-surface font-bold tracking-tight">
              {metrics.devices}
            </span>
            <span className="font-label-md text-label-md text-outline font-medium">units</span>
          </div>
          <div className="flex items-center gap-1 mt-space-2xs text-secondary font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>100% Certified</span>
          </div>
        </div>

        {/* Active Zones */}
        <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-md transition-shadow border border-surface-container">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-outline">Drop Hubs</span>
            <div className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[18px]">share_location</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-metric-xl text-metric-xl text-on-surface font-bold tracking-tight">
              {metrics.points}
            </span>
            <span className="font-label-md text-label-md text-outline font-medium">Active</span>
          </div>
          <div className="flex items-center gap-1 mt-space-2xs text-primary font-label-sm text-label-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>All reporting</span>
          </div>
        </div>

        {/* Pending Dispatch */}
        <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-md transition-shadow border border-surface-container">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-outline">Pending</span>
            <div className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary-container">
              <span className="material-symbols-outlined text-[18px]">pending_actions</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-metric-xl text-metric-xl text-on-surface font-bold tracking-tight">
              {metrics.pending}
            </span>
            <span className="font-label-md text-label-md text-outline font-medium">Pickups</span>
          </div>
          <div className="flex items-center gap-1 mt-space-2xs text-tertiary font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[14px]">local_shipping</span>
            <span>Next route 2:30 PM</span>
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-container to-secondary p-space-lg rounded-xl shadow-md text-on-primary flex flex-col gap-space-sm">
        <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-surface-container-lowest/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center gap-space-xs">
          <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/20 flex items-center justify-center backdrop-blur-md">
            <span className="material-symbols-outlined text-[20px] text-on-primary">cycle</span>
          </div>
          <span className="font-label-sm text-label-sm tracking-wider uppercase font-semibold text-primary-fixed">
            Closing the loop on campus e-waste
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-primary">
            Have unused electronics or lab scrap?
          </h3>
          <p className="font-body-sm text-body-sm text-on-primary/80">
            SVIT facility logistics dispatches student couriers within 2 hours.
          </p>
        </div>
        <div className="pt-space-2xs flex items-center gap-space-sm">
          <button
            onClick={() => onOpenReport()}
            className="flex-1 py-space-xs px-space-md bg-surface-container-lowest text-primary hover:bg-surface-container-low active:scale-[0.98] font-label-md text-label-md font-bold rounded-lg shadow-sm flex items-center justify-center gap-space-xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Report E-Waste</span>
          </button>
          <button
            onClick={() => onNavigateTab('pickup-ops')}
            className="px-space-sm py-space-xs bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer"
            title="View Pickup Route Operations"
            aria-label="View Pickup Route Operations"
          >
            <span className="material-symbols-outlined text-[18px]">route</span>
          </button>
        </div>
      </div>

      {/* 2026 Collection Trend Chart (SVG Sparkline & Bar) */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs flex flex-col gap-space-md border border-surface-container">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Monthly Inflow (2026)
            </h3>
            <span className="font-body-sm text-body-sm text-outline">
              Gross intake weight logged in kilograms
            </span>
          </div>
          <span className="font-code-num text-code-num text-primary font-bold bg-surface-container-low px-space-xs py-0.5 rounded border border-primary/20">
            Avg 47 kg/mo
          </span>
        </div>

        {/* Chart container */}
        <div className="w-full flex flex-col gap-space-xs">
          <div className="h-44 w-full relative flex items-end justify-between px-2 pt-6">
            {/* Background metric guides */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full h-px bg-outline"></div>
              <div className="w-full h-px bg-outline"></div>
              <div className="w-full h-px bg-outline"></div>
              <div className="w-full h-px bg-outline"></div>
            </div>

            {monthlyInflowData.map((d) => {
              const isSelected = selectedMonth === d.month;
              return (
                <div
                  key={d.label}
                  onClick={() => handleMonthClick(d.month, d.weightKg, d.note)}
                  className="flex flex-col items-center gap-1 z-10 flex-1 group cursor-pointer"
                >
                  <span
                    className={`font-code-num text-[10px] transition-opacity font-bold ${
                      isSelected ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100 text-outline'
                    }`}
                  >
                    {d.weightKg}kg
                  </span>
                  <div
                    className={`w-7 sm:w-10 rounded-t-md transition-all duration-300 ${
                      d.isPeak
                        ? 'bg-primary group-hover:bg-primary-container shadow-sm'
                        : d.isLive
                        ? 'bg-secondary-container/50 group-hover:bg-secondary-container'
                        : isSelected
                        ? 'bg-primary-container'
                        : 'bg-surface-container-high group-hover:bg-primary-container/70'
                    }`}
                    style={{ height: `${d.heightPercent}%` }}
                  />
                  <span
                    className={`font-label-sm text-[11px] ${
                      d.isPeak
                        ? 'text-primary font-bold'
                        : d.isLive
                        ? 'text-secondary font-medium'
                        : isSelected
                        ? 'text-on-surface font-bold'
                        : 'text-outline group-hover:text-on-surface'
                    }`}
                  >
                    {d.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="bg-surface-container-low px-space-sm py-2 rounded-lg flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm transition-all border border-surface-container"
          >
            <span className="flex items-center gap-1.5 text-xs sm:text-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">insights</span>
              <span>{chartHint}</span>
            </span>
            <span className="font-code-num text-[11px] text-outline font-medium whitespace-nowrap ml-2">
              Tap bar
            </span>
          </div>
        </div>
      </div>

      {/* Campus Collection-Point Status Grid (8 Zones) */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Active Collection Points
            </h3>
          </div>
          <span className="font-code-num text-code-num text-primary font-bold">8 / 8 Online</span>
        </div>

        <div className="grid grid-cols-2 gap-space-xs w-full">
          {hubs.map((hub) => {
            const isOverfill = hub.capacityPercent >= 90;
            const isNearCap = hub.capacityPercent >= 70 && hub.capacityPercent < 90;

            const dotColor = isOverfill ? 'bg-error' : isNearCap ? 'bg-tertiary' : 'bg-primary';
            const barColor = isOverfill ? 'bg-error' : isNearCap ? 'bg-tertiary-container' : 'bg-primary';

            return (
              <button
                key={hub.id}
                onClick={() => onOpenZone(hub)}
                className="text-left bg-surface-container-lowest p-space-sm rounded-xl shadow-xs hover:shadow active:scale-[0.98] transition-all flex flex-col justify-between border border-surface-container cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                    {hub.name}
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`}></span>
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-outline mt-0.5 truncate">
                  {hub.subtitle}
                </span>
                <div className="mt-space-xs w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`${barColor} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(100, hub.capacityPercent)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span
                    className={`font-code-num text-[10px] ${
                      isOverfill
                        ? 'text-error font-bold'
                        : isNearCap
                        ? 'text-tertiary font-semibold'
                        : 'text-outline'
                    }`}
                  >
                    Cap: {hub.capacityPercent}% {isOverfill ? '(Overfill)' : isNearCap ? '(Full soon)' : ''}
                  </span>
                  <span className="font-label-sm text-[10px] text-primary font-bold">
                    {isOverfill ? 'Dispatch' : 'Tap Info'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Pickup Requests Live Table / Feed */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Recent Pickup Requests
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-surface-container font-code-num text-code-num text-on-surface-variant font-bold">
              {manifests.length}
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('pickup-ops')}
            className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
          >
            <span>View Ops</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Live Requests List Container */}
        <div className="flex flex-col gap-space-xs w-full">
          {manifests.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onAdvanceStatus(item.id)}
              className="bg-surface-container-lowest p-space-sm rounded-xl shadow-xs flex items-center justify-between gap-space-xs transition-all hover:shadow cursor-pointer border border-surface-container active:scale-[0.99]"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    {getItemIcon(item.item, item.category)}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-code-num text-code-num text-outline font-semibold">
                      {item.id}
                    </span>
                    <span className="text-outline-variant text-[10px]">•</span>
                    <span className="font-label-sm text-label-sm text-outline truncate">
                      {item.location}
                    </span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface font-semibold truncate">
                    {item.item}
                  </span>
                  <span className="font-body-sm text-[11px] text-outline">{item.time}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                {getStatusBadge(item.status)}
                <span className="font-code-num text-[10px] text-outline">Tap to advance</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
