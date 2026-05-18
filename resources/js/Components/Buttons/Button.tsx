import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'secondary-outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
    const baseClass = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
        outline: "border border-border text-netral hover:bg-accent",
        'secondary-outline': "border border-secondary text-secondary hover:bg-secondary/10",
        ghost: "hover:bg-accent hover:text-accent-foreground"
    };

    const sizes = {
        sm: "h-8 px-3 text-small-text",
        md: "h-10 px-4 py-2 text-cta-text",
        lg: "h-12 px-8 text-cta-text-bold"
    };

    return (
        <button className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
}
