import React from 'react';
import { Check, Lock, Play } from 'lucide-react';

export interface TrailModule {
    id: string | number;
    subtitle: string;
    title: string;
    status: 'completed' | 'current' | 'locked';
}

interface LearningTrailCardProps {
    title?: string;
    modules: TrailModule[];
    className?: string;
}

export default function LearningTrailCard({ 
    title = "Jejak Pembelajaran", 
    modules, 
    className = "" 
}: LearningTrailCardProps) {
    return (
        <div className={`bg-white rounded-2xl border border-border/60 shadow-sm p-8 relative overflow-hidden ${className}`}>
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
            <h3 className="text-section-title text-primary mb-8 mt-2">{title}</h3>
            
            <div className="relative">
                {/* Continuous Vertical Line */}
                <div className="absolute left-[11px] top-[14px] bottom-[14px] w-0.5 bg-[#CBD5E1]"></div>
                
                <div className="space-y-8 relative z-10">
                    {modules.map((mod, index) => {
                        const isCompleted = mod.status === 'completed';
                        const isCurrent = mod.status === 'current';
                        const isLocked = mod.status === 'locked';

                        return (
                            <div key={mod.id} className={`relative ${isCurrent ? '' : 'pl-10'}`}>
                                {isCompleted && (
                                    <>
                                        <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-secondary flex items-center justify-center z-10 ring-[6px] ring-white">
                                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-medium text-[#94A3B8] mb-0.5">{mod.subtitle}</p>
                                            <p className="text-[16px] font-medium text-[#334155]">{mod.title}</p>
                                        </div>
                                    </>
                                )}

                                {isCurrent && (
                                    <>
                                        <div className="ml-[12px] bg-primary/5 border border-primary/20 rounded-[16px] py-3.5 pl-[28px] pr-4 relative z-0">
                                            <div className="absolute -left-[12px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] rounded-full bg-white border-[2px] border-primary z-10 ring-[6px] ring-white flex items-center justify-center">
                                                <Play className="w-2.5 h-2.5 text-primary fill-primary ml-0.5" />
                                            </div>
                                            <p className="text-[13px] font-medium text-primary mb-0.5">{mod.subtitle}</p>
                                            <p className="text-[16px] font-medium text-secondary">{mod.title}</p>
                                        </div>
                                    </>
                                )}

                                {isLocked && (
                                    <>
                                        <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-white border-[1.5px] border-[#CBD5E1] flex items-center justify-center z-10 ring-[6px] ring-white">
                                            <Lock className="w-3.5 h-3.5 text-[#CBD5E1]" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-medium text-[#CBD5E1] mb-0.5">{mod.subtitle}</p>
                                            <p className="text-[16px] font-medium text-[#94A3B8]">{mod.title}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
