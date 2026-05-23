import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import { Play, Search, Clock, Lock, CheckCircle2, ArrowRight, Eye } from 'lucide-react';

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
        description: 'Meningkatkan kekuatan otot kaki dan keseimbangan inti badan Anda.',
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

    // Week-based logic: weeks before activeWeek are "past" (everything unlocked)
    const getFilteredActivities = () => {
        let filtered = allActivities.map(act => {
            // If looking at past weeks, unlock everything
            if (activeWeek < totalWeeks) {
                return { ...act, status: act.status === 'locked' ? 'available' as const : act.status };
            }
            return act;
        });

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(a => 
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Category filter
        if (activeFilter === 'Selesai') filtered = filtered.filter(a => a.status === 'completed');
        if (activeFilter === 'Terkunci') filtered = filtered.filter(a => a.status === 'locked');
        if (activeFilter === 'Nutrisi') filtered = filtered.filter(a => a.type === 'nutrisi');

        return filtered;
    };

    const filteredActivities = getFilteredActivities();
    const completedToday = allActivities.filter(a => a.status === 'completed').length;

    // The "today's task" is the first available activity
    const defaultTask = allActivities.find(a => a.status === 'available') || allActivities[0];
    const savedIMTStatus = typeof window !== 'undefined' ? localStorage.getItem('childIMTStatus') || 'Normal' : 'Normal';
    
    // Dynamic override based on IMT status
    let todayTask = { ...defaultTask };
    if (savedIMTStatus === 'Kurus') {
        todayTask.title = "Aktivitas Nutrisi: Stimulasi Makan";
        todayTask.description = "Bantu tingkatkan nafsu makan anak dengan aktivitas sensorik dan pemberian makan ekstra kalori kreatif";
    } else if (savedIMTStatus === 'Obesitas' || savedIMTStatus === 'Beresiko Gizi Lebih') {
        todayTask.title = "Aktivitas Fisik Ekstra (Pembakaran Kalori)";
        todayTask.description = "Ajak anak bergerak aktif selama 20 menit ekstra dengan permainan melompat ringan dan lari kecil";
    }

    return (
        <div className="min-h-screen bg-background flex w-full">
            <Head title="Aktivitas Intervensi" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto">
                        
                        {/* Page Header */}
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h1 className="text-netral leading-tight mb-1">Daftar Aktivitas Intervensi</h1>
                                <p className="text-body-bold text-netral/70">Fokus Minggu {activeWeek}: Motorik Kasar</p>
                            </div>
                            <div className="text-right hidden md:block">
                                <p className="text-small-text text-netral/60 mb-1">Progress: {completedToday}/{allActivities.length} Hari</p>
                                <div className="w-40 h-2 bg-muted rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-secondary rounded-full transition-all" 
                                        style={{ width: `${(completedToday / allActivities.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Featured Banner Card */}
                        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden mb-10 flex flex-col md:flex-row">
                            {/* Left: Image */}
                            <div className="md:w-5/12 bg-primary/5 relative min-h-[220px] overflow-hidden">
                                <img 
                                    src={todayTask.image}
                                    alt={todayTask.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Duration badge */}
                                {todayTask.duration && (
                                    <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                        <Clock className="w-3.5 h-3.5 text-secondary" />
                                        <span className="text-small-text text-netral">{todayTask.duration}</span>
                                    </div>
                                )}
                            </div>

                            {/* Right: Content */}
                            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                                <Badge variant="primary" className="mb-3 self-start">TUGAS ANDA HARI INI</Badge>
                                <h2 className="text-netral leading-tight mb-3">{todayTask.title}</h2>
                                <p className="text-body-thin text-netral/80 leading-relaxed mb-8 max-w-md">
                                    {todayTask.description}. Pastikan area bermain aman dan nyaman untuk si kecil.
                                </p>
                                <Button 
                                    variant="primary"
                                    size="lg"
                                    className="rounded-xl self-stretch"
                                    onClick={() => router.get(`/aktivitas/detail?id=${todayTask.id}`)}
                                >
                                    <Play className="w-4 h-4 mr-2" fill="currentColor" />
                                    Mulai Sesi Hari Ini
                                </Button>
                            </div>
                        </div>

                        {/* Section: Pustaka Aktivitas */}
                        <div className="mb-6">
                            <h2 className="text-netral mb-6">Pustaka Aktivitas & Riwayat</h2>
                            
                            {/* Week Pills */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {Array.from({ length: totalWeeks }, (_, i) => i + 1).map(week => (
                                    <button
                                        key={week}
                                        onClick={() => setActiveWeek(week)}
                                        className={`px-4 py-2 rounded-full text-small-text transition-all border ${
                                            activeWeek === week
                                                ? 'bg-primary border-primary text-primary-foreground'
                                                : 'bg-card border-border/60 text-netral hover:border-primary/40'
                                        }`}
                                    >
                                        Minggu {week}
                                    </button>
                                ))}
                            </div>

                            {/* Search + Filters */}
                            <div className="flex flex-col md:flex-row gap-4 mb-8">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-netral/40" />
                                    <input
                                        type="text"
                                        placeholder="Cari aktivitas..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-card border border-border/60 rounded-xl text-body-thin text-netral placeholder:text-netral/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    {filters.map(filter => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveFilter(filter)}
                                            className={`px-4 py-2 rounded-full text-small-text transition-all border ${
                                                activeFilter === filter
                                                    ? 'bg-secondary border-secondary text-primary-foreground'
                                                    : 'bg-card border-border/60 text-netral hover:border-secondary/40'
                                            }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Activity Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredActivities.map(activity => (
                                    <div 
                                        key={activity.id}
                                        className={`bg-card rounded-xl border border-border/60 shadow-sm overflow-hidden flex flex-col ${
                                            activity.status !== 'locked' ? 'cursor-pointer hover:border-primary/50 hover:shadow-md transition-all' : 'opacity-80'
                                        }`}
                                        onClick={() => {
                                            if (activity.status !== 'locked') {
                                                router.get(`/aktivitas/detail?id=${activity.id}`);
                                            }
                                        }}
                                    >
                                        {/* Image */}
                                        <div className="h-[180px] relative overflow-hidden">
                                            <img 
                                                src={activity.image} 
                                                alt={activity.title}
                                                className={`w-full h-full object-cover ${activity.status === 'locked' ? 'blur-sm' : ''}`}
                                            />
                                            
                                            {/* Status Badge */}
                                            {activity.status === 'completed' && (
                                                <div className="absolute top-4 right-4">
                                                    <Badge variant="primary" className="bg-primary text-primary-foreground">
                                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                                        SELESAI
                                                    </Badge>
                                                </div>
                                            )}
                                            {activity.status === 'locked' && (
                                                <div className="absolute inset-0 bg-netral/40 flex items-center justify-center">
                                                    <div className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                                                        <Lock className="w-4 h-4 text-netral" />
                                                        <span className="text-small-text text-netral">TERBUKA DI MINGGU {activity.lockedUntilWeek}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {activity.status === 'optional' && (
                                                <div className="absolute top-4 right-4">
                                                    <Badge variant="warning">OPSIONAL</Badge>
                                                </div>
                                            )}

                                            {/* Merits badge */}
                                            {activity.merits && activity.status !== 'locked' && (
                                                <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-small-text flex items-center gap-1">
                                                    <span>⭐</span> {activity.merits} Merit
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <h4 className="text-netral mb-2 leading-tight">{activity.title}</h4>
                                            <p className="text-small-text text-netral/70 leading-relaxed mb-6 flex-1">
                                                {activity.description}
                                            </p>
                                            <div className="mt-auto">
                                                {activity.status === 'completed' && (
                                                    <Button variant="outline" size="sm" className="w-full rounded-xl">
                                                        Tinjau Kembali
                                                    </Button>
                                                )}
                                                {activity.status === 'available' && (
                                                    <Button variant="primary" size="sm" className="w-full rounded-xl">
                                                        <Play className="w-3.5 h-3.5 mr-1.5" fill="currentColor" />
                                                        Mulai Sesi
                                                    </Button>
                                                )}
                                                {activity.status === 'locked' && (
                                                    <Button variant="ghost" size="sm" className="w-full rounded-xl" disabled>
                                                        <Lock className="w-3.5 h-3.5 mr-1.5" />
                                                        Belum Tersedia
                                                    </Button>
                                                )}
                                                {activity.status === 'optional' && (
                                                    <Button variant="secondary-outline" size="sm" className="w-full rounded-xl">
                                                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                                                        Tonton Video
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredActivities.length === 0 && (
                                <div className="text-center py-16">
                                    <p className="text-body-thin text-netral/50">Tidak ada aktivitas yang sesuai filter.</p>
                                </div>
                            )}
                        </div>
                        
                    </div>
                </main>
            </div>
        </div>
    );
}
