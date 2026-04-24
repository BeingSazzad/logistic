import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoveLeft, Home, PackageSearch, MapPinOff, Truck } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-yellow-400/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      
      {/* Floating Icons */}
      <div className="absolute top-[15%] left-[10%] animate-bounce opacity-20 hidden md:block" style={{ animationDuration: '3s' }}>
        <MapPinOff className="text-white w-12 h-12" />
      </div>
      <div className="absolute bottom-[20%] right-[15%] animate-bounce opacity-20 hidden md:block" style={{ animationDuration: '4s' }}>
        <Truck className="text-white w-16 h-16" />
      </div>

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Main Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          
          {/* Icon Container */}
          <div className="mb-10 relative inline-block">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-3xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <PackageSearch className="w-16 h-16 text-black" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 w-6 h-6 rounded-full border-4 border-slate-900 animate-ping"></div>
          </div>

          {/* Heading */}
          <div className="relative">
            <h1 className="text-[12rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent absolute inset-x-0 -top-20 pointer-events-none select-none">
              404
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Off the Grid</h2>
          </div>

          <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            This Load didn't reach its destination. The page you're looking for is currently experiencing a <span className="text-yellow-400 font-semibold underline decoration-yellow-400/30 underline-offset-4">navigation error</span>.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 border border-slate-700 text-slate-300 font-bold rounded-2xl hover:bg-slate-700 hover:text-white hover:border-slate-600 transition-all active:scale-95"
            >
              <MoveLeft className="w-5 h-5" />
              Reroute Back
            </button>
            <Link
              to="/login"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-yellow-400 text-black font-bold rounded-2xl hover:bg-yellow-500 transition-all active:scale-95 shadow-lg shadow-yellow-900/20"
            >
              <Home className="w-5 h-5" />
              Base Station
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-slate-500 text-sm font-medium tracking-widest uppercase flex items-center justify-center gap-4">
          <span className="w-8 h-px bg-slate-800"></span>
          Error Code: 404_PAGE_NOT_FOUND
          <span className="w-8 h-px bg-slate-800"></span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
