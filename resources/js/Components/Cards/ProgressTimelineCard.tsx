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
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-border h-full">
            <h3 className="text-netral mb-1">Progress Intervensi</h3>
            <p className="text-body-thin text-netral mb-8">Minggu ke-12 dari 24</p>
            
            <div className="relative border-l-2 border-netral/20 ml-3 pl-8 space-y-8 mt-4">
                {timeline.map((item, idx) => (
                    <div key={idx} className="relative">
                        <div className={`absolute -left-[43px] w-6 h-6 rounded-full flex items-center justify-center bg-white ${
                            item.status === 'completed' ? 'border-none' : 
                            item.status === 'current' ? 'border-2 border-primary' : 'border-none'
                        }`}>
                            {item.status === 'completed' && (
                                <div className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center">
                                    <Check className="w-3 h-3" strokeWidth={3} />
                                </div>
                            )}
                            {item.status === 'current' && (
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                            )}
                            {item.status === 'upcoming' && (
                                <div className="w-4 h-4 rounded-full bg-netral/60"></div>
                            )}
                        </div>
                        
                        <div>
                            <div className={`text-body-bold ${item.status === 'current' ? 'text-primary' : 'text-netral'}`}>
                                {item.title}
                            </div>
                            <p className={`text-body-thin ${item.status === 'current' ? 'text-primary/80' : 'text-netral/70'} mt-1`}>
                                {item.desc}
                            </p>
                            
                            {item.status === 'current' && item.progress && (
                                <div className="mt-3">
                                    <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden mb-1">
                                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${item.progress}%` }}></div>
                                    </div>
                                    <p className="text-small-text text-primary">{item.progress}% Selesai</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
