import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import FormCard from '../Components/Cards/FormCard';
import TextInput from '../Components/Inputs/TextInput';
import YesNoToggle from '../Components/Inputs/YesNoToggle';
import Badge from '../Components/Badges/Badge';
import { computeBMI, getBMIStatus, getBMIStatusStyle } from '../utils/bmi';
import { Activity, CheckCircle2, ArrowRight, Info, Scale, AlertTriangle } from 'lucide-react';

export default function ScreeningAnak() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Antropometri State
    const [usiaAnak, setUsiaAnak] = useState('');
    const [beratBadan, setBeratBadan] = useState('');
    const [tinggiBadan, setTinggiBadan] = useState('');
    const [lingkarPinggang, setLingkarPinggang] = useState('');
    const [imtScore, setImtScore] = useState<number | null>(null);
    const [imtStatus, setImtStatus] = useState<string>('');

    // Kuesioner State
    const [kuesioner, setKuesioner] = useState({
        q1: null as 'ya' | 'tidak' | null,
        q2: null as 'ya' | 'tidak' | null,
        q3: null as 'ya' | 'tidak' | null,
        q4: null as 'ya' | 'tidak' | null,
        q5: null as 'ya' | 'tidak' | null,
    });

    useEffect(() => {
        const weight = parseFloat(beratBadan);
        const heightCm = parseFloat(tinggiBadan);

        if (weight > 0 && heightCm > 0) {
            const formattedScore = computeBMI(weight, heightCm);
            if (formattedScore !== null) {
                setImtScore(formattedScore);
                const status = getBMIStatus(formattedScore);
                setImtStatus(status);

                if (typeof window !== 'undefined') {
                    localStorage.setItem('childIMTScore', formattedScore.toString());
                    localStorage.setItem('childIMTStatus', status);
                    localStorage.setItem('childAge', usiaAnak);
                    localStorage.setItem('childWeight', beratBadan);
                    localStorage.setItem('childHeight', tinggiBadan);
                    localStorage.setItem('childWaist', lingkarPinggang);
                }
            }
        } else {
            setImtScore(null);
            setImtStatus('');
        }
    }, [beratBadan, tinggiBadan, usiaAnak, lingkarPinggang]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('childQuestionnaire', JSON.stringify(kuesioner));
        }
    }, [kuesioner]);

    const handleKuesionerChange = (key: keyof typeof kuesioner, value: 'ya' | 'tidak') => {
        setKuesioner(prev => ({ ...prev, [key]: value }));
    };

    const isFormValid = usiaAnak && beratBadan && tinggiBadan &&
        kuesioner.q1 && kuesioner.q2 && kuesioner.q3 && kuesioner.q4 && kuesioner.q5;

    const statusStyle = imtStatus ? getBMIStatusStyle(imtStatus) : null;

    return (
        <div className="min-h-screen bg-background flex w-full font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title="Screening Anak - EmoGROW" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <div className="max-w-6xl mx-auto space-y-6">

                        {/* Steps Breadcrumbs Header */}
                        <div className="flex flex-col items-start pb-2">
                            <Badge variant="primary" className="mb-2">
                                Langkah 1 dari 2: Input Data Anak
                            </Badge>
                            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
                                Formulir Screening Tumbuh Kembang
                            </h1>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-1">
                                Lengkapi metrik antropometri fisik dan observasi milestone untuk analisis kesehatan terpadu.
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 items-start">

                            {/* Left Column: Form Inputs */}
                            <div className="flex-1 w-full flex flex-col gap-6">

                                {/* Antropometri Section */}
                                <FormCard
                                    title="Metrik Antropometri Fisik"
                                    subtitle="Masukkan data berat badan dan tinggi badan aktual anak"
                                    icon={<Scale className="w-5 h-5 text-black dark:text-white" strokeWidth={2.5} />}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                        <TextInput 
                                            label="Usia Anak (Bulan)" 
                                            placeholder="Contoh: 24" 
                                            type="number" 
                                            value={usiaAnak} 
                                            onChange={(e) => setUsiaAnak(e.target.value)} 
                                            required
                                        />
                                        <TextInput
                                            label="Berat Badan (kg)"
                                            placeholder="Contoh: 12.5"
                                            type="number"
                                            step="0.1"
                                            value={beratBadan}
                                            onChange={(e) => setBeratBadan(e.target.value)}
                                            required
                                        />
                                        <TextInput
                                            label="Tinggi / Panjang Badan (cm)"
                                            placeholder="Contoh: 85.0"
                                            type="number"
                                            step="0.1"
                                            value={tinggiBadan}
                                            onChange={(e) => setTinggiBadan(e.target.value)}
                                            required
                                        />
                                        <TextInput
                                            label="Lingkar Pinggang (cm) *Opsional"
                                            placeholder="Contoh: 45.0"
                                            type="number"
                                            step="0.1"
                                            value={lingkarPinggang}
                                            onChange={(e) => setLingkarPinggang(e.target.value)}
                                        />
                                    </div>
                                </FormCard>

                                {/* Kuesioner Section */}
                                <FormCard
                                    title="Kuesioner Perkembangan Motorik"
                                    subtitle="Observasi milestone gerak kasar dan gerak halus anak"
                                    icon={<Activity className="w-5 h-5 text-foreground" strokeWidth={2.5} />}
                                >
                                    <div className="space-y-6 pt-1">
                                        {/* Motorik Kasar */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-black/10">
                                                <span className="w-2 h-4 bg-primary rounded-sm border border-black"></span>
                                                <h3 className="text-sm font-black uppercase tracking-wide text-foreground">Motorik Kasar</h3>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center p-4 border-2 border-black bg-card-subtle rounded-xl gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-xs md:text-sm font-bold text-foreground leading-relaxed max-w-md">
                                                        Anak dapat berjalan mundur beberapa langkah tanpa kehilangan keseimbangan?
                                                    </p>
                                                    <YesNoToggle value={kuesioner.q1} onChange={(v) => handleKuesionerChange('q1', v)} />
                                                </div>
                                                <div className="flex justify-between items-center p-4 border-2 border-black bg-card-subtle rounded-xl gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-xs md:text-sm font-bold text-foreground leading-relaxed max-w-md">
                                                        Anak mampu menendang bola ke depan tanpa berpegangan?
                                                    </p>
                                                    <YesNoToggle value={kuesioner.q2} onChange={(v) => handleKuesionerChange('q2', v)} />
                                                </div>
                                                <div className="flex justify-between items-center p-4 border-2 border-black bg-card-subtle rounded-xl gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-xs md:text-sm font-bold text-foreground leading-relaxed max-w-md">
                                                        Anak dapat melompat dengan kedua kaki terangkat dari lantai bersamaan?
                                                    </p>
                                                    <YesNoToggle value={kuesioner.q3} onChange={(v) => handleKuesionerChange('q3', v)} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Motorik Halus */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-black/10">
                                                <span className="w-2 h-4 bg-info rounded-sm border border-black"></span>
                                                <h3 className="text-sm font-black uppercase tracking-wide text-foreground">Motorik Halus</h3>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center p-4 border-2 border-black bg-card-subtle rounded-xl gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-xs md:text-sm font-bold text-foreground leading-relaxed max-w-md">
                                                        Anak dapat menyusun menara dari 4 blok kubus tanpa terjatuh?
                                                    </p>
                                                    <YesNoToggle value={kuesioner.q4} onChange={(v) => handleKuesionerChange('q4', v)} />
                                                </div>
                                                <div className="flex justify-between items-center p-4 border-2 border-black bg-card-subtle rounded-xl gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-xs md:text-sm font-bold text-foreground leading-relaxed max-w-md">
                                                        Anak mampu membalik halaman buku cerita satu per satu secara terkontrol?
                                                    </p>
                                                    <YesNoToggle value={kuesioner.q5} onChange={(v) => handleKuesionerChange('q5', v)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FormCard>

                                <Button
                                    size="lg"
                                    variant="primary"
                                    disabled={!isFormValid}
                                    className="w-full h-12 gap-2"
                                    onClick={() => router.get('/screening-anak/result')}
                                >
                                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                                    Analisis Data Screening Sekarang
                                    <ArrowRight className="w-4 h-4 ml-1 stroke-[3]" />
                                </Button>
                            </div>

                            {/* Right Column: Dynamic Calculation Preview */}
                            <div className="w-full lg:w-[360px] shrink-0 lg:sticky lg:top-24">
                                <div className="bg-card rounded-2xl border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center relative overflow-hidden">
                                    
                                    {imtScore ? (
                                        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
                                            <Badge variant="primary" className="mb-4">
                                                Hasil Kalkulasi Sementara
                                            </Badge>

                                            <div className={`w-28 h-28 rounded-2xl border-3 border-black flex flex-col items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4 ${statusStyle?.bgClass || 'bg-success'}`}>
                                                <span className="text-3xl font-black text-black tracking-tight">{imtScore}</span>
                                                <span className="text-[10px] font-black text-black/75 uppercase tracking-wider mt-0.5">Skor IMT</span>
                                            </div>

                                            <div className="flex items-center justify-center gap-2 mb-3">
                                                <span className="text-xs font-black uppercase text-muted-foreground">Status:</span>
                                                <Badge variant={statusStyle?.variant || 'success'} className="text-xs">
                                                    {imtStatus === 'Normal' && <CheckCircle2 className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />}
                                                    {imtStatus === 'Beresiko Gizi Lebih' && <AlertTriangle className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />}
                                                    {imtStatus === 'Kurus' && <Activity className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />}
                                                    {(imtStatus === 'Obesitas' || imtStatus === 'Gizi Lebih') && <AlertTriangle className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />}
                                                    {imtStatus}
                                                </Badge>
                                            </div>

                                            <div className="w-full bg-card-subtle border-2 border-black p-4 rounded-xl text-left text-xs font-bold text-foreground leading-relaxed space-y-2 mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                <p className="font-black text-foreground flex items-center gap-1.5 uppercase">
                                                    <Info className="w-4 h-4 text-foreground shrink-0" strokeWidth={2.5} />
                                                    Langkah Berikutnya:
                                                </p>
                                                <p className="text-muted-foreground font-bold">
                                                    Pastikan seluruh kuesioner perkembangan telah terisi, lalu klik tombol <strong>Analisis Data Screening Sekarang</strong> untuk menyusun intervensi stimulasi.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center py-6 max-w-[280px]">
                                            <div className="w-14 h-14 bg-primary text-black border-2 border-black rounded-2xl flex items-center justify-center mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                <Scale className="w-7 h-7" strokeWidth={2.5} />
                                            </div>

                                            <h3 className="text-sm font-black uppercase tracking-tight text-black dark:text-white mb-1">
                                                Menunggu Data Antropometri...
                                            </h3>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide leading-relaxed">
                                                Masukkan Berat Badan dan Tinggi Badan anak pada formulir di sebelah kiri untuk menghitung IMT secara otomatis.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}