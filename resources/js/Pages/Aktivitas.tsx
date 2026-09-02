import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import { Play, Search, Clock, Lock, CheckCircle2, Eye, BookOpen } from 'lucide-react';

interface ActivityItem {
    id: string;
    title: string;
    description: string;
    image: string;
    type: 'video' | 'nutrisi' | 'stimulasi';
    duration?: string;
    merits?: number;
    status: 'completed' | 'available' | 'locked' | 'optional';
    lockedUntilWeek?: number;
}

const allActivities: ActivityItem[] = [
    {
        id: 'merangkak_menyilang',
        title: 'Latihan Merangkak Menyilang',
        description: 'Membantu koordinasi otak kanan dan otak kiri melalui gerakan menyilang tangan dan kaki.',
        image: 'https://images.unsplash.com/photo-1590698933947-a202b069a861?w=400&q=80',
        type: 'stimulasi',
        duration: '15 Menit',
        status: 'available',
    },
    {
        id: 'berdiri_mandiri',
        title: 'Stimulasi Berdiri Mandiri',
        description: 'Meningkatkan kekuatan otot kaki dan keseimbangan inti badan si kecil.',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
        type: 'stimulasi',
        duration: '10 Menit',
        status: 'completed',
    },
    {
        id: 'keseimbangan',
        title: 'Latihan Keseimbangan',
        description: 'Mempersiapkan si kecil untuk langkah pertama yang lebih stabil.',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=80',
        type: 'stimulasi',
        duration: '15 Menit',
        status: 'locked',
        lockedUntilWeek: 13,
    },
    {
        id: 'porsi_sayur',
        title: 'Nutrisi: Porsi Sayur',
        description: 'Panduan praktis menyajikan porsi sayur yang tepat untuk mendukung pertumbuhan tulang.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
        type: 'nutrisi',
        merits: 5,
        status: 'optional',
    },
    {
        id: 'koordinasi_tangan',
        title: 'Motorik Halus: Koordinasi Tangan',
        description: 'Latihan meremas dan menekan untuk menguatkan otot-otot jari tangan.',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=80',
        type: 'stimulasi',
        duration: '10 Menit',
        status: 'completed',
    },
    {
        id: 'sensori_taktil',
        title: 'Stimulasi Sensori Taktil',
        description: 'Mengenalkan berbagai tekstur kepada anak untuk merangsang perkembangan sensorik.',
        image: 'https://images.unsplash.com/photo-1574716954284-9db2c0a9e71e?w=400&q=80',
        type: 'stimulasi',
        duration: '20 Menit',
        status: 'locked',
        lockedUntilWeek: 14,
    },
];

export default function Aktivitas() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeWeek, setActiveWeek] = useState(12);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Semua');

    const filters = ['Semua', 'Selesai', 'Terkunci', 'Nutrisi'];
    const totalWeeks = 12;

    const getFilteredActivities = () => {
        let filtered = allActivities.map(act => {
            if (activeWeek < totalWeeks) {
                return { ...act, status: act.status === 'locked' ? 'available' as const : act.status };
            }
            return act;
        });

        if (searchQuery) {
            filtered = filtered.filter(a => 
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeFilter === 'Selesai') filtered = filtered.filter(a => a.status === 'completed');
        if (activeFilter === 'Terkunci') filtered = filtered.filter(a => a.status === 'locked');
        if (activeFilter === 'Nutrisi') filtered = filtered.filter(a => a.type === 'nutrisi');

        return filtered;
    };

    const filteredActivities = getFilteredActivities();
    const completedToday = allActivities.filter(a => a.status === 'completed').length;

    const defaultTask = allActivities.find(a => a.status === 'available') || allActivities[0];
    const savedIMTStatus = typeof window !== 'undefined' ? localStorage.getItem('childIMTStatus') || 'Normal' : 'Normal';
    
    let todayTask = { ...defaultTask };
    if (savedIMTStatus === 'Kurus') {
        todayTask.title = "Aktivitas Nutrisi: Stimulasi Makan";
        todayTask.description = "Bantu tingkatkan nafsu makan anak dengan aktivitas sensorik dan pemberian makan ekstra kalori kreatif";
    } else if (savedIMTStatus === 'Obesitas' || savedIMTStatus === 'Beresiko Gizi Lebih') {
        todayTask.title = "Aktivitas Fisik Ekstra (Pembakaran Kalori)";
        todayTask.description = "Ajak anak bergerak aktif selama 20 menit ekstra dengan permainan melompat ringan dan lari kecil";
    }

    return (
        <div className="min-h-screen bg-background flex w-full font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title="Aktivitas Harian - EmoGROW" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto space-y-8">
                        
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap">
                            <div className="min-w-0 flex-1">
                                <Badge variant="primary" className="mb-2">
                                    Program Stimulasi Mingguan
                                </Badge>
                                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white mb-1">
                                    Daftar Aktivitas Intervensi
                                </h1>
                                <p className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wide">
                                    Fokus Minggu {activeWeek}: Stimulasi Motorik Kasar & Sensorik
                                </p>
                            </div>
                            <div className="shrink-0 text-left sm:text-right w-full sm:w-auto bg-card border-3 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-xs font-black uppercase text-black dark:text-white mb-1.5">
                                    Progres: <span>{completedToday}/{allActivities.length} Aktivitas Selesai</span>
                                </p>
                                <div className="w-full sm:w-44 h-3 bg-muted border-2 border-black rounded-full overflow-hidden p-0.5">
                                    <div 
                                        className="h-full bg-success rounded-full transition-all duration-500" 
                                        style={{ width: `${(completedToday / allActivities.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Featured Banner Card */}
                        <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row">
                            {/* Left: Image */}
                            <div className="md:w-5/12 bg-card-subtle border-b-3 md:border-b-0 md:border-r-3 border-black relative min-h-[220px] overflow-hidden">
                                <img 
                                    src={todayTask.image}
                                    alt={todayTask.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590698933947-a202b069a861?w=400&q=80';
                                    }}
                                />
                                {todayTask.duration && (
                                    <div className="absolute bottom-4 left-4 bg-card border-2 border-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase text-foreground">
                                        <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                                        <span>{todayTask.duration}</span>
                                    </div>
                                )}
                            </div>

                            {/* Right: Content */}
                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center items-start bg-card">
                                <Badge variant="primary" className="mb-3">
                                    Tugas Anda Hari Ini
                                </Badge>
                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black dark:text-white leading-tight mb-2">
                                    {todayTask.title}
                                </h2>
                                <p className="text-xs md:text-sm font-bold text-muted-foreground leading-relaxed mb-6 max-w-lg">
                                    {todayTask.description}. Pastikan area bermain aman dan nyaman untuk si kecil.
                                </p>
                                <Button 
                                    variant="primary"
                                    size="md"
                                    onClick={() => router.get(`/aktivitas/detail?id=${todayTask.id}`)}
                                >
                                    <Play className="w-4 h-4 mr-1.5 fill-black stroke-black" />
                                    Mulai Sesi Hari Ini
                                </Button>
                            </div>
                        </div>

                        {/* Section: Pustaka Aktivitas */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b-3 border-black">
                                <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-black dark:text-white">Pustaka Aktivitas & Riwayat</h2>
                            </div>
                            
                            {/* Week Pills */}
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: totalWeeks }, (_, i) => i + 1).map(week => (
                                    <button
                                        key={week}
                                        onClick={() => setActiveWeek(week)}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer border-2 border-black ${
                                            activeWeek === week
                                                ? 'bg-primary text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                                                : 'bg-card text-foreground hover:bg-muted shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]'
                                        }`}
                                    >
                                        Minggu {week}
                                    </button>
                                ))}
                            </div>

                            {/* Search + Filters */}
                            <div className="flex flex-col md:flex-row gap-3 pt-1">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground stroke-[2.5]" />
                                    <input
                                        type="text"
                                        placeholder="Cari aktivitas stimulasi..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-card border-2 border-black rounded-xl text-xs md:text-sm font-bold text-foreground placeholder:text-muted-foreground/60 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {filters.map(filter => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveFilter(filter)}
                                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer border-2 border-black ${
                                                activeFilter === filter
                                                    ? 'bg-info text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                                                    : 'bg-card text-foreground hover:bg-muted shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]'
                                            }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Activity Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                                {filteredActivities.map(activity => (
                                    <div 
                                        key={activity.id}
                                        className={`bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col transition-all group ${
                                            activity.status !== 'locked' ? 'cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'opacity-75'
                                        }`}
                                        onClick={() => {
                                            if (activity.status !== 'locked') {
                                                router.get(`/aktivitas/detail?id=${activity.id}`);
                                            }
                                        }}
                                    >
                                        {/* Image */}
                                        <div className="h-[170px] relative overflow-hidden bg-slate-100 border-b-2 border-black">
                                            <img 
                                                src={activity.image} 
                                                alt={activity.title}
                                                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${activity.status === 'locked' ? 'blur-xs' : ''}`}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=80';
                                                }}
                                            />
                                            
                                            {/* Status Badge */}
                                            {activity.status === 'completed' && (
                                                <div className="absolute top-3 right-3">
                                                    <Badge variant="success">
                                                        <CheckCircle2 className="w-3 h-3 mr-1 stroke-[2.5]" />
                                                        Selesai
                                                    </Badge>
                                                </div>
                                            )}
                                            {activity.status === 'locked' && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-2">
                                                    <div className="bg-card border-2 border-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                        <Lock className="w-3.5 h-3.5 text-foreground stroke-[2.5]" />
                                                        <span className="text-[10px] font-black uppercase text-foreground">Terbuka di Minggu {activity.lockedUntilWeek}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {activity.status === 'optional' && (
                                                <div className="absolute top-3 right-3">
                                                    <Badge variant="warning">Opsional</Badge>
                                                </div>
                                            )}

                                            {/* Merits badge */}
                                            {activity.merits && activity.status !== 'locked' && (
                                                <div className="absolute bottom-3 right-3 bg-warning text-black border-2 border-black px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                                    <span>⭐</span> {activity.merits} Poin Apresiasi
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-1 bg-card">
                                            <h3 className="text-base font-black uppercase text-black dark:text-white mb-1.5 leading-snug">
                                                {activity.title}
                                            </h3>
                                            <p className="text-xs font-bold text-muted-foreground leading-relaxed mb-4 flex-1">
                                                {activity.description}
                                            </p>
                                            <div className="mt-auto">
                                                {activity.status === 'completed' && (
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        Tinjau Kembali
                                                    </Button>
                                                )}
                                                {activity.status === 'available' && (
                                                    <Button variant="primary" size="sm" className="w-full">
                                                        <Play className="w-3.5 h-3.5 mr-1 fill-black stroke-black" />
                                                        Mulai Sesi
                                                    </Button>
                                                )}
                                                {activity.status === 'locked' && (
                                                    <Button variant="ghost" size="sm" className="w-full opacity-50 cursor-not-allowed" disabled>
                                                        <Lock className="w-3.5 h-3.5 mr-1" />
                                                        Belum Tersedia
                                                    </Button>
                                                )}
                                                {activity.status === 'optional' && (
                                                    <Button variant="secondary" size="sm" className="w-full">
                                                        {activity.type === 'nutrisi' ? (
                                                            <>
                                                                <BookOpen className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />
                                                                Baca Panduan
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Eye className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />
                                                                Tonton Video
                                                            </>
                                                        )}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredActivities.length === 0 && (
                                <div className="text-center py-16 bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-xs md:text-sm font-black uppercase text-muted-foreground">Tidak ada aktivitas yang sesuai dengan filter pencarian.</p>
                                </div>
                            )}
                        </div>
                        
                    </div>
                </main>
            </div>
        </div>
    );
}
