
import { User, UserRole, MessMenu, Complaint, LeaveApplication, AttendanceRecord, LogEntry } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'John Doe', phone: '1234567890', role: UserRole.RESIDENT, roomNumber: 'A-101', guardianId: '3', dueAmount: 500 },
  { id: '2', name: 'Admin Sarah', phone: '0987654321', role: UserRole.ADMIN },
  { id: '3', name: 'Mr. Smith', phone: '5556667777', role: UserRole.GUARDIAN, wardId: '1' },
  { id: '4', name: 'Jane Smith', phone: '1112223333', role: UserRole.RESIDENT, roomNumber: 'B-205', guardianId: '3', dueAmount: 0 },
];

export const MESS_MENU: MessMenu[] = [
  { day: 'Monday', breakfast: 'Pancakes & Fruit', lunch: 'Chicken Curry & Rice', dinner: 'Veg Thali' },
  { day: 'Tuesday', breakfast: 'Oatmeal', lunch: 'Pasta Bar', dinner: 'Stir Fry' },
  { day: 'Wednesday', breakfast: 'Eggs & Toast', lunch: 'Burgers', dinner: 'Fish & Chips' },
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  { id: 'c1', residentId: '1', residentName: 'John Doe', tag: 'plumbing', description: 'Leaking faucet in room A-101', status: 'pending', createdAt: Date.now() },
  { id: 'c2', residentId: '4', residentName: 'Jane Smith', tag: 'sanitation', description: 'Garbage not collected for 2 days', status: 'resolved', createdAt: Date.now() - 86400000 },
];

export const INITIAL_LEAVES: LeaveApplication[] = [
  { id: 'l1', residentId: '1', residentName: 'John Doe', guardianId: '3', startDate: '2023-11-01', endDate: '2023-11-05', reason: 'Family Wedding', guardianStatus: 'approved', adminStatus: 'pending' },
  { id: 'l2', residentId: '4', residentName: 'Jane Smith', guardianId: '3', startDate: '2023-11-10', endDate: '2023-11-12', reason: 'Home Visit', guardianStatus: 'pending', adminStatus: 'pending' },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', residentId: '1', type: 'MORNING', timestamp: Date.now(), status: 'PRESENT' },
];

export const INITIAL_LOGS: LogEntry[] = [
  { id: 'log1', residentId: '1', type: 'EXIT', timestamp: Date.now() - 3600000, personType: 'RESIDENT' },
  { id: 'log2', residentId: '1', type: 'ENTRY', timestamp: Date.now(), personType: 'GUEST', guestName: 'Mark Lee' },
];
