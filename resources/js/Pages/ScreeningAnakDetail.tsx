import React, { useState } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import { ArrowLeft, Download, TrendingUp, Info, AlertTriangle } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

// Data points for the detailed WHO chart
const dataPoints = [
    { bulan: 0, berat: 3.2, normal: 3.3 },
    { bulan: 3, berat: 5.8, normal: 5.6 },
    { bulan: 6, berat: 7.5, normal: 7.4 },
    { bulan: 9, berat: 9.2, normal: 8.8 },
    { bulan: 12, berat: 10.5, normal: 9.6 },
    { bulan: 15, berat: 11.2, normal: 10.3 },
    { bulan: 18, berat: 12.0, normal: 10.9 },
    { bulan: 21, berat: 12.8, normal: 11.5 },
    { bulan: 24, berat: 13.5, normal: 12.0 },
];

const milestones = [
    { age: '0–3 Bulan', status: 'normal' as const, weight: '3.2 → 5.8 kg', gain: '+2.6 kg', note: 'Pertumbuhan awal sesuai kurva WHO' },
    { age: '3–6 Bulan', status: 'normal' as const, weight: '5.8 → 7.5 kg', gain: '+1.7 kg', note: 'Kenaikan berat badan stabil' },
    { age: '6–12 Bulan', status: 'warning' as const, weight: '7.5 → 10.5 kg', gain: '+3.0 kg', note: 'Mulai berada di atas median' },
    { age: '12–18 Bulan', status: 'warning' as const, weight: '10.5 → 12.0 kg', gain: '+1.5 kg', note: 'Akselerasi berat badan meningkat' },
    { age: '18–24 Bulan', status: 'danger' as const, weight: '12.0 → 13.5 kg', gain: '+1.5 kg', note: 'Melampaui batas atas kurva normal' },
];

export default function ScreeningAnakDetail() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

    // Dynamic screening data
    const savedIMTStatus = typeof window !== 'undefined' ? localStorage.getItem('childIMTStatus') || 'Beresiko Gizi Lebih' : 'Beresiko Gizi Lebih';
    const savedAge = typeof window !== 'undefined' ? localStorage.getItem('childAge') || '24' : '24';
    const savedWeight = typeof window !== 'undefined' ? localStorage.getItem('childWeight') || '13.5' : '13.5';

    // SVG chart dimensions
    const chartW = 800;
    const chartH = 320;
    const padL = 60;
    const padR = 30;
    const padT = 30;
    const padB = 50;
    const plotW = chartW - padL - padR;
    const plotH = chartH - padT - padB;

    const maxBulan = 24;
    const maxBerat = 16;
    const minBerat = 0;

    const scaleX = (bulan: number) => padL + (bulan / maxBulan) * plotW;
    const scaleY = (berat: number) => padT + plotH - ((berat - minBerat) / (maxBerat - minBerat)) * plotH;

    const normalPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.bulan)} ${scaleY(p.normal)}`).join(' ');
    const childPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.bulan)} ${scaleY(p.berat)}`).join(' ');

    const upperBound = dataPoints.map(p => ({ x: scaleX(p.bulan), y: scaleY(p.normal * 1.15) }));
    const lowerBound = dataPoints.map(p => ({ x: scaleX(p.bulan), y: scaleY(p.normal * 0.85) }));
    const bandPath = [
        ...upperBound.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`),
        ...lowerBound.reverse().map((p, i) => `${i === 0 ? 'L' : 'L'} ${p.x} ${p.y}`),
        'Z'
    ].join(' ');

    return (
        <div className="min-h-screen bg-background flex w-full font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title="Detail Screening - EmoGROW" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto space-y-6">

                        {/* Back Navigation */}
                        <div>
                            <Link
                                href="/screening-anak/result"
                                className="inline-flex items-center gap-2 bg-card text-foreground border-2 border-black px-4 py-2 rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-card-subtle active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4 stroke-[3]" />
                                Kembali ke Hasil Screening
                            </Link>
                        </div>

                        {/* Page Header */}
                        <div>
                            <Badge variant="primary" className="mb-2">
                                Detail Analisis Antropometri
                            </Badge>
                            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white">
                                Kurva Pertumbuhan (IMT terhadap Usia)
                            </h1>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-1">
                                Perbandingan lintasan pertumbuhan anak terhadap batas kurva standar WHO
                            </p>
                        </div>

                        {/* Summary Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-card rounded-2xl border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Nama Anak</p>
                                <p className="text-lg font-black uppercase text-black dark:text-white">Aira Putri Mahesa</p>
                            </div>
                            <div className="bg-card rounded-2xl border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Usia Saat Screening</p>
                                <p className="text-lg font-black uppercase text-black dark:text-white">{savedAge} <span className="text-xs font-bold text-muted-foreground">Bulan</span></p>
                            </div>
                            <div className="bg-card rounded-2xl border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Berat Badan Aktual</p>
                                <p className="text-lg font-black uppercase text-black dark:text-white">{savedWeight} <span className="text-xs font-bold text-muted-foreground">kg</span></p>
                            </div>
                            <div className="bg-card rounded-2xl border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Status Gizi</p>
                                <Badge variant={savedIMTStatus === 'Normal' ? 'success' : savedIMTStatus === 'Kurus' ? 'info' : 'warning'} className="mt-0.5">
                                    <AlertTriangle className="w-3 h-3 mr-1 stroke-[3] inline" />
                                    {savedIMTStatus}
                                </Badge>
                            </div>
                        </div>

                        {/* Main Chart Card */}
                        <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 lg:p-7">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b-3 border-black flex-wrap">
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base font-black uppercase text-black dark:text-white">Grafik Pertumbuhan Berat Badan vs Usia</h3>
                                    <p className="text-xs font-bold text-muted-foreground uppercase">Data riil anak dibandingkan standar median WHO</p>
                                </div>
                                
                                {/* Export Grafik disabled button with Segera Hadir */}
                                <button 
                                    disabled 
                                    className="shrink-0 px-3 py-1.5 rounded-xl border-2 border-black bg-muted text-muted-foreground/60 text-xs font-black uppercase flex items-center gap-2 cursor-not-allowed shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,0.3)]"
                                    title="Fitur ekspor grafik sedang dalam tahap integrasi modul pelaporan"
                                >
                                    <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                                    <span>Ekspor Grafik</span>
                                    <span className="text-[9px] bg-warning text-black border border-black px-1.5 py-0.5 rounded font-black uppercase">Segera Hadir</span>
                                </button>
                            </div>

                            {/* SVG Chart */}
                            <div className="w-full overflow-x-auto bg-card rounded-xl p-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full min-w-[600px]" style={{ height: 'auto' }}>
                                    {/* Normal band area */}
                                    <path d={bandPath} fill="#a3e635" opacity="0.22" />

                                    {/* Horizontal grid lines */}
                                    {[0, 2, 4, 6, 8, 10, 12, 14, 16].map(val => (
                                        <g key={val}>
                                            <line
                                                x1={padL} y1={scaleY(val)} x2={chartW - padR} y2={scaleY(val)}
                                                stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3"
                                            />
                                            <text x={padL - 10} y={scaleY(val) + 4} fill="currentColor" className="text-black dark:text-slate-200" fontSize="10" fontWeight="900" textAnchor="end">
                                                {val}
                                            </text>
                                        </g>
                                    ))}

                                    {/* Vertical grid lines (months) */}
                                    {[0, 3, 6, 9, 12, 15, 18, 21, 24].map(month => (
                                        <g key={month}>
                                            <line
                                                x1={scaleX(month)} y1={padT} x2={scaleX(month)} y2={chartH - padB}
                                                stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3"
                                            />
                                            <text x={scaleX(month)} y={chartH - padB + 20} fill="currentColor" className="text-black dark:text-slate-200" fontSize="10" fontWeight="900" textAnchor="middle">
                                                {month}
                                            </text>
                                        </g>
                                    ))}

                                    {/* Axes labels */}
                                    <text x={padL - 45} y={chartH / 2} fill="currentColor" className="text-black dark:text-slate-200" fontSize="11" fontWeight="900" textAnchor="middle" transform={`rotate(-90, ${padL - 45}, ${chartH / 2})`}>
                                        Berat Badan (kg)
                                    </text>
                                    <text x={chartW / 2} y={chartH - 8} fill="currentColor" className="text-black dark:text-slate-200" fontSize="11" fontWeight="900" textAnchor="middle">
                                        Usia Anak (Bulan)
                                    </text>

                                    {/* Normal line (dashed) */}
                                    <path d={normalPath} fill="none" stroke="#65a30d" strokeWidth="3" strokeDasharray="6,4" />

                                    {/* Child line (solid) */}
                                    <path d={childPath} fill="none" stroke="currentColor" className="text-black dark:text-white" strokeWidth="4" />

                                    {/* Data points - Normal */}
                                    {dataPoints.map((p, i) => (
                                        <circle key={`n-${i}`} cx={scaleX(p.bulan)} cy={scaleY(p.normal)} r="4" fill="#a3e635" stroke="#000" strokeWidth="1.5" />
                                    ))}

                                    {/* Data points - Child */}
                                    {dataPoints.map((p, i) => (
                                        <g key={`c-${i}`}
                                            onMouseEnter={() => setHoveredPoint(i)}
                                            onMouseLeave={() => setHoveredPoint(null)}
                                            className="cursor-pointer"
                                        >
                                            <circle cx={scaleX(p.bulan)} cy={scaleY(p.berat)} r="6" fill="#f472b6" stroke="black" strokeWidth="2" />
                                            {hoveredPoint === i && (
                                                <g>
                                                    <rect
                                                        x={scaleX(p.bulan) - 55} y={scaleY(p.berat) - 38}
                                                        width="110" height="26" rx="6" fill="#000"
                                                    />
                                                    <text x={scaleX(p.bulan)} y={scaleY(p.berat) - 21} fill="#a3e635" fontSize="10" fontWeight="900" textAnchor="middle">
                                                        {p.bulan} bln: {p.berat} kg
                                                    </text>
                                                </g>
                                            )}
                                        </g>
                                    ))}

                                    {/* Current point highlight (24 months) */}
                                    <circle cx={scaleX(24)} cy={scaleY(13.5)} r="10" fill="#f472b6" opacity="0.3" />
                                    <g>
                                        <rect x={scaleX(24) - 65} y={scaleY(13.5) - 44} width="130" height="28" rx="6" fill="#000" />
                                        <text x={scaleX(24)} y={scaleY(13.5) - 26} fill="#a3e635" fontSize="11" fontWeight="900" textAnchor="middle">
                                            ● Aira (24 Bln)
                                        </text>
                                    </g>
                                </svg>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap items-center gap-6 mt-5 pt-4 border-t-2 border-black/10 text-xs font-black uppercase">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-1 bg-success border border-black"></div>
                                    <span className="text-black dark:text-white">Median WHO (Standar Normal)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-1 bg-black dark:bg-white border border-black"></div>
                                    <span className="text-black dark:text-white">Pertumbuhan Aktual Anak</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-3 bg-success/25 border border-black"></div>
                                    <span className="text-black dark:text-white">Rentang Normal WHO (±15%)</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section: 2 columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                            {/* Timeline Table - 3 cols */}
                            <div className="lg:col-span-3 bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                                <div className="p-6 border-b-3 border-black bg-card">
                                    <h3 className="text-base font-black uppercase text-black dark:text-white">Riwayat Pertumbuhan Berkala</h3>
                                    <p className="text-xs font-bold text-muted-foreground uppercase">Pencapaian berat badan per rentang usia</p>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-card-subtle border-b-3 border-black text-black dark:text-white">
                                                <th className="px-5 py-3 text-xs font-black uppercase">Periode</th>
                                                <th className="px-4 py-3 text-xs font-black uppercase">Berat Badan</th>
                                                <th className="px-4 py-3 text-xs font-black uppercase">Kenaikan</th>
                                                <th className="px-4 py-3 text-xs font-black uppercase">Status</th>
                                                <th className="px-5 py-3 text-xs font-black uppercase">Catatan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-black/10">
                                            {milestones.map((m, i) => (
                                                <tr key={i} className="hover:bg-card-subtle transition-colors">
                                                    <td className="px-5 py-3.5 text-xs font-black text-black dark:text-white uppercase">{m.age}</td>
                                                    <td className="px-4 py-3.5 text-xs font-bold text-black dark:text-white">{m.weight}</td>
                                                    <td className="px-4 py-3.5">
                                                        <span className="flex items-center gap-1 text-xs font-black text-black dark:text-white">
                                                            <TrendingUp className="w-3.5 h-3.5 text-black dark:text-white stroke-[3]" />
                                                            {m.gain}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3.5">
                                                        <Badge variant={m.status === 'normal' ? 'success' : m.status === 'warning' ? 'warning' : 'danger'}>
                                                            {m.status === 'normal' ? 'Normal' : m.status === 'warning' ? 'Perhatian' : 'Di Atas Normal'}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-5 py-3.5 text-xs font-bold text-muted-foreground leading-relaxed max-w-[200px]">{m.note}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Interpretation Card - 2 cols */}
                            <div className="lg:col-span-2 flex flex-col gap-5">
                                <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                                    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b-3 border-black">
                                        <div className="w-9 h-9 rounded-xl bg-primary text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                            <Info className="w-5 h-5 stroke-[2.5]" />
                                        </div>
                                        <h3 className="text-sm font-black uppercase text-black dark:text-white">Interpretasi Kurva</h3>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="p-3.5 bg-card-subtle rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <p className="text-xs font-black uppercase text-black dark:text-white mb-1">Pola Pertumbuhan</p>
                                            <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                                                Kurva berat badan menunjukkan tren naik konsisten di atas garis median WHO sejak usia 6 bulan.
                                            </p>
                                        </div>
                                        <div className="p-3.5 bg-card-subtle rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <p className="text-xs font-black uppercase text-black dark:text-white mb-1">Area Perhatian</p>
                                            <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                                                Pada usia 24 bulan, berat badan berada 12.5% di atas median WHO. Disarankan memantau porsi makan harian.
                                            </p>
                                        </div>
                                        <div className="p-3.5 bg-card-subtle rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <p className="text-xs font-black uppercase text-primary mb-1">Rekomendasi</p>
                                            <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                                                Evaluasi ulang berkala dalam 4 minggu dengan stimulasi gerak aktif setiap hari.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom CTA Actions */}
                        <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-2">
                            <Link href="/screening-anak/result">
                                <Button variant="outline" size="md" className="w-full sm:w-auto">
                                    <ArrowLeft className="w-4 h-4 stroke-[3]" />
                                    Kembali ke Hasil Screening
                                </Button>
                            </Link>

                            {/* Disabled PDF button with Segera Hadir */}
                            <button 
                                disabled 
                                className="h-11 px-5 rounded-xl border-2 border-black bg-muted text-muted-foreground/60 text-xs font-black uppercase flex items-center justify-center gap-2 cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] select-none"
                                title="Fitur unduh laporan PDF sedang dalam pengembangan"
                            >
                                <Download className="w-4 h-4 stroke-[2.5]" />
                                <span>Unduh Laporan Lengkap (PDF)</span>
                                <span className="text-[9px] bg-warning text-black border border-black px-1.5 py-0.5 rounded font-black uppercase">Segera Hadir</span>
                            </button>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
