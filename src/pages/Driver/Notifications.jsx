import React from 'react';
import { ArrowLeft, Bell, AlertTriangle, Package, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DriverNotifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Severe Weather Warning',
      message: 'Heavy rain expected on Pacific Highway bypass. Please reduce speed and expect delays.',
      time: '10 mins ago',
      read: false
    },
    {
      id: 2,
      type: 'update',
      title: 'Manifest Updated',
      message: 'Dispatch has rerouted your ACME dropoff to the local bypass road.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Expense Approved',
      message: 'Your $45.00 toll claim for M1 Sydney has been approved by Accounts.',
      time: 'Yesterday',
      read: true
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm shrink-0 border-b border-gray-100">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:text-black transition-colors rounded-full active:bg-gray-100">
               <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-lg text-gray-900 tracking-tight">Notifications</h1>
         </div>
         <button className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Clear All
         </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {notifications.length > 0 ? (
          <div className="flex flex-col gap-3">
            {notifications.map((notif) => (
              <div key={notif.id} className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${notif.read ? 'border-gray-100 opacity-75' : 'border-[#FACC15]/30'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    notif.type === 'alert' ? 'bg-red-50 text-red-600' :
                    notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {notif.type === 'alert' && <AlertTriangle size={18} />}
                    {notif.type === 'update' && <Package size={18} />}
                    {notif.type === 'success' && <CheckCircle2 size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">{notif.title}</h3>
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-[#FACC15]"></span>}
                    </div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{notif.message}</p>
                    <span className="text-xs font-bold text-gray-400 mt-2 block uppercase tracking-wider">{notif.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-50 py-20">
            <Bell size={48} className="text-gray-300 mb-4" />
            <h3 className="font-bold text-gray-900">All Caught Up!</h3>
            <p className="text-sm text-gray-500 mt-1">You have no new notifications.</p>
          </div>
        )}
      </div>

    </div>
  );
}

