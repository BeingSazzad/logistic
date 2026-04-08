import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Phone, Clock, Package, CheckCircle } from 'lucide-react';

export default function DriverHome() {
  const navigate = useNavigate();
  const upcoming = [
    { id: 'JOB-20502', area: 'Parramatta, NSW', time: '11:45 AM', items: 3 },
    { id: 'JOB-20503', area: 'Chatswood, NSW',  time: '1:15 PM',  items: 7 },
  ];

  return (
    <div className="p-4 flex flex-col gap-4">

      {/* Day summary */}
      <div className="flex justify-between items-center pt-1">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Today's Route</h2>
          <p className="text-xs text-gray-400 mt-0.5">Monday, 7 April 2026</p>
        </div>
        <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full">12 Jobs Left</span>
      </div>

      {/* Current Job Hero Card */}
      <div className="bg-black rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full blur-xl" />

        <div className="p-5 border-b border-white/5 flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse inline-block" />
              <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest">Next Stop</span>
            </div>
            <p className="text-white font-bold text-lg leading-none">Acme Corp</p>
            <p className="text-gray-500 text-xs font-mono mt-1">JOB-20481</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-[10px] font-semibold uppercase">ETA</p>
            <p className="text-yellow-400 font-bold text-xl leading-none mt-0.5">10:30</p>
            <p className="text-gray-500 text-[10px]">AM</p>
          </div>
        </div>

        <div className="p-5 relative z-10 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-gray-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-gray-300 text-sm leading-snug">14 George St, Sydney NSW 2000</p>
              <p className="text-gray-600 text-xs mt-0.5">2.4 km away</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5">
            <Package size={15} className="text-yellow-400" />
            <span className="text-gray-300 text-sm font-medium">4 assigned units</span>
          </div>

          <div className="flex gap-3 mt-1">
            <button 
              onClick={() => navigate('/driver/safety-check')}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95">
              <Navigation size={17} />
              Start Trip
            </button>
            <button className="w-14 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center justify-center transition">
              <Phone size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3">Up Next</h3>
        <div className="flex flex-col gap-2.5">
          {upcoming.map((job, i) => (
            <div key={job.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm shrink-0">
                  {i + 2}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{job.area}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                    <Clock size={11} />
                    <span>{job.time}</span>
                    <span>·</span>
                    <Package size={11} />
                    <span>{job.items} items</span>
                  </div>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                <path d="M9 18L15 12L9 6" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Completed */}
      <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
        <CheckCircle size={15} className="text-green-500" />
        <span className="font-medium">4 deliveries completed today</span>
      </div>
    </div>
  );
}
