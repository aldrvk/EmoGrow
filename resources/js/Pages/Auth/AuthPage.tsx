import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ChildData {
    name: string;
    weight: string;
    height: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const PlantIcon = ({ size = 24 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2s-2 0-3 2c1-1 3-1 3-1S17 8 17 8z" />
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin w-4 h-4 text-black" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
);

// ─── Reusable Field (Simpel & Organik) ────────────────────────────────────────
const SimpleField = ({
    label, type = 'text', placeholder, value, onChange,
}: {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (v: string) => void;
}) => (
    <div className="space-y-1">
        <label className="block text-[0.7rem] font-black tracking-wider text-black uppercase pl-1">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            className="w-full bg-[#fbfbf4] border-2 border-black text-black font-bold
                       placeholder:text-gray-400 rounded-2xl px-4 py-2.5 text-sm outline-none
                       shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:bg-white
                       focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
                       transition-all duration-200"
        />
    </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
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

    // ── Child Helpers ─────────────────────────────────────────────────────────
    const changeChildCount = (delta: number) => {
        const next = Math.min(3, Math.max(1, childCount + delta)); // Dibatasi maks 3 agar simpel & hemat ruang
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

    // ── Submit Handler ────────────────────────────────────────────────────────
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
                    setIsLogin(true); // Setelah daftar pindah ke login secara smooth
                }
            }, 1000);
        }, 1200);
    };

    return (
        <>
            <Head title={isLogin ? 'Masuk — EmoGROW' : 'Daftar — EmoGROW'}>
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&family=Manrope:wght@600;800&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen flex items-center justify-center bg-[#fefbe8] p-4 font-['Manrope',sans-serif]">
                
                {/* ─── Main Container Card ─── */}
                <div className="w-full max-w-md bg-white border-4 border-black rounded-[2.5rem] p-6 md:p-8 
                                shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 relative overflow-hidden">
                    
                    {/* Header Logo (Simpel & Centered) */}
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-12 h-12 bg-[#a3e635] border-2 border-black flex items-center justify-center text-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-2">
                            <PlantIcon />
                        </div>
                        <h1 className="text-2xl font-black uppercase tracking-tight text-black">EmoGROW</h1>
                    </div>

                    {/* ─── Toggle Teks Atas dengan Animasi Fade ─── */}
                    <div className="text-center h-7 relative mb-4">
                        <p className={`text-xs font-extrabold uppercase tracking-wide text-gray-500 transition-all duration-300 absolute inset-x-0
                                      ${isLogin ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                            Masuk untuk memantau Si Kecil
                        </p>
                        <p className={`text-xs font-extrabold uppercase tracking-wide text-gray-500 transition-all duration-300 absolute inset-x-0
                                      ${!isLogin ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                            Lengkapi data singkat keluarga Anda
                        </p>
                    </div>

                    {/* ─── Form Area dengan Animasi Smooth Height & Content Transition ─── */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Area input bersama (Email & Password selalu ada) */}
                        <SimpleField label="Email" type="email" placeholder="nama@email.com" value={email} onChange={setEmail} />
                        <SimpleField label="Password" type="password" placeholder="••••••••" value={password} onChange={setPassword} />

                        {/* ─── Dynamic Register Fields (Mulus muncul dari bawah & fade-in) ─── */}
                        <div className={`space-y-4 transition-all duration-500 ease-in-out overflow-hidden
                                        ${!isLogin ? 'max-h-[450px] opacity-100 pt-1' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <SimpleField label="Nama Ibu" placeholder="Nama Ibu" value={namaIbu} onChange={setNamaIbu} />
                                <SimpleField label="Nama Ayah" placeholder="Nama Ayah" value={namaAyah} onChange={setNamaAyah} />
                            </div>

                            {/* Stepper Jumlah Anak */}
                            <div className="space-y-1">
                                <label className="block text-[0.7rem] font-black tracking-wider text-black uppercase pl-1">Jumlah Anak</label>
                                <div className="flex items-center bg-[#fbfbf4] border-2 border-black p-1.5 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    <button
                                        type="button" onClick={() => changeChildCount(-1)} disabled={childCount <= 1}
                                        className="w-8 h-8 border-2 border-black bg-[#ffdfdf] font-black rounded-xl disabled:opacity-30 active:scale-95 transition-all"
                                    >
                                        −
                                    </button>
                                    <span className="flex-1 text-center font-black text-sm">{childCount} Anak</span>
                                    <button
                                        type="button" onClick={() => changeChildCount(1)} disabled={childCount >= 3}
                                        className="w-8 h-8 border-2 border-black bg-[#a3e635] font-black rounded-xl disabled:opacity-30 active:scale-95 transition-all"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Dynamic Child Cards Container */}
                            <div className="max-h-[160px] overflow-y-auto space-y-3 pr-1 pt-1">
                                {children.map((child, i) => (
                                    <div key={i} className="bg-[#fef08a] border-2 border-black p-3 rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2">
                                        <input
                                            type="text" placeholder={`Nama Anak ke-${i + 1}`} value={child.name}
                                            onChange={e => updateChild(i, 'name', e.target.value)}
                                            className="w-full bg-white border-2 border-black px-3 py-1.5 rounded-xl text-xs font-bold outline-none"
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="number" step="0.1" placeholder="Berat (kg)" value={child.weight}
                                                onChange={e => updateChild(i, 'weight', e.target.value)}
                                                className="bg-white border-2 border-black px-3 py-1.5 rounded-xl text-xs font-bold outline-none"
                                            />
                                            <input
                                                type="number" step="1" placeholder="Tinggi (cm)" value={child.height}
                                                onChange={e => updateChild(i, 'height', e.target.value)}
                                                className="bg-white border-2 border-black px-3 py-1.5 rounded-xl text-xs font-bold outline-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Remember Me Box (Hanya tampil saat Login) */}
                        <div className={`flex items-center gap-2 pt-1 transition-all duration-300
                                        ${isLogin ? 'opacity-100 max-h-6' : 'opacity-0 max-h-0 pointer-events-none'}`}>
                            <input type="checkbox" id="remember" className="w-4 h-4 rounded-md border-2 border-black bg-white cursor-pointer checked:bg-black accent-black" />
                            <label htmlFor="remember" className="text-xs font-black uppercase tracking-wider text-black cursor-pointer">Ingat Saya</label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit" disabled={loading || success}
                            className={`w-full py-3 border-2 border-black rounded-2xl text-sm font-black uppercase tracking-wider 
                                       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                                       active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 mt-2
                                       ${success ? 'bg-[#86efac]' : 'bg-[#a3e635]'}`}
                        >
                            {loading ? <><SpinnerIcon /> Memproses...</> : success ? '✓ Berhasil!' : isLogin ? 'Masuk' : 'Daftar'}
                        </button>

                        {/* Toggle Switcher Link di Bawah */}
                        <div className="text-center pt-2">
                            <button
                                type="button" onClick={() => setIsLogin(!isLogin)}
                                className="text-xs font-extrabold uppercase tracking-wide text-black hover:underline active:scale-95 transition-all duration-150"
                            >
                                {isLogin ? 'Belum punya akun? Daftar →' : 'Sudah ada akun? Masuk →'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}