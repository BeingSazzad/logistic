import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter, Plus, Package, Truck, DollarSign, AlertCircle,
  Clock, TrendingUp, MapPin, Search, MoreVertical
} from 'lucide-react';

const jobs = [
  { id: 'JOB-20481', customer: 'Acme Corp',          route: 'Sydney → Melbourne',  driver: 'Jack Taylor',  vehicle: 'Truck 12', status: 'In Transit', eta: '2:45 PM' },
  { id: 'JOB-20482', customer: 'Tech Solutions Ltd',  route: 'Brisbane → Sydney',      driver: 'Liam Smith',  vehicle: 'Van 08',   status: 'Assigned',  eta: '4:30 PM' },
  { id: 'JOB-20483', customer: 'Global Traders',      route: 'Perth → Adelaide',   driver: 'Noah Williams',   vehicle: 'Truck 05', status: 'Delayed',   eta: '5:00 PM' },
  { id: 'JOB-20484', customer: 'Express Goods',       route: 'Sydney → Newcastle',  driver: 'Unassigned',   vehicle: '-',        status: 'Pending',   eta: '-' },
];

function StatusBadge({ status }) {
  const map = {
    'In Transit': 'badge-yellow',
    'Assigned':   'badge-blue',
    'Delayed':    'badge-orange',
    'Pending':    'badge-gray',
  };
  return <span className={`badge ${map[status] ?? 'badge-gray'}`}>{status}</span>;
}

function KpiCard({ label, value, sub, subColor = 'text-gray-400', iconBg, icon: Icon, iconColor }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon size={17} className={iconColor} />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 tracking-tight mb-1">{value}</p>
      <p className={`text-xs font-semibold ${subColor}`}>{sub}</p>
    </div>
  );
}

function MetricCard({ label, value, barColor, barWidth, iconBg, icon: Icon, iconColor }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${iconBg}`}>
          <Icon size={17} className={iconColor} />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-400">{label}</p>
          <p className="text-lg font-bold text-gray-900 leading-tight">{value}</p>
        </div>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: barWidth }} />
      </div>
    </div>
  );
}

export default function DispatchDashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dispatch Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage operations and track deliveries</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-lg transition">
            <Filter size={15} /> Filter
          </button>
          <button onClick={() => navigate('/dispatch/jobs/create')} className="flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-bold rounded-lg transition shadow-sm">
            <Plus size={15} /> Create Job
          </button>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard label="Active Jobs"    value="142"   sub="+12% from last week"    subColor="text-green-600"  icon={Package}     iconBg="bg-yellow-50"  iconColor="text-yellow-500" />
        <KpiCard label="In Transit"     value="38"    sub="Real-time tracking"                                icon={Truck}       iconBg="bg-blue-50"    iconColor="text-blue-500" />
        <KpiCard label="Revenue MTD"    value="$4.2M" sub="+18% from last month"   subColor="text-green-600"  icon={DollarSign}  iconBg="bg-green-50"   iconColor="text-green-500" />
        <KpiCard label="Critical Alerts" value="3"   sub="Requires attention"      subColor="text-red-500"    icon={AlertCircle} iconBg="bg-red-50"     iconColor="text-red-500" />
      </div>

      {/* ── Metric Progress Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard label="Avg Delivery Time"  value="4.2 hrs" barColor="bg-yellow-400" barWidth="60%" icon={Clock}       iconBg="bg-yellow-50 border-yellow-100"  iconColor="text-yellow-500" />
        <MetricCard label="Fleet Utilization"  value="87%"     barColor="bg-green-600"  barWidth="87%" icon={TrendingUp}  iconBg="bg-green-50 border-green-100"    iconColor="text-green-600" />
        <MetricCard label="Driver Availability" value="24 / 32" barColor="bg-blue-500"  barWidth="75%" icon={MapPin}      iconBg="bg-blue-50 border-blue-100"      iconColor="text-blue-500" />
      </div>

      {/* ── Active Jobs Table ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Active Jobs</h3>
            <p className="text-xs text-gray-400 mt-0.5">Track and manage ongoing deliveries</p>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 w-56 transition"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['JOB ID','CUSTOMER','ROUTE','DRIVER','VEHICLE','STATUS','ETA','ACTIONS'].map(h => (
                  <th key={h} className="px-6 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">{job.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{job.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{job.route}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{job.driver}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{job.vehicle}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={job.status} /></td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap font-medium">{job.eta}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1.5 text-gray-300 hover:text-gray-600 rounded-md hover:bg-gray-100 transition">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
