import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Button from '../Components/Buttons/Button';

export default function Welcome({ laravelVersion, phpVersion }: { laravelVersion?: string, phpVersion?: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title="Selamat Datang - EmoGROW" />
            
            <div className="w-full max-w-lg bg-card border-3 border-black rounded-3xl p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-6">
                <div className="w-16 h-16 bg-primary text-black border-2 border-black rounded-2xl flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <Sparkles className="w-8 h-8 stroke-[2.5]" />
                </div>

                <div>
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black dark:text-white">EmoGROW</h1>
                    <p className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wide mt-2">
                        Platform Monitoring & Stimulasi Tumbuh Kembang Anak Terpadu
                    </p>
                </div>

                <div className="p-4 bg-card-subtle border-2 border-black rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-left text-xs font-bold text-muted-foreground space-y-2">
                    <p className="font-black uppercase text-black dark:text-white">Fitur Utama:</p>
                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        <li>Kalkulasi status IMT otomatis berbasis standar WHO</li>
                        <li>Grafik analitik & kurva perkembangan berkala</li>
                        <li>Pusat modul edukasi & aktivitas stimulasi terstruktur</li>
                        <li>Laporan evaluasi komprehensif untuk pemantauan klinis</li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link href="/auth" className="flex-1">
                        <Button variant="primary" size="lg" className="w-full">
                            Masuk / Daftar
                            <ArrowRight className="w-4 h-4 ml-1.5 stroke-[3]" />
                        </Button>
                    </Link>
                    <Link href="/" className="flex-1">
                        <Button variant="outline" size="lg" className="w-full">
                            Ke Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
