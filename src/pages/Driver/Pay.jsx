import React, { useState } from 'react';
import { DollarSign, TrendingUp, Clock, ChevronRight, ChevronDown } from 'lucide-react';

const weeks = [
  { label: 'This Week', trips: 2, km: 320, base: 272.00, toll: 45.00, bonus: 0, total: 317.00, status: 'pending' },
  { label: 'Last Week',  trips: 5, km: 884, base: 751.40, toll: 45.00, bonus: 50.00, total: 846.40, status: 'paid', date: '11 Apr' },
  { label: 'Week of 31 Mar', trips: 4, km: 612, base: 520.20, toll: 28.00, bonus: 50.00, total: 598.20, status: 'paid', date: '4 Apr' },
];

export default function DriverPay() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const processedWeeks = weeks.filter(w => {
    if (filter === 'all') return true;
    return w.status === filter;
  }).sort((a, b) => {
    if (sortBy === 'highest') return b.total - a.total;
    if (sortBy === 'lowest') return a.total - b.total;
    return 0; // 'recent' keeps original array order (mock data is already roughly ordered)
  });

  return (
    <div className="p-4 flex flex-col gap-4 pb-24">
      <div className="pt-1 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Pay & Earnings</h2>
      </div>

      {/* YTD Banner */}
      <div className="bg-black text-white rounded-2xl p-5">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Year to Date</p>
        <p className="text-3xl font-black text-yellow-400">$22,840.30</p>
        <div className="flex gap-4 mt-3 pt-3 border-t border-white/10 text-xs text-gray-400">
          <span>128 trips</span>
          <span>·</span>
          <span>24,180 km</span>
          <span>·</span>
          <span>$480 bonuses earned</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-1">
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-1 flex shadow-sm">
          {['all', 'paid', 'pending'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 text-xs font-bold capitalize py-1.5 rounded-lg transition-all ${filter === f ? 'bg-gray-900 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
            className="h-full bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-700 pl-3 pr-8 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
          >
            <option value="recent">Recent</option>
            <option value="highest">Highest Pay</option>
            <option value="lowest">Lowest Pay</option>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Weekly breakdown */}
      <div className="flex flex-col gap-3">
        {processedWeeks.map((w, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-gray-900 text-sm">{w.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{w.trips} trips · {w.km} km</p>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                w.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {w.status === 'paid' ? `Paid ${w.date}` : 'Pending'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: 'Base', value: `$${w.base.toFixed(2)}` },
                { label: 'Toll', value: `$${w.toll.toFixed(2)}` },
                { label: 'Bonus', value: `$${w.bonus.toFixed(2)}` },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-2 text-center">
                  <p className="text-[10px] text-gray-500 font-semibold">{item.label}</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs text-gray-500">Net payout</p>
              <p className="font-black text-lg text-gray-900">${w.total.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rate card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">My Rate Card</h3>
        <div className="space-y-2 text-sm">
          {[
            ['Base rate', '$0.85/km'],
            ['On-time bonus', '$50/week'],
            ['Overnight allowance', '$45/night'],
            ['Public holiday rate', '2× base'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-gray-500">{k}</span>
              <span className="font-bold text-gray-900">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
