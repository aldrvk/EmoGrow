import React from 'react';

export interface BadgeProps {
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'info' | 'netral';
    children: React.ReactNode;
    className?: string;
}

export default function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
    const variants = {
        primary: "bg-primary text-black",
        secondary: "bg-secondary text-black",
        success: "bg-success text-black",
        warning: "bg-warning text-black",
        danger: "bg-danger text-white",
        info: "bg-info text-white",
        netral: "bg-card text-foreground",
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg border-2 border-black text-xs font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] select-none ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
