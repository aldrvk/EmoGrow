import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function TextInput({ label, className = '', ...props }: TextInputProps) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-label-text text-netral font-semibold">{label}</label>
            <input
                className="h-[46px] px-4 rounded-lg border border-secondary/20 bg-secondary/10 text-netral focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder:text-netral/50"
                {...props}
            />
        </div>
    );
}
