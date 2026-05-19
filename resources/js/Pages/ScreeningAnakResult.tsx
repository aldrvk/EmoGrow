import React, { useState } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import { X, ChevronRight, CheckCircle2, Activity, Brain, AlertTriangle, Calendar, Utensils, Dumbbell, LineChart, Download } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

export default function ScreeningAnakResult() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex w-full">
            <Head title="Hasil Screening" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto">
                        
                        {/* Top Banner */}
                        <div className="bg-primary/5 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border border-primary/10">
                            <div>
                                <p className="text-primary text-[11px] font-bold tracking-widest uppercase mb-1">Step 2 of 2: Hasil Data</p>
                                <h1 className="text-netral text-3xl md:text-[32px] leading-tight font-bold">Hasil Screening Awal</h1>
                            </div>
                            <Link href="/screening-anak" className="flex items-center gap-2 text-primary text-sm font-medium hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors">
                                <X className="w-4 h-4" />
                                Tutup
                            </Link>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            
                            {/* Left Column: Analisis Gizi & Perkembangan */}
                            <div className="flex-[2] flex flex-col gap-4">
                                <h2 className="text-section-title text-netral mb-2">Analisis Gizi & Perkembangan</h2>
                                
                                {/* Chart Card */}
                                <div className="bg-white rounded-xl border border-border/60 p-6 shadow-sm mb-2">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-body-bold text-netral">Kurva Pertumbuhan (BMI for Age)</h3>
                                        <Link href="/screening-anak/detail" className="text-secondary text-sm font-medium hover:underline flex items-center gap-1">
                                            Lihat Detail <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                    
                                    <div className="h-[240px] w-full relative mb-4">
                                        {/* Dummy SVG for chart */}
                                        <svg className="w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
                                            {/* Grid lines */}
                                            <line x1="0" y1="40" x2="800" y2="40" stroke="#e2e8f0" strokeWidth="1" />
                                            <line x1="0" y1="120" x2="800" y2="120" stroke="#e2e8f0" strokeWidth="1" />
                                            <line x1="0" y1="200" x2="800" y2="200" stroke="#e2e8f0" strokeWidth="1" />
                                            
                                            {/* Dashed line (Normal) */}
                                            <path d="M 0 200 Q 400 120 800 40" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="6,6" opacity="0.6" />
                                            <path d="M 0 210 Q 400 140 800 80" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6,6" opacity="0.4" />
                                            
                                            {/* Solid line (Data Anak) */}
                                            <path d="M 0 210 Q 200 180 300 130" fill="none" stroke="#f59e0b" strokeWidth="4" />
                                            
                                            {/* Tooltip point */}
                                            <circle cx="300" cy="130" r="6" fill="#f59e0b" />
                                            
                                            <g transform="translate(300, 100)">
                                                <rect x="-60" y="-30" width="120" height="24" rx="4" fill="#1e293b" />
                                                <text x="0" y="-14" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Aira (24 Bln)</text>
                                                <polygon points="-6,-6 6,-6 0,0" fill="#1e293b" />
                                            </g>
                                            
                                            {/* Axes labels */}
                                            <text x="0" y="16" fill="#64748b" fontSize="10">Berat (kg)</text>
                                            <text x="760" y="236" fill="#64748b" fontSize="10">Usia (Bulan)</text>
                                        </svg>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/40">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-secondary"></div>
                                            <span className="text-small-text text-netral">Garis Normal</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                                            <span className="text-small-text text-netral">Data Anak</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Capaian Perkembangan Card */}
                                <div className="bg-white rounded-xl border border-border/60 p-6 shadow-sm">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-body-bold text-netral">Capaian Perkembangan</h3>
                                            <p className="text-body-thin text-netral/80">Berdasarkan observasi motorik & kognitif</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Motorik */}
                                        <div className="border border-border/60 rounded-lg p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Activity className="w-5 h-5 text-secondary" />
                                                <h4 className="text-body-bold text-netral">Motorik Kasar & Halus</h4>
                                            </div>
                                            <p className="text-small-text text-netral/80 mb-6 min-h-[40px]">Menunjukkan perkembangan yang sangat baik. Mampu berjalan stabil dan memegang benda kecil dengan presisi.</p>
                                            <div className="relative h-2 bg-border/40 rounded-full overflow-hidden mb-2">
                                                <div className="absolute top-0 left-0 h-full bg-secondary" style={{ width: '100%' }}></div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] text-secondary font-medium uppercase tracking-wider">Sesuai Usia</span>
                                            </div>
                                        </div>
                                        
                                        {/* Kognitif */}
                                        <div className="border border-border/60 rounded-lg p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Brain className="w-5 h-5 text-secondary" />
                                                <h4 className="text-body-bold text-netral">Kognitif & Bahasa</h4>
                                            </div>
                                            <p className="text-small-text text-netral/80 mb-6 min-h-[40px]">Responsif terhadap instruksi sederhana. Kosakata mulai berkembang pesat.</p>
                                            <div className="relative h-2 bg-border/40 rounded-full overflow-hidden mb-2">
                                                <div className="absolute top-0 left-0 h-full bg-secondary" style={{ width: '85%' }}></div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] text-secondary font-medium uppercase tracking-wider">Sesuai Usia</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Hasil & Rekomendasi Program */}
                            <div className="flex-[1] flex flex-col gap-4">
                                <h2 className="text-section-title text-netral mb-2">Hasil & Rekomendasi Program</h2>
                                
                                {/* BMI Card */}
                                <div className="bg-white rounded-xl border border-border/60 shadow-sm mb-2 overflow-hidden">
                                    <div className="h-1 bg-[#f59e0b] w-full"></div>
                                    <div className="p-8 flex flex-col items-center text-center">
                                        <p className="text-label-text text-netral font-semibold tracking-wider mb-2">INDEKS MASSA TUBUH (BMI)</p>
                                        <h3 className="text-[48px] font-bold text-netral leading-none mb-4">20.1</h3>
                                        
                                        <Badge variant="warning" className="mb-6 px-3 py-1">
                                            <AlertTriangle className="w-3.5 h-3.5 mr-1.5 inline" />
                                            Kategori: Overweight
                                        </Badge>
                                        
                                        <p className="text-body-thin text-netral/90 leading-relaxed text-sm">
                                            Berdasarkan rasio berat dan tinggi badan, anak berada sedikit di atas kurva normal untuk usianya. Jangan khawatir, ini adalah waktu yang tepat untuk melakukan penyesuaian gaya hidup dan nutrisi untuk mendukung pertumbuhan optimalnya.
                                        </p>
                                    </div>
                                </div>

                                {/* Program Intervensi Card */}
                                <div className="bg-primary/5 rounded-xl border border-primary/10 p-6">
                                    <div className="flex gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-large-text text-netral leading-tight mb-1">Program Intervensi 24 Minggu</h3>
                                            <p className="text-small-text text-netral/80 leading-relaxed">Rencana personalisasi untuk mengembalikan kurva pertumbuhan ke jalur ideal.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4 mb-8">
                                        <div className="flex gap-3 items-start">
                                            <Utensils className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-body-bold text-netral text-sm">Rencana Nutrisi Harian</p>
                                                <p className="text-small-text text-netral/70">Panduan kalori dan menu seimbang</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-start">
                                            <Dumbbell className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-body-bold text-netral text-sm">Aktivitas Fisik & Bermain</p>
                                                <p className="text-small-text text-netral/70">Modul stimulasi motorik harian</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-start">
                                            <LineChart className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-body-bold text-netral text-sm">Monitoring Berkala</p>
                                                <p className="text-small-text text-netral/70">Evaluasi perkembangan setiap 2 minggu</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-3">
                                        <Button variant="primary" className="w-full h-11">
                                            Mulai Program Sekarang
                                        </Button>
                                        <Button variant="outline" className="w-full bg-white h-11 border-border/80 text-netral hover:bg-white/50">
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Report (PDF)
                                        </Button>
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
