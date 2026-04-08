import React, { useState } from 'react';
import { 
  HeadphonesIcon, MessageSquare, BookOpen, 
  Send, LifeBuoy, Zap, ChevronRight, Globe
} from 'lucide-react';

export default function AdminHelpline() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const previousTickets = [
    { id: 'HERO-041', title: 'Monthly Billing Sync Error', status: 'In Review', date: 'Oct 12' },
    { id: 'HERO-032', title: 'Feature Request: Bulk Driver Import', status: 'Solved', date: 'Sep 28' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <div className="p-2 bg-yellow-400 rounded-xl">
                 <LifeBuoy size={20} className="text-black" />
              </div>
              Platform Helpline
           </h1>
           <p className="text-sm text-gray-500 font-medium mt-1">Direct support channel to HERO SaaS headquarters.</p>
        </div>
        <div className="flex gap-2">
           <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[10px] font-black uppercase tracking-widest px-4 shadow-sm">
              <BookOpen size={14} className="mr-2" /> Documentation
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Contact Form */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-8">
              <h3 className="text-lg font-black text-gray-900 mb-6">Create New Support Request</h3>
              <div className="space-y-4">
                 <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Subject / Issue Area</label>
                    <input 
                      type="text" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Billing discrepancy, API integration error..." 
                      className="input w-full py-4 px-6 text-sm font-bold bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-2xl transition-all" 
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Detailed Description</label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your issue in detail. Include IDs if relevant." 
                      className="input w-full min-h-[200px] py-4 px-6 text-sm font-medium bg-gray-50 border-transparent focus:bg-white focus:border-yellow-400 shadow-inner rounded-3xl transition-all resize-none" 
                    />
                 </div>
                 <div className="pt-4 flex justify-end items-center gap-6">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Expected Response Time: <span className="text-yellow-600">&lt; 2 Hours</span></p>
                    <button className="btn bg-[#111] hover:bg-black text-[#FACC15] px-10 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all active:scale-95">
                       <Send size={14} /> Submit Ticket
                    </button>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-violet-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group">
                 <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                    <Zap size={80} />
                 </div>
                 <h4 className="font-black text-lg mb-1">Priority Support</h4>
                 <p className="text-violet-300 text-xs mb-4">Enterprise tier enables 24/7 emergency phone support.</p>
                 <button className="text-xs font-black text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all border border-white/5">
                    View Phone Number
                 </button>
              </div>
              <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group">
                 <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                    <Globe size={80} />
                 </div>
                 <h4 className="font-black text-lg mb-1">Community Hub</h4>
                 <p className="text-gray-400 text-xs mb-4">Chat with other logistics owners about best practices.</p>
                 <button className="text-xs font-black text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all border border-white/5">
                    Join Slack Community
                 </button>
              </div>
           </div>
        </div>

        {/* Right: History & Info */}
        <div className="space-y-6">
           <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Previous HERO Requests</h3>
              <div className="space-y-2">
                 {previousTickets.map(t => (
                   <div key={t.id} className="p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-1">
                         <span className="text-[10px] font-bold text-gray-400 tracking-tighter">{t.id}</span>
                         <span className="text-[10px] font-bold text-gray-400">{t.date}</span>
                      </div>
                      <p className="text-xs font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 leading-tight">{t.title}</p>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${t.status === 'Solved' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}>
                         {t.status}
                      </span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-yellow-500 border border-gray-100">
                    <HeadphonesIcon size={20} />
                 </div>
                 <h3 className="font-black text-gray-900 text-sm">Need direct help?</h3>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
                 Your HERO success manager is available Mon–Fri, 9am–5pm AEST for deep-dive operational consultations.
              </p>
              <div className="space-y-3">
                 <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-gray-400">Response Rate</span>
                    <span className="text-emerald-600 font-black">98.4%</span>
                 </div>
                 <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[98%]"></div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
