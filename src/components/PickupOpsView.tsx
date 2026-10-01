import React, { useState } from 'react';
import { ManifestItem, ManifestStatus, Courier } from '../types';
import { initialCouriers } from '../data/mockData';

interface PickupOpsViewProps {
  manifests: ManifestItem[];
  onAdvanceStatus: (id: string, newStatus?: ManifestStatus) => void;
  onAssignCourier: (id: string, courierName: string) => void;
  onUpdateWeight: (id: string, weightKg: number) => void;
  onOpenReport: () => void;
}

export const PickupOpsView: React.FC<PickupOpsViewProps> = ({
  manifests,
  onAdvanceStatus,
  onAssignCourier,
  onUpdateWeight,
  onOpenReport,
}) => {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [couriers] = useState<Courier[]>(initialCouriers);
  const [selectedManifest, setSelectedManifest] = useState<ManifestItem | null>(null);
  const [weighingWeight, setWeighingWeight] = useState<number>(0);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const filteredItems = manifests.filter((item) => {
    const matchesFilter = filter === 'All' ? true : item.status === filter;
    const matchesSearch =
      item.item.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenWeighModal = (item: ManifestItem) => {
    setSelectedManifest(item);
    setWeighingWeight(item.weight);
  };

  const handleSaveWeightAndVerify = () => {
    if (!selectedManifest) return;
    onUpdateWeight(selectedManifest.id, weighingWeight);
    onAdvanceStatus(selectedManifest.id, 'Verified');
    setSelectedManifest(null);
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile pb-space-2xl gap-space-md max-w-4xl mx-auto">
      {/* View Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="px-space-xs py-0.5 bg-primary-fixed/30 text-on-primary-fixed-variant rounded font-label-sm text-[10px] font-bold uppercase tracking-wider">
            Logistics &amp; Courier Dispatch
          </span>
          <span className="font-code-num text-xs text-outline">
            {filteredItems.length} active tickets
          </span>
        </div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
          Campus Pickup Operations
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Coordinate real-time student courier sweeps, verify drop-hub intake scale weights, and stamp ISO manifests.
        </p>
      </div>

      {/* Next Dispatch Route Banner */}
      <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container flex flex-col gap-2 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-tertiary-container text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <div>
              <span className="font-headline-sm text-sm font-bold text-on-surface">
                Next Route Run: 2:30 PM
              </span>
              <p className="font-body-sm text-xs text-outline">
                E-Cargo Trike #1 &amp; #2 departing Central Consolidation Bay
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-[10px] font-bold">
            Departing in 45m
          </span>
        </div>

        {/* Route stops breadcrumbs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-[11px] text-outline">
          <span className="bg-surface-container-lowest px-2 py-0.5 rounded font-medium text-primary">
            1. Hostel 4 (Gate)
          </span>
          <span>→</span>
          <span className="bg-surface-container-lowest px-2 py-0.5 rounded font-medium text-error font-bold">
            2. Central Library (Overfill)
          </span>
          <span>→</span>
          <span className="bg-surface-container-lowest px-2 py-0.5 rounded font-medium">
            3. EC Lab
          </span>
          <span>→</span>
          <span className="bg-surface-container-lowest px-2 py-0.5 rounded font-medium">
            4. Central Storage
          </span>
        </div>
      </div>

      {/* Courier Team Status */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-xs uppercase tracking-wider text-outline font-bold">
            Active Student Couriers
          </span>
          <span className="text-[11px] text-primary font-semibold">3 on duty</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {couriers.map((c) => (
            <div
              key={c.id}
              className="bg-surface-container-lowest p- space-sm p-3 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-headline-sm text-xs font-bold text-on-surface truncate">
                  {c.name}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    c.status === 'On Route'
                      ? 'bg-secondary-container/30 text-secondary'
                      : 'bg-primary-fixed/30 text-primary'
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <span className="text-[11px] text-outline truncate">{c.vehicle}</span>
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-surface-container text-[11px]">
                <span className="text-outline">Assigned: {c.assignedCount}</span>
                <a
                  href={`tel:${c.phone}`}
                  className="text-primary hover:underline font-semibold flex items-center gap-0.5"
                >
                  <span className="material-symbols-outlined text-[13px]">call</span>
                  Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter Tabs */}
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search tickets by ID, item, or building..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-surface-container-low text-on-surface rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-2.5 text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Pending', 'Assigned', 'Collected', 'Verified'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Pickup Manifests Feed */}
      <div className="flex flex-col gap-space-xs">
        {filteredItems.length === 0 ? (
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-dashed border-outline text-center flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-outline text-[32px]">inventory_2</span>
            <span className="font-headline-sm text-sm text-on-surface font-bold">
              No matching pickup tickets found
            </span>
            <p className="text-xs text-outline max-w-xs">
              All collections for this filter are up to date. You can report a new pickup anytime.
            </p>
            <button
              onClick={onOpenReport}
              className="mt-2 px-4 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-bold"
            >
              + Create New Ticket
            </button>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container shadow-xs flex flex-col gap-2 hover:shadow-sm transition-all"
            >
              {/* Row Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">
                      {item.hasBatteryHazard
                        ? 'battery_alert'
                        : item.category?.includes('Laptop')
                        ? 'laptop_mac'
                        : item.category?.includes('Display')
                        ? 'videocam'
                        : 'devices'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-code-num text-xs font-bold text-outline">
                        {item.id}
                      </span>
                      <span className="text-outline-variant text-[10px]">•</span>
                      <span className="font-headline-sm text-xs font-bold text-on-surface">
                        {item.location}
                      </span>
                      {item.hasBatteryHazard && (
                        <span className="bg-error-container text-error text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase">
                          Hazmat
                        </span>
                      )}
                    </div>
                    <h4 className="font-headline-sm text-sm font-bold text-on-surface">
                      {item.item}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`font-label-sm text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                      item.status === 'Pending'
                        ? 'bg-surface-container text-tertiary'
                        : item.status === 'Assigned'
                        ? 'bg-secondary-container/20 text-secondary'
                        : item.status === 'Collected'
                        ? 'bg-primary-fixed/40 text-on-primary-fixed-variant'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[10px] text-outline">{item.time}</span>
                </div>
              </div>

              {/* Detail specs */}
              <div className="bg-surface-container-low p-2 rounded-lg text-xs grid grid-cols-2 sm:grid-cols-4 gap-2 text-on-surface-variant">
                <div>
                  <span className="text-outline block text-[10px]">Logged Weight:</span>
                  <span className="font-code-num font-bold text-on-surface">{item.weight} kg</span>
                </div>
                <div>
                  <span className="text-outline block text-[10px]">Condition:</span>
                  <span className="truncate block font-medium">{item.condition || 'Scrap'}</span>
                </div>
                <div>
                  <span className="text-outline block text-[10px]">Submitter:</span>
                  <span className="truncate block font-medium">{item.submittedBy || 'SVIT Member'}</span>
                </div>
                <div>
                  <span className="text-outline block text-[10px]">Courier:</span>
                  <span className="truncate block font-bold text-primary">
                    {item.assignedCourier || 'Unassigned'}
                  </span>
                </div>
              </div>

              {item.notes && (
                <p className="text-xs text-outline italic">Note: "{item.notes}"</p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-surface-container">
                <div className="flex items-center gap-1.5">
                  {/* Quick assign courier */}
                  <select
                    value={item.assignedCourier || ''}
                    onChange={(e) => onAssignCourier(item.id, e.target.value)}
                    className="text-xs bg-surface-container-low border border-surface-container rounded-lg px-2 py-1 text-on-surface focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="">Assign Courier...</option>
                    <option value="Aarav Patel">Aarav Patel (Cargo Trike #1)</option>
                    <option value="Sneha Roy">Sneha Roy (Cargo Trike #2)</option>
                    <option value="Vikram Kulkarni">Vikram Kulkarni (Utility Cart #3)</option>
                  </select>

                  <button
                    onClick={() => {
                      setSelectedManifest(item);
                      setShowQrModal(true);
                    }}
                    className="p-1 text-outline hover:text-on-surface hover:bg-surface-container rounded-lg text-xs flex items-center gap-1"
                    title="View QR Manifest Badge"
                  >
                    <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                    <span className="hidden sm:inline text-[11px]">QR Ticket</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.status === 'Pending' && (
                    <button
                      onClick={() => onAdvanceStatus(item.id, 'Assigned')}
                      className="px-3 py-1 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-secondary/90 transition-colors"
                    >
                      Assign Route
                    </button>
                  )}

                  {item.status === 'Assigned' && (
                    <button
                      onClick={() => onAdvanceStatus(item.id, 'Collected')}
                      className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-container transition-colors"
                    >
                      Mark Collected
                    </button>
                  )}

                  {item.status === 'Collected' && (
                    <button
                      onClick={() => handleOpenWeighModal(item)}
                      className="px-3 py-1 bg-primary-fixed-dim text-on-primary-fixed font-bold rounded-lg text-xs hover:bg-primary-fixed transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">scale</span>
                      Weigh &amp; Verify
                    </button>
                  )}

                  {item.status === 'Verified' && (
                    <span className="text-[11px] text-primary font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      ISO Certified
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Scale Weighing & Verification Modal */}
      {selectedManifest && !showQrModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg max-w-sm w-full shadow-2xl flex flex-col gap-4 border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed/30 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">scale</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-sm font-bold text-on-surface">
                    Weigh &amp; Certify Intake
                  </h4>
                  <span className="text-xs text-outline">{selectedManifest.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedManifest(null)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-outline"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-outline">Equipment:</span>
              <p className="font-semibold text-sm text-on-surface">{selectedManifest.item}</p>
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Calibrated Scale Reading (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={weighingWeight}
                onChange={(e) => setWeighingWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-surface-container-low text-on-surface rounded-lg text-lg font-bold font-code-num border border-surface-container focus:ring-2 focus:ring-primary"
              />
              <span className="text-[10px] text-outline mt-1 block">
                Logged to SVIT institutional ledger for ISO 14001:2015 audit trails.
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSaveWeightAndVerify}
                className="flex-1 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Certify &amp; Add to Total
              </button>
              <button
                onClick={() => setSelectedManifest(null)}
                className="px-3 py-2 bg-surface-container text-on-surface text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Ticket Preview Modal */}
      {selectedManifest && showQrModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-xs w-full shadow-2xl flex flex-col items-center gap-3 border border-surface-container text-center">
            <span className="text-[10px] tracking-wider uppercase font-bold text-primary">
              SVIT E-Waste Chain of Custody
            </span>
            <div className="p-3 bg-white border border-outline/30 rounded-xl shadow-inner">
              {/* Simulated QR Code SVG */}
              <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="#ffffff" />
                <path
                  d="M10 10h30v30h-30z M60 10h30v30h-30z M10 60h30v30h-30z M18 18h14v14h-14z M68 18h14v14h-14z M18 68h14v14h-14z M45 10h10v10h-10z M45 30h10v10h-10z M10 45h10v10h-10z M30 45h10v10h-10z M50 50h20v10h-20z M75 45h15v10h-15z M45 70h10v20h-10z M60 70h20v10h-20z M80 80h10v10h-10z"
                  fill="#006948"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-code-num font-bold text-sm text-on-surface">
                {selectedManifest.id}
              </span>
              <span className="text-xs text-outline">{selectedManifest.item}</span>
              <span className="text-[11px] text-on-surface-variant font-medium mt-1">
                Zone: {selectedManifest.location}
              </span>
            </div>
            <div className="w-full flex gap-2 pt-2">
              <button
                onClick={() => {
                  setShowQrModal(false);
                  setSelectedManifest(null);
                }}
                className="w-full py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold rounded-lg"
              >
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
