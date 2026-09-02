import React from 'react';
import { Scale, Ruler, Clock, Activity, TrendingUp } from 'lucide-react';

export interface MetricCardProps {
    title: string;
    value: string | number;
    unit?: string;
    subtext?: string;
    hasBar?: boolean;
    icon?: 'scale' | 'ruler' | 'clock' | 'activity' | 'trending' | React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'pink' | 'blue' | 'lime';
    trendIcon?: React.ReactNode;
}

export default function MetricCard({
    title,
    value,
    unit,
    subtext,
    hasBar,
    icon = 'activity',
    variant = 'primary',
    trendIcon,
}: MetricCardProps) {
    const iconBgs = {
        primary: 'bg-primary text-black',
        pink: 'bg-primary text-black',
        secondary: 'bg-info text-white',
        blue: 'bg-info text-white',
        info: 'bg-info text-white',
        success: 'bg-success text-black',
        lime: 'bg-success text-black',
        warning: 'bg-warning text-black',
        danger: 'bg-danger text-white',
    };

    const currentIconBg = iconBgs[variant] || iconBgs.primary;

    const renderIcon = () => {
        if (React.isValidElement(icon)) return icon;
        switch (icon) {
            case 'scale': return <Scale className="w-5 h-5" strokeWidth={2.5} />;
            case 'ruler': return <Ruler className="w-5 h-5" strokeWidth={2.5} />;
            case 'clock': return <Clock className="w-5 h-5" strokeWidth={2.5} />;
            case 'trending': return <TrendingUp className="w-5 h-5" strokeWidth={2.5} />;
            case 'activity':
            default:
                return <Activity className="w-5 h-5" strokeWidth={2.5} />;
        }
    };

    return (
        <div className="bg-card border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-4 h-full select-none">
            <div className="flex justify-between items-start gap-3">
                <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">{title}</p>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-3xl font-black text-black dark:text-white tracking-tight">{value}</span>
                        {unit && <span className="text-xs font-black text-muted-foreground uppercase">{unit}</span>}
                    </div>
                </div>
                <div className={`w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${currentIconBg}`}>
                    {renderIcon()}
                </div>
            </div>

            {subtext && (
                <div className="pt-3 border-t-2 border-black/10 dark:border-white/10 flex items-center gap-1.5 text-xs font-bold text-muted-foreground leading-tight">
                    {trendIcon}
                    <span className="leading-tight">{subtext}</span>
                </div>
            )}

            {hasBar && (
                <div className="h-3 w-full bg-muted border-2 border-black rounded-full overflow-hidden flex p-0.5">
                    <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
                    <div className="h-full bg-info rounded-full" style={{ width: '40%' }}></div>
                    <div className="h-full bg-warning rounded-full" style={{ width: '20%' }}></div>
                </div>
            )}
        </div>
    );
}
