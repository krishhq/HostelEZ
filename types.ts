
export enum UserRole {
  RESIDENT = 'RESIDENT',
  ADMIN = 'ADMIN',
  GUARDIAN = 'GUARDIAN'
}

export type ComplaintTag = 'sanitation' | 'plumbing' | 'electrical' | 'staff' | 'mess' | 'miscellaneous';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  wardId?: string; // For Guardians
  guardianId?: string; // For Residents
  roomNumber?: string;
  dueAmount?: number;
}

export interface Complaint {
  id: string;
  residentId: string;
  residentName: string;
  tag: ComplaintTag;
  description: string;
  status: 'pending' | 'resolved';
  createdAt: number;
}

export interface AttendanceRecord {
  id: string;
  residentId: string;
  type: 'MORNING' | 'EVENING';
  timestamp: number;
  status: 'PRESENT' | 'ABSENT';
}

export interface LeaveApplication {
  id: string;
  residentId: string;
  residentName: string;
  guardianId: string;
  startDate: string;
  endDate: string;
  reason: string;
  guardianStatus: 'pending' | 'approved' | 'rejected';
  adminStatus: 'pending' | 'approved' | 'rejected';
}

export interface LogEntry {
  id: string;
  residentId: string;
  type: 'ENTRY' | 'EXIT';
  timestamp: number;
  personType: 'RESIDENT' | 'GUEST';
  guestName?: string;
}

export interface MessMenu {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface MealSkip {
  id: string;
  residentId: string;
  date: string;
  meal: 'BREAKFAST' | 'LUNCH' | 'DINNER';
}
