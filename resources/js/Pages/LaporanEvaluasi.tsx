import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
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
        variant: 'primary' as const,
        title: 'Evaluasi Klinis',
        description: 'Kunjungi dokter anak dalam 2 minggu untuk cek zat besi dan vitamin D.',
    },
    {
        icon: Utensils,
        variant: 'secondary' as const,
        title: 'Pola Makan',
        description: 'Jaga asupan protein 1.5g/kg berat badan per hari dan variasi sayur.',
    },
    {
        icon: Dumbbell,
        variant: 'primary' as const,
        title: 'Aktivitas Fisik',
        description: 'Lanjutkan stimulasi motorik minimal 30 menit per hari.',
    },
    {
        icon: Calendar,
        variant: 'secondary' as const,
        title: 'Monitoring Rutin',
        description: 'Timbang dan ukur tinggi badan setiap 2 minggu. Pantau WHtR < 0.5.',
    },
];

// ---------- COMPONENT ----------

export default function LaporanEvaluasi() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex w-full">
            <Head title="Laporan Evaluasi" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto">

                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h1 className="text-netral leading-tight mb-1">Laporan Evaluasi</h1>
                                <p className="text-body-thin text-netral/70">
                                    {reportMeta.childName} &bull; Periode {reportMeta.periodeStart} — {reportMeta.periodeEnd}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" className="rounded-xl" onClick={() => window.print()}>
                                    <Printer className="w-4 h-4 mr-2" />
                                    Cetak
                                </Button>
                                <Button variant="outline" className="rounded-xl">
                                    <FileDown className="w-4 h-4 mr-2" />
                                    Ekspor
                                </Button>
                            </div>
                        </div>

                        {/* Summary Cards Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                <p className="text-label-text text-netral/60 uppercase tracking-wider mb-2">Durasi Intervensi</p>
                                <p className="text-[28px] font-bold text-netral leading-none">{reportMeta.totalWeeks} <span className="text-body-thin text-netral/60">minggu</span></p>
                            </div>
                            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                <p className="text-label-text text-netral/60 uppercase tracking-wider mb-2">Kepatuhan Rata-Rata</p>
                                <p className="text-[28px] font-bold text-secondary leading-none">{reportMeta.kepatuhan}<span className="text-body-thin text-netral/60">%</span></p>
                            </div>
                            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                <p className="text-label-text text-netral/60 uppercase tracking-wider mb-2">Status Akhir</p>
                                <div className="flex items-center gap-3">
                                    <Badge variant="primary">Overweight</Badge>
                                    <span className="text-netral/40">→</span>
                                    <Badge variant="secondary">Normal</Badge>
                                </div>
                            </div>
                        </div>

                        {/* Clinical Table */}
                        <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 md:p-8 mb-8">
                            <h3 className="text-netral mb-6">Perbandingan Pre & Post Test</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-border/40">
                                            <th className="text-left py-3 pr-4 text-label-text text-netral/60 uppercase tracking-wider">Parameter</th>
                                            <th className="text-right py-3 px-4 text-label-text text-netral/60 uppercase tracking-wider">Awal</th>
                                            <th className="text-right py-3 px-4 text-label-text text-netral/60 uppercase tracking-wider">Akhir</th>
                                            <th className="text-right py-3 px-4 text-label-text text-netral/60 uppercase tracking-wider">Perubahan</th>
                                            <th className="text-center py-3 pl-4 text-label-text text-netral/60 uppercase tracking-wider w-16"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clinicalTable.map((row, idx) => (
                                            <tr key={idx} className="border-b border-border/20 last:border-b-0">
                                                <td className="py-4 pr-4">
                                                    <span className="text-body-bold text-netral">{row.parameter}</span>
                                                    <span className="text-small-text text-netral/40 ml-1.5">({row.unit})</span>
                                                </td>
                                                <td className="text-right py-4 px-4 text-body-thin text-netral/60">{row.pre}</td>
                                                <td className="text-right py-4 px-4 text-body-bold text-netral">{row.post}</td>
                                                <td className={`text-right py-4 px-4 text-body-bold ${
                                                    row.trend === 'down' ? 'text-primary' : 'text-secondary'
                                                }`}>
                                                    {row.delta > 0 ? '+' : ''}{row.delta}
                                                </td>
                                                <td className="text-center py-4 pl-4">
                                                    {row.trend === 'down' ? (
                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                                            <TrendingDown className="w-4 h-4 text-primary" />
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
                                                            <TrendingUp className="w-4 h-4 text-secondary" />
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Compliance Chart */}
                        <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 md:p-8 mb-8">
                            <div className="mb-6">
                                <h3 className="text-netral mb-1">Kepatuhan vs Penurunan IMT</h3>
                                <p className="text-small-text text-netral/50">Perbandingan tingkat kepatuhan aktivitas dengan perubahan IMT per periode</p>
                            </div>

                            <div className="h-[280px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={complianceData} barGap={8}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.3} vertical={false} />
                                        <XAxis dataKey="periode" stroke="var(--color-netral)" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis yAxisId="left" stroke="var(--color-netral)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} unit="%" />
                                        <YAxis yAxisId="right" orientation="right" stroke="var(--color-netral)" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'var(--color-card)',
                                                borderColor: 'var(--color-border)',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                color: 'var(--color-netral)',
                                            }}
                                            labelStyle={{ color: 'var(--color-netral)' }}
                                            itemStyle={{ color: 'var(--color-netral)' }}
                                            cursor={{ fill: 'var(--color-border)', fillOpacity: 0.15 }}
                                            formatter={(value: any, name: any) => {
                                                if (name === 'kepatuhan') return [`${value}%`, 'Kepatuhan'];
                                                return [`-${value} kg/m²`, 'Penurunan IMT'];
                                            }}
                                        />
                                        <Bar yAxisId="left" dataKey="kepatuhan" radius={[6, 6, 0, 0]} maxBarSize={28}>
                                            {complianceData.map((entry, idx) => (
                                                <Cell key={idx} fill={entry.kepatuhan >= 85 ? 'var(--color-secondary)' : 'var(--color-primary)'} fillOpacity={0.7} />
                                            ))}
                                        </Bar>
                                        <Bar yAxisId="right" dataKey="penurunanIMT" radius={[6, 6, 0, 0]} maxBarSize={28}>
                                            {complianceData.map((_, idx) => (
                                                <Cell key={idx} fill="var(--color-primary)" fillOpacity={0.25} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/40">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm bg-secondary" />
                                    <span className="text-small-text text-netral/60">Kepatuhan ≥85%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm bg-primary" />
                                    <span className="text-small-text text-netral/60">Kepatuhan &lt;85%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm bg-primary/25" />
                                    <span className="text-small-text text-netral/60">Penurunan IMT</span>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="mb-8">
                            <h3 className="text-netral mb-6">Rekomendasi Tindak Lanjut</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recommendations.map((rec, idx) => {
                                    const Icon = rec.icon;
                                    const borderColor = rec.variant === 'primary' ? 'border-l-primary' : 'border-l-secondary';
                                    return (
                                        <div key={idx} className={`bg-card rounded-xl border border-border/60 shadow-sm p-5 border-l-4 ${borderColor}`}>
                                            <div className="flex items-start gap-3">
                                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                                    rec.variant === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                                                }`}>
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-body-bold text-netral mb-1">{rec.title}</p>
                                                    <p className="text-small-text text-netral/60 leading-relaxed">{rec.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="py-6 border-t border-border/40">
                            <p className="text-small-text text-netral/40">
                                Laporan dihasilkan oleh EmoGROW &bull; {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
