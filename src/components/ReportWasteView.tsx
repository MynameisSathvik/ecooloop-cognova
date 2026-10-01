import React, { useState } from 'react';
import { ManifestItem } from '../types';

interface ReportWasteViewProps {
  onSubmit: (item: Partial<ManifestItem>) => void;
  onNavigateToDashboard: () => void;
}

export const ReportWasteView: React.FC<ReportWasteViewProps> = ({
  onSubmit,
  onNavigateToDashboard,
}) => {
  const [category, setCategory] = useState<string>('Laptop');
  const [zone, setZone] = useState<string>('Hostel 1');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [qty, setQty] = useState<number>(1);
  const [condition, setCondition] = useState<string>('Salvageable Parts');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [hasHazard, setHasHazard] = useState<boolean>(false);
  const [hazardDetails, setHazardDetails] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // Environmental impact multiplier calculation
  const getImpactEstimates = () => {
    let co2PerUnit = 45;
    let preciousMetalsMg = 280;
    if (category.includes('Charger')) {
      co2PerUnit = 4;
      preciousMetalsMg = 30;
    } else if (category.includes('Display')) {
      co2PerUnit = 60;
      preciousMetalsMg = 400;
    } else if (category.includes('PCB')) {
      co2PerUnit = 18;
      preciousMetalsMg = 650;
    } else if (category.includes('Peripherals')) {
      co2PerUnit = 6;
      preciousMetalsMg = 45;
    } else if (category.includes('Lab Equipment')) {
      co2PerUnit = 110;
      preciousMetalsMg = 900;
    }

    return {
      co2: (co2PerUnit * qty).toFixed(0),
      metals: (preciousMetalsMg * qty).toFixed(0),
    };
  };

  const impact = getImpactEstimates();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let unitWeight = 1.8;
    if (category.includes('Charger')) unitWeight = 0.4;
    else if (category.includes('Display')) unitWeight = 4.2;
    else if (category.includes('PCB')) unitWeight = 0.5;
    else if (category.includes('Peripherals')) unitWeight = 0.6;
    else if (category.includes('Lab Equipment')) unitWeight = 6.0;

    const totalWeight = Number((unitWeight * qty).toFixed(1));
    const locationWithRoom = roomNumber ? `${zone} (${roomNumber})` : zone;

    onSubmit({
      item: `${qty > 1 ? `${qty}x ` : ''}${category}`,
      location: locationWithRoom,
      category,
      condition,
      weight: totalWeight,
      submittedBy: name || 'Campus Student/Faculty',
      contactEmail: email || undefined,
      hasBatteryHazard: hasHazard,
      notes: notes + (hasHazard ? ` [HAZMAT: ${hazardDetails || 'Battery/Capacitor hazard declared'}]` : ''),
      status: 'Pending',
      time: 'Just now',
    });

    const newTicketId = 'SVIT-' + Math.floor(1043 + Math.random() * 20);
    setSubmittedTicket(newTicketId);
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile pb-space-2xl gap-space-md max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="px-space-xs py-0.5 bg-primary-fixed/30 text-on-primary-fixed-variant rounded font-label-sm text-[10px] font-bold uppercase tracking-wider w-fit">
          Intake &amp; Dispatch Intake Form
        </span>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
          Report E-Waste for Pickup
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Log laboratory obsolete hardware or personal electronics for free collection by SVIT certified couriers.
        </p>
      </div>

      {submittedTicket ? (
        /* Confirmation Screen */
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl border border-primary-fixed shadow-md flex flex-col items-center gap-4 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-outline font-bold">
              Dispatch Request Created
            </span>
            <h3 className="font-metric-xl text-2xl text-on-surface font-bold">
              Manifest #{submittedTicket}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1 max-w-sm">
              Our campus courier team has received your ticket and will coordinate pickup from{' '}
              <strong className="text-primary">{zone}</strong> within standard route hours.
            </p>
          </div>

          {/* Environmental Impact Token */}
          <div className="w-full bg-surface-container-low p-space-md rounded-xl flex items-center justify-around border border-surface-container">
            <div className="flex flex-col items-center">
              <span className="font-metric-xl text-lg text-primary font-bold">{impact.co2} kg</span>
              <span className="text-[11px] text-outline">CO₂ Averted</span>
            </div>
            <div className="w-px h-8 bg-surface-container-highest" />
            <div className="flex flex-col items-center">
              <span className="font-metric-xl text-lg text-secondary font-bold">{impact.metals} mg</span>
              <span className="text-[11px] text-outline">Metals Salvaged</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full pt-2">
            <button
              onClick={() => {
                setSubmittedTicket(null);
                setNotes('');
                setRoomNumber('');
              }}
              className="flex-1 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs rounded-lg transition-colors"
            >
              Report Another Item
            </button>
            <button
              onClick={onNavigateToDashboard}
              className="flex-1 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
            >
              Back to Command Center
            </button>
          </div>
        </div>
      ) : (
        /* Report Form */
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          {/* Category Selection Cards */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-xs font-bold text-on-surface uppercase tracking-wider">
              1. Equipment Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: 'Laptop', icon: 'laptop_mac', desc: 'Notebooks, MacBooks' },
                { name: 'Charger / Adapter', icon: 'electrical_services', desc: 'Power cords, USB-C' },
                { name: 'Display / Monitor', icon: 'videocam', desc: 'Monitors, Projectors' },
                { name: 'Circuit PCB', icon: 'developer_board', desc: 'Dev boards, MCUs' },
                { name: 'Peripherals', icon: 'keyboard', desc: 'Keyboards, Mice' },
                { name: 'Lab Equipment', icon: 'biotech', desc: 'Meters, Power Rigs' },
              ].map((c) => (
                <button
                  type="button"
                  key={c.name}
                  onClick={() => setCategory(c.name)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    category === c.name
                      ? 'bg-primary-fixed/20 border-primary text-primary shadow-xs ring-1 ring-primary'
                      : 'bg-surface-container-lowest border-surface-container text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px] mb-1">{c.icon}</span>
                  <div>
                    <span className="font-headline-sm text-xs font-bold block">{c.name}</span>
                    <span className="text-[10px] text-outline block">{c.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Location & Quantity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm bg-surface-container-lowest p-space-md rounded-xl border border-surface-container">
            <div>
              <label className="font-label-sm text-xs font-bold text-on-surface block mb-1">
                Campus Drop Hub / Zone
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-sm border border-surface-container focus:ring-2 focus:ring-primary"
              >
                <option value="Hostel 1">Hostel 1 (North Wing Ground)</option>
                <option value="Hostel 2">Hostel 2 (Common Lounge)</option>
                <option value="Hostel 3">Hostel 3 (Study Veranda)</option>
                <option value="Hostel 4">Hostel 4 (West Exit Gate)</option>
                <option value="Central Library">Central Library (Main Lobby)</option>
                <option value="EC Lab">EC Lab (Circuits Hub)</option>
                <option value="Computer Lab">Computer Lab (Hardware Bay)</option>
                <option value="Lecture Block">Lecture Block (Dean Quad)</option>
              </select>
            </div>

            <div>
              <label className="font-label-sm text-xs font-bold text-on-surface block mb-1">
                Specific Room or Door (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Room 314 or Embedded Bench 4"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-sm border border-surface-container focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="font-label-sm text-xs font-bold text-on-surface block mb-1">
                Quantity (Units)
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-sm font-bold font-code-num border border-surface-container focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="font-label-sm text-xs font-bold text-on-surface block mb-1">
                Functional State
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-sm border border-surface-container focus:ring-2 focus:ring-primary"
              >
                <option value="Salvageable Parts">Salvageable Parts (Working Sub-components)</option>
                <option value="Scrap / Non-functional">Total Scrap (Recycle Raw Materials)</option>
                <option value="Working / Outdated">Working, Legacy / Deprecated</option>
              </select>
            </div>
          </div>

          {/* Hazardous Material Disclosure */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hazard-disclosure"
                checked={hasHazard}
                onChange={(e) => setHasHazard(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-outline focus:ring-primary cursor-pointer"
              />
              <label
                htmlFor="hazard-disclosure"
                className="text-xs font-bold text-on-surface cursor-pointer select-none"
              >
                Declare Special Hazardous Materials (Lithium battery swelling, CRT glass, mercury)
              </label>
            </div>
            {hasHazard && (
              <div className="mt-1 animate-in fade-in">
                <input
                  type="text"
                  placeholder="Describe hazard (e.g. Swollen Li-ion battery or cracked glass)"
                  value={hazardDetails}
                  onChange={(e) => setHazardDetails(e.target.value)}
                  className="w-full bg-error-container/20 text-on-surface rounded-lg px-3 py-2 text-xs border border-error-container focus:ring-2 focus:ring-error"
                />
              </div>
            )}
          </div>

          {/* Submitter Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm bg-surface-container-lowest p-space-md rounded-xl border border-surface-container">
            <div>
              <label className="font-label-sm text-xs font-bold text-on-surface block mb-1">
                Your Name &amp; Dept.
              </label>
              <input
                type="text"
                placeholder="e.g. Aditi Rao (CSE Dept)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-sm border border-surface-container focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="font-label-sm text-xs font-bold text-on-surface block mb-1">
                SVIT Email (for Certificate)
              </label>
              <input
                type="email"
                placeholder="aditi.r@svit.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-sm border border-surface-container focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container">
            <label className="font-label-sm text-xs font-bold text-on-surface block mb-1">
              Intake Notes or Access Instructions
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Left in blue tote bag next to Lab Door 204."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface rounded-lg px-3 py-2 text-sm border border-surface-container focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Instant Impact Forecast Preview */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-3 rounded-xl border border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">eco</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Estimated Eco-Impact</span>
                <span className="text-[11px] text-outline">
                  By routing this responsibly, you prevent {impact.co2} kg CO₂ emissions.
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-primary font-code-num">+{impact.metals} mg metals</span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>Generate Certified Manifest Ticket</span>
          </button>
        </form>
      )}
    </div>
  );
};
