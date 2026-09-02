import React from 'react';
import { Check, Play, FileText, Sparkles } from 'lucide-react';

export interface TaskItem {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    type: 'check' | 'video' | 'journal';
    badge?: string;
    videoThumbnail?: string;
    videoDuration?: string;
}

interface TaskListCardProps {
    tasks?: TaskItem[];
    onToggleTask?: (taskId: number) => void;
    onWatchVideo?: () => void;
    onOpenJournal?: () => void;
}

const DEFAULT_TASKS: TaskItem[] = [
    {
        id: 1,
        title: 'Catat Jadwal Tidur Anak',
        description: 'Catat jam tidur siang dan malam untuk observasi pola.',
        completed: true,
        type: 'check',
    },
    {
        id: 2,
        title: 'Tonton Video: Stimulasi Bahasa',
        description: 'Pelajari teknik dasar merespons ocehan bayi untuk mendorong perkembangan bahasa.',
        completed: false,
        type: 'video',
        badge: 'Penting',
        videoThumbnail: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        videoDuration: '05:24',
    },
    {
        id: 3,
        title: 'Isi Jurnal Perasaan Hari Ini',
        description: 'Luangkan waktu 2 menit untuk mencatat emosi Anda hari ini.',
        completed: false,
        type: 'journal',
    },
];

export default function TaskListCard({
    tasks = DEFAULT_TASKS,
    onToggleTask,
    onWatchVideo,
    onOpenJournal,
}: TaskListCardProps) {
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;

    return (
        <div className="bg-card border-3 border-black rounded-2xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none">
            
            {/* CARD HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-3 border-black pb-5 mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-success border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Sparkles className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white">Tugas Hari Ini</h3>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-0.5">Selesaikan target program Anda</p>
                    </div>
                </div>
                <span className="bg-info text-white border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-wider rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {completedCount}/{totalCount} Selesai
                </span>
            </div>

            {/* TASK LIST CONTAINER */}
            <div className="space-y-4">
                {tasks.map(task => {
                    if (task.completed) {
                        return (
                            <div 
                                key={task.id}
                                onClick={() => onToggleTask?.(task.id)}
                                className="flex items-start gap-4 p-4 bg-black/5 dark:bg-white/5 border-2 border-black/20 rounded-xl opacity-60 cursor-pointer hover:opacity-80 transition-opacity"
                                title="Klik untuk membatalkan status selesai"
                            >
                                <div className="mt-0.5">
                                    <div className="w-6 h-6 rounded-lg bg-success border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                        <Check className="w-4 h-4" strokeWidth={3} />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-black uppercase tracking-wide text-muted-foreground line-through">
                                        {task.title}
                                    </div>
                                    <p className="text-xs font-bold text-muted-foreground mt-1">
                                        {task.description}
                                    </p>
                                </div>
                                <span className="bg-black text-white border-2 border-black px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md shrink-0">
                                    Selesai
                                </span>
                            </div>
                        );
                    }

                    if (task.type === 'video') {
                        return (
                            <div 
                                key={task.id}
                                className="flex flex-col gap-4 p-4 bg-card-subtle border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className="flex items-start gap-4">
                                    <button
                                        type="button"
                                        onClick={() => onToggleTask?.(task.id)}
                                        className="mt-0.5 shrink-0 cursor-pointer"
                                        aria-label="Tandai selesai"
                                        title="Centang untuk menandai selesai"
                                    >
                                        <div className="w-6 h-6 rounded-lg border-2 border-black bg-card hover:bg-success transition-colors"></div>
                                    </button>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <div className="text-sm font-black uppercase tracking-wide text-black dark:text-white">
                                                {task.title}
                                            </div>
                                            {task.badge && (
                                                <span className="bg-danger text-white border-2 border-black px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                    {task.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs font-bold text-muted-foreground mt-1 leading-relaxed">
                                            {task.description}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Video Thumbnail & Action Row */}
                                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pl-0 sm:pl-10">
                                    {/* Thumbnail */}
                                    <div 
                                        onClick={onWatchVideo}
                                        className="w-full sm:w-44 h-24 bg-black border-2 border-black rounded-lg relative overflow-hidden shrink-0 group cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <img 
                                            src={task.videoThumbnail || "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
                                            alt={task.title}
                                            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-200"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-9 h-9 rounded-full bg-primary border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                                                <Play className="w-4 h-4 fill-black ml-0.5" />
                                            </div>
                                        </div>
                                        {task.videoDuration && (
                                            <div className="absolute bottom-1 right-1 bg-black text-white text-[9px] px-1.5 py-0.5 border border-black rounded font-black">
                                                {task.videoDuration}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Button Action */}
                                    <button 
                                        onClick={onWatchVideo}
                                        className="bg-primary text-black border-2 border-black font-black uppercase tracking-wide text-xs px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Play className="w-3.5 h-3.5 fill-black" /> Mulai Tonton
                                    </button>
                                </div>
                            </div>
                        );
                    }

                    // Journal or other interactive task
                    return (
                        <div 
                            key={task.id}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-card-subtle border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="flex items-start gap-4 flex-1">
                                <button
                                    type="button"
                                    onClick={() => onToggleTask?.(task.id)}
                                    className="mt-0.5 shrink-0 cursor-pointer"
                                    aria-label="Tandai selesai"
                                    title="Centang untuk menandai selesai"
                                >
                                    <div className="w-6 h-6 rounded-lg border-2 border-black bg-card hover:bg-success transition-colors"></div>
                                </button>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-black uppercase tracking-wide text-black dark:text-white">
                                        {task.title}
                                    </div>
                                    <p className="text-xs font-bold text-muted-foreground mt-1">
                                        {task.description}
                                    </p>
                                </div>
                            </div>
                            <div className="pl-0 sm:pl-10 shrink-0">
                                <button 
                                    onClick={onOpenJournal}
                                    className="w-full sm:w-auto bg-card text-foreground hover:bg-muted border-2 border-black font-black uppercase tracking-wide text-xs px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <FileText className="w-3.5 h-3.5" /> Isi Jurnal
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}