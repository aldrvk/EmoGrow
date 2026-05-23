import React, { useState } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import PatientCard from '../Components/Cards/PatientCard';
import ProgressTimelineCard from '../Components/Cards/ProgressTimelineCard';
import TaskListCard from '../Components/Cards/TaskListCard';
import MetricCard from '../Components/Cards/MetricCard';
import { Plus, User, X } from 'lucide-react';

export default function Dashboard() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Read dynamic IMT
    const savedIMTScore = typeof window !== 'undefined' ? localStorage.getItem('childIMTScore') || '17.8' : '17.8';
    const savedIMTStatus = typeof window !== 'undefined' ? localStorage.getItem('childIMTStatus') || 'Normal' : 'Normal';

    // Mother's Dashboard State
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
        
        // Validation: Max 5 years = 60 months
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
        <div className="min-h-screen bg-background flex w-full">
            <Sidebar 
                isOpen={isMobileMenuOpen} 
                onClose={() => setIsMobileMenuOpen(false)} 
            />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="mb-6 px-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-netral text-3xl md:text-[40px] leading-tight font-bold">Selamat Datang, Ibu <span className="text-[#f472b6]">Sari</span></h1>
                                <p className="text-body-thin text-netral mt-1">Pantau perkembangan buah hati Anda hari ini.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {children.length < 2 && (
                                    <button 
                                        onClick={() => setShowAddModal(true)}
                                        className="bg-white border border-[#f472b6] text-[#f472b6] hover:bg-[#f472b6] hover:text-white transition-colors px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm"
                                    >
                                        <Plus className="w-4 h-4" /> Tambah Profil Anak (Maks 2)
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {/* Children List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <ProgressTimelineCard />
                            </div>
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <TaskListCard />
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <MetricCard 
                                        title="WAKTU AKTIF"
                                        value="12.5"
                                        unit="Jam"
                                        subtext="Bulan ini"
                                        icon="clock"
                                        variant="secondary"
                                    />
                                    <MetricCard 
                                        title="BERAT BADAN (BB)"
                                        value="12.0"
                                        unit="kg"
                                        subtext="-0.5 kg bulan ini"
                                        icon="scale"
                                        variant="secondary"
                                    />
                                    <MetricCard 
                                        title="IMT ANAK"
                                        value={activeChild.imt}
                                        unit={activeChild.status}
                                        hasBar={true}
                                        icon="ruler"
                                        variant="primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Modal Tambah Anak */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative">
                            <div className="bg-[#f472b6]/10 p-6 flex justify-between items-center border-b border-[#f472b6]/20">
                                <h3 className="text-xl font-bold text-netral flex items-center gap-2">
                                    <User className="w-5 h-5 text-[#f472b6]" /> Tambah Profil Anak
                                </h3>
                                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={handleAddChild} className="p-6">
                                <div className="space-y-4 mb-8">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Nama Panggilan Anak</label>
                                        <input required name="name" type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f472b6]/30 focus:border-[#f472b6]" placeholder="Contoh: Budi" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Umur Anak (dalam Bulan)</label>
                                        <input required name="age" type="number" min="1" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f472b6]/30 focus:border-[#f472b6]" placeholder="Maksimal 60 bulan (5 tahun)" />
                                        <p className="text-xs text-gray-400 mt-1">*Batas maksimal adalah 5 tahun atau 60 bulan.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">Batal</button>
                                    <button type="submit" className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-[#f472b6] hover:bg-[#f472b6]/90 shadow-md transition-all">Simpan Profil</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
