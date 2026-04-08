import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Check, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function SafetyCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [checks, setChecks] = useState({
    tires: false,
    lights: false,
    brakes: false,
    mirrors: false,
    fluids: false,
    cargo: false,
    straps: false,
    safety: false,
    documents: false,
  });

  const allChecked = Object.values(checks).every(Boolean);

  return (
    <div className="p-4 flex flex-col min-h-full pb-20">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold">Safety Check</h2>
          <p className="text-sm text-gray-500">Step {step} of 3</p>
        </div>
      </div>

      <div className="flex gap-1 mb-6">
        <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
        <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
        <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-yellow-400' : 'bg-gray-200'}`} />
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-1">Vehicle Inspection</h3>
            <p className="text-sm text-gray-500 mb-5">Vehicle: NSW-456-XYZ (Volvo FH16)</p>
            
            <div className="flex flex-col gap-3">
              {Object.keys(checks).map((key) => (
                <label key={key} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition cursor-pointer">
                  <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 ${checks[key] ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-gray-300 text-transparent'}`}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {key} {key === 'tires' && '(pressure, tread, damage)'}
                    {key === 'lights' && '(headlights, brake, signals)'}
                    {key === 'brakes' && '(test before moving)'}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 p-3 bg-red-50 rounded-xl">
              <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-800">Found an issue?</p>
                <button className="text-sm text-red-600 font-medium underline mt-1">Report Vehicle Fault</button>
              </div>
            </div>
          </div>

          <button 
            disabled={!allChecked}
            onClick={() => setStep(2)}
            className={`mt-auto py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              allChecked ? 'bg-black text-white active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next: Driver Check <ArrowRight size={18} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-1">Driver Fitness</h3>
            <p className="text-sm text-gray-500 mb-5">Confirm you are fit to drive</p>
            
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Hours of Service</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Last shift ended</span><span className="font-medium">7 Apr, 18:30</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Rest period</span><span className="font-medium text-green-600">10h 30m ✓</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Available driving</span><span className="font-medium">12h 0m</span></div>
              </div>
            </div>

            <button onClick={() => setStep(3)} className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
              I am fit to drive <ArrowRight size={18} />
            </button>
            <button className="w-full mt-3 py-4 rounded-xl font-bold text-gray-600 bg-gray-100 flex items-center justify-center">
              Report Unavailable
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-1">Photo Evidence</h3>
            <p className="text-sm text-gray-500 mb-5">Required for compliance</p>
            
            <div className="space-y-4">
              <div className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2 hover:bg-gray-50 transition cursor-pointer">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-2">
                  <Camera size={24} />
                </div>
                <p className="font-bold text-gray-800">Vehicle Exterior</p>
                <p className="text-xs text-gray-500">Front view showing plate</p>
              </div>

              <div className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2 hover:bg-gray-50 transition cursor-pointer">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-2">
                  <Camera size={24} />
                </div>
                <p className="font-bold text-gray-800">Odometer Reading</p>
                <p className="text-xs text-gray-500">Clear view of dashboard</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/driver/active')}
            className={`mt-auto py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-yellow-400 text-black hover:bg-yellow-500 active:scale-95`}
          >
            <Check size={18} /> Complete Check
          </button>
        </div>
      )}
    </div>
  );
}
