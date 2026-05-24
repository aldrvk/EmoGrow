import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import FormCard from '../Components/Cards/FormCard';
import TextInput from '../Components/Inputs/TextInput';
import YesNoToggle from '../Components/Inputs/YesNoToggle';
import { router } from '@inertiajs/react';

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
            const heightM = heightCm / 100;
            const imt = weight / (heightM * heightM);
            const formattedScore = parseFloat(imt.toFixed(1));
            setImtScore(formattedScore);

            let status = 'Normal';
            if (imt < 14) status = 'Kurus';
            else if (imt >= 14 && imt <= 18) status = 'Normal';
            else if (imt > 18 && imt <= 20) status = 'Beresiko Gizi Lebih';
            else status = 'Obesitas';

            setImtStatus(status);

            if (typeof window !== 'undefined') {
                localStorage.setItem('childIMTScore', formattedScore.toString());
                localStorage.setItem('childIMTStatus', status);
                localStorage.setItem('childAge', usiaAnak);
                localStorage.setItem('childWeight', beratBadan);
                localStorage.setItem('childHeight', tinggiBadan);
                localStorage.setItem('childWaist', lingkarPinggang);
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

    // Helper warna status Neubrutalism (Konsisten dengan Dashboard)
    const getStatusColorClass = (status: string) => {
        if (status === 'Normal') return 'bg-[#a3e635]'; // Lime Green cerah dari Dashboard
        if (status === 'Kurus') return 'bg-[#00a6ff]';  // Vibrant Blue dari Dashboard
        return 'bg-[#f472b6]'; // Soft Pink dari Dashboard
    };

    return (
        <div className="min-h-screen bg-[#fbfbf4] flex w-full font-sans antialiased text-black">
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <div className="max-w-6xl mx-auto space-y-6">

                        {/* Steps Breadcrumbs Header */}
                        <div className="px-1 flex flex-col items-start border-b-3 border-black pb-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black bg-[#00a6ff] text-white text-xs font-black tracking-wide uppercase rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] mb-3">
                                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                                Langkah 1 dari 2: Input Data Anak
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
                                Formulir Screening
                            </h1>
                            <p className="text-xs uppercase font-extrabold text-black/50 tracking-wider mt-1">
                                Lengkapi metrik fisik dan tumbuh kembang untuk memulai analisis intervensi kesehatan.
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 items-start">

                            {/* Left Column: Form Inputs */}
                            <div className="flex-1 w-full flex flex-col gap-6">

                                {/* Antropometri Section */}
                                <FormCard
                                    title="Metrik Antropometri"
                                    className="border-3 border-black bg-[#fffbe6] rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black transition-all"
                                    icon={
                                        <div className="w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center text-black bg-[#00a6ff] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="8" width="20" height="8"></rect>
                                                <line x1="6" y1="8" x2="6" y2="13"></line>
                                                <line x1="10" y1="8" x2="10" y2="11"></line>
                                                <line x1="14" y1="8" x2="14" y2="13"></line>
                                                <line x1="18" y1="8" x2="18" y2="11"></line>
                                            </svg>
                                        </div>
                                    }
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 pt-2">
                                        <TextInput label="Usia Anak (Bulan)" placeholder="Contoh: 24" type="number" value={usiaAnak} onChange={(e) => setUsiaAnak(e.target.value)} />
                                        <TextInput
                                            label="Berat Badan (kg)"
                                            placeholder="Contoh: 12.5"
                                            type="number"
                                            step="0.1"
                                            value={beratBadan}
                                            onChange={(e) => setBeratBadan(e.target.value)}
                                        />
                                        <TextInput
                                            label="Tinggi Badan (cm)"
                                            placeholder="Contoh: 85.0"
                                            type="number"
                                            step="0.1"
                                            value={tinggiBadan}
                                            onChange={(e) => setTinggiBadan(e.target.value)}
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
                                    title="Kuesioner Perkembangan Terstruktur"
                                    className="border-3 border-black bg-[#fffdf4] rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black transition-all"
                                    icon={
                                        <div className="w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center text-black bg-[#a3e635] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 2a8 8 0 0 0-8 8c0 5.4 3.6 8.5 5 11h6c1.4-2.5 5-5.6 5-11a8 8 0 0 0-8-8z"></path>
                                                <path d="M9 16a5 5 0 0 1 6 0"></path>
                                                <circle cx="12" cy="11" r="2"></circle>
                                            </svg>
                                        </div>
                                    }
                                >
                                    <div className="pt-2 space-y-5">
                                        {/* Motorik Kasar */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3 pb-1.5 border-b-2 border-black/10">
                                                <span className="w-2 h-4 bg-black rounded-sm"></span>
                                                <h3 className="text-black font-black text-base uppercase tracking-wide">Motorik Kasar</h3>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <div className="flex justify-between items-center py-3 px-4 border-2 border-black bg-white rounded-xl shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] gap-4 select-none">
                                                    <p className="text-black text-xs font-black uppercase tracking-wide leading-relaxed max-w-md">Anak dapat berjalan mundur beberapa langkah tanpa kehilangan keseimbangan?</p>
                                                    <YesNoToggle value={kuesioner.q1} onChange={(v) => handleKuesionerChange('q1', v)} />
                                                </div>
                                                <div className="flex justify-between items-center py-3 px-4 border-2 border-black bg-white rounded-xl shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] gap-4 select-none">
                                                    <p className="text-black text-xs font-black uppercase tracking-wide leading-relaxed max-w-md">Anak mampu menendang bola ke depan tanpa berpegangan?</p>
                                                    <YesNoToggle value={kuesioner.q2} onChange={(v) => handleKuesionerChange('q2', v)} />
                                                </div>
                                                <div className="flex justify-between items-center py-3 px-4 border-2 border-black bg-white rounded-xl shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] gap-4 select-none">
                                                    <p className="text-black text-xs font-black uppercase tracking-wide leading-relaxed max-w-md">Anak dapat melompat dengan kedua kaki terangkat dari lantai bersamaan?</p>
                                                    <YesNoToggle value={kuesioner.q3} onChange={(v) => handleKuesionerChange('q3', v)} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Motorik Halus */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3 pb-1.5 border-b-2 border-black/10">
                                                <span className="w-2 h-4 bg-black rounded-sm"></span>
                                                <h3 className="text-black font-black text-base uppercase tracking-wide">Motorik Halus</h3>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <div className="flex justify-between items-center py-3 px-4 border-2 border-black bg-white rounded-xl shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] gap-4 select-none">
                                                    <p className="text-black text-xs font-black uppercase tracking-wide leading-relaxed max-w-md">Anak dapat menyusun menara dari 4 blok kubus tanpa jatuh?</p>
                                                    <YesNoToggle value={kuesioner.q4} onChange={(v) => handleKuesionerChange('q4', v)} />
                                                </div>
                                                <div className="flex justify-between items-center py-3 px-4 border-2 border-black bg-white rounded-xl shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] gap-4 select-none">
                                                    <p className="text-black text-xs font-black uppercase tracking-wide leading-relaxed max-w-md">Anak mampu membalik halaman buku cerita satu per satu?</p>
                                                    <YesNoToggle value={kuesioner.q5} onChange={(v) => handleKuesionerChange('q5', v)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FormCard>

                                <Button
                                    size="lg"
                                    variant={isFormValid ? "primary" : "secondary"}
                                    disabled={!isFormValid}
                                    className={`w-full h-14 flex items-center justify-center gap-2 mt-1 border-3 border-black font-black text-sm uppercase tracking-wide rounded-xl transition-all duration-150 ${isFormValid
                                            ? 'bg-[#f472b6] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                                            : 'bg-neutral-200 text-black/30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-not-allowed'
                                        }`}
                                    onClick={() => router.get('/screening-anak/result')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="8" y1="14" x2="16" y2="14"></line>
                                        <line x1="8" y1="18" x2="16" y2="18"></line>
                                    </svg>
                                    Analisis Data Sekarang
                                </Button>
                            </div>

                            {/* Right Column: Dynamic Neubrutalism Side Panel */}
                            <div className="w-full lg:w-[360px] xl:w-[390px] shrink-0 lg:sticky lg:top-8">
                                <div className="h-auto min-h-[460px] border-3 border-black bg-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-6 text-center transition-all relative overflow-hidden">

                                    {imtScore ? (
                                        // State: Data Terisi (Visual Hasil Sementara)
                                        <div className="w-full flex flex-col items-center">
                                            {/* Top dynamic band bar inside radius container */}
                                            <div className={`absolute top-0 left-0 right-0 h-3.5 w-full border-b-3 border-black ${getStatusColorClass(imtStatus)}`} />

                                            <p className="text-black font-black text-[10px] tracking-wider uppercase mb-5 bg-[#fffdf4] border-2 border-black px-2.5 py-1 rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] mt-3">
                                                Kalkulasi Hasil Sementara
                                            </p>

                                            <div className={`w-32 h-32 rounded-xl border-3 border-black flex flex-col items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-5 transition-transform duration-200 hover:-rotate-2 ${getStatusColorClass(imtStatus)}`}>
                                                <span className="text-4xl font-black text-black tracking-tight">{imtScore}</span>
                                                <span className="text-[9px] uppercase font-black tracking-wide text-black bg-white border border-black px-1.5 py-0.5 mt-1 rounded-sm">BMI Score</span>
                                            </div>

                                            <h2 className="text-black text-lg font-black mb-2 tracking-tight uppercase">Skor IMT Berhasil Dihitung!</h2>

                                            <div className="px-4 py-1.5 border-2 border-black text-xs font-black tracking-wide uppercase mb-5 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-lg">
                                                Status Gizi: <span className="underline decoration-wavy decoration-1">{imtStatus}</span>
                                            </div>

                                            <div className="bg-[#fffbe6] p-3.5 border-2 border-black text-left w-full shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                                                <p className="text-black text-[11px] font-black uppercase tracking-wide leading-relaxed">
                                                    💡 <span className="text-[#00a6ff]">Langkah berikutnya:</span> Pastikan seluruh checklist kuesioner perkembangan di sebelah kiri telah terisi penuh. Setelah itu, klik tombol <span className="text-[#f472b6]">Analisis Data Sekarang</span> untuk melihat program intervensi spesifik.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        // State: Menunggu Input Data
                                        <div className="flex flex-col items-center max-w-[290px]">
                                            <div className="w-16 h-16 bg-[#fffbe6] border-3 border-black rounded-xl flex items-center justify-center text-black mb-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                    <line x1="12" y1="18" x2="12" y2="12"></line>
                                                    <line x1="9" y1="15" x2="15" y2="15"></line>
                                                </svg>
                                            </div>

                                            <h2 className="text-black text-base font-black mb-2 uppercase tracking-wide">Menunggu Data Input...</h2>
                                            <p className="text-black/60 text-[11px] font-black uppercase tracking-wide leading-relaxed mb-5">
                                                Masukkan metrik antropometri fisik (Berat Badan & Tinggi Badan) anak Anda pada form di sebelah kiri.
                                            </p>
                                            <div className="w-full bg-[#fffdf4] border-2 border-black p-3.5 text-[10px] font-black uppercase tracking-wide text-black shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] rounded-xl text-center leading-relaxed">
                                                Sistem otomatis menghitung BMI, mendeteksi status gizi, dan menyiapkan kerangka program intervensi terstruktur.
                                            </div>
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