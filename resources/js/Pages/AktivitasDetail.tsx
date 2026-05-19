import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import { ArrowLeft, Play, CheckCircle2, Clock, Lock, Target, Layers, Square, CheckSquare, Compass, Dumbbell, Eye } from 'lucide-react';

interface ChecklistItem {
    label: string;
    status: 'done' | 'active' | 'pending';
}

interface StimGoal {
    title: string;
    description: string;
}

interface PrepItem {
    label: string;
    checked: boolean;
}

interface ActivityDetail {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    duration: string;
    checklist: ChecklistItem[];
    goals: StimGoal[];
    preparation: PrepItem[];
    nextActivity?: {
        id: string;
        title: string;
        image: string;
        locked: boolean;
        lockMessage?: string;
    };
}

const activityData: Record<string, ActivityDetail> = {
    merangkak_menyilang: {
        id: 'merangkak_menyilang',
        title: 'Latihan Merangkak Menyilang',
        subtitle: 'Membantu koordinasi otak kanan dan otak kiri.',
        image: 'https://images.unsplash.com/photo-1590698933947-a202b069a861?w=800&q=80',
        duration: '15 Menit',
        checklist: [
            { label: 'Tonton Video', status: 'done' },
            { label: 'Latihan Mandiri 15 Menit', status: 'active' },
            { label: 'Catat Jurnal', status: 'pending' },
        ],
        goals: [
            { title: 'Coordination', description: 'Meningkatkan sinkronisasi antara motorik kasar dan halus.' },
            { title: 'Core Strength', description: 'Memperkuat otot punggung dan perut untuk keseimbangan.' },
        ],
        preparation: [
            { label: 'Play mat empuk', checked: true },
            { label: 'Clear space (2×2m)', checked: false },
            { label: 'Pencahayaan alami', checked: false },
        ],
        nextActivity: {
            id: 'sensori_taktil',
            title: 'Stimulasi Sensori Taktil',
            image: 'https://images.unsplash.com/photo-1574716954284-9db2c0a9e71e?w=400&q=80',
            locked: true,
            lockMessage: 'Selesaikan sesi saat ini untuk membuka aktivitas ini.',
        },
    },
    berdiri_mandiri: {
        id: 'berdiri_mandiri',
        title: 'Stimulasi Berdiri Mandiri',
        subtitle: 'Meningkatkan kekuatan otot kaki dan keseimbangan inti.',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
        duration: '10 Menit',
        checklist: [
            { label: 'Tonton Video', status: 'done' },
            { label: 'Latihan Mandiri 10 Menit', status: 'done' },
            { label: 'Catat Jurnal', status: 'done' },
        ],
        goals: [
            { title: 'Balance', description: 'Melatih keseimbangan saat berdiri tanpa pegangan.' },
            { title: 'Leg Strength', description: 'Menguatkan otot paha dan betis untuk langkah pertama.' },
        ],
        preparation: [
            { label: 'Pegangan rendah (meja/sofa)', checked: true },
            { label: 'Lantai tidak licin', checked: true },
            { label: 'Ruangan luas', checked: true },
        ],
        nextActivity: {
            id: 'koordinasi_tangan',
            title: 'Motorik Halus: Koordinasi Tangan',
            image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=80',
            locked: false,
        },
    },
    koordinasi_tangan: {
        id: 'koordinasi_tangan',
        title: 'Motorik Halus: Koordinasi Tangan',
        subtitle: 'Menguatkan otot-otot jari tangan melalui aktivitas meremas dan menekan.',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
        duration: '10 Menit',
        checklist: [
            { label: 'Tonton Video', status: 'done' },
            { label: 'Latihan Mandiri 10 Menit', status: 'done' },
            { label: 'Catat Jurnal', status: 'done' },
        ],
        goals: [
            { title: 'Fine Motor', description: 'Melatih kontrol presisi jari untuk kegiatan sehari-hari.' },
            { title: 'Hand-Eye Coordination', description: 'Meningkatkan koordinasi antara penglihatan dan gerakan tangan.' },
        ],
        preparation: [
            { label: 'Plastisin/clay lembut', checked: true },
            { label: 'Kertas dan krayon', checked: true },
            { label: 'Manik-manik besar', checked: false },
        ],
        nextActivity: {
            id: 'merangkak_menyilang',
            title: 'Latihan Merangkak Menyilang',
            image: 'https://images.unsplash.com/photo-1590698933947-a202b069a861?w=400&q=80',
            locked: false,
        },
    },
    porsi_sayur: {
        id: 'porsi_sayur',
        title: 'Nutrisi: Porsi Sayur',
        subtitle: 'Panduan praktis menyajikan porsi sayur yang tepat untuk anak.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        duration: '5 Menit',
        checklist: [
            { label: 'Baca Panduan', status: 'active' },
            { label: 'Praktikkan Menu', status: 'pending' },
            { label: 'Catat Jurnal', status: 'pending' },
        ],
        goals: [
            { title: 'Balanced Nutrition', description: 'Memastikan asupan serat dan vitamin harian terpenuhi.' },
            { title: 'Healthy Habits', description: 'Membangun kebiasaan makan sehat sejak dini.' },
        ],
        preparation: [
            { label: 'Piring anak warna-warni', checked: false },
            { label: 'Sayuran segar', checked: false },
            { label: 'Cetakan makanan lucu', checked: false },
        ],
        nextActivity: {
            id: 'berdiri_mandiri',
            title: 'Stimulasi Berdiri Mandiri',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
            locked: false,
        },
    },
};

export default function AktivitasDetail() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activityId, setActivityId] = useState('merangkak_menyilang');
    const [prepChecks, setPrepChecks] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id && activityData[id]) {
            setActivityId(id);
            // Initialize prep checkboxes from data
            const initial: Record<number, boolean> = {};
            activityData[id].preparation.forEach((item, idx) => {
                initial[idx] = item.checked;
            });
            setPrepChecks(initial);
        }
    }, []);

    const activity = activityData[activityId] || activityData.merangkak_menyilang;
    const completedSteps = activity.checklist.filter(c => c.status === 'done').length;
    const totalSteps = activity.checklist.length;

    return (
        <div className="min-h-screen bg-background flex w-full">
            <Head title={activity.title} />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto">
                        
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column: Main Content */}
                            <div className="flex-[2] flex flex-col gap-6">
                                
                                {/* Back Link */}
                                <div>
                                    <Link 
                                        href="/aktivitas" 
                                        className="inline-flex items-center gap-2 text-netral text-body-thin hover:text-netral/70 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Kembali ke Pusat Edukasi
                                    </Link>
                                </div>

                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h1 className="text-netral leading-tight mb-2">{activity.title}</h1>
                                        <p className="text-body-bold text-netral/70">{activity.subtitle}</p>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <p className="text-small-text text-netral/60 mb-1">Progress: {completedSteps}/{totalSteps} Hari</p>
                                        <div className="w-40 h-2 bg-muted rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-secondary rounded-full transition-all" 
                                                style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Main Image/Video Area */}
                                <div className="w-full rounded-2xl overflow-hidden border border-border/60 relative aspect-video">
                                    <img 
                                        src={activity.image}
                                        alt={activity.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* CTA Button */}
                                <Button 
                                    variant="primary"
                                    size="lg"
                                    className="w-full rounded-xl"
                                >
                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                    Tandai Selesai & Lanjutkan
                                </Button>

                                {/* Bottom Cards: Goals + Preparation */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* Tujuan Stimulasi */}
                                    <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                                <Target className="w-5 h-5" />
                                            </div>
                                            <h4 className="text-netral">Tujuan Stimulasi</h4>
                                        </div>
                                        <div className="space-y-5">
                                            {activity.goals.map((goal, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                        <Compass className="w-3.5 h-3.5 text-secondary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-body-bold text-netral mb-0.5">{goal.title}</p>
                                                        <p className="text-small-text text-netral/60 leading-relaxed">{goal.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Persiapan Lingkungan */}
                                    <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                <Layers className="w-5 h-5" />
                                            </div>
                                            <h4 className="text-netral">Persiapan Lingkungan</h4>
                                        </div>
                                        <div className="space-y-4">
                                            {activity.preparation.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setPrepChecks(prev => ({ ...prev, [idx]: !prev[idx] }))}
                                                    className="w-full flex items-center gap-3 group text-left"
                                                >
                                                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                                        {prepChecks[idx] ? (
                                                            <CheckSquare className="w-5 h-5 text-secondary" />
                                                        ) : (
                                                            <Square className="w-5 h-5 text-netral/40 group-hover:text-primary transition-colors" />
                                                        )}
                                                    </div>
                                                    <span className={`text-body-thin ${prepChecks[idx] ? 'text-netral line-through' : 'text-netral'}`}>
                                                        {item.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Sidebar */}
                            <div className="flex-[1] flex flex-col gap-6">
                                
                                {/* Checklist Sesi */}
                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                    <h4 className="text-netral mb-6">Checklist Sesi</h4>
                                    <div className="relative">
                                        {/* Vertical line */}
                                        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border/40" />
                                        
                                        <div className="space-y-6">
                                            {activity.checklist.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-4 relative">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                                                        item.status === 'done' 
                                                            ? 'bg-primary text-primary-foreground'
                                                            : item.status === 'active'
                                                                ? 'bg-secondary text-primary-foreground ring-4 ring-secondary/20'
                                                                : 'bg-muted text-netral/40'
                                                    }`}>
                                                        {item.status === 'done' && <CheckCircle2 className="w-4 h-4" />}
                                                        {item.status === 'active' && <Dumbbell className="w-4 h-4" />}
                                                        {item.status === 'pending' && <Clock className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-body-bold text-netral">{item.label}</p>
                                                        <p className={`text-small-text ${
                                                            item.status === 'done' 
                                                                ? 'text-primary' 
                                                                : item.status === 'active' 
                                                                    ? 'text-secondary' 
                                                                    : 'text-netral/50'
                                                        }`}>
                                                            {item.status === 'done' && 'Selesai'}
                                                            {item.status === 'active' && 'Sedang Berlangsung'}
                                                            {item.status === 'pending' && 'Belum dimulai'}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Aktivitas Berikutnya */}
                                {activity.nextActivity && (
                                    <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                        <h4 className="text-netral mb-4">Aktivitas Berikutnya</h4>
                                        <div 
                                            className={`rounded-xl overflow-hidden border border-border/40 ${
                                                activity.nextActivity.locked ? '' : 'cursor-pointer hover:border-primary/50 transition-colors'
                                            }`}
                                            onClick={() => {
                                                if (!activity.nextActivity!.locked) {
                                                    window.location.href = `/aktivitas/detail?id=${activity.nextActivity!.id}`;
                                                }
                                            }}
                                        >
                                            <div className="relative h-[140px]">
                                                <img 
                                                    src={activity.nextActivity.image}
                                                    alt={activity.nextActivity.title}
                                                    className={`w-full h-full object-cover ${activity.nextActivity.locked ? 'blur-sm opacity-60' : ''}`}
                                                />
                                                {activity.nextActivity.locked && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Lock className="w-8 h-8 text-netral/60" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 text-center">
                                                <p className="text-body-bold text-netral mb-1">{activity.nextActivity.title}</p>
                                                {activity.nextActivity.lockMessage && (
                                                    <p className="text-small-text text-netral/50 leading-relaxed">
                                                        {activity.nextActivity.lockMessage}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </main>
            </div>
        </div>
    );
}
