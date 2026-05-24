import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import { Clock, ArrowRight, Play, Eye, HelpCircle, Info } from 'lucide-react';

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

    // Menentukan label kelompok usia anak
    const getAgeGroup = () => {
        const months = parseInt(savedAge);
        if (!months) return 'Umum';
        if (months <= 12) return '0-12 Bulan';
        if (months <= 24) return '12-24 Bulan';
        if (months <= 36) return '2-3 Tahun';
        return '3-5 Tahun';
    };
    const ageGroup = getAgeGroup();

    // Penyesuaian skema warna Neubrutalism berdasarkan status IMT anak
    const getStatusColor = () => {
        if (savedIMTStatus === 'Normal') {
            return { bg: 'bg-[#a3e635]', text: 'text-black', label: 'Normal' };
        }
        if (savedIMTStatus === 'Kurus') {
            return { bg: 'bg-[#00a6ff]', text: 'text-black', label: 'Kurus' };
        }
        // Obesitas / Gizi Lebih
        return { bg: 'bg-[#f472b6]', text: 'text-black', label: savedIMTStatus };
    };
    const statusColor = getStatusColor();

    // Logika Pemetaan Konten Dinamis
    const getDynamicContent = () => {
        const ageMonths = parseInt(savedAge) || 24;

        if (savedIMTStatus === 'Kurus') {
            return {
                featuredId: ageMonths <= 24 ? 'mpasi_padat_gizi' : 'nutrisi_tambahan_kalori',
                featuredTitle: ageMonths <= 24 ? "Panduan MPASI Padat Gizi untuk Bayi Underweight" : "Pentingnya Nutrisi Tambahan & Kalori Padat",
                featuredDesc: ageMonths <= 24 
                    ? `Pelajari resep MPASI tinggi kalori & protein untuk mengejar pertumbuhan bayi usia ${ageGroup} dengan BB ${savedWeight} kg.`
                    : `Pelajari panduan meningkatkan BB anak usia ${ageGroup} (TB: ${savedHeight} cm, BB: ${savedWeight} kg) agar mencapai kurva pertumbuhan ideal.`,
                videoId: "stimulasi_nafsu_makan",
                videoTitle: "Latihan Stimulasi Nafsu Makan",
                videoDesc: `Panduan praktis menstimulasi nafsu makan anak usia ${ageGroup} yang sulit makan dengan cara menyenangkan.`,
                infografisId: "gizi_underweight",
                infografisTitle: "Panduan Gizi Anak Underweight",
                infografisDesc: "Visualisasi mudah untuk menyusun porsi makan ekstra kalori padat gizi guna mengejar BB ideal.",
                kuisId: "kuis_gizi_kurang",
                kuisTitle: "Cek Pemahaman: Kalori Makro & Mikro anak Kurus",
                kuisDesc: "Uji pengetahuan Anda mengenai jenis lemak sehat dan protein terbaik untuk mengejar ketertinggalan BB anak."
            };
        } else if (savedIMTStatus === 'Obesitas' || savedIMTStatus === 'Beresiko Gizi Lebih') {
            return {
                featuredId: ageMonths <= 24 ? 'porsi_mpasi_overweight' : 'manajemen_bb_dini',
                featuredTitle: ageMonths <= 24 ? "Mengatur Porsi Makan Bayi Agar Tidak Overweight" : "Manajemen Berat Badan Anak Sejak Dini",
                featuredDesc: ageMonths <= 24
                    ? `Pelajari porsi MPASI yang tepat agar bayi usia ${ageGroup} dengan BB ${savedWeight} kg tidak kelebihan berat badan.`
                    : `Pelajari cara mengatur asupan kalori dan aktivitas fisik anak usia ${ageGroup} (BB: ${savedWeight} kg, TB: ${savedHeight} cm) untuk menurunkan IMT secara sehat.`,
                videoId: "aktivitas_fisik_fun",
                videoTitle: "Aktivitas Fisik Fun untuk Anak",
                videoDesc: `Latihan gerak menyenangkan yang dirancang khusus untuk anak usia ${ageGroup} agar membakar kalori berlebih tanpa beban.`,
                infografisId: "gizi_overweight",
                infografisTitle: "Panduan Diet Sehat Anak Overweight",
                infografisDesc: "Visualisasi panduan porsi makan dan substitusi camilan sehat untuk menurunkan IMT secara perlahan.",
                kuisId: "kuis_gizi_lebih",
                kuisTitle: "Cek Pemahaman: Manajemen Porsi & Gula",
                kuisDesc: "Uji pemahaman Anda tentang cara membatasi konsumsi gula tersembunyi pada jajanan harian balita."
            };
        } else {
            return {
                featuredId: ageMonths <= 24 ? 'gizi_golden_age' : 'nutrisi_optimal',
                featuredTitle: ageMonths <= 24 ? "Panduan Gizi Seimbang untuk Bayi di Golden Age" : "Nutrisi Seimbang untuk Tumbuh Kembang Optimal",
                featuredDesc: ageMonths <= 24
                    ? `Menu MPASI kaya nutrisi untuk bayi usia ${ageGroup} (BB: ${savedWeight} kg) guna mendukung masa golden age.`
                    : `Pelajari panduan lengkap menu harian untuk anak usia ${ageGroup} (BB: ${savedWeight} kg, TB: ${savedHeight} cm) yang mendukung perkembangan kognitif & fisik.`,
                videoId: "motorik_kasar_rumah",
                videoTitle: "Latihan Motorik Kasar di Rumah",
                videoDesc: `Panduan praktis melatih keseimbangan dan koordinasi anak usia ${ageGroup} dengan peralatan sederhana.`,
                infografisId: "gizi_normal",
                infografisTitle: "Panduan Mempertahankan Status Gizi Normal",
                infografisDesc: "Visualisasi porsi 'Isi Piringku' untuk menjaga status gizi dan kesehatan optimal setiap hari.",
                kuisId: "kuis_pola_tidur",
                kuisTitle: "Cek Pemahaman: Pola Tidur & Tumbuh Kembang",
                kuisDesc: "Uji pengetahuan Anda tentang hubungan jam tidur ideal malam hari terhadap stabilitas metabolisme tubuh anak."
            };
        }
    };

    const content = getDynamicContent();

    return (
        <div className="min-h-screen bg-[#fbfbf4] flex w-full font-sans antialiased text-black">
            <Head title="Pusat Edukasi" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto">
                        
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-black text-3xl md:text-[40px] leading-tight font-black uppercase tracking-tight mb-6">
                                Pusat Edukasi EmoGROW
                            </h1>
                            
                            {/* IMT Status Banner (Neubrutalism Card) */}
                            <div className="bg-white border-2 border-black rounded-2xl p-5 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl border-2 border-black ${statusColor.bg} flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                    <Info className="w-6 h-6 text-black" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-black tracking-tight">
                                        Edukasi ini menyesuaikan kondisi IMT anak Anda:
                                    </p>
                                    <p className="text-sm font-bold text-black/70 mt-1">
                                        {savedAge ? `Usia: ${savedAge} bulan` : ''}
                                        {savedWeight ? ` · BB: ${savedWeight} kg` : ''}
                                        {savedHeight ? ` · TB: ${savedHeight} cm` : ''}
                                        {savedIMTScore !== '-' ? ` · Skor IMT: ${savedIMTScore}` : ''}
                                    </p>
                                </div>
                                <div className={`flex items-center border-2 border-black px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider ${statusColor.bg} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                    {statusColor.label}
                                </div>
                            </div>

                            {/* Filter Pills (Neubrutalism Style Buttons) */}
                            <div className="flex flex-wrap gap-3">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                                            activeCategory === category 
                                                ? 'bg-[#00a6ff] text-black' 
                                                : 'bg-white text-black hover:bg-[#fbfbf4]'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Content Card (Neubrutalism Heavy Card) */}
                        <div className="bg-white rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden mb-12 flex flex-col md:flex-row">
                            {/* Left: Cover Modul Cover Block */}
                            <div className="md:w-5/12 bg-[#fffdf4] border-b-2 md:border-b-0 md:border-r-2 border-black relative min-h-[250px] md:min-h-full flex items-center justify-center p-6">
                                <div className="w-[190px] h-[250px] bg-[#f472b6] border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-black relative z-10 p-6 text-center">
                                    <div className="w-12 h-12 border-2 border-black bg-white rounded-xl mb-4 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="w-6 h-6 border-2 border-black rounded-full bg-[#00a6ff]" />
                                    </div>
                                    <p className="text-[11px] uppercase tracking-[0.2em] font-black mb-1">MODUL</p>
                                    <h3 className="text-xl font-black tracking-tight leading-tight">EMOGROW</h3>
                                    <p className="text-[8px] font-bold uppercase mt-4 leading-relaxed bg-white border border-black px-2 py-0.5 rounded-md">
                                        PANDUAN ORANG TUA
                                    </p>
                                </div>

                                <div className="absolute top-6 left-6 bg-[#a3e635] border-2 border-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-xs">
                                    <Clock className="w-4 h-4" />
                                    <span>5 MENIT BACA</span>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center items-start bg-white">
                                <span className="bg-[#00a6ff] border-2 border-black px-3 py-1 rounded-lg font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
                                    Modul Pembelajaran
                                </span>
                                <h2 className="text-2xl md:text-3xl font-black text-black leading-tight mb-4">
                                    {content.featuredTitle}
                                </h2>
                                <p className="text-base font-bold text-black/80 leading-relaxed mb-8 max-w-[500px]">
                                    {content.featuredDesc}
                                </p>
                                <button 
                                    onClick={() => router.get(`/edukasi/detail?id=${content.featuredId}`)}
                                    className="inline-flex items-center justify-center bg-[#a3e635] text-black font-black uppercase tracking-wider border-2 border-black rounded-xl px-6 h-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#8ecb2c] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                                >
                                    Mulai Belajar
                                    <ArrowRight className="w-5 h-5 ml-2 stroke-[3]" />
                                </button>
                            </div>
                        </div>

                        {/* Materi Terbaru Section */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Materi Terbaru</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                
                                {/* Card 1: Video (Neubrutalism Card) */}
                                <div 
                                    onClick={() => router.get(`/edukasi/detail?id=${content.videoId}`)}
                                    className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group active:translate-x-[2px] active:translate-y-[2px]"
                                >
                                    <div className="h-[180px] bg-[#00a6ff]/20 border-b-2 border-black relative flex items-center justify-center">
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-white border-2 border-black px-3 py-1 rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                Video Simulasi
                                            </span>
                                        </div>
                                        <div className="w-14 h-14 bg-[#a3e635] border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform z-10">
                                            <Play className="w-6 h-6 text-black ml-1 fill-black" />
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1 bg-white">
                                        <h3 className="text-lg font-black text-black mb-2 leading-tight">{content.videoTitle}</h3>
                                        <p className="text-sm font-bold text-black/70 leading-relaxed mb-6 flex-1">
                                            {content.videoDesc}
                                        </p>
                                        <div className="mt-auto border-t-2 border-black pt-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-black uppercase tracking-wider">Progress</span>
                                                <span className="text-xs font-black bg-[#f472b6] border border-black px-1.5 py-0.5 rounded">0%</span>
                                            </div>
                                            <div className="h-4 w-full bg-white border-2 border-black rounded-lg overflow-hidden p-0.5">
                                                <div className="h-full bg-[#f472b6] rounded-md" style={{ width: '0%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2: Infografis (Neubrutalism Card) */}
                                <div 
                                    onClick={() => router.get(`/edukasi/detail?id=${content.infografisId}`)}
                                    className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group active:translate-x-[2px] active:translate-y-[2px]"
                                >
                                    <div className="h-[180px] bg-[#f472b6]/20 border-b-2 border-black relative flex items-center justify-center">
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white border-2 border-black px-3 py-1 rounded-lg font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                Infografik
                                            </span>
                                        </div>
                                        <div className="w-20 h-12 border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                                            <div className="w-12 h-3 bg-[#00a6ff] rounded border border-black" />
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1 bg-white">
                                        <h3 className="text-lg font-black text-black mb-2 leading-tight">{content.infografisTitle}</h3>
                                        <p className="text-sm font-bold text-black/70 leading-relaxed mb-6 flex-1">
                                            {content.infografisDesc}
                                        </p>
                                        <div className="mt-auto pt-2">
                                            <button className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#fbfbf4]">
                                                <Eye className="w-4 h-4 stroke-[2.5]" />
                                                Lihat Infografis
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3: Kuis Evaluasi (Neubrutalism Card) */}
                                <div 
                                    onClick={() => router.get(`/edukasi/detail?id=${content.kuisId}`)}
                                    className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col h-full text-center p-6 cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px]"
                                >
                                    <div className="w-14 h-14 bg-[#00a6ff] border-2 border-black rounded-xl flex items-center justify-center text-black mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                        <HelpCircle className="w-8 h-8 stroke-[2.5]" />
                                    </div>
                                    <div className="mb-4">
                                        <span className="bg-[#fffdf4] border border-black px-2.5 py-1 rounded-md font-black text-xs uppercase">
                                            Kuis Evaluasi
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-black text-black mb-2 leading-tight">{content.kuisTitle}</h3>
                                    <p className="text-sm font-bold text-black/70 leading-relaxed mb-6 flex-1">
                                        {content.kuisDesc}
                                    </p>
                                    <button className="w-full inline-flex items-center justify-center bg-[#a3e635] text-black font-black uppercase tracking-wider border-2 border-black rounded-xl h-11 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#8ecb2c]">
                                        Mulai Kuis
                                        <ArrowRight className="w-4 h-4 ml-2 stroke-[3]" />
                                    </button>
                                </div>

                            </div>
                        </div>
                        
                    </div>
                </main>
            </div>
        </div>
    );
}