import React from 'react';
import Badge from '../Badges/Badge';
import Button from '../Buttons/Button';
import { Check, Square, Play } from 'lucide-react';

export default function TaskListCard() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-primary">
                            <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                        <h3 className="text-netral">Tugas Hari Ini</h3>
                    </div>
                    <p className="text-body-thin text-netral mt-2">Selesaikan 3 tugas untuk mencapai target mingguan Anda.</p>
                </div>
                <Badge variant="primary">1/3 Selesai</Badge>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border-b border-border/50">
                    <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white shadow-sm">
                            <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-body-bold text-netral/50 line-through mb-1">Catat Jadwal Tidur Anak</div>
                        <p className="text-body-thin text-netral/50 line-through">Catat jam tidur siang dan malam untuk observasi pola.</p>
                    </div>
                    <Badge variant="secondary">Selesai</Badge>
                </div>

                <div className="flex items-start gap-4 p-4 border-b border-border/50">
                    <div className="mt-1">
                        <div className="w-6 h-6 rounded-lg border-2 border-primary/40 dark:border-primary/60 flex items-center justify-center"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <div className="text-body-bold text-netral">Tonton Video: Stimulasi Bahasa</div>
                            <Badge variant="danger">Penting</Badge>
                        </div>
                        <p className="text-body-thin text-netral">Pelajari teknik dasar merespons ocehan bayi untuk mendorong perkembangan bahasa.</p>
                        
                        <div className="mt-4 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between w-full">
                            <div className="w-full sm:w-52 h-32 bg-netral/10 dark:bg-white/5 rounded-lg relative overflow-hidden flex items-center justify-center shadow-inner group cursor-pointer border border-border shrink-0">
                                <div className="absolute inset-0 bg-cover bg-center opacity-60 dark:opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                                <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-white flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-all z-10">
                                    <Play className="w-5 h-5 ml-1 fill-primary" />
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/60 text-[#ffffff] text-[10px] px-2 py-0.5 rounded font-medium z-10">
                                    05:24
                                </div>
                            </div>
                            <Button variant="primary" size="md" className="w-full sm:w-auto">Mulai Tonton</Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1">
                            <div className="w-6 h-6 rounded-lg border-2 border-primary/40 dark:border-primary/60 flex items-center justify-center"></div>
                        </div>
                        <div className="flex-1">
                            <div className="text-body-bold text-netral mb-1">Isi Jurnal Perasaan Hari Ini</div>
                            <p className="text-body-thin text-netral">Luangkan waktu 2 menit untuk mencatat emosi Anda hari ini.</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto pl-10 sm:pl-0">
                        <Button variant="secondary-outline" size="md" className="w-full sm:w-auto dark:border-secondary/60 dark:hover:bg-secondary/20">Isi Jurnal</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
