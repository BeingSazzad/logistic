import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff } from 'lucide-react';

const roles = [
  { value: 'admin',     label: 'Admin — Company Oversight & Governance' },
  { value: 'dispatch',  label: 'Dispatch — Core Operations Workspace' },
  { value: 'warehouse', label: 'Warehouse — Floor & Inventory Management' },
  { value: 'driver',    label: 'Driver — Mobile PWA App' },
];

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('dispatch');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/' + role);
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#111111] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(#FACC15 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-black" strokeWidth={3} />
          </div>
          <span className="text-white text-2xl font-bold tracking-tight">HERO</span>
        </div>

        <div className="relative z-10">
          <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
            Logistics &amp; Trucking SaaS
          </div>
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Operations at<br />the speed of trust.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-sm">
            Manage dispatch, fleet, drivers, and deliveries from a single powerful workspace built for enterprise logistics.
          </p>
          <div className="mt-10 flex flex-col gap-3">
            {['Real-time fleet tracking', 'Multi-role access control', 'Offline-capable driver app'].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                </div>
                <span className="text-gray-300 text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-gray-600 text-xs">© 2026 HERO Logistics. All rights reserved.</p>
      </div>

      {/* Right Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-black" strokeWidth={3} />
            </div>
            <span className="text-gray-900 text-2xl font-bold">HERO</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your workspace</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input type="email" defaultValue="sarah@hero.com" required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 bg-white transition"
                placeholder="you@company.com" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-xs text-yellow-600 font-semibold hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} defaultValue="password123" required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 bg-white transition"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Your Role</label>
              <select value={role} onChange={e => setRole(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-yellow-400 bg-white transition">
                {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded" />
              <label htmlFor="remember" className="text-sm text-gray-600">Keep me signed in</label>
            </div>

            <button type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 rounded-lg text-sm transition-all mt-2 shadow-sm hover:shadow-md">
              Sign in to Dashboard →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
