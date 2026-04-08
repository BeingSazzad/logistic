import React, { useState } from 'react';
import { ArrowLeft, Send, Phone, User, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DriverMessages() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi Dispatch. Encountering severe traffic on the Pacific Highway bypass.", time: "10:30 AM", sender: "driver" },
    { id: 2, text: "Noted Noah. ETA updated to 1h 15m in the system. Let me know if you need a reroute.", time: "10:35 AM", sender: "dispatch" },
    { id: 3, text: "Traffic is fully stopped now. There's an accident ahead. Trying to find an alternate local road.", time: "10:42 AM", sender: "driver" },
    { id: 4, text: "Please use the local bypass. Will update the manifest.", time: "10:45 AM", sender: "dispatch" },
  ]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'driver'
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
    <div className="flex flex-col h-full bg-gray-50 min-h-screen">
      
      {/* Dynamic Header */}
      <div className="bg-black text-white px-4 py-4 flex items-center justify-between shadow-md shrink-0">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-300 hover:text-white transition-colors">
               <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full border border-gray-700 bg-gray-800 flex items-center justify-center font-black text-[#FACC15]">
                  OP
               </div>
               <div>
                  <h1 className="font-bold text-sm leading-tight tracking-tight">Support / Dispatch</h1>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                  </p>
               </div>
            </div>
         </div>
         <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/5 shadow-xl">
            <Phone size={18} className="text-[#FACC15]" />
         </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4 pb-24 relative z-0">
         <div className="text-center sticky top-0 bg-gray-50 py-2">
            <span className="text-[9px] font-black text-gray-400 bg-gray-200 border border-gray-300 px-3 py-1 rounded-full uppercase tracking-widest">Today, 10:30 AM</span>
         </div>
         
         {messages.map((m) => (
            <div key={m.id} className={`flex flex-col gap-1 w-[80%] ${m.sender === 'driver' ? 'self-end' : 'self-start'}`}>
               <div className={`px-4 py-3 shadow-sm text-sm font-medium leading-relaxed ${m.sender === 'driver' ? 'bg-[#FACC15] text-black rounded-2xl rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-900 rounded-2xl rounded-tl-sm'}`}>
                 {m.text}
               </div>
               <div className={`flex items-center gap-1 mt-0.5 text-[9px] font-black text-gray-400 uppercase tracking-widest ${m.sender === 'driver' ? 'justify-end pr-1' : 'justify-start pl-1'}`}>
                  {m.time}
                  {m.sender === 'driver' && <CheckCircle2 size={10} className="text-emerald-500" />}
               </div>
            </div>
         ))}
      </div>

      {/* Input Box - Stick to bottom */}
      <div className="fixed bottom-[68px] left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] z-10">
         <div className="flex items-end gap-3 max-w-md mx-auto">
            <textarea 
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Reply to Dispatch..." 
               className="flex-1 border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FACC15]/30 focus:border-[#FACC15] focus:bg-white transition-all h-[52px] min-h-[52px] font-medium shadow-inner"
            />
            <button 
               onClick={handleSendMessage} 
               className="bg-[#111] hover:bg-black text-[#FACC15] w-14 rounded-2xl transition-all shadow-xl h-[52px] flex items-center justify-center shrink-0 active:scale-95"
            >
               <Send size={18} />
            </button>
         </div>
      </div>

    </div>
  );
}
