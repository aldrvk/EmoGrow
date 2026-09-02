import React from 'react';

export interface PatientCardProps {
    name: string;
    age: string;
    status: string;
    img: string;
    progressPercent?: number;
    isActive?: boolean;
    onClick?: () => void;
}

export default function PatientCard({
    name,
    age,
    status,
    img,
    progressPercent = 50,
    isActive = false,
    onClick
}: PatientCardProps) {
    const getStatusBadgeStyle = (s: string) => {
        if (s === 'Normal') return 'bg-success text-black';
        if (s === 'Kurus') return 'bg-info text-white';
        if (s === 'Beresiko Gizi Lebih') return 'bg-warning text-black';
        return 'bg-danger text-white';
    };

    return (
        <div
            onClick={onClick}
            className={`w-full bg-card border-3 border-black rounded-2xl p-5 
                flex flex-col md:flex-row justify-between items-center gap-6 select-none transition-all duration-150 cursor-pointer
                ${isActive 
                    ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-card-subtle translate-x-[-2px] translate-y-[-2px]' 
                    : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                }`}
        >
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-16 h-16 min-w-[64px] border-3 border-black rounded-xl bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden shrink-0">
                    <img 
                        src={img} 
                        alt={name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f472b6&color=000`;
                        }}
                    />
                </div>
                <div className="space-y-1.5 min-w-0">
                    <h2 className="text-xl font-black uppercase tracking-tight text-black dark:text-white leading-tight truncate">{name}</h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-info text-white border-2 border-black px-2.5 py-0.5 text-xs font-black uppercase tracking-wide rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                            {age}
                        </span>
                        <span className={`border-2 border-black px-2.5 py-0.5 text-xs font-black uppercase tracking-wide rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] ${getStatusBadgeStyle(status)}`}>
                            {status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-72 bg-card-subtle border-3 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2 shrink-0">
                <div className="flex justify-between items-end">
                    <p className="text-xs font-black uppercase tracking-wider text-black dark:text-white">Progres Intervensi</p>
                    <span className="text-xs font-black uppercase text-primary">{progressPercent}% Selesai</span>
                </div>
                <div className="w-full bg-muted border-2 border-black h-4 rounded-full overflow-hidden p-0.5">
                    <div 
                        className="bg-primary h-full rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercent}%` }} 
                    />
                </div>
            </div>
        </div>
    );
}
