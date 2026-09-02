import React from 'react';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
}

export default function TextInput({
    label,
    error,
    helperText,
    leftIcon,
    className = '',
    id,
    ...props
}: TextInputProps) {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label htmlFor={inputId} className="text-xs font-black uppercase tracking-wider text-foreground pl-1 select-none">
                {label}
            </label>
            <div className="relative flex items-center">
                {leftIcon && (
                    <div className="absolute left-3.5 text-muted-foreground pointer-events-none">
                        {leftIcon}
                    </div>
                )}
                <input
                    id={inputId}
                    className={`w-full h-11 px-4 ${leftIcon ? 'pl-10' : ''} bg-sidebar border-2 border-black text-foreground font-bold text-sm rounded-xl outline-none placeholder:text-muted-foreground/60 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:bg-card focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all ${
                        error ? 'border-danger bg-red-50 dark:bg-red-950/40' : ''
                    }`}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-danger font-black uppercase tracking-wide pl-1">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-tight pl-1">{helperText}</p>
            )}
        </div>
    );
}
