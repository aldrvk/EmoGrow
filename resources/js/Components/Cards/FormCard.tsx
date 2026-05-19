import React from 'react';

interface FormCardProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export default function FormCard({ title, icon, children, className = '' }: FormCardProps) {
    return (
        <div className={`bg-card rounded-xl border border-border/60 p-6 lg:p-8 shadow-sm ${className}`}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/40">
                {icon && <div className="text-secondary flex-shrink-0">{icon}</div>}
                <h2 className="text-section-title text-netral m-0">{title}</h2>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
