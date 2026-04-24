import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Receipt, BarChart3,
  Headphones, Settings, CreditCard, Globe
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';
import { useAuthStore } from '../../store/authStore';

const navConfig = [
  { type: 'link', to: '/platform',               label: 'Overview',          icon: LayoutDashboard, end: true },
  { type: 'link', to: '/platform/tenants',       label: 'Companies',         icon: Building2 },
  { type: 'link', to: '/platform/transactions',  label: 'Transactions',      icon: Receipt },
  { type: 'link', to: '/platform/subscriptions', label: 'Subscriptions',     icon: CreditCard },
  { type: 'link', to: '/platform/support',       label: 'Support Tickets',   icon: Headphones },
  { type: 'link', to: '/platform/settings',      label: 'Settings',          icon: Settings },
];

export default function PlatformLayout() {
  const authUser = useAuthStore(state => state.user);
  const displayUser = {
    name: authUser?.name || 'Platform Admin',
    role: authUser?.role || 'SaaS Owner',
    initials: authUser?.name ? authUser.name.split(' ').map(n => n[0]).join('') : 'PO',
    branchName: authUser?.branchName,
  };

  return (
    <SidebarLayout
      roleName="Platform Owner"
      roleIcon={<Globe size={9} />}
      navConfig={navConfig}
      user={displayUser}
      topbarTitle="SaaS Management Console"
    >
      <Outlet />
    </SidebarLayout>
  );
}

