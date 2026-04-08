import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, AlertTriangle, Navigation, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ActiveTrip() {
  const navigate = useNavigate();
  const [arrived, setArrived] = useState(false);
  const [completed, setCompleted] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-black p-4 flex items-center justify-between text-white drop-shadow-xl z-10 sticky top-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-green-400">Active</span>
          </div>
          <h1 className="text-lg font-bold">Trip #J-2026-1260</h1>
        </div>
        <button className="bg-red-500/20 text-red-500 p-2 rounded-full">
          <AlertTriangle size={20} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Next Stop Card */}
        {!completed ? (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Next Stop: Pickup #1</h2>
            
            <p className="font-bold text-lg text-gray-900 leading-tight">127 York St, Sydney</p>
            <p className="text-sm text-gray-500 mt-1">Contact: John Smith</p>
            
            <div className="grid grid-cols-3 gap-2 mt-4 mb-5">
              <div className="bg-gray-50 rounded-xl p-2 text-center">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">Dist</p>
                <p className="font-bold text-gray-900 mt-0.5">8.4 km</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2 text-center">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">ETA</p>
                <p className="font-bold text-yellow-500 mt-0.5">07:35</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2 text-center">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">Win</p>
                <p className="font-bold text-gray-900 mt-0.5">08-12</p>
              </div>
            </div>

            {!arrived ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => setArrived(true)}
                  className="flex-1 bg-black text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <Navigation size={18} /> Confirm Arrival
                </button>
                <button className="w-14 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center">
                  <Phone size={18} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="bg-green-50 text-green-700 p-3 rounded-xl flex items-start gap-2 border border-green-100">
                  <CheckCircle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Arrived at Location</p>
                    <p className="text-xs mt-0.5">Wait time timer started</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCompleted(true)}
                  className="w-full bg-yellow-400 text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
                  Proceed to Loading
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Pickup Complete!</h2>
            <p className="text-sm text-gray-500 mt-2 mb-6">Photos and signature saved.</p>
            <button 
              onClick={() => navigate('/driver')}
              className="w-full bg-black text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
              Return Home
            </button>
          </div>
        )}

        {/* HOS Display */}
        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Hours of Service</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-black">0h 12m</p>
              <p className="text-xs text-slate-400 mt-1">Driven today</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-yellow-400">11h 48m</p>
              <p className="text-xs text-slate-400 mt-1">Remaining</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-sm">
            <span className="text-slate-400">Next break in:</span>
            <span className="font-medium">5h 18m</span>
          </div>
        </div>

        {/* Trip Progress Visual */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Trip Progress</h3>
           <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
             
             <div className="relative">
               <div className="absolute -left-[21px] top-0 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-sm" />
               <p className="text-sm font-bold text-gray-900 leading-none">Safety Check</p>
               <p className="text-xs text-gray-500 mt-1">Completed 07:15</p>
             </div>

             <div className="relative">
               <div className={`absolute -left-[21px] top-0 w-4 h-4 rounded-full border-4 shadow-sm ${completed ? 'bg-green-500 border-white' : 'bg-yellow-400 border-yellow-100 animate-pulse'}`} />
               <p className={`text-sm font-bold leading-none ${completed ? 'text-gray-900' : 'text-yellow-600'}`}>Pickup #1</p>
               <p className="text-xs text-gray-500 mt-1">127 York St, Sydney</p>
             </div>

             <div className="relative">
               <div className="absolute -left-[21px] top-0 w-4 h-4 bg-gray-200 rounded-full border-4 border-white shadow-sm" />
               <p className="text-sm font-bold text-gray-400 leading-none">Delivery</p>
               <p className="text-xs text-gray-400 mt-1">Melbourne VIC</p>
             </div>

           </div>
        </div>

      </div>
    </div>
  );
}
