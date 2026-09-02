import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import { Clock, ArrowRight, Play, Eye, HelpCircle, Info, BookOpen } from 'lucide-react';
import { getBMIStatusStyle } from '../utils/bmi';

export default function Edukasi() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const categories = ['Semua', 'Pertumbuhan', 'Perkembangan', 'Video', 'Infografis'];
    const [activeCategory, setActiveCategory] = useState('Semua');

    // Ambil data dari localStorage secara aman untuk SSR
    const savedIMTStatus = typeof window !== 'undefined' ? localStorage.getItem('childIMTStatus') || 'Normal' : 'Normal';
    const savedIMTScore = typeof window !== 'undefined' ? localStorage.getItem('childIMTScore') || '-' : '-';
    const savedAge = typeof window !== 'undefined' ? localStorage.getItem('childAge') || '' : '';
    const savedWeight = typeof window !== 'undefined' ? localStorage.getItem('childWeight') || '' : '';
    const savedHeight = typeof window !== 'undefined' ? localStorage.getItem('childHeight') || '' : '';

    const getAgeGroup = () => {
        const months = parseInt(savedAge);
        if (!months) return 'Umum';
        if (months <= 12) return '0–12 Bulan';
        if (months <= 24) return '12–24 Bulan';
        if (months <= 36) return '2–3 Tahun';
        return '3–5 Tahun';
    };
    const ageGroup = getAgeGroup();

    const statusStyle = getBMIStatusStyle(savedIMTStatus);

    // Logika Pemetaan Konten Dinamis
    const getDynamicContent = () => {
        const ageMonths = parseInt(savedAge) || 24;

        if (savedIMTStatus === 'Kurus') {
            return {
                featuredId: ageMonths <= 24 ? 'mpasi_padat_gizi' : 'nutrisi_tambahan_kalori',
                featuredTitle: ageMonths <= 24 ? "Panduan MPASI Padat Gizi untuk Bayi Underweight" : "Pentingnya Nutrisi Tambahan & Kalori Padat",
                featuredDesc: ageMonths <= 24 
                    ? `Pelajari resep MPASI tinggi kalori & protein untuk mengejar pertumbuhan bayi usia ${ageGroup} dengan BB ${savedWeight || '8.5'} kg.`
                    : `Pelajari panduan meningkatkan BB anak usia ${ageGroup} (TB: ${savedHeight || '80'} cm, BB: ${savedWeight || '8.5'} kg) agar mencapai kurva pertumbuhan ideal.`,
                videoId: "stimulasi_nafsu_makan",
                videoTitle: "Latihan Stimulasi Nafsu Makan",
                videoDesc: `Panduan praktis menstimulasi nafsu makan anak usia ${ageGroup} yang sulit makan dengan cara menyenangkan.`,
                infografisId: "gizi_underweight",
                infografisTitle: "Panduan Gizi Anak Underweight",
                infografisDesc: "Visualisasi mudah untuk menyusun porsi makan ekstra kalori padat gizi guna mengejar BB ideal.",
                kuisId: "kuis_motorik",
                kuisTitle: "Kuis: Kalori Makro & Mikro Anak",
                kuisDesc: "Uji pengetahuan Anda mengenai jenis lemak sehat dan protein terbaik untuk mengejar ketertinggalan BB anak."
            };
        } else if (savedIMTStatus === 'Obesitas' || savedIMTStatus === 'Beresiko Gizi Lebih') {
            return {
                featuredId: ageMonths <= 24 ? 'porsi_mpasi_overweight' : 'manajemen_bb_dini',
                featuredTitle: ageMonths <= 24 ? "Mengatur Porsi Makan Bayi Agar Tidak Overweight" : "Manajemen Berat Badan Anak Sejak Dini",
                featuredDesc: ageMonths <= 24
                    ? `Pelajari porsi MPASI yang tepat agar bayi usia ${ageGroup} dengan BB ${savedWeight || '13.5'} kg tidak kelebihan berat badan.`
                    : `Pelajari cara mengatur asupan kalori dan aktivitas fisik anak usia ${ageGroup} (BB: ${savedWeight || '13.5'} kg, TB: ${savedHeight || '84'} cm) untuk menurunkan IMT secara sehat.`,
                videoId: "motorik",
                videoTitle: "Latihan Aktivitas Fisik Menyenangkan",
                videoDesc: `Latihan gerak terstruktur yang dirancang khusus untuk anak usia ${ageGroup} agar membakar kalori berlebih dengan ceria.`,
                infografisId: "gizi_overweight",
                infografisTitle: "Panduan Gizi Seimbang Anak Overweight",
                infografisDesc: "Visualisasi panduan porsi makan dan substitusi camilan sehat untuk menjaga kurva tumbuh kembang seimbang.",
                kuisId: "kuis_motorik",
                kuisTitle: "Kuis: Manajemen Porsi & Gula",
                kuisDesc: "Uji pemahaman Anda tentang cara membatasi konsumsi gula tersembunyi pada jajanan harian balita."
            };
        } else {
            return {
                featuredId: 'nutrisi_dasar',
                featuredTitle: "Nutrisi Seimbang untuk Tumbuh Kembang Optimal",
                featuredDesc: `Pelajari panduan lengkap menu harian untuk anak usia ${ageGroup} guna mendukung perkembangan kognitif dan motorik prima.`,
                videoId: "motorik",
                videoTitle: "Latihan Motorik Kasar di Rumah",
                videoDesc: `Panduan praktis melatih keseimbangan dan koordinasi anak usia ${ageGroup} dengan peralatan sederhana di rumah.`,
                infografisId: "gizi_overweight",
                infografisTitle: "Panduan Mempertahankan Status Gizi Normal",
                infografisDesc: "Visualisasi porsi 'Isi Piringku' untuk menjaga status gizi dan kesehatan optimal setiap hari.",
                kuisId: "kuis_motorik",
                kuisTitle: "Kuis: Pola Tidur & Tumbuh Kembang",
                kuisDesc: "Uji pengetahuan Anda tentang hubungan jam tidur ideal malam hari terhadap stabilitas metabolisme tubuh anak."
            };
        }
    };

    const content = getDynamicContent();

    return (
        <div className="min-h-screen bg-background flex w-full font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title="Edukasi Tumbuh Kembang - EmoGROW" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto space-y-8">
                        
                        {/* Page Header */}
                        <div>
                            <Badge variant="primary" className="mb-2">
                                Modul & Panduan Orang Tua
                            </Badge>
                            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white mb-2">
                                Pusat Edukasi EmoGROW
                            </h1>
                            <p className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wide max-w-2xl">
                                Akses materi terstruktur berbasis riset kesehatan anak untuk mendampingi masa emas tumbuh kembang buah hati Anda.
                            </p>
                            
                            {/* IMT Status Banner */}
                            <div className="bg-card border-3 border-black rounded-2xl p-5 mt-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                                    <div className="w-10 h-10 rounded-xl bg-primary text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                        <Info className="w-5 h-5 stroke-[2.5]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs md:text-sm font-black uppercase text-black dark:text-white">
                                            Rekomendasi materi disesuaikan dengan kondisi anak:
                                        </p>
                                        <p className="text-xs font-bold text-muted-foreground uppercase mt-0.5">
                                            {savedAge ? `Usia: ${savedAge} bulan` : 'Usia: 24 bulan'}
                                            {savedWeight ? ` · BB: ${savedWeight} kg` : ' · BB: 12.0 kg'}
                                            {savedHeight ? ` · TB: ${savedHeight} cm` : ' · TB: 85 cm'}
                                            {savedIMTScore !== '-' ? ` · Skor IMT: ${savedIMTScore}` : ' · Skor IMT: 17.8'}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant={statusStyle.variant} className="shrink-0">
                                    Status Gizi: {savedIMTStatus}
                                </Badge>
                            </div>

                            {/* Filter Pills */}
                            <div className="flex flex-wrap gap-2.5 pt-5">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase border-2 border-black transition-all cursor-pointer ${
                                            activeCategory === category 
                                                ? 'bg-success text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' 
                                                : 'bg-card text-foreground hover:bg-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Content Card */}
                        <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row">
                            {/* Left: Cover Illustration Block */}
                            <div className="md:w-5/12 bg-card-subtle border-b-3 md:border-b-0 md:border-r-3 border-black relative min-h-[260px] flex items-center justify-center p-8 overflow-hidden">
                                {/* Reading Time Pill: Positioned on top-left with z-20 so it is NEVER covered */}
                                <div className="absolute top-4 left-4 z-20 bg-card border-2 border-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase text-foreground">
                                    <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>5 Menit Baca</span>
                                </div>

                                {/* Central Book Mockup Card */}
                                <div className="w-[170px] h-[210px] bg-card border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center p-4 relative z-10 mt-4">
                                    <div className="w-11 h-11 bg-primary text-black border-2 border-black rounded-xl mb-2.5 flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                        <BookOpen className="w-5 h-5 stroke-[2.5]" />
                                    </div>
                                    <span className="text-[8px] font-black text-muted-foreground tracking-widest uppercase mb-1">Modul Resmi</span>
                                    <h3 className="text-sm font-black uppercase text-black dark:text-white leading-tight">EmoGROW</h3>
                                    <span className="text-[8px] font-black uppercase text-black bg-success border border-black px-2 py-0.5 rounded mt-2.5">
                                        Panduan Orang Tua
                                    </span>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center items-start bg-card min-w-0">
                                <Badge variant="primary" className="mb-3">
                                    Modul Utama Pilihan
                                </Badge>
                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black dark:text-white leading-tight mb-2">
                                    {content.featuredTitle}
                                </h2>
                                <p className="text-xs md:text-sm font-bold text-muted-foreground leading-relaxed mb-6 max-w-lg">
                                    {content.featuredDesc}
                                </p>
                                <Button 
                                    variant="primary"
                                    size="md"
                                    onClick={() => router.get(`/edukasi/detail?id=${content.featuredId}`)}
                                >
                                    Mulai Belajar Modul
                                    <ArrowRight className="w-4 h-4 ml-1 stroke-[3]" />
                                </Button>
                            </div>
                        </div>

                        {/* Materi Terbaru Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b-3 border-black">
                                <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-black dark:text-white">Materi Rekomendasi Terkini</h2>
                                <span className="text-xs font-black uppercase text-muted-foreground">
                                    {(() => {
                                        const count = [
                                            { type: 'video', category: 'Perkembangan' },
                                            { type: 'infografis', category: 'Pertumbuhan' },
                                            { type: 'kuis', category: 'Perkembangan' },
                                        ].filter(item => {
                                            if (activeCategory === 'Semua') return true;
                                            if (activeCategory === 'Video') return item.type === 'video';
                                            if (activeCategory === 'Infografis') return item.type === 'infografis';
                                            return item.category === activeCategory;
                                        }).length;
                                        return `${count} Materi Tersedia`;
                                    })()}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                
                                {/* Card 1: Video */}
                                {(activeCategory === 'Semua' || activeCategory === 'Perkembangan' || activeCategory === 'Video') && (
                                    <div 
                                        onClick={() => router.get(`/edukasi/detail?id=${content.videoId}`)}
                                        className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-full cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group"
                                    >
                                        {/* Standardized Card Header */}
                                        <div className="h-[170px] bg-slate-900/10 dark:bg-slate-950 relative flex items-center justify-center overflow-hidden border-b-2 border-black">
                                            <img 
                                                src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80" 
                                                alt={content.videoTitle} 
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/20" />
                                            <div className="absolute top-3.5 left-3.5 z-10">
                                                <Badge variant="secondary">Video Simulasi</Badge>
                                            </div>
                                            {/* Centered Play Button */}
                                            <div className="w-12 h-12 bg-primary text-black border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 active:scale-95 transition-transform z-10">
                                                <Play className="w-5 h-5 fill-black stroke-black ml-0.5" />
                                            </div>
                                        </div>

                                        {/* Standardized Card Body */}
                                        <div className="p-5 flex flex-col flex-1 bg-card">
                                            <h3 className="text-sm md:text-base font-black uppercase text-black dark:text-white mb-1.5 leading-snug line-clamp-2">
                                                {content.videoTitle}
                                            </h3>
                                            <p className="text-xs font-bold text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                                                {content.videoDesc}
                                            </p>
                                            <div className="mt-auto pt-3 border-t-2 border-black/10 flex items-center justify-between text-xs font-black uppercase text-black dark:text-white">
                                                <span className="text-muted-foreground">Durasi: ~5 Menit</span>
                                                <span className="text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                                    Tonton <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Card 2: Infografis */}
                                {(activeCategory === 'Semua' || activeCategory === 'Pertumbuhan' || activeCategory === 'Infografis') && (
                                    <div 
                                        onClick={() => router.get(`/edukasi/detail?id=${content.infografisId}`)}
                                        className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-full cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group"
                                    >
                                        {/* Standardized Card Header */}
                                        <div className="h-[170px] bg-slate-900/10 dark:bg-slate-950 relative flex items-center justify-center overflow-hidden border-b-2 border-black">
                                            <img 
                                                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80" 
                                                alt={content.infografisTitle} 
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/15" />
                                            <div className="absolute top-3.5 left-3.5 z-10">
                                                <Badge variant="warning">Infografik</Badge>
                                            </div>
                                            <div className="w-10 h-10 bg-card text-foreground border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all z-10">
                                                <Eye className="w-5 h-5 stroke-[2.5]" />
                                            </div>
                                        </div>

                                        {/* Standardized Card Body */}
                                        <div className="p-5 flex flex-col flex-1 bg-card">
                                            <h3 className="text-sm md:text-base font-black uppercase text-black dark:text-white mb-1.5 leading-snug line-clamp-2">
                                                {content.infografisTitle}
                                            </h3>
                                            <p className="text-xs font-bold text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                                                {content.infografisDesc}
                                            </p>
                                            <div className="mt-auto pt-3 border-t-2 border-black/10 flex items-center justify-between text-xs font-black uppercase text-black dark:text-white">
                                                <span className="text-muted-foreground">Visual Panduan</span>
                                                <span className="text-info flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                                    Lihat <Eye className="w-3.5 h-3.5 stroke-[3]" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Card 3: Kuis Evaluasi (Standardized with consistent top media header) */}
                                {(activeCategory === 'Semua' || activeCategory === 'Perkembangan') && (
                                    <div 
                                        onClick={() => router.get(`/edukasi/detail?id=${content.kuisId}`)}
                                        className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-full cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group"
                                    >
                                        {/* Standardized Card Header matching Video & Infographic */}
                                        <div className="h-[170px] bg-slate-900/10 dark:bg-slate-950 relative flex items-center justify-center overflow-hidden border-b-2 border-black">
                                            <img 
                                                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" 
                                                alt={content.kuisTitle} 
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                                            />
                                            <div className="absolute inset-0 bg-info/20 dark:bg-info/30" />
                                            <div className="absolute top-3.5 left-3.5 z-10">
                                                <Badge variant="info">Kuis Evaluasi</Badge>
                                            </div>
                                            {/* Centered Quiz Icon Badge */}
                                            <div className="w-12 h-12 bg-info text-white border-2 border-black rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 active:scale-95 transition-transform z-10">
                                                <HelpCircle className="w-6 h-6 stroke-[2.5]" />
                                            </div>
                                        </div>

                                        {/* Standardized Card Body */}
                                        <div className="p-5 flex flex-col flex-1 bg-card">
                                            <h3 className="text-sm md:text-base font-black uppercase text-black dark:text-white mb-1.5 leading-snug line-clamp-2">
                                                {content.kuisTitle}
                                            </h3>
                                            <p className="text-xs font-bold text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                                                {content.kuisDesc}
                                            </p>
                                            <div className="mt-auto pt-3 border-t-2 border-black/10 flex items-center justify-between text-xs font-black uppercase text-black dark:text-white">
                                                <span className="text-muted-foreground">5 Pertanyaan</span>
                                                <span className="text-info flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                                    Mulai Kuis <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                                                </span>
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