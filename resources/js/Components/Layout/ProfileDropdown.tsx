import React from 'react';
import { User, LogOut, Shield, Check, RefreshCw } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface ProfileDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenProfile: () => void;
    userRole: string;
    onToggleRole: () => void;
}

export default function ProfileDropdown({
    isOpen,
    onClose,
    onOpenProfile,
    userRole,
    onToggleRole,
}: ProfileDropdownProps) {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-14 w-72 bg-card border-3 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 select-none">
            {/* Header User Card */}
            <div className="bg-primary p-4 border-b-3 border-black text-black">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-black bg-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] shrink-0">
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
                        <p className="font-black text-sm uppercase tracking-tight text-black truncate leading-tight">Ibu Sari</p>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-black/70 truncate">ibu.sari@emogrow.com</p>
                        <span className="inline-block mt-1 bg-white text-black px-2 py-0.5 rounded text-[9px] font-black uppercase border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            {userRole === 'admin' ? 'Administrator' : 'Orang Tua'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="p-2 space-y-1 bg-sidebar">
                <button
                    onClick={() => {
                        onClose();
                        onOpenProfile();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 border-transparent hover:border-black hover:bg-card hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-black uppercase text-foreground cursor-pointer text-left"
                >
                    <div className="w-7 h-7 rounded-lg bg-info text-white border border-black flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span>Profil Saya</span>
                </button>

                {userRole === 'admin' && (
                    <Link
                        href="/admin"
                        onClick={onClose}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 border-transparent hover:border-black hover:bg-card hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-black uppercase text-foreground cursor-pointer text-left"
                    >
                        <div className="w-7 h-7 rounded-lg bg-warning text-black border border-black flex items-center justify-center shrink-0">
                            <Shield className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span>Admin Panel</span>
                    </Link>
                )}

                <button
                    onClick={onToggleRole}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2 border-transparent hover:border-black hover:bg-card hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-black uppercase text-foreground cursor-pointer text-left"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-success text-black border border-black flex items-center justify-center shrink-0">
                            <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <div>
                            <p className="leading-tight">Ganti Peran Demo</p>
                            <p className="text-[9px] font-bold text-muted-foreground lowercase">sekarang: {userRole}</p>
                        </div>
                    </div>
                    <span className="text-[10px] bg-card border border-black px-1.5 py-0.5 rounded font-black">
                        {userRole === 'admin' ? 'Orang Tua' : 'Admin'}
                    </span>
                </button>

                <div className="pt-1 border-t-2 border-black/10">
                    <Link
                        href="/login"
                        onClick={onClose}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 border-transparent text-muted-foreground hover:text-danger hover:border-black hover:bg-red-50 dark:hover:bg-red-950/40 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-xs font-black uppercase cursor-pointer"
                    >
                        <div className="w-7 h-7 rounded-lg bg-danger text-white border border-black flex items-center justify-center shrink-0">
                            <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span>Keluar Akun</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
