import { create } from 'zustand';

export const useUserStore = create((set) => ({
  staffRoster: [
    { id: 'USR-001', name: 'John Doe', role: 'admin', branchId: 'SYD-CENTRAL' },
    { id: 'USR-002', name: 'Jane Smith', role: 'dispatcher', branchId: 'MEL-HUB' },
  ],
  drivers: [
    { id: 'DRV-102', branchId: 'SYD-CENTRAL', name: 'Jack Taylor', phone: '+61 411 000 001', rank: 'Senior', status: 'On Duty', assigned: 'SHP-20481' },
    { id: 'DRV-134', branchId: 'SYD-CENTRAL', name: 'Oliver Brown', phone: '+61 414 000 004', rank: 'Junior', status: 'In Break', assigned: '-' },
  ],
  customers: [],

  // Actions
  addDriver: (driver) => set((state) => ({ drivers: [...state.drivers, driver] })),
  setStaffRoster: (roster) => set({ staffRoster: roster }),
}));
