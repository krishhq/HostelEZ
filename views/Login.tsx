
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (phone: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'phone') {
      if (phone.length >= 10) {
        setStep('otp');
      }
    } else {
      if (otp === '1234') {
        onLogin(phone);
      } else {
        alert("Enter '1234' to demo");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-8 max-w-md mx-auto">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HostelEase</h1>
        <p className="text-gray-500">Your campus living, simplified.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 'phone' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="mt-2 text-xs text-gray-400">We'll send you an OTP to verify your account.</p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
            <input 
              type="text" 
              required
              maxLength={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-center text-2xl tracking-[1rem]"
              placeholder="0000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex justify-between items-center mt-4">
              <button type="button" onClick={() => setStep('phone')} className="text-sm text-indigo-600 font-medium">Change Phone</button>
              <button type="button" className="text-sm text-gray-400">Resend Code</button>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all"
        >
          {step === 'phone' ? 'Send OTP' : 'Verify & Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
