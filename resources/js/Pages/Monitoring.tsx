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
    { minggu: 'M20', anak: 17.8, normalMin: 14.0, normalMax: 18.0, overweightMax: 20.5 }, // ✅ dihapus key "font"
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

// ✅ Pisahkan tiap chart ke komponen/render sendiri agar tidak ada kondisional di dalam AreaChart
const ChartBB = () => (
    <AreaChart data={chartDataBB} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="minggu" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <YAxis stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <Tooltip
            contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: '2px solid #000', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            labelStyle={{ fontWeight: '900', color: '#CCF281', marginBottom: '2px' }}
        />
        <Area type="monotone" dataKey="overweightMax" stroke="#94A3B8" strokeDasharray="4 4" fill="#FCA5A5" fillOpacity={0.2} />
        <Area type="monotone" dataKey="normalMax" stroke="#64748B" strokeDasharray="4 4" fill="#7DD3FC" fillOpacity={0.15} />
        <Area type="monotone" dataKey="normalMin" stroke="#64748B" strokeDasharray="4 4" fill="#fff" fillOpacity={1} />
        <Area type="monotone" dataKey="anak" stroke="#000" fill="#FEF08A" fillOpacity={0.5} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, stroke: '#000', fill: '#FFF' }} />
    </AreaChart>
);

const ChartTB = () => (
    <AreaChart data={chartDataTB} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="minggu" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <YAxis stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <Tooltip
            contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: '2px solid #000', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            labelStyle={{ fontWeight: '900', color: '#CCF281', marginBottom: '2px' }}
        />
        <Area type="monotone" dataKey="normalMax" stroke="#64748B" strokeDasharray="4 4" fill="#7DD3FC" fillOpacity={0.15} />
        <Area type="monotone" dataKey="normalMin" stroke="#64748B" strokeDasharray="4 4" fill="#fff" fillOpacity={1} />
        <Area type="monotone" dataKey="anak" stroke="#000" fill="#FEF08A" fillOpacity={0.5} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, stroke: '#000', fill: '#FFF' }} />
    </AreaChart>
);

const ChartIMT = () => (
    <AreaChart data={chartDataIMT} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="minggu" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <YAxis stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <Tooltip
            contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: '2px solid #000', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            labelStyle={{ fontWeight: '900', color: '#CCF281', marginBottom: '2px' }}
        />
        <Area type="monotone" dataKey="overweightMax" stroke="#94A3B8" strokeDasharray="4 4" fill="#FCA5A5" fillOpacity={0.2} />
        <Area type="monotone" dataKey="normalMax" stroke="#64748B" strokeDasharray="4 4" fill="#7DD3FC" fillOpacity={0.15} />
        <Area type="monotone" dataKey="normalMin" stroke="#64748B" strokeDasharray="4 4" fill="#fff" fillOpacity={1} />
        <Area type="monotone" dataKey="anak" stroke="#000" fill="#FEF08A" fillOpacity={0.5} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, stroke: '#000', fill: '#FFF' }} />
    </AreaChart>
);

const ChartWHtR = () => (
    <AreaChart data={chartDataWHtR} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="minggu" stroke="#000" fontSize={11} fontWeight={800} tickLine={false} />
        <YAxis stroke="#000" fontSize={11} fontWeight={800} tickLine={false} domain={[0.4, 0.6]} />
        <Tooltip
            contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: '2px solid #000', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            labelStyle={{ fontWeight: '900', color: '#CCF281', marginBottom: '2px' }}
        />
        <ReferenceArea y1={0.5} y2={0.6} fill="#FCA5A5" fillOpacity={0.25} />
        <ReferenceArea y1={0.4} y2={0.5} fill="#38BDF8" fillOpacity={0.15} />
        <Area type="monotone" dataKey="anak" stroke="#000" fill="#CCF281" fillOpacity={0.5} strokeWidth={3} dot={{ r: 4, strokeWidth: 2, stroke: '#000', fill: '#FFF' }} />
    </AreaChart>
);

export default function Monitoring() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeChart, setActiveChart] = useState<ChartTab>('bb');

    const getChartUnit = () => {
        switch (activeChart) {
            case 'bb': return 'kg';
            case 'tb': return 'cm';
            case 'imt': return 'kg/m²';
            case 'whtr': return 'rasio';
            default: return '';
        }
    };

    // ✅ Render chart yang benar berdasarkan tab aktif
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
        <div className="min-h-screen bg-[#FAF9F5] flex w-full font-sans antialiased text-black select-none">
            <Head title="Monitoring Pertumbuhan" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    <div className="max-w-[1240px] mx-auto space-y-6">

                        {/* ---------- PAGE HEADER ---------- */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#CCF281] p-6 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000]">
                            <div className="space-y-2">
                                <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black">
                                    Monitoring & Analitik Pertumbuhan
                                </h1>
                                <div className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-xl border-2 border-black w-fit text-xs md:text-sm font-bold">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                                    </span>
                                    {childProfile.name} <span className="text-black/40">|</span> {childProfile.age}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] self-start sm:self-center">
                                <span className="text-xs font-black uppercase tracking-wide flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 stroke-[2.5]" /> Timeline:
                                </span>
                                <Badge className="bg-[#EAEFF5] text-black border-2 border-black px-3 py-0.5 font-black text-xs rounded-lg">
                                    Minggu 12 / 24
                                </Badge>
                            </div>
                        </div>

                        {/* ---------- ROW 1: QUICK METRICS ---------- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* IMT */}
                            <div className="bg-[#FEF08A] border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
                                <p className="text-xs font-black uppercase tracking-wide mb-1 text-black/60">IMT Saat Ini</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tight">{metrics.imt.value}</span>
                                    <span className="text-xs font-bold text-black/70">kg/m²</span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-3 bg-white border-2 border-black px-2 py-1 rounded-lg text-[11px] font-black w-fit">
                                    <TrendingDown className="w-3.5 h-3.5 text-red-500 stroke-[3]" />
                                    <span>-{(metrics.imt.prev - metrics.imt.value).toFixed(1)} DARI MINGGU LALU</span>
                                </div>
                            </div>

                            {/* WHtR */}
                            <div className="bg-[#7DD3FC] border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
                                <p className="text-xs font-black uppercase tracking-wide mb-1 text-black/60">Rasio WHtR</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tight">{metrics.whtr.value}</span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-3 bg-white border-2 border-black px-2 py-1 rounded-lg text-[11px] font-black w-fit">
                                    {metrics.whtr.value <= metrics.whtr.threshold ? (
                                        <>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 stroke-[3]" />
                                            <span>NORMAL (&le; {metrics.whtr.threshold})</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 stroke-[3]" />
                                            <span>MELEBIHI BATAS!</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Kepatuhan */}
                            <div className="bg-[#FCA5A5] border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all">
                                <p className="text-xs font-black uppercase tracking-wide mb-1 text-black/60">Kepatuhan Rutin</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tight">{metrics.kepatuhan.value}</span>
                                    <span className="text-xs font-bold text-black/70">%</span>
                                </div>
                                <div className="mt-3 space-y-1.5">
                                    <div className="h-3.5 bg-white border-2 border-black rounded-full p-0.5 overflow-hidden">
                                        <div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: `${metrics.kepatuhan.value}%` }} />
                                    </div>
                                    <p className="text-[10px] font-black uppercase flex justify-between text-black/70">
                                        <span>Progres Sesi</span>
                                        <span className="bg-white px-1.5 border border-black rounded text-black">{metrics.kepatuhan.completed}/{metrics.kepatuhan.total}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Status Gizi */}
                            <div className="bg-[#D8B4FE] border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000] transition-all flex flex-col justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-wide mb-1 text-black/60">Status Gizi</p>
                                    <span className="text-3xl font-black uppercase tracking-tight">{metrics.statusGizi.label}</span>
                                </div>
                                <div className="mt-3 bg-white border-2 border-black flex items-center justify-center gap-1.5 py-1 rounded-xl font-black text-xs shadow-[2px_2px_0px_0px_#000] uppercase">
                                    <Award className="w-3.5 h-3.5 stroke-[3] text-purple-700" />
                                    Target Tercapai
                                </div>
                            </div>
                        </div>

                        {/* ---------- ROW 2: ANALYTICS GRID ---------- */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left: Interactive Main Chart */}
                            <div className="lg:col-span-2 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] overflow-hidden flex flex-col">
                                {/* Navigation Tabs */}
                                <div className="flex bg-slate-50 p-1.5 gap-1.5 border-b-2 border-black">
                                    {chartTabs.map(tab => (
                                        <button
                                            key={tab.key}
                                            onClick={() => setActiveChart(tab.key)}
                                            className={`flex-1 py-2 text-xs md:text-sm font-black transition-all rounded-xl border-2 ${
                                                activeChart === tab.key
                                                    ? 'bg-[#CCF281] text-black border-black shadow-[2px_2px_0px_0px_#000]'
                                                    : 'bg-transparent text-black/60 border-transparent hover:text-black hover:bg-slate-200/60'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Chart Area Wrapper */}
                                <div className="p-5 flex-1 flex flex-col bg-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-tight">Kurva Tren Perkembangan</h3>
                                            <p className="text-[11px] font-bold text-black/40">STANDARISASI INDIKATOR WHO</p>
                                        </div>
                                        <span className="text-[10px] font-black px-2 py-0.5 bg-black text-white rounded-md border border-black uppercase">
                                            Unit: {getChartUnit()}
                                        </span>
                                    </div>

                                    <div className="h-[280px] w-full border-2 border-black rounded-xl p-2 bg-[#FAF9F5] overflow-hidden">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {renderChart()}
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Legend Labels */}
                                    <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-black/70 uppercase">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-3.5 h-3.5 bg-[#FEF08A] border border-black rounded"></span>
                                            <span>Kondisi Riil Anak</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-3.5 h-3.5 bg-[#7DD3FC] border border-black rounded-sm opacity-40"></span>
                                            <span>Rentang Standar WHO</span>
                                        </div>
                                        {(activeChart === 'bb' || activeChart === 'imt') && (
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-3.5 h-3.5 bg-[#FCA5A5] border border-black rounded-sm opacity-40"></span>
                                                <span>Ambang Overweight</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Insights and Radar Chart */}
                            <div className="space-y-4 flex flex-col justify-between">
                                {/* Insights Summary */}
                                <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000] flex-1 flex flex-col">
                                    <h3 className="text-sm font-black uppercase mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                                        <Activity className="w-4 h-4 stroke-[2.5]" /> Ringkasan Analisis
                                    </h3>
                                    <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[195px] pr-1">
                                        <div className="flex items-start gap-2.5 bg-[#FCA5A5] p-2.5 rounded-xl border border-black">
                                            <div className="p-1 bg-white border border-black rounded-lg mt-0.5"><TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" /></div>
                                            <div>
                                                <h4 className="text-[11px] font-black uppercase">Tren IMT Menurun Halus</h4>
                                                <p className="text-[10px] font-bold mt-0.5 leading-normal text-black/80">Kepatuhan naik signifikan pada M8-12, memicu penurunan stabil sebesar 0.4 poin.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2.5 bg-[#CCF281] p-2.5 rounded-xl border border-black">
                                            <div className="p-1 bg-white border border-black rounded-lg mt-0.5"><CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" /></div>
                                            <div>
                                                <h4 className="text-[11px] font-black uppercase">Rasio WHtR Sangat Aman</h4>
                                                <p className="text-[10px] font-bold mt-0.5 leading-normal text-black/80">Konsisten berada di bawah garis kritis 0.5 sejak memasuki perhitungan Minggu ke-16.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2.5 bg-[#FEF08A] p-2.5 rounded-xl border border-black">
                                            <div className="p-1 bg-white border border-black rounded-lg mt-0.5"><AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" /></div>
                                            <div>
                                                <h4 className="text-[11px] font-black uppercase">Pertumbuhan Tinggi Melambat</h4>
                                                <p className="text-[10px] font-bold mt-0.5 leading-normal text-black/80">Kurva landai terdeteksi. Disarankan melakukan review asupan Kalsium & Vitamin D3.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Radar Chart Mini */}
                                <div className="bg-white border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_#000]">
                                    <h3 className="text-[11px] font-black uppercase mb-2 text-black/60 tracking-wide">Aspek Tumbuh Kembang</h3>
                                    <div className="h-[140px] w-full flex items-center justify-center border-2 border-black rounded-xl bg-[#FAF9F5] py-1">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                                                <PolarGrid stroke="#CBD5E1" strokeWidth={1} />
                                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fontWeight: 800, fill: '#000' }} />
                                                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                                                <Radar name="Skor" dataKey="value" stroke="#000" fill="#D8B4FE" fillOpacity={0.5} strokeWidth={2.5} dot={{ r: 3.5, fill: '#FFF', stroke: '#000', strokeWidth: 1.5 }} />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1.5 pt-2.5 border-t border-slate-100 mt-2.5 text-[9px] font-bold uppercase">
                                        {radarData.map(item => (
                                            <div key={item.subject} className="flex justify-between items-center bg-[#EAEFF5] px-2 py-0.5 rounded border border-black">
                                                <span className="truncate max-w-[70px] text-black/70">{item.subject}</span>
                                                <span className="bg-black text-white px-1 rounded-sm text-[8px] font-black">{item.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------- ROW 3: COMPLIANCE HEATMAP ---------- */}
                        <div className="bg-white border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_#000]">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-3">
                                <div>
                                    <h3 className="text-sm font-black uppercase">Matriks Kepatuhan Rutinitas Harian</h3>
                                    <p className="text-[11px] font-bold text-black/40">VISUALISASI KONSISTENSI AGENDA PROGRAM PER HARI</p>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3.5 h-3.5 bg-black border border-black rounded" />
                                        <span>Selesai</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3.5 h-3.5 bg-white border-2 border-black rounded" />
                                        <span>Kosong</span>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto pb-1">
                                <div className="inline-flex items-start gap-2.5 p-0.5 min-w-max">
                                    {/* Row Labels (Hari) */}
                                    <div className="flex flex-col gap-1.5 pt-5 font-black text-[9px] w-7 text-left text-black/50">
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
                                                                    ? 'bg-black hover:bg-slate-800'
                                                                    : w + 1 <= 12
                                                                        ? 'bg-white hover:bg-slate-100'
                                                                        : 'bg-slate-100 border-dashed border-slate-300'
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