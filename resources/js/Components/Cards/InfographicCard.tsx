import React from 'react';

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
        <div className={`rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col bg-card select-none ${className}`}>
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b-3 border-black bg-card">
                <span className="text-base font-black text-black dark:text-white uppercase tracking-tight">{title}</span>
                {tag && (
                    <div className="px-2.5 py-0.5 bg-primary text-black rounded-lg border-2 border-black font-black text-xs uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        <span>{tag}</span>
                    </div>
                )}
            </div>

            {/* Image Section */}
            <div className="relative w-full bg-sidebar overflow-hidden flex items-center justify-center p-6 md:p-8">
                <img 
                    src={image} 
                    alt={title} 
                    className="max-w-full h-auto max-h-[300px] object-cover rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" 
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80';
                    }}
                />
            </div>

            {/* Optional Caption */}
            {caption && (
                <div className="px-6 py-4 border-t-3 border-black bg-card">
                    <p className="text-xs md:text-sm text-black dark:text-white text-center leading-relaxed font-bold">
                        {caption}
                    </p>
                </div>
            )}

            {/* Optional Stats Grid */}
            {stats && stats.length > 0 && (
                <div className={`grid grid-cols-1 sm:grid-cols-${stats.length} border-t-3 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black bg-card`}>
                    {stats.map((stat, idx) => (
                        <div 
                            key={idx} 
                            className="px-4 py-5 flex flex-col items-center justify-center text-center"
                        >
                            <span className={`text-2xl font-black ${stat.colorClass || 'text-black dark:text-white'} mb-0.5`}>
                                {stat.value}
                            </span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-extrabold">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
