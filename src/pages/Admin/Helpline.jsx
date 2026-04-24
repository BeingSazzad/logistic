import React, { useState } from 'react';
import { 
  HeadphonesIcon, MessageSquare, BookOpen, 
  Send, LifeBuoy, Users, Phone, Mail, ArrowLeft
} from 'lucide-react';

export default function AdminHelpline() {
  const [activeFlow, setActiveFlow] = useState('team'); // 'team' | 'platform'
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  const [teamTickets, setTeamTickets] = useState([
    { id: 'TKT-104', title: 'Driver App Login Issue', status: 'Open', date: 'Today, 08:30 AM', user: 'Mike - Driver' },
    { id: 'TKT-103', title: 'Vehicle Maintenance Request', status: 'In Review', date: 'Yesterday', user: 'Sarah - Fleet' },
  ]);

  const [platformTickets, setPlatformTickets] = useState([
    { id: 'HERO-041', title: 'Monthly Billing Sync Error', status: 'In Review', date: 'Oct 12' },
    { id: 'HERO-032', title: 'Feature Request: Bulk Driver Import', status: 'Solved', date: 'Sep 28' },
  ]);

  const tickets = activeFlow === 'team' ? teamTickets : platformTickets;

  const handleResolve = () => {
    const update = (t) => t.id === selectedTicket.id ? { ...t, status: 'Solved' } : t;
    if (activeFlow === 'team') setTeamTickets(teamTickets.map(update));
    else setPlatformTickets(platformTickets.map(update));
    setSelectedTicket({ ...selectedTicket, status: 'Solved' });
  };

  const handleDelete = () => {
    const filterOut = (t) => t.id !== selectedTicket.id;
    if (activeFlow === 'team') setTeamTickets(teamTickets.filter(filterOut));
    else setPlatformTickets(platformTickets.filter(filterOut));
    setSelectedTicket(null);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-900 shadow-sm">
            <LifeBuoy size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Support</h1>
            <p className="text-sm font-medium text-gray-500 mt-0.5">Manage internal team issues or contact HERO platform support.</p>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-2"></div>

      {/* Tabs */}
      <div className="px-2 border-b border-gray-200 mb-2">
        <div className="flex gap-6">
          <button 
            onClick={() => { setActiveFlow('team'); setSelectedTicket(null); }}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeFlow === 'team' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
          >
            <Users size={16} /> Team Support (Internal)
          </button>
          <button 
            onClick={() => { setActiveFlow('platform'); setSelectedTicket(null); }}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeFlow === 'platform' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
          >
            <HeadphonesIcon size={16} /> HERO Support
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2">
        
        {/* Left: Contact Form / Ticket List / Chat */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-8 flex flex-col h-[600px]">
              
              {selectedTicket ? (
                <>
                  <div className="border-b border-gray-100 pb-4 mb-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setSelectedTicket(null)} className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors">
                        <ArrowLeft size={16} />
                      </button>
                      <div>
                        <h3 className="text-lg font-black text-gray-900">{selectedTicket.title}</h3>
                        <p className="text-xs font-bold text-gray-500">{selectedTicket.id} · {selectedTicket.user || 'HERO Support'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md border ${
                        selectedTicket.status === 'Solved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        selectedTicket.status === 'Open' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {selectedTicket.status}
                      </span>
                      {selectedTicket.status !== 'Solved' ? (
                        <button 
                          onClick={handleResolve} 
                          className="text-xs bg-white border border-gray-200 text-gray-700 font-bold px-3 py-1 rounded-md hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors uppercase tracking-widest"
                        >
                          Resolve
                        </button>
                      ) : (
                        <button 
                          onClick={handleDelete} 
                          className="text-xs bg-white border border-gray-200 text-red-600 font-bold px-3 py-1 rounded-md hover:bg-red-50 hover:border-red-200 transition-colors uppercase tracking-widest"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                    {/* Mock Chat Conversation */}
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 font-bold text-xs uppercase">
                        {selectedTicket.user ? selectedTicket.user[0] : 'H'}
                      </div>
                      <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm p-4 text-sm font-medium text-gray-700 max-w-[85%]">
                        <p>Hi, I am having trouble with the system today. Could you please look into the issue regarding {selectedTicket.title}?</p>
                        <p className="text-xs text-gray-400 mt-2 font-bold">{selectedTicket.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-[#FFCC00] flex items-center justify-center text-black shrink-0 font-black text-xs uppercase">
                        ME
                      </div>
                      <div className="bg-gray-900 text-white rounded-2xl rounded-tr-sm p-4 text-sm font-medium max-w-[85%] shadow-md">
                        <p>Hello! We have received your request and our team is looking into it right now. We will update you shortly.</p>
                        <p className="text-xs text-gray-400 mt-2 font-bold">10 mins ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 shrink-0 flex items-end gap-3">
                    <textarea 
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="input flex-1 min-h-[44px] max-h-[120px] py-3 px-4 resize-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-gray-200 transition-all"
                    />
                    <button className="btn btn-primary h-11 px-6 rounded-xl flex items-center gap-2">
                      <Send size={16} /> Reply
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-black text-gray-900 mb-6 shrink-0">
                    {activeFlow === 'team' ? 'Manage Internal Tickets' : 'Contact HERO Support'}
                  </h3>
                  
                  {activeFlow === 'team' ? (
                    <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                      {/* Internal Tickets View */}
                      {teamTickets.map(t => (
                        <div key={t.id} onClick={() => setSelectedTicket(t)} className="p-5 border border-gray-100 rounded-xl flex items-center justify-between hover:border-gray-900 transition-colors cursor-pointer group">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-black text-white bg-gray-900 px-2 py-0.5 rounded uppercase tracking-widest">{t.id}</span>
                              <span className="text-xs font-bold text-gray-400">{t.date}</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900 group-hover:text-black">{t.title}</p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5"><Users size={12}/> {t.user}</p>
                          </div>
                          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md border ${
                            t.status === 'Open' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                       <div className="flex-1 space-y-5">
                         <div>
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Subject / Issue Area</label>
                            <input 
                              type="text" 
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              placeholder="e.g. Billing discrepancy, API error..." 
                              className="input w-full py-3 px-4 text-sm font-bold bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-900 rounded-xl transition-all" 
                            />
                         </div>
                         <div>
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Detailed Description</label>
                            <textarea 
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Please describe your issue in detail. Include IDs if relevant." 
                              className="input w-full min-h-[160px] py-3 px-4 text-sm font-medium bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-900 rounded-xl transition-all resize-none" 
                            />
                         </div>
                       </div>
                       <div className="pt-6 border-t border-gray-50 flex justify-between items-center gap-6 shrink-0 mt-4">
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">SLA: <span className="text-gray-900">Next Business Day</span></p>
                          <button className="btn btn-primary px-8 rounded-xl flex items-center gap-2">
                             <Send size={16} /> Submit Ticket
                          </button>
                       </div>
                    </div>
                  )}
                </>
              )}
           </div>
        </div>

        {/* Right: History & Info */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden h-[300px] flex flex-col">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 shrink-0">Ticket History</h3>
              <div className="space-y-3 overflow-y-auto pr-2 flex-1">
                 {tickets.map(t => (
                   <div key={t.id} onClick={() => setSelectedTicket(t)} className="p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-1.5">
                         <span className="text-xs font-bold text-gray-400 tracking-tighter">{t.id}</span>
                         <span className="text-xs font-medium text-gray-500">{t.date}</span>
                      </div>
                      <p className="text-xs font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 leading-tight line-clamp-1">{t.title}</p>
                      <span className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                        t.status === 'Solved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                         {t.status}
                      </span>
                   </div>
                 ))}
              </div>
           </div>

           {activeFlow === 'platform' && (
             <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-white border border-gray-700">
                      <HeadphonesIcon size={20} />
                   </div>
                   <div>
                     <h3 className="font-black text-white text-sm">Direct Contact</h3>
                     <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Enterprise Support</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-xl border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                     <Phone size={16} className="text-gray-400" />
                     <div>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Priority Hotline</p>
                       <p className="text-sm font-black text-white">+1 (800) 555-0199</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-xl border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                     <Mail size={16} className="text-gray-400" />
                     <div>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Support</p>
                       <p className="text-sm font-black text-white">support@hero.com</p>
                     </div>
                   </div>
                </div>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}


