import { create } from 'zustand';

// Simulated Frontend-Only State Store for Shipments/Dashboard
export const useShipmentStore = create((set) => ({
  shipmentYear: '2026',
  revenueYear: '2026',
  shipmentData: [32, 45, 38, 52, 65, 58, 72, 85, 92, 88, 105, 120],
  distData: [
    { label: 'Standard', val: 56, color: 'bg-emerald-500' },
    { label: 'Express',  val: 28, color: 'bg-[#FACC15]' },
    { label: 'Priority', val: 12, color: 'bg-orange-500' },
    { label: 'DG / Freight', val: 4, color: 'bg-red-500' }
  ],
  recentActivities: [
    { id: 'SHP-9042', action: 'Delivery Completed', user: 'Jack Taylor', time: '12m ago', status: 'Success' },
    { id: 'SHP-9041', action: 'Route Optimized', user: 'Sarah Mitchell', time: '1h ago', status: 'System' },
    { id: 'SHP-9039', action: 'Handover Initiated', user: 'Liam Smith', time: '2h ago', status: 'Warning' },
    { id: 'SHP-9032', action: 'Cross-dock Sorting', user: 'Maria Garcia', time: '5h ago', status: 'Success' },
  ],

  // Actions
  setShipmentYear: (year) => set({ shipmentYear: year }),
  setRevenueYear: (year) => set({ revenueYear: year }),
}));
