import React, { FormEventHandler } from 'react';
import { Head, router } from '@inertiajs/react';

export default function Login() {
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        // Cek secara tampilan saja (UI/Mock)
        const emailInput = (document.getElementById('email') as HTMLInputElement)?.value;
        
        if (emailInput === 'admin@emogrow.com') {
            localStorage.setItem('userRole', 'admin');
            router.get('/admin');
        } else {
            localStorage.setItem('userRole', 'user');
            router.get('/');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F4F9F1]">
            <Head title="Log in" />

            {/* Left side - Banner */}
            <div className="hidden md:flex md:w-1/2 bg-[#D1E7CD] relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-[#4B8B3B]/5 backdrop-blur-3xl z-0"></div>
                <img 
                    src="/images/login-banner.png" 
                    alt="EmoGrow Banner" 
                    className="w-full h-full object-cover z-10 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#D1E7CD] via-transparent to-transparent z-20"></div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-[-10%] right-[-5%] w-64 h-64 rounded-full bg-[#E5F3E2] blur-3xl opacity-60"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 rounded-full bg-[#D1E7CD] blur-3xl opacity-60"></div>

                <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-2xl shadow-[#4B8B3B]/10 border border-white relative z-10">
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E5F3E2] mb-6 shadow-inner shadow-[#4B8B3B]/20">
                            <span className="text-3xl">🌱</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">EmoGROW</h2>
                        <p className="text-gray-500 font-medium">Selamat datang kembali!</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                Email (Gunakan admin@emogrow.com untuk masuk sbg Admin)
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="block w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#4B8B3B] focus:ring-2 focus:ring-[#4B8B3B]/20 rounded-xl py-3 px-4 transition-all duration-200 outline-none"
                                placeholder="Masukkan email Anda"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                                    Password
                                </label>
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="block w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#4B8B3B] focus:ring-2 focus:ring-[#4B8B3B]/20 rounded-xl py-3 px-4 transition-all duration-200 outline-none"
                                placeholder="Masukkan password Anda"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    className="rounded border-gray-300 text-[#4B8B3B] shadow-sm focus:ring-[#4B8B3B] w-4 h-4 transition-colors cursor-pointer"
                                />
                                <span className="ms-3 text-sm font-medium text-gray-600">Ingat saya</span>
                            </label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center px-4 py-3.5 bg-[#4B8B3B] hover:bg-[#3d702f] rounded-xl font-bold text-white tracking-wide shadow-lg shadow-[#4B8B3B]/30 transform transition duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
