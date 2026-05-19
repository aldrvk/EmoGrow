import React from 'react';
import Badge from '../Badges/Badge';

export interface InfographicStat {
    value: string | number;
    label: string;
    colorClass?: string;
}

export interface InfographicCardProps {
    title: string;
    tag?: string;
    image: string;
    caption?: string;
    stats?: InfographicStat[];
    className?: string;
}

export default function InfographicCard({
    title,
    tag,
    image,
    caption,
    stats,
    className = ''
}: InfographicCardProps) {
    return (
        <div className={`rounded-2xl border border-border/60 shadow-sm overflow-hidden flex flex-col bg-card ${className}`}>
            {/* Header */}
            <div className="px-6 py-5 flex justify-between items-center border-b border-border/40">
                <span className="text-body-bold text-netral">{title}</span>
                {tag && (
                    <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                        <span className="text-small-text font-bold text-primary">{tag}</span>
                    </div>
                )}
            </div>

            {/* Image Section */}
            <div className="relative w-full bg-muted overflow-hidden flex items-center justify-center p-8">
                <img 
                    src={image} 
                    alt={title} 
                    className="max-w-full h-auto max-h-[300px] object-cover rounded-2xl shadow-sm" 
                />
            </div>

            {/* Optional Caption */}
            {caption && (
                <div className="px-8 py-5 border-t border-border/40">
                    <p className="text-body-thin text-netral/80 text-center leading-relaxed">
                        {caption}
                    </p>
                </div>
            )}

            {/* Optional Stats Grid */}
            {stats && stats.length > 0 && (
                <div className={`grid grid-cols-${stats.length} border-t border-border/40`}>
                    {stats.map((stat, idx) => (
                        <div 
                            key={idx} 
                            className={`px-4 py-6 flex flex-col items-center justify-center text-center ${idx !== stats.length - 1 ? 'border-r border-border/40' : ''}`}
                        >
                            <span className={`text-[24px] font-bold ${stat.colorClass || 'text-netral'} mb-1`}>
                                {stat.value}
                            </span>
                            <span className="text-small-text text-netral/60 uppercase tracking-widest font-bold">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
