import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Badge from '../Components/Badges/Badge';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
    ReferenceArea
} from 'recharts';
import { TrendingDown, TrendingUp, Activity, AlertTriangle, CheckCircle2, Heart, Brain, Eye } from 'lucide-react';

// ---------- DUMMY DATA ----------

const childProfile = {
    name: 'Aira Putri Mahesa',
    age: '24 bulan',
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

// Heatmap: 24 weeks, each week has 7 days
const generateHeatmapData = () => {
    const data: { week: number; day: number; done: boolean }[] = [];
    for (let w = 1; w <= 24; w++) {
        for (let d = 0; d < 7; d++) {
            const done = w <= 12 ? Math.random() > 0.25 : false;
            data.push({ week: w, day: d, done });
        }
    }
    return data;
};
const heatmapData = generateHeatmapData();

const chartTabs = [
    { key: 'bb', label: 'Berat Badan' },
    { key: 'tb', label: 'Tinggi Badan' },
    { key: 'imt', label: 'IMT' },
    { key: 'whtr', label: 'WHtR' },
] as const;

type ChartTab = typeof chartTabs[number]['key'];

// ---------- COMPONENT ----------

export default function Monitoring() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeChart, setActiveChart] = useState<ChartTab>('bb');

    const getChartData = () => {
        switch (activeChart) {
            case 'bb': return chartDataBB;
            case 'tb': return chartDataTB;
            case 'imt': return chartDataIMT;
            case 'whtr': return chartDataWHtR;
        }
    };

    const getChartUnit = () => {
        switch (activeChart) {
            case 'bb': return 'kg';
            case 'tb': return 'cm';
            case 'imt': return 'kg/m²';
            case 'whtr': return 'rasio';
        }
    };

    return (
        <div className="min-h-screen bg-background flex w-full">
            <Head title="Monitoring Pertumbuhan" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto">

                        {/* Page Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h1 className="text-netral leading-tight">Monitoring Pertumbuhan</h1>
                                    <h4 className="text-secondary">{childProfile.name} &bull; {childProfile.age}</h4>
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-secondary text-primary-foreground px-4 py-1.5">
                                Minggu 12 / 24
                            </Badge>
                        </div>

                        {/* Row 1: Quick Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {/* IMT */}
                            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                <p className="text-label-text text-netral/60 uppercase tracking-wider mb-2">IMT Saat Ini</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-[36px] font-bold text-netral leading-none">{metrics.imt.value}</span>
                                    <span className="text-body-thin text-netral/60 mb-1">kg/m²</span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-3">
                                    <TrendingDown className="w-4 h-4 text-primary" />
                                    <span className="text-small-text text-primary">
                                        -{(metrics.imt.prev - metrics.imt.value).toFixed(1)} dari minggu lalu
                                    </span>
                                </div>
                            </div>

                            {/* WHtR */}
                            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                <p className="text-label-text text-netral/60 uppercase tracking-wider mb-2">WHtR</p>
                                <div className="flex items-end gap-2">
                                    <span className={`text-[36px] font-bold leading-none ${
                                        metrics.whtr.value > metrics.whtr.threshold ? 'text-primary' : 'text-netral'
                                    }`}>
                                        {metrics.whtr.value}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-3">
                                    {metrics.whtr.value <= metrics.whtr.threshold ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4 text-secondary" />
                                            <span className="text-small-text text-secondary">Di bawah ambang batas (0.5)</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertTriangle className="w-4 h-4 text-primary" />
                                            <span className="text-small-text text-primary">Di atas ambang batas!</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Kepatuhan */}
                            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                <p className="text-label-text text-netral/60 uppercase tracking-wider mb-2">Tingkat Kepatuhan</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-[36px] font-bold text-netral leading-none">{metrics.kepatuhan.value}</span>
                                    <span className="text-body-thin text-netral/60 mb-1">%</span>
                                </div>
                                <div className="mt-3">
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${metrics.kepatuhan.value}%` }} />
                                    </div>
                                    <p className="text-small-text text-netral/50 mt-1.5">{metrics.kepatuhan.completed}/{metrics.kepatuhan.total} sesi selesai</p>
                                </div>
                            </div>

                            {/* Status Gizi */}
                            <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                <p className="text-label-text text-netral/60 uppercase tracking-wider mb-2">Status Gizi</p>
                                <div className="flex items-end gap-2 mb-3">
                                    <span className="text-[36px] font-bold text-netral leading-none">{metrics.statusGizi.label}</span>
                                </div>
                                <Badge variant={metrics.statusGizi.variant} className="bg-secondary text-primary-foreground px-3 py-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                                    Target Tercapai
                                </Badge>
                            </div>
                        </div>

                        {/* Row 2: Analytics */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* Left: Interactive Chart (col-span-2) */}
                            <div className="lg:col-span-2 bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                                {/* Chart Tabs */}
                                <div className="flex border-b border-border/40">
                                    {chartTabs.map(tab => (
                                        <button
                                            key={tab.key}
                                            onClick={() => setActiveChart(tab.key)}
                                            className={`flex-1 py-4 text-center text-body-bold transition-colors border-b-2 ${
                                                activeChart === tab.key
                                                    ? 'border-primary text-primary bg-card'
                                                    : 'border-transparent text-netral/60 hover:text-netral hover:bg-muted/30'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Chart Area */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-netral">
                                            Tren {chartTabs.find(t => t.key === activeChart)?.label}
                                        </h4>
                                        <span className="text-small-text text-netral/50">Satuan: {getChartUnit()}</span>
                                    </div>

                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {activeChart === 'whtr' ? (
                                                <AreaChart data={getChartData() as any}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.3} />
                                                    <XAxis dataKey="minggu" stroke="var(--color-netral)" fontSize={12} tickLine={false} />
                                                    <YAxis stroke="var(--color-netral)" fontSize={12} tickLine={false} domain={[0.4, 0.6]} />
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
                                                    />
                                                    <ReferenceArea y1={0.5} y2={0.6} fill="#f472b6" fillOpacity={0.08} />
                                                    <ReferenceArea y1={0.4} y2={0.5} fill="#60a5fa" fillOpacity={0.08} />
                                                    <Line type="monotone" dataKey="threshold" stroke="var(--color-primary)" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
                                                    <Area type="monotone" dataKey="anak" stroke="var(--color-secondary)" fill="var(--color-secondary)" fillOpacity={0.15} strokeWidth={2.5} dot={{ r: 4, fill: 'var(--color-secondary)' }} />
                                                </AreaChart>
                                            ) : (
                                                <AreaChart data={getChartData() as any}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.3} />
                                                    <XAxis dataKey="minggu" stroke="var(--color-netral)" fontSize={12} tickLine={false} />
                                                    <YAxis stroke="var(--color-netral)" fontSize={12} tickLine={false} />
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
                                                    />
                                                    {/* WHO Normal Band */}
                                                    <Area type="monotone" dataKey="normalMax" stroke="none" fill="#60a5fa" fillOpacity={0.08} />
                                                    <Area type="monotone" dataKey="normalMin" stroke="none" fill="var(--color-card)" fillOpacity={1} />
                                                    {/* Overweight Band (if exists) */}
                                                    {'overweightMax' in ((getChartData() as any)?.[0] || {}) && (
                                                        <>
                                                            <Area type="monotone" dataKey="overweightMax" stroke="none" fill="#f472b6" fillOpacity={0.06} />
                                                        </>
                                                    )}
                                                    {/* Child Line */}
                                                    <Line type="monotone" dataKey="anak" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--color-primary)', stroke: 'var(--color-card)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                                </AreaChart>
                                            )}
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Legend */}
                                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/40">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-primary" />
                                            <span className="text-small-text text-netral/60">Data Anak</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-sm bg-secondary/20" />
                                            <span className="text-small-text text-netral/60">Zona Normal WHO</span>
                                        </div>
                                        {(activeChart === 'bb' || activeChart === 'imt') && (
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-sm bg-primary/15" />
                                                <span className="text-small-text text-netral/60">Zona Overweight</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Insight + Radar */}
                            <div className="flex flex-col gap-6">
                                {/* Insight Engine Box */}
                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                    <h4 className="text-netral mb-5">Ringkasan Insight</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <TrendingDown className="w-3.5 h-3.5 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="text-body-bold text-netral mb-0.5">IMT Menurun</p>
                                                <p className="text-small-text text-netral/60 leading-relaxed">Kepatuhan naik 20% di M8-12, IMT turun 0.4 poin.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="text-body-bold text-netral mb-0.5">WHtR Normal</p>
                                                <p className="text-small-text text-netral/60 leading-relaxed">Di bawah ambang 0.5 sejak Minggu 16.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <AlertTriangle className="w-3.5 h-3.5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-body-bold text-netral mb-0.5">Tinggi Badan Melambat</p>
                                                <p className="text-small-text text-netral/60 leading-relaxed">Evaluasi asupan kalsium dan vitamin D.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Radar Chart */}
                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6">
                                    <h4 className="text-netral mb-4">Radar Perkembangan</h4>
                                    <div className="h-[250px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                                <PolarGrid stroke="var(--color-border)" strokeOpacity={0.4} />
                                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'var(--color-netral)' }} />
                                                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                                                <Radar name="Perkembangan" dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.15} strokeWidth={2} dot={{ r: 3, fill: 'var(--color-primary)' }} />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {radarData.map(item => (
                                            <div key={item.subject} className="flex items-center gap-1.5 text-small-text text-netral/60">
                                                <span className="font-bold text-primary">{item.value}%</span>
                                                {item.subject}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 3: Compliance Heatmap */}
                        <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-netral">Kalender Kepatuhan Aktivitas</h4>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-sm bg-secondary" />
                                        <span className="text-small-text text-netral/60">Selesai</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-sm bg-background border border-border/60" />
                                        <span className="text-small-text text-netral/60">Kosong</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <div className="inline-flex flex-col gap-1 min-w-fit">
                                    {/* Day labels */}
                                    <div className="flex gap-1 mb-1">
                                        <div className="w-8 shrink-0" /> {/* Spacer for week labels */}
                                        {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((d, i) => (
                                            <div key={i} className="w-4 h-4 flex items-center justify-center text-[9px] text-netral/40">{d}</div>
                                        ))}
                                    </div>
                                    {/* Week rows */}
                                    {Array.from({ length: 24 }, (_, w) => (
                                        <div key={w} className="flex items-center gap-1">
                                            <span className="w-8 text-[9px] text-netral/40 text-right pr-1 shrink-0">
                                                {(w + 1) % 4 === 1 ? `M${w + 1}` : ''}
                                            </span>
                                            {Array.from({ length: 7 }, (_, d) => {
                                                const cell = heatmapData.find(c => c.week === w + 1 && c.day === d);
                                                return (
                                                    <div
                                                        key={d}
                                                        className={`w-4 h-4 rounded-sm transition-colors ${
                                                            cell?.done
                                                                ? 'bg-secondary'
                                                                : w + 1 <= 12
                                                                    ? 'bg-background border border-border/60'
                                                                    : 'bg-muted/30'
                                                        }`}
                                                        title={`Minggu ${w + 1}, Hari ${d + 1}: ${cell?.done ? 'Selesai' : 'Kosong'}`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
