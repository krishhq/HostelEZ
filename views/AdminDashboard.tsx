
import React, { useState } from 'react';
import { User, Complaint, LeaveApplication, AttendanceRecord, LogEntry } from '../types';

interface Props {
  user: User;
  complaints: Complaint[];
  leaves: LeaveApplication[];
  attendance: AttendanceRecord[];
  logs: LogEntry[];
  residents: User[];
  onUpdateLeave: (id: string, updates: Partial<LeaveApplication>) => void;
  messAlert: boolean;
}

const AdminDashboard: React.FC<Props> = ({ 
  user, complaints, leaves, attendance, logs, residents, onUpdateLeave, messAlert 
}) => {
  const [activeView, setActiveView] = useState<'overview' | 'complaints' | 'leaves' | 'residents'>('overview');

  const getLeaveCardStyle = (app: LeaveApplication) => {
    if (app.guardianStatus === 'rejected') return 'bg-black text-white border-black';
    if (app.guardianStatus === 'pending') return 'bg-red-50 text-red-900 border-red-200';
    return 'bg-white text-gray-900 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        {messAlert && (
          <div className="bg-red-500 text-white text-[10px] px-3 py-1 rounded-full animate-pulse font-bold flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            MESS ALERT: HIGH CANCELLATION
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setActiveView('overview')} className={`p-4 rounded-2xl border text-left transition-all ${activeView === 'overview' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-gray-800'}`}>
          <p className="text-2xl font-bold">{logs.length}</p>
          <p className="text-xs font-medium opacity-70">Logs Today</p>
        </button>
        <button onClick={() => setActiveView('complaints')} className={`p-4 rounded-2xl border text-left transition-all ${activeView === 'complaints' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-gray-800'}`}>
          <p className="text-2xl font-bold">{complaints.filter(c => c.status === 'pending').length}</p>
          <p className="text-xs font-medium opacity-70">New Complaints</p>
        </button>
      </div>

      {activeView === 'overview' && (
        <section className="space-y-4">
          <h4 className="font-bold">Recent Entry/Exit Activity</h4>
          <div className="bg-white rounded-2xl border divide-y overflow-hidden">
            {logs.slice(0, 10).map(log => (
              <div key={log.id} className="p-3 flex justify-between items-center text-sm">
                <div>
                  <p className="font-semibold">{residents.find(r => r.id === log.residentId)?.name}</p>
                  <p className="text-xs text-gray-400">{log.type} - {log.personType}</p>
                </div>
                <p className="text-xs font-mono text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {(activeView === 'leaves' || activeView === 'overview') && (
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold">Leave Applications</h4>
            <button onClick={() => setActiveView('leaves')} className="text-xs text-indigo-600 font-bold">View All</button>
          </div>
          <div className="space-y-3">
            {leaves.filter(l => activeView === 'overview' ? l.adminStatus === 'pending' : true).map(l => (
              <div key={l.id} className={`p-4 rounded-2xl border shadow-sm transition-all ${getLeaveCardStyle(l)}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-bold">{l.residentName}</h5>
                    <p className="text-[10px] font-bold uppercase opacity-60">Leave Period</p>
                    <p className="text-xs font-bold">{l.startDate} — {l.endDate}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${l.guardianStatus === 'rejected' ? 'border-white/20 text-white' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
                      Guardian: {l.guardianStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="text-xs opacity-80 mb-4">{l.reason}</p>
                {l.adminStatus === 'pending' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onUpdateLeave(l.id, { adminStatus: 'approved' })}
                      className="flex-1 bg-green-500 text-white text-[10px] font-bold py-2 rounded-lg"
                    >
                      APPROVE
                    </button>
                    <button 
                      onClick={() => onUpdateLeave(l.id, { adminStatus: 'rejected' })}
                      className="flex-1 bg-gray-200 text-gray-700 text-[10px] font-bold py-2 rounded-lg"
                    >
                      REJECT
                    </button>
                  </div>
                )}
                {l.adminStatus !== 'pending' && (
                  <div className="mt-2 text-[10px] font-bold uppercase opacity-60 text-center border-t pt-2">
                    Admin Decided: {l.adminStatus}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {activeView === 'complaints' && (
        <section className="space-y-4">
          <h4 className="font-bold">Categorized Complaints</h4>
          {['sanitation', 'plumbing', 'electrical', 'staff', 'mess', 'miscellaneous'].map(tag => {
            const filtered = complaints.filter(c => c.tag === tag);
            if (filtered.length === 0) return null;
            return (
              <div key={tag} className="space-y-2">
                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tag}</h5>
                {filtered.map(c => (
                  <div key={c.id} className="bg-white p-3 rounded-xl border flex justify-between items-center text-sm">
                    <div>
                      <p className="font-semibold">{c.residentName}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{c.description}</p>
                    </div>
                    <span className={`text-[10px] font-bold ${c.status === 'resolved' ? 'text-green-500' : 'text-orange-500'}`}>
                      {c.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </section>
      )}

      {activeView === 'residents' && (
        <section className="space-y-4">
          <h4 className="font-bold">Resident Logbook</h4>
          <div className="bg-white rounded-2xl border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase text-gray-500 font-bold">
                  <th className="p-3">Name</th>
                  <th className="p-3">Room</th>
                  <th className="p-3">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs">
                {residents.map(r => {
                  const presentCount = attendance.filter(a => a.residentId === r.id && a.status === 'PRESENT').length;
                  return (
                    <tr key={r.id}>
                      <td className="p-3 font-semibold">{r.name}</td>
                      <td className="p-3 text-gray-500">{r.roomNumber}</td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">
                          {presentCount} Session(s)
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-8 py-3 flex justify-between items-center z-50">
        <button onClick={() => setActiveView('overview')} className={`flex flex-col items-center ${activeView === 'overview' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          <span className="text-[10px] font-bold">Overview</span>
        </button>
        <button onClick={() => setActiveView('complaints')} className={`flex flex-col items-center ${activeView === 'complaints' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
          <span className="text-[10px] font-bold">Issues</span>
        </button>
        <button onClick={() => setActiveView('leaves')} className={`flex flex-col items-center ${activeView === 'leaves' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-[10px] font-bold">Leaves</span>
        </button>
        <button onClick={() => setActiveView('residents')} className={`flex flex-col items-center ${activeView === 'residents' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span className="text-[10px] font-bold">Residents</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminDashboard;
