import React from 'react';

export interface YesNoToggleProps {
    value?: 'ya' | 'tidak' | null;
    onChange?: (val: 'ya' | 'tidak') => void;
    disabled?: boolean;
}

export default function YesNoToggle({ value, onChange, disabled = false }: YesNoToggleProps) {
    return (
        <div className="inline-flex items-center p-1 rounded-xl border-2 border-black bg-card shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 gap-1 select-none">
            <button
                type="button"
                disabled={disabled}
                onClick={() => onChange?.('ya')}
                className={`px-4 py-1.5 text-xs font-black uppercase rounded-lg border-2 transition-all cursor-pointer ${
                    value === 'ya' 
                        ? 'bg-success text-black border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' 
                        : 'border-transparent text-muted-foreground hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                }`}
            >
                Ya
            </button>
            <button
                type="button"
                disabled={disabled}
                onClick={() => onChange?.('tidak')}
                className={`px-4 py-1.5 text-xs font-black uppercase rounded-lg border-2 transition-all cursor-pointer ${
                    value === 'tidak' 
                        ? 'bg-danger text-white border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' 
                        : 'border-transparent text-muted-foreground hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                }`}
            >
                Tidak
            </button>
        </div>
    );
}
