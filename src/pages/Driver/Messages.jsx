import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Send, Phone, User, CheckCircle2, 
  AlertTriangle, Image as ImageIcon, Plus, 
  Clock, MapPin, MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DriverMessages() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi Dispatch. Encountering severe traffic on the Pacific Highway bypass.", time: "10:30 AM", sender: "driver", status: 'read' },
    { id: 2, text: "Noted Noah. ETA updated to 1h 15m in the system. Let me know if you need a reroute.", time: "10:35 AM", sender: "dispatch" },
    { id: 3, text: "Traffic is fully stopped now. There's an accident ahead. Trying to find an alternate local road.", time: "10:42 AM", sender: "driver", status: 'read' },
    { id: 4, text: "Please use the local bypass. Will update the manifest.", time: "10:45 AM", sender: "dispatch" },
  ]);

  const quickReplies = ["On My Way", "Arrived", "Delayed", "OK", "SOS"];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text = null) => {
    const finalMsg = text || inputValue;
    if (!finalMsg.trim()) return;
    
    setMessages([...messages, {
      id: messages.length + 100,
      text: finalMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'driver',
      status: 'sending'
    }]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* ── High-Fidelity Header ── */}
      <div className="bg-[#111] text-white px-5 py-4 flex items-center justify-between shadow-xl shrink-0 z-50">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate('/driver')} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
               <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-white/10 bg-[#FFCC00] flex items-center justify-center font-semibold text-[#111] text-sm shadow-inner">
                     OP
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#111] rounded-full"></span>
               </div>
               <div>
                  <h1 className="font-semibold text-sm tracking-tight">Fleet Support</h1>
                  <p className="text-xs font-medium text-[#FFCC00] mt-0.5">SYD_DISPATCH_01</p>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <button className="p-2.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20 active:scale-95 flex items-center gap-1.5 px-3">
               <AlertTriangle size={16} />
               <span className="text-xs font-semibold uppercase tracking-tighter">Emergency</span>
            </button>
         </div>
      </div>

      {/* ── Message List with Custom Scroller ── */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 scroll-smooth pb-10"
      >
         <div className="text-center">
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Shift Started: 08:00 AM</span>
         </div>
         
         {messages.map((m) => (
            <div key={m.id} className={`flex flex-col group ${m.sender === 'driver' ? 'items-end' : 'items-start'}`}>
               <div className={`max-w-[85%] px-4 py-3 shadow-md text-sm font-medium leading-relaxed transition-all ${
                 m.sender === 'driver' 
                 ? 'bg-[#FFCC00] text-[#111] rounded-2xl rounded-tr-none' 
                 : 'bg-white border border-gray-100 text-gray-900 rounded-2xl rounded-tl-none'
               }`}>
                 {m.text}
               </div>
               <div className={`flex items-center gap-2 mt-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <Clock size={10} /> {m.time}
                  {m.sender === 'driver' && <CheckCircle2 size={10} className="text-emerald-500" />}
               </div>
            </div>
         ))}
      </div>

      {/* ── Action Depot: Quick Replies & SOS ── */}
      <div className="bg-white border-t border-gray-100 p-4 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
         <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {quickReplies.map(reply => (
               <button 
                  key={reply}
                  onClick={() => handleSendMessage(reply)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest border transition-all active:scale-95 ${
                     reply === 'SOS' 
                     ? 'bg-red-50 text-red-600 border-red-100 font-semibold' 
                     : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100 text-gray-700'
                  }`}
               >
                  {reply}
               </button>
            ))}
         </div>

         <div className="flex items-end gap-3">
            <button className="w-12 h-[52px] bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 transition-all shrink-0 active:scale-95">
               <Plus size={20} />
            </button>
            <div className="flex-1 relative">
               <textarea 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type message to Dispatch..." 
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl pl-5 pr-12 py-3.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/50 focus:border-[#FFCC00] focus:bg-white transition-all h-[52px] min-h-[52px] font-bold shadow-inner placeholder:text-gray-300"
               />
               <button 
                  onClick={() => handleSendMessage()} 
                  className="absolute right-2 top-1.5 w-10 h-[40px] bg-[#111] hover:bg-black text-[#FFCC00] rounded-xl transition-all flex items-center justify-center active:scale-95"
               >
                  <Send size={16} />
               </button>
            </div>
         </div>
      </div>

    </div>
  );
}


