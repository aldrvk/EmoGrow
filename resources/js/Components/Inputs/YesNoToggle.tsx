import React from 'react';

interface YesNoToggleProps {
    value?: 'ya' | 'tidak' | null;
    onChange?: (val: 'ya' | 'tidak') => void;
}

export default function YesNoToggle({ value, onChange }: YesNoToggleProps) {
    return (
        <div className="inline-flex items-center p-1 rounded-lg border border-border/60 bg-secondary/5">
            <button
                type="button"
                onClick={() => onChange?.('ya')}
                className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                    value === 'ya' 
                        ? 'bg-white text-primary shadow-sm border border-border/40' 
                        : 'text-netral hover:bg-white/50 border border-transparent'
                }`}
            >
                Ya
            </button>
            <button
                type="button"
                onClick={() => onChange?.('tidak')}
                className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                    value === 'tidak' 
                        ? 'bg-white text-netral shadow-sm border border-border/40' 
                        : 'text-netral hover:bg-white/50 border border-transparent'
                }`}
            >
                Tidak
            </button>
        </div>
    );
}
