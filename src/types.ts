export type TabType = 'dashboard' | 'pickup-ops' | 'report' | 'points' | 'impact';

export type ManifestStatus = 'Pending' | 'Assigned' | 'Collected' | 'Verified';

export interface ManifestItem {
  id: string;
  item: string;
  location: string;
  time: string;
  status: ManifestStatus;
  weight: number;
  category?: string;
  condition?: string;
  assignedCourier?: string;
  assignedCourierPhone?: string;
  submittedBy?: string;
  contactEmail?: string;
  notes?: string;
  urgent?: boolean;
  hasBatteryHazard?: boolean;
}

export interface DropHub {
  id: string;
  name: string;
  subtitle: string;
  locationDetails: string;
  capacityPercent: number;
  weightKg: number;
  maxCapacityKg: number;
  status: 'normal' | 'warning' | 'alert';
  lastEmptied: string;
  batteryLevel: number;
  temperature: number;
  acceptedCategories: string[];
}

export interface KpiMetrics {
  weight: number;
  devices: number;
  points: number;
  pending: number;
}

export interface Courier {
  id: string;
  name: string;
  role: string;
  status: 'Available' | 'On Route' | 'Busy';
  assignedCount: number;
  vehicle: string;
  phone: string;
}

export interface MonthlyDataPoint {
  month: string;
  label: string;
  weightKg: number;
  heightPercent: number;
  isPeak?: boolean;
  isLive?: boolean;
  note: string;
}
