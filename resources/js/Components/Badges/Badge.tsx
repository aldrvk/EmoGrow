import React from 'react';

interface BadgeProps {
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'netral';
    children: React.ReactNode;
    className?: string;
}

export default function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
    const variants = {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        warning: "bg-[#FEF3C7] text-[#D97706]",
        danger: "bg-red-100 text-red-500",
        netral: "bg-netral/10 text-netral",
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-text ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
