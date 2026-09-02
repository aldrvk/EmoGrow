import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import InfographicCard from '../Components/Cards/InfographicCard';
import LearningTrailCard, { TrailModule } from '../Components/Cards/LearningTrailCard';
import Toast from '../Components/UI/Toast';
import VideoPlayer from '../Components/UI/VideoPlayer';
import { ArrowLeft, ArrowRight as ArrowRightIcon, Download, Play, CheckCircle2, FileText, Activity, PersonStanding, Target, Clock, Award, XCircle, RotateCcw } from 'lucide-react';

interface ContentItem {
    type: string;
    title: string;
    badge: string;
    badgeVariant: string;
    description: string;
    subtitle?: string;
    content?: string;
    activities?: { id: number; title: string; desc: string }[];
    infographics?: {
        title: string;
        tag?: string;
        image: string;
        caption?: string;
        stats?: { value: string; label: string; color: string }[];
    }[];
    principles?: {
        title: string;
        description: string;
        items: { title: string; desc: string }[];
    };
}

export default function EdukasiDetail() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tentang');
    const [contentId, setContentId] = useState('motorik');

    // Toast state
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Quiz state
    const [quizStage, setQuizStage] = useState<'onboarding' | 'questions' | 'results' | 'review'>('onboarding');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

    const handleCompleteModule = () => {
        const item = contentData[contentId] || contentData.motorik;
        setToastMessage(`Modul "${item.title}" berhasil diselesaikan! 15 Poin pembelajaran ditambahkan.`);
        setIsToastOpen(true);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            setContentId(id);
            setQuizStage('onboarding');
            setCurrentQuestion(0);
            setSelectedAnswers({});
        }
    }, []);

    // Quiz questions data
    const quizQuestions = [
        {
            question: "Pada usia berapa bulan anak umumnya mulai bisa berjalan tanpa bantuan?",
            options: ["6-8 bulan", "9-11 bulan", "12-15 bulan", "18-24 bulan"],
            correctAnswer: 2,
            explanation: "Sebagian besar anak mulai berjalan mandiri pada usia 12-15 bulan, meski rentang normal bisa dari 9-18 bulan."
        },
        {
            question: "Milestone motorik kasar apa yang diharapkan pada usia 24 bulan?",
            options: ["Merangkak", "Berlari dan menendang bola", "Melompat dengan satu kaki", "Bersepeda roda tiga"],
            correctAnswer: 1,
            explanation: "Pada usia 24 bulan, anak umumnya sudah bisa berlari dengan cukup stabil dan menendang bola ke depan."
        },
        {
            question: "Berapa jumlah kata yang umumnya dikuasai anak usia 2 tahun?",
            options: ["10-20 kata", "50-100 kata", "200-300 kata", "500+ kata"],
            correctAnswer: 2,
            explanation: "Anak usia 2 tahun rata-rata menguasai 200-300 kata dan mulai menggabungkan 2-3 kata menjadi kalimat sederhana."
        },
        {
            question: "Apa tanda Red Flag perkembangan motorik halus pada usia 18 bulan?",
            options: ["Belum bisa menyusun 2 balok", "Belum bisa menulis nama", "Belum bisa menggunting", "Belum bisa mengikat tali sepatu"],
            correctAnswer: 0,
            explanation: "Ketidakmampuan menyusun minimal 2 balok pada usia 18 bulan bisa menjadi tanda keterlambatan motorik halus yang perlu dievaluasi."
        },
        {
            question: "Aktivitas mana yang paling tepat untuk menstimulasi motorik kasar anak usia 12-18 bulan?",
            options: ["Mewarnai gambar", "Bermain puzzle", "Mendorong mainan beroda sambil berjalan", "Meronce manik-manik"],
            correctAnswer: 2,
            explanation: "Mendorong mainan beroda membantu anak melatih keseimbangan dan kekuatan otot kaki saat belajar berjalan."
        },
        {
            question: "Kapan sebaiknya orang tua mulai khawatir jika anak belum bisa mengucapkan kata pertama?",
            options: ["6 bulan", "9 bulan", "12 bulan", "18 bulan"],
            correctAnswer: 2,
            explanation: "Jika anak belum mengucapkan satu kata bermakna pun pada usia 12 bulan, sebaiknya dikonsultasikan ke dokter anak."
        },
        {
            question: "Berapa jam tidur ideal yang direkomendasikan untuk anak usia 1-2 tahun per hari?",
            options: ["8-10 jam", "11-14 jam", "15-17 jam", "18-20 jam"],
            correctAnswer: 1,
            explanation: "American Academy of Sleep Medicine merekomendasikan 11-14 jam tidur per hari (termasuk tidur siang) untuk anak usia 1-2 tahun."
        }
    ];

    const quizScore = Object.keys(selectedAnswers).reduce((score, qIdx) => {
        return score + (selectedAnswers[Number(qIdx)] === quizQuestions[Number(qIdx)].correctAnswer ? 1 : 0);
    }, 0);
    const quizPassed = quizScore >= 5;

    const contentData: Record<string, ContentItem> = {
        motorik: {
            type: 'video',
            title: "Latihan Motorik Kasar di Rumah",
            badge: "Video Stimulasi",
            badgeVariant: "secondary",
            description: "Latihan motorik kasar sangat penting untuk perkembangan fisik anak, membantu mereka membangun kekuatan otot, keseimbangan, dan koordinasi seluruh tubuh. Melalui aktivitas bermain yang terstruktur namun menyenangkan di rumah, orang tua dapat secara proaktif menstimulasi kemampuan dasar ini.",
            activities: [
                { id: 1, title: "Berjalan di Garis Lurus", desc: "Gunakan selotip kertas untuk membuat garis di lantai. Minta anak berjalan mengikuti garis dengan merentangkan tangan untuk keseimbangan." },
                { id: 2, title: "Melompat di Tempat", desc: "Gunakan bantal datar atau matras. Ajarkan anak melompat dengan dua kaki bersamaan dan mendarat dengan lutut sedikit ditekuk." },
                { id: 3, title: "Menangkap Bola Lembut", desc: "Latih koordinasi mata-tangan dengan melempar bola kain secara perlahan dari jarak dekat." }
            ]
        },
        nutrisi_dasar: {
            type: 'artikel',
            title: "Nutrisi Seimbang untuk Tumbuh Kembang Optimal",
            badge: "Modul Pembelajaran",
            badgeVariant: "primary",
            description: "Nutrisi seimbang adalah pondasi utama dalam mendukung pertumbuhan fisik dan perkembangan kognitif anak usia dini. Pada masa ini, tubuh membutuhkan berbagai jenis makronutrien dan mikronutrien untuk membangun sel, jaringan, serta memastikan fungsi organ berjalan optimal.",
            content: `
                <h3 class="text-base font-black uppercase mb-2 text-black">Porsi Makan Ideal</h3>
                <p class="mb-5 text-muted-foreground font-bold text-xs leading-relaxed">Pastikan setengah piring diisi dengan sayur dan buah yang kaya akan serat, vitamin, dan mineral. Seperempat piring diisi dengan karbohidrat kompleks seperti nasi merah atau roti gandum, dan seperempat sisanya dengan protein berkualitas seperti telur, ikan, atau tempe.</p>
                <h3 class="text-base font-black uppercase mb-2 text-black">Pilih Camilan Sehat</h3>
                <p class="text-muted-foreground font-bold text-xs leading-relaxed">Hindari makanan olahan manis yang tinggi gula. Biasakan anak untuk mengonsumsi camilan sehat seperti potongan buah segar, yogurt tanpa tambahan gula, atau kacang-kacangan ringan sebagai pengisi energi di antara waktu makan utama.</p>
            `
        },
        gizi_overweight: {
            type: 'infografik',
            title: "Panduan Gizi Seimbang Anak Overweight",
            subtitle: "Visualisasi mudah dipahami untuk mengatur porsi makan dan memilih camilan sehat harian demi tumbuh kembang optimal.",
            badge: "Infografis",
            badgeVariant: "warning",
            description: "Visualisasi mudah dipahami untuk mengatur porsi makan dan memilih camilan sehat harian demi tumbuh kembang optimal.",
            infographics: [
                {
                    title: "Visualisasi Piring Makan Sehat",
                    tag: "Rekomendasi Ahli",
                    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                    caption: "Contoh nyata penyajian makanan harian dengan komposisi gizi seimbang yang menggugah selera untuk anak."
                },
                {
                    title: "Panduan Proporsi Nutrisi",
                    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                    stats: [
                        { value: "1/2", label: "Sayur & Buah", color: "text-primary" },
                        { value: "1/4", label: "Protein", color: "text-info" },
                        { value: "1/4", label: "Karbohidrat", color: "text-warning" }
                    ]
                }
            ],
            principles: {
                title: "Prinsip Gizi Seimbang",
                description: "Mengelola berat badan anak yang mengalami overweight membutuhkan pendekatan yang empatik dan berkelanjutan. Fokus utamanya bukan pada diet ketat, melainkan pada pembentukan kebiasaan makan yang padat nutrisi.",
                items: [
                    { title: 'Porsi "Piring Makanku"', desc: "Gunakan panduan visual piring: 50% sayur dan buah, 25% karbohidrat kompleks (seperti nasi merah atau gandum utuh), dan 25% protein rendah lemak (ayam tanpa kulit, tahu, tempe, atau ikan)." },
                    { title: "Kontrol Kalori Terselubung", desc: "Kurangi kalori cair seperti minuman kemasan manis dan susu dengan tambahan gula tinggi. Ganti dengan air putih segar atau susu rendah lemak tanpa rasa." },
                    { title: "Camilan Cerdas (Smart Snacking)", desc: "Sediakan buah potong segar, yogurt tawar dengan madu secukupnya, atau kacang-kacangan panggang sebagai alternatif camilan sore. Hindari menyimpan stok makanan ringan tinggi natrium di rumah." },
                    { title: "Makan Bersama Tanpa Distraksi", desc: "Biasakan waktu makan di meja makan tanpa kehadiran gadget atau televisi. Hal ini membantu anak mengenali sinyal kenyang alami dari tubuh mereka." }
                ]
            }
        },
        kuis_motorik: {
            type: 'kuis',
            title: "Kuis Evaluasi Milestone Perkembangan",
            badge: "Kuis",
            badgeVariant: "primary",
            description: "Uji pemahaman Anda tentang milestone perkembangan anak di usia 24 bulan."
        }
    };

    const currentContent: ContentItem = contentData[contentId] || contentData.motorik;

    const trailModules: TrailModule[] = [
        { id: 1, subtitle: 'Modul 1', title: contentId === 'motorik' ? 'Pengantar Motorik Kasar' : 'Pengantar Gizi Anak', status: 'completed' },
        { id: 2, subtitle: 'Modul 2 (Saat Ini)', title: contentId === 'motorik' ? 'Latihan di Rumah' : 'Makro & Mikro Nutrisi', status: 'current' },
        { id: 3, subtitle: 'Modul 3', title: contentId === 'motorik' ? 'Evaluasi dan Milestone' : 'Perencanaan Menu Harian', status: 'locked' },
    ];

    return (
        <div className="min-h-screen bg-background flex w-full font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title="Detail Edukasi - EmoGROW" />
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
                                        href="/edukasi" 
                                        className="inline-flex items-center gap-2 bg-card text-foreground border-2 border-black px-4 py-2 rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-card-subtle active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                                    >
                                        <ArrowLeft className="w-4 h-4 stroke-[3]" />
                                        Kembali ke Pusat Edukasi
                                    </Link>
                                </div>

                                {/* Header Section */}
                                <div className="mb-2">
                                    <Badge variant={(currentContent.badgeVariant as any) || 'primary'} className="mb-3">
                                        {currentContent.badge}
                                    </Badge>
                                    <h1 className="text-black dark:text-white text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
                                        {currentContent.title}
                                    </h1>
                                    {currentContent.subtitle && (
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide max-w-2xl leading-relaxed">
                                            {currentContent.subtitle}
                                        </p>
                                    )}
                                </div>

                                {currentContent.type === 'video' && (
                                    <>
                                        {/* Video Player — using shared component */}
                                        <VideoPlayer
                                            thumbnail="https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                            alt={currentContent.title}
                                            duration="05:30"
                                            currentTime="02:15"
                                            progress={40}
                                        />

                                        {/* Content Tabs */}
                                        <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden mt-2">
                                            {/* Tab Navigation */}
                                            <div className="flex border-b-3 border-black bg-card">
                                                <button 
                                                    onClick={() => setActiveTab('tentang')}
                                                    className={`flex-1 py-3 text-xs font-black uppercase text-center transition-colors border-r-2 border-black cursor-pointer ${activeTab === 'tentang' ? 'bg-success text-black' : 'text-muted-foreground hover:bg-card-subtle'}`}
                                                >
                                                    Tentang Materi
                                                </button>
                                                <button 
                                                    onClick={() => setActiveTab('langkah')}
                                                    className={`flex-1 py-3 text-xs font-black uppercase text-center transition-colors border-r-2 border-black cursor-pointer ${activeTab === 'langkah' ? 'bg-success text-black' : 'text-muted-foreground hover:bg-card-subtle'}`}
                                                >
                                                    Langkah-Langkah
                                                </button>
                                                <button 
                                                    onClick={() => setActiveTab('alat')}
                                                    className={`flex-1 py-3 text-xs font-black uppercase text-center transition-colors cursor-pointer ${activeTab === 'alat' ? 'bg-success text-black' : 'text-muted-foreground hover:bg-card-subtle'}`}
                                                >
                                                    Alat yang Dibutuhkan
                                                </button>
                                            </div>

                                            {/* Tab Content */}
                                            <div className="p-6 md:p-8">
                                                {activeTab === 'tentang' && (
                                                    <div className="space-y-6">
                                                        <p className="text-xs md:text-sm font-bold text-muted-foreground leading-relaxed">
                                                            {currentContent.description}
                                                        </p>

                                                        <h3 className="text-base font-black uppercase text-black dark:text-white">Aktivitas Utama</h3>
                                                        
                                                        <div className="space-y-3">
                                                            {currentContent.activities?.map((act: any) => (
                                                                <div key={act.id} className="border-2 border-black rounded-xl p-4 flex gap-4 bg-card-subtle shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                                    <div className="w-9 h-9 rounded-xl bg-primary text-black border-2 border-black flex items-center justify-center font-black text-sm shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                                        {act.id}
                                                                    </div>
                                                                    <div>
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <h4 className="text-xs font-black uppercase text-black dark:text-white">{act.title}</h4>
                                                                            {act.id === 1 && <PersonStanding className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />}
                                                                            {act.id === 2 && <Activity className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />}
                                                                            {act.id === 3 && <Target className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />}
                                                                        </div>
                                                                        <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                                                                            {act.desc}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <Button 
                                                            variant="primary" 
                                                            className="h-11 px-6"
                                                            onClick={handleCompleteModule}
                                                        >
                                                            <CheckCircle2 className="w-4 h-4 mr-2 stroke-[2.5]" />
                                                            Tandai Selesai
                                                        </Button>
                                                    </div>
                                                )}
                                                
                                                {activeTab === 'langkah' && (
                                                    <div className="space-y-4">
                                                        <h3 className="text-base font-black uppercase text-black dark:text-white mb-2">Panduan Tahapan Praktik</h3>
                                                        <div className="space-y-3">
                                                            <div className="p-4 bg-card-subtle rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                                <h4 className="text-xs font-black uppercase text-black dark:text-white mb-1">Langkah 1: Pemanasan Ringan (2 Menit)</h4>
                                                                <p className="text-xs font-bold text-muted-foreground leading-relaxed">Ajak si kecil menggerakkan tangan dan kaki dengan lagu anak yang ceria untuk melemaskan persendian.</p>
                                                            </div>
                                                            <div className="p-4 bg-card-subtle rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                                <h4 className="text-xs font-black uppercase text-black dark:text-white mb-1">Langkah 2: Stimulasi Inti (10 Menit)</h4>
                                                                <p className="text-xs font-bold text-muted-foreground leading-relaxed">Lakukan gerakan latihan sesuai video panduan. Berikan jeda istirahat jika si kecil merasa lelah.</p>
                                                            </div>
                                                            <div className="p-4 bg-card-subtle rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                                <h4 className="text-xs font-black uppercase text-black dark:text-white mb-1">Langkah 3: Apresiasi Positif & Pendinginan</h4>
                                                                <p className="text-xs font-bold text-muted-foreground leading-relaxed">Berikan pujian hangat dan pelukan atas usaha si kecil, lalu berikan air minum secukupnya.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {activeTab === 'alat' && (
                                                    <div className="space-y-4">
                                                        <h3 className="text-base font-black uppercase text-black dark:text-white mb-2">Peralatan yang Disiapkan di Rumah</h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            <div className="p-3.5 bg-card-subtle rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                                <p className="text-xs font-black uppercase text-black dark:text-white">1. Matras / Play Mat</p>
                                                                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">Alas bermain empuk agar si kecil nyaman & aman.</p>
                                                            </div>
                                                            <div className="p-3.5 bg-card-subtle rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                                <p className="text-xs font-black uppercase text-black dark:text-white">2. Bola Kain / Boneka</p>
                                                                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">Mainan ringan untuk melatih respons tangkap & lempar.</p>
                                                            </div>
                                                            <div className="p-3.5 bg-card-subtle rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                                <p className="text-xs font-black uppercase text-black dark:text-white">3. Selotip Kertas Warna</p>
                                                                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">Untuk membuat garis lurus atau pola jalan di lantai.</p>
                                                            </div>
                                                            <div className="p-3.5 bg-card-subtle rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                                <p className="text-xs font-black uppercase text-black dark:text-white">4. Botol Minum Anak</p>
                                                                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">Menjaga hidrasi si kecil selama sesi bermain aktif.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {currentContent.type === 'infografik' && (
                                    <div className="flex flex-col gap-6">
                                        {currentContent.infographics?.map((info: any, i: number) => (
                                            <InfographicCard 
                                                key={i}
                                                title={info.title}
                                                tag={info.tag}
                                                image={info.image}
                                                caption={info.caption}
                                                stats={info.stats?.map((s: any) => ({
                                                    ...s,
                                                    colorClass: s.color
                                                }))}
                                            />
                                        ))}

                                        {currentContent.principles && (
                                            <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
                                                <h3 className="text-base font-black uppercase text-black dark:text-white mb-2">{currentContent.principles.title}</h3>
                                                <p className="text-xs font-bold text-muted-foreground leading-relaxed mb-6">
                                                    {currentContent.principles.description}
                                                </p>
                                                
                                                <div className="space-y-4">
                                                    {currentContent.principles.items?.map((item: any, idx: number) => (
                                                        <div key={idx} className="bg-card-subtle border-2 border-black rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                            <h4 className="text-xs font-black uppercase text-black dark:text-white mb-1">{item.title}</h4>
                                                            <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <Button 
                                                    variant="primary" 
                                                    className="h-11 px-6 mt-6"
                                                    onClick={handleCompleteModule}
                                                >
                                                    <CheckCircle2 className="w-4 h-4 mr-2 stroke-[2.5]" />
                                                    Tandai Selesai Membaca Infografis
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {currentContent.type === 'artikel' && (
                                    <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
                                        <div className="text-black dark:text-white space-y-4">
                                            <p className="font-bold text-xs md:text-sm leading-relaxed mb-6 text-muted-foreground">{currentContent.description}</p>
                                            {currentContent.content && (
                                                <div dangerouslySetInnerHTML={{ __html: currentContent.content }} />
                                            )}
                                        </div>
                                        <Button 
                                            variant="primary" 
                                            className="h-11 px-6 mt-6"
                                            onClick={handleCompleteModule}
                                        >
                                            <CheckCircle2 className="w-4 h-4 mr-2 stroke-[2.5]" />
                                            Tandai Selesai
                                        </Button>
                                    </div>
                                )}

                                {currentContent.type === 'kuis' && (
                                    <>
                                        {/* Stage 1: Onboarding */}
                                        {quizStage === 'onboarding' && (
                                            <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                                                <div className="w-20 h-20 bg-info text-white border-2 border-black rounded-2xl flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                                    <Target className="w-10 h-10 stroke-[2.5]" />
                                                </div>
                                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black dark:text-white mb-3">{currentContent.title}</h2>
                                                <p className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wide max-w-md mb-8 leading-relaxed">
                                                    {currentContent.description}
                                                </p>

                                                <div className="flex flex-wrap justify-center items-center gap-6 mb-8 bg-card border-2 border-black px-6 py-3 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase text-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-foreground stroke-[2.5]" />
                                                        <span>{quizQuestions.length} Soal</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-foreground stroke-[2.5]" />
                                                        <span>~5 Menit</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Award className="w-4 h-4 text-foreground stroke-[2.5]" />
                                                        <span>Passing: 5/{quizQuestions.length}</span>
                                                    </div>
                                                </div>

                                                <Button 
                                                    variant="secondary" 
                                                    size="lg"
                                                    onClick={() => setQuizStage('questions')}
                                                >
                                                    Mulai Kuis Sekarang
                                                    <ArrowRightIcon className="w-5 h-5 ml-2 stroke-[3]" />
                                                </Button>
                                            </div>
                                        )}

                                        {/* Stage 2: Questions */}
                                        {quizStage === 'questions' && (
                                            <div className="flex flex-col gap-6">
                                                {/* Progress Header */}
                                                <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5">
                                                    <div className="flex items-center justify-between mb-2 text-xs font-black uppercase text-black dark:text-white">
                                                        <span>Soal {currentQuestion + 1} dari {quizQuestions.length}</span>
                                                        <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
                                                    </div>
                                                    <div className="h-3 bg-muted border-2 border-black rounded-full overflow-hidden p-0.5">
                                                        <div 
                                                            className="h-full bg-success rounded-full transition-all duration-300" 
                                                            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Question Card */}
                                                <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
                                                    <h3 className="text-base md:text-lg font-black uppercase text-black dark:text-white mb-6 leading-relaxed">
                                                        {quizQuestions[currentQuestion].question}
                                                    </h3>

                                                    <div className="flex flex-col gap-3">
                                                        {quizQuestions[currentQuestion].options.map((option, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: idx }))}
                                                                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                                                    selectedAnswers[currentQuestion] === idx
                                                                        ? 'border-black bg-success text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                                                                        : 'border-black bg-card hover:bg-muted text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`w-7 h-7 rounded-lg border-2 border-black flex items-center justify-center shrink-0 text-xs font-black ${
                                                                        selectedAnswers[currentQuestion] === idx
                                                                            ? 'bg-black text-white'
                                                                            : 'bg-muted text-foreground'
                                                                    }`}>
                                                                        {String.fromCharCode(65 + idx)}
                                                                    </div>
                                                                    <span className="text-xs md:text-sm font-bold">{option}</span>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-black/10">
                                                        <Button 
                                                            variant="outline" 
                                                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                                            disabled={currentQuestion === 0}
                                                        >
                                                            <ArrowLeft className="w-4 h-4 mr-2 stroke-[3]" />
                                                            Sebelumnya
                                                        </Button>

                                                        {currentQuestion < quizQuestions.length - 1 ? (
                                                            <Button 
                                                                variant="primary" 
                                                                onClick={() => setCurrentQuestion(prev => prev + 1)}
                                                                disabled={selectedAnswers[currentQuestion] === undefined}
                                                            >
                                                                Selanjutnya
                                                                <ArrowRightIcon className="w-4 h-4 ml-2 stroke-[3]" />
                                                            </Button>
                                                        ) : (
                                                            <Button 
                                                                variant="secondary" 
                                                                onClick={() => setQuizStage('results')}
                                                                disabled={selectedAnswers[currentQuestion] === undefined}
                                                            >
                                                                <CheckCircle2 className="w-4 h-4 mr-2 stroke-[3]" />
                                                                Selesai
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Stage 3: Results */}
                                        {quizStage === 'results' && (
                                            <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                                                <div className={`w-20 h-20 rounded-2xl border-2 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                                                    quizPassed ? 'bg-success text-black' : 'bg-warning text-black'
                                                }`}>
                                                    {quizPassed ? <Award className="w-10 h-10 stroke-[2.5]" /> : <RotateCcw className="w-10 h-10 stroke-[2.5]" />}
                                                </div>

                                                <Badge variant={quizPassed ? 'success' : 'warning'} className="mb-3">
                                                    {quizPassed ? 'Lulus! 🎉' : 'Perlu Belajar Lagi'}
                                                </Badge>

                                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black dark:text-white mb-2">
                                                    Skor Anda: {quizScore}/{quizQuestions.length}
                                                </h2>
                                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide max-w-md mb-8 leading-relaxed">
                                                    {quizPassed 
                                                        ? 'Selamat! Anda telah memahami materi milestone perkembangan anak dengan baik.' 
                                                        : 'Jangan menyerah! Coba tinjau kembali materi dan ulangi kuis ini.'}
                                                </p>

                                                {/* Score Bar */}
                                                <div className="w-full max-w-sm mb-8 bg-card-subtle border-2 border-black p-4 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    <div className="h-3 bg-muted border-2 border-black rounded-full overflow-hidden p-0.5">
                                                        <div 
                                                            className={`h-full rounded-full ${quizPassed ? 'bg-success' : 'bg-warning'}`}
                                                            style={{ width: `${(quizScore / quizQuestions.length) * 100}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between mt-2 text-[10px] font-black uppercase text-black dark:text-white">
                                                        <span>Skor: 0</span>
                                                        <span className="text-primary">Batas Lulus: 5/7</span>
                                                        <span>Maks: {quizQuestions.length}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap justify-center gap-3">
                                                    <Button 
                                                        variant="outline" 
                                                        onClick={() => setQuizStage('review')}
                                                    >
                                                        Lihat Tinjauan Jawaban
                                                    </Button>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={() => {
                                                             setQuizStage('onboarding');
                                                             setCurrentQuestion(0);
                                                             setSelectedAnswers({});
                                                        }}
                                                    >
                                                        <RotateCcw className="w-4 h-4 mr-2 stroke-[2.5]" />
                                                        Ulangi Kuis
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Stage 4: Review */}
                                        {quizStage === 'review' && (
                                            <div className="flex flex-col gap-4">
                                                <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 flex items-center justify-between">
                                                    <h3 className="text-base font-black uppercase text-black dark:text-white">Tinjauan Jawaban</h3>
                                                    <Badge variant={quizPassed ? 'success' : 'warning'}>
                                                        Skor: {quizScore}/{quizQuestions.length}
                                                    </Badge>
                                                </div>

                                                {quizQuestions.map((q, idx) => {
                                                    const userAnswer = selectedAnswers[idx];
                                                    const isCorrect = userAnswer === q.correctAnswer;
                                                    return (
                                                        <div key={idx} className={`bg-card rounded-2xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4`}>
                                                            <div className="flex items-start gap-3">
                                                                <div className={`w-8 h-8 rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] ${
                                                                    isCorrect ? 'bg-success text-black' : 'bg-danger text-white'
                                                                }`}>
                                                                    {isCorrect ? <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> : <XCircle className="w-5 h-5 stroke-[2.5]" />}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-0.5">Soal {idx + 1}</p>
                                                                    <p className="text-xs md:text-sm font-black uppercase text-black dark:text-white leading-relaxed">{q.question}</p>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2 text-xs font-bold">
                                                                <div className={`p-3 rounded-xl border-2 border-black ${
                                                                    isCorrect 
                                                                        ? 'bg-success text-black'
                                                                        : 'bg-danger text-white line-through'
                                                                }`}>
                                                                    Jawaban Anda: {q.options[userAnswer] || 'Tidak dijawab'}
                                                                </div>
                                                                {!isCorrect && (
                                                                    <div className="p-3 rounded-xl bg-success text-black border-2 border-black font-bold">
                                                                        Jawaban Benar: {q.options[q.correctAnswer]}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="p-3 bg-sidebar rounded-xl border-2 border-black text-xs font-bold text-muted-foreground">
                                                                💡 {q.explanation}
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                <div className="flex justify-center gap-3 mt-4">
                                                    <Button 
                                                        variant="outline" 
                                                        onClick={() => setQuizStage('results')}
                                                    >
                                                        <ArrowLeft className="w-4 h-4 mr-2 stroke-[3]" />
                                                        Kembali ke Hasil
                                                    </Button>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={() => {
                                                             setQuizStage('onboarding');
                                                             setCurrentQuestion(0);
                                                             setSelectedAnswers({});
                                                        }}
                                                    >
                                                        <RotateCcw className="w-4 h-4 mr-2 stroke-[2.5]" />
                                                        Ulangi Kuis
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Right Column: Sidebar */}
                            <div className="flex-[1] flex flex-col gap-6">
                                
                                {/* Jejak Pembelajaran Card */}
                                <LearningTrailCard modules={trailModules} />

                                {/* Download Resource Card (Segera Hadir) */}
                                <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 flex items-center justify-between opacity-80 select-none cursor-not-allowed" title="Dokumen PDF materi edukasi akan segera tersedia">
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-11 h-11 rounded-xl bg-card border-2 border-black flex items-center justify-center text-foreground shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] shrink-0">
                                            <FileText className="w-5 h-5 stroke-[2.5]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase text-black dark:text-white">Ringkasan Materi (PDF)</p>
                                            <span className="text-[9px] bg-warning text-black px-1.5 py-0.5 rounded border border-black font-black uppercase">Segera Hadir</span>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-muted border-2 border-black flex items-center justify-center text-muted-foreground">
                                        <Download className="w-4 h-4 stroke-[2.5]" />
                                    </div>
                                </div>

                                {/* Materi Terkait Card */}
                                <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                                    <h4 className="text-xs font-black uppercase tracking-wider text-black dark:text-white mb-5 border-b-2 border-black/10 pb-2">Materi Terkait</h4>
                                    
                                    <div className="space-y-4">
                                        {/* Item 1 */}
                                        <Link href="/edukasi/detail?id=nutrisi_dasar" className="flex items-start gap-3 group bg-card-subtle p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                                            <div className="w-14 h-14 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-black relative">
                                                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Thumbnail" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-black uppercase text-black dark:text-white group-hover:text-primary transition-colors leading-tight mb-1 line-clamp-2">
                                                    Mengenal Superfood untuk Balita
                                                </p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Artikel • 5 min read</p>
                                            </div>
                                        </Link>

                                        {/* Item 2 */}
                                        <Link href="/edukasi/detail?id=gizi_overweight" className="flex items-start gap-3 group bg-card-subtle p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                                            <div className="w-14 h-14 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-black relative">
                                                <img src="https://images.unsplash.com/photo-1574716954284-9db2c0a9e71e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Thumbnail" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                    <div className="w-5 h-5 bg-primary border border-black rounded-full flex items-center justify-center">
                                                        <Play className="w-2.5 h-2.5 text-black fill-black ml-0.5" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-black uppercase text-black dark:text-white group-hover:text-info transition-colors leading-tight mb-1 line-clamp-2">
                                                    Ide Bekal Praktis & Bergizi
                                                </p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Video • 8 min watch</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

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
            </div>
        </div>
    );
}
