import React from 'react';
import { Scale, Ruler, Clock } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    unit?: string;
    subtext?: string;
    hasBar?: boolean;
    icon: 'scale' | 'ruler' | 'clock';
    variant: 'primary' | 'secondary';
}

export default function MetricCard({ title, value, unit, subtext, hasBar, icon, variant }: MetricCardProps) {
    const isPrimary = variant === 'primary';
    
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border flex items-center gap-5 h-full">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-1 ${isPrimary ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                {icon === 'scale' && <Scale className="w-6 h-6" />}
                {icon === 'ruler' && <Ruler className="w-6 h-6" />}
                {icon === 'clock' && <Clock className="w-6 h-6" />}
            </div>
            
            <div className="flex-1">
                <div className="text-label-text text-netral mb-1 uppercase font-bold">{title}</div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold text-netral tracking-tight">{value}</span>
                    {unit && <span className="text-body-thin text-netral">{unit}</span>}
                </div>
                
                {subtext && (
                    <p className={`text-small-text mt-1 ${isPrimary ? 'text-primary' : 'text-secondary'}`}>
                        {subtext}
                    </p>
                )}
                
                {hasBar && (
                    <div className="h-1.5 w-full bg-netral/20 rounded-full mt-3 overflow-hidden flex">
                        <div className="h-full bg-primary" style={{ width: '30%' }}></div>
                        <div className="h-full bg-secondary" style={{ width: '40%' }}></div>
                        <div className="h-full bg-[#D97706]" style={{ width: '15%' }}></div>
                    </div>
                )}
            </div>
        </div>
    );
}
