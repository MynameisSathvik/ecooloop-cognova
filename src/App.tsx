/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, ManifestItem, DropHub, KpiMetrics, ManifestStatus } from './types';
import {
  getStoredManifests,
  saveStoredManifests,
  getStoredMetrics,
  saveStoredMetrics,
  getStoredHubs,
  saveStoredHubs,
  resetAllData,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { PickupOpsView } from './components/PickupOpsView';
import { ReportWasteView } from './components/ReportWasteView';
import { CollectionPointsView } from './components/CollectionPointsView';
import { ImpactView } from './components/ImpactView';
import { ZoneDetailsModal } from './components/ZoneDetailsModal';
import { FastReportModal } from './components/FastReportModal';
import { DrawerModals } from './components/DrawerModals';
import { Toast } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [manifests, setManifests] = useState<ManifestItem[]>([]);
  const [metrics, setMetrics] = useState<KpiMetrics>({ weight: 284, devices: 127, points: 8, pending: 6 });
  const [hubs, setHubs] = useState<DropHub[]>([]);
  const [activeCluster, setActiveCluster] = useState<string>('SVIT Cluster');

  // Modals state
  const [selectedHub, setSelectedHub] = useState<DropHub | null>(null);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState<boolean>(false);
  const [isFastReportOpen, setIsFastReportOpen] = useState<boolean>(false);
  const [reportDefaultZone, setReportDefaultZone] = useState<string | undefined>(undefined);
  const [activeDrawerModal, setActiveDrawerModal] = useState<
    'research' | 'sources' | 'transparency' | 'settings' | null
  >(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'warning'>('success');

  const showToast = (msg: string, type: 'success' | 'warning' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Initial load
  useEffect(() => {
    setManifests(getStoredManifests());
    setMetrics(getStoredMetrics());
    setHubs(getStoredHubs());
  }, []);

  // Advance manifest status cycle
  const handleAdvanceStatus = (id: string, explicitStatus?: ManifestStatus) => {
    const list = [...manifests];
    const index = list.findIndex((m) => m.id === id);
    if (index === -1) return;

    const item = list[index];
    const transitions: Record<ManifestStatus, ManifestStatus> = {
      Pending: 'Assigned',
      Assigned: 'Collected',
      Collected: 'Verified',
      Verified: 'Pending',
    };

    const nextStatus = explicitStatus || transitions[item.status] || 'Pending';
    const oldStatus = item.status;
    list[index] = { ...item, status: nextStatus };

    // Update metrics reactively
    const updatedMetrics = { ...metrics };
    if (nextStatus === 'Collected' && oldStatus !== 'Collected') {
      updatedMetrics.weight += Math.round(item.weight || 1.5);
      updatedMetrics.devices += 1;
      if (updatedMetrics.pending > 0) updatedMetrics.pending -= 1;
    } else if (nextStatus === 'Pending' && oldStatus === 'Verified') {
      updatedMetrics.pending += 1;
    }

    setManifests(list);
    saveStoredManifests(list);
    setMetrics(updatedMetrics);
    saveStoredMetrics(updatedMetrics);

    showToast(`Updated ${item.id} status to "${nextStatus}"`);
  };

  // Assign courier
  const handleAssignCourier = (id: string, courierName: string) => {
    const list = manifests.map((m) => {
      if (m.id === id) {
        return {
          ...m,
          assignedCourier: courierName,
          status: m.status === 'Pending' ? ('Assigned' as ManifestStatus) : m.status,
        };
      }
      return m;
    });

    setManifests(list);
    saveStoredManifests(list);
    showToast(`Courier ${courierName} assigned to ${id}`);
  };

  // Update item scale weight
  const handleUpdateWeight = (id: string, weightKg: number) => {
    const list = manifests.map((m) => {
      if (m.id === id) {
        return { ...m, weight: weightKg };
      }
      return m;
    });

    setManifests(list);
    saveStoredManifests(list);
  };

  // Create new ticket from fast modal or report page
  const handleCreateManifest = (itemData: Partial<ManifestItem>) => {
    const newId = 'SVIT-' + (1043 + manifests.length);
    const newEntry: ManifestItem = {
      id: newId,
      item: itemData.item || 'Generic E-Waste',
      location: itemData.location || 'Hostel 1',
      time: 'Just now',
      status: 'Pending',
      weight: itemData.weight || 1.5,
      category: itemData.category,
      condition: itemData.condition,
      submittedBy: itemData.submittedBy,
      contactEmail: itemData.contactEmail,
      notes: itemData.notes,
      hasBatteryHazard: itemData.hasBatteryHazard,
    };

    const updatedList = [newEntry, ...manifests];
    const updatedMetrics = { ...metrics, pending: metrics.pending + 1 };

    setManifests(updatedList);
    saveStoredManifests(updatedList);
    setMetrics(updatedMetrics);
    saveStoredMetrics(updatedMetrics);

    showToast(`Dispatched manifest ticket ${newId} for pickup`);
  };

  // Empty overfilled drop hub receptacle
  const handleClearHub = (hubId: string) => {
    const hubIndex = hubs.findIndex((h) => h.id === hubId);
    if (hubIndex === -1) return;

    const targetHub = hubs[hubIndex];
    const clearedWeight = targetHub.weightKg;

    const updatedHubs = hubs.map((h) => {
      if (h.id === hubId) {
        return {
          ...h,
          capacityPercent: 12,
          weightKg: 2.1,
          status: 'normal' as const,
          lastEmptied: 'Just now (Cleared)',
        };
      }
      return h;
    });

    // Create a manifest entry for the collected batch
    const newId = 'SVIT-' + (1043 + manifests.length);
    const collectionEntry: ManifestItem = {
      id: newId,
      item: `Bulk Intake (${targetHub.name} Clearance)`,
      location: targetHub.name,
      time: 'Just now',
      status: 'Collected',
      weight: clearedWeight,
      category: 'Bulk Receptacle',
      condition: 'Mixed Campus Scrap',
      submittedBy: 'Automated Sensor Trigger',
      assignedCourier: 'Aarav Patel (Cargo Trike #1)',
    };

    const updatedList = [collectionEntry, ...manifests];
    const updatedMetrics = {
      ...metrics,
      weight: metrics.weight + Math.round(clearedWeight),
      devices: metrics.devices + 14,
    };

    setHubs(updatedHubs);
    saveStoredHubs(updatedHubs);
    setManifests(updatedList);
    saveStoredManifests(updatedList);
    setMetrics(updatedMetrics);
    saveStoredMetrics(updatedMetrics);

    showToast(`Cleared & sanitized ${targetHub.name} receptacle (+${clearedWeight.toFixed(1)}kg)`);
  };

  // Reset all to initial SVIT campus state
  const handleReset = () => {
    const data = resetAllData();
    setManifests(data.manifests);
    setMetrics(data.metrics);
    setHubs(data.hubs);
    showToast('Demo cache reset to SVIT baseline');
  };

  // Open inspection modal for a zone
  const handleOpenZoneModal = (hub: DropHub) => {
    setSelectedHub(hub);
    setIsZoneModalOpen(true);
  };

  // Open fast report modal with pre-filled zone
  const handleOpenReportModal = (prefillZone?: string) => {
    setReportDefaultZone(prefillZone);
    setIsFastReportOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top App Bar Header */}
      <Header
        onReset={handleReset}
        onOpenDrawerItem={(item) => setActiveDrawerModal(item)}
        activeCluster={activeCluster}
      />

      {/* Main Content View Container */}
      <main className="flex-1 w-full bg-surface pt-16 pb-24">
        {activeTab === 'dashboard' && (
          <DashboardView
            metrics={metrics}
            manifests={manifests}
            hubs={hubs}
            onOpenReport={handleOpenReportModal}
            onOpenZone={handleOpenZoneModal}
            onAdvanceStatus={handleAdvanceStatus}
            onNavigateTab={setActiveTab}
            onReset={handleReset}
          />
        )}

        {activeTab === 'pickup-ops' && (
          <PickupOpsView
            manifests={manifests}
            onAdvanceStatus={handleAdvanceStatus}
            onAssignCourier={handleAssignCourier}
            onUpdateWeight={handleUpdateWeight}
            onOpenReport={() => handleOpenReportModal()}
          />
        )}

        {activeTab === 'report' && (
          <ReportWasteView
            onSubmit={handleCreateManifest}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'points' && (
          <CollectionPointsView
            hubs={hubs}
            onOpenZone={handleOpenZoneModal}
            onClearHub={handleClearHub}
            onRequestPickup={(zone) => handleOpenReportModal(zone)}
          />
        )}

        {activeTab === 'impact' && (
          <ImpactView
            metrics={metrics}
            onOpenReport={() => handleOpenReportModal()}
          />
        )}
      </main>

      {/* Bottom Sticky Tab Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingCount={metrics.pending}
      />

      {/* Zone Details Modal Sheet */}
      <ZoneDetailsModal
        hub={selectedHub}
        isOpen={isZoneModalOpen}
        onClose={() => setIsZoneModalOpen(false)}
        onRequestPickup={(zone) => handleOpenReportModal(zone)}
        onTriggerClearance={handleClearHub}
      />

      {/* Fast Report Slide-Over Modal */}
      <FastReportModal
        isOpen={isFastReportOpen}
        onClose={() => setIsFastReportOpen(false)}
        onSubmit={handleCreateManifest}
        defaultZone={reportDefaultZone}
      />

      {/* Drawer Information & Settings Modals */}
      <DrawerModals
        activeModal={activeDrawerModal}
        onClose={() => setActiveDrawerModal(null)}
        cluster={activeCluster}
        onSelectCluster={setActiveCluster}
        onResetData={handleReset}
      />

      {/* Interactive Toast Notification */}
      <Toast message={toastMessage} type={toastType} />
    </div>
  );
}
