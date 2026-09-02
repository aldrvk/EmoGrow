import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
    message: string;
    type?: 'success' | 'warning' | 'info' | 'error';
    isOpen: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Toast({
    message,
    type = 'info',
    isOpen,
    onClose,
    duration = 4000
}: ToastProps) {
    useEffect(() => {
        if (isOpen && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    const typeStyles = {
        success: 'bg-success text-black',
        warning: 'bg-warning text-black',
        error: 'bg-danger text-white',
        info: 'bg-info text-white',
    };

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-black shrink-0" strokeWidth={2.5} />,
        warning: <AlertCircle className="w-5 h-5 text-black shrink-0" strokeWidth={2.5} />,
        error: <AlertCircle className="w-5 h-5 text-white shrink-0" strokeWidth={2.5} />,
        info: <Info className="w-5 h-5 text-white shrink-0" strokeWidth={2.5} />,
    };

    return (
        <div className="fixed top-6 right-6 z-[300] max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-200 select-none">
            <div className={`flex items-start gap-3 p-4 rounded-xl border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${typeStyles[type]}`}>
                {icons[type]}
                <div className="flex-1 text-xs md:text-sm font-black uppercase tracking-wide leading-relaxed">
                    {message}
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded-lg border-2 border-black bg-white text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer shrink-0"
                    aria-label="Tutup notifikasi"
                >
                    <X className="w-3.5 h-3.5" strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}
