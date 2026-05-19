import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import { Clock, ArrowRight, Play, Eye, HelpCircle } from 'lucide-react';

export default function Edukasi() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const categories = ['Semua', 'Pertumbuhan', 'Perkembangan', 'Video', 'Infografis'];
    const [activeCategory, setActiveCategory] = useState('Semua');

    return (
        <div className="min-h-screen bg-background flex w-full">
            <Head title="Pusat Edukasi" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto">
                        
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-netral text-3xl md:text-[36px] leading-tight font-bold mb-6">Pusat Edukasi EmoGROW</h1>
                            
                            {/* Filter Pills */}
                            <div className="flex flex-wrap gap-3">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                                            activeCategory === category 
                                                ? 'bg-primary border-primary text-white' 
                                                : 'bg-white border-border/60 text-netral hover:bg-netral/5'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Content Card */}
                        <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden mb-12 flex flex-col md:flex-row">
                            {/* Left: Image Placeholder */}
                            <div className="md:w-5/12 bg-[#e8eee8] relative min-h-[250px] md:min-h-full flex items-center justify-center p-6">
                                {/* Simulated Book/Module Graphic */}
                                <div className="w-[180px] h-[240px] bg-[#9ed5c5] shadow-lg flex flex-col items-center justify-center text-white relative z-10 p-6 text-center border-l-4 border-[#7ab5a3]">
                                    <div className="w-12 h-12 border-2 border-white/50 rounded-full mb-3 flex items-center justify-center">
                                        <div className="w-6 h-6 border-2 border-white/50 rounded-full relative">
                                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full"></div>
                                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-1 opacity-80">MODUL</p>
                                    <h3 className="font-serif text-lg font-bold tracking-wider leading-tight">EMOGROW</h3>
                                    <p className="text-[6px] opacity-60 mt-4 leading-relaxed">PANDUAN PRAKTIS TUMBUH KEMBANG ANAK UNTUK ORANG TUA</p>
                                </div>
                                {/* Book shadow effect */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[190px] h-[240px] bg-black/5 blur-md z-0"></div>

                                {/* Floating Badge */}
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm text-primary">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span className="text-[11px] font-bold">5 Min Read</span>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center items-start">
                                <Badge variant="primary" className="mb-4">Modul Pembelajaran</Badge>
                                <h2 className="text-[28px] font-bold text-netral leading-tight mb-4">
                                    Nutrisi Seimbang untuk Tumbuh Kembang Optimal
                                </h2>
                                <p className="text-body-thin text-netral/80 leading-relaxed mb-8 max-w-[500px]">
                                    Pelajari panduan lengkap menyusun menu harian yang kaya nutrisi untuk mendukung perkembangan kognitif dan fisik anak pada masa golden age.
                                </p>
                                <Button 
                                    variant="primary" 
                                    className="rounded-xl px-6 h-11"
                                    onClick={() => router.get('/edukasi/detail?id=nutrisi_dasar')}
                                >
                                    Mulai Belajar
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>

                        {/* Materi Terbaru Section */}
                        <div className="mb-8">
                            <h2 className="text-section-title text-netral mb-6">Materi Terbaru</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                
                                {/* Card 1: Video */}
                                <div 
                                    onClick={() => router.get('/edukasi/detail?id=motorik')}
                                    className="bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden flex flex-col h-full cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                                >
                                    <div className="h-[180px] bg-[#92B4A7]/30 relative flex items-center justify-center">
                                        <div className="absolute top-4 left-4 z-20">
                                            <Badge variant="secondary" className="bg-white/90 text-secondary backdrop-blur-sm">Video Simulasi</Badge>
                                        </div>
                                        {/* Play Button Overlay */}
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform z-10">
                                            <Play className="w-5 h-5 text-primary ml-1" fill="currentColor" />
                                        </div>
                                        {/* Dummy Image UI blocks behind play button */}
                                        <div className="absolute inset-0 opacity-50 flex items-center justify-center overflow-hidden pointer-events-none">
                                            <div className="w-full max-w-[200px] h-[140px] bg-white rounded shadow-sm border border-black/5 flex flex-col">
                                                <div className="h-4 border-b border-black/5"></div>
                                                <div className="flex-1 p-2 flex gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-secondary/20"></div>
                                                    <div className="flex-1 space-y-2 py-1">
                                                        <div className="h-2 bg-netral/10 rounded w-full"></div>
                                                        <div className="h-2 bg-netral/10 rounded w-2/3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-large-text text-netral mb-2 leading-tight">Latihan Motorik Kasar di Rumah</h3>
                                        <p className="text-small-text text-netral/70 leading-relaxed mb-6 flex-1">
                                            Panduan praktis melatih keseimbangan dan koordinasi anak dengan peralatan sederhana.
                                        </p>
                                        <div className="mt-auto">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[11px] text-netral/70">Progress</span>
                                                <span className="text-[11px] font-bold text-secondary">40%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-secondary/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-secondary rounded-full" style={{ width: '40%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2: Infografis */}
                                <div 
                                    onClick={() => router.get('/edukasi/detail?id=gizi_overweight')}
                                    className="bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden flex flex-col h-full cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                                >
                                    <div className="h-[180px] bg-white relative flex items-center justify-center border-b border-border/30">
                                        <div className="absolute top-4 left-4">
                                            <Badge variant="warning">Infografik</Badge>
                                        </div>
                                        {/* Infographic Abstract UI */}
                                        <div className="w-[180px] h-[100px] border border-border/50 rounded-lg shadow-sm flex flex-col p-4 bg-white">
                                            <div className="w-16 h-4 bg-primary/20 rounded mb-4"></div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-secondary/30"></div>
                                                    <div className="flex-1 space-y-1.5">
                                                        <div className="h-2 bg-netral/10 rounded w-full"></div>
                                                        <div className="h-2 bg-netral/10 rounded w-4/5"></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-[#f59e0b]/30"></div>
                                                    <div className="flex-1 space-y-1.5">
                                                        <div className="h-2 bg-netral/10 rounded w-[90%]"></div>
                                                        <div className="h-2 bg-netral/10 rounded w-[70%]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-large-text text-netral mb-2 leading-tight">Panduan Gizi Seimbang Anak Overweight</h3>
                                        <p className="text-small-text text-netral/70 leading-relaxed mb-6 flex-1">
                                            Visualisasi mudah dipahami untuk mengatur porsi makan dan memilih camilan sehat harian.
                                        </p>
                                        <div className="mt-auto">
                                            <button className="flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors">
                                                <Eye className="w-4 h-4" />
                                                Lihat Infografis
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3: Kuis Evaluasi */}
                                <div 
                                    onClick={() => router.get('/edukasi/detail?id=kuis_motorik')}
                                    className="bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden flex flex-col h-full text-center p-8 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                                >
                                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-6 shadow-sm">
                                        <HelpCircle className="w-8 h-8" />
                                    </div>
                                    <div className="mb-4">
                                        <Badge variant="netral" className="bg-netral/5">Kuis Evaluasi</Badge>
                                    </div>
                                    <h3 className="text-large-text text-netral mb-3 leading-tight">Cek Pemahaman: Pola Tidur Anak</h3>
                                    <p className="text-small-text text-netral/70 leading-relaxed mb-8 flex-1">
                                        Uji pengetahuan Anda tentang jam tidur ideal dan rutinitas sebelum tidur yang baik.
                                    </p>
                                    <Button variant="secondary" className="w-full rounded-xl h-11">
                                        Mulai Kuis
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>

                            </div>
                        </div>
                        
                    </div>
                </main>
            </div>
        </div>
    );
}
