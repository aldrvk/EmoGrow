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

// ---------- DATA ----------

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
    { parameter: 'IMT', unit: 'kg/m²', pre: 20.1, post: 17.8, delta: -2.3, trend: 'down' as const },
    { parameter: 'Lingkar Pinggang', unit: 'cm', pre: 48.5, post: 44.2, delta: -4.3, trend: 'down' as const },
    { parameter: 'WHtR', unit: 'rasio', pre: 0.54, post: 0.48, delta: -0.06, trend: 'down' as const },
];

const complianceData = [
    { periode: 'M1-4', kepatuhan: 60, penurunanIMT: 0.3 },
    { periode: 'M5-8', kepatuhan: 75, penurunanIMT: 0.6 },
    { periode: 'M9-12', kepatuhan: 90, penurunanIMT: 0.8 },
    { periode: 'M13-16', kepatuhan: 85, penurunanIMT: 0.4 },
    { periode: 'M17-20', kepatuhan: 92, penurunanIMT: 0.2 },
    { periode: 'M21-24', kepatuhan: 88, penurunanIMT: 0.1 },
];

const recommendations = [
    {
        icon: Stethoscope,
        color: '#FCA5A5',
        title: 'Evaluasi Klinis',
        description: 'Kunjungi dokter anak dalam 2 minggu untuk cek zat besi dan vitamin D.',
    },
    {
        icon: Utensils,
        color: '#CCF281',
        title: 'Pola Makan',
        description: 'Jaga asupan protein 1.5g/kg berat badan per hari dan variasi sayur.',
    },
    {
        icon: Dumbbell,
        color: '#7DD3FC',
        title: 'Aktivitas Fisik',
        description: 'Lanjutkan stimulasi motorik minimal 30 menit per hari.',
    },
    {
        icon: Calendar,
        color: '#D8B4FE',
        title: 'Monitoring Rutin',
        description: 'Timbang dan ukur tinggi badan setiap 2 minggu. Pantau WHtR < 0.5.',
    },
];

// ---------- COMPONENT ----------

export default function LaporanEvaluasi() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#FAF9F5] flex w-full font-sans antialiased text-black select-none">
            <Head title="Laporan Evaluasi" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    <div className="max-w-[1240px] mx-auto space-y-6">

                        {/* ---------- PAGE HEADER ---------- */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FEF08A] p-6 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000]">
                            <div className="space-y-2">
                                <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black">
                                    Laporan Evaluasi Akhir
                                </h1>
                                <div className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-xl border-2 border-black w-fit text-xs md:text-sm font-bold">
                                    <span className="relative flex h-2 w-2">
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                                    </span>
                                    {reportMeta.childName}
                                    <span className="text-black/40">|</span>
                                    Periode {reportMeta.periodeStart} — {reportMeta.periodeEnd}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 self-start sm:self-center">
                                <button
                                    onClick={() => window.print()}
                                    className="flex items-center gap-1.5 bg-white border-2 border-black px-3 py-2 rounded-xl font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#000] transition-all"
                                >
                                    <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
                                    Cetak
                                </button>
                                <button className="flex items-center gap-1.5 bg-black text-white border-2 border-black px-3 py-2 rounded-xl font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#000] transition-all">
                                    <FileDown className="w-3.5 h-3.5 stroke-[2.5]" />
                                    Ekspor
                                </button>
                            </div>
                        </div>

                        {/* ---------- SUMMARY CARDS ---------- */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Durasi */}
                            <div className="bg-[#7DD3FC] border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
                                <p className="text-xs font-black uppercase tracking-wide mb-1 text-black/60">Durasi Intervensi</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tight">{reportMeta.totalWeeks}</span>
                                    <span className="text-xs font-bold text-black/70">minggu</span>
                                </div>
                                <div className="mt-3 bg-white border-2 border-black px-2 py-1 rounded-lg text-[11px] font-black w-fit uppercase">
                                    {reportMeta.periodeStart} – {reportMeta.periodeEnd}
                                </div>
                            </div>

                            {/* Kepatuhan */}
                            <div className="bg-[#CCF281] border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
                                <p className="text-xs font-black uppercase tracking-wide mb-1 text-black/60">Kepatuhan Rata-Rata</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tight">{reportMeta.kepatuhan}</span>
                                    <span className="text-xs font-bold text-black/70">%</span>
                                </div>
                                <div className="mt-3 space-y-1.5">
                                    <div className="h-3.5 bg-white border-2 border-black rounded-full p-0.5 overflow-hidden">
                                        <div className="h-full bg-black rounded-full" style={{ width: `${reportMeta.kepatuhan}%` }} />
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="bg-[#D8B4FE] border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all flex flex-col justify-between">
                                <p className="text-xs font-black uppercase tracking-wide mb-1 text-black/60">Status Gizi</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="bg-[#FCA5A5] border-2 border-black px-3 py-1 rounded-lg text-xs font-black uppercase shadow-[2px_2px_0px_0px_#000]">Overweight</span>
                                    <span className="font-black text-black/40 text-lg">→</span>
                                    <span className="bg-[#CCF281] border-2 border-black px-3 py-1 rounded-lg text-xs font-black uppercase shadow-[2px_2px_0px_0px_#000]">Normal</span>
                                </div>
                                <div className="mt-3 bg-white border-2 border-black flex items-center justify-center gap-1.5 py-1 rounded-xl font-black text-xs shadow-[2px_2px_0px_0px_#000] uppercase">
                                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3] text-green-700" />
                                    Target Tercapai
                                </div>
                            </div>
                        </div>

                        {/* ---------- CLINICAL TABLE ---------- */}
                        <div className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] overflow-hidden">
                            <div className="bg-black px-6 py-3 flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-tight text-white">Perbandingan Pre & Post Test</h3>
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Indikator Klinis</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-black bg-[#FAF9F5]">
                                            <th className="text-left py-3 px-6 text-[11px] font-black uppercase tracking-wider text-black/50">Parameter</th>
                                            <th className="text-right py-3 px-4 text-[11px] font-black uppercase tracking-wider text-black/50">Awal</th>
                                            <th className="text-right py-3 px-4 text-[11px] font-black uppercase tracking-wider text-black/50">Akhir</th>
                                            <th className="text-right py-3 px-4 text-[11px] font-black uppercase tracking-wider text-black/50">Perubahan</th>
                                            <th className="text-center py-3 px-6 w-16"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clinicalTable.map((row, idx) => (
                                            <tr key={idx} className="border-b-2 border-black/10 last:border-b-0 hover:bg-[#FAF9F5] transition-colors">
                                                <td className="py-4 px-6">
                                                    <span className="text-sm font-black text-black">{row.parameter}</span>
                                                    <span className="text-[11px] font-bold text-black/40 ml-1.5">({row.unit})</span>
                                                </td>
                                                <td className="text-right py-4 px-4 text-sm font-bold text-black/50">{row.pre}</td>
                                                <td className="text-right py-4 px-4 text-sm font-black text-black">{row.post}</td>
                                                <td className={`text-right py-4 px-4 text-sm font-black ${
                                                    row.trend === 'down' ? 'text-red-600' : 'text-green-700'
                                                }`}>
                                                    {row.delta > 0 ? '+' : ''}{row.delta}
                                                </td>
                                                <td className="text-center py-4 px-6">
                                                    {row.trend === 'down' ? (
                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#FCA5A5] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                                                            <TrendingDown className="w-4 h-4 stroke-[2.5]" />
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#CCF281] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                                                            <TrendingUp className="w-4 h-4 stroke-[2.5]" />
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ---------- COMPLIANCE CHART ---------- */}
                        <div className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] overflow-hidden">
                            <div className="bg-black px-6 py-3 flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-tight text-white">Kepatuhan vs Penurunan IMT</h3>
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Per Periode</span>
                            </div>
                            <div className="p-5 md:p-6">
                                <p className="text-[11px] font-bold text-black/40 uppercase mb-4">Perbandingan tingkat kepatuhan aktivitas dengan perubahan IMT per periode</p>

                                <div className="h-[280px] w-full border-2 border-black rounded-xl p-2 bg-[#FAF9F5]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={complianceData} barGap={8}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                                            <XAxis dataKey="periode" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} axisLine={false} />
                                            <YAxis yAxisId="left" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} axisLine={false} domain={[0, 100]} unit="%" />
                                            <YAxis yAxisId="right" orientation="right" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#000',
                                                    borderRadius: '12px',
                                                    border: '2px solid #000',
                                                    color: '#fff',
                                                    fontSize: '12px',
                                                }}
                                                labelStyle={{ fontWeight: '900', color: '#FEF08A', marginBottom: '2px' }}
                                                itemStyle={{ color: '#fff' }}
                                                cursor={{ fill: '#000', fillOpacity: 0.05 }}
                                                formatter={(value: any, name: any) => {
                                                    if (name === 'kepatuhan') return [`${value}%`, 'Kepatuhan'];
                                                    return [`-${value} kg/m²`, 'Penurunan IMT'];
                                                }}
                                            />
                                            <Bar yAxisId="left" dataKey="kepatuhan" radius={[6, 6, 0, 0]} maxBarSize={28}>
                                                {complianceData.map((entry, idx) => (
                                                    <Cell key={idx} fill={entry.kepatuhan >= 85 ? '#CCF281' : '#FCA5A5'} stroke="#000" strokeWidth={1.5} />
                                                ))}
                                            </Bar>
                                            <Bar yAxisId="right" dataKey="penurunanIMT" radius={[6, 6, 0, 0]} maxBarSize={28}>
                                                {complianceData.map((_, idx) => (
                                                    <Cell key={idx} fill="#7DD3FC" stroke="#000" strokeWidth={1.5} fillOpacity={0.6} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-black/70 uppercase">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3.5 h-3.5 bg-[#CCF281] border border-black rounded-sm"></span>
                                        <span>Kepatuhan ≥85%</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3.5 h-3.5 bg-[#FCA5A5] border border-black rounded-sm"></span>
                                        <span>Kepatuhan &lt;85%</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3.5 h-3.5 bg-[#7DD3FC] border border-black rounded-sm opacity-60"></span>
                                        <span>Penurunan IMT</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------- RECOMMENDATIONS ---------- */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-sm font-black uppercase tracking-tight">Rekomendasi Tindak Lanjut</h3>
                                <div className="flex-1 h-0.5 bg-black/10 rounded-full" />
                                <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded-md uppercase">4 Item</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recommendations.map((rec, idx) => {
                                    const Icon = rec.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] p-5 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                                                    style={{ backgroundColor: rec.color }}
                                                >
                                                    <Icon className="w-4 h-4 stroke-[2.5]" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black uppercase text-black mb-1">{rec.title}</p>
                                                    <p className="text-[11px] font-bold text-black/60 leading-relaxed">{rec.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ---------- FOOTER ---------- */}
                        <div className="py-4 border-t-2 border-black/10">
                            <p className="text-[11px] font-bold text-black/30 uppercase tracking-wider">
                                Laporan dihasilkan oleh EmoGROW &bull; {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}