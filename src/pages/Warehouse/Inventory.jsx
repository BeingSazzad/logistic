import React, { useState } from 'react';
import { Search, Package, MapPin, AlertTriangle } from 'lucide-react';

const inventory = [
  { sku: 'SKU-001',  name: 'Woolworths Full Pallet',   location: 'A1-01', qty: 24, weight: '850kg', status: 'In Stock'  },
  { sku: 'SKU-002',  name: 'Coles Ambient Goods',      location: 'A2-03', qty: 12, weight: '420kg', status: 'In Stock'  },
  { sku: 'SKU-003',  name: 'Amazon Parcels',           location: 'B1-08', qty: 3,  weight: '95kg',  status: 'Low Stock' },
  { sku: 'SKU-004',  name: 'BigW Electronics',         location: 'B2-04', qty: 8,  weight: '280kg', status: 'In Stock'  },
  { sku: 'SKU-005',  name: 'IGA Produce',              location: 'C1-01', qty: 0,  weight: '—',     status: 'Empty'     },
  { sku: 'SKU-006',  name: 'Aldi Dry Goods',           location: 'A3-02', qty: 18, weight: '640kg', status: 'In Stock'  },
];

const statusCfg = {
  'In Stock':  { bg: 'bg-green-100',  text: 'text-green-700'  },
  'Low Stock': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Empty':     { bg: 'bg-red-100',    text: 'text-red-700'    },
};

export default function WarehouseInventory() {
  const [search, setSearch] = useState('');
  const filtered = inventory.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.sku.toLowerCase().includes(search.toLowerCase()) ||
    i.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">{inventory.length} SKUs · Zone A-14</p>
        </div>
        <div className="text-right text-sm">
          <p className="font-bold text-gray-900">78% capacity used</p>
          <div className="w-40 h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-yellow-400 rounded-full w-[78%]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total SKUs',   value: inventory.length,                           color: 'text-gray-900' },
          { label: 'Low Stock',    value: inventory.filter(i=>i.status==='Low Stock').length, color: 'text-yellow-600' },
          { label: 'Empty Bays',   value: inventory.filter(i=>i.status==='Empty').length,     color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="relative w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input className="input pl-9 font-mono" placeholder="Search SKU, name or location..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-center">Qty</th>
              <th className="px-6 py-4">Weight</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(item => {
              const cfg = statusCfg[item.status];
              return (
                <tr key={item.sku} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-gray-600 text-xs">{item.sku}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Package size={15} className="text-gray-400 shrink-0" />
                      <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-900">{item.qty}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{item.weight}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 font-mono text-sm text-gray-700">
                      <MapPin size={12} className="text-gray-400" /> {item.location}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}>
                      {item.status === 'Low Stock' && <AlertTriangle size={10} />}
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
