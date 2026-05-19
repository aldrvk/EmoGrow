import React, { useState } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import FormCard from '../Components/Cards/FormCard';
import TextInput from '../Components/Inputs/TextInput';
import YesNoToggle from '../Components/Inputs/YesNoToggle';
import { router } from '@inertiajs/react';

export default function ScreeningAnak() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const [kuesioner, setKuesioner] = useState({
        q1: 'ya' as 'ya' | 'tidak' | null,
        q2: 'ya' as 'ya' | 'tidak' | null,
        q3: 'ya' as 'ya' | 'tidak' | null,
        q4: 'ya' as 'ya' | 'tidak' | null,
        q5: 'ya' as 'ya' | 'tidak' | null,
    });

    const handleKuesionerChange = (key: keyof typeof kuesioner, value: 'ya' | 'tidak') => {
        setKuesioner(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-background flex w-full">
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto">
                        
                        {/* Breadcrumbs & Header */}
                        <div className="mb-6">
                            <p className="text-primary text-[11px] font-bold tracking-wider uppercase mb-1">Step 1 of 2: Input Data</p>
                            <h1 className="text-netral text-3xl md:text-[36px] leading-tight font-bold">Formulir Screening</h1>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                            
                            {/* Left Column: Form Inputs */}
                            <div className="flex-1 flex flex-col gap-6">
                                
                                {/* Antropometri Section */}
                                <FormCard 
                                    title="Metrik Antropometri"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="8" width="20" height="8" rx="2" ry="2"></rect>
                                            <line x1="6" y1="8" x2="6" y2="12"></line>
                                            <line x1="10" y1="8" x2="10" y2="12"></line>
                                            <line x1="14" y1="8" x2="14" y2="12"></line>
                                            <line x1="18" y1="8" x2="18" y2="12"></line>
                                        </svg>
                                    }
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                        <TextInput label="Usia Anak (Bulan)" placeholder="Contoh: 24" />
                                        <TextInput label="Berat Badan (kg)" placeholder="Contoh: 12.5" />
                                        <TextInput label="Tinggi Badan (cm)" placeholder="Contoh: 85.0" />
                                        <TextInput label="Lingkar Pinggang (cm)" placeholder="Contoh: 45.0" />
                                    </div>
                                </FormCard>

                                {/* Kuesioner Section */}
                                <FormCard 
                                    title="Kuesioner Perkembangan Terstruktur"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2a8 8 0 0 0-8 8c0 5.4 3.6 8.5 5 11h6c1.4-2.5 5-5.6 5-11a8 8 0 0 0-8-8z"></path>
                                            <path d="M9 16a5 5 0 0 1 6 0"></path>
                                            <circle cx="12" cy="11" r="2"></circle>
                                        </svg>
                                    }
                                >
                                    {/* Motorik Kasar */}
                                    <div className="mb-8">
                                        <h3 className="text-secondary text-large-text mb-2 font-medium">Motorik Kasar</h3>
                                        <div className="flex flex-col">
                                            <div className="flex justify-between items-center py-4 border-b border-border/40 gap-4">
                                                <p className="text-body-thin text-netral max-w-md">Anak dapat berjalan mundur beberapa langkah tanpa kehilangan keseimbangan?</p>
                                                <YesNoToggle value={kuesioner.q1} onChange={(v) => handleKuesionerChange('q1', v)} />
                                            </div>
                                            <div className="flex justify-between items-center py-4 border-b border-border/40 gap-4">
                                                <p className="text-body-thin text-netral max-w-md">Anak mampu menendang bola ke depan tanpa berpegangan?</p>
                                                <YesNoToggle value={kuesioner.q2} onChange={(v) => handleKuesionerChange('q2', v)} />
                                            </div>
                                            <div className="flex justify-between items-center py-4 border-b border-border/40 gap-4">
                                                <p className="text-body-thin text-netral max-w-md">Anak dapat melompat dengan kedua kaki terangkat dari lantai bersamaan?</p>
                                                <YesNoToggle value={kuesioner.q3} onChange={(v) => handleKuesionerChange('q3', v)} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Motorik Halus */}
                                    <div>
                                        <h3 className="text-secondary text-large-text mb-2 font-medium">Motorik Halus</h3>
                                        <div className="flex flex-col">
                                            <div className="flex justify-between items-center py-4 border-b border-border/40 gap-4">
                                                <p className="text-body-thin text-netral max-w-md">Anak dapat menyusun menara dari 4 blok kubus tanpa jatuh?</p>
                                                <YesNoToggle value={kuesioner.q4} onChange={(v) => handleKuesionerChange('q4', v)} />
                                            </div>
                                            <div className="flex justify-between items-center py-4 gap-4">
                                                <p className="text-body-thin text-netral max-w-md">Anak mampu membalik halaman buku cerita satu per satu?</p>
                                                <YesNoToggle value={kuesioner.q5} onChange={(v) => handleKuesionerChange('q5', v)} />
                                            </div>
                                        </div>
                                    </div>
                                </FormCard>

                                <Button 
                                    size="lg" 
                                    variant="primary" 
                                    className="w-full h-[52px] flex items-center justify-center gap-2 mt-2 rounded-xl"
                                    onClick={() => router.get('/screening-anak/result')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <path d="M8 18v-2"></path>
                                        <path d="M12 18v-4"></path>
                                        <path d="M16 18v-6"></path>
                                    </svg>
                                    Analisis Data Sekarang
                                </Button>
                            </div>

                            {/* Right Column: Dynamic Empty State Placeholder */}
                            <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 relative">
                                <div className="sticky top-8 h-[calc(100vh-140px)] min-h-[500px] border-2 border-dashed border-primary/25 bg-primary/5 rounded-2xl flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                                    
                                    {/* Abstract Decorative Blurred Elements */}
                                    <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>
                                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>

                                    {/* Content Container */}
                                    <div className="relative z-10 flex flex-col items-center max-w-[280px]">
                                        <div className="w-[72px] h-[72px] bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                                                <line x1="12" y1="11" x2="12" y2="17"></line>
                                                <line x1="9" y1="14" x2="15" y2="14"></line>
                                            </svg>
                                        </div>
                                        
                                        <h2 className="text-section-title text-netral mb-4 leading-tight">Menunggu Data Input...</h2>
                                        
                                        <p className="text-body-thin text-netral/80 leading-relaxed">
                                            Silakan lengkapi formulir antropometri dan checklist di sebelah kiri. Sistem akan secara otomatis mengkalkulasi BMI, status gizi, dan merancang program intervensi 24 minggu untuk anak Anda.
                                        </p>
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
