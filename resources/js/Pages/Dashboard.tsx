import React, { useState } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import ProgressTimelineCard from '../Components/Cards/ProgressTimelineCard';
import TaskListCard from '../Components/Cards/TaskListCard';
import { Plus, User, X, Clock, Scale, Ruler } from 'lucide-react';

// ==========================================
// SUB-KOMPONEN: PatientCard (Modern Neubrutalism)
// ==========================================
interface PatientCardProps {
  name: string;
  age: string;
  status: string;
  img: string;
  isActive?: boolean;
  onClick?: () => void;
}

function PatientCard({ name, age, status, img, isActive = false, onClick }: PatientCardProps) {
  return (
    <div
      onClick={onClick}
      className={`w-full bg-[#fffdf4] border-3 border-black rounded-2xl p-5 
        flex flex-col md:flex-row justify-between items-center gap-6 select-none transition-all duration-150
        ${isActive 
          ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#fffbe6] translate-x-[-2px] translate-y-[-2px]' 
          : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'
        }`}
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative w-16 h-16 min-w-[64px] border-3 border-black rounded-xl bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-black uppercase tracking-tight text-black leading-tight">{name}</h2>
          <div className="flex items-center gap-2">
            <span className="bg-[#00a6ff] text-white border-2 border-black px-2.5 py-0.5 text-xs font-black uppercase tracking-wide rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
              {age}
            </span>
            <span className="bg-[#a3e635] text-black border-2 border-black px-2.5 py-0.5 text-xs font-black uppercase tracking-wide rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-72 bg-white border-3 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2">
        <div className="flex justify-between items-end">
          <p className="text-xs font-black uppercase tracking-wider text-black">Progres Intervensi</p>
          <span className="text-xs font-black uppercase text-[#f472b6]">50% Selesai</span>
        </div>
        <div className="w-full bg-[#e5e7eb] border-2 border-black h-4 rounded-full overflow-hidden p-0.5">
          <div className="bg-[#f472b6] h-full rounded-full transition-all duration-500" style={{ width: '50%' }} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-KOMPONEN: SimpleMetricCard (Modern Neubrutalism)
// ==========================================
interface SimpleMetricCardProps {
  title: string;
  value: string;
  unit: string;
  subtext: string;
  icon: React.ReactNode;
  bgVariant: 'blue' | 'lime' | 'pink';
}

function SimpleMetricCard({ title, value, unit, subtext, icon, bgVariant }: SimpleMetricCardProps) {
  const bgColors = {
    blue: 'bg-[#00a6ff]',
    lime: 'bg-[#a3e635]',
    pink: 'bg-[#f472b6]',
  };

  return (
    <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-4">
      <div className="flex justify-between items-start gap-2">
        <div className="space-y-0.5">
          <p className="text-[11px] font-black uppercase tracking-wider text-black/50">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black uppercase tracking-tight text-black">{value}</span>
            <span className="text-xs font-black uppercase text-black/70">{unit}</span>
          </div>
        </div>
        <div className={`w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 ${bgColors[bgVariant]}`}>
          {icon}
        </div>
      </div>
      <div className="border-t-2 border-black/10 pt-2.5">
        <p className="text-[10px] font-black uppercase tracking-wide text-black/60">{subtext}</p>
      </div>
    </div>
  );
}

// ==========================================
// UTAMA: Dashboard Component
// ==========================================
export default function Dashboard() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const savedIMTScore = typeof window !== 'undefined' ? localStorage.getItem('childIMTScore') || '17.8' : '17.8';
    const savedIMTStatus = typeof window !== 'undefined' ? localStorage.getItem('childIMTStatus') || 'Normal' : 'Normal';

    const [children, setChildren] = useState([
        { id: 1, name: 'Aira Putri Mahesa', age: '24 Bulan', img: 'https://i.pravatar.cc/150?img=36', imt: savedIMTScore, status: savedIMTStatus }
    ]);
    const [activeChildId, setActiveChildId] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddChild = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const ageMonths = parseInt(formData.get('age') as string);
        
        if (ageMonths > 60) {
            alert('Maksimal umur anak adalah 5 tahun (60 bulan)');
            return;
        }

        setChildren([
            ...children, 
            { 
                id: Date.now(), 
                name, 
                age: `${ageMonths} Bulan`, 
                img: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`, 
                imt: '0.0', 
                status: 'Belum Diukur' 
            }
        ]);
        setShowAddModal(false);
    };

    const activeChild = children.find(c => c.id === activeChildId) || children[0];

    return (
        <div className="min-h-screen bg-[#fbfbf4] text-black flex w-full font-sans antialiased">
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <div className="max-w-6xl mx-auto space-y-6">
                        
                        {/* Header Section */}
                        <div className="px-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-3 border-black pb-5">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
                                    Selamat Datang, Ibu <span className="bg-[#a3e635] px-2 border-2 border-black inline-block rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Sari</span>
                                </h1>
                                <p className="text-xs uppercase font-extrabold text-black/50 tracking-wider mt-1">
                                    Pantau perkembangan buah hati Anda hari ini.
                                </p>
                            </div>
                            <div>
                                {children.length < 2 && (
                                    <button 
                                        onClick={() => setShowAddModal(true)}
                                        className="bg-[#f472b6] text-black border-2 border-black font-black uppercase tracking-wide text-xs px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" strokeWidth={3} /> Tambah Profil (Maks 2)
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {/* Children List */}
                        <div className="flex flex-col gap-4 w-full px-1">
                            {children.map(child => (
                                <PatientCard 
                                    key={child.id}
                                    name={child.name}
                                    age={child.age}
                                    status={child.status}
                                    img={child.img}
                                    isActive={activeChildId === child.id}
                                    onClick={() => setActiveChildId(child.id)}
                                />
                            ))}
                        </div>
                        
                        {/* Main Grid Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <ProgressTimelineCard />
                            </div>
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <TaskListCard />
                                
                                {/* ========================================== */}
                                {/* TWEAKED: Metrics Container (Simpel & Ber-radius) */}
                                {/* ========================================== */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <SimpleMetricCard 
                                        title="Waktu Aktif"
                                        value="12.5"
                                        unit="Jam"
                                        subtext="Meningkat minggu ini"
                                        icon={<Clock className="w-4 h-4" strokeWidth={3} />}
                                        bgVariant="blue"
                                    />
                                    <SimpleMetricCard 
                                        title="Berat Badan"
                                        value="12.0"
                                        unit="Kg"
                                        subtext="-0.5 kg dari bulan lalu"
                                        icon={<Scale className="w-4 h-4" strokeWidth={3} />}
                                        bgVariant="pink"
                                    />
                                    <SimpleMetricCard 
                                        title="IMT Anak"
                                        value={activeChild.imt}
                                        unit={activeChild.status}
                                        subtext="Berdasarkan standar data KMS"
                                        icon={<Ruler className="w-4 h-4" strokeWidth={3} />}
                                        bgVariant="lime"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Modal Tambah Anak */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="bg-[#fbfbf4] border-3 border-black rounded-2xl w-full max-w-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
                            <div className="bg-[#f472b6] p-5 flex justify-between items-center border-b-3 border-black">
                                <h3 className="text-sm font-black text-black uppercase tracking-wide flex items-center gap-2">
                                    <User className="w-4 h-4 text-black" strokeWidth={2.5} /> Tambah Profil Anak
                                </h3>
                                <button 
                                    onClick={() => setShowAddModal(false)} 
                                    className="p-1 bg-white border-2 border-black rounded-lg text-black hover:bg-red-200 active:translate-x-[1px] active:translate-y-[1px] transition-all"
                                >
                                    <X className="w-4 h-4" strokeWidth={2.5} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleAddChild} className="p-5 space-y-5">
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">Nama Panggilan</label>
                                        <input required name="name" type="text" className="w-full bg-white border-2 border-black rounded-xl px-3 py-2.5 font-bold text-sm text-black focus:outline-none focus:bg-yellow-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] placeholder:text-black/30" placeholder="Contoh: Budi" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">Umur (Bulan)</label>
                                        <input required name="age" type="number" min="1" className="w-full bg-white border-2 border-black rounded-xl px-3 py-2.5 font-bold text-sm text-black focus:outline-none focus:bg-yellow-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] placeholder:text-black/30" placeholder="Maksimal 60 bulan" />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-1">
                                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 px-4 rounded-xl font-black uppercase tracking-wider text-xs text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">Batal</button>
                                    <button type="submit" className="flex-1 py-2.5 px-4 rounded-xl font-black uppercase tracking-wider text-xs text-black bg-[#a3e635] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}