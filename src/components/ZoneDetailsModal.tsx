import React from 'react';
import { DropHub } from '../types';

interface ZoneDetailsModalProps {
  hub: DropHub | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestPickup: (zoneName: string) => void;
  onTriggerClearance?: (hubId: string) => void;
}

export const ZoneDetailsModal: React.FC<ZoneDetailsModalProps> = ({
  hub,
  isOpen,
  onClose,
  onRequestPickup,
  onTriggerClearance,
}) => {
  if (!isOpen || !hub) return null;

  const isOverfill = hub.capacityPercent >= 90;
  const isNearCap = hub.capacityPercent >= 70 && hub.capacityPercent < 90;

  return (
    <div
      className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex flex-col justify-end transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-t-2xl p-space-lg flex flex-col gap-space-md max-w-lg mx-auto w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-surface-container-high rounded-full mx-auto -mt-2 mb-1" />

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isOverfill
                  ? 'bg-error-container text-error'
                  : isNearCap
                  ? 'bg-tertiary-fixed text-tertiary'
                  : 'bg-surface-container-low text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {isOverfill ? 'warning' : 'pin_drop'}
              </span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {hub.name}
              </h4>
              <span className="font-body-sm text-body-sm text-outline">
                {hub.subtitle} • {hub.locationDetails}
              </span>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Sensor Telemetry Stats */}
        <div className="grid grid-cols-2 gap-space-xs">
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-outline">Telemetry Weight</span>
            <p className="font-headline-md text-headline-md text-on-surface font-bold mt-1">
              {hub.weightKg.toFixed(1)} <span className="text-sm font-normal text-outline">/ {hub.maxCapacityKg} kg</span>
            </p>
          </div>
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between">
            <span className="font-label-sm text-label-sm text-outline">Optical Fill Sensor</span>
            <p
              className={`font-headline-md text-headline-md font-bold mt-1 ${
                isOverfill ? 'text-error' : isNearCap ? 'text-tertiary' : 'text-primary'
              }`}
            >
              {hub.capacityPercent}%{' '}
              <span className="text-xs font-medium">
                {isOverfill ? '(Overfill)' : isNearCap ? '(Full Soon)' : '(Nominal)'}
              </span>
            </p>
          </div>
        </div>

        {/* Hardware Status Pills */}
        <div className="flex items-center justify-between px-space-xs py-1 text-xs text-outline border-y border-surface-container">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">battery_charging_full</span>
            Battery: {hub.batteryLevel}%
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">thermostat</span>
            Temp: {hub.temperature}°C
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">history</span>
            Emptied: {hub.lastEmptied}
          </span>
        </div>

        {/* Authorized Waste Categories */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-outline">Authorized Waste Categories</span>
          <div className="flex flex-wrap gap-1.5">
            {hub.acceptedCategories.map((cat, i) => (
              <span
                key={i}
                className="bg-surface-container px-2.5 py-1 rounded-md text-[11px] font-label-sm text-on-surface font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
          <button
            className="flex-1 py-space-xs px-space-md bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
            onClick={() => {
              onRequestPickup(hub.name);
              onClose();
            }}
          >
            <span className="material-symbols-outlined text-[18px]">add_task</span>
            <span>Request Pickup Here</span>
          </button>

          {isOverfill && onTriggerClearance && (
            <button
              className="py-space-xs px-space-md bg-error hover:bg-red-700 text-white font-label-md text-label-md font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
              onClick={() => {
                onTriggerClearance(hub.id);
                onClose();
              }}
            >
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              <span>Dispatch Emptying</span>
            </button>
          )}

          <button
            className="py-space-xs px-space-md bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md rounded-lg transition-all cursor-pointer"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
