import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const roles = [
  { value: 'platform',  label: 'Platform Owner — SaaS Management Console' },
  { value: 'admin',     label: 'Super Admin — Company Oversight & Governance' },
  { value: 'dispatch',  label: 'Dispatcher — Core Operations Workspace' },
  { value: 'accounts',  label: 'Accounts — Finance & Billing Control' },
  { value: 'warehouse', label: 'Warehouse — Floor & Inventory Management' },
  { value: 'driver',    label: 'Driver — Mobile PWA App' },
  { value: 'customer',  label: 'Customer Portal — Tracking & Invoices' },
];

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('dispatch');
  const [showPass, setShowPass] = useState(false);

  const setUser = useAuthStore(state => state.setUser);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Map internal role values to display roles used in state logic
    const roleMap = {
      'platform': 'Platform Admin',
      'admin': 'Super Admin',
      'dispatch': 'Dispatcher',
      'accounts': 'Accounts',
      'warehouse': 'Warehouse',
      'driver': 'Driver',
      'customer': 'Customer'
    };

    const userData = {
      name: 'Sarah Mitchell',
      role: roleMap[role] || role,
      branchId: 'SYD-CENTRAL',
      branchName: 'Sydney Central Depot',
      email: 'sarah.m@herologistics.com'
    };

    setUser(userData);
    navigate('/' + role);
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#111111] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(#FACC15 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 flex items-center mb-8">
          <img 
            src="/logo.png" 
            alt="HERO Logistics" 
            className="h-10 object-contain cursor-pointer"
            onClick={() => navigate('/')}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }} 
          />
          <div className="hidden items-center gap-3">
            <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-black" strokeWidth={3} />
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">HERO</span>
          </div>
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
          <div className="flex lg:hidden items-center justify-center mb-10">
            <img 
              src="/logo.png" 
              alt="HERO Logistics" 
              className="h-10 object-contain cursor-pointer"
              onClick={() => navigate('/')}
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }} 
            />
            <div className="hidden items-center gap-3">
              <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-black" strokeWidth={3} />
              </div>
              <span className="text-gray-900 text-2xl font-bold">HERO</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your workspace</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                defaultValue="sarah@hero.com" 
                required
                className="input"
                placeholder="you@company.com" 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs text-yellow-600 font-bold hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input 
                  type={showPass ? 'text' : 'password'} 
                  defaultValue="password123" 
                  required
                  className="input pr-12"
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Select Your Role</label>
              <div className="relative">
                <select 
                  value={role} 
                  onChange={e => setRole(e.target.value)}
                  className="input appearance-none cursor-pointer pr-10"
                >
                  {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <Eye size={16} className="rotate-90" /> {/* Placeholder for a chevron if needed, or use a custom arrow */}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 accent-yellow-400 cursor-pointer" />
              <label htmlFor="remember" className="text-sm text-gray-600 font-medium cursor-pointer">Keep me signed in</label>
            </div>

            <button 
              type="submit"
              className="btn bg-[#FFCC00] hover:bg-[#E6B800] text-black w-full shadow-lg shadow-yellow-400/10 mt-2"
            >
              Sign in to Dashboard →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
