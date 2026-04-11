import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Zap, Shield, 
  Globe, PackageCheck
} from 'lucide-react';

export default function AdminSubscriptionPlans() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'

  const plans = [
    {
      name: 'Starter Fleet',
      desc: 'Perfect for small fleets standardizing their operations.',
      monthlyPrice: 299,
      yearlyPrice: 249,
      features: [
        'Up to 10 Vehicles',
        'Basic Driver Routing',
        'Standard Email Support',
        '1 Warehouse Location',
        'Mobile App (Driver Mode)'
      ],
      popular: false,
      current: false,
      icon: <PackageCheck size={24} />
    },
    {
      name: 'Professional',
      desc: 'Advanced tools for growing logistics operations.',
      monthlyPrice: 599,
      yearlyPrice: 499,
      features: [
        'Up to 50 Vehicles',
        'AI Optimized Routing',
        'Priority 24/7 Support',
        'Up to 3 Warehouse Locations',
        'Customer Tracking Portal',
        'API Access (Standard)'
      ],
      popular: true,
      current: false,
      icon: <Globe size={24} />
    },
    {
      name: 'Enterprise Fleet',
      desc: 'Maximum performance and full compliance features.',
      monthlyPrice: 1200,
      yearlyPrice: 1000,
      features: [
        'Unlimited Vehicles',
        'Predictive Maintenance AI',
        'Dedicated Success Manager',
        'Unlimited Warehouses',
        'White-label Tracking Portal',
        'Advanced API & ERP Sync'
      ],
      popular: false,
      current: true,
      icon: <Shield size={24} />
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2 mt-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/billing')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Compare Plans</h1>
            <p className="text-sm font-medium text-gray-500 mt-0.5">Choose the right infrastructure scale for your growing fleet.</p>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-8"></div>

      {/* Pricing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-xl inline-flex relative shadow-inner">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all relative z-10 ${billingCycle === 'monthly' ? 'text-gray-900 shadow-sm bg-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Monthly Billing
          </button>
          <button 
            onClick={() => setBillingCycle('yearly')}
            className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all relative z-10 flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-gray-900 shadow-sm bg-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Yearly Billing
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2 items-end">
        {plans.map((plan, index) => (
          <div key={index} className={`relative rounded-3xl border transition-all ${plan.popular ? 'border-[#FFCC00] shadow-xl md:-translate-y-4 bg-white z-10' : 'border-gray-200 bg-white shadow-sm hover:shadow-md'}`}>
             
             {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFCC00] text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Zap size={14} fill="currentColor" /> Most Popular
                </div>
             )}

             <div className="p-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm ${plan.popular ? 'bg-[#FFCC00]/20 text-yellow-600' : 'bg-gray-50 border border-gray-100 text-gray-500'}`}>
                   {plan.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm font-medium text-gray-500 h-10 mb-6">{plan.desc}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-black text-gray-900">${billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice}</span>
                  <span className="text-sm font-bold text-gray-500">/mo</span>
                  {billingCycle === 'yearly' && (
                    <p className="text-[11px] font-medium text-emerald-600 mt-2 tracking-tight">Billed ${plan.yearlyPrice * 12} annually</p>
                  )}
                </div>

                <button 
                  className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm
                    ${plan.current 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                      : plan.popular 
                        ? 'bg-[#FFCC00] hover:bg-[#E6B800] text-black border border-transparent' 
                        : 'bg-white border text-gray-900 border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {plan.current ? 'Current Plan' : 'Select Plan'}
                </button>
             </div>

             <div className="p-8 bg-gray-50 border-t border-gray-100 rounded-b-3xl">
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-4">What's included</p>
                <div className="space-y-4">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className={plan.current || plan.popular ? "text-emerald-500" : "text-gray-400"} />
                      <span className="text-sm font-bold text-gray-700 leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        ))}
      </div>

    </div>
  );
}
