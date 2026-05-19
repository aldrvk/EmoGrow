import React, { useState } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Button from '../Components/Buttons/Button';
import Badge from '../Components/Badges/Badge';
import { ArrowLeft, Download, TrendingUp, TrendingDown, Minus, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

// Dummy data points for the detailed chart
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

    // Build path strings
    const normalPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.bulan)} ${scaleY(p.normal)}`).join(' ');
    const childPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.bulan)} ${scaleY(p.berat)}`).join(' ');

    // Upper/lower bounds for normal band
    const upperBound = dataPoints.map(p => ({ x: scaleX(p.bulan), y: scaleY(p.normal * 1.15) }));
    const lowerBound = dataPoints.map(p => ({ x: scaleX(p.bulan), y: scaleY(p.normal * 0.85) }));
    const bandPath = [
        ...upperBound.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`),
        ...lowerBound.reverse().map((p, i) => `${i === 0 ? 'L' : 'L'} ${p.x} ${p.y}`),
        'Z'
    ].join(' ');

    return (
        <div className="min-h-screen bg-background flex w-full">
            <Head title="Detail Kurva Pertumbuhan" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto">

                        {/* Back Navigation */}
                        <Link
                            href="/screening-anak/result"
                            className="inline-flex items-center gap-2 text-secondary text-cta-text hover:text-secondary/80 transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali ke Hasil Screening
                        </Link>

                        {/* Page Header */}
                        <div className="mb-8">
                            <p className="text-primary text-[11px] font-bold tracking-widest uppercase mb-1">Detail Analisis</p>
                            <h1 className="text-netral">Kurva Pertumbuhan (BMI for Age)</h1>
                        </div>

                        {/* Summary Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white rounded-xl border border-border/60 p-5 shadow-sm">
                                <p className="text-label-text text-netral/70 mb-1">Nama Anak</p>
                                <p className="text-large-text text-netral">Aira Putri Mahesa</p>
                            </div>
                            <div className="bg-white rounded-xl border border-border/60 p-5 shadow-sm">
                                <p className="text-label-text text-netral/70 mb-1">Usia Saat Screening</p>
                                <p className="text-large-text text-netral">24 <span className="text-body-thin">Bulan</span></p>
                            </div>
                            <div className="bg-white rounded-xl border border-border/60 p-5 shadow-sm">
                                <p className="text-label-text text-netral/70 mb-1">Berat Badan Saat Ini</p>
                                <p className="text-large-text text-netral">13.5 <span className="text-body-thin">kg</span></p>
                            </div>
                            <div className="bg-white rounded-xl border border-border/60 p-5 shadow-sm">
                                <p className="text-label-text text-netral/70 mb-1">Status BMI</p>
                                <Badge variant="warning" className="mt-1 px-3 py-1">
                                    <AlertTriangle className="w-3 h-3 mr-1.5 inline" />
                                    Overweight
                                </Badge>
                            </div>
                        </div>

                        {/* Main Chart Card */}
                        <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6 lg:p-8 mb-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <h3 className="text-large-text text-netral mb-1">Grafik Berat Badan vs Usia</h3>
                                    <p className="text-body-thin text-netral/70">Perbandingan data anak dengan standar WHO</p>
                                </div>
                                <Button variant="outline" size="sm" className="bg-white">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export Grafik
                                </Button>
                            </div>

                            {/* SVG Chart */}
                            <div className="w-full overflow-x-auto">
                                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full min-w-[600px]" style={{ height: 'auto' }}>
                                    {/* Normal band area */}
                                    <path d={bandPath} fill="#60a5fa" opacity="0.08" />

                                    {/* Horizontal grid lines */}
                                    {[0, 2, 4, 6, 8, 10, 12, 14, 16].map(val => (
                                        <g key={val}>
                                            <line
                                                x1={padL} y1={scaleY(val)} x2={chartW - padR} y2={scaleY(val)}
                                                stroke="#e2e8f0" strokeWidth="1"
                                            />
                                            <text x={padL - 10} y={scaleY(val) + 4} fill="#64748b" fontSize="10" textAnchor="end">
                                                {val}
                                            </text>
                                        </g>
                                    ))}

                                    {/* Vertical grid lines (months) */}
                                    {[0, 3, 6, 9, 12, 15, 18, 21, 24].map(month => (
                                        <g key={month}>
                                            <line
                                                x1={scaleX(month)} y1={padT} x2={scaleX(month)} y2={chartH - padB}
                                                stroke="#e2e8f0" strokeWidth="1"
                                            />
                                            <text x={scaleX(month)} y={chartH - padB + 20} fill="#64748b" fontSize="10" textAnchor="middle">
                                                {month}
                                            </text>
                                        </g>
                                    ))}

                                    {/* Axes labels */}
                                    <text x={padL - 45} y={chartH / 2} fill="#64748b" fontSize="11" textAnchor="middle" transform={`rotate(-90, ${padL - 45}, ${chartH / 2})`}>
                                        Berat Badan (kg)
                                    </text>
                                    <text x={chartW / 2} y={chartH - 5} fill="#64748b" fontSize="11" textAnchor="middle">
                                        Usia (Bulan)
                                    </text>

                                    {/* Normal line (dashed) */}
                                    <path d={normalPath} fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="8,5" opacity="0.7" />

                                    {/* Child line (solid) */}
                                    <path d={childPath} fill="none" stroke="#f59e0b" strokeWidth="3" />

                                    {/* Data points - Normal */}
                                    {dataPoints.map((p, i) => (
                                        <circle key={`n-${i}`} cx={scaleX(p.bulan)} cy={scaleY(p.normal)} r="4" fill="#60a5fa" opacity="0.6" />
                                    ))}

                                    {/* Data points - Child */}
                                    {dataPoints.map((p, i) => (
                                        <g key={`c-${i}`}
                                            onMouseEnter={() => setHoveredPoint(i)}
                                            onMouseLeave={() => setHoveredPoint(null)}
                                            className="cursor-pointer"
                                        >
                                            <circle cx={scaleX(p.bulan)} cy={scaleY(p.berat)} r="6" fill="#f59e0b" stroke="white" strokeWidth="2" />
                                            {hoveredPoint === i && (
                                                <g>
                                                    <rect
                                                        x={scaleX(p.bulan) - 55} y={scaleY(p.berat) - 42}
                                                        width="110" height="30" rx="6" fill="#1e293b"
                                                    />
                                                    <text x={scaleX(p.bulan)} y={scaleY(p.berat) - 22} fill="white" fontSize="11" fontWeight="600" textAnchor="middle">
                                                        {p.bulan} bln: {p.berat} kg
                                                    </text>
                                                    <polygon points={`${scaleX(p.bulan) - 5},${scaleY(p.berat) - 12} ${scaleX(p.bulan) + 5},${scaleY(p.berat) - 12} ${scaleX(p.bulan)},${scaleY(p.berat) - 6}`} fill="#1e293b" />
                                                </g>
                                            )}
                                        </g>
                                    ))}

                                    {/* Highlight current point (24 months) */}
                                    <circle cx={scaleX(24)} cy={scaleY(13.5)} r="10" fill="#f59e0b" opacity="0.2" />
                                    <g>
                                        <rect x={scaleX(24) - 65} y={scaleY(13.5) - 48} width="130" height="30" rx="6" fill="#1e293b" />
                                        <text x={scaleX(24)} y={scaleY(13.5) - 28} fill="white" fontSize="11" fontWeight="700" textAnchor="middle">
                                            ● Aira (24 Bln)
                                        </text>
                                        <polygon points={`${scaleX(24) - 5},${scaleY(13.5) - 18} ${scaleX(24) + 5},${scaleY(13.5) - 18} ${scaleX(24)},${scaleY(13.5) - 12}`} fill="#1e293b" />
                                    </g>
                                </svg>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-border/40">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-[3px] bg-secondary rounded-full opacity-70" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #60a5fa 0, #60a5fa 6px, transparent 6px, transparent 11px)' }}></div>
                                    <span className="text-small-text text-netral">Median WHO (Normal)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-[3px] bg-[#f59e0b] rounded-full"></div>
                                    <span className="text-small-text text-netral">Data Anak</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-3 bg-secondary/10 rounded-sm border border-secondary/20"></div>
                                    <span className="text-small-text text-netral">Rentang Normal (±15%)</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section: 2 columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">

                            {/* Timeline Table - 3 cols */}
                            <div className="lg:col-span-3 bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-border/40">
                                    <h3 className="text-large-text text-netral">Riwayat Pertumbuhan</h3>
                                    <p className="text-body-thin text-netral/70">Pencapaian berat badan per periode usia</p>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-background/50">
                                                <th className="text-left text-label-text text-netral/70 px-6 py-3">Periode</th>
                                                <th className="text-left text-label-text text-netral/70 px-6 py-3">Berat Badan</th>
                                                <th className="text-left text-label-text text-netral/70 px-6 py-3">Kenaikan</th>
                                                <th className="text-left text-label-text text-netral/70 px-6 py-3">Status</th>
                                                <th className="text-left text-label-text text-netral/70 px-6 py-3">Catatan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {milestones.map((m, i) => (
                                                <tr key={i} className="border-t border-border/30 hover:bg-background/30 transition-colors">
                                                    <td className="px-6 py-4 text-body-bold text-netral">{m.age}</td>
                                                    <td className="px-6 py-4 text-body-thin text-netral">{m.weight}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="flex items-center gap-1 text-body-bold text-netral">
                                                            {m.status === 'normal' ? (
                                                                <TrendingUp className="w-4 h-4 text-secondary" />
                                                            ) : m.status === 'warning' ? (
                                                                <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
                                                            ) : (
                                                                <TrendingDown className="w-4 h-4 text-primary" />
                                                            )}
                                                            {m.gain}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge variant={m.status === 'normal' ? 'secondary' : m.status === 'warning' ? 'warning' : 'danger'}>
                                                            {m.status === 'normal' ? 'Normal' : m.status === 'warning' ? 'Perhatian' : 'Di Atas Normal'}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 text-small-text text-netral/70 max-w-[200px]">{m.note}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Interpretation Card - 2 cols */}
                            <div className="lg:col-span-2 flex flex-col gap-4">
                                {/* Interpretation */}
                                <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                                            <Info className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-body-bold text-netral">Interpretasi Kurva</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                                            <p className="text-body-bold text-secondary mb-1">Pola Pertumbuhan</p>
                                            <p className="text-small-text text-netral/80 leading-relaxed">
                                                Kurva berat badan anak menunjukkan tren naik yang konsisten di atas garis median WHO sejak usia 6 bulan. Akselerasi kenaikan berat badan terjadi secara gradual.
                                            </p>
                                        </div>
                                        <div className="p-4 bg-[#FEF3C7] rounded-lg border border-[#f59e0b]/20">
                                            <p className="text-body-bold text-[#D97706] mb-1">Area yang Perlu Diperhatikan</p>
                                            <p className="text-small-text text-netral/80 leading-relaxed">
                                                Pada usia 24 bulan, berat badan anak berada 12.5% di atas median WHO. Meskipun belum dalam kategori obesitas, disarankan untuk memantau pola makan dan aktivitas fisik.
                                            </p>
                                        </div>
                                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                                            <p className="text-body-bold text-primary mb-1">Rekomendasi</p>
                                            <p className="text-small-text text-netral/80 leading-relaxed">
                                                Lakukan evaluasi ulang dalam 4 minggu. Perhatikan porsi makan dan pastikan anak mendapat stimulasi fisik yang cukup melalui bermain aktif.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6">
                                    <h3 className="text-body-bold text-netral mb-4">Ringkasan Statistik</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-border/30">
                                            <span className="text-body-thin text-netral/70">Berat Lahir</span>
                                            <span className="text-body-bold text-netral">3.2 kg</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-border/30">
                                            <span className="text-body-thin text-netral/70">Berat Saat Ini</span>
                                            <span className="text-body-bold text-netral">13.5 kg</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-border/30">
                                            <span className="text-body-thin text-netral/70">Total Kenaikan</span>
                                            <span className="text-body-bold text-netral">+10.3 kg</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-border/30">
                                            <span className="text-body-thin text-netral/70">Median WHO (24 bln)</span>
                                            <span className="text-body-bold text-netral">12.0 kg</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-body-thin text-netral/70">Deviasi dari Median</span>
                                            <Badge variant="warning" className="px-2 py-0.5">+12.5%</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Link href="/screening-anak/result">
                                <Button variant="outline" className="bg-white w-full sm:w-auto">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Kembali ke Hasil
                                </Button>
                            </Link>
                            <Button variant="primary" className="w-full sm:w-auto">
                                <Download className="w-4 h-4 mr-2" />
                                Download Laporan Lengkap (PDF)
                            </Button>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
