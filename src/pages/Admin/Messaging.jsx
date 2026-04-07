import React from 'react';
import { Search, Filter, MessageSquare, Phone, MoreVertical, Send, ShieldAlert, User } from 'lucide-react';

export default function AdminMessaging() {
  const conversations = [
    { id: 'CHAT-01', user: 'Jack Taylor',  role: 'Driver', context: 'JOB-20481', msg: 'Almost there, but traffic is heavy near the harbour bridge.', status: 'Active' },
    { id: 'CHAT-02', user: 'Sarah Mitchell', role: 'Dispatch', context: 'Global Hub', msg: 'Can we re-assign TRL-44 for tomorrow?', status: 'Active' },
    { id: 'CHAT-03', user: 'Noah Williams', role: 'Driver', context: 'Compliance', msg: 'My license verification is still pending.', status: 'Alert' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-sans">
      <div className="flex h-full">
        
        {/* Left Col: Master Inbox List */}
        <div className="w-[380px] bg-gray-50/50 border-r border-gray-100 flex flex-col shrink-0">
          <div className="p-6 border-b border-gray-200 shrink-0 bg-white shadow-sm z-10">
             <h2 className="text-xl font-bold text-gray-900 mb-4">Global Inbox Oversight</h2>
             <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" placeholder="Search across all chats..." className="input pl-9" />
             </div>
             <div className="flex gap-2">
                <button className="flex-1 btn btn-dark text-[10px] py-1.5 uppercase font-bold tracking-widest">Active Trades</button>
                <button className="flex-1 btn  text-[10px] py-1.5 bg-gray-100 text-gray-500 uppercase font-bold tracking-widest hover:bg-gray-200">Alerts Only</button>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
             {conversations.map(chat => (
               <div key={chat.id} className="p-5 border-b border-gray-100 hover:bg-white cursor-pointer group hover:border-l-4 hover:border-l-yellow-400 transition-all relative">
                  <div className="flex justify-between items-start mb-1.5">
                     <span className="font-bold text-gray-900 flex items-center gap-2"><User size={14} className="text-gray-400" /> {chat.user}</span>
                     <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">10:45 AM</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{chat.role}</span>
                     <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                     <span className="text-[10px] text-yellow-600 font-bold">{chat.context}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed truncate group-hover:whitespace-normal">{chat.msg}</p>
                  {chat.status === 'Alert' && <div className="absolute top-1/2 -translate-y-1/2 right-4"><ShieldAlert size={16} className="text-red-500 animate-pulse" /></div>}
               </div>
             ))}
          </div>
        </div>

        {/* Right Col: Admin Eavesdrop / Join Window */}
        <div className="flex-1 flex flex-col bg-white">
           <div className="h-[72px] border-b border-gray-100 px-6 flex items-center justify-between shrink-0 bg-white">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold border border-red-200">NW</div>
               <div>
                  <h3 className="font-bold text-gray-900 text-sm">Noah Williams <span className="text-gray-400 ml-1 font-normal">• Driver</span></h3>
                  <p className="text-xs text-red-500 font-bold flex items-center gap-1"><ShieldAlert size={10}/> Priority: Compliance Violation</p>
               </div>
             </div>
             <div className="flex gap-3">
                <button className="btn btn-dark text-xs py-2 px-6 flex items-center gap-2">Join Secretly <div className="w-2 h-2 rounded-full bg-red-500"></div></button>
                <button className="p-2 border border-gray-100 hover:bg-gray-50 rounded-lg"><Phone size={18} className="text-gray-400"/></button>
                <button className="p-2 border border-gray-100 hover:bg-gray-50 rounded-lg"><MoreVertical size={18} className="text-gray-400"/></button>
             </div>
           </div>
           
           {/* Chat messages Area */}
           <div className="flex-1 overflow-y-auto p-8 bg-gray-50/20 flex flex-col gap-6">
              <div className="text-center opacity-50 px-8">
                 <span className="text-[10px] uppercase font-bold text-gray-400 border border-gray-200 px-4 py-1.5 rounded-full tracking-widest">Admin is eavesdropping</span>
              </div>

              <div className="flex flex-col gap-1 max-w-[75%]">
                 <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-tl-none shadow-sm text-sm text-gray-700 leading-relaxed font-medium">
                    Hello, checking in on my license verification. It was supposed to be verified by now. I can't start my next trip without it.
                 </div>
                 <span className="text-[10px] text-gray-400 ml-1 font-bold">10:30 AM</span>
              </div>

              <div className="flex flex-col gap-1 max-w-[75%] self-end">
                 <div className="bg-gray-900 p-4 rounded-3xl rounded-tr-none shadow-sm text-sm text-white leading-relaxed font-normal">
                    Hi Noah, sorry for the wait. The system is currently waiting for the official TMR (Transport & Main Roads) database sync. Sarah is looking into it now.
                 </div>
                 <span className="text-[10px] text-gray-400 mr-2 font-bold text-right">10:35 AM ✓✓</span>
              </div>
           </div>

           {/* Admin Input Bar */}
           <div className="p-5 border-t border-gray-100 bg-white">
              <div className="flex gap-3 items-center">
                 <div className="flex-1 relative">
                    <textarea 
                      placeholder="Send message as SYSTEM ADMIN..." 
                      className="w-full h-[52px] min-h-[52px] bg-red-50/20 border border-red-100 rounded-2xl px-6 py-3.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-red-400 focus:bg-white transition-all uppercase placeholder:text-red-300" 
                    />
                 </div>
                 <button className="bg-red-500 hover:bg-red-600 text-white w-[52px] h-[52px] flex items-center justify-center rounded-2xl shadow-lg transition-transform active:scale-90 shrink-0">
                    <Send size={20} />
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
