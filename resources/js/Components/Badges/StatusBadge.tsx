import React from 'react';
import Badge from './Badge';

interface StatusBadgeProps {
    status: string;
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'netral';
    className?: string;
}

export default function StatusBadge({ status, variant = 'warning', className = '' }: StatusBadgeProps) {
    const dotColors = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        warning: "bg-[#D97706]",
        danger: "bg-red-600",
        netral: "bg-netral"
    };

    return (
        <Badge variant={variant} className={`shadow-sm ${className}`}>
            <span className={`w-2 h-2 rounded-full ${dotColors[variant]} mr-2`}></span>
            Status: {status}
        </Badge>
    );
}
