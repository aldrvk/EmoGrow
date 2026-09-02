import React from 'react';
import { Check } from 'lucide-react';

export default function ProgressTimelineCard() {
    const timeline = [
        { title: 'Minggu 1-4', desc: 'Observasi & Edukasi Dasar', status: 'completed' },
        { title: 'Minggu 5-8', desc: 'Peningkatan Rutinitas', status: 'completed' },
        { title: 'Minggu 9-12', desc: 'Stimulasi Responsif', status: 'current', progress: 75 },
        { title: 'Minggu 13-24', desc: 'Pemantapan & Evaluasi', status: 'upcoming' },
    ];

    return (
        <div className="bg-card rounded-[2rem] p-6 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] h-full select-none">
            {/* Header Card */}
            <div className="border-b-2 border-black pb-4 mb-6">
                <h3 className="text-base font-black uppercase tracking-tight text-black dark:text-white">
                    Progress Intervensi
                </h3>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mt-1">
                    Minggu ke-12 dari 24
                </p>
            </div>
            
            {/* Timeline Container */}
            <div className="relative border-l-3 border-black ml-4 pl-8 space-y-8 my-4">
                {timeline.map((item, idx) => (
                    <div key={idx} className="relative">
                        
                        {/* Timeline Indicator Node */}
                        <div className="absolute -left-[45px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center bg-card border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
                            {item.status === 'completed' && (
                                <div className="w-full h-full rounded-full bg-success flex items-center justify-center">
                                    <Check className="w-3.5 h-3.5 text-black" strokeWidth={3.5} />
                                </div>
                            )}
                            {item.status === 'current' && (
                                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                            )}
                            {item.status === 'upcoming' && (
                                <div className="w-3 h-3 rounded-full bg-black/20 dark:bg-white/20"></div>
                            )}
                        </div>
                        
                        {/* Content Card Node */}
                        <div className={`p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform ${
                            item.status === 'current' 
                                ? 'bg-card-subtle translate-x-[-2px] translate-y-[-2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                                : item.status === 'completed'
                                ? 'bg-card/50'
                                : 'bg-muted/30 opacity-60 shadow-none border-dashed'
                        }`}>
                            <div className={`text-xs uppercase tracking-wide font-black ${
                                item.status === 'current' ? 'text-primary' : 'text-black dark:text-white'
                            }`}>
                                {item.title}
                            </div>
                            <p className="text-xs font-extrabold text-muted-foreground mt-1 uppercase tracking-tight">
                                {item.desc}
                            </p>
                            
                            {/* Progress Bar (Hanya untuk item berstatus 'current') */}
                            {item.status === 'current' && item.progress && (
                                <div className="mt-4 pt-3 border-t-2 border-black/5">
                                    <div className="h-4 w-full bg-muted border-2 border-black rounded-lg overflow-hidden relative">
                                        <div 
                                            className="h-full bg-success border-r-2 border-black transition-all duration-500" 
                                            style={{ width: `${item.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-wider text-black dark:text-white mt-1.5 text-right">
                                        {item.progress}% Selesai
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}