import React, { useState } from 'react';
import { User, X, Mail, Phone, Baby, Shield, CheckCircle2 } from 'lucide-react';
import Button from '../Buttons/Button';
import TextInput from '../Inputs/TextInput';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: (msg: string) => void;
}

export default function ProfileModal({
    isOpen,
    onClose,
    onSaveSuccess,
}: ProfileModalProps) {
    const [name, setName] = useState('Ibu Sari');
    const [email, setEmail] = useState('ibu.sari@emogrow.com');
    const [phone, setPhone] = useState('0812-3456-7890');
    const [activeTab, setActiveTab] = useState<'info' | 'anak'>('info');

    if (!isOpen) return null;

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onClose();
        onSaveSuccess('Profil Anda berhasil diperbarui!');
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200 select-none">
            <div
                className="bg-card rounded-2xl w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-3 border-black overflow-hidden relative animate-in zoom-in-95 duration-200 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-primary p-5 flex justify-between items-center border-b-3 border-black text-black">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                            <User className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div>
                            <h3 className="text-base font-black uppercase tracking-tight text-black">
                                Profil Pengguna
                            </h3>
                            <p className="text-xs font-bold text-black/75 uppercase tracking-wide">
                                Kelola data pribadi dan preferensi akun
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

                {/* Tab Navigation */}
                <div className="flex border-b-3 border-black bg-sidebar">
                    <button
                        type="button"
                        onClick={() => setActiveTab('info')}
                        className={`flex-1 py-3 text-xs font-black uppercase text-center transition-colors border-r-2 border-black cursor-pointer ${
                            activeTab === 'info' ? 'bg-success text-black' : 'text-muted-foreground hover:bg-card-subtle'
                        }`}
                    >
                        Data Diri
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('anak')}
                        className={`flex-1 py-3 text-xs font-black uppercase text-center transition-colors cursor-pointer ${
                            activeTab === 'anak' ? 'bg-success text-black' : 'text-muted-foreground hover:bg-card-subtle'
                        }`}
                    >
                        Profil Anak (Terhubung)
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 overflow-y-auto max-h-[70vh] bg-card">
                    {activeTab === 'info' ? (
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-card-subtle border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-black bg-primary shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80"
                                        alt="Ibu Sari"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Ibu+Sari&background=f472b6&color=000';
                                        }}
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-black uppercase text-black dark:text-white leading-tight">{name}</h4>
                                    <p className="text-xs font-bold text-muted-foreground uppercase mt-0.5">Peran: Orang Tua (Ibu)</p>
                                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-black uppercase text-success">
                                        <CheckCircle2 className="w-3 h-3 stroke-[2.5]" /> Akun Terverifikasi
                                    </span>
                                </div>
                            </div>

                            <TextInput
                                label="Nama Lengkap"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />

                            <TextInput
                                label="Alamat Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />

                            <TextInput
                                label="Nomor WhatsApp / HP"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required
                            />

                            <div className="flex gap-3 pt-3">
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
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 bg-card-subtle border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-info text-white border-2 border-black flex items-center justify-center font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                        <Baby className="w-5 h-5 stroke-[2.5]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase text-black dark:text-white">Aira Putri Mahesa</h4>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-0.5">24 Bulan • Perempuan</p>
                                    </div>
                                </div>
                                <span className="bg-success text-black border-2 border-black px-2.5 py-0.5 text-[10px] font-black uppercase rounded-lg">
                                    Aktif
                                </span>
                            </div>

                            <div className="p-4 bg-sidebar border-2 border-dashed border-black/30 rounded-xl text-center">
                                <p className="text-xs font-bold text-muted-foreground uppercase">Slot profil ke-2 tersedia (Maks 2 anak per akun)</p>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="w-full"
                            >
                                Tutup
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
