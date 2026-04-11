import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, DollarSign, Network,
  BarChart2, MessageSquare, Settings, Shield, ShieldCheck, Briefcase
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';

const navConfig = [
  { type: 'link', label: 'Dashboard', icon: LayoutDashboard, to: '/admin', end: true },
  { type: 'link', label: 'Shipments', icon: Package, to: '/admin/shipments' },
  { type: 'link', label: 'Vehicles', icon: Network, to: '/admin/fleet' },
  {
    type: 'group', label: 'Operations', icon: Briefcase,
    items: [
      { to: '/admin/branches', label: 'Branches' },
      { to: '/admin/drivers', label: 'Drivers' },
      { to: '/admin/customers', label: 'Customers' },
      { to: '/admin/safety-checklists', label: 'Safety Checklists' },
      { to: '/admin/exceptions', label: 'Delivery Issues' },
    ]
  },
  { type: 'link', label: 'Finance', icon: DollarSign, to: '/admin/finance' },
  { type: 'link', label: 'User Roles', icon: Shield, to: '/admin/users' },
  { type: 'link', label: 'Support', icon: MessageSquare, to: '/admin/helpline' },
  {
    type: 'group', label: 'Settings', icon: Settings,
    items: [
      { to: '/admin/company', label: 'Company Settings' },
      { to: '/admin/billing', label: 'Subscription & Billing' },
      { to: '/admin/settings', label: 'My Profile' }
    ]
  }
];

const user = { name: 'Michael Adams', role: 'Super Admin', initials: 'MA' };

export default function AdminLayout() {
  return (
    <SidebarLayout
      roleName="Admin Portal"
      roleIcon={<Shield size={9} />}
      navConfig={navConfig}
      user={user}
      topbarTitle="Enterprise Fleet Operations"
    >
      <Outlet />
    </SidebarLayout>
  );
}
