
import React, { useState, useEffect, useMemo } from 'react';
import { User, UserRole, Complaint, LeaveApplication, AttendanceRecord, LogEntry, MealSkip } from './types';
import { MOCK_USERS, INITIAL_COMPLAINTS, INITIAL_LEAVES, INITIAL_ATTENDANCE, INITIAL_LOGS } from './mockData';
import Login from './views/Login';
import ResidentDashboard from './views/ResidentDashboard';
import AdminDashboard from './views/AdminDashboard';
import GuardianDashboard from './views/GuardianDashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [leaves, setLeaves] = useState<LeaveApplication[]>(INITIAL_LEAVES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [skips, setSkips] = useState<MealSkip[]>([]);

  // Simulation of Firebase persistence logic
  const handleLogin = (phone: string) => {
    const found = MOCK_USERS.find(u => u.phone === phone);
    if (found) {
      setUser(found);
    } else {
      alert("User not found. Try 1234567890 (Resident), 0987654321 (Admin), or 5556667777 (Guardian)");
    }
  };

  const logout = () => setUser(null);

  const addComplaint = (c: Complaint) => setComplaints([c, ...complaints]);
  const addLeave = (l: LeaveApplication) => setLeaves([l, ...leaves]);
  const updateLeave = (id: string, updates: Partial<LeaveApplication>) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, ...updates } : l));
  };
  const markAttendance = (a: AttendanceRecord) => setAttendance([a, ...attendance]);
  const addLog = (log: LogEntry) => setLogs([log, ...logs]);
  const addSkip = (skip: MealSkip) => setSkips([...skips, skip]);

  const residentsCount = MOCK_USERS.filter(u => u.role === UserRole.RESIDENT).length;
  const messAlert = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const skipsToday = skips.filter(s => s.date === today).length;
    return skipsToday > (residentsCount * 0.1);
  }, [skips, residentsCount]);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-xl">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-bold text-indigo-600">HostelEase</h1>
          <p className="text-xs text-gray-500">{user.role} | {user.name}</p>
        </div>
        <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 hide-scrollbar pb-24">
        {user.role === UserRole.RESIDENT && (
          <ResidentDashboard 
            user={user} 
            complaints={complaints.filter(c => c.residentId === user.id)}
            onAddComplaint={addComplaint}
            leaves={leaves.filter(l => l.residentId === user.id)}
            onApplyLeave={addLeave}
            attendance={attendance.filter(a => a.residentId === user.id)}
            onMarkAttendance={markAttendance}
            logs={logs.filter(l => l.residentId === user.id)}
            onAddLog={addLog}
            skips={skips.filter(s => s.residentId === user.id)}
            onSkipMeal={addSkip}
          />
        )}
        {user.role === UserRole.ADMIN && (
          <AdminDashboard 
            user={user} 
            complaints={complaints}
            leaves={leaves}
            attendance={attendance}
            logs={logs}
            residents={MOCK_USERS.filter(u => u.role === UserRole.RESIDENT)}
            onUpdateLeave={updateLeave}
            messAlert={messAlert}
          />
        )}
        {user.role === UserRole.GUARDIAN && (
          <GuardianDashboard 
            user={user} 
            ward={MOCK_USERS.find(u => u.id === user.wardId)}
            leaves={leaves.filter(l => l.guardianId === user.id)}
            attendance={attendance.filter(a => a.residentId === user.wardId)}
            logs={logs.filter(l => l.residentId === user.wardId)}
            onUpdateLeave={updateLeave}
          />
        )}
      </main>
    </div>
  );
};

export default App;
