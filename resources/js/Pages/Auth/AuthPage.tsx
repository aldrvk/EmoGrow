import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Sparkles, ArrowRight, Plus, Minus } from 'lucide-react';
import Button from '../../Components/Buttons/Button';
import TextInput from '../../Components/Inputs/TextInput';

interface ChildData {
    name: string;
    weight: string;
    height: string;
}

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [namaIbu, setNamaIbu] = useState('');
    const [namaAyah, setNamaAyah] = useState('');
    const [childCount, setChildCount] = useState(1);
    const [children, setChildren] = useState<ChildData[]>([{ name: '', weight: '', height: '' }]);
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const changeChildCount = (delta: number) => {
        const next = Math.min(3, Math.max(1, childCount + delta));
        setChildCount(next);
        setChildren(prev => {
            if (next > prev.length) {
                return [
                    ...prev,
                    ...Array(next - prev.length).fill(null).map(() => ({ name: '', weight: '', height: '' })),
                ];
            }
            return prev.slice(0, next);
        });
    };

    const updateChild = (i: number, field: keyof ChildData, val: string) =>
        setChildren(prev => prev.map((c, idx) => (idx === i ? { ...c, [field]: val } : c)));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                if (isLogin) {
                    if (email === 'admin@emogrow.com') {
                        localStorage.setItem('userRole', 'admin');
                        router.get('/admin');
                    } else {
                        localStorage.setItem('userRole', 'user');
                        router.get('/');
                    }
                } else {
                    setIsLogin(true);
                }
            }, 800);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans antialiased text-black dark:text-slate-100 select-none">
            <Head title={isLogin ? 'Masuk - EmoGROW' : 'Daftar Akun - EmoGROW'} />

            {/* Main Container Card */}
            <div className="w-full max-w-md bg-card border-3 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                
                {/* Header Logo */}
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-14 h-14 bg-primary text-black border-2 border-black flex items-center justify-center rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-3">
                        <Sparkles className="w-7 h-7 stroke-[2.5]" />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">EmoGROW</h1>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-1">
                        {isLogin ? 'Masuk untuk memantau tumbuh kembang si kecil' : 'Lengkapi data awal keluarga Anda'}
                    </p>
                </div>

                {/* Form Area */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <TextInput 
                        label="Alamat Email" 
                        type="email" 
                        placeholder="contoh: ibu.sari@email.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required
                    />

                    <TextInput 
                        label="Kata Sandi" 
                        type="password" 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required
                    />

                    {/* Dynamic Register Fields */}
                    {!isLogin && (
                        <div className="space-y-4 pt-1">
                            <div className="grid grid-cols-2 gap-3">
                                <TextInput 
                                    label="Nama Ibu" 
                                    placeholder="Nama Ibu" 
                                    value={namaIbu} 
                                    onChange={e => setNamaIbu(e.target.value)} 
                                    required={!isLogin}
                                />
                                <TextInput 
                                    label="Nama Ayah" 
                                    placeholder="Nama Ayah" 
                                    value={namaAyah} 
                                    onChange={e => setNamaAyah(e.target.value)} 
                                />
                            </div>

                            {/* Stepper Jumlah Anak */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-black uppercase tracking-wide text-black dark:text-white pl-1">Jumlah Anak</label>
                                <div className="flex items-center justify-between bg-sidebar border-2 border-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <button
                                        type="button" 
                                        onClick={() => changeChildCount(-1)} 
                                        disabled={childCount <= 1}
                                        className="w-8 h-8 rounded-lg border-2 border-black bg-muted flex items-center justify-center text-foreground font-black hover:bg-card disabled:opacity-30 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                                        aria-label="Kurangi Jumlah Anak"
                                    >
                                        <Minus className="w-4 h-4 stroke-[3]" />
                                    </button>
                                    <span className="font-black text-sm uppercase text-foreground">{childCount} Anak</span>
                                    <button
                                        type="button" 
                                        onClick={() => changeChildCount(1)} 
                                        disabled={childCount >= 3}
                                        className="w-8 h-8 rounded-lg bg-success border-2 border-black text-black flex items-center justify-center font-black disabled:opacity-30 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                                        aria-label="Tambah Jumlah Anak"
                                    >
                                        <Plus className="w-4 h-4 stroke-[3]" />
                                    </button>
                                </div>
                            </div>

                            {/* Child Inputs Container */}
                            <div className="max-h-[160px] overflow-y-auto space-y-3 pr-1">
                                {children.map((child, i) => (
                                    <div key={i} className="bg-card-subtle border-2 border-black p-3.5 rounded-xl space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <input
                                            type="text" 
                                            placeholder={`Nama Panggilan Anak ke-${i + 1}`} 
                                            value={child.name}
                                            onChange={e => updateChild(i, 'name', e.target.value)}
                                            className="w-full bg-sidebar border-2 border-black px-3 py-2 rounded-lg text-xs font-bold text-foreground outline-none"
                                            required={!isLogin}
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="number" 
                                                step="0.1" 
                                                placeholder="Berat Badan (kg)" 
                                                value={child.weight}
                                                onChange={e => updateChild(i, 'weight', e.target.value)}
                                                className="bg-sidebar border-2 border-black px-3 py-2 rounded-lg text-xs font-bold text-foreground outline-none"
                                            />
                                            <input
                                                type="number" 
                                                step="1" 
                                                placeholder="Tinggi Badan (cm)" 
                                                value={child.height}
                                                onChange={e => updateChild(i, 'height', e.target.value)}
                                                className="bg-sidebar border-2 border-black px-3 py-2 rounded-lg text-xs font-bold text-foreground outline-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Remember Me Box */}
                    {isLogin && (
                        <div className="flex items-center gap-2 pt-1">
                            <input 
                                type="checkbox" 
                                id="remember" 
                                className="w-4 h-4 rounded border-2 border-black text-black dark:text-white accent-black cursor-pointer" 
                            />
                            <label htmlFor="remember" className="text-xs font-black uppercase text-muted-foreground cursor-pointer">
                                Ingat saya di perangkat ini
                            </label>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit" 
                        variant="primary"
                        size="lg"
                        isLoading={loading}
                        className="w-full mt-2"
                    >
                        {success ? '✓ Berhasil!' : isLogin ? 'Masuk Sekarang' : 'Daftar Akun Baru'}
                        {!loading && !success && <ArrowRight className="w-4 h-4 ml-1.5 stroke-[3]" />}
                    </Button>

                    {/* Toggle Switcher */}
                    <div className="text-center pt-3">
                        <button
                            type="button" 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-xs font-black uppercase text-black dark:text-white hover:underline cursor-pointer"
                        >
                            {isLogin ? 'Belum punya akun? Daftar gratis →' : 'Sudah memiliki akun? Masuk →'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}