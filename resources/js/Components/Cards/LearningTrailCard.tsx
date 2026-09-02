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
        <div className={`bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 md:p-7 select-none ${className}`}>
            <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white mb-6 pb-4 border-b-3 border-black flex items-center justify-between">
                <span>{title}</span>
            </h3>
            
            <div className="relative">
                {/* Continuous Vertical Line */}
                <div className="absolute left-[13px] top-[14px] bottom-[14px] w-1 bg-black"></div>
                
                <div className="space-y-6 relative z-10">
                    {modules.map((mod) => {
                        const isCompleted = mod.status === 'completed';
                        const isCurrent = mod.status === 'current';
                        const isLocked = mod.status === 'locked';

                        return (
                            <div key={mod.id} className={`relative ${isCurrent ? '' : 'pl-11'}`}>
                                {isCompleted && (
                                    <>
                                        <div className="absolute left-0 top-0.5 w-7 h-7 rounded-xl bg-success border-2 border-black flex items-center justify-center z-10 text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                            <Check className="w-4 h-4 stroke-[3]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-0.5">{mod.subtitle}</p>
                                            <p className="text-sm font-black text-black dark:text-white uppercase tracking-tight">{mod.title}</p>
                                        </div>
                                    </>
                                )}

                                {isCurrent && (
                                    <div className="ml-0 bg-card-subtle border-3 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative z-0 flex items-start gap-3.5">
                                        <div className="w-7 h-7 rounded-xl bg-primary border-2 border-black text-black z-10 flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] shrink-0 mt-0.5">
                                            <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-wider text-primary mb-0.5">{mod.subtitle}</p>
                                            <p className="text-sm font-black text-black dark:text-white uppercase tracking-tight">{mod.title}</p>
                                        </div>
                                    </div>
                                )}

                                {isLocked && (
                                    <>
                                        <div className="absolute left-0 top-0.5 w-7 h-7 rounded-xl bg-muted border-2 border-black/40 flex items-center justify-center z-10 text-muted-foreground/60">
                                            <Lock className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="opacity-50">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{mod.subtitle}</p>
                                            <p className="text-sm font-bold text-black dark:text-white uppercase tracking-tight">{mod.title}</p>
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
