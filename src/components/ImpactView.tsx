import React, { useState } from 'react';
import { KpiMetrics } from '../types';

interface ImpactViewProps {
  metrics: KpiMetrics;
  onOpenReport: () => void;
}

export const ImpactView: React.FC<ImpactViewProps> = ({ metrics, onOpenReport }) => {
  const [showCertificate, setShowCertificate] = useState(false);

  // Derived environmental metrics based on total collected weight
  const co2AvoidedKg = Math.round(metrics.weight * 14.8);
  const goldGrams = Number((metrics.weight * 0.28).toFixed(1));
  const silverGrams = Number((metrics.weight * 1.45).toFixed(1));
  const copperKg = Number((metrics.weight * 0.14).toFixed(1));
  const treesEquivalent = Math.round(co2AvoidedKg / 21);
  const toxicLeadNeutralizedKg = Number((metrics.weight * 0.012).toFixed(2));

  const leaderboard = [
    { rank: 1, name: 'Central Library', category: 'Institutional Quad', weight: 84.1, points: 2840 },
    { rank: 2, name: 'Hostel 3 (Study Hub)', category: 'Student Residence', weight: 64.2, points: 2180 },
    { rank: 3, name: 'EC Lab & Circuits', category: 'Academic Department', weight: 51.5, points: 1940 },
    { rank: 4, name: 'Hostel 1 (North Wing)', category: 'Student Residence', weight: 42.0, points: 1420 },
    { rank: 5, name: 'Computer Science Lab', category: 'Academic Department', weight: 36.8, points: 1250 },
    { rank: 6, name: 'Hostel 2 (Common Lounge)', category: 'Student Residence', weight: 24.3, points: 820 },
  ];

  return (
    <div className="flex flex-col w-full px-margin-mobile pb-space-2xl gap-space-md max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="px-space-xs py-0.5 bg-primary-fixed/30 text-on-primary-fixed-variant rounded font-label-sm text-[10px] font-bold uppercase tracking-wider">
            Institutional Environmental Ledger
          </span>
          <span className="font-code-num text-xs text-primary font-bold">
            ISO 14001:2015 Tier
          </span>
        </div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
          Campus Sustainability Impact
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Quantified environmental dividends from responsible campus routing, material salvaging, and downstream closed-loop smelter extraction.
        </p>
      </div>

      {/* Hero Environmental Impact Banner */}
      <div className="bg-gradient-to-br from-primary via-primary-container to-secondary p-space-lg rounded-2xl shadow-md text-white flex flex-col gap-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-primary-fixed uppercase tracking-wider">
            Net Carbon Dividend
          </span>
          <span className="material-symbols-outlined text-[24px] text-primary-fixed">forest</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-metric-xl text-3xl sm:text-4xl font-bold tracking-tight">
            {co2AvoidedKg.toLocaleString()}
          </span>
          <span className="text-lg font-medium opacity-90">kg CO₂e Averted</span>
        </div>

        <p className="text-xs text-white/85 max-w-md">
          Equivalent to preserving{' '}
          <strong className="text-white font-bold">{treesEquivalent} mature campus urban trees</strong>{' '}
          over their lifetime by diverting toxic heavy metals from municipal landfills.
        </p>

        <div className="flex items-center gap-2 pt-2 border-t border-white/20">
          <button
            onClick={() => setShowCertificate(true)}
            className="py-1.5 px-3 bg-surface-container-lowest text-primary hover:bg-surface-container-low font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>View Institutional Certificate</span>
          </button>
          <button
            onClick={onOpenReport}
            className="py-1.5 px-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            + Log More Waste
          </button>
        </div>
      </div>

      {/* Circular Recovery Bento Grid */}
      <div className="flex flex-col gap-2">
        <span className="font-headline-sm text-xs uppercase tracking-wider text-outline font-bold">
          Precious &amp; Industrial Minerals Reclaimed
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container shadow-xs">
            <span className="text-[10px] text-outline uppercase block">Gold (Au)</span>
            <span className="font-metric-xl text-xl font-bold text-on-surface block mt-1">
              {goldGrams} <span className="text-xs font-medium text-outline">grams</span>
            </span>
            <span className="text-[10px] text-primary font-medium mt-1 block">Circuits &amp; Contacts</span>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container shadow-xs">
            <span className="text-[10px] text-outline uppercase block">Silver (Ag)</span>
            <span className="font-metric-xl text-xl font-bold text-on-surface block mt-1">
              {silverGrams} <span className="text-xs font-medium text-outline">grams</span>
            </span>
            <span className="text-[10px] text-secondary font-medium mt-1 block">SMD &amp; Connectors</span>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container shadow-xs">
            <span className="text-[10px] text-outline uppercase block">Copper (Cu)</span>
            <span className="font-metric-xl text-xl font-bold text-on-surface block mt-1">
              {copperKg} <span className="text-xs font-medium text-outline">kg</span>
            </span>
            <span className="text-[10px] text-tertiary font-medium mt-1 block">Wiring &amp; Motors</span>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container shadow-xs">
            <span className="text-[10px] text-outline uppercase block">Toxic Lead Diverted</span>
            <span className="font-metric-xl text-xl font-bold text-on-surface block mt-1">
              {toxicLeadNeutralizedKg} <span className="text-xs font-medium text-outline">kg</span>
            </span>
            <span className="text-[10px] text-primary font-medium mt-1 block">Soil Leaching Halted</span>
          </div>
        </div>
      </div>

      {/* Campus Circular Leaderboard */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">trophy</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                Campus Circular Leaderboard
              </h3>
              <span className="text-xs text-outline">Top contributing dorms and departments</span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-primary font-code-num">2026 Season</span>
        </div>

        <div className="flex flex-col divide-y divide-surface-container">
          {leaderboard.map((item) => (
            <div key={item.name} className="py-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    item.rank === 1
                      ? 'bg-amber-100 text-amber-800'
                      : item.rank === 2
                      ? 'bg-slate-200 text-slate-700'
                      : item.rank === 3
                      ? 'bg-orange-100 text-orange-800'
                      : 'text-outline font-medium'
                  }`}
                >
                  {item.rank}
                </span>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-xs font-bold text-on-surface">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-outline">{item.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div className="flex flex-col">
                  <span className="font-code-num font-bold text-xs text-on-surface">
                    {item.weight} kg
                  </span>
                  <span className="text-[10px] text-primary font-semibold">
                    +{item.points} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Downstream Partners */}
      <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container flex flex-col gap-2">
        <span className="text-[10px] uppercase font-bold text-outline tracking-wider">
          Authorized Downstream Smelters &amp; Partners
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs text-on-surface font-semibold">
          <span className="bg-surface-container-lowest px-2.5 py-1 rounded-lg border border-surface-container">
            • Reteck Envirotech Ltd. (CPCB Reg. 2024-88)
          </span>
          <span className="bg-surface-container-lowest px-2.5 py-1 rounded-lg border border-surface-container">
            • Saahas Zero Waste Formal Aggregator
          </span>
          <span className="bg-surface-container-lowest px-2.5 py-1 rounded-lg border border-surface-container">
            • Karnataka State Pollution Control Board Validated
          </span>
        </div>
      </div>

      {/* Institutional Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg max-w-md w-full shadow-2xl border border-surface-container flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[28px]">verified</span>
                <div>
                  <h4 className="font-headline-sm text-sm font-bold text-on-surface">
                    Certificate of Circular Stewardship
                  </h4>
                  <span className="text-[11px] text-outline">
                    SVIT Institute of Technology • Green Council
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowCertificate(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="border border-outline-variant/60 rounded-xl p-4 bg-surface-container-lowest flex flex-col gap-3 text-center">
              <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
                ISO 14001:2015 AUDIT COMPLIANT
              </span>
              <p className="text-xs text-on-surface leading-relaxed">
                This certifies that Sri Venkateshwara Institute of Technology (SVIT) has successfully
                diverted <strong className="text-primary">{metrics.weight} kg</strong> of hazardous
                electronic scrap from municipal landfills, preventing{' '}
                <strong>{co2AvoidedKg} kg</strong> of lifecycle greenhouse gas emissions.
              </p>
              <div className="flex justify-between items-center text-[10px] text-outline pt-2 border-t border-surface-container">
                <span>Verification: SVIT-ENV-2026</span>
                <span>Date: Sep 30, 2026</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
