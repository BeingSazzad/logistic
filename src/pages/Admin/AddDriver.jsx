import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Upload, Image as ImageIcon, User, Mail, Phone, MapPin, 
  FileText, Briefcase, Award, Calendar, Shield, Heart, CreditCard, 
  AlertTriangle, Hash, Building, Clock, UserCheck
} from 'lucide-react';

export default function AdminAddDriver() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleIdFront = (e) => {
    if (e.target.files && e.target.files[0]) setIdFront(e.target.files[0].name);
  };
  const handleIdBack = (e) => {
    if (e.target.files && e.target.files[0]) setIdBack(e.target.files[0].name);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      
      {/* Standardized Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/drivers')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Driver</h1>
               <span className="text-[10px] font-bold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] px-2.5 py-1 rounded-md uppercase tracking-widest leading-none">New</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
               Register a new fleet operator with full profile, documents, and work setup.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
             onClick={() => navigate('/admin/drivers')}
             className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm"
          >
            Cancel
          </button>
          <button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm group">
            <Save size={18} strokeWidth={2.5}/> Save Driver
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200/60 mb-2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
        
        {/* ── LEFT COLUMN (Col-span-2): All form sections ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           
           {/* Section 1: Personal Details */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
                 <User className="text-[#FFCC00]" size={18} />
                 <div>
                   <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Personal Information</h2>
                   <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Basic identity and contact details</p>
                 </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Full Legal Name *</label>
                    <div className="relative group">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={18}/>
                       <input type="text" placeholder="e.g. Jack Taylor" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Email Address *</label>
                    <div className="relative group">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                       <input type="email" placeholder="driver@company.com" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Mobile Phone *</label>
                    <div className="relative group">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                       <input type="text" placeholder="+61 412 000 000" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Date of Birth *</label>
                    <div className="relative group">
                       <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                       <input type="date" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">National ID / Passport</label>
                    <div className="relative group">
                       <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                       <input type="text" placeholder="ID or passport number" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                 </div>
                 <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Home Address</label>
                    <div className="relative group">
                       <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                       <input type="text" placeholder="Full residential address" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 2: License & Documents */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
                 <FileText className="text-blue-500" size={18} />
                 <div>
                   <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">License & Certifications</h2>
                   <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Driving credentials and compliance documents</p>
                 </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">License Class *</label>
                    <div className="relative group">
                       <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16}/>
                       <select className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer">
                          <option>NSW - HC (Heavy Combination)</option>
                          <option>NSW - MC (Multi Combination)</option>
                          <option>VIC - HC (Heavy Combination)</option>
                          <option>VIC - MC (Multi Combination)</option>
                          <option>QLD - HR (Heavy Rigid)</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">License Number *</label>
                    <input type="text" placeholder="e.g. HR-4412" className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">License Expiry Date *</label>
                    <input type="date" className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Medical Certificate Expiry</label>
                    <input type="date" className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Years of Experience</label>
                    <input type="number" placeholder="e.g. 5" className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                 </div>

                 {/* ID Document Upload Area */}
                 <div className="md:col-span-2 grid grid-cols-2 gap-4 pt-2">
                    <div>
                       <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">ID / License — Front</label>
                       <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-all relative">
                          <Upload size={16} className="text-gray-400 shrink-0"/>
                          <span className="text-xs font-medium text-gray-600 truncate">{idFront || 'Upload front scan'}</span>
                          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*,.pdf" onChange={handleIdFront}/>
                       </div>
                    </div>
                    <div>
                       <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">ID / License — Back</label>
                       <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-all relative">
                          <Upload size={16} className="text-gray-400 shrink-0"/>
                          <span className="text-xs font-medium text-gray-600 truncate">{idBack || 'Upload back scan'}</span>
                          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*,.pdf" onChange={handleIdBack}/>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 3: Emergency Contact */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-[#FAFAFA] flex items-center gap-3">
                 <Heart className="text-red-400" size={18} />
                 <div>
                   <h2 className="text-sm font-bold text-[#111] uppercase tracking-wide">Emergency Contact</h2>
                   <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Next of kin or emergency person</p>
                 </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Contact Name *</label>
                    <div className="relative group">
                       <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-400 transition-colors" size={16}/>
                       <input type="text" placeholder="Full name" className="w-full bg-white border border-gray-200 focus:border-red-300 rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-400/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Relationship</label>
                    <select className="w-full bg-white border border-gray-200 focus:border-red-300 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-400/20 appearance-none cursor-pointer">
                       <option>Spouse</option>
                       <option>Parent</option>
                       <option>Sibling</option>
                       <option>Friend</option>
                       <option>Other</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Contact Phone *</label>
                    <div className="relative group">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-400 transition-colors" size={16}/>
                       <input type="text" placeholder="+61 400 000 000" className="w-full bg-white border border-gray-200 focus:border-red-300 rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-400/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Contact Email</label>
                    <div className="relative group">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-400 transition-colors" size={16}/>
                       <input type="email" placeholder="email@example.com" className="w-full bg-white border border-gray-200 focus:border-red-300 rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-400/20" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* ── RIGHT COLUMN (Col-span-1): Photo, work setup, bank ── */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           
           {/* Driver Photo Upload */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
             <div className="p-4 border-b border-gray-100 bg-[#FAFAFA] text-center">
               <h2 className="text-xs font-bold text-[#111] uppercase tracking-wide flex items-center justify-center gap-2"><ImageIcon size={14} className="text-gray-400"/> Profile Photo</h2>
             </div>
             <div className="p-5">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group min-h-[240px]">
                  {photo ? (
                    <>
                      <img src={photo} alt="Driver preview" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-all">
                        <p className="text-white text-sm font-bold flex items-center gap-2"><Upload size={16}/> Change Photo</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-400 p-8">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 text-gray-300">
                        <ImageIcon size={28} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-600">Upload Driver Photo</p>
                        <p className="text-[10px] mt-1.5 leading-tight uppercase tracking-widest font-medium">JPEG or PNG — Max 5MB</p>
                      </div>
                    </div>
                  )}
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handlePhotoUpload} />
                </div>
             </div>
           </div>

           {/* Operational Config (dark card) */}
           <div className="bg-[#111] rounded-xl p-6 text-white shadow-sm border border-gray-800 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#FFCC00]/10 rounded-full blur-3xl group-hover:bg-[#FFCC00]/20 transition-all"></div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-[#FFCC00] flex items-center gap-2 relative z-10">
                 <Briefcase size={16}/> Work Setup
              </h3>
              
              <div className="space-y-5 relative z-10">
                 <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Assigned Depot *</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-[#FFCC00]/50 leading-tight">
                      <option className="text-black">Sydney Central Depot</option>
                      <option className="text-black">Melbourne North Hub</option>
                      <option className="text-black">Brisbane Port</option>
                      <option className="text-black">Adelaide Terminal</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Employment Type</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-[#FFCC00]/50 leading-tight">
                      <option className="text-black">Full-time Permanent</option>
                      <option className="text-black">Casual</option>
                      <option className="text-black">Contractor</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Default Shift</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white appearance-none cursor-pointer focus:outline-none focus:border-[#FFCC00]/50 leading-tight">
                      <option className="text-black">Morning (06:00 – 14:00)</option>
                      <option className="text-black">Afternoon (14:00 – 22:00)</option>
                      <option className="text-black">Night (22:00 – 06:00)</option>
                      <option className="text-black">Rotating</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Start Date</label>
                    <input type="date" className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-sm font-medium text-white focus:outline-none focus:border-[#FFCC00]/50" />
                 </div>
              </div>
           </div>

           {/* Bank & Payroll */}
           <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-[#FAFAFA]">
                 <h2 className="text-xs font-bold text-[#111] uppercase tracking-wide flex items-center gap-2"><CreditCard size={14} className="text-gray-400"/> Bank & Payroll</h2>
              </div>
              <div className="p-5 space-y-4">
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Bank Name</label>
                    <div className="relative group">
                       <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FFCC00] transition-colors" size={16}/>
                       <input type="text" placeholder="e.g. Commonwealth Bank" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 pl-12 pr-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">BSB Number</label>
                    <input type="text" placeholder="062-000" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Account Number</label>
                    <input type="text" placeholder="1234 5678" className="w-full bg-white border border-gray-200 focus:border-[#FFCC00] rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/20" />
                 </div>
              </div>
           </div>

           {/* Compliance Notice */}
           <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                    <AlertTriangle size={16} className="text-amber-500"/>
                 </div>
                 <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">Compliance Notice</h4>
                    <p className="text-[11px] font-medium text-gray-500 leading-relaxed">
                       All driver profiles are subject to verification. Documents will be reviewed within 24–48 hours before activation.
                    </p>
                 </div>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100">
                 <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#FFCC00] focus:ring-[#FFCC00] transition-all cursor-pointer"/>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors">I confirm all details are correct and verified</span>
                 </label>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}

