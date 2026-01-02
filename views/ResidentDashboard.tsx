
import React, { useState } from 'react';
import { User, Complaint, ComplaintTag, LeaveApplication, AttendanceRecord, LogEntry, MealSkip } from '../types';
import { MESS_MENU } from '../mockData';

interface Props {
  user: User;
  complaints: Complaint[];
  onAddComplaint: (c: Complaint) => void;
  leaves: LeaveApplication[];
  onApplyLeave: (l: LeaveApplication) => void;
  attendance: AttendanceRecord[];
  onMarkAttendance: (a: AttendanceRecord) => void;
  logs: LogEntry[];
  onAddLog: (log: LogEntry) => void;
  skips: MealSkip[];
  onSkipMeal: (skip: MealSkip) => void;
}

const ResidentDashboard: React.FC<Props> = ({ 
  user, complaints, onAddComplaint, leaves, onApplyLeave, 
  attendance, onMarkAttendance, logs, onAddLog, skips, onSkipMeal 
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'complaints' | 'logs' | 'mess' | 'leave' | 'forum'>('home');
  const [showModal, setShowModal] = useState<string | null>(null);

  // Home Screen Summary
  const HomeView = () => (
    <div className="space-y-6">
      <div className="bg-indigo-600 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-sm font-medium opacity-80 mb-1">Welcome back,</h2>
          <h3 className="text-2xl font-bold mb-4">{user.name}</h3>
          <div className="flex gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] uppercase font-bold opacity-70">Room</p>
              <p className="font-semibold">{user.roomNumber}</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] uppercase font-bold opacity-70">Due Balance</p>
              <p className="font-semibold">${user.dueAmount}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <section>
        <h4 className="text-lg font-bold mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setShowModal('attendance')} className="bg-white p-4 rounded-2xl border flex flex-col items-center gap-2 hover:border-indigo-500 transition-all shadow-sm">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Attendance</span>
          </button>
          <button onClick={() => setShowModal('log')} className="bg-white p-4 rounded-2xl border flex flex-col items-center gap-2 hover:border-indigo-500 transition-all shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Entry/Exit</span>
          </button>
        </div>
      </section>

      <section>
        <h4 className="text-lg font-bold mb-3">Today's Mess</h4>
        <div className="bg-white p-4 rounded-2xl border space-y-3">
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-sm font-medium text-gray-500">Breakfast</span>
            <span className="text-sm font-semibold">{MESS_MENU[0].breakfast}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-sm font-medium text-gray-500">Lunch</span>
            <span className="text-sm font-semibold">{MESS_MENU[0].lunch}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Dinner</span>
            <span className="text-sm font-semibold">{MESS_MENU[0].dinner}</span>
          </div>
        </div>
      </section>
    </div>
  );

  const ComplaintsView = () => {
    const [tag, setTag] = useState<ComplaintTag>('miscellaneous');
    const [desc, setDesc] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onAddComplaint({
        id: Math.random().toString(),
        residentId: user.id,
        residentName: user.name,
        tag,
        description: desc,
        status: 'pending',
        createdAt: Date.now()
      });
      setDesc('');
      alert("Complaint registered!");
    };

    return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl border space-y-4">
          <h4 className="font-bold">Register Complaint</h4>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
            <select value={tag} onChange={e => setTag(e.target.value as ComplaintTag)} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 outline-none">
              <option value="sanitation">Sanitation</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="staff">Staff</option>
              <option value="mess">Mess</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} required className="w-full mt-1 p-2 border rounded-lg bg-gray-50 h-24 outline-none" placeholder="What's the issue?" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold">Submit</button>
        </form>

        <div className="space-y-3">
          <h4 className="font-bold">Recent Complaints</h4>
          {complaints.map(c => (
            <div key={c.id} className="bg-white p-4 rounded-xl border flex justify-between items-start">
              <div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${c.tag === 'plumbing' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  {c.tag}
                </span>
                <p className="mt-2 text-sm text-gray-700">{c.description}</p>
              </div>
              <span className={`text-[10px] font-bold ${c.status === 'resolved' ? 'text-green-500' : 'text-orange-500'}`}>
                {c.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MessView = () => {
    const today = new Date().toISOString().split('T')[0];
    const isSkipped = (meal: 'BREAKFAST' | 'LUNCH' | 'DINNER') => 
      skips.some(s => s.date === today && s.meal === meal);

    const handleSkip = (meal: 'BREAKFAST' | 'LUNCH' | 'DINNER') => {
      onSkipMeal({ id: Math.random().toString(), residentId: user.id, date: today, meal });
    };

    return (
      <div className="space-y-6">
        <h4 className="text-xl font-bold">Meal Skip Registry</h4>
        <p className="text-sm text-gray-500">Canceling meals helps us reduce food waste. If more than 10% residents skip, we notify authorities.</p>
        <div className="space-y-3">
          {(['BREAKFAST', 'LUNCH', 'DINNER'] as const).map(m => (
            <div key={m} className="bg-white p-4 rounded-2xl border flex justify-between items-center shadow-sm">
              <div>
                <h5 className="font-bold text-gray-800">{m}</h5>
                <p className="text-xs text-gray-400">Today, {today}</p>
              </div>
              <button 
                disabled={isSkipped(m)}
                onClick={() => handleSkip(m)}
                className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${isSkipped(m) ? 'bg-red-50 text-red-400 border border-red-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100 active:scale-95'}`}
              >
                {isSkipped(m) ? 'SKIPPED' : 'SKIP MEAL'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LeaveView = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    const handleLeaveSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onApplyLeave({
        id: Math.random().toString(),
        residentId: user.id,
        residentName: user.name,
        guardianId: user.guardianId || '3',
        startDate,
        endDate,
        reason,
        guardianStatus: 'pending',
        adminStatus: 'pending'
      });
      setStartDate('');
      setEndDate('');
      setReason('');
      alert("Leave application submitted for approval.");
    };

    const getLeaveCardStyle = (app: LeaveApplication) => {
      if (app.guardianStatus === 'rejected') return 'bg-black text-white border-black';
      if (app.guardianStatus === 'pending') return 'bg-red-50 text-red-900 border-red-200';
      return 'bg-white text-gray-900 border-gray-200';
    };

    return (
      <div className="space-y-6">
        <form onSubmit={handleLeaveSubmit} className="bg-white p-4 rounded-2xl border space-y-4">
          <h4 className="font-bold">Apply for Leave</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase">From</label>
              <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase">To</label>
              <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase">Reason</label>
            <textarea required value={reason} onChange={e => setReason(e.target.value)} className="w-full mt-1 p-2 border rounded-lg bg-gray-50 h-20 text-sm" placeholder="Reason for leave" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-xl font-bold">Submit Application</button>
        </form>

        <div className="space-y-3">
          <h4 className="font-bold">Application History</h4>
          {leaves.map(l => (
            <div key={l.id} className={`p-4 rounded-2xl border shadow-sm transition-all ${getLeaveCardStyle(l)}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-60">Leave Period</p>
                  <p className="text-sm font-bold">{l.startDate} — {l.endDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase opacity-60">Status</p>
                  <p className={`text-[10px] font-bold ${l.adminStatus === 'approved' ? 'text-green-500' : 'opacity-80'}`}>
                    Admin: {l.adminStatus.toUpperCase()}
                  </p>
                </div>
              </div>
              <p className="text-xs line-clamp-2 opacity-80">{l.reason}</p>
              <div className="mt-3 flex gap-2">
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${l.guardianStatus === 'rejected' ? 'border-white/20 text-white' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
                  Guardian: {l.guardianStatus.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
          {leaves.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">No leave records found.</p>}
        </div>
      </div>
    );
  };

  // Entry/Exit Log Modal
  const EntryExitModal = () => {
    const [logType, setLogType] = useState<'ENTRY' | 'EXIT'>('EXIT');
    const [personType, setPersonType] = useState<'RESIDENT' | 'GUEST'>('RESIDENT');
    const [guestName, setGuestName] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    const handleLogSubmit = () => {
      setIsVerifying(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setTimeout(() => {
            onAddLog({
              id: Math.random().toString(),
              residentId: user.id,
              type: logType,
              timestamp: Date.now(),
              personType,
              guestName: personType === 'GUEST' ? guestName : undefined
            });
            setIsVerifying(false);
            setShowModal(null);
            alert(`${logType} recorded successfully! Location verified.`);
          }, 1500);
        },
        (err) => {
          setIsVerifying(false);
          alert("GPS must be enabled to log entry/exit.");
        }
      );
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center">
        <div className="bg-white w-full max-w-md rounded-t-3xl p-8 space-y-6 animate-slide-up">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold">Movement Log</h4>
            <button onClick={() => setShowModal(null)} className="p-2 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex p-1 bg-gray-100 rounded-xl">
              <button onClick={() => setLogType('EXIT')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${logType === 'EXIT' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}>Leaving</button>
              <button onClick={() => setLogType('ENTRY')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${logType === 'ENTRY' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}>Arriving</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setPersonType('RESIDENT')} className={`py-3 border rounded-xl font-semibold text-sm ${personType === 'RESIDENT' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'bg-white'}`}>Myself</button>
              <button onClick={() => setPersonType('GUEST')} className={`py-3 border rounded-xl font-semibold text-sm ${personType === 'GUEST' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'bg-white'}`}>Guest</button>
            </div>
            {personType === 'GUEST' && <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} className="w-full p-3 border rounded-xl bg-gray-50" placeholder="Guest Name" />}
            <p className="text-[10px] text-blue-600 font-medium bg-blue-50 p-2 rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
              Location check required
            </p>
          </div>
          <button onClick={handleLogSubmit} disabled={isVerifying} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg">
            {isVerifying ? 'Verifying...' : 'Confirm'}
          </button>
        </div>
      </div>
    );
  };

  const AttendanceModal = () => {
    const [verifying, setVerifying] = useState(false);
    const now = new Date();
    const hour = now.getHours();
    const canMark = (hour >= 7 && hour < 9) || (hour >= 20 && hour < 22);

    const handleVerification = () => {
      setVerifying(true);
      navigator.geolocation.getCurrentPosition(() => {
        setTimeout(() => {
          onMarkAttendance({ id: Math.random().toString(), residentId: user.id, type: hour < 12 ? 'MORNING' : 'EVENING', timestamp: Date.now(), status: 'PRESENT' });
          setVerifying(false);
          setShowModal(null);
          alert("Attendance marked successfully!");
        }, 1500);
      }, () => { setVerifying(false); alert("GPS required."); });
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center">
        <div className="bg-white w-full max-w-md rounded-t-3xl p-8 space-y-6">
          <div className="flex justify-between items-center"><h4 className="text-xl font-bold">Attendance</h4><button onClick={() => setShowModal(null)}>Close</button></div>
          <p className="text-center text-gray-500">Please scan your fingerprint while GPS is active.</p>
          <button disabled={!canMark || verifying} onClick={handleVerification} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold">
            {verifying ? 'Verifying...' : 'Scan Fingerprint'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-8">
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'complaints' && <ComplaintsView />}
      {activeTab === 'mess' && <MessView />}
      {activeTab === 'leave' && <LeaveView />}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold">Movement Logs</h4>
            <button onClick={() => setShowModal('log')} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-bold">New Log</button>
          </div>
          <div className="space-y-3">
            {logs.map(log => (
              <div key={log.id} className="bg-white p-4 rounded-xl border flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-bold text-gray-800 text-sm">{log.type} - {log.personType}</p>
                  <p className="text-[10px] text-gray-400">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
                {log.guestName && <span className="text-[10px] bg-indigo-50 px-2 py-0.5 rounded text-indigo-600 font-bold">{log.guestName}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-4 py-3 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 flex-1 ${activeTab === 'home' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-[9px] font-bold">Home</span>
        </button>
        <button onClick={() => setActiveTab('complaints')} className={`flex flex-col items-center gap-1 flex-1 ${activeTab === 'complaints' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span className="text-[9px] font-bold">Issues</span>
        </button>
        <button onClick={() => setActiveTab('leave')} className={`flex flex-col items-center gap-1 flex-1 ${activeTab === 'leave' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-[9px] font-bold">Leave</span>
        </button>
        <button onClick={() => setActiveTab('mess')} className={`flex flex-col items-center gap-1 flex-1 ${activeTab === 'mess' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <span className="text-[9px] font-bold">Mess</span>
        </button>
        <button onClick={() => setActiveTab('logs')} className={`flex flex-col items-center gap-1 flex-1 ${activeTab === 'logs' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
          <span className="text-[9px] font-bold">Logs</span>
        </button>
      </nav>

      {showModal === 'attendance' && <AttendanceModal />}
      {showModal === 'log' && <EntryExitModal />}
    </div>
  );
};

export default ResidentDashboard;
