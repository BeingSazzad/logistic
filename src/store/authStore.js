import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: {
    name: 'Sarah Mitchell',
    role: 'dispatcher',
    branchId: 'SYD-CENTRAL',
    branchName: 'Sydney Central Depot',
    email: 'sarah.m@herologistics.com'
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}));
