import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import Toast from '../Components/UI/Toast';
import VideoPlayer from '../Components/UI/VideoPlayer';
import VideoModal from '../Components/Modals/VideoModal';
import { ActivityContentType } from '../types/content';
import { ArrowLeft, CheckCircle2, Clock, Lock, Target, Layers, Square, CheckSquare, Compass, Dumbbell, Play } from 'lucide-react';

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
    type: ActivityContentType;
    title: string;
    subtitle: string;
    image: string;
    duration: string;
    /** Video-specific fields */
    videoTitle?: string;
    videoDescription?: string;
    videoDuration?: string;
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
        type: 'video',
        title: 'Latihan Merangkak Menyilang',
        subtitle: 'Membantu koordinasi otak kanan dan otak kiri.',
        image: 'https://images.unsplash.com/photo-1590698933947-a202b069a861?w=800&q=80',
        duration: '15 Menit',
        videoTitle: 'Panduan Latihan Merangkak Menyilang',
        videoDescription: 'Video panduan langkah demi langkah untuk melatih koordinasi merangkak menyilang pada anak, membantu sinkronisasi otak kanan dan kiri.',
        videoDuration: '05:30',
        checklist: [
            { label: 'Tonton Video Panduan', status: 'done' },
            { label: 'Latihan Mandiri 15 Menit', status: 'active' },
            { label: 'Catat Jurnal Perasaan', status: 'pending' },
        ],
        goals: [
            { title: 'Koordinasi Motorik', description: 'Meningkatkan sinkronisasi antara motorik kasar dan gerak responsif.' },
            { title: 'Kekuatan Inti Tubuh', description: 'Memperkuat otot punggung dan perut untuk keseimbangan berdiri.' },
        ],
        preparation: [
            { label: 'Play mat empuk & bersih', checked: true },
            { label: 'Ruang gerak bebas (minimal 2×2m)', checked: false },
            { label: 'Pencahayaan ruangan alami', checked: false },
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
        type: 'video',
        title: 'Stimulasi Berdiri Mandiri',
        subtitle: 'Meningkatkan kekuatan otot kaki dan keseimbangan inti tubuh.',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
        duration: '10 Menit',
        videoTitle: 'Panduan Stimulasi Berdiri Mandiri',
        videoDescription: 'Pelajari teknik melatih keseimbangan dan kekuatan otot kaki anak untuk persiapan berdiri mandiri tanpa pegangan.',
        videoDuration: '04:15',
        checklist: [
            { label: 'Tonton Video Panduan', status: 'done' },
            { label: 'Latihan Mandiri 10 Menit', status: 'done' },
            { label: 'Catat Jurnal Perasaan', status: 'done' },
        ],
        goals: [
            { title: 'Keseimbangan Statis', description: 'Melatih keseimbangan saat berdiri tanpa pegangan secara mandiri.' },
            { title: 'Kekuatan Otot Kaki', description: 'Menguatkan otot paha dan betis untuk persiapan langkah pertama.' },
        ],
        preparation: [
            { label: 'Pegangan rendah aman (sofa/meja kokoh)', checked: true },
            { label: 'Lantai tidak licin', checked: true },
            { label: 'Ruangan leluasa', checked: true },
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
        type: 'video',
        title: 'Motorik Halus: Koordinasi Tangan',
        subtitle: 'Menguatkan otot-otot jari tangan melalui aktivitas meremas dan menekan.',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
        duration: '10 Menit',
        videoTitle: 'Panduan Koordinasi Tangan',
        videoDescription: 'Video panduan untuk melatih kontrol presisi jari dan koordinasi mata-tangan anak melalui aktivitas bermain.',
        videoDuration: '06:00',
        checklist: [
            { label: 'Tonton Video Panduan', status: 'done' },
            { label: 'Latihan Mandiri 10 Menit', status: 'done' },
            { label: 'Catat Jurnal Perasaan', status: 'done' },
        ],
        goals: [
            { title: 'Kontrol Motorik Halus', description: 'Melatih kontrol presisi jari untuk kegiatan sehari-hari.' },
            { title: 'Koordinasi Mata-Tangan', description: 'Meningkatkan koordinasi antara penglihatan dan gerakan genggaman.' },
        ],
        preparation: [
            { label: 'Plastisin / clay lembut aman anak', checked: true },
            { label: 'Kertas gambar dan krayon besar', checked: true },
            { label: 'Manik-manik berukuran besar', checked: false },
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
        type: 'article',
        title: 'Nutrisi: Porsi Sayur',
        subtitle: 'Panduan praktis menyajikan porsi sayur yang tepat untuk anak.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        duration: '5 Menit',
        checklist: [
            { label: 'Baca Panduan Porsi', status: 'active' },
            { label: 'Praktikkan Menu Bersama Anak', status: 'pending' },
            { label: 'Catat Jurnal Evaluasi', status: 'pending' },
        ],
        goals: [
            { title: 'Gizi Seimbang', description: 'Memastikan asupan serat dan mikronutrien harian anak terpenuhi.' },
            { title: 'Kebiasaan Sehat', description: 'Membangun kebiasaan menyukai sayuran sejak dini.' },
        ],
        preparation: [
            { label: 'Piring anak warna-warni menarik', checked: false },
            { label: 'Sayuran segar beraneka warna', checked: false },
            { label: 'Cetakan makanan bentuk lucu', checked: false },
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
    const [sessionChecklists, setSessionChecklists] = useState<Record<string, ChecklistItem[]>>(() => {
        const init: Record<string, ChecklistItem[]> = {};
        Object.keys(activityData).forEach(k => {
            init[k] = activityData[k].checklist.map(c => ({ ...c }));
        });
        return init;
    });
    const [isNextUnlocked, setIsNextUnlocked] = useState(false);
    
    // Toast
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Video Modal
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id && activityData[id]) {
            setActivityId(id);
            const initial: Record<number, boolean> = {};
            activityData[id].preparation.forEach((item, idx) => {
                initial[idx] = item.checked;
            });
            setPrepChecks(initial);
        }
    }, []);

    const activity = activityData[activityId] || activityData.merangkak_menyilang;
    const currentChecklist = sessionChecklists[activityId] || activity.checklist;
    const completedSteps = currentChecklist.filter(c => c.status === 'done').length;
    const totalSteps = currentChecklist.length;
    const isVideoType = activity.type === 'video';

    const handleToggleChecklistStep = (idx: number) => {
        const item = currentChecklist[idx];

        // If it's the "Tonton Video Panduan" step and activity is video type, open modal
        if (isVideoType && item.label === 'Tonton Video Panduan' && item.status !== 'done') {
            setIsVideoModalOpen(true);
            return;
        }

        setSessionChecklists(prev => {
            const list = [...(prev[activityId] || activity.checklist)];
            const currentStatus = list[idx].status;
            list[idx] = {
                ...list[idx],
                status: currentStatus === 'done' ? 'active' : 'done'
            };
            return { ...prev, [activityId]: list };
        });
    };

    const handleCompleteSession = () => {
        setSessionChecklists(prev => ({
            ...prev,
            [activityId]: (prev[activityId] || activity.checklist).map(c => ({ ...c, status: 'done' as const }))
        }));
        setIsNextUnlocked(true);
        setToastMessage(`Sesi ${activity.title} berhasil diselesaikan! 10 Poin apresiasi telah ditambahkan.`);
        setIsToastOpen(true);
    };

    const handleVideoComplete = () => {
        // Mark "Tonton Video Panduan" step as done
        setSessionChecklists(prev => {
            const list = [...(prev[activityId] || activity.checklist)];
            const videoIdx = list.findIndex(c => c.label === 'Tonton Video Panduan');
            if (videoIdx >= 0) {
                list[videoIdx] = { ...list[videoIdx], status: 'done' };
                // If next step is pending, set it to active
                if (videoIdx + 1 < list.length && list[videoIdx + 1].status === 'pending') {
                    list[videoIdx + 1] = { ...list[videoIdx + 1], status: 'active' };
                }
            }
            return { ...prev, [activityId]: list };
        });
        setToastMessage('Video panduan telah ditonton! Lanjutkan ke langkah berikutnya.');
        setIsToastOpen(true);
    };

    return (
        <div className="min-h-screen bg-background flex w-full font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title={`Detail Aktivitas: ${activity.title} - EmoGROW`} />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto space-y-6">
                        
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column: Main Content */}
                            <div className="flex-[2] flex flex-col gap-6 min-w-0">
                                
                                {/* Back Link */}
                                <div>
                                    <Link 
                                        href="/aktivitas" 
                                        className="inline-flex items-center gap-2 bg-card text-foreground border-2 border-black px-4 py-2 rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-card-subtle active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                                    >
                                        <ArrowLeft className="w-4 h-4 stroke-[3]" />
                                        Kembali ke Daftar Aktivitas
                                    </Link>
                                </div>

                                {/* Header */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap">
                                    <div className="min-w-0 flex-1">
                                        <Badge variant="primary" className="mb-2">
                                            Panduan Sesi Intervensi
                                        </Badge>
                                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white mb-1">{activity.title}</h1>
                                        <p className="text-xs md:text-sm font-bold text-muted-foreground uppercase">{activity.subtitle}</p>
                                    </div>
                                    <div className="shrink-0 text-left md:text-right bg-card border-3 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <p className="text-xs font-black uppercase text-black dark:text-white mb-1.5">Langkah: {completedSteps}/{totalSteps} Selesai</p>
                                        <div className="w-36 h-3 bg-muted border-2 border-black rounded-full overflow-hidden p-0.5">
                                            <div 
                                                className="h-full bg-success rounded-full transition-all" 
                                                style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Main Video/Image Area */}
                                {isVideoType ? (
                                    <VideoPlayer
                                        thumbnail={activity.image}
                                        alt={activity.title}
                                        duration={activity.videoDuration || '05:00'}
                                        currentTime="00:00"
                                        progress={0}
                                        onPlayClick={() => setIsVideoModalOpen(true)}
                                    />
                                ) : (
                                    <div className="w-full rounded-2xl overflow-hidden border-3 border-black relative aspect-video bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <img 
                                            src={activity.image}
                                            alt={activity.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590698933947-a202b069a861?w=800&q=80';
                                            }}
                                        />
                                    </div>
                                )}

                                {/* CTA Button */}
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    className="w-full"
                                    onClick={handleCompleteSession}
                                >
                                    <CheckCircle2 className="w-5 h-5 mr-2 stroke-[2.5]" />
                                    Tandai Selesai Sesi Hari Ini
                                </Button>

                                {/* Bottom Cards: Goals + Preparation */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* Tujuan Stimulasi */}
                                    <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                                        <div className="flex items-center gap-3 mb-5 pb-3 border-b-3 border-black">
                                            <div className="w-9 h-9 rounded-xl bg-info text-white border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                                <Target className="w-5 h-5 stroke-[2.5]" />
                                            </div>
                                            <h3 className="text-sm font-black uppercase text-black dark:text-white">Tujuan Stimulasi</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {activity.goals.map((goal, idx) => (
                                                <div key={idx} className="flex items-start gap-3 bg-card-subtle p-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    <div className="w-6 h-6 rounded-lg bg-info/20 border border-black flex items-center justify-center shrink-0 mt-0.5">
                                                        <Compass className="w-3.5 h-3.5 text-foreground stroke-[2.5]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black uppercase text-foreground">{goal.title}</p>
                                                        <p className="text-xs font-bold text-muted-foreground leading-relaxed mt-0.5">{goal.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Persiapan Lingkungan */}
                                    <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                                        <div className="flex items-center gap-3 mb-5 pb-3 border-b-3 border-black">
                                            <div className="w-9 h-9 rounded-xl bg-primary text-black border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                                <Layers className="w-5 h-5 stroke-[2.5]" />
                                            </div>
                                            <h3 className="text-sm font-black uppercase text-black dark:text-white">Persiapan Lingkungan</h3>
                                        </div>
                                        <div className="space-y-2.5">
                                            {activity.preparation.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setPrepChecks(prev => ({ ...prev, [idx]: !prev[idx] }))}
                                                    className="w-full flex items-center gap-3 text-left p-3 rounded-xl border-2 border-black bg-card hover:bg-card-subtle shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
                                                >
                                                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                                        {prepChecks[idx] ? (
                                                            <CheckSquare className="w-5 h-5 text-foreground stroke-[2.5]" />
                                                        ) : (
                                                            <Square className="w-5 h-5 text-muted-foreground stroke-[2.5]" />
                                                        )}
                                                    </div>
                                                    <span className={`text-xs font-bold ${prepChecks[idx] ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                                        {item.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Sidebar */}
                            <div className="flex-[1] flex flex-col gap-6 min-w-0">
                                
                                {/* Checklist Sesi */}
                                <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                                    <h3 className="text-sm font-black uppercase text-black dark:text-white mb-5 pb-3 border-b-3 border-black">Checklist Sesi</h3>
                                    <div className="relative">
                                        <div className="absolute left-3.5 top-3 bottom-3 w-1 bg-black" />
                                        
                                        <div className="space-y-5">
                                            {currentChecklist.map((item, idx) => (
                                                <div 
                                                    key={idx} 
                                                    onClick={() => handleToggleChecklistStep(idx)}
                                                    className="flex items-start gap-3.5 relative cursor-pointer group"
                                                    title={
                                                        isVideoType && item.label === 'Tonton Video Panduan' && item.status !== 'done'
                                                            ? 'Klik untuk menonton video panduan'
                                                            : 'Klik untuk mengubah status langkah'
                                                    }
                                                >
                                                    <div className={`w-8 h-8 rounded-xl border-2 border-black flex items-center justify-center shrink-0 z-10 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-105 ${
                                                        item.status === 'done' 
                                                            ? 'bg-success text-black'
                                                            : item.status === 'active'
                                                                ? 'bg-primary text-black'
                                                                : 'bg-card text-muted-foreground'
                                                    }`}>
                                                        {item.status === 'done' && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                                                        {item.status === 'active' && (
                                                            isVideoType && item.label === 'Tonton Video Panduan'
                                                                ? <Play className="w-4 h-4 stroke-[3] ml-0.5" />
                                                                : <Dumbbell className="w-4 h-4 stroke-[3]" />
                                                        )}
                                                        {item.status === 'pending' && <Clock className="w-4 h-4 stroke-[2.5]" />}
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs font-black uppercase text-black dark:text-white ${item.status === 'done' ? 'line-through opacity-70' : ''}`}>{item.label}</p>
                                                        <p className={`text-[10px] font-black uppercase ${
                                                            item.status === 'done' 
                                                                ? 'text-success' 
                                                                : item.status === 'active' 
                                                                    ? 'text-primary' 
                                                                    : 'text-muted-foreground'
                                                        }`}>
                                                            {item.status === 'done' && 'Selesai'}
                                                            {item.status === 'active' && 'Sedang Berlangsung'}
                                                            {item.status === 'pending' && 'Belum Dimulai'}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Aktivitas Berikutnya */}
                                {activity.nextActivity && (() => {
                                    const isLocked = !isNextUnlocked && activity.nextActivity.locked;
                                    return (
                                        <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                                            <h3 className="text-sm font-black uppercase text-black dark:text-white mb-4 pb-3 border-b-3 border-black">Aktivitas Berikutnya</h3>
                                            <div 
                                                className={`rounded-xl overflow-hidden border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                                    isLocked ? 'bg-muted opacity-80 cursor-not-allowed' : 'bg-card cursor-pointer hover:bg-card-subtle transition-colors'
                                                }`}
                                                onClick={() => {
                                                    if (!isLocked) {
                                                        window.location.href = `/aktivitas/detail?id=${activity.nextActivity!.id}`;
                                                    }
                                                }}
                                            >
                                                <div className="relative h-[130px] bg-slate-100 border-b-2 border-black">
                                                    <img 
                                                        src={activity.nextActivity.image}
                                                        alt={activity.nextActivity.title}
                                                        className={`w-full h-full object-cover ${isLocked ? 'blur-xs opacity-50' : ''}`}
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574716954284-9db2c0a9e71e?w=400&q=80';
                                                        }}
                                                    />
                                                    {isLocked && (
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                            <div className="w-9 h-9 rounded-xl bg-card border-2 border-black flex items-center justify-center text-foreground shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                                                <Lock className="w-4 h-4 stroke-[2.5]" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4 text-center">
                                                    <p className="text-xs font-black uppercase text-black dark:text-white mb-1">{activity.nextActivity.title}</p>
                                                    {isLocked && activity.nextActivity.lockMessage && (
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
                                                            {activity.nextActivity.lockMessage}
                                                        </p>
                                                    )}
                                                    {!isLocked && (
                                                        <span className="text-[10px] bg-success text-black font-black uppercase px-2 py-0.5 rounded border border-black inline-block mt-1">
                                                            Terbuka • Klik untuk Mulai
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                        
                    </div>
                </main>

                <Toast 
                    message={toastMessage}
                    type="success"
                    isOpen={isToastOpen}
                    onClose={() => setIsToastOpen(false)}
                />

                {/* Video Modal — only for video-type activities */}
                {isVideoType && (
                    <VideoModal
                        isOpen={isVideoModalOpen}
                        onClose={() => setIsVideoModalOpen(false)}
                        title={activity.videoTitle || activity.title}
                        description={activity.videoDescription || activity.subtitle}
                        videoThumbnail={activity.image}
                        duration={activity.videoDuration || '05:00'}
                        onComplete={handleVideoComplete}
                    />
                )}
            </div>
        </div>
    );
}
