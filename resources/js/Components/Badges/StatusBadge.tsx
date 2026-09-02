import React from 'react';
import Badge from './Badge';

interface StatusBadgeProps {
    status: string;
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'info' | 'netral';
    className?: string;
}

export default function StatusBadge({ status, variant = 'warning', className = '' }: StatusBadgeProps) {
    const dotColors = {
        primary: "bg-black",
        secondary: "bg-black",
        success: "bg-black",
        warning: "bg-black",
        danger: "bg-white",
        info: "bg-white",
        netral: "bg-black"
    };

    return (
        <Badge variant={variant} className={className}>
            <span className={`w-2 h-2 rounded-full ${dotColors[variant]} mr-1.5 shrink-0 animate-pulse border border-black/30`}></span>
            <span>{status}</span>
        </Badge>
    );
}
