import React, { useState } from 'react';
import { FileText, X, Heart, Smile, Meh, Frown, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../Buttons/Button';

interface JournalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (notes: string, mood: string) => void;
}

const moods = [
    { id: 'senang', label: 'Senang', emoji: '😊', bg: 'bg-success' },
    { id: 'tenang', label: 'Tenang', emoji: '😌', bg: 'bg-info' },
    { id: 'bersemangat', label: 'Semangat', emoji: '🥳', bg: 'bg-primary' },
    { id: 'lelah', label: 'Lelah', emoji: '🥱', bg: 'bg-warning' },
    { id: 'cemas', label: 'Cemas', emoji: '😟', bg: 'bg-danger' },
];

export default function JournalModal({
    isOpen,
    onClose,
    onSave,
}: JournalModalProps) {
    const [selectedMood, setSelectedMood] = useState('senang');
    const [notes, setNotes] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(notes, selectedMood);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200 select-none">
            <div
                className="bg-card rounded-2xl w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-3 border-black overflow-hidden relative animate-in zoom-in-95 duration-200 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-primary p-5 flex justify-between items-center border-b-3 border-black text-black">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                            <FileText className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div>
                            <h3 className="text-base font-black uppercase tracking-tight text-black">
                                Jurnal Perasaan Hari Ini
                            </h3>
                            <p className="text-xs font-bold text-black/75 uppercase tracking-wide">
                                Refleksi 2 Menit Emosi Orang Tua
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                        aria-label="Tutup Modal"
                    >
                        <X className="w-5 h-5" strokeWidth={3} />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-card">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-foreground mb-2.5 pl-1">
                            Bagaimana suasana hati Anda mendampingi si kecil hari ini?
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                            {moods.map(mood => (
                                <button
                                    key={mood.id}
                                    type="button"
                                    onClick={() => setSelectedMood(mood.id)}
                                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                                        selectedMood === mood.id
                                            ? 'border-black bg-primary text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                                            : 'border-black/30 bg-card hover:bg-card-subtle text-foreground'
                                    }`}
                                >
                                    <span className="text-2xl mb-1">{mood.emoji}</span>
                                    <span className="text-[10px] font-black uppercase tracking-tight">{mood.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-wide text-foreground pl-1">
                            Catatan atau Momen Spesial (Opsional)
                        </label>
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Contoh: Hari ini si kecil berhasil menyusun 4 balok dan tertawa ceria saat bermain bersama..."
                            rows={3}
                            className="w-full bg-sidebar border-2 border-black rounded-xl p-3.5 text-xs font-bold text-foreground placeholder:text-muted-foreground/60 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none resize-none focus:bg-card"
                        ></textarea>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-1.5 stroke-[2.5]" />
                            Simpan Jurnal
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
