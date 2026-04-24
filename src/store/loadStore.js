import { create } from 'zustand';

// Simulated Frontend-Only State Store for Loads/Dashboard
export const useLoadStore = create((set) => ({
  LoadYear: '2026',
  revenueYear: '2026',
  
  // Overview Metrics
  metrics: {
    totalLoads: '12,482',
    activeVehicles: '415',
    totalRevenue: '$1.2M',
    pendingIssues: '84',
    totalBranches: '12',
    totalDrivers: '580',
    totalCustomers: '2.4k'
  },

  // Monthly Data
  LoadData: [32, 45, 38, 52, 65, 58, 72, 85, 92, 88, 105, 120],
  incomeData: [120, 150, 180, 140, 210, 250, 230, 280, 310, 290, 340, 420], // in $k

  distData: [
    { label: 'Standard', val: 55, color: 'bg-blue-500' },
    { label: 'Express',  val: 30, color: 'bg-emerald-500' },
    { label: 'Premium',  val: 15, color: 'bg-brand' },
  ],
  recentActivities: [
    { id: 'SHP-9042', action: 'Delivery Completed', user: 'Jack Taylor', time: '12m ago', status: 'Success' },
    { id: 'SHP-9041', action: 'Route Optimized', user: 'Sarah Mitchell', time: '1h ago', status: 'System' },
    { id: 'SHP-9039', action: 'Handover Initiated', user: 'Liam Smith', time: '2h ago', status: 'Warning' },
    { id: 'SHP-9032', action: 'Cross-dock Sorting', user: 'Maria Garcia', time: '5h ago', status: 'Success' },
  ],

  // Actions
  setLoadYear: (year) => set({ LoadYear: year }),
  setRevenueYear: (year) => set({ revenueYear: year }),
}));
