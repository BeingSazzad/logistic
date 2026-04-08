import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck, FileText, Receipt, Users, TrendingUp, AlertTriangle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'PODs to Review',     value: '12',     sub: 'Awaiting approval',     color: 'text-orange-600', bg: 'bg-orange-50',   icon: FileCheck,  action: '/accounts/pod-review' },
  { label: 'Ready to Invoice',   value: '5',      sub: 'Generate & send',        color: 'text-blue-600',   bg: 'bg-blue-50',     icon: FileText,   action: '/accounts/invoices' },
  { label: 'Received Today',     value: '$18,450',sub: 'MTD: $486,500',          color: 'text-emerald-600',bg: 'bg-emerald-50',  icon: TrendingUp, action: '/accounts/payments' },
  { label: 'Overdue',            value: '$18,900',sub: '4 customers >30 days',   color: 'text-red-600',    bg: 'bg-red-50',      icon: AlertTriangle, action: '/accounts/invoices' },
];

const tasks = [
  { priority: 'high',   label: '3 invoices overdue >60 days ($18,900)',     action: 'Follow Up',       route: '/accounts/invoices' },
  { priority: 'medium', label: '12 PODs awaiting review',                    action: 'Review Queue',    route: '/accounts/pod-review' },
  { priority: 'low',    label: '5 invoices ready to send',                   action: 'Generate & Send', route: '/accounts/invoices' },
  { priority: 'low',    label: 'Friday driver settlements — $42,150 to 18 drivers', action: 'Process Payouts', route: '/accounts/settlements' },
];

const priorityStyle = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-green-100 text-green-700' };
const priorityDot   = { high: 'bg-red-500', medium: 'bg-yellow-500', low: 'bg-green-500' };

export default function AccountsDashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Finance Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Wednesday, 9 April 2026 — Month to Date</p>
        </div>
        <button onClick={() => navigate('/accounts/reports')} className="btn btn-primary">
          <TrendingUp size={16} /> Generate Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(s => (
          <button key={s.label} onClick={() => navigate(s.action)}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-left hover:border-emerald-300 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-medium text-gray-500">{s.label}</span>
              <div className={`w-8 h-8 rounded-md ${s.bg} flex items-center justify-center`}>
                <s.icon size={16} className={s.color} />
              </div>
            </div>
            <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-gray-500 font-medium">{s.sub}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Task Queue */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Today's Priority Tasks</h3>
            <p className="text-xs text-gray-500 mt-0.5">Sorted by urgency</p>
          </div>
          <div className="divide-y divide-gray-50">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${priorityDot[t.priority]}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.label}</p>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-1 inline-block ${priorityStyle[t.priority]}`}>
                      {t.priority}
                    </span>
                  </div>
                </div>
                <button onClick={() => navigate(t.route)}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 shrink-0 ml-4">
                  {t.action} <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Month-to-Date</h3>
          <div className="space-y-4">
            {[
              { label: 'Revenue',         value: '$486,500', color: 'text-emerald-600' },
              { label: 'Costs',           value: '$312,400', color: 'text-red-500' },
              { label: 'Gross Margin',    value: '35.8%',    color: 'text-blue-600' },
              { label: 'Outstanding AR',  value: '$127,300', color: 'text-orange-500' },
              { label: 'Overdue >30d',    value: '$18,900',  color: 'text-red-600' },
              { label: 'Driver Pay Due',  value: '$42,150',  color: 'text-purple-600' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/accounts/reports')}
            className="mt-5 w-full btn btn-dark text-xs">
            Full Financial Report
          </button>
        </div>
      </div>
    </div>
  );
}
