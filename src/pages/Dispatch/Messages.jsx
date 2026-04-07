import React from 'react';
import { Search, Send, MoreVertical, Phone } from 'lucide-react';

export default function DispatchMessages() {
  const threads = [
    { id: 1, name: 'Noah Williams',  role: 'Driver (TRK-05)', msg: 'There is a severe traffic jam near the Hume Highway junction.', time: '10:42 AM', unread: 2 },
    { id: 2, name: 'Jack Taylor', role: 'Driver (TRK-12)', msg: 'ETA is looking good. Reaching in 45m.', time: '09:15 AM', unread: 0 },
    { id: 3, name: 'Warehouse A', role: 'Inbound Team',    msg: 'Manifest LOD-044 is ready for assignment.', time: 'Yesterday', unread: 0 },
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* ── Chat List ── */}
      <div className="w-80 border-r border-gray-100 flex flex-col bg-gray-50 shrink-0">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="font-bold text-gray-900 text-lg mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input type="text" placeholder="Search chats..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-yellow-400" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {threads.map(t => (
            <div key={t.id} className={`p-4 border-b border-gray-100 cursor-pointer transition ${t.unread ? 'bg-white border-l-4 border-l-yellow-400' : 'hover:bg-gray-100 border-l-4 border-l-transparent'}`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`font-bold text-sm ${t.unread ? 'text-gray-900' : 'text-gray-700'}`}>{t.name}</span>
                <span className="text-[10px] text-gray-400 font-semibold">{t.time}</span>
              </div>
              <div className="text-[11px] text-gray-500 font-medium mb-1.5">{t.role}</div>
              <div className="flex justify-between items-center">
                <p className={`text-xs truncate pr-4 ${t.unread ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>{t.msg}</p>
                {t.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center text-[10px] font-bold shrink-0">{t.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Active Chat Window ── */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">NW</div>
             <div>
               <h3 className="font-bold text-gray-900 text-sm">Noah Williams</h3>
               <p className="text-xs text-yellow-600 font-semibold">Active now</p>
             </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"><Phone size={18}/></button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"><MoreVertical size={18}/></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 flex flex-col gap-4">
          <div className="text-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">Today, 10:30 AM</span>
          </div>
          
          <div className="flex flex-col gap-1 max-w-[70%]">
             <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm shadow-sm text-sm text-gray-700">
               Hi Dispatch. Encountering severe traffic on the Pacific Highway bypass.
             </div>
             <span className="text-[10px] text-gray-400 ml-1">10:30 AM</span>
          </div>

          <div className="flex flex-col gap-1 max-w-[70%] self-end">
             <div className="bg-gray-900 p-3 rounded-2xl rounded-tr-sm shadow-sm text-sm text-white">
               Noted Noah. ETA updated to 1h 15m in the system. Let me know if you need a reroute.
             </div>
             <span className="text-[10px] text-gray-400 mr-1 text-right">10:35 AM ✓✓</span>
          </div>
          
          <div className="flex flex-col gap-1 max-w-[70%]">
             <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm shadow-sm text-sm text-gray-700 font-bold border-l-2 border-l-red-500">
               Traffic is fully stopped now. There's an accident ahead. Trying to find an alternate local road.
             </div>
             <span className="text-[10px] text-gray-400 ml-1">10:42 AM</span>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <div className="flex items-end gap-3">
             <textarea 
               placeholder="Type a message to Noah..." 
               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 bg-gray-50 focus:bg-white transition h-[50px] min-h-[50px]"
             />
             <button className="bg-yellow-400 hover:bg-yellow-500 text-black p-3.5 rounded-xl transition shadow-sm h-[50px]">
               <Send size={18} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
