import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FileCheck, FileText, CreditCard,
  Receipt, Users, BarChart2, ShieldCheck
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';

const navConfig = [
  { type: 'link', to: '/accounts',                label: 'Accounts Intelligence',      icon: LayoutDashboard, end: true },
  { type: 'link', to: '/accounts/pod-review',     label: 'POD Review Queue',     icon: FileCheck, badge: 12 },
  { type: 'link', to: '/accounts/invoices',       label: 'My Invoices',       icon: FileText },
  { type: 'link', to: '/accounts/payments',       label: 'Payments',       icon: CreditCard },
  { type: 'link', to: '/accounts/reimbursements', label: 'Reimbursements', icon: Receipt },
  { type: 'link', to: '/accounts/settlements',    label: 'Driver Settlements',    icon: Users },
  { type: 'link', to: '/accounts/reports',        label: 'Reports',        icon: BarChart2 },
];

const user = { name: 'Sarah Chen', role: 'Fin. Controller', initials: 'SC' };

export default function AccountsLayout() {
  return (
    <SidebarLayout
      roleName="Accounts HQ"
      roleIcon={<ShieldCheck size={9} />}
      navConfig={navConfig}
      user={user}
      topbarTitle="Enterprise Billing & Audit Control"
    >
      <Outlet />
    </SidebarLayout>
  );
}
