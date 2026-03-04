export interface Truck {
  id: string;
  licensePlate: string;
  capacityKg: number;
  status: 'Available' | 'Active' | 'Maintenance';
  location: string;
}

export interface Driver {
  id: string;
  name: string;
  qualifications: string[];
  status: 'Available' | 'On Trip' | 'Resting';
  licenseExpiry: string;
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
  truckId: string;
  driverId: string;
  startTime: string;
  customer: string;
}

export const mockTrucks: Truck[] = [
  { id: 'TRK-001', licensePlate: 'ABC-123', capacityKg: 10000, status: 'Available', location: 'Los Angeles' },
  { id: 'TRK-002', licensePlate: 'DEF-456', capacityKg: 15000, status: 'Active', location: 'San Francisco' },
  { id: 'TRK-003', licensePlate: 'GHI-789', capacityKg: 8000, status: 'Maintenance', location: 'Phoenix' },
  { id: 'TRK-004', licensePlate: 'JKL-012', capacityKg: 20000, status: 'Available', location: 'Las Vegas' },
];

export const mockDrivers: Driver[] = [
  { id: 'DRV-001', name: 'Alice Smith', qualifications: ['Standard', 'Hazardous'], status: 'Available', licenseExpiry: '2025-12-01' },
  { id: 'DRV-002', name: 'Bob Johnson', qualifications: ['Standard', 'Refrigerated'], status: 'On Trip', licenseExpiry: '2024-05-15' },
  { id: 'DRV-003', name: 'Charlie Brown', qualifications: ['Standard'], status: 'Available', licenseExpiry: '2026-01-20' },
];

export const mockTrips: Trip[] = [
  {
    id: 'TRIP-101',
    origin: 'Los Angeles, CA',
    destination: 'San Francisco, CA',
    status: 'In Progress',
    truckId: 'TRK-002',
    driverId: 'DRV-002',
    startTime: '2024-05-10T08:00:00Z',
    customer: 'TechGlobal Corp',
  },
  {
    id: 'TRIP-102',
    origin: 'Phoenix, AZ',
    destination: 'Las Vegas, NV',
    status: 'Pending',
    truckId: 'TRK-001',
    driverId: 'DRV-001',
    startTime: '2024-05-12T10:00:00Z',
    customer: 'EcoBuild Supplies',
  },
];