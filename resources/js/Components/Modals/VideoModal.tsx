import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import Button from '../Buttons/Button';
import Badge from '../Badges/Badge';
import VideoPlayer from '../UI/VideoPlayer';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    videoThumbnail?: string;
    duration?: string;
    onComplete?: () => void;
}

export default function VideoModal({
    isOpen,
    onClose,
    title = "Stimulasi Bahasa: Respons Ocehan Bayi",
    description = "Pelajari teknik dasar merespons ocehan bayi untuk mendorong akselerasi perkembangan bahasa dan komunikasi dua arah.",
    videoThumbnail = "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration = "05:24",
    onComplete,
}: VideoModalProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    if (!isOpen) return null;

    const handleMarkComplete = () => {
        if (onComplete) onComplete();
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200 select-none"
            onClick={onClose}
        >
            <div
                className="bg-card rounded-2xl w-full max-w-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-3 border-black overflow-hidden relative animate-in zoom-in-95 duration-200 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-primary p-3.5 flex justify-between items-center border-b-3 border-black text-black">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <Badge variant="netral">
                            Video Edukasi Intervensi
                        </Badge>
                        <span className="text-xs font-black uppercase text-black hidden sm:inline">• Durasi {duration}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer shrink-0 ml-2"
                        aria-label="Tutup Video"
                    >
                        <X className="w-5 h-5" strokeWidth={3} />
                    </button>
                </div>

                {/* Video Player — using shared component */}
                <VideoPlayer
                    thumbnail={videoThumbnail}
                    alt={title}
                    duration={duration}
                    currentTime="02:15"
                    progress={45}
                    isPlaying={isPlaying}
                    onTogglePlay={() => setIsPlaying(!isPlaying)}
                    className="rounded-none border-0 border-b-3 shadow-none"
                />

                {/* Footer Content */}
                <div className="p-5 md:p-6 bg-card space-y-4">
                    <div>
                        <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-black dark:text-white mb-1">
                            {title}
                        </h3>
                        <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Tutup
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleMarkComplete}
                            className="flex-1"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-1.5 stroke-[2.5]" />
                            Tandai Tugas Selesai
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
