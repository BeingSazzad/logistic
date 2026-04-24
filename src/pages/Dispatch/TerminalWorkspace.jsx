import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scan, Package, Truck, ArrowRight, CheckCircle2, 
  AlertCircle, Search, MapPin, Box, ChevronRight,
  TrendingUp, Clock, Info
} from 'lucide-react';

const MOCK_INBOUND = [
  { id: 'SHP-9041', destination: 'Sydney Local', type: 'Local', origin: 'Brisbane Depot', status: 'Arrived', weight: '12kg' },
  { id: 'SHP-9042', destination: 'Melbourne Depot', type: 'Depot Transfer', origin: 'Sydney Depot', status: 'In Transit', weight: '450kg' },
  { id: 'SHP-9043', destination: 'Sydney Local', type: 'Local', origin: 'Perth Depot', status: 'Arrived', weight: '5kg' },
  { id: 'SHP-9044', destination: 'Brisbane Depot', type: 'Depot Transfer', origin: 'Sydney Depot', status: 'In Transit', weight: '22kg' },
];

export default function TerminalWorkspace() {
  const navigate = useNavigate();
  const [scanInput, setScanInput] = useState('');
  const [lastScanned, setLastScanned] = useState(null);
  const [sortList, setSortList] = useState([]);

  const handleScan = (e) => {
    e.preventDefault();
    const item = MOCK_INBOUND.find(i => i.id === scanInput);
    if (item) {
      setLastScanned(item);
      setSortList([item, ...sortList.slice(0, 4)]);
      setScanInput('');
    } else {
      alert('Invalid Scan: Package not found in Network Manifest');
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto pb-20 px-4">
      
      {/* Terminal Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-hero-sm text-hero-dark shadow-sm">
            <Box size={20} />
          </div>
          <div>
            <h1 className="hero-h1">Terminal Sortation</h1>
            <p className="hero-body mt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-hero-success animate-pulse"></span> Sydney Depot Node 01 • Active Inbound
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="card p-3 flex items-center gap-4 border border-hero-success/20 bg-hero-success/10">
              <div className="text-right">
                 <p className="hero-metadata !text-hero-success">Efficiency</p>
                 <p className="text-lg font-semibold tracking-tight text-hero-success">98.4%</p>
              </div>
              <TrendingUp className="text-hero-success" />
           </div>
        </div>
      </div>

      {/* Demo Context / Explanation Card */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6 flex gap-4 text-blue-900 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
        <Info className="shrink-0 mt-0.5 text-blue-500" size={20} />
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-1">What is this Workspace?</h3>
          <p className="text-xs font-medium leading-relaxed opacity-90">
            This module is used by Warehouse Staff when large line-haul trucks arrive at a Terminal. Workers scan every incoming box. The "Smart Sorter" instantly checks the <strong>Full Network Manifest</strong> (the master list of all cross-country jobs) to decide if the box should go out on a <strong>Local Delivery Van</strong> or be loaded onto another <strong>Line-haul Truck</strong> for the next Depot.
          </p>
          <p className="text-xs font-bold mt-2 text-blue-700 bg-blue-100/50 inline-block px-2 py-1 rounded">
            💡 Try scanning: <span className="font-semibold">SHP-9041</span> or <span className="font-semibold">SHP-9042</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SCANNER INTERFACE (Central Action) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Scan Input */}
          <div className="card p-8">
             <div className="relative z-10">
                <h2 className="hero-metadata mb-6">Scan & Redirection Input</h2>
                <form onSubmit={handleScan} className="relative">
                   <Scan className="absolute left-6 top-1/2 -translate-y-1/2 text-hero-primary" size={24} />
                   <input 
                     autoFocus
                     type="text"
                     value={scanInput}
                     onChange={(e) => setScanInput(e.target.value.toUpperCase())}
                     placeholder="Enter / Scan Load ID..."
                     className="w-full bg-gray-50 border border-gray-200 focus:border-hero-primary focus:bg-white rounded-hero-md py-5 pl-16 pr-6 text-xl font-bold tracking-tight text-hero-dark transition-all outline-none"
                   />
                </form>
                <div className="mt-4 flex items-center gap-4">
                   <p className="hero-metadata flex items-center gap-2">
                      <Clock size={14}/> Auto-dispatch on Scan Active
                   </p>
                   <div className="flex-1 h-px bg-gray-100"></div>
                   <button className="text-xs font-bold text-hero-primary uppercase tracking-widest hover:underline">Batch Scan Mode</button>
                </div>
             </div>
          </div>

          {/* Last Scanned Logic (The Sorter Decision) */}
          {lastScanned && (
            <div className={`card p-6 flex flex-col md:flex-row items-center gap-6 ${
               lastScanned.type === 'Local' ? 'bg-hero-success/5 border-hero-success/20' : 'bg-blue-50 border-blue-200'
            }`}>
               <div className={`w-16 h-16 rounded-hero-sm flex items-center justify-center text-white shrink-0 ${
                  lastScanned.type === 'Local' ? 'bg-hero-success' : 'bg-blue-600'
               }`}>
                  {lastScanned.type === 'Local' ? <CheckCircle2 size={32} /> : <Truck size={32} />}
               </div>
               
               <div className="flex-1 text-center md:text-left">
                  <p className={`hero-metadata mb-1 ${
                     lastScanned.type === 'Local' ? '!text-hero-success' : '!text-blue-700'
                  }`}>Network Redirection Decision</p>
                  <h3 className="text-xl font-bold text-hero-dark tracking-tight">{lastScanned.destination}</h3>
                  <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                     <span className="badge badge-gray">{lastScanned.type}</span>
                     <span className="badge badge-gray">{lastScanned.weight}</span>
                  </div>
               </div>

               <div className="shrink-0 bg-white p-4 rounded-hero-sm border border-gray-200 text-center min-w-[140px]">
                  <p className="hero-metadata mb-1">Staging Area</p>
                  <p className="text-sm font-bold text-hero-dark uppercase">Section {lastScanned.type === 'Local' ? 'A-1' : 'B-9'}</p>
                  <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full bg-hero-success w-full animate-in slide-in-from-left duration-1000"></div>
                  </div>
               </div>
            </div>
          )}

          {/* Activity Log */}
          <div className="card overflow-hidden">
             <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h3 className="hero-metadata flex items-center gap-2">
                   <Clock size={16} className="text-hero-primary"/> Recent Sorting Entries
                </h3>
             </div>
             <div className="divide-y divide-gray-100">
                {sortList.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/dispatch/loads/${item.id}`)}>
                     <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-hero-sm flex items-center justify-center ${item.type === 'Local' ? 'bg-hero-success/10 text-hero-success' : 'bg-blue-50 text-blue-600'}`}>
                           {item.type === 'Local' ? <MapPin size={16} /> : <ArrowRight size={16} />}
                        </div>
                        <div>
                           <p className="text-sm font-bold text-hero-dark">{item.id}</p>
                           <p className="hero-metadata">{item.origin} → {item.destination}</p>
                        </div>
                     </div>
                     <span className="badge bg-hero-success/10 text-hero-success border-hero-success/20">Redirect Success</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* SIDEBAR: INBOUND MANIFEST */}
        <div className="space-y-6">
           <div className="card p-6 bg-hero-dark text-white border-none relative overflow-hidden">
              <h3 className="hero-metadata !text-hero-primary mb-4 border-b border-white/10 pb-4">Awaiting Arrival</h3>
              
              <div className="space-y-4">
                 {MOCK_INBOUND.filter(i => i.status === 'In Transit').map(item => (
                   <div key={item.id} className="flex items-center justify-between group cursor-pointer" onClick={() => navigate(`/dispatch/loads/${item.id}`)}>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-hero-sm bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-hero-primary transition-all">
                            <Truck size={14} />
                         </div>
                         <div>
                            <p className="text-sm font-bold group-hover:text-white">{item.id}</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">{item.origin}</p>
                         </div>
                      </div>
                      <ChevronRight size={14} className="text-gray-500 group-hover:text-hero-primary" />
                   </div>
                 ))}
              </div>

              <button 
                 onClick={() => navigate('/dispatch/loads')}
                 className="w-full mt-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-hero-sm text-xs font-bold uppercase tracking-widest transition-all"
              >
                 View Full Manifest
              </button>
           </div>

           <div className="card p-6 bg-hero-warning/10 border border-hero-warning/20">
              <div className="flex items-center gap-2 text-hero-warning mb-2">
                 <AlertCircle size={18} />
                 <h4 className="hero-metadata !text-hero-warning">Sorting Protocol</h4>
              </div>
              <p className="text-xs font-medium text-hero-dark/70 leading-relaxed">
                 Ensure every scan is cross-referenced with the digital manifest (the master list of active network Loads). Unrecognized items must be quarantined immediately to Section X.
              </p>
           </div>
        </div>

      </div>

    </div>
  );
}

