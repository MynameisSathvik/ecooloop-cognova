import React from 'react';

interface DrawerModalsProps {
  activeModal: 'research' | 'sources' | 'transparency' | 'settings' | null;
  onClose: () => void;
  cluster: string;
  onSelectCluster: (cluster: string) => void;
  onResetData: () => void;
}

export const DrawerModals: React.FC<DrawerModalsProps> = ({
  activeModal,
  onClose,
  cluster,
  onSelectCluster,
  onResetData,
}) => {
  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-2xl p-space-lg max-w-lg w-full shadow-2xl border border-surface-container flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              {activeModal === 'research'
                ? 'analytics'
                : activeModal === 'sources'
                ? 'hub'
                : activeModal === 'transparency'
                ? 'policy'
                : 'tune'}
            </span>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">
              {activeModal === 'research' && 'Research & Life-Cycle Data'}
              {activeModal === 'sources' && 'Sources & Authorized Registry'}
              {activeModal === 'transparency' && 'Campus Telemetry Transparency'}
              {activeModal === 'settings' && 'System & Cluster Settings'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Content based on modal */}
        {activeModal === 'research' && (
          <div className="flex flex-col gap-3 text-xs text-on-surface-variant">
            <p>
              EcoLoop’s institutional framework is developed in conjunction with the SVIT Department of
              Environmental Sciences and the Electronics &amp; Communication Lab.
            </p>

            <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container flex flex-col gap-1.5">
              <span className="font-bold text-on-surface">Material Recovery Fractions:</span>
              <ul className="list-disc pl-4 space-y-1 text-[11px]">
                <li>Printed Circuit Boards: 24% copper, 14% fiberglass laminate, 0.04% precious metals.</li>
                <li>Polycarbonate / ABS Casings: 92% re-granulation yield for recycled 3D printer filament.</li>
                <li>Lithium-Ion / LiFePO4 cells: 100% neutralized via secondary hydrometallurgical recycling.</li>
              </ul>
            </div>

            <div className="text-[11px] text-outline">
              Reference: <em>"Closed-Loop Campus E-Waste Reclamation: Operational Metrics from Higher Education Facilities"</em> (2025).
            </div>
          </div>
        )}

        {activeModal === 'sources' && (
          <div className="flex flex-col gap-3 text-xs text-on-surface-variant">
            <p>
              All equipment collected through the SVIT Command Center is strictly routed to authorized
              e-waste recyclers under Central Pollution Control Board (CPCB) guidelines.
            </p>

            <div className="divide-y divide-surface-container border border-surface-container rounded-xl overflow-hidden">
              <div className="p-2.5 bg-surface-container-lowest">
                <span className="font-bold text-on-surface block">Reteck Envirotech Ltd.</span>
                <span className="text-[11px] text-outline block">PCB &amp; Smelting Authorization #KAR-CPCB-982</span>
              </div>
              <div className="p-2.5 bg-surface-container-lowest">
                <span className="font-bold text-on-surface block">Saahas Zero Waste Aggregators</span>
                <span className="text-[11px] text-outline block">Certified Collection &amp; Sorting Partner</span>
              </div>
              <div className="p-2.5 bg-surface-container-lowest">
                <span className="font-bold text-on-surface block">SVIT MakerSpace Salvage Guild</span>
                <span className="text-[11px] text-outline block">Campus student hardware reuse &amp; robotics salvage</span>
              </div>
            </div>
          </div>
        )}

        {activeModal === 'transparency' && (
          <div className="flex flex-col gap-3 text-xs text-on-surface-variant">
            <p>
              Every drop hub receptacle on campus is equipped with calibrated hardware telemetry nodes:
            </p>

            <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container flex flex-col gap-2 font-mono text-[11px]">
              <div>
                <strong className="text-on-surface block font-sans">Optical &amp; Ultrasonic Sensors:</strong>
                <span>HC-SR04 Dual Time-of-Flight (±3mm accuracy)</span>
              </div>
              <div>
                <strong className="text-on-surface block font-sans">Strain Gauge Weight Scale:</strong>
                <span>HX711 4-Point Load Cell (±50g accuracy)</span>
              </div>
              <div>
                <strong className="text-on-surface block font-sans">Telemetry Uplink:</strong>
                <span>LoRaWAN 868MHz + Campus Wi-Fi 6 Mesh</span>
              </div>
            </div>

            <p className="text-[11px] text-outline">
              Telemetry readings are published hourly to the public campus ledger to verify zero landfill leakage.
            </p>
          </div>
        )}

        {activeModal === 'settings' && (
          <div className="flex flex-col gap-3 text-xs text-on-surface-variant">
            <div>
              <label className="font-bold text-on-surface block mb-1">Select Campus Cluster</label>
              <select
                value={cluster}
                onChange={(e) => onSelectCluster(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface rounded-lg p-2 border border-surface-container focus:ring-2 focus:ring-primary"
              >
                <option value="SVIT Cluster">SVIT Main Campus Cluster (8 Hubs)</option>
                <option value="South Research Park">SVIT South Research Park (4 Hubs)</option>
                <option value="Innovation Annex">SVIT Innovation &amp; Incubation Annex (3 Hubs)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-surface-container">
              <span className="font-bold text-on-surface">Data &amp; Cache Management</span>
              <p className="text-[11px] text-outline">
                Clear all demo inputs, new tickets, and restored default telemetry baseline values.
              </p>
              <button
                onClick={() => {
                  onResetData();
                  onClose();
                }}
                className="py-2 px-3 bg-error-container/50 hover:bg-error-container text-error font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                <span>Reset Local Session &amp; Demo Cache</span>
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-surface-container flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
