import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'secondary-outline' | 'ghost' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: React.ReactNode;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    disabled,
    children,
    ...props
}: ButtonProps) {
    const baseClass = "inline-flex items-center justify-center font-black uppercase tracking-wider rounded-xl border-2 border-black transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none select-none";
    
    const variants = {
        primary: "bg-primary text-black hover:bg-primary/95",
        secondary: "bg-secondary text-black hover:bg-secondary/95",
        outline: "bg-card text-foreground hover:bg-card-subtle",
        'secondary-outline': "bg-secondary/15 text-foreground hover:bg-secondary/25",
        ghost: "border-transparent shadow-none hover:bg-card-subtle hover:border-black/20 text-foreground hover:shadow-none hover:translate-x-0 hover:translate-y-0",
        danger: "bg-danger text-white hover:bg-danger/90",
        success: "bg-success text-black hover:bg-success/90",
    };

    const sizes = {
        sm: "h-9 px-3.5 text-xs gap-1.5",
        md: "h-11 px-5 text-sm gap-2",
        lg: "h-12 px-7 text-base gap-2.5",
    };

    return (
        <button
            className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin w-4 h-4 text-current shrink-0 mr-1.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
            )}
            {children}
        </button>
    );
}
