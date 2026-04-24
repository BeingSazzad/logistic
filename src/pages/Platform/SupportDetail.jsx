import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeadphonesIcon, AlertCircle, CheckCircle2, MessageSquare, ArrowLeft, Send } from 'lucide-react';

const mockDB = {
  'TKT-041': { tenant: 'HERO Logistics', user: 'Sarah Mitchell', issue: 'Cannot create Load — 500 error on submit', priority: 'High', status: 'open', created: '2 hrs ago', replies: [] },
  'TKT-040': { tenant: 'FastMove AU', user: 'James Brown', issue: 'Dispatch page loads very slowly (>10s)', priority: 'Medium', status: 'open', created: '4 hrs ago', replies: [] },
  'TKT-039': { tenant: 'OzFreight Co', user: 'Lisa Park', issue: 'Driver GPS not updating on map', priority: 'High', status: 'resolved', created: '1 day ago', 
    replies: [
      { text: 'We have restarted the tracking service. Can you please check if it works now on your end?', sender: 'PO', time: '23 hrs ago' },
      { text: 'Yes, the map is loading properly now, but it took a few minutes to sync the historical pins.', sender: 'LP', time: '20 hrs ago' },
      { text: 'Thanks for confirming Lisa. The historical pin sync delay is expected after a soft reset. I will mark this as resolved.', sender: 'PO', time: '19 hrs ago' }
    ] 
  },
};

const priorityCfg = {
  High:   { bg: 'bg-red-100',    text: 'text-red-700' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  Low:    { bg: 'bg-gray-100',   text: 'text-gray-600' },
};

export default function PlatformSupportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Use mock DB or fallback
  const initTicket = mockDB[id] || { tenant: 'Unknown', user: 'Unknown', issue: 'Unknown Ticket', priority: 'Low', status: 'open', created: 'Just now', replies: [] };
  
  const [ticket, setTicket] = useState(initTicket);
  const [replyText, setReplyText] = useState('');

  const handleSend = (resolve = false) => {
    if (!replyText.trim() && !resolve) return;
    setTicket(prev => ({
      ...prev,
      status: resolve ? 'resolved' : prev.status,
      replies: replyText.trim() ? [...prev.replies, { text: replyText, sender: 'PO', time: 'Just now' }] : prev.replies
    }));
    setReplyText('');
  };

  const isResolved = ticket.status === 'resolved';
  const pCfg = priorityCfg[ticket.priority];

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0 pt-2">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/platform/support')} className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{id}</h1>
              <span className={`text-xs font-semibold uppercase px-2 py-1 rounded ${pCfg.bg} ${pCfg.text}`}>{ticket.priority} Priority</span>
              {isResolved && <span className="text-xs font-semibold uppercase px-2 py-1 rounded bg-gray-200 text-gray-600">Resolved</span>}
            </div>
            <p className="text-sm text-gray-500 mt-1">{ticket.tenant} · {ticket.user} · Opened {ticket.created}</p>
          </div>
        </div>
        {!isResolved && (
          <button onClick={() => handleSend(true)} className="btn bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-transparent font-semibold shadow-sm">
            <CheckCircle2 size={16} className="mr-2" /> Mark Resolved
          </button>
        )}
      </div>

      <div className="flex flex-col flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-0">
        
        {/* Issue Original Post */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Original Request</p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-sm shrink-0">
              {ticket.user.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 leading-snug">{ticket.issue}</p>
            </div>
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {ticket.replies.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 my-10">
              <MessageSquare size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No replies yet.</p>
              <p className="text-sm text-gray-400">Be the first to respond to {ticket.tenant}.</p>
            </div>
          ) : (
            ticket.replies.map((r, i) => {
              const isOwner = r.sender === 'PO';
              return (
                <div key={i} className={`flex gap-4 w-full max-w-3xl ${isOwner ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isOwner ? 'bg-yellow-500 text-gray-900' : 'bg-gray-200 text-gray-600'}`}>
                    {r.sender}
                  </div>
                  <div className={`flex flex-col ${isOwner ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 shadow-sm text-base ${isOwner ? 'bg-gray-900 text-white rounded-2xl rounded-tr-sm border-gray-800' : 'bg-gray-50 text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100'}`}>
                      {r.text}
                    </div>
                    <span className="text-xs font-semibold text-gray-600 mt-1.5 px-1">{r.time}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Reply Box */}
        {!isResolved && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 shrink-0">
            <div className="relative">
              <textarea 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response here..."
                className="input w-full min-h-[100px] resize-y pb-12 text-sm focus:bg-white"
              />
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button onClick={() => handleSend(false)} className={`btn font-semibold shadow-sm ${replyText.trim() ? 'btn-primary' : 'bg-yellow-500/50 text-gray-900/50 cursor-not-allowed'}`}>
                  <Send size={14} className="mr-2" /> Send Reply
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-medium text-center mt-3">Replies will notify {ticket.user} immediately.</p>
          </div>
        )}
      </div>
    </div>
  );
}



