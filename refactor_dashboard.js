import fs from 'fs';

const original = fs.readFileSync('src/pages/Admin/Dashboard.jsx', 'utf8');

// Extract the imports from the original
const imports = original.match(/import.*?;\n/gs).join('');

// The UI code is essentially the return statement.
const jsxContent = original.substring(original.indexOf('return (')).slice(0, -2); // remove last }

const uiFileContent = `import React from 'react';
import { 
  Users, Truck, Package, TrendingUp, ArrowUpRight, 
  AlertTriangle, Blocks, Plus, Activity, Globe, 
  Zap, Navigation, CheckCircle, ShieldCheck, DollarSign, ChevronRight
} from 'lucide-react';

export default function DashboardUI({ 
  shipmentYear, 
  setShipmentYear, 
  revenueYear, 
  setRevenueYear, 
  recentActivities, 
  shipmentData, 
  distData, 
  months, 
  navigate 
}) {
  ${jsxContent}
}
`;

fs.writeFileSync('src/components/Admin/DashboardUI.jsx', uiFileContent);

// Creating the container Dashboard.jsx
const containerFileContent = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShipmentStore } from '../../store/shipmentStore';
import DashboardUI from '../../components/Admin/DashboardUI';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // Zustand State Management
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
`;

fs.writeFileSync('src/pages/Admin/Dashboard.jsx', containerFileContent);

// And we delete AuthContext since it's fully migrated
if (fs.existsSync('src/context/AuthContext.jsx')) {
  fs.unlinkSync('src/context/AuthContext.jsx');
}
