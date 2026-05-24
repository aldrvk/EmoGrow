import React from 'react';
import { Check, Play, FileText, Sparkles } from 'lucide-react';

export default function TaskListCard() {
    return (
        <div className="bg-[#fffdf4] border-3 border-black rounded-2xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            
            {/* CARD HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-3 border-black pb-5 mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#a3e635] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Sparkles className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-tight text-black">Tugas Hari Ini</h3>
                        <p className="text-xs font-bold text-black/50 uppercase tracking-wide mt-0.5">Selesaikan target program Anda</p>
                    </div>
                </div>
                <span className="bg-[#00a6ff] text-white border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-wider rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    1/3 Selesai
                </span>
            </div>

            {/* TASK LIST CONTAINER */}
            <div className="space-y-4">
                
                {/* TASK 1: SELESAI */}
                <div className="flex items-start gap-4 p-4 bg-black/5 border-2 border-black/20 rounded-xl opacity-60">
                    <div className="mt-0.5">
                        <div className="w-6 h-6 rounded-lg bg-[#a3e635] border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                            <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-black uppercase tracking-wide text-black/70 line-through">
                            Catat Jadwal Tidur Anak
                        </div>
                        <p className="text-xs font-bold text-black/50 mt-1">
                            Catat jam tidur siang dan malam untuk observasi pola.
                        </p>
                    </div>
                    <span className="bg-black text-white border-2 border-black px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md shrink-0">
                        Selesai
                    </span>
                </div>

                {/* TASK 2: BELUM SELESAI (VIDEO STIMULASI - PENTING) */}
                <div className="flex flex-col gap-4 p-4 bg-white border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-start gap-4">
                        <div className="mt-0.5 shrink-0">
                            <div className="w-6 h-6 rounded-lg border-2 border-black bg-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <div className="text-sm font-black uppercase tracking-wide text-black">
                                    Tonton Video: Stimulasi Bahasa
                                </div>
                                <span className="bg-[#ff4a4a] text-white border-2 border-black px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                    Penting
                                </span>
                            </div>
                            <p className="text-xs font-bold text-black/60 mt-1 leading-relaxed">
                                Pelajari teknik dasar merespons ocehan bayi untuk mendorong perkembangan bahasa.
                            </p>
                        </div>
                    </div>
                    
                    {/* Video Thumbnail & Action Row */}
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pl-0 sm:pl-10">
                        {/* Thumbnail */}
                        <div className="w-full sm:w-44 h-24 bg-black border-2 border-black rounded-lg relative overflow-hidden shrink-0 group cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <img 
                                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                                alt="Stimulasi Bahasa"
                                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-9 h-9 rounded-full bg-[#f472b6] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                                    <Play className="w-4 h-4 fill-black ml-0.5" />
                                </div>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black text-white text-[9px] px-1.5 py-0.5 border border-black rounded font-black">
                                05:24
                            </div>
                        </div>
                        
                        {/* Button Action */}
                        <button className="bg-[#f472b6] text-black border-2 border-black font-black uppercase tracking-wide text-xs px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2">
                            <Play className="w-3.5 h-3.5 fill-black" /> Mulai Tonton
                        </button>
                    </div>
                </div>

                {/* TASK 3: BELUM SELESAI (ISI JURNAL) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="mt-0.5 shrink-0">
                            <div className="w-6 h-6 rounded-lg border-2 border-black bg-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-black uppercase tracking-wide text-black">
                                Isi Jurnal Perasaan Hari Ini
                            </div>
                            <p className="text-xs font-bold text-black/60 mt-1">
                                Luangkan waktu 2 menit untuk mencatat emosi Anda hari ini.
                            </p>
                        </div>
                    </div>
                    <div className="pl-0 sm:pl-10 shrink-0">
                        <button className="w-full sm:w-auto bg-white text-black border-2 border-black font-black uppercase tracking-wide text-xs px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2">
                            <FileText className="w-3.5 h-3.5" /> Isi Jurnal
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}