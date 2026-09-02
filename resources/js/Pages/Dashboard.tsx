import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import PatientCard from '../Components/Cards/PatientCard';
import MetricCard from '../Components/Cards/MetricCard';
import ProgressTimelineCard from '../Components/Cards/ProgressTimelineCard';
import TaskListCard, { TaskItem } from '../Components/Cards/TaskListCard';
import Button from '../Components/Buttons/Button';
import TextInput from '../Components/Inputs/TextInput';
import Toast from '../Components/UI/Toast';
import VideoModal from '../Components/Modals/VideoModal';
import JournalModal from '../Components/Modals/JournalModal';
import { Plus, User, X, Clock, Scale, Ruler, TrendingUp } from 'lucide-react';

const INITIAL_TASKS: TaskItem[] = [
    {
        id: 1,
        title: 'Catat Jadwal Tidur Anak',
        description: 'Catat jam tidur siang dan malam untuk observasi pola.',
        completed: true,
        type: 'check',
    },
    {
        id: 2,
        title: 'Tonton Video: Stimulasi Bahasa',
        description: 'Pelajari teknik dasar merespons ocehan bayi untuk mendorong perkembangan bahasa.',
        completed: false,
        type: 'video',
        badge: 'Penting',
        videoThumbnail: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        videoDuration: '05:24',
    },
    {
        id: 3,
        title: 'Isi Jurnal Perasaan Hari Ini',
        description: 'Luangkan waktu 2 menit untuk mencatat emosi Anda hari ini.',
        completed: false,
        type: 'journal',
    },
];

export default function Dashboard() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Toast notification state
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'warning' | 'info' | 'error'>('info');
    const [isToastOpen, setIsToastOpen] = useState(false);

    const showToast = (msg: string, type: 'success' | 'warning' | 'info' | 'error' = 'info') => {
        setToastMessage(msg);
        setToastType(type);
        setIsToastOpen(true);
    };

    const savedIMTScore = typeof window !== 'undefined' ? localStorage.getItem('childIMTScore') || '17.8' : '17.8';
    const savedIMTStatus = typeof window !== 'undefined' ? localStorage.getItem('childIMTStatus') || 'Normal' : 'Normal';
    const savedAge = typeof window !== 'undefined' ? localStorage.getItem('childAge') ? `${localStorage.getItem('childAge')} Bulan` : '24 Bulan' : '24 Bulan';
    const savedWeight = typeof window !== 'undefined' ? localStorage.getItem('childWeight') || '12.0' : '12.0';

    const [children, setChildren] = useState([
        { id: 1, name: 'Aira Putri Mahesa', age: savedAge, img: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&q=80', imt: savedIMTScore, status: savedIMTStatus, progress: 50 }
    ]);
    const [activeChildId, setActiveChildId] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);

    // Tasks State
    const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
    
    // Modals
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);

    const handleToggleTask = (taskId: number) => {
        setTasks(prev => prev.map(t => {
            if (t.id === taskId) {
                const nextState = !t.completed;
                if (nextState) {
                    showToast(`Tugas "${t.title}" berhasil diselesaikan!`, 'success');
                } else {
                    showToast(`Status tugas "${t.title}" dikembalikan ke belum selesai.`, 'info');
                }
                return { ...t, completed: nextState };
            }
            return t;
        }));
    };

    const handleCompleteVideoTask = () => {
        setTasks(prev => prev.map(t => t.id === 2 ? { ...t, completed: true } : t));
        showToast('Video stimulasi bahasa selesai ditonton! Tugas berhasil diselesaikan.', 'success');
    };

    const handleSaveJournal = (notes: string, mood: string) => {
        setTasks(prev => prev.map(t => t.id === 3 ? { ...t, completed: true } : t));
        showToast('Jurnal perasaan berhasil disimpan! Poin refleksi harian ditambahkan.', 'success');
    };

    const handleAddChild = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (children.length >= 2) {
            showToast('Maksimal batas 2 profil anak telah tercapai pada akun ini.', 'warning');
            setShowAddModal(false);
            return;
        }

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const ageMonths = parseInt(formData.get('age') as string);
        
        if (ageMonths > 60) {
            showToast('Maksimal umur anak untuk intervensi dini adalah 5 tahun (60 bulan)', 'warning');
            return;
        }

        const newChild = { 
            id: Date.now(), 
            name, 
            age: `${ageMonths} Bulan`, 
            img: `https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150&q=80`, 
            imt: '16.0', 
            status: 'Normal',
            progress: 10
        };

        setChildren([...children, newChild]);
        setActiveChildId(newChild.id);
        setShowAddModal(false);
        showToast(`Profil ${name} berhasil ditambahkan!`, 'success');
    };

    const activeChild = children.find(c => c.id === activeChildId) || children[0];

    return (
        <div className="min-h-screen bg-background text-black dark:text-slate-100 flex w-full font-sans antialiased select-none">
            <Head title="Dashboard - EmoGROW" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <div className="max-w-6xl mx-auto space-y-6">
                        
                        {/* Page Header Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 flex-wrap">
                            <div className="min-w-0 flex-1">
                                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
                                    Selamat Datang, <span className="text-primary">Ibu Sari</span> 👋
                                </h1>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-1">
                                    Pantau pertumbuhan fisik dan stimulasi perkembangan buah hati Anda hari ini.
                                </p>
                            </div>
                            <div className="shrink-0">
                                {children.length < 2 ? (
                                    <Button 
                                        variant="primary"
                                        size="md"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        <Plus className="w-4 h-4" strokeWidth={3} /> Tambah Profil Anak (Maks 2)
                                    </Button>
                                ) : (
                                    <div className="bg-card border-2 border-black px-3.5 py-2 rounded-xl text-xs font-black uppercase text-muted-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        Maks 2 Profil Anak Aktif
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Children Profiles List */}
                        <div className="flex flex-col gap-4 w-full">
                            {children.map(child => (
                                <PatientCard 
                                    key={child.id}
                                    name={child.name}
                                    age={child.age}
                                    status={child.status}
                                    img={child.img}
                                    progressPercent={child.progress}
                                    isActive={activeChildId === child.id}
                                    onClick={() => {
                                        setActiveChildId(child.id);
                                        showToast(`Beralih ke profil ${child.name}`, 'info');
                                    }}
                                />
                            ))}
                        </div>
                        
                        {/* Main Grid Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column: Timeline */}
                            <div className="lg:col-span-1">
                                <ProgressTimelineCard />
                            </div>

                            {/* Right Column: Tasks & Quick Metrics */}
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <TaskListCard 
                                    tasks={tasks}
                                    onToggleTask={handleToggleTask}
                                    onWatchVideo={() => setIsVideoModalOpen(true)}
                                    onOpenJournal={() => setIsJournalModalOpen(true)}
                                />
                                
                                {/* Quick Metrics Container */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <MetricCard 
                                        title="Waktu Aktif"
                                        value="12.5"
                                        unit="Jam"
                                        subtext="Meningkat 2.4 jam minggu ini"
                                        icon={<Clock className="w-5 h-5 text-white" strokeWidth={2.5} />}
                                        variant="blue"
                                        trendIcon={<TrendingUp className="w-3.5 h-3.5 text-black" strokeWidth={3} />}
                                    />
                                    <MetricCard 
                                        title="Berat Badan"
                                        value={savedWeight}
                                        unit="Kg"
                                        subtext="-0.5 kg menuju kurva ideal"
                                        icon={<Scale className="w-5 h-5 text-black" strokeWidth={2.5} />}
                                        variant="pink"
                                    />
                                    <MetricCard 
                                        title="IMT Anak"
                                        value={activeChild.imt}
                                        unit={`Status: ${activeChild.status}`}
                                        subtext="Berdasarkan standar WHO / KMS"
                                        icon={<Ruler className="w-5 h-5 text-black" strokeWidth={2.5} />}
                                        variant={activeChild.status === 'Normal' ? 'lime' : 'warning'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Modal Tambah Profil Anak */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
                        <div className="bg-card border-3 border-black rounded-2xl w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative animate-in zoom-in-95 duration-200">
                            <div className="bg-primary p-5 flex justify-between items-center border-b-3 border-black text-black">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-white border-2 border-black text-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                        <User className="w-5 h-5" strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-base font-black uppercase tracking-tight text-black">
                                        Tambah Profil Anak (Slot 2/2)
                                    </h3>
                                </div>
                                <button 
                                    onClick={() => setShowAddModal(false)} 
                                    className="w-8 h-8 bg-white border-2 border-black rounded-lg flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                                    aria-label="Tutup Modal"
                                >
                                    <X className="w-5 h-5" strokeWidth={3} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleAddChild} className="p-6 space-y-4">
                                <TextInput 
                                    label="Nama Panggilan Anak"
                                    name="name" 
                                    required 
                                    placeholder="Contoh: Budi" 
                                />

                                <TextInput 
                                    label="Usia Anak (Bulan)"
                                    name="age" 
                                    type="number" 
                                    min="1" 
                                    required 
                                    placeholder="Contoh: 24 (Maksimal 60)" 
                                    helperText="Usia dalam satuan bulan (1–60 bulan)"
                                />

                                <div className="flex gap-3 pt-3">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={() => setShowAddModal(false)} 
                                        className="flex-1"
                                    >
                                        Batal
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        className="flex-1"
                                    >
                                        Simpan Profil
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Video Player Modal */}
                <VideoModal 
                    isOpen={isVideoModalOpen}
                    onClose={() => setIsVideoModalOpen(false)}
                    onComplete={handleCompleteVideoTask}
                />

                {/* Journal Modal */}
                <JournalModal 
                    isOpen={isJournalModalOpen}
                    onClose={() => setIsJournalModalOpen(false)}
                    onSave={handleSaveJournal}
                />

                {/* Toast Notification */}
                <Toast 
                    message={toastMessage}
                    type={toastType}
                    isOpen={isToastOpen}
                    onClose={() => setIsToastOpen(false)}
                />
            </div>
        </div>
    );
}