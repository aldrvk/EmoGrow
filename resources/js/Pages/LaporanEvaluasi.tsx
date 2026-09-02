import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Badge from '../Components/Badges/Badge';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
    Printer, FileDown, TrendingDown, TrendingUp, CheckCircle2,
    Stethoscope, Utensils, Dumbbell, Calendar
} from 'lucide-react';

const reportMeta = {
    childName: 'Aira Putri Mahesa',
    age: '24 bulan',
    periodeStart: '2 Des 2025',
    periodeEnd: '18 Mei 2026',
    totalWeeks: 24,
    kepatuhan: 85,
};

const clinicalTable = [
    { parameter: 'Berat Badan', unit: 'kg', pre: 13.5, post: 12.0, delta: -1.5, trend: 'down' as const },
    { parameter: 'Tinggi Badan', unit: 'cm', pre: 82.0, post: 90.5, delta: 8.5, trend: 'up' as const },
    { parameter: 'Indeks Massa Tubuh (IMT)', unit: 'kg/m²', pre: 20.1, post: 17.8, delta: -2.3, trend: 'down' as const },
    { parameter: 'Lingkar Pinggang', unit: 'cm', pre: 48.5, post: 44.2, delta: -4.3, trend: 'down' as const },
    { parameter: 'Rasio Pinggang/Tinggi (WHtR)', unit: 'rasio', pre: 0.54, post: 0.48, delta: -0.06, trend: 'down' as const },
];

const complianceData = [
    { periode: 'M1–4', kepatuhan: 60, penurunanIMT: 0.3 },
    { periode: 'M5–8', kepatuhan: 75, penurunanIMT: 0.6 },
    { periode: 'M9–12', kepatuhan: 90, penurunanIMT: 0.8 },
    { periode: 'M13–16', kepatuhan: 85, penurunanIMT: 0.4 },
    { periode: 'M17–20', kepatuhan: 92, penurunanIMT: 0.2 },
    { periode: 'M21–24', kepatuhan: 88, penurunanIMT: 0.1 },
];

const recommendations = [
    {
        icon: Stethoscope,
        bgClass: 'bg-danger text-white',
        title: 'Evaluasi Dokter Anak',
        description: 'Jadwalkan kunjungan rutin untuk evaluasi kadar zat besi, kalsium, dan vitamin D.',
    },
    {
        icon: Utensils,
        bgClass: 'bg-success text-black',
        title: 'Pola Makan Seimbang',
        description: 'Pertahankan asupan protein berkualitas (1.5g/kg BB) serta variasi serat sayuran.',
    },
    {
        icon: Dumbbell,
        bgClass: 'bg-info text-white',
        title: 'Aktivitas Fisik & Stimulasi',
        description: 'Lanjutkan stimulasi gerak aktif minimal 30 menit per hari bersama orang tua.',
    },
    {
        icon: Calendar,
        bgClass: 'bg-warning text-black',
        title: 'Monitoring Berkala',
        description: 'Catat berat dan tinggi badan setiap 2 minggu untuk memastikan rasio WHtR tetap < 0.50.',
    },
];

export default function LaporanEvaluasi() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex w-full font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title="Laporan Evaluasi - EmoGROW" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1240px] mx-auto space-y-6">

                        {/* Page Header */}
                        <div className="bg-card rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap">
                            <div className="space-y-1 min-w-0 flex-1">
                                <Badge variant="primary" className="mb-1">
                                    Dokumen Ringkasan Medis
                                </Badge>
                                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
                                    Laporan Evaluasi Program Intervensi
                                </h1>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-muted-foreground pt-1 flex-wrap">
                                    <span>Profil: <strong>{reportMeta.childName}</strong> ({reportMeta.age})</span>
                                    <span>•</span>
                                    <span>Periode: <strong>{reportMeta.periodeStart} — {reportMeta.periodeEnd}</strong></span>
                                </div>
                            </div>

                            {/* Action Buttons: Disabled with Segera Hadir */}
                            <div className="flex items-center gap-2.5 self-start md:self-center shrink-0 flex-wrap">
                                <button
                                    disabled
                                    className="px-4 py-2 rounded-xl border-2 border-black bg-muted text-muted-foreground/60 text-xs font-black uppercase flex items-center gap-2 cursor-not-allowed shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,0.3)] select-none"
                                    title="Fitur pencetakan laporan langsung sedang dalam persiapan format cetak A4"
                                >
                                    <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>Cetak</span>
                                    <span className="text-[9px] bg-warning text-black border border-black px-1.5 py-0.5 rounded font-black uppercase">Segera Hadir</span>
                                </button>

                                <button
                                    disabled
                                    className="px-4 py-2 rounded-xl border-2 border-black bg-muted text-muted-foreground/60 text-xs font-black uppercase flex items-center gap-2 cursor-not-allowed shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,0.3)] select-none"
                                    title="Fitur ekspor dokumen PDF rekam medis sedang dalam tahap integrasi"
                                >
                                    <FileDown className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>Ekspor PDF</span>
                                    <span className="text-[9px] bg-warning text-black border border-black px-1.5 py-0.5 rounded font-black uppercase">Segera Hadir</span>
                                </button>
                            </div>
                        </div>

                        {/* Top Highlights 3-Card Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-card rounded-2xl border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <TrendingDown className="w-6 h-6 stroke-[3]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Perubahan IMT Total</p>
                                    <p className="text-2xl font-black text-black dark:text-white mt-0.5">-2.3 <span className="text-xs font-bold text-muted-foreground">kg/m²</span></p>
                                    <span className="flex items-center gap-1 text-[10px] font-black uppercase text-success">
                                        20.1 → 17.8 <CheckCircle2 className="w-3 h-3 stroke-[2.5]" /> Status Normal
                                    </span>
                                </div>
                            </div>

                            <div className="bg-card rounded-2xl border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-info text-white border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <TrendingUp className="w-6 h-6 stroke-[3]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Pertumbuhan Tinggi Badan</p>
                                    <p className="text-2xl font-black text-black dark:text-white mt-0.5">+8.5 <span className="text-xs font-bold text-muted-foreground">cm</span></p>
                                    <span className="flex items-center gap-1 text-[10px] font-black uppercase text-info">
                                        82.0 → 90.5 cm <TrendingUp className="w-3 h-3 stroke-[2.5]" /> Optimal
                                    </span>
                                </div>
                            </div>

                            <div className="bg-card rounded-2xl border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-success text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Rerata Kepatuhan</p>
                                    <p className="text-2xl font-black text-black dark:text-white mt-0.5">85%</p>
                                    <span className="flex items-center gap-1 text-[10px] font-black uppercase text-success">
                                        <CheckCircle2 className="w-3 h-3 stroke-[2.5]" /> 71/84 Target Selesai
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Clinical Pre vs Post Comparison Table */}
                        <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                            <div className="p-6 border-b-3 border-black bg-card">
                                <h3 className="text-base font-black uppercase text-black dark:text-white">Tabel Evaluasi Klinis: Pre vs Post Intervensi</h3>
                                <p className="text-xs font-bold text-muted-foreground uppercase">Perbandingan parameter fisik sebelum dan sesudah 24 minggu program</p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-card-subtle border-b-3 border-black text-black dark:text-white">
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">Parameter Antropometri</th>
                                            <th className="px-5 py-4 text-xs font-black uppercase tracking-wider">Pre (Awal)</th>
                                            <th className="px-5 py-4 text-xs font-black uppercase tracking-wider">Post (Akhir)</th>
                                            <th className="px-5 py-4 text-xs font-black uppercase tracking-wider">Perubahan (Delta)</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">Evaluasi Klinis</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y-2 divide-black/10">
                                        {clinicalTable.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-card-subtle transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="text-xs md:text-sm font-black uppercase text-black dark:text-white">{row.parameter}</span>
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase ml-1">({row.unit})</span>
                                                </td>
                                                <td className="px-5 py-4 text-xs md:text-sm font-bold text-muted-foreground">
                                                    {row.pre} {row.unit}
                                                </td>
                                                <td className="px-5 py-4 text-xs md:text-sm font-black text-black dark:text-white">
                                                    {row.post} {row.unit}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="inline-flex items-center gap-1 text-xs font-black uppercase text-black dark:text-white">
                                                        {row.trend === 'down' ? <TrendingDown className="w-3.5 h-3.5 stroke-[3] text-success" /> : <TrendingUp className="w-3.5 h-3.5 stroke-[3] text-info" />}
                                                        {row.delta > 0 ? `+${row.delta}` : row.delta} {row.unit}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="success">
                                                        Mencapai Target Ideal
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Middle: Compliance Trend Bar Chart */}
                        <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-3 border-b-3 border-black">
                                <div>
                                    <h3 className="text-base font-black uppercase text-black dark:text-white">Korelasi Kepatuhan & Penurunan IMT per Blok 4 Minggu</h3>
                                    <p className="text-xs font-bold text-muted-foreground uppercase">Tingkat kepatuhan konsisten berbanding lurus dengan stabilitas kurva normal</p>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-black uppercase text-black dark:text-white">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3.5 h-3.5 rounded border border-black bg-primary"></span>
                                        <span>Kepatuhan Standar</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3.5 h-3.5 rounded border border-black bg-success"></span>
                                        <span>Target Tercapai (≥90%)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[220px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={complianceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                                        <XAxis dataKey="periode" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
                                        <YAxis stroke="#000" fontSize={11} fontWeight={800} tickLine={false} domain={[0, 100]} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#000',
                                                borderRadius: '12px',
                                                border: '2px solid #000',
                                                color: '#fff',
                                                fontSize: '12px',
                                                fontWeight: '800'
                                            }}
                                            formatter={(value: any) => [`${value}%`, 'Kepatuhan']}
                                        />
                                        <Bar dataKey="kepatuhan" stroke="#000" strokeWidth={2} radius={[6, 6, 0, 0]}>
                                            {complianceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.kepatuhan >= 90 ? '#a3e635' : '#f472b6'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recommendations Grid */}
                        <div className="space-y-4">
                            <div className="pb-2 border-b-3 border-black">
                                <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white">Rekomendasi Pemeliharaan & Tindak Lanjut</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {recommendations.map((rec, idx) => {
                                    const Icon = rec.icon;
                                    return (
                                        <div key={idx} className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col justify-between">
                                            <div>
                                                <div className={`w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center mb-3 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] ${rec.bgClass}`}>
                                                    <Icon className="w-5 h-5 stroke-[2.5]" />
                                                </div>
                                                <h4 className="text-xs font-black uppercase text-black dark:text-white mb-1">{rec.title}</h4>
                                                <p className="text-xs font-bold text-muted-foreground leading-relaxed">{rec.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}