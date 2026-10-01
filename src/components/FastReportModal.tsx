import React, { useState, useEffect } from 'react';
import { ManifestItem } from '../types';

interface FastReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: Partial<ManifestItem>) => void;
  defaultZone?: string;
}

export const FastReportModal: React.FC<FastReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultZone,
}) => {
  const [category, setCategory] = useState('Laptop');
  const [zone, setZone] = useState('Hostel 4');
  const [qty, setQty] = useState(1);
  const [condition, setCondition] = useState('Salvageable Parts');
  const [submitterName, setSubmitterName] = useState('');
  const [hasHazard, setHasHazard] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (defaultZone) {
      setZone(defaultZone);
    }
  }, [defaultZone]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Estimate weight based on category and qty
    let unitWeight = 1.8;
    if (category.includes('Charger')) unitWeight = 0.4;
    else if (category.includes('Display')) unitWeight = 3.6;
    else if (category.includes('PCB')) unitWeight = 0.3;
    else if (category.includes('Peripherals')) unitWeight = 0.5;
    else if (category.includes('Lab Equipment')) unitWeight = 5.2;

    const totalWeight = Number((unitWeight * qty).toFixed(1));

    onSubmit({
      item: `${qty > 1 ? `${qty}x ` : ''}${category}`,
      location: zone,
      category,
      condition,
      weight: totalWeight,
      submittedBy: submitterName || 'Campus Member (SVIT)',
      hasBatteryHazard: hasHazard,
      notes: notes || undefined,
      status: 'Pending',
      time: 'Just now',
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex flex-col justify-end transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-t-2xl p-space-lg flex flex-col gap-space-md max-w-lg mx-auto w-full shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-surface-container-high rounded-full mx-auto -mt-2 mb-1" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed/30 text-on-primary-fixed-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Fast E-Waste Log
              </h4>
              <span className="font-body-sm text-body-sm text-outline">
                Submit campus intake dispatch ticket
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
          <div>
            <label className="font-label-sm text-label-sm text-on-surface font-medium block mb-1">
              Equipment Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-2.5 focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container cursor-pointer"
            >
              <option value="Laptop">Laptop / ThinkPad</option>
              <option value="Charger / Adapter">AC Adapter / Charger Cord</option>
              <option value="Display / Monitor">CRT / TFT Monitor or Projector</option>
              <option value="Circuit PCB">Microcontroller / PCB Scrap</option>
              <option value="Peripherals">Keyboards &amp; Mice Cables</option>
              <option value="Lab Equipment">Oscilloscope / Power Rig</option>
            </select>
          </div>

          <div>
            <label className="font-label-sm text-label-sm text-on-surface font-medium block mb-1">
              Campus Zone Location
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-2.5 focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container cursor-pointer"
            >
              <option value="Hostel 4">Hostel 4 (West Gate)</option>
              <option value="Hostel 1">Hostel 1 (Foyer)</option>
              <option value="Hostel 2">Hostel 2 (Lounge)</option>
              <option value="Hostel 3">Hostel 3 (Veranda)</option>
              <option value="Central Library">Central Library (Turnstiles)</option>
              <option value="EC Lab">EC Lab (Circuits)</option>
              <option value="Computer Lab">Computer Lab (Bay B-3)</option>
              <option value="Lecture Block">Lecture Block (Dean Quad)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface font-medium block mb-1">
                Estimated Qty
              </label>
              <input
                type="number"
                min="1"
                max="25"
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-2.5 focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container"
              />
            </div>

            <div>
              <label className="font-label-sm text-label-sm text-on-surface font-medium block mb-1">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-2.5 focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container cursor-pointer"
              >
                <option value="Scrap / Non-functional">Non-functional Scrap</option>
                <option value="Salvageable Parts">Salvageable Parts</option>
                <option value="Working / Outdated">Working, Deprecated</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-label-sm text-label-sm text-on-surface font-medium block mb-1">
              Your Name / Roll No. (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Verma (ME 3rd Year)"
              value={submitterName}
              onChange={(e) => setSubmitterName(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg px-space-sm py-2 focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container"
            />
          </div>

          {/* Hazardous checkbox */}
          <div className="flex items-center gap-space-xs p-space-xs bg-surface-container-low rounded-lg">
            <input
              type="checkbox"
              id="hazard-check"
              checked={hasHazard}
              onChange={(e) => setHasHazard(e.target.checked)}
              className="w-4 h-4 text-primary rounded border-outline focus:ring-primary"
            />
            <label htmlFor="hazard-check" className="text-xs text-on-surface-variant cursor-pointer">
              Contains lithium battery, bulging cell, or exposed capacitor
            </label>
          </div>

          <button
            type="submit"
            className="mt-space-xs w-full py-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold rounded-lg shadow flex items-center justify-center gap-space-xs active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Submit Request to Dispatch</span>
          </button>
        </form>
      </div>
    </div>
  );
};
