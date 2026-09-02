import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize } from 'lucide-react';

export interface VideoPlayerProps {
    /** URL of the video thumbnail image */
    thumbnail: string;
    /** Alt text for the thumbnail */
    alt?: string;
    /** Total duration string (e.g., "05:30") */
    duration?: string;
    /** Current playback time string (e.g., "02:15") */
    currentTime?: string;
    /** Progress percentage (0-100) */
    progress?: number;
    /** Whether the video is currently playing */
    isPlaying?: boolean;
    /** Callback when play/pause is toggled */
    onTogglePlay?: () => void;
    /** Callback when play button overlay is clicked (e.g., open modal) */
    onPlayClick?: () => void;
    /** Additional CSS classes for the container */
    className?: string;
    /** Whether to show the control bar */
    showControls?: boolean;
    /** Whether to show the centered play overlay button */
    showPlayOverlay?: boolean;
}

export default function VideoPlayer({
    thumbnail,
    alt = 'Video thumbnail',
    duration = '05:30',
    currentTime = '02:15',
    progress = 40,
    isPlaying: isPlayingProp,
    onTogglePlay,
    onPlayClick,
    className = '',
    showControls = true,
    showPlayOverlay = true,
}: VideoPlayerProps) {
    const [internalPlaying, setInternalPlaying] = useState(false);
    
    // Support both controlled and uncontrolled modes
    const isPlaying = isPlayingProp !== undefined ? isPlayingProp : internalPlaying;
    
    const handleTogglePlay = () => {
        if (onTogglePlay) {
            onTogglePlay();
        } else {
            setInternalPlaying(prev => !prev);
        }
    };

    const handlePlayOverlayClick = () => {
        if (onPlayClick) {
            onPlayClick();
        } else {
            handleTogglePlay();
        }
    };

    return (
        <div className={`w-full bg-sidebar rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
            {/* Thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <img
                    src={thumbnail}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-85' : 'opacity-85'}`}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590698933947-a202b069a861?w=800&q=80';
                    }}
                />
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Centered Play/Pause Overlay Button */}
            {showPlayOverlay && (
                <button
                    onClick={handlePlayOverlayClick}
                    className="w-16 h-14 bg-primary border-2 border-black rounded-2xl flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform z-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    aria-label={isPlaying ? "Jeda Video" : "Putar Video"}
                >
                    {isPlaying ? (
                        <Pause className="w-7 h-7 stroke-[3]" />
                    ) : (
                        <Play className="w-7 h-7 ml-1 fill-black stroke-black" />
                    )}
                </button>
            )}

            {/* Controls Bar */}
            {showControls && (
                <div className="absolute bottom-0 left-0 w-full h-12 bg-card/95 backdrop-blur-xs flex items-center px-4 gap-4 border-t-2 border-black z-10">
                    <button
                        onClick={handleTogglePlay}
                        className="cursor-pointer shrink-0"
                        aria-label={isPlaying ? "Jeda" : "Putar"}
                    >
                        {isPlaying ? (
                            <Pause className="w-4 h-4 text-foreground stroke-[3]" />
                        ) : (
                            <Play className="w-4 h-4 text-foreground fill-foreground stroke-foreground" />
                        )}
                    </button>

                    {/* Progress Bar */}
                    <div className="flex-1 flex items-center gap-2">
                        <div className="h-2 flex-1 bg-muted border border-black rounded-full relative cursor-pointer">
                            <div
                                className="absolute top-0 left-0 h-full bg-success rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black rounded-full border border-white shadow-xs"
                                style={{ left: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Timestamp */}
                    <span className="text-[10px] font-black text-foreground uppercase tracking-wider shrink-0">
                        {currentTime} / {duration}
                    </span>

                    {/* Volume & Fullscreen */}
                    <div className="flex items-center gap-3 ml-2 shrink-0">
                        <Volume2 className="w-4 h-4 text-foreground cursor-pointer stroke-[2.5]" />
                        <Maximize className="w-4 h-4 text-foreground cursor-pointer stroke-[2.5]" />
                    </div>
                </div>
            )}
        </div>
    );
}
