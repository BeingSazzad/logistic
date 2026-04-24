import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FileCheck, FileText, CreditCard,
  Receipt, Users, BarChart2, ShieldCheck
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';
import { useAuthStore } from '../../store/authStore';

const navConfig = [
  { type: 'link', to: '/accounts',                label: 'Command Center',      icon: LayoutDashboard, end: true },
  { type: 'link', to: '/accounts/pod-review',     label: 'POD Review',     icon: FileCheck, badge: 12 },
  { type: 'link', to: '/accounts/invoices',       label: 'My Invoices',       icon: FileText },
  { type: 'link', to: '/accounts/payments',       label: 'Payments',       icon: CreditCard },
  { type: 'link', to: '/accounts/reimbursements', label: 'Reimbursements', icon: Receipt },
  { type: 'link', to: '/accounts/settlements',    label: 'Driver Settlements',    icon: Users },
  { type: 'link', to: '/accounts/reports',        label: 'Reports',        icon: BarChart2 },
];

export default function AccountsLayout() {
  const authUser = useAuthStore(state => state.user);
  const displayUser = {
    name: authUser?.name || 'Sarah Chen',
    role: authUser?.role || 'Fin. Controller',
    initials: authUser?.name ? authUser.name.split(' ').map(n => n[0]).join('') : 'SC',
    branchName: authUser?.branchName,
  };

  return (
    <SidebarLayout
      roleName="Accounts HQ"
      roleIcon={<ShieldCheck size={9} />}
      navConfig={navConfig}
      user={displayUser}
      topbarTitle="Enterprise Billing & Audit Control"
    >
      <Outlet />
    </SidebarLayout>
  );
}

