import { ManifestItem, DropHub, KpiMetrics, Courier, MonthlyDataPoint } from '../types';

export const STORAGE_MANIFESTS_KEY = 'ecoloop_svit_manifests';
export const STORAGE_METRICS_KEY = 'ecoloop_svit_metrics';
export const STORAGE_HUBS_KEY = 'ecoloop_svit_hubs';

export const initialManifests: ManifestItem[] = [
  {
    id: 'SVIT-1042',
    item: 'Laptop ThinkPad T480',
    location: 'Hostel 4',
    time: '10 min ago',
    status: 'Pending',
    weight: 2.1,
    category: 'Laptop',
    condition: 'Salvageable Parts',
    submittedBy: 'Karthik Rao (ECE Final Year)',
    contactEmail: 'karthik.r@svit.ac.in',
    notes: 'Damaged display ribbon, motherboard and battery intact.',
    hasBatteryHazard: true,
  },
  {
    id: 'SVIT-1041',
    item: 'Apple MagSafe 60W',
    location: 'Hostel 2',
    time: '24 min ago',
    status: 'Assigned',
    weight: 0.4,
    category: 'Charger / Adapter',
    condition: 'Working / Outdated',
    assignedCourier: 'Sneha Roy',
    assignedCourierPhone: '+91 98451 22394',
    submittedBy: 'Ananya Sharma (CSE)',
    notes: 'Original adapter cord, working condition.',
  },
  {
    id: 'SVIT-1040',
    item: 'BenQ DLP Projector',
    location: 'Central Library',
    time: '1 hr ago',
    status: 'Collected',
    weight: 3.8,
    category: 'Display / Monitor',
    condition: 'Scrap / Non-functional',
    assignedCourier: 'Aarav Patel',
    assignedCourierPhone: '+91 98450 71832',
    submittedBy: 'Prof. Ramesh G. (Librarian)',
    notes: 'Lamp failed, scheduled for optical prism and chassis salvaging.',
  },
  {
    id: 'SVIT-1039',
    item: 'FTDI USB UART Adapters',
    location: 'EC Lab',
    time: '2 hrs ago',
    status: 'Verified',
    weight: 0.6,
    category: 'Circuit PCB',
    condition: 'Salvageable Parts',
    assignedCourier: 'Vikram Kulkarni',
    assignedCourierPhone: '+91 98452 44910',
    submittedBy: 'M. S. Sundaram (Lab Tech)',
    notes: 'Batch of 12 deprecated FT232 boards for micro-soldering training.',
  },
  {
    id: 'SVIT-1038',
    item: 'Dell OptiPlex 7050 Towers (x2)',
    location: 'Computer Lab',
    time: '4 hrs ago',
    status: 'Verified',
    weight: 14.5,
    category: 'Lab Equipment',
    condition: 'Working / Outdated',
    assignedCourier: 'Aarav Patel',
    submittedBy: 'System Admin C-Block',
    notes: 'Decommissioned lab towers with 16GB DDR4 RAM.',
  },
];

export const initialMetrics: KpiMetrics = {
  weight: 284,
  devices: 127,
  points: 8,
  pending: 6,
};

export const initialDropHubs: DropHub[] = [
  {
    id: 'hub-1',
    name: 'Hostel 1',
    subtitle: 'North Wing Ground',
    locationDetails: 'Main Entry Foyer Bin',
    capacityPercent: 72,
    weightKg: 14.2,
    maxCapacityKg: 20,
    status: 'normal',
    lastEmptied: 'Yesterday, 4:30 PM',
    batteryLevel: 94,
    temperature: 24.2,
    acceptedCategories: ['Laptops / Tablets', 'Batteries & AC Adapters', 'Circuit Boards', 'Cables & Keyboards'],
  },
  {
    id: 'hub-2',
    name: 'Hostel 2',
    subtitle: 'Common Lounge',
    locationDetails: 'Lounge E-Drop Receptacle',
    capacityPercent: 48,
    weightKg: 9.1,
    maxCapacityKg: 20,
    status: 'normal',
    lastEmptied: '2 days ago',
    batteryLevel: 88,
    temperature: 23.8,
    acceptedCategories: ['Mobile Phones', 'Chargers', 'Headphones', 'Batteries'],
  },
  {
    id: 'hub-3',
    name: 'Hostel 3',
    subtitle: 'Study Veranda',
    locationDetails: 'Study Area Hub',
    capacityPercent: 86,
    weightKg: 19.4,
    maxCapacityKg: 22,
    status: 'warning',
    lastEmptied: '3 days ago',
    batteryLevel: 79,
    temperature: 26.1,
    acceptedCategories: ['Laptops', 'Peripherals', 'Circuit Boards', 'Lithium Cells'],
  },
  {
    id: 'hub-4',
    name: 'Hostel 4',
    subtitle: 'West Exit Gate',
    locationDetails: 'Recreation Corridor',
    capacityPercent: 32,
    weightKg: 6.8,
    maxCapacityKg: 20,
    status: 'normal',
    lastEmptied: 'Today, 9:00 AM',
    batteryLevel: 98,
    temperature: 23.5,
    acceptedCategories: ['Small Electronics', 'Chargers', 'Batteries', 'Smartwatches'],
  },
  {
    id: 'hub-5',
    name: 'Central Library',
    subtitle: 'Turnstiles Drop',
    locationDetails: 'Main Lobby Turnstiles',
    capacityPercent: 91,
    weightKg: 24.1,
    maxCapacityKg: 25,
    status: 'alert',
    lastEmptied: '4 days ago',
    batteryLevel: 82,
    temperature: 22.9,
    acceptedCategories: ['Tablets', 'Laptops', 'Projector Lamps', 'Power Bricks'],
  },
  {
    id: 'hub-6',
    name: 'EC Lab',
    subtitle: 'PCB Recycling Hub',
    locationDetails: 'Circuits & Embedded Station',
    capacityPercent: 59,
    weightKg: 16.5,
    maxCapacityKg: 25,
    status: 'normal',
    lastEmptied: 'Yesterday, 11:15 AM',
    batteryLevel: 91,
    temperature: 24.5,
    acceptedCategories: ['PCB Scraps', 'Soldering Wire Remnants', 'Microcontrollers', 'Testing Jigs'],
  },
  {
    id: 'hub-7',
    name: 'Computer Lab',
    subtitle: 'Hardware Bay',
    locationDetails: 'Server Corridor B-3',
    capacityPercent: 41,
    weightKg: 11.8,
    maxCapacityKg: 30,
    status: 'normal',
    lastEmptied: 'Yesterday, 2:00 PM',
    batteryLevel: 85,
    temperature: 21.0,
    acceptedCategories: ['CPUs / Towers', 'Hard Drives', 'Network Switches', 'RAM Sticks'],
  },
  {
    id: 'hub-8',
    name: 'Lecture Block',
    subtitle: 'Faculty Quad',
    locationDetails: 'Dean Arcade Passage',
    capacityPercent: 18,
    weightKg: 4.3,
    maxCapacityKg: 20,
    status: 'normal',
    lastEmptied: 'Today, 8:30 AM',
    batteryLevel: 96,
    temperature: 25.1,
    acceptedCategories: ['Office Electronics', 'Presenter Clickers', 'Batteries', 'Audio Cables'],
  },
];

export const monthlyInflowData: MonthlyDataPoint[] = [
  { month: 'January', label: 'Jan', weightKg: 38, heightPercent: 55, note: 'Intake kickoff across hostel dorms.' },
  { month: 'February', label: 'Feb', weightKg: 42, heightPercent: 62, note: 'Mid-term hackathon discarded prototypes.' },
  { month: 'March', label: 'Mar', weightKg: 49, heightPercent: 72, note: 'ECE embedded lab inventory clearance.' },
  { month: 'April', label: 'Apr', weightKg: 54, heightPercent: 80, note: 'Spring tech fest setup recycling.' },
  { month: 'May', label: 'May', weightKg: 61, heightPercent: 90, isPeak: true, note: 'Peak intake reached in May during Lab Decommission Drive.' },
  { month: 'June (Live)', label: 'Jun*', weightKg: 40, heightPercent: 58, isLive: true, note: 'Ongoing semester-end hostel departures.' },
];

export const initialCouriers: Courier[] = [
  { id: 'c-1', name: 'Aarav Patel', role: 'Lead Operations Courier', status: 'On Route', assignedCount: 3, vehicle: 'Campus Cargo E-Trike #1', phone: '+91 98450 71832' },
  { id: 'c-2', name: 'Sneha Roy', role: 'Lab Courier Specialist', status: 'On Route', assignedCount: 2, vehicle: 'Campus Cargo E-Trike #2', phone: '+91 98451 22394' },
  { id: 'c-3', name: 'Vikram Kulkarni', role: 'Safety & Hazardous Triage', status: 'Available', assignedCount: 1, vehicle: 'Utility Cart #3', phone: '+91 98452 44910' },
];

// Helper functions with localStorage
export function getStoredManifests(): ManifestItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_MANIFESTS_KEY);
    return raw ? JSON.parse(raw) : initialManifests;
  } catch {
    return initialManifests;
  }
}

export function saveStoredManifests(items: ManifestItem[]): void {
  localStorage.setItem(STORAGE_MANIFESTS_KEY, JSON.stringify(items));
}

export function getStoredMetrics(): KpiMetrics {
  try {
    const raw = localStorage.getItem(STORAGE_METRICS_KEY);
    return raw ? JSON.parse(raw) : initialMetrics;
  } catch {
    return initialMetrics;
  }
}

export function saveStoredMetrics(metrics: KpiMetrics): void {
  localStorage.setItem(STORAGE_METRICS_KEY, JSON.stringify(metrics));
}

export function getStoredHubs(): DropHub[] {
  try {
    const raw = localStorage.getItem(STORAGE_HUBS_KEY);
    return raw ? JSON.parse(raw) : initialDropHubs;
  } catch {
    return initialDropHubs;
  }
}

export function saveStoredHubs(hubs: DropHub[]): void {
  localStorage.setItem(STORAGE_HUBS_KEY, JSON.stringify(hubs));
}

export function resetAllData(): { manifests: ManifestItem[]; metrics: KpiMetrics; hubs: DropHub[] } {
  localStorage.removeItem(STORAGE_MANIFESTS_KEY);
  localStorage.removeItem(STORAGE_METRICS_KEY);
  localStorage.removeItem(STORAGE_HUBS_KEY);
  return {
    manifests: initialManifests,
    metrics: initialMetrics,
    hubs: initialDropHubs,
  };
}
