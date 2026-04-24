import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Clock, Box, ShieldCheck, 
  Phone, User, ChevronRight, Navigation,
  AlertTriangle, CheckCircle2, MoreVertical
} from 'lucide-react';

const JOB_DATA = {
  'J-2026-1260': {
    id: 'J-2026-1260',
    status: 'In Progress',
    customer: 'Woolworths',
    consignor: {
      name: 'Woolworths Distribution',
      address: '320 Pitt St, Sydney NSW 2000',
      contact: 'Michael Chen',
      phone: '+61 2 9234 5678'
    },
    consignee: {
      name: 'Woolworths Melbourne',
      address: '700 Bourke St, Docklands VIC 3008',
      contact: 'Sarah Wilson',
      phone: '+61 3 8675 4321'
    },
    cargo: {
      description: 'Perishable Grocery Items (Chilled)',
      weight: '850kg',
      items: '3 Pallets',
      handling: 'Fragile · Keep Chilled'
    },
    schedule: {
      pickup: 'Today, 08:00',
      delivery: 'Today, 17:30',
      eta: '17:15'
    },
    earnings: '$796.30',
    currentLegIndex: 2,
    stages: [
      { name: 'Pickup', from: 'Customer', to: 'Sydney Depot', status: 'Completed', time: '08:30' },
      { name: 'Transfer', from: 'Sydney Depot', to: 'Sydney Depot', status: 'Completed', time: '10:45' },
      { name: 'Line-haul', from: 'Sydney Depot', to: 'Melbourne Depot', status: 'Active', time: 'In Transit' },
      { name: 'Transfer', from: 'Melbourne Depot', to: 'Melbourne Depot', status: 'Pending', time: '-' },
      { name: 'Delivery', from: 'Melbourne Depot', to: 'Customer', status: 'Pending', time: '-' }
    ]
  },
  'J-2026-1247': {
    id: 'J-2026-1247',
    status: 'Completed',
    customer: 'Coles',
    consignor: {
      name: 'Coles Logistics Depot',
      address: 'Melbourne VIC',
      contact: 'John Smith',
      phone: '+61 3 9876 5432'
    },
    consignee: {
      name: 'Coles Adelaide',
      address: 'Adelaide SA',
      contact: 'Jane Doe',
      phone: '+61 8 7654 3210'
    },
    cargo: {
      description: 'Dry Grocery Stock',
      weight: '1,200kg',
      items: '6 Pallets',
      handling: 'Standard'
    },
    schedule: {
      pickup: 'Yesterday, 06:00',
      delivery: 'Yesterday, 14:00',
      eta: 'Completed'
    },
    earnings: '$620.50'
  }
};

const STATUS_VARIANTS = {
  'In Progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Completed': 'bg-green-100 text-green-700 border-green-200',
  'Assigned': 'bg-blue-100 text-blue-700 border-blue-200',
  'Issue': 'bg-red-100 text-red-700 border-red-200'
};

export default function DriverJobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Fallback to first job if ID not found in mock data
  const job = JOB_DATA[id] || JOB_DATA['J-2026-1260'];

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-24">
      {/* Premium Header */}
      <div className="bg-white px-5 py-4 border-b border-gray-100 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/driver/loads')}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-none">{job.id}</h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1.5">{job.customer}</p>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 text-gray-400">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Chip */}
        <div className="flex">
          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${STATUS_VARIANTS[job.status]}`}>
            {job.status}
          </span>
        </div>

        {/* Route Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-8 relative">
            <div className="absolute left-1.5 top-3 bottom-3 w-0.5 bg-gray-100"></div>
            
            {/* Pickup */}
            <div className="flex gap-6 relative">
              <div className="w-4 h-4 rounded-full bg-white border-2 border-yellow-400 z-10 shrink-0 mt-1"></div>
              <div className="flex-1">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Pickup Point</p>
                <h3 className="font-bold text-gray-900 text-sm">{job.consignor.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{job.consignor.address}</p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                   <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                      <User size={12} className="text-gray-400" /> {job.consignor.contact}
                   </div>
                   <button className="flex items-center gap-1.5 text-xs font-bold text-yellow-600">
                      <Phone size={12} /> Call
                   </button>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="flex gap-6 relative">
              <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-white shadow-sm z-10 shrink-0 mt-1"></div>
              <div className="flex-1">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Delivery Point</p>
                <h3 className="font-bold text-gray-900 text-sm">{job.consignee.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{job.consignee.address}</p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                   <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                      <User size={12} className="text-gray-400" /> {job.consignee.contact}
                   </div>
                   <button className="flex items-center gap-1.5 text-xs font-bold text-yellow-600">
                      <Phone size={12} /> Call
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cargo Detail Card */}
        <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl shadow-gray-200">
           <div className="flex items-center gap-2 mb-4">
              <Box size={16} className="text-yellow-400" />
              <h3 className="text-xs font-black uppercase tracking-widest">Cargo Specification</h3>
           </div>
           <p className="text-sm font-bold text-gray-100 leading-relaxed mb-6">{job.cargo.description}</p>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                 <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Total Weight</p>
                 <p className="text-lg font-bold">{job.cargo.weight}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                 <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Quantity</p>
                 <p className="text-lg font-bold">{job.cargo.items}</p>
              </div>
           </div>

           <div className="mt-4 flex items-center gap-2 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
              <AlertTriangle size={14} className="text-yellow-400 shrink-0" />
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest">{job.cargo.handling}</p>
           </div>
        </div>

        {/* Network Stage Tracker */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
           <div className="flex items-center gap-2 mb-6">
              <ShieldCheck size={16} className="text-emerald-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Parcel Network Progression</h3>
           </div>
           <div className="space-y-4">
              {job.stages.map((stage, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                   stage.status === 'Active' ? 'bg-yellow-50 border-yellow-200' :
                   stage.status === 'Completed' ? 'bg-emerald-50/30 border-emerald-100 opacity-60' :
                   'bg-gray-50 border-gray-100 opacity-40'
                }`}>
                   <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                         stage.status === 'Active' ? 'bg-yellow-400 text-black shadow-lg animate-pulse' :
                         stage.status === 'Completed' ? 'bg-emerald-500 text-white' :
                         'bg-gray-200 text-gray-400'
                      }`}>
                         {i + 1}
                      </div>
                      <div>
                         <p className="text-xs font-black text-gray-900 leading-none">{stage.name}</p>
                         <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-tight">{stage.from} → {stage.to}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={`text-xs font-black uppercase tracking-widest ${stage.status === 'Active' ? 'text-yellow-700' : 'text-gray-400'}`}>
                         {stage.status}
                      </p>
                      {stage.time !== '-' && <p className="text-xs font-bold text-gray-400 mt-0.5">{stage.time}</p>}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Action Button */}
        {job.status === 'In Progress' ? (
           <button 
             onClick={() => navigate('/driver/active')}
             className="btn-cta bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg shadow-yellow-100"
           >
              <Navigation size={18} /> Continue Trip
           </button>
        ) : job.status === 'Completed' ? (
           <button 
             className="btn-cta bg-gray-100 text-gray-400 cursor-not-allowed"
             disabled
           >
              <ShieldCheck size={18} /> Proof of Delivery Uploaded
           </button>
        ) : (
          <button 
            onClick={() => navigate('/driver/active')}
            className="btn-cta bg-gray-900 hover:bg-black text-yellow-400 shadow-lg shadow-gray-200"
          >
             <CheckCircle2 size={18} /> Start Trip
          </button>
        )}

      </div>
    </div>
  );
}

