import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Badge from '../Components/Badges/Badge';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ReferenceArea
} from 'recharts';
import { TrendingDown, CheckCircle2, AlertTriangle, Award, Calendar, Activity } from 'lucide-react';

// ---------- DUMMY DATA ----------
const childProfile = {
    name: 'Aira Putri Mahesa',
    age: '24 Bulan',
};

const metrics = {
    imt: { value: 17.8, prev: 18.3, status: 'turun' as const },
    whtr: { value: 0.48, threshold: 0.5, status: 'normal' as const },
    kepatuhan: { value: 85, total: 84, completed: 71 },
    statusGizi: { label: 'Normal', variant: 'secondary' as const },
};

const chartDataBB = [
    { minggu: 'M1', anak: 13.5, normalMin: 10.0, normalMax: 12.5, overweightMax: 14.0 },
    { minggu: 'M4', anak: 13.2, normalMin: 10.2, normalMax: 12.6, overweightMax: 14.1 },
    { minggu: 'M8', anak: 13.0, normalMin: 10.4, normalMax: 12.8, overweightMax: 14.2 },
    { minggu: 'M12', anak: 12.7, normalMin: 10.5, normalMax: 12.9, overweightMax: 14.3 },
    { minggu: 'M16', anak: 12.4, normalMin: 10.7, normalMax: 13.1, overweightMax: 14.5 },
    { minggu: 'M20', anak: 12.2, normalMin: 10.8, normalMax: 13.2, overweightMax: 14.6 },
    { minggu: 'M24', anak: 12.0, normalMin: 11.0, normalMax: 13.4, overweightMax: 14.8 },
];

const chartDataTB = [
    { minggu: 'M1', anak: 82, normalMin: 80, normalMax: 90 },
    { minggu: 'M4', anak: 83, normalMin: 81, normalMax: 91 },
    { minggu: 'M8', anak: 84.5, normalMin: 82, normalMax: 92 },
    { minggu: 'M12', anak: 86, normalMin: 83, normalMax: 93 },
    { minggu: 'M16', anak: 87.5, normalMin: 84, normalMax: 94 },
    { minggu: 'M20', anak: 89, normalMin: 85, normalMax: 95 },
    { minggu: 'M24', anak: 90.5, normalMin: 86, normalMax: 96 },
];

const chartDataIMT = [
    { minggu: 'M1', anak: 20.1, normalMin: 14.0, normalMax: 18.0, overweightMax: 20.5 },
    { minggu: 'M4', anak: 19.4, normalMin: 14.0, normalMax: 18.0, overweightMax: 20.5 },
    { minggu: 'M8', anak: 18.8, normalMin: 14.0, normalMax: 18.0, overweightMax: 20.5 },
    { minggu: 'M12', anak: 18.2, normalMin: 14.0, normalMax: 18.0, overweightMax: 20.5 },
    { minggu: 'M16', anak: 17.9, normalMin: 14.0, normalMax: 18.0, overweightMax: 20.5 },
    { minggu: 'M20', anak: 17.8, normalMin: 14.0, normalMax: 18.0, overweightMax: 20.5 },
    { minggu: 'M24', anak: 17.8, normalMin: 14.0, normalMax: 18.0, overweightMax: 20.5 },
];

const chartDataWHtR = [
    { minggu: 'M1', anak: 0.54, threshold: 0.5 },
    { minggu: 'M4', anak: 0.53, threshold: 0.5 },
    { minggu: 'M8', anak: 0.51, threshold: 0.5 },
    { minggu: 'M12', anak: 0.50, threshold: 0.5 },
    { minggu: 'M16', anak: 0.49, threshold: 0.5 },
    { minggu: 'M20', anak: 0.48, threshold: 0.5 },
    { minggu: 'M24', anak: 0.48, threshold: 0.5 },
];

const radarData = [
    { subject: 'Motorik Kasar', value: 85, fullMark: 100 },
    { subject: 'Motorik Halus', value: 72, fullMark: 100 },
    { subject: 'Bahasa', value: 90, fullMark: 100 },
    { subject: 'Sosial Emosional', value: 78, fullMark: 100 },
    { subject: 'Kognitif', value: 82, fullMark: 100 },
];

const heatmapData = Array.from({ length: 24 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => ({
        week: w + 1,
        day: d,
        done: w + 1 <= 12 ? Math.random() > 0.25 : false
    }))
).flat();

const chartTabs = [
    { key: 'bb', label: 'Berat Badan' },
    { key: 'tb', label: 'Tinggi Badan' },
    { key: 'imt', label: 'IMT (BMI)' },
    { key: 'whtr', label: 'Rasio WHtR' },
] as const;

type ChartTab = typeof chartTabs[number]['key'];

const ChartBB = () => (
    <AreaChart data={chartDataBB} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
        <XAxis dataKey="minggu" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <YAxis stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <Tooltip
            contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: '2px solid #000', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            labelStyle={{ fontWeight: '900', color: '#a3e635', marginBottom: '2px' }}
        />
        <Area type="monotone" dataKey="overweightMax" stroke="#dc2626" strokeDasharray="4 4" fill="#ff4a4a" fillOpacity={0.2} />
        <Area type="monotone" dataKey="normalMax" stroke="#65a30d" strokeDasharray="4 4" fill="#a3e635" fillOpacity={0.25} />
        <Area type="monotone" dataKey="normalMin" stroke="#65a30d" strokeDasharray="4 4" fill="var(--color-card)" fillOpacity={1} />
        <Area type="monotone" dataKey="anak" stroke="#000" fill="#f472b6" fillOpacity={0.5} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, stroke: '#000', fill: '#FFF' }} />
    </AreaChart>
);

const ChartTB = () => (
    <AreaChart data={chartDataTB} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
        <XAxis dataKey="minggu" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <YAxis stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <Tooltip
            contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: '2px solid #000', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            labelStyle={{ fontWeight: '900', color: '#a3e635', marginBottom: '2px' }}
        />
        <Area type="monotone" dataKey="normalMax" stroke="#65a30d" strokeDasharray="4 4" fill="#a3e635" fillOpacity={0.25} />
        <Area type="monotone" dataKey="normalMin" stroke="#65a30d" strokeDasharray="4 4" fill="var(--color-card)" fillOpacity={1} />
        <Area type="monotone" dataKey="anak" stroke="#000" fill="#f472b6" fillOpacity={0.5} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, stroke: '#000', fill: '#FFF' }} />
    </AreaChart>
);

const ChartIMT = () => (
    <AreaChart data={chartDataIMT} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
        <XAxis dataKey="minggu" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <YAxis stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <Tooltip
            contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: '2px solid #000', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            labelStyle={{ fontWeight: '900', color: '#a3e635', marginBottom: '2px' }}
        />
        <Area type="monotone" dataKey="overweightMax" stroke="#dc2626" strokeDasharray="4 4" fill="#ff4a4a" fillOpacity={0.2} />
        <Area type="monotone" dataKey="normalMax" stroke="#65a30d" strokeDasharray="4 4" fill="#a3e635" fillOpacity={0.25} />
        <Area type="monotone" dataKey="normalMin" stroke="#65a30d" strokeDasharray="4 4" fill="var(--color-card)" fillOpacity={1} />
        <Area type="monotone" dataKey="anak" stroke="#000" fill="#f472b6" fillOpacity={0.5} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, stroke: '#000', fill: '#FFF' }} />
    </AreaChart>
);

const ChartWHtR = () => (
    <AreaChart data={chartDataWHtR} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
        <XAxis dataKey="minggu" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <YAxis stroke="#000" fontSize={11} fontWeight={800} tickLine={false} domain={[0.4, 0.6]} />
        <Tooltip
            contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: '2px solid #000', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            labelStyle={{ fontWeight: '900', color: '#a3e635', marginBottom: '2px' }}
        />
        <ReferenceArea y1={0.5} y2={0.6} fill="#ff4a4a" fillOpacity={0.22} />
        <ReferenceArea y1={0.4} y2={0.5} fill="#a3e635" fillOpacity={0.25} />
        <Area type="monotone" dataKey="anak" stroke="#000" fill="#f472b6" fillOpacity={0.5} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, stroke: '#000', fill: '#FFF' }} />
    </AreaChart>
);

export default function Monitoring() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeChart, setActiveChart] = useState<ChartTab>('bb');

    const renderChart = () => {
        switch (activeChart) {
            case 'bb': return <ChartBB />;
            case 'tb': return <ChartTB />;
            case 'imt': return <ChartIMT />;
            case 'whtr': return <ChartWHtR />;
        }
    };

    const dayLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

    return (
        <div className="min-h-screen bg-background flex w-full font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title="Monitoring Perkembangan - EmoGROW" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    <div className="max-w-[1240px] mx-auto space-y-6">

                        {/* ---------- PAGE HEADER ---------- */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-wrap bg-success p-6 border-3 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000]">
                            <div className="space-y-2 min-w-0 flex-1">
                                <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black">
                                    Monitoring & Analitik Pertumbuhan
                                </h1>
                                <div className="flex items-center gap-2 bg-white text-black px-3 py-1 rounded-xl border-2 border-black w-fit text-xs md:text-sm font-black uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                                    </span>
                                    {childProfile.name} <span className="text-neutral-400">|</span> {childProfile.age}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white text-black p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] self-start sm:self-center shrink-0">
                                <span className="text-xs font-black uppercase tracking-wide flex items-center gap-1.5 text-black">
                                    <Calendar className="w-4 h-4 stroke-[2.5]" /> Timeline:
                                </span>
                                <Badge variant="info">
                                    Minggu 12 / 24
                                </Badge>
                            </div>
                        </div>

                        {/* ---------- ROW 1: QUICK METRICS ---------- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* IMT */}
                            <div className="bg-warning border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
                                <p className="text-xs font-black uppercase tracking-wide mb-1 text-black/80">IMT Saat Ini</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tight text-black">{metrics.imt.value}</span>
                                    <span className="text-xs font-black text-black/80 uppercase">kg/m²</span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-3 bg-white text-black border-2 border-black px-2.5 py-1 rounded-lg text-[10px] font-black uppercase w-fit shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                    <TrendingDown className="w-3.5 h-3.5 text-danger stroke-[3]" />
                                    <span>-{(metrics.imt.prev - metrics.imt.value).toFixed(1)} Dari Minggu Lalu</span>
                                </div>
                            </div>

                            {/* WHtR */}
                            <div className="bg-info text-white border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
                                <p className="text-xs font-black uppercase tracking-wide mb-1 text-white/80">Rasio WHtR</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tight text-white">{metrics.whtr.value}</span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-3 bg-white text-black border-2 border-black px-2.5 py-1 rounded-lg text-[10px] font-black uppercase w-fit shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-success stroke-[3]" />
                                    <span>Normal (Cutoff &lt; 0.50)</span>
                                </div>
                            </div>

                            {/* Kepatuhan */}
                            <div className="bg-success border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
                                <p className="text-xs font-black uppercase tracking-wide mb-1 text-black/80">Kepatuhan Program</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tight text-black">{metrics.kepatuhan.value}%</span>
                                </div>
                                <div className="mt-3 bg-white text-black border-2 border-black rounded-lg p-2 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex justify-between text-[10px] font-black uppercase mb-1 text-black">
                                        <span>71 / 84 Sesi Selesai</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted border border-black rounded-full overflow-hidden">
                                        <div className="bg-success h-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Gizi */}
                            <div className="bg-primary border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
                                <p className="text-xs font-black uppercase tracking-wide mb-1 text-black/80">Status Gizi</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black uppercase tracking-tight text-black">Gizi Baik</span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-3 bg-white text-black border-2 border-black px-2.5 py-1 rounded-lg text-[10px] font-black uppercase w-fit shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                    <Award className="w-3.5 h-3.5 text-black stroke-[3]" />
                                    <span>Target Minggu 16 Tercapai</span>
                                </div>
                            </div>
                        </div>

                        {/* ---------- ROW 2: CHART + CLINICAL SUMMARY ---------- */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left: Interactive Growth Chart */}
                            <div className="lg:col-span-2 bg-card border-3 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_#000] space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-black pb-4">
                                    <div>
                                        <h3 className="text-base font-black uppercase text-black dark:text-white">Kurva Pertumbuhan Klinis</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Standar Antropometri WHO & KMS</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 bg-background p-1 border-2 border-black rounded-xl">
                                        {chartTabs.map(tab => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveChart(tab.key)}
                                                className={`px-3 py-1 text-xs font-black uppercase rounded-lg border-2 transition-all cursor-pointer ${
                                                    activeChart === tab.key
                                                        ? 'bg-success text-black border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]'
                                                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-[280px] w-full pt-2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        {renderChart()}
                                    </ResponsiveContainer>
                                </div>

                                {/* Chart Legend */}
                                <div className="flex flex-wrap items-center gap-4 pt-3 border-t-2 border-black/10 text-xs font-black uppercase">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-1 bg-primary border border-black"></div>
                                        <span className="text-black dark:text-white">Pertumbuhan Aktual Anak</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3.5 h-3.5 bg-success/30 border border-black rounded-xs"></div>
                                        <span className="text-black dark:text-white">Rentang Normal WHO</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3.5 h-3.5 bg-danger/25 border border-black rounded-xs"></div>
                                        <span className="text-black dark:text-white">Batas Risiko / Overweight</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Clinical Highlights & Radar Chart */}
                            <div className="space-y-6">
                                {/* Insights */}
                                <div className="bg-card border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] space-y-3">
                                    <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground border-b-2 border-black/10 pb-2">Catatan Evaluasi Klinis</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2.5 bg-card-subtle p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <div className="p-1 bg-success border border-black rounded-lg mt-0.5"><CheckCircle2 className="w-3.5 h-3.5 stroke-[3] text-black" /></div>
                                            <div>
                                                <h4 className="text-[11px] font-black uppercase text-black dark:text-white">Rasio WHtR Sangat Aman</h4>
                                                <p className="text-[10px] font-bold mt-0.5 leading-normal text-muted-foreground">Konsisten berada di bawah batas 0.5 sejak minggu ke-16.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2.5 bg-card-subtle p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <div className="p-1 bg-warning border border-black rounded-lg mt-0.5"><AlertTriangle className="w-3.5 h-3.5 stroke-[3] text-black" /></div>
                                            <div>
                                                <h4 className="text-[11px] font-black uppercase text-black dark:text-white">Pertumbuhan Tinggi Melambat</h4>
                                                <p className="text-[10px] font-bold mt-0.5 leading-normal text-muted-foreground">Disarankan review asupan kalsium & vitamin D3 harian.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Radar Chart Mini */}
                                <div className="bg-card border-3 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_#000]">
                                    <h3 className="text-xs font-black uppercase mb-2 text-muted-foreground tracking-wide">Aspek Tumbuh Kembang</h3>
                                    <div className="h-[140px] w-full flex items-center justify-center border-2 border-black rounded-xl bg-background py-1">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                                                <PolarGrid stroke="#CBD5E1" strokeWidth={1} />
                                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fontWeight: 800, fill: '#64748B' }} />
                                                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                                                <Radar name="Skor" dataKey="value" stroke="#000" fill="#f472b6" fillOpacity={0.5} strokeWidth={2.5} dot={{ r: 3.5, fill: '#FFF', stroke: '#000', strokeWidth: 1.5 }} />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2.5 border-t-2 border-black/10 mt-2.5 text-[10px] font-black uppercase">
                                        {radarData.map((item, idx) => (
                                            <div 
                                                key={item.subject} 
                                                className={`flex justify-between items-center bg-sidebar px-2.5 py-1.5 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] ${
                                                    idx === radarData.length - 1 && radarData.length % 2 !== 0 ? 'sm:col-span-2' : ''
                                                }`}
                                            >
                                                <span className="text-black dark:text-white font-extrabold text-[10px] leading-tight pr-1.5">{item.subject}</span>
                                                <span className="bg-black text-white px-1.5 py-0.5 rounded text-[9px] font-black shrink-0">{item.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------- ROW 3: COMPLIANCE HEATMAP ---------- */}
                        <div className="bg-card border-3 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000]">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b-2 border-black/10 pb-3">
                                <div>
                                    <h3 className="text-sm font-black uppercase text-black dark:text-white">Matriks Kepatuhan Rutinitas Harian</h3>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Visualisasi Konsistensi Agenda Program Per Hari</p>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase text-black dark:text-white">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3.5 h-3.5 bg-black border border-black rounded" />
                                        <span>Selesai</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3.5 h-3.5 bg-muted border-2 border-black rounded" />
                                        <span>Kosong</span>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto pb-1">
                                <div className="inline-flex items-start gap-2.5 p-0.5 min-w-max">
                                    {/* Row Labels */}
                                    <div className="flex flex-col gap-1.5 pt-5 font-black text-[9px] w-7 text-left text-muted-foreground">
                                        {dayLabels.map((day, i) => (
                                            <div key={i} className="h-3.5 flex items-center">{day}</div>
                                        ))}
                                    </div>

                                    {/* Heatmap Grid */}
                                    <div className="flex gap-1">
                                        {Array.from({ length: 24 }, (_, w) => (
                                            <div key={w} className="flex flex-col gap-1.5">
                                                <span className="text-[8px] font-black h-3.5 flex items-center justify-center bg-black text-white border border-black rounded">
                                                    {(w + 1) % 4 === 1 || w === 0 ? `M${w + 1}` : `..`}
                                                </span>
                                                {Array.from({ length: 7 }, (_, d) => {
                                                    const cell = heatmapData.find(c => c.week === w + 1 && c.day === d);
                                                    return (
                                                        <div
                                                            key={d}
                                                            className={`w-3.5 h-3.5 transition-all cursor-pointer border-2 border-black rounded-[4px] ${
                                                                cell?.done
                                                                    ? 'bg-success hover:bg-lime-400'
                                                                    : w + 1 <= 12
                                                                        ? 'bg-muted hover:bg-muted/80'
                                                                        : 'bg-muted/30 border-dashed border-black/30'
                                                            }`}
                                                            title={`Minggu ${w + 1}, Hari ke-${d + 1}: ${cell?.done ? 'Selesai' : 'Tidak Ada Aktivitas'}`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ))}
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