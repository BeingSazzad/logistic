import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Building2, PackageSearch, ArrowDownToLine, ArrowUpFromLine, Warehouse
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';
import { useAuthStore } from '../../store/authStore';

const navConfig = [
  { type: 'link', to: '/warehouse',           label: 'Command Center',        icon: Building2,       end: true },
  { type: 'link', to: '/warehouse/inbound',   label: 'Incoming Handovers', icon: ArrowDownToLine },
  { type: 'link', to: '/warehouse/outbound',  label: 'Outbound Loading', icon: ArrowUpFromLine },
  { type: 'link', to: '/warehouse/inventory', label: 'Inventory', icon: PackageSearch },
];

export default function WarehouseLayout() {
  const authUser = useAuthStore(state => state.user);
  const displayUser = {
    name: authUser?.name || 'Floor Manager',
    role: authUser?.role || 'Warehouse Ops',
    initials: authUser?.name ? authUser.name.split(' ').map(n => n[0]).join('') : 'FM',
    branchName: authUser?.branchName,
  };

  return (
    <SidebarLayout
      roleName="Warehouse Ops"
      roleIcon={<Warehouse size={9} />}
      navConfig={navConfig}
      user={displayUser}
      topbarTitle="Warehouse Operations Center"
    >
      <Outlet />
    </SidebarLayout>
  );
}

