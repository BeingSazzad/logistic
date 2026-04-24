import React from 'react';
import { 
  Package, MapPin, ChevronRight, Clock, 
  CheckCircle2, Truck, AlertTriangle, Search,
  Navigation, Zap, ArrowRight, Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const Loads = [
    { id: 'SHP-9042', origin: 'Sydney Terminal', dest: 'Melbourne Depot', status: 'In Transit', eta: '5:30 PM', progress: 65, alert: false, type: 'Freight' },
    { id: 'SHP-9048', origin: 'Melbourne WH-B', dest: 'Adelaide Port', status: 'At Pickup', eta: '9:00 AM', progress: 15, alert: false, type: 'LTL' },
    { id: 'SHP-9031', origin: 'Brisbane Depot', dest: 'Sydney Terminal', status: 'Delayed +45m', eta: '7:15 PM', progress: 45, alert: true, type: 'Express' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto pb-12">
      
      {/* ── 1. Brand & Account Header ── */}
      <div className="bg-hero-dark rounded-hero-lg p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute right-0 top-0 w-80 h-80 bg-brand opacity-5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
               <p className="text-brand hero-metadata tracking-[0.3em] mb-3">Certified Partner Dashboard</p>
               <h1 className="text-4xl font-bold tracking-tighter">Acme Distribution Group</h1>
               <div className="flex items-center gap-4 mt-6">
                  <div className="flex -space-x-2">
                     {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-hero-dark bg-gray-800"></div>)}
                  </div>
                  <p className="hero-body text-gray-400">Manage 14 team members • Level 4 Tier</p>
               </div>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 backdrop-blur-md p-4 rounded-hero-md border border-white/10 shadow-inner">
                     <span className="hero-metadata text-gray-500 block mb-1">Active Loads</span>
                     <span className="text-2xl font-black text-brand">03</span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-4 rounded-hero-md border border-white/10 shadow-inner">
                     <span className="hero-metadata text-gray-500 block mb-1">Monthly Volume</span>
                     <span className="text-2xl font-black text-white">412</span>
                  </div>
               </div>
               <button onClick={() => navigate('/customer/tracking')} className="btn bg-brand hover:bg-brand-hover text-hero-dark py-4 px-8 rounded-hero-md font-black shadow-lg shadow-brand/20">
                  <Navigation size={16}/> Live Fleet HUD
               </button>
            </div>
         </div>
      </div>

      {/* ── 2. Real-time Tracking Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Live Load List */}
         <div className="lg:col-span-2 space-y-5">
            <div className="flex justify-between items-end px-2">
               <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Active Logistics Flow</h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time status updates from fleet</p>
               </div>
               <button className="text-xs font-black text-yellow-600 uppercase tracking-widest hover:underline flex items-center gap-1">Full Tracking View <ArrowRight size={14}/></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               {Loads.map(s => (
                  <div key={s.id} onClick={() => navigate('/customer/tracking')} className={`bg-white rounded-[2rem] border p-6 flex flex-col gap-6 hover:shadow-2xl transition-all cursor-pointer group active:scale-[0.98] ${s.alert ? 'border-red-100 bg-red-50/10' : 'border-gray-50'}`}>
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                           <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-sm ${s.alert ? 'bg-red-50 text-red-500 border-red-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                              <Truck size={18} />
                           </div>
                           <div>
                              <p className="font-black text-gray-900 text-sm tracking-tight">{s.id}</p>
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{s.type}</span>
                           </div>
                        </div>
                        <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border ${s.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : s.alert ? 'bg-red-50 text-red-500 border-red-200 animate-pulse' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                           {s.status}
                        </span>
                     </div>

                     <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                           <p className="text-xs font-bold text-gray-700 truncate">{s.origin}</p>
                        </div>
                        <div className="w-px h-3 bg-gray-100 ml-[0.25rem]"></div>
                        <div className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-sm"></div>
                           <p className="text-xs font-bold text-gray-900 truncate">{s.dest}</p>
                        </div>
                     </div>

                     <div className="mt-auto">
                        <div className="flex justify-between items-end mb-2">
                           <span className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-1.5"><Clock size={12}/> Progress</span>
                           <span className="text-xs font-black text-gray-900 tracking-widest">ETA: {s.eta}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                           <div className={`h-full transition-all duration-1000 ${s.alert ? 'bg-red-500' : 'bg-[#FACC15]'}`} style={{ width: `${s.progress}%` }}></div>
                        </div>
                     </div>
                  </div>
               ))}
               
               {/* Add New Quick Card */}
               <div className="bg-gray-50 border border-dashed border-gray-200 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-300 group-hover:text-yellow-500 group-hover:scale-110 transition-all shadow-sm">
                     <Zap size={24}/>
                  </div>
                  <div>
                     <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Need another load?</p>
                     <p className="text-xs font-bold text-gray-400 uppercase mt-1">Instant Manifest Creation</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar: Financial & Support */}
         <div className="space-y-8">
            
            {/* Payment Prompt */}
            <div className="bg-white rounded-[2.5rem] border border-red-100 p-8 shadow-xl shadow-red-500/5 flex flex-col gap-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                  <AlertTriangle className="text-red-500 opacity-20" size={48} />
               </div>
               <div>
                  <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                     <Wallet size={14}/> Outstanding Balance
                  </h3>
                  <p className="text-4xl font-black text-gray-900 tracking-tighter">$4,887.50</p>
                  <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Across 3 Unpaid Invoices</p>
               </div>
               <button onClick={() => navigate('/customer/invoices')} className="w-full bg-[#111] hover:bg-black text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3">
                  Resolve Now <ArrowRight size={14}/>
               </button>
            </div>

            {/* Quick Support */}
            <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Concierge Support</h3>
               <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                     <div className="w-10 h-10 rounded-2xl bg-blue-500 flex items-center justify-center text-white shrink-0">
                        <CheckCircle2 size={20}/>
                     </div>
                     <div>
                        <p className="text-xs font-black text-gray-900 uppercase">Live Assistance</p>
                        <p className="text-xs font-bold text-gray-400 uppercase">Average response: 2m</p>
                     </div>
                  </div>
                  <button className="w-full py-3.5 text-xs font-black text-gray-900 uppercase tracking-widest border-2 border-gray-200 rounded-2xl hover:bg-white transition-all">Open Helpline</button>
               </div>
            </div>

         </div>

      </div>

    </div>
  );
}

