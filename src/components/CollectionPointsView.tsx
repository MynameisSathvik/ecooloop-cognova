import React, { useState } from 'react';
import { DropHub } from '../types';

interface CollectionPointsViewProps {
  hubs: DropHub[];
  onOpenZone: (hub: DropHub) => void;
  onClearHub: (hubId: string) => void;
  onRequestPickup: (zoneName: string) => void;
}

export const CollectionPointsView: React.FC<CollectionPointsViewProps> = ({
  hubs,
  onOpenZone,
  onClearHub,
  onRequestPickup,
}) => {
  const [filter, setFilter] = useState<'all' | 'nominal' | 'warning' | 'alert'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');

  const filteredHubs = hubs.filter((h) => {
    if (filter === 'alert') return h.capacityPercent >= 90;
    if (filter === 'warning') return h.capacityPercent >= 70 && h.capacityPercent < 90;
    if (filter === 'nominal') return h.capacityPercent < 70;
    return true;
  });

  const overfillCount = hubs.filter((h) => h.capacityPercent >= 90).length;
  const warningCount = hubs.filter((h) => h.capacityPercent >= 70 && h.capacityPercent < 90).length;

  return (
    <div className="flex flex-col w-full px-margin-mobile pb-space-2xl gap-space-md max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="px-space-xs py-0.5 bg-primary-fixed/30 text-on-primary-fixed-variant rounded font-label-sm text-[10px] font-bold uppercase tracking-wider">
            IoT Sensor Telemetry
          </span>
          <span className="font-code-num text-xs text-primary font-bold">
            {hubs.length} / {hubs.length} Active Hubs
          </span>
        </div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
          Campus Drop Hubs &amp; Telemetry
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Live ultrasonic and strain-gauge telemetry across 8 designated e-waste receptacles situated in SVIT departments and residential hostels.
        </p>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            filter === 'all'
              ? 'bg-surface-container-highest border-primary text-primary font-bold ring-1 ring-primary'
              : 'bg-surface-container-lowest border-surface-container text-on-surface hover:bg-surface-container-low'
          }`}
        >
          <span className="text-[10px] text-outline uppercase block">All Drop Hubs</span>
          <span className="font-metric-xl text-lg font-bold block">{hubs.length} Online</span>
        </button>

        <button
          onClick={() => setFilter('warning')}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            filter === 'warning'
              ? 'bg-tertiary-fixed/30 border-tertiary text-tertiary font-bold ring-1 ring-tertiary'
              : 'bg-surface-container-lowest border-surface-container text-on-surface hover:bg-surface-container-low'
          }`}
        >
          <span className="text-[10px] text-tertiary uppercase block font-semibold">Near Capacity</span>
          <span className="font-metric-xl text-lg font-bold block text-tertiary">
            {warningCount} Hubs
          </span>
        </button>

        <button
          onClick={() => setFilter('alert')}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            filter === 'alert'
              ? 'bg-error-container/30 border-error text-error font-bold ring-1 ring-error'
              : 'bg-surface-container-lowest border-surface-container text-on-surface hover:bg-surface-container-low'
          }`}
        >
          <span className="text-[10px] text-error uppercase block font-semibold">Overfill Alert</span>
          <span className="font-metric-xl text-lg font-bold block text-error">
            {overfillCount} Hubs
          </span>
        </button>
      </div>

      {/* View Switcher (Cards vs Interactive Map) */}
      <div className="flex items-center justify-between pt-1">
        <span className="font-headline-sm text-xs uppercase tracking-wider text-outline font-bold">
          Drop Point Locations
        </span>
        <div className="bg-surface-container-low p-0.5 rounded-lg flex items-center border border-surface-container">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
              viewMode === 'cards'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
              viewMode === 'map'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">map</span>
            <span>Campus Map</span>
          </button>
        </div>
      </div>

      {/* Interactive Campus Map View */}
      {viewMode === 'map' ? (
        <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container shadow-xs flex flex-col gap-3">
          <div className="relative w-full h-80 bg-surface-container-low rounded-xl overflow-hidden border border-surface-container flex items-center justify-center">
            {/* Campus Schematic Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#bccac0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {/* Campus Zones Representation */}
            <div className="absolute top-4 left-6 text-[10px] uppercase tracking-wider font-bold text-outline pointer-events-none">
              SVIT Main Academic &amp; Residential Campus
            </div>

            {/* Schematic Buildings */}
            <div className="absolute top-10 left-8 w-24 h-16 bg-surface-container rounded-lg border border-outline-variant/60 flex items-center justify-center text-[10px] text-outline font-semibold">
              Hostels Quad
            </div>
            <div className="absolute top-10 right-8 w-28 h-20 bg-surface-container rounded-lg border border-outline-variant/60 flex items-center justify-center text-[10px] text-outline font-semibold">
              Engineering Labs
            </div>
            <div className="absolute bottom-10 left-12 w-32 h-16 bg-surface-container rounded-lg border border-outline-variant/60 flex items-center justify-center text-[10px] text-outline font-semibold">
              Central Library
            </div>
            <div className="absolute bottom-10 right-10 w-28 h-18 bg-surface-container rounded-lg border border-outline-variant/60 flex items-center justify-center text-[10px] text-outline font-semibold">
              Admin &amp; Lectures
            </div>

            {/* Interactive Pins */}
            {hubs.map((hub, i) => {
              // Distribute pins schematically
              const positions = [
                { top: '22%', left: '16%' }, // Hostel 1
                { top: '32%', left: '26%' }, // Hostel 2
                { top: '15%', left: '32%' }, // Hostel 3
                { top: '42%', left: '12%' }, // Hostel 4
                { bottom: '24%', left: '35%' }, // Central Library
                { top: '26%', right: '22%' }, // EC Lab
                { top: '38%', right: '12%' }, // Computer Lab
                { bottom: '26%', right: '24%' }, // Lecture Block
              ];
              const pos = positions[i] || { top: '50%', left: '50%' };
              const isOverfill = hub.capacityPercent >= 90;
              const isNearCap = hub.capacityPercent >= 70 && hub.capacityPercent < 90;
              const pinColor = isOverfill ? 'bg-error text-white' : isNearCap ? 'bg-tertiary text-white' : 'bg-primary text-white';

              return (
                <button
                  key={hub.id}
                  onClick={() => onOpenZone(hub)}
                  style={pos}
                  className={`absolute p-1.5 rounded-full shadow-md flex items-center gap-1 active:scale-90 transition-all cursor-pointer ${pinColor} group z-20`}
                  title={`${hub.name} (${hub.capacityPercent}%)`}
                >
                  <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                  <span className="text-[10px] font-bold px-1 hidden sm:inline group-hover:inline">
                    {hub.name} ({hub.capacityPercent}%)
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-outline px-1">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span> Nominal (&lt;70%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary inline-block"></span> Near Full (70-89%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-error inline-block"></span> Overfill (&ge;90%)
            </span>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          {filteredHubs.map((hub) => {
            const isOverfill = hub.capacityPercent >= 90;
            const isNearCap = hub.capacityPercent >= 70 && hub.capacityPercent < 90;
            const barColor = isOverfill ? 'bg-error' : isNearCap ? 'bg-tertiary-container' : 'bg-primary';

            return (
              <div
                key={hub.id}
                className="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container shadow-xs flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-headline-sm text-base font-bold text-on-surface">
                      {hub.name}
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                        isOverfill
                          ? 'bg-error-container text-error'
                          : isNearCap
                          ? 'bg-tertiary-fixed text-tertiary'
                          : 'bg-primary-fixed/40 text-on-primary-fixed-variant'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isOverfill ? 'bg-error' : isNearCap ? 'bg-tertiary' : 'bg-primary'
                        }`}
                      />
                      {hub.capacityPercent}% {isOverfill ? 'Overfill' : isNearCap ? 'Full Soon' : 'Online'}
                    </span>
                  </div>
                  <span className="text-xs text-outline block">{hub.subtitle}</span>
                  <span className="text-[11px] text-on-surface-variant block mt-0.5">
                    Location: {hub.locationDetails}
                  </span>

                  {/* Progress Bar */}
                  <div className="mt-3 w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <div
                      className={`${barColor} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(100, hub.capacityPercent)}%` }}
                    />
                  </div>
                </div>

                {/* Telemetry diagnostics */}
                <div className="bg-surface-container-low p-2 rounded-lg grid grid-cols-3 gap-1 text-[11px] text-outline text-center">
                  <div>
                    <span className="block text-[9px] uppercase">Weight</span>
                    <strong className="text-on-surface">{hub.weightKg.toFixed(1)} kg</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase">Sensor Battery</span>
                    <strong className="text-on-surface">{hub.batteryLevel}%</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase">Bin Temp</span>
                    <strong className="text-on-surface">{hub.temperature}°C</strong>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1 border-t border-surface-container">
                  <button
                    onClick={() => onOpenZone(hub)}
                    className="flex-1 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Inspect Telemetry
                  </button>

                  {isOverfill ? (
                    <button
                      onClick={() => onClearHub(hub.id)}
                      className="px-3 py-1.5 bg-error text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                      Empty Bin
                    </button>
                  ) : (
                    <button
                      onClick={() => onRequestPickup(hub.name)}
                      className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-container transition-colors shadow-xs cursor-pointer"
                    >
                      Pickup
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
