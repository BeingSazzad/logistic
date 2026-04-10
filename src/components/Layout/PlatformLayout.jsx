import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Receipt, BarChart3,
  Headphones, Settings, CreditCard, Globe
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';

const navConfig = [
  { type: 'link', to: '/platform',               label: 'Platform Overview',     icon: LayoutDashboard, end: true },
  { type: 'link', to: '/platform/tenants',       label: 'Client Companies',     icon: Building2 },
  { type: 'link', to: '/platform/transactions',  label: 'Transactions',  icon: Receipt },
  { type: 'link', to: '/platform/subscriptions', label: 'Subscriptions & Plans', icon: CreditCard },
  { type: 'link', to: '/platform/support',       label: 'Support Tickets',       icon: Headphones },
  { type: 'link', to: '/platform/settings',      label: 'Platform Settings',      icon: Settings },
];

const user = { name: 'Platform Admin', role: 'SaaS Owner', initials: 'PO' };

export default function PlatformLayout() {
  return (
    <SidebarLayout
      roleName="Platform Owner"
      roleIcon={<Globe size={9} />}
      navConfig={navConfig}
      user={user}
      topbarTitle="SaaS Management Console"
    >
      <Outlet />
    </SidebarLayout>
  );
}
