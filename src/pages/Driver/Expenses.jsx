import React, { useState } from 'react';
import {
  Plus, Camera, Fuel, CreditCard,
  Receipt, MapPin, Clock,
  CheckCircle2, History, Wrench, X, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'fuel',       label: 'Fuel / AdBlue',   icon: Fuel },
  { id: 'toll',       label: 'Toll / Road Fee',  icon: CreditCard },
  { id: 'parking',    label: 'Parking',          icon: MapPin },
  { id: 'meal',       label: 'Meal Allowance',   icon: Receipt },
  { id: 'wash',       label: 'Wash / Cleaning',  icon: Zap },
  { id: 'repair',     label: 'Roadside Repair',  icon: Wrench },
];

const LOGS = [
  { id: 'LOG-8821', type: 'Fuel',    amount: '84.50', status: 'Approved', date: 'Today, 09:12',  vendor: 'Shell Sydney CBD',   hasPhoto: true },
  { id: 'LOG-8819', type: 'Toll',    amount: '12.20', status: 'Pending',  date: 'Today, 07:45',  vendor: 'Linkt M2 Motorway',  hasPhoto: true },
  { id: 'LOG-8790', type: 'Parking', amount: '25.00', status: 'Rejected', date: 'Yesterday',     vendor: 'CBD Secure Park',    hasPhoto: true, reason: 'Invalid Receipt' },
  { id: 'LOG-8765', type: 'Expense', amount: '15.00', status: 'Approved', date: '12 Apr',        vendor: 'Cleaning Depot',     hasPhoto: true },
];

const STATUS_STYLE = {
  Approved: 'text-emerald-500',
  Pending:  'text-amber-500',
  Rejected: 'text-red-500',
};
const ICON_STYLE = {
  Approved: 'bg-emerald-50 border-emerald-100 text-emerald-500',
  Pending:  'bg-amber-50  border-amber-100  text-amber-500',
  Rejected: 'bg-red-50    border-red-100    text-red-500',
};

export default function DriverExpenses() {
  const navigate = useNavigate();
  const [step, setStep]         = useState('list');   // 'list' | 'form' | 'success'
  const [category, setCategory] = useState(null);
  const [amount, setAmount]     = useState('');
  const [vendor, setVendor]     = useState('');
  const [receiptCaptured, setReceiptCaptured] = useState(false);

  /* ── FORM VIEW ─────────────────────────────────────────── */
  if (step === 'form') {
    return (
      <div className="flex flex-col bg-gray-50 min-h-screen pb-24 w-full max-w-[480px] mx-auto animate-in slide-in-from-bottom-5 duration-300">

        {/* Header */}
        <div className="bg-[#111] px-6 pt-12 pb-6 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFCC00] flex items-center justify-center text-black shadow-lg">
              <Receipt size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Log Expense</h2>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-0.5">Reimbursement Claim</p>
            </div>
          </div>
          <button onClick={() => { setStep('list'); setCategory(null); setAmount(''); setVendor(''); setReceiptCaptured(false); }}
            className="text-white bg-white/10 p-2.5 rounded-2xl hover:bg-white/20 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">

          {/* Category Picker */}
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3 px-1">Expense Category</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center ${
                    category?.id === cat.id
                      ? 'border-[#FFCC00] bg-[#111] text-white'
                      : 'border-gray-100 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <cat.icon size={22} className={category?.id === cat.id ? 'text-[#FFCC00]' : ''} />
                  <span className="text-[9px] font-black uppercase tracking-widest leading-tight">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Amount ($)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-200">$</span>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white border-2 border-gray-100 py-4 pl-10 pr-5 rounded-2xl text-2xl font-black focus:outline-none focus:ring-4 focus:ring-[#FFCC00]/10 focus:border-[#FFCC00] transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Vendor */}
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Vendor / Notes</label>
            <input
              type="text"
              value={vendor}
              onChange={e => setVendor(e.target.value)}
              placeholder="e.g. Shell Melbourne, City Parking..."
              className="w-full bg-white border-2 border-gray-100 py-4 px-5 rounded-2xl text-sm font-black focus:outline-none focus:ring-4 focus:ring-[#FFCC00]/10 focus:border-[#FFCC00] transition-all shadow-sm"
            />
          </div>

          {/* Manual Receipt Capture */}
          <button
            onClick={() => setReceiptCaptured(!receiptCaptured)}
            className={`w-full py-8 border-2 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
              receiptCaptured
                ? 'border-emerald-400 bg-emerald-50 text-emerald-600'
                : 'border-dashed border-gray-100 bg-white text-gray-400 hover:border-[#FFCC00] hover:bg-[#FFCC00]/5'
            }`}
          >
            {receiptCaptured ? (
              <>
                <CheckCircle2 size={30} className="text-emerald-500" />
                <span className="text-xs font-black uppercase tracking-widest">Receipt Photo Added ✓</span>
              </>
            ) : (
              <>
                <Camera size={30} />
                <div className="text-center">
                  <span className="text-xs font-black uppercase tracking-widest block">Capture Receipt</span>
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-0.5 block">Take a photo for verification</span>
                </div>
              </>
            )}
          </button>

          <button
            onClick={() => { if (category && amount) setStep('success'); }}
            disabled={!category || !amount}
            className={`w-full py-5 font-black uppercase text-xs rounded-2xl shadow-xl transition-all active:scale-[0.98] mt-2 ${
              category && amount
                ? 'bg-[#111] hover:bg-black text-[#FFCC00]'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            Submit for Approval
          </button>
        </div>
      </div>
    );
  }

  /* ── SUCCESS VIEW ──────────────────────────────────────── */
  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="w-28 h-28 bg-[#FFCC00] rounded-full flex items-center justify-center text-black mb-8 shadow-2xl shadow-yellow-400/30 animate-bounce">
          <CheckCircle2 size={56} strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Submitted!</h2>
        <p className="text-sm font-bold text-gray-400 mt-3 max-w-[240px] leading-snug">
          Expense queued for Accounts review. You'll be notified when approved.
        </p>
        <div className="mt-8 bg-white border border-gray-100 rounded-3xl p-5 w-full max-w-[280px] shadow-sm text-left">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Category</p>
          <p className="font-black text-gray-900 text-sm">{category?.label || '—'}</p>
          <div className="w-full h-px bg-gray-100 my-3" />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Amount</p>
          <p className="font-black text-gray-900 text-xl">${amount}</p>
        </div>
        <button
          onClick={() => { setStep('list'); setCategory(null); setAmount(''); setVendor(''); setReceiptCaptured(false); }}
          className="mt-8 px-10 py-5 bg-[#111] text-[#FFCC00] rounded-2xl font-black uppercase text-xs hover:bg-black transition-all shadow-lg active:scale-95"
        >
          Back to Expenses
        </button>
      </div>
    );
  }

  /* ── LIST VIEW ─────────────────────────────────────────── */
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen pb-24 w-full max-w-[480px] mx-auto">

      {/* Header Balance Strip */}
      <div className="bg-[#111] px-6 pt-12 pb-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black opacity-60 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Pending Reimbursement</p>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-black text-white leading-none">$145.20</h2>
              <p className="text-[10px] font-black text-[#FFCC00] uppercase mt-2 tracking-widest">Awaiting Approval</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-black text-gray-400">$1,240.00</h2>
              <p className="text-[10px] font-black text-gray-600 uppercase mt-1 tracking-widest">Paid This Month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">

        {/* New Log CTA */}
        <button
          onClick={() => setStep('form')}
          className="w-full bg-[#FFCC00] hover:bg-yellow-400 text-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg border border-yellow-300"
        >
          <Plus size={22} strokeWidth={3} />
          <span className="text-xs font-black uppercase tracking-widest">Log New Expense</span>
        </button>

        {/* Feed Header */}
        <div className="flex items-center justify-between px-1 pt-2">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.15em]">Recent Submissions</h3>
          <button className="text-[10px] font-black text-gray-400 flex items-center gap-1.5 uppercase hover:text-gray-700 transition-colors">
            <History size={12} /> Full History
          </button>
        </div>

        {/* Log Cards */}
        <div className="space-y-3 pb-4">
          {LOGS.map(log => (
            <div key={log.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between active:scale-[0.99] transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center border-2 transition-colors ${ICON_STYLE[log.status]}`}>
                  {log.type === 'Fuel'    ? <Fuel size={20} />       :
                   log.type === 'Toll'    ? <CreditCard size={20} /> :
                                            <Receipt size={20} />}
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900 tracking-tight mb-0.5">{log.vendor}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{log.date}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${STATUS_STYLE[log.status]}`}>
                      {log.status}
                    </span>
                  </div>
                  {log.reason && (
                    <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mt-0.5">↳ {log.reason}</p>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-black text-gray-900 tracking-tighter">${log.amount}</p>
                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{log.id}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
