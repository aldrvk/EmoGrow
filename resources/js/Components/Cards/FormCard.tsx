import React from 'react';

export interface FormCardProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export default function FormCard({ title, subtitle, icon, children, className = '' }: FormCardProps) {
    return (
        <div className={`bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 md:p-7 select-none ${className}`}>
            <div className="flex items-center gap-3 mb-6 pb-5 border-b-3 border-black">
                {icon && (
                    <div className="w-10 h-10 rounded-xl bg-success text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {icon}
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-black text-black dark:text-white uppercase tracking-tight">{title}</h2>
                    {subtitle && <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-0.5">{subtitle}</p>}
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
