import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import InfographicCard from '../Components/Cards/InfographicCard';
import LearningTrailCard, { TrailModule } from '../Components/Cards/LearningTrailCard';
import { ArrowLeft, ArrowRight as ArrowRightIcon, Download, Play, Pause, Volume2, Maximize, CheckCircle2, FileText, Leaf, Activity, PersonStanding, Target, Clock, Award, XCircle, RotateCcw } from 'lucide-react';

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

    // Quiz state
    const [quizStage, setQuizStage] = useState<'onboarding' | 'questions' | 'results' | 'review'>('onboarding');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            setContentId(id);
            // Reset quiz state when content changes
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
                <h3 class="text-lg font-bold mb-3 text-netral">Porsi Makan Ideal</h3>
                <p class="mb-6 text-netral/80">Pastikan setengah piring diisi dengan sayur dan buah yang kaya akan serat, vitamin, dan mineral. Seperempat piring diisi dengan karbohidrat kompleks seperti nasi merah atau roti gandum, dan seperempat sisanya dengan protein berkualitas seperti telur, ikan, atau tempe.</p>
                <h3 class="text-lg font-bold mb-3 text-netral">Pilih Camilan Sehat</h3>
                <p class="text-netral/80">Hindari makanan olahan manis yang tinggi gula. Biasakan anak untuk mengonsumsi camilan sehat seperti potongan buah segar, yogurt tanpa tambahan gula, atau kacang-kacangan ringan sebagai pengisi energi di antara waktu makan utama.</p>
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
                        { value: "1/4", label: "Protein", color: "text-secondary" },
                        { value: "1/4", label: "Karbohidrat", color: "text-[#d97706]" }
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

    // Dummy data for Learning Trail
    const trailModules: TrailModule[] = [
        { id: 1, subtitle: 'Modul 1', title: contentId === 'motorik' ? 'Pengantar Motorik Kasar' : 'Pengantar Gizi Anak', status: 'completed' },
        { id: 2, subtitle: 'Modul 2 (Saat Ini)', title: contentId === 'motorik' ? 'Latihan di Rumah' : 'Makro & Mikro Nutrisi', status: 'current' },
        { id: 3, subtitle: 'Modul 3', title: contentId === 'motorik' ? 'Evaluasi dan Milestone' : 'Perencanaan Menu Harian', status: 'locked' },
    ];

    return (
        <div className="min-h-screen bg-background flex w-full">
            <Head title="Detail Edukasi" />
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
                                        className="inline-flex items-center gap-2 text-netral text-sm font-medium hover:text-netral/70 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Kembali ke Pusat Edukasi
                                    </Link>
                                </div>

                                {/* Header Section */}
                                <div className="mb-2">
                                    <Badge variant={(currentContent.badgeVariant as any) || 'primary'} className="mb-4">
                                        {currentContent.badge}
                                    </Badge>
                                    <h1 className="text-netral text-3xl md:text-[32px] leading-tight font-bold mb-2">
                                        {currentContent.title}
                                    </h1>
                                    {currentContent.subtitle && (
                                        <p className="text-body-thin text-netral/80 max-w-2xl leading-relaxed">
                                            {currentContent.subtitle}
                                        </p>
                                    )}
                                </div>

                                {currentContent.type === 'video' && (
                                    <>
                                        {/* Video Player Component */}
                                        <div className="w-full bg-muted rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center border border-border/60">
                                            {/* Video Placeholder Image (simulate with div) */}
                                            <div className="absolute inset-0 bg-muted flex items-center justify-center overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Video thumbnail" className="w-full h-full object-cover opacity-80" />
                                                <div className="absolute inset-0 bg-netral/10"></div>
                                            </div>
                                            
                                            {/* Play Button Overlay */}
                                            <button className="w-16 h-12 bg-card/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary hover:scale-105 transition-transform z-10 shadow-lg">
                                                <Play className="w-6 h-6 ml-1 fill-primary" />
                                            </button>

                                            {/* Video Controls Bar */}
                                            <div className="absolute bottom-0 left-0 w-full h-12 bg-card/95 backdrop-blur flex items-center px-4 gap-4 border-t border-border/40">
                                                <Pause className="w-4 h-4 text-netral cursor-pointer" />
                                                
                                                {/* Progress Bar */}
                                                <div className="flex-1 flex items-center gap-2">
                                                    <div className="h-1.5 flex-1 bg-secondary/20 rounded-full relative cursor-pointer">
                                                        <div className="absolute top-0 left-0 h-full w-[40%] bg-primary rounded-full"></div>
                                                        <div className="absolute top-1/2 -translate-y-1/2 left-[40%] w-3 h-3 bg-primary rounded-full shadow-sm"></div>
                                                    </div>
                                                </div>
                                                
                                                <span className="text-[11px] font-medium text-netral/70">02:15 / 05:30</span>
                                                
                                                <div className="flex items-center gap-3 ml-2">
                                                    <Volume2 className="w-4 h-4 text-netral cursor-pointer" />
                                                    <Maximize className="w-4 h-4 text-netral cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Tabs */}
                                        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden mt-2">
                                            {/* Tab Navigation */}
                                            <div className="flex border-b border-border/40 bg-muted/50">
                                                <button 
                                                    onClick={() => setActiveTab('tentang')}
                                                    className={`flex-1 py-4 text-sm font-semibold text-center transition-colors border-b-2 ${activeTab === 'tentang' ? 'border-primary text-primary bg-card' : 'border-transparent text-netral/60 hover:text-netral hover:bg-card/50'}`}
                                                >
                                                    Tentang Materi
                                                </button>
                                                <button 
                                                    onClick={() => setActiveTab('langkah')}
                                                    className={`flex-1 py-4 text-sm font-semibold text-center transition-colors border-b-2 ${activeTab === 'langkah' ? 'border-primary text-primary bg-card' : 'border-transparent text-netral/60 hover:text-netral hover:bg-card/50'}`}
                                                >
                                                    Langkah-Langkah
                                                </button>
                                                <button 
                                                    onClick={() => setActiveTab('alat')}
                                                    className={`flex-1 py-4 text-sm font-semibold text-center transition-colors border-b-2 ${activeTab === 'alat' ? 'border-primary text-primary bg-card' : 'border-transparent text-netral/60 hover:text-netral hover:bg-card/50'}`}
                                                >
                                                    Alat yang Dibutuhkan
                                                </button>
                                            </div>

                                            {/* Tab Content */}
                                            <div className="p-8">
                                                {activeTab === 'tentang' && (
                                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                        <p className="text-body text-netral/90 leading-relaxed mb-10">
                                                            {currentContent.description}
                                                        </p>

                                                        <h3 className="text-[22px] font-bold text-netral mb-6">Aktivitas Utama</h3>
                                                        
                                                        <div className="space-y-4 mb-10">
                                                            {currentContent.activities?.map((act: any) => (
                                                                <div key={act.id} className="border border-border/60 rounded-xl p-5 flex gap-5 bg-muted/30 hover:bg-card transition-colors">
                                                                    <div className="w-10 h-10 rounded-xl bg-secondary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                                                                        {act.id}
                                                                    </div>
                                                                    <div>
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <h4 className="text-body-bold text-netral">{act.title}</h4>
                                                                            {act.id === 1 && <PersonStanding className="w-4 h-4 text-secondary" />}
                                                                            {act.id === 2 && <Activity className="w-4 h-4 text-secondary" />}
                                                                            {act.id === 3 && <Target className="w-4 h-4 text-secondary" />}
                                                                        </div>
                                                                        <p className="text-body-thin text-netral/70 leading-relaxed">
                                                                            {act.desc}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <Button variant="primary" className="h-12 px-6 rounded-xl font-bold shadow-sm shadow-primary/20">
                                                            <CheckCircle2 className="w-5 h-5 mr-2" />
                                                            Tandai Selesai
                                                        </Button>
                                                    </div>
                                                )}
                                                
                                                {activeTab === 'langkah' && (
                                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                        <p className="text-body-thin text-netral/90 leading-relaxed">Konten langkah-langkah latihan belum tersedia.</p>
                                                    </div>
                                                )}

                                                {activeTab === 'alat' && (
                                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                        <p className="text-body-thin text-netral/90 leading-relaxed">Konten alat yang dibutuhkan belum tersedia.</p>
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
                                            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-8">
                                                <h3 className="text-section-title text-netral mb-4">{currentContent.principles.title}</h3>
                                                <p className="text-body-thin text-netral/80 leading-relaxed mb-8">
                                                    {currentContent.principles.description}
                                                </p>
                                                
                                                <div className="space-y-6">
                                                    {currentContent.principles.items?.map((item: any, idx: number) => (
                                                        <div key={idx}>
                                                            <h4 className="text-body-bold text-netral mb-2">{item.title}</h4>
                                                            <p className="text-body-thin text-netral/70 leading-relaxed">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {currentContent.type === 'artikel' && (
                                    <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-8">
                                        <div className="prose max-w-none text-body-thin text-netral">
                                            <p className="leading-relaxed mb-8 text-[16px]">{currentContent.description}</p>
                                            {currentContent.content && (
                                                <div dangerouslySetInnerHTML={{ __html: currentContent.content }} />
                                            )}
                                        </div>
                                        <Button variant="primary" className="h-12 px-6 rounded-xl font-bold shadow-sm shadow-primary/20 mt-8">
                                            <CheckCircle2 className="w-5 h-5 mr-2" />
                                            Tandai Selesai
                                        </Button>
                                    </div>
                                )}

                                {currentContent.type === 'kuis' && (
                                    <>
                                        {/* Stage 1: Onboarding */}
                                        {quizStage === 'onboarding' && (
                                            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                                                <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8 shadow-sm">
                                                    <Target className="w-10 h-10" />
                                                </div>
                                                <h2 className="text-netral mb-4 leading-tight">{currentContent.title}</h2>
                                                <p className="text-body-thin text-netral/70 max-w-md mb-10 leading-relaxed">
                                                    {currentContent.description}
                                                </p>

                                                <div className="flex items-center gap-8 mb-10">
                                                    <div className="flex items-center gap-2 text-netral/70">
                                                        <FileText className="w-4 h-4 text-secondary" />
                                                        <span className="text-body-thin">{quizQuestions.length} Soal</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-netral/70">
                                                        <Clock className="w-4 h-4 text-secondary" />
                                                        <span className="text-body-thin">~5 Menit</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-netral/70">
                                                        <Award className="w-4 h-4 text-secondary" />
                                                        <span className="text-body-thin">Passing: 5/{quizQuestions.length}</span>
                                                    </div>
                                                </div>

                                                <Button 
                                                    variant="secondary" 
                                                    size="lg"
                                                    className="rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                                    onClick={() => setQuizStage('questions')}
                                                >
                                                    Mulai Kuis Sekarang
                                                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                                                </Button>
                                            </div>
                                        )}

                                        {/* Stage 2: Questions */}
                                        {quizStage === 'questions' && (
                                            <div className="flex flex-col gap-6">
                                                {/* Progress Header */}
                                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-body-bold text-netral">Soal {currentQuestion + 1} dari {quizQuestions.length}</span>
                                                        <span className="text-small-text text-netral/60">{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
                                                            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Question Card */}
                                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-8">
                                                    <h3 className="text-netral mb-8 leading-relaxed">
                                                        {quizQuestions[currentQuestion].question}
                                                    </h3>

                                                    <div className="flex flex-col gap-3">
                                                        {quizQuestions[currentQuestion].options.map((option, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: idx }))}
                                                                className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                                                                    selectedAnswers[currentQuestion] === idx
                                                                        ? 'border-primary bg-primary/5 text-netral'
                                                                        : 'border-border/40 bg-card hover:border-primary/30 hover:bg-muted/30 text-netral'
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 text-body-bold ${
                                                                        selectedAnswers[currentQuestion] === idx
                                                                            ? 'border-primary bg-primary text-primary-foreground'
                                                                            : 'border-border/60 text-netral/50'
                                                                    }`}>
                                                                        {String.fromCharCode(65 + idx)}
                                                                    </div>
                                                                    <span className="text-body-thin">{option}</span>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/40">
                                                        <Button 
                                                            variant="ghost" 
                                                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                                            disabled={currentQuestion === 0}
                                                            className="text-netral/70"
                                                        >
                                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                                            Sebelumnya
                                                        </Button>

                                                        {currentQuestion < quizQuestions.length - 1 ? (
                                                            <Button 
                                                                variant="primary" 
                                                                className="rounded-xl"
                                                                onClick={() => setCurrentQuestion(prev => prev + 1)}
                                                                disabled={selectedAnswers[currentQuestion] === undefined}
                                                            >
                                                                Selanjutnya
                                                                <ArrowRightIcon className="w-4 h-4 ml-2" />
                                                            </Button>
                                                        ) : (
                                                            <Button 
                                                                variant="secondary" 
                                                                className="rounded-xl"
                                                                onClick={() => setQuizStage('results')}
                                                                disabled={selectedAnswers[currentQuestion] === undefined}
                                                            >
                                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                                Selesai
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Stage 3: Results */}
                                        {quizStage === 'results' && (
                                            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                                                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
                                                    quizPassed ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                                                }`}>
                                                    {quizPassed ? <Award className="w-12 h-12" /> : <RotateCcw className="w-12 h-12" />}
                                                </div>

                                                <Badge variant={quizPassed ? 'primary' : 'secondary'} className="mb-4">
                                                    {quizPassed ? 'Lulus! 🎉' : 'Perlu Belajar Lagi'}
                                                </Badge>

                                                <h2 className="text-netral mb-2">
                                                    Skor Anda: {quizScore}/{quizQuestions.length}
                                                </h2>
                                                <p className="text-body-thin text-netral/70 max-w-md mb-8 leading-relaxed">
                                                    {quizPassed 
                                                        ? 'Selamat! Anda telah memahami materi milestone perkembangan anak dengan baik.' 
                                                        : 'Jangan menyerah! Coba tinjau kembali materi dan ulangi kuis ini.'}
                                                </p>

                                                {/* Score Bar */}
                                                <div className="w-full max-w-sm mb-10">
                                                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full transition-all duration-700 ease-out ${quizPassed ? 'bg-primary' : 'bg-secondary'}`}
                                                            style={{ width: `${(quizScore / quizQuestions.length) * 100}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between mt-2">
                                                        <span className="text-small-text text-netral/50">0</span>
                                                        <span className="text-small-text text-netral/50">Passing: 5</span>
                                                        <span className="text-small-text text-netral/50">{quizQuestions.length}</span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-4">
                                                    <Button 
                                                        variant="outline" 
                                                        className="rounded-xl"
                                                        onClick={() => setQuizStage('review')}
                                                    >
                                                        Lihat Tinjauan Jawaban
                                                    </Button>
                                                    <Button 
                                                        variant="primary" 
                                                        className="rounded-xl"
                                                        onClick={() => {
                                                            setQuizStage('onboarding');
                                                            setCurrentQuestion(0);
                                                            setSelectedAnswers({});
                                                        }}
                                                    >
                                                        <RotateCcw className="w-4 h-4 mr-2" />
                                                        Ulangi Kuis
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Stage 4: Review */}
                                        {quizStage === 'review' && (
                                            <div className="flex flex-col gap-4">
                                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 flex items-center justify-between">
                                                    <h3 className="text-netral">Tinjauan Jawaban</h3>
                                                    <Badge variant={quizPassed ? 'primary' : 'secondary'}>
                                                        Skor: {quizScore}/{quizQuestions.length}
                                                    </Badge>
                                                </div>

                                                {quizQuestions.map((q, idx) => {
                                                    const userAnswer = selectedAnswers[idx];
                                                    const isCorrect = userAnswer === q.correctAnswer;
                                                    return (
                                                        <div key={idx} className={`bg-card rounded-2xl border-2 shadow-sm p-6 ${
                                                            isCorrect ? 'border-primary/30' : 'border-secondary/30'
                                                        }`}>
                                                            <div className="flex items-start gap-4 mb-4">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                                    isCorrect ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                                                                }`}>
                                                                    {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-small-text text-netral/50 mb-1">Soal {idx + 1}</p>
                                                                    <p className="text-body-bold text-netral leading-relaxed">{q.question}</p>
                                                                </div>
                                                            </div>

                                                            <div className="ml-12 space-y-2 mb-4">
                                                                <div className={`p-3 rounded-lg text-body-thin ${
                                                                    isCorrect 
                                                                        ? 'bg-primary/5 text-primary border border-primary/20'
                                                                        : 'bg-secondary/5 text-secondary border border-secondary/20 line-through'
                                                                }`}>
                                                                    Jawaban Anda: {q.options[userAnswer]}
                                                                </div>
                                                                {!isCorrect && (
                                                                    <div className="p-3 rounded-lg bg-primary/5 text-primary border border-primary/20 text-body-thin">
                                                                        Jawaban Benar: {q.options[q.correctAnswer]}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="ml-12 p-4 bg-muted/50 rounded-xl">
                                                                <p className="text-small-text text-netral/70 leading-relaxed">
                                                                    💡 {q.explanation}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                <div className="flex justify-center gap-4 mt-4">
                                                    <Button 
                                                        variant="outline" 
                                                        className="rounded-xl"
                                                        onClick={() => setQuizStage('results')}
                                                    >
                                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                                        Kembali ke Hasil
                                                    </Button>
                                                    <Button 
                                                        variant="primary" 
                                                        className="rounded-xl"
                                                        onClick={() => {
                                                            setQuizStage('onboarding');
                                                            setCurrentQuestion(0);
                                                            setSelectedAnswers({});
                                                        }}
                                                    >
                                                        <RotateCcw className="w-4 h-4 mr-2" />
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
                                
                                {/* Jejak Pembelajaran Card Component */}
                                <LearningTrailCard modules={trailModules} />

                                {/* Download Resource Card */}
                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-5 flex items-center justify-between group cursor-pointer hover:border-secondary/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary-foreground shrink-0">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-body-bold text-netral">Panduan PDF Materi</p>
                                            <p className="text-small-text text-netral/60 mt-0.5">PDF, 2.4 MB</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-colors">
                                        <Download className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Materi Terkait Card */}
                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                    <h4 className="text-primary mb-6">Materi Terkait</h4>
                                    
                                    <div className="space-y-5">
                                        {/* Item 1 */}
                                        <Link href="#" className="flex items-start gap-4 group">
                                            <div className="w-16 h-16 rounded-xl bg-primary/10 flex-shrink-0 overflow-hidden flex items-center justify-center border border-border/40 group-hover:border-primary/40 transition-colors relative">
                                                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Thumbnail" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 py-1">
                                                <p className="text-body-bold text-netral group-hover:text-primary transition-colors leading-tight mb-1 line-clamp-2">
                                                    Mengenal Superfood untuk Balita
                                                </p>
                                                <p className="text-small-text text-netral/60">Artikel • 5 min read</p>
                                            </div>
                                        </Link>

                                        {/* Item 2 */}
                                        <Link href="#" className="flex items-start gap-4 group">
                                            <div className="w-16 h-16 rounded-xl bg-secondary/10 flex-shrink-0 overflow-hidden flex items-center justify-center border border-border/40 group-hover:border-secondary/40 transition-colors relative">
                                                <img src="https://images.unsplash.com/photo-1574716954284-9db2c0a9e71e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Thumbnail" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-netral/10 flex items-center justify-center">
                                                    <div className="w-6 h-6 bg-card rounded-full flex items-center justify-center">
                                                        <Play className="w-3 h-3 text-secondary fill-secondary ml-0.5" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 py-1">
                                                <p className="text-body-bold text-netral group-hover:text-secondary transition-colors leading-tight mb-1 line-clamp-2">
                                                    Ide Bekal Sekolah Praktis & Bergizi
                                                </p>
                                                <p className="text-small-text text-netral/60">Video • 8 min watch</p>
                                            </div>
                                        </Link>
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
