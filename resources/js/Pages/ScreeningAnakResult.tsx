import React, { useState } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import { X, ChevronRight, CheckCircle2, Activity, Brain, AlertTriangle, Calendar, Utensils, Dumbbell, LineChart, Download } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { getBMIStatusStyle } from '../utils/bmi';

export default function ScreeningAnakResult() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Ambil data screening dari localStorage
    const savedIMTScore = typeof window !== 'undefined' ? localStorage.getItem('childIMTScore') || '20.1' : '20.1';
    const savedIMTStatus = typeof window !== 'undefined' ? localStorage.getItem('childIMTStatus') || 'Beresiko Gizi Lebih' : 'Beresiko Gizi Lebih';
    const savedAge = typeof window !== 'undefined' ? localStorage.getItem('childAge') || '24' : '24';
    const savedWeight = typeof window !== 'undefined' ? localStorage.getItem('childWeight') || '13.5' : '13.5';
    const savedHeight = typeof window !== 'undefined' ? localStorage.getItem('childHeight') || '84.0' : '84.0';

    const statusStyle = getBMIStatusStyle(savedIMTStatus);

    const getInterpretationText = () => {
        if (savedIMTStatus === 'Kurus') {
            return `Berdasarkan rasio berat badan (${savedWeight} kg) dan tinggi badan (${savedHeight} cm), anak berada di bawah rentang kurva ideal median WHO. Dianjurkan peningkatan asupan kalori padat nutrisi dan pemantauan nafsu makan berkala.`;
        }
        if (savedIMTStatus === 'Obesitas' || savedIMTStatus === 'Beresiko Gizi Lebih' || savedIMTStatus === 'Gizi Lebih') {
            return `Berdasarkan rasio berat badan (${savedWeight} kg) dan tinggi badan (${savedHeight} cm), anak berada sedikit di atas kurva normal untuk usianya (${savedAge} bulan). Penyesuaian porsi makan seimbang dan aktivitas bermain aktif disarankan untuk menjaga kurva tetap optimal.`;
        }
        return `Berdasarkan rasio berat badan (${savedWeight} kg) dan tinggi badan (${savedHeight} cm), pertumbuhan anak berada dalam rentang kurva normal ideal WHO. Pertahankan pola nutrisi seimbang dan rutinitas stimulasi aktif setiap hari.`;
    };

    return (
        <div className="min-h-screen bg-background flex w-full font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title="Hasil Screening - EmoGROW" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto space-y-6">
                        
                        {/* Top Banner */}
                        <div className="bg-card rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-wrap">
                            <div className="min-w-0 flex-1">
                                <Badge variant="primary" className="mb-2">
                                    Langkah 2 dari 2: Hasil Analisis
                                </Badge>
                                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
                                    Hasil Screening Awal Anak
                                </h1>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-1">
                                    Ringkasan analisis status gizi dan evaluasi stimulasi perkembangan motorik ({savedAge} Bulan).
                                </p>
                            </div>
                            <Link 
                                href="/screening-anak" 
                                className="shrink-0 flex items-center gap-2 bg-card text-foreground border-2 border-black px-4 py-2 rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-card-subtle active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                            >
                                <X className="w-4 h-4 stroke-[3]" />
                                Input Ulang
                            </Link>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6">
                            
                            {/* Left Column: Analisis Gizi & Perkembangan */}
                            <div className="flex-[2] flex flex-col gap-6 min-w-0">
                                
                                {/* Chart Card */}
                                <div className="bg-card rounded-2xl border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pb-3 border-b-3 border-black flex-wrap">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-base font-black uppercase text-black dark:text-white">Kurva Pertumbuhan (IMT terhadap Usia)</h3>
                                            <p className="text-xs font-bold text-muted-foreground uppercase">Standar Kurva Pertumbuhan Anak WHO</p>
                                        </div>
                                        <Link 
                                            href="/screening-anak/detail" 
                                            className="shrink-0 bg-info text-white border-2 border-black px-3 py-1 text-xs font-black uppercase rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-1"
                                        >
                                            Detail Kurva <ChevronRight className="w-4 h-4 stroke-[3]" />
                                        </Link>
                                    </div>
                                    
                                    <div className="h-[240px] w-full relative mb-4 bg-card rounded-xl p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <svg className="w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
                                            {/* Grid lines */}
                                            <line x1="0" y1="40" x2="800" y2="40" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />
                                            <line x1="0" y1="120" x2="800" y2="120" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />
                                            <line x1="0" y1="200" x2="800" y2="200" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />
                                            
                                            {/* Dashed line (Normal WHO Standar) */}
                                            <path d="M 0 200 Q 400 120 800 40" fill="none" stroke="#65a30d" strokeWidth="3" strokeDasharray="6,6" />
                                            <path d="M 0 210 Q 400 140 800 80" fill="none" stroke="#a3e635" strokeWidth="3" strokeDasharray="6,6" />
                                            
                                            {/* Solid line (Data Anak) */}
                                            <path d="M 0 210 Q 200 180 300 130" fill="none" stroke="currentColor" className="text-black dark:text-white" strokeWidth="4" />
                                            
                                            {/* Tooltip point */}
                                            <circle cx="300" cy="130" r="7" fill="#f472b6" stroke="black" strokeWidth="2.5" />
                                            
                                            <g transform="translate(300, 100)">
                                                <rect x="-70" y="-30" width="140" height="24" rx="6" fill="#000" />
                                                <text x="0" y="-14" fill="#a3e635" fontSize="11" fontWeight="900" textAnchor="middle">Aira ({savedAge} Bln, {savedWeight}kg)</text>
                                                <polygon points="-5,-6 5,-6 0,0" fill="#000" />
                                            </g>
                                            
                                            {/* Axes labels */}
                                            <text x="10" y="24" fill="currentColor" className="text-black dark:text-slate-200" fontSize="10" fontWeight="900">Berat (kg)</text>
                                            <text x="710" y="230" fill="currentColor" className="text-black dark:text-slate-200" fontSize="10" fontWeight="900">Usia (Bulan)</text>
                                        </svg>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-6 mt-3 pt-3 border-t-2 border-black/10 text-xs font-black uppercase">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3.5 h-3.5 rounded border border-black bg-success"></div>
                                            <span className="text-black dark:text-white">Rentang Normal WHO</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3.5 h-3.5 rounded border border-black bg-primary"></div>
                                            <span className="text-black dark:text-white">Kurva Pertumbuhan Anak</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Capaian Perkembangan Card */}
                                <div className="bg-card rounded-2xl border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex items-start gap-3.5 mb-5 pb-3 border-b-3 border-black">
                                        <div className="w-10 h-10 rounded-xl bg-success text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black uppercase text-black dark:text-white">Capaian Perkembangan</h3>
                                            <p className="text-xs font-bold text-muted-foreground uppercase">Berdasarkan hasil observasi motorik & kognitif anak</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Motorik */}
                                        <div className="border-2 border-black rounded-xl p-4 bg-card-subtle shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Activity className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
                                                <h4 className="text-sm font-black uppercase text-black dark:text-white">Motorik Kasar & Halus</h4>
                                            </div>
                                            <p className="text-xs font-bold text-muted-foreground leading-relaxed mb-4">
                                                Menunjukkan perkembangan yang sangat baik. Mampu berjalan stabil dan memegang benda kecil dengan presisi.
                                            </p>
                                            <div className="h-3 bg-muted border-2 border-black rounded-full overflow-hidden mb-1.5 p-0.5">
                                                <div className="h-full bg-success rounded-full" style={{ width: '100%' }}></div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-black uppercase text-black dark:text-white">Sesuai Usia (100%)</span>
                                            </div>
                                        </div>
                                        
                                        {/* Kognitif */}
                                        <div className="border-2 border-black rounded-xl p-4 bg-card-subtle shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Brain className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
                                                <h4 className="text-sm font-black uppercase text-black dark:text-white">Kognitif & Bahasa</h4>
                                            </div>
                                            <p className="text-xs font-bold text-muted-foreground leading-relaxed mb-4">
                                                Responsif terhadap instruksi sederhana. Kosakata awal mulai berkembang dengan ritme yang baik.
                                            </p>
                                            <div className="h-3 bg-muted border-2 border-black rounded-full overflow-hidden mb-1.5 p-0.5">
                                                <div className="h-full bg-info rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-black uppercase text-black dark:text-white">Sesuai Usia (85%)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Hasil & Rekomendasi Program */}
                            <div className="flex-[1] flex flex-col gap-6">
                                
                                {/* BMI Card */}
                                <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                    <div className={`h-2 border-b-2 border-black w-full ${statusStyle.bgClass}`}></div>
                                    <div className="p-6 flex flex-col items-center text-center">
                                        <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2">Indeks Massa Tubuh (IMT)</p>
                                        <h3 className="text-5xl font-black text-black dark:text-white mb-3">{savedIMTScore}</h3>
                                        
                                        <Badge variant={statusStyle.variant} className="mb-4">
                                            {savedIMTStatus === 'Normal' && <CheckCircle2 className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />}
                                            {savedIMTStatus !== 'Normal' && <AlertTriangle className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />}
                                            Status: {savedIMTStatus}
                                        </Badge>
                                        
                                        <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                                            {getInterpretationText()}
                                        </p>
                                    </div>
                                </div>

                                {/* Program Intervensi Card */}
                                <div className="bg-card-subtle rounded-2xl border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-primary text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                            <Calendar className="w-5 h-5 stroke-[2.5]" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black uppercase text-black dark:text-white leading-tight">Program Intervensi 24 Minggu</h3>
                                            <p className="text-[10px] font-extrabold uppercase text-muted-foreground mt-0.5">Rencana personalisasi kurva ideal</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex gap-2.5 items-start">
                                            <Utensils className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" strokeWidth={2.5} />
                                            <div>
                                                <p className="text-xs font-black uppercase text-black dark:text-white">Rencana Nutrisi Harian</p>
                                                <p className="text-[11px] font-bold text-muted-foreground">Panduan kalori dan menu gizi seimbang</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2.5 items-start">
                                            <Dumbbell className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" strokeWidth={2.5} />
                                            <div>
                                                <p className="text-xs font-black uppercase text-black dark:text-white">Aktivitas Fisik & Bermain</p>
                                                <p className="text-[11px] font-bold text-muted-foreground">Modul stimulasi gerak harian</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2.5 items-start">
                                            <LineChart className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" strokeWidth={2.5} />
                                            <div>
                                                <p className="text-xs font-black uppercase text-black dark:text-white">Monitoring Berkala</p>
                                                <p className="text-[11px] font-bold text-muted-foreground">Evaluasi perkembangan setiap 2 minggu</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-3">
                                        <Link href="/aktivitas" className="w-full">
                                            <Button variant="primary" size="md" className="w-full">
                                                Mulai Program Sekarang
                                            </Button>
                                        </Link>
                                        
                                        {/* Disabled PDF download button with Segera Hadir */}
                                        <button 
                                            disabled
                                            className="w-full h-11 px-4 rounded-xl border-2 border-black bg-muted text-muted-foreground/60 text-xs font-black uppercase flex items-center justify-center gap-2 cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] select-none"
                                            title="Fitur ekspor PDF sedang dalam pengembangan untuk integrasi sistem rekam medis"
                                        >
                                            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                                            <span>Unduh Laporan (PDF)</span>
                                            <span className="text-[9px] bg-warning text-black border border-black px-1.5 py-0.5 rounded font-black uppercase">Segera Hadir</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </main>
            </div>
        </div>
    );
}

