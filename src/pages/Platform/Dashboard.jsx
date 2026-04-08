import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, TrendingUp, Activity, Users, ArrowRight, Download, Filter } from 'lucide-react';

const yearlyData = {
  2026: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    income: [8400, 9100, 10500, 11200, 12000, 13400, 14000, 15100, 16000, 17200, 18000, 19500],
    users: [420, 480, 510, 580, 620, 690, 750, 810, 890, 960, 1050, 1120],
  },
  2025: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    income: [2000, 2500, 3100, 3500, 4100, 4900, 5500, 6000, 6800, 7200, 7800, 8200],
    users: [110, 140, 190, 220, 260, 310, 340, 380, 420, 450, 480, 510],
  }
};

const tenants = [
  { id: 'T-001', name: 'HERO Logistics Pty Ltd',  status: 'active',    plan: 'Pro',       shipments: 342, mrr: 149,  trial: null },
  { id: 'T-002', name: 'FastMove AU',              status: 'trial',     plan: 'Starter',   shipments: 47,  mrr: 0,    trial: 3 },
  { id: 'T-003', name: 'OzFreight Co',             status: 'active',    plan: 'Enterprise',shipments: 1240,mrr: 599,  trial: null },
  { id: 'T-004', name: 'SunState Transport',       status: 'active',    plan: 'Pro',       shipments: 198, mrr: 149,  trial: null },
];

export default function PlatformDashboard() {
  const navigate = useNavigate();
  const [year, setYear] = useState(2026);
  
  const data = yearlyData[year];
  const maxIncome = Math.max(...data.income);
  const maxUsers = Math.max(...data.users);

  const totalMRR = tenants.reduce((s, t) => s + t.mrr, 0);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Multi-tenant health & yearly revenue</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Tenants', value: tenants.filter(t=>t.status==='active').length, icon: Building2, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Total MRI / Month', value: `$${totalMRR}`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Users', value: '1,120', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Platform Status', value: 'Operational', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm text-gray-500 font-medium">{s.label}</span>
              <div className={`w-8 h-8 rounded-md ${s.bg} flex items-center justify-center`}><s.icon size={16} className={s.color} /></div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Yearly Summary Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-gray-900">Yearly Summary</h3>
            <div className="flex items-center gap-4 mt-2 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-yellow-500 inline-block" /> Income ($)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-300 inline-block" /> Users Count</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className="input text-sm py-1.5 px-3 min-w-[100px]" value={year} onChange={(e) => setYear(Number(e.target.value))}>
              <option value={2026}>2026</option>
              <option value={2025}>2025</option>
            </select>
          </div>
        </div>

        <div className="flex items-end gap-2 sm:gap-4 h-64 mt-4 relative">
          {data.months.map((m, i) => {
            const hIncome = Math.max(10, (data.income[i] / maxIncome) * 100);
            const hUsers = Math.max(10, (data.users[i] / maxUsers) * 100);
            return (
              <div key={m} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex gap-1 items-end h-[200px]" title={`Income: $${data.income[i]} | Users: ${data.users[i]}`}>
                  <div className="flex-1 bg-yellow-500 rounded-t-sm hover:bg-yellow-600 transition-colors" style={{ height: `${hIncome}%` }} />
                  <div className="flex-1 bg-blue-300 rounded-t-sm hover:bg-blue-400 transition-colors" style={{ height: `${hUsers}%` }} />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 font-semibold">{m}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Tenants Table Snippet */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Recent Tenants Activity</h3>
          <button onClick={() => navigate('/platform/tenants')} className="text-sm text-yellow-600 font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {tenants.map(t => (
            <div key={t.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t.plan} · {t.shipments} shipments/mo</p>
              </div>
              <button onClick={() => navigate(`/platform/tenants/${t.id}`)} className="btn btn-dark text-xs py-1.5 px-3">Manage</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
