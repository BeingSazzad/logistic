import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoadStore } from '../../store/LoadStore';
import DashboardUI from '../../components/Admin/DashboardUI';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // Zustand State Management mapped purely to state (Frontend ONLY layout)
  const { 
    LoadYear, 
    setLoadYear,
    revenueYear,
    setRevenueYear,
    LoadData, 
    incomeData,
    metrics,
    distData, 
    recentActivities 
  } = useLoadStore();

  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];

  return (
    <DashboardUI 
      navigate={navigate}
      LoadYear={LoadYear}
      setLoadYear={setLoadYear}
      revenueYear={revenueYear}
      setRevenueYear={setRevenueYear}
      LoadData={LoadData}
      incomeData={incomeData}
      metrics={metrics}
      distData={distData}
      recentActivities={recentActivities}
      months={months}
    />
  );
}

