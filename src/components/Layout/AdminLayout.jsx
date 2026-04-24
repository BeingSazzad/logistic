import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Package, DollarSign, Network,
  BarChart2, MessageSquare, Settings, Shield, ShieldCheck, Briefcase
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';
import { useAuthStore } from '../../store/authStore';

const navConfig = [
  { type: 'link', label: 'Dashboard', icon: LayoutDashboard, to: '/admin', end: true },
  { type: 'link', label: 'Loads', icon: Package, to: '/admin/loads' },
  { type: 'link', label: 'Vehicles', icon: Network, to: '/admin/fleet' },
  {
    type: 'group', label: 'Operations', icon: Briefcase,
    items: [
      { to: '/admin/branches', label: 'Branches' },
      { to: '/admin/drivers', label: 'Drivers' },
      { to: '/admin/customers', label: 'Customers' },
      { to: '/admin/vehicle-registry', label: 'Vehicle Registry' },
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

export default function AdminLayout() {
  const authUser = useAuthStore(state => state.user);
  const displayUser = {
    name: authUser?.name || 'Michael Adams',
    role: authUser?.role || 'Super Admin',
    initials: authUser?.name ? authUser.name.split(' ').map(n => n[0]).join('') : 'MA',
    branchName: authUser?.branchName,
  };

  return (
    <SidebarLayout
      roleName="Admin Portal"
      roleIcon={<Shield size={9} />}
      navConfig={navConfig}
      user={displayUser}
      topbarTitle="Enterprise Fleet Operations"
    >
      <Outlet />
    </SidebarLayout>
  );
}
