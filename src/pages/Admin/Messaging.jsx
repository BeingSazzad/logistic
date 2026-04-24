import React, { useState } from 'react';
import { 
  Search, MessageCircle, AlertCircle, CheckCircle2, 
  Send, User, Terminal, Plus, ShieldAlert, Phone, MoreVertical
} from 'lucide-react';

const internalTickets = [
  { id: 'TKT-701', user: 'Jack Taylor', role: 'Driver', issue: 'App crashing on route sync', priority: 'High', status: 'Open', time: '12 mins ago' },
  { id: 'TKT-702', user: 'Sarah Mitchell', role: 'Dispatch', issue: 'Need vehicle re-assignment permission', priority: 'Medium', status: 'Open', time: '2 hrs ago' },
  { id: 'TKT-699', user: 'Noah Williams', role: 'Driver', issue: 'License verification stalled', priority: 'High', status: 'Resolved', time: '1 day ago' },
];

export default function AdminMessaging() {
  const [selectedTicket, setSelectedTicket] = useState(internalTickets[0]);
  const [replyText, setReplyText] = useState('');
  const [tickets, setTickets] = useState(internalTickets);
  const [solvedToast, setSolvedToast] = useState(false);
  const [sentToast, setSentToast] = useState(false);

  const handleMarkSolved = () => {
    setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: 'Resolved' } : t));
    setSelectedTicket(prev => ({ ...prev, status: 'Resolved' }));
    setSolvedToast(true);
    setTimeout(() => setSolvedToast(false), 2500);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setReplyText('');
    setSentToast(true);
    setTimeout(() => setSentToast(false), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-[1440px] mx-auto space-y-4">
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Company Help Desk</h1>
           <p className="text-sm text-gray-500 font-medium">Internal support management for drivers and dispatchers.</p>
        </div>
        <button className="btn btn-primary px-6 py-2.5 text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
           <Plus size={14} /> New Manual Ticket
        </button>
      </div>

      {solvedToast && (
        <div className="fixed top-24 right-8 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 border border-emerald-700">
           <CheckCircle2 size={18} /> <p className="text-sm font-black uppercase tracking-widest">Ticket Marked Resolved</p>
        </div>
      )}
      {sentToast && (
        <div className="fixed top-24 right-8 bg-[#111] text-[#FFCC00] px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 border border-white/10">
           <Send size={18} /> <p className="text-sm font-black uppercase tracking-widest">Reply Sent</p>
        </div>
      )}

      {/* ── Main Layout ── */}
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex min-h-0">
        
        {/* Left: Ticket Sidebar */}
        <div className="w-[360px] border-r border-gray-50 flex flex-col shrink-0 bg-gray-50/20">
           <div className="p-6 border-b border-gray-100 bg-white">
              <div className="relative">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input type="text" placeholder="Search team member or status..." className="input pl-9 text-xs py-3" />
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {tickets.map(t => (
                <div 
                  key={t.id} 
                  onClick={() => setSelectedTicket(t)}
                  className={`p-6 cursor-pointer transition-all hover:bg-white relative ${selectedTicket?.id === t.id ? 'bg-white shadow-[inset_4px_0_0_0_#FACC15]' : ''}`}
                >
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-gray-400 font-black uppercase tracking-widest">{t.id}</span>
                      <span className="text-xs text-gray-400 font-bold">{t.time}</span>
                   </div>
                   <h4 className="text-sm font-bold text-gray-900 mb-1 leading-tight">{t.issue}</h4>
                   <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                         <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">{t.user[0]}</div>
                         <span className="text-xs font-bold text-gray-500">{t.user}</span>
                      </div>
                      <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                      <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-full ${t.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`}>{t.priority}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right: Conversation */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
           {/* Detail Header */}
           <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 ${selectedTicket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {selectedTicket.status === 'Resolved' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                 </div>
                 <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{selectedTicket.issue}</h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{selectedTicket.user} • {selectedTicket.role}</p>
                 </div>
              </div>
              <div className="flex gap-2">
                 <button className="p-2.5 border border-gray-100 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors"><Phone size={18} /></button>
                 <button onClick={handleMarkSolved} disabled={selectedTicket.status === 'Resolved'} className="btn btn-dark text-xs font-black uppercase tracking-widest px-6 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">Mark Solved</button>
              </div>
           </div>

           {/* Messages History */}
           <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-gray-50/10">
              
              <div className="flex flex-col gap-2 max-w-[80%] items-start">
                 <div className="bg-gray-100 text-gray-800 p-5 rounded-3xl rounded-tl-none border border-gray-200 text-sm leading-relaxed font-medium">
                    {selectedTicket.issue}. This is preventing me from finishing the delivery sync for JOB-2048. Is there a known issue with the Sydney Metro server?
                 </div>
                 <span className="text-xs text-gray-400 font-bold px-2">{selectedTicket.user} • 10:45 AM</span>
              </div>

              <div className="flex flex-col gap-2 self-end max-w-[80%] items-end">
                 <div className="bg-[#111] text-white p-5 rounded-3xl rounded-tr-none shadow-xl text-sm leading-relaxed">
                    Hey {selectedTicket.user.split(' ')[0]}, I've just checked the status page. There was a minor blip in the API gateway. I've force-synced your session from here. Please try again now.
                 </div>
                 <span className="text-xs text-gray-400 font-bold flex items-center gap-1 px-2">Sent By Michael (Admin) <CheckCircle2 size={10} className="text-emerald-500" /></span>
              </div>

              <div className="text-center my-4">
                 <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-300">New message below</span>
              </div>
           </div>

           {/* Input Section */}
           <div className="p-6 border-t border-gray-50 bg-white shrink-0">
              <div className="relative">
                 <textarea 
                   value={replyText}
                   onChange={(e) => setReplyText(e.target.value)}
                   placeholder={`Message ${selectedTicket.user}...`} 
                   className="input w-full min-h-[100px] resize-none pb-14 text-sm font-medium focus:bg-white focus:border-yellow-400 shadow-inner rounded-3xl"
                 />
                 <div className="absolute bottom-4 right-4 flex gap-3">
                    <button onClick={handleSendReply} className="bg-[#111] hover:bg-black text-[#FACC15] px-6 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all active:scale-95">
                       <Send size={14} /> Send Reply
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

