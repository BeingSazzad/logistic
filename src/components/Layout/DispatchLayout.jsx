import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Package, MapPin, Users,
  MessageSquare, Settings, Truck, Zap
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';
import { useAuth } from '../../context/AuthContext';

const navConfig = [
  { type: 'link', to: '/dispatch',          label: 'Fleet Operations', icon: LayoutDashboard, end: true },
  { type: 'link', to: '/dispatch/jobs',     label: 'Shipment Queue', icon: Package },
  { type: 'link', to: '/dispatch/terminal', label: 'Terminal Sortation', icon: Zap },
  { type: 'link', to: '/dispatch/tracking', label: 'Tracking',  icon: MapPin },
  { type: 'link', to: '/dispatch/fleet',    label: 'Fleet',     icon: Truck },
  { type: 'link', to: '/dispatch/drivers',  label: 'Driver Directory',   icon: Users },
  { type: 'link', to: '/dispatch/messages', label: 'Comms Hub',  icon: MessageSquare },
  { type: 'link', to: '/dispatch/settings', label: 'System Settings',  icon: Settings },
];

export default function DispatchLayout() {
  const { user: authUser } = useAuth();
  const user = {
    name: authUser?.name || 'Dispatcher',
    role: authUser?.role || 'Dispatcher',
    initials: authUser?.name ? authUser.name.split(' ').map(n => n[0]).join('') : 'DX',
    branchName: authUser?.branchName,
  };

  return (
    <SidebarLayout
      roleName="Dispatcher"
      roleIcon={<Zap size={9} />}
      navConfig={navConfig}
      user={user}
      topbarTitle="Live Dispatch Operations"
      branchBadge={true}
    >
      <Outlet />
    </SidebarLayout>
  );
}
