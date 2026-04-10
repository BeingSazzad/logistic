import React, { useState } from 'react';
import { Search, Package, MapPin, AlertTriangle, Plus, ChevronDown } from 'lucide-react';

const inventory = [
  { sku: 'SKU-001', name: 'Woolworths Full Pallet',  location: 'A1-01', qty: 24, weight: '850kg', status: 'In Stock'  },
  { sku: 'SKU-002', name: 'Coles Ambient Goods',     location: 'A2-03', qty: 12, weight: '420kg', status: 'In Stock'  },
  { sku: 'SKU-003', name: 'Amazon Parcels',           location: 'B1-08', qty: 3,  weight: '95kg',  status: 'Low Stock' },
  { sku: 'SKU-004', name: 'BigW Electronics',         location: 'B2-04', qty: 8,  weight: '280kg', status: 'In Stock'  },
  { sku: 'SKU-005', name: 'IGA Produce',              location: 'C1-01', qty: 0,  weight: '—',     status: 'Empty'     },
  { sku: 'SKU-006', name: 'Aldi Dry Goods',           location: 'A3-02', qty: 18, weight: '640kg', status: 'In Stock'  },
];

export default function WarehouseInventory() {
  const [search, setSearch] = useState('');
  const filtered = inventory.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.sku.toLowerCase().includes(search.toLowerCase()) ||
    i.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto pb-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">{inventory.length} SKUs tracked &nbsp;·&nbsp; Zone A-14 &nbsp;·&nbsp; 78% capacity used</p>
        </div>
        <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm">
          <Plus size={18} strokeWidth={3} /> Add SKU
        </button>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 px-2 mb-2">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total SKUs</p><p className="text-2xl font-black text-gray-900 mt-0.5">{inventory.length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400"><Package size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Low Stock</p><p className="text-2xl font-black text-yellow-600 mt-0.5">{inventory.filter(i => i.status === 'Low Stock').length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-50 text-yellow-500"><AlertTriangle size={20}/></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Empty Bays</p><p className="text-2xl font-black text-red-600 mt-0.5">{inventory.filter(i => i.status === 'Empty').length}</p></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-50 text-red-500"><AlertTriangle size={20}/></div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div className="relative w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none transition-all font-mono"
              placeholder="Search SKU, name or location..."
              value={search} onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Sort By <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-center">Qty</th>
                <th className="px-6 py-4">Weight</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(item => (
                <tr key={item.sku} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-6 py-5">
                    <div className="font-mono font-bold text-gray-500 text-xs">{item.sku}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Package size={15} className="text-gray-300 shrink-0" />
                      <span className="font-bold text-[#111] text-[15px]">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`font-black text-lg ${item.qty === 0 ? 'text-red-500' : item.qty < 5 ? 'text-yellow-600' : 'text-[#111]'}`}>{item.qty}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-700 text-sm">{item.weight}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-sm text-gray-600">
                      <MapPin size={12} className="text-gray-300" /> {item.location}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-md border ${
                      item.status === 'In Stock'  ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' :
                      item.status === 'Low Stock' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                    'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'
                    }`}>
                      {item.status === 'Low Stock' && <AlertTriangle size={10} className="inline mr-1" />}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
