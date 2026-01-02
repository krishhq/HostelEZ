
import React from 'react';
import { User, LeaveApplication, AttendanceRecord, LogEntry } from '../types';

interface Props {
  user: User;
  ward?: User;
  leaves: LeaveApplication[];
  attendance: AttendanceRecord[];
  logs: LogEntry[];
  onUpdateLeave: (id: string, updates: Partial<LeaveApplication>) => void;
}

const GuardianDashboard: React.FC<Props> = ({ user, ward, leaves, attendance, logs, onUpdateLeave }) => {
  if (!ward) return <div className="text-center p-10">No ward linked to this account.</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold">{ward.name}</h2>
          <p className="text-xs text-gray-500">Room: {ward.roomNumber} | Room Resident</p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-bold">Pending Approvals</h4>
          <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold">Action Required</span>
        </div>
        {leaves.filter(l => l.guardianStatus === 'pending').map(l => (
          <div key={l.id} className="bg-white p-4 rounded-2xl border shadow-sm animate-pulse-slow">
            <h5 className="font-bold mb-1">Leave Request: {l.startDate}</h5>
            <p className="text-xs text-gray-500 mb-3">{l.reason}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => onUpdateLeave(l.id, { guardianStatus: 'approved' })}
                className="flex-1 bg-indigo-600 text-white text-xs font-bold py-2 rounded-xl"
              >
                APPROVE
              </button>
              <button 
                onClick={() => onUpdateLeave(l.id, { guardianStatus: 'rejected' })}
                className="flex-1 bg-gray-100 text-gray-600 text-xs font-bold py-2 rounded-xl"
              >
                DENY
              </button>
            </div>
          </div>
        ))}
        {leaves.filter(l => l.guardianStatus === 'pending').length === 0 && (
          <p className="text-sm text-center text-gray-400 py-4">No pending leave requests.</p>
        )}
      </section>

      <section className="space-y-4">
        <h4 className="font-bold">Activity Feed</h4>
        <div className="space-y-3">
          {logs.slice(0, 5).map(log => (
            <div key={log.id} className="bg-white p-3 rounded-xl border flex gap-3 items-center">
              <div className={`p-2 rounded-lg ${log.type === 'ENTRY' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {log.type === 'ENTRY' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{log.type === 'ENTRY' ? 'Returned to' : 'Left'} Hostel</p>
                <p className="text-[10px] text-gray-400">{new Date(log.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="font-bold">Attendance Record</h4>
        <div className="bg-indigo-50 p-4 rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-indigo-400 uppercase">Recent Attendance</p>
            <p className="text-sm font-bold text-indigo-900">Last marked {attendance[0] ? new Date(attendance[0].timestamp).toLocaleDateString() : 'Never'}</p>
          </div>
          <span className="text-indigo-600 bg-white px-3 py-1 rounded-full font-bold text-xs shadow-sm">
            {attendance.length} Total
          </span>
        </div>
      </section>
    </div>
  );
};

export default GuardianDashboard;
