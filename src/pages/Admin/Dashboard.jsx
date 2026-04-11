import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShipmentStore } from '../../store/shipmentStore';
import DashboardUI from '../../components/Admin/DashboardUI';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // Zustand State Management mapped purely to state (Frontend ONLY layout)
  const { 
    shipmentYear, 
    setShipmentYear,
    revenueYear,
    setRevenueYear,
    shipmentData, 
    distData, 
    recentActivities 
  } = useShipmentStore();

  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];

  return (
    <DashboardUI 
      navigate={navigate}
      shipmentYear={shipmentYear}
      setShipmentYear={setShipmentYear}
      revenueYear={revenueYear}
      setRevenueYear={setRevenueYear}
      shipmentData={shipmentData}
      distData={distData}
      recentActivities={recentActivities}
      months={months}
    />
  );
}
