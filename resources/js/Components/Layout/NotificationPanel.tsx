import React from 'react';
import { Bell, Check, Trash2, Info, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

export interface NotificationItem {
    id: number;
    title: string;
    description: string;
    time: string;
    type: 'info' | 'warning' | 'success' | 'task';
    read: boolean;
}

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: NotificationItem[];
    onMarkAllRead: () => void;
    onClearAll: () => void;
    onItemClick?: (item: NotificationItem) => void;
}

export default function NotificationPanel({
    isOpen,
    onClose,
    notifications,
    onMarkAllRead,
    onClearAll,
    onItemClick,
}: NotificationPanelProps) {
    if (!isOpen) return null;

    const unreadCount = notifications.filter(n => !n.read).length;

    const getIcon = (type: NotificationItem['type']) => {
        switch (type) {
            case 'success':
                return (
                    <div className="w-8 h-8 rounded-xl bg-success text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </div>
                );
            case 'warning':
                return (
                    <div className="w-8 h-8 rounded-xl bg-warning text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                    </div>
                );
            case 'task':
                return (
                    <div className="w-8 h-8 rounded-xl bg-primary text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    </div>
                );
            case 'info':
            default:
                return (
                    <div className="w-8 h-8 rounded-xl bg-info text-white border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        <Info className="w-4 h-4 stroke-[2.5]" />
                    </div>
                );
        }
    };

    return (
        <div className="absolute right-0 top-14 w-80 sm:w-96 bg-card border-3 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 select-none">
            {/* Header */}
            <div className="bg-primary p-4 border-b-3 border-black text-black flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        <Bell className="w-4 h-4 text-black" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="font-black text-sm uppercase tracking-tight leading-tight">Pemberitahuan</h3>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-black/80">
                            {unreadCount > 0 ? `${unreadCount} belum dibaca` : 'Semua sudah dibaca'}
                        </p>
                    </div>
                </div>
                {unreadCount > 0 && (
                    <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase rounded-md border border-black">
                        {unreadCount} Baru
                    </span>
                )}
            </div>

            {/* Actions Bar */}
            {notifications.length > 0 && (
                <div className="bg-card-subtle px-4 py-2 border-b-2 border-black flex items-center justify-between text-[11px] font-black uppercase">
                    <button
                        onClick={onMarkAllRead}
                        className="text-black dark:text-white hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                    >
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Tandai Dibaca
                    </button>
                    <button
                        onClick={onClearAll}
                        className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                        <Trash2 className="w-3.5 h-3.5 stroke-[2]" /> Hapus Semua
                    </button>
                </div>
            )}

            {/* Notification List */}
            <div className="max-h-[340px] overflow-y-auto divide-y-2 divide-black/10 bg-sidebar">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-muted border-2 border-black/40 flex items-center justify-center text-muted-foreground mb-3">
                            <Bell className="w-6 h-6 opacity-40" />
                        </div>
                        <p className="text-xs font-black uppercase text-black dark:text-white">Tidak Ada Notifikasi</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Anda sudah melihat semua pembaruan terkini.</p>
                    </div>
                ) : (
                    notifications.map(item => (
                        <div
                            key={item.id}
                            onClick={() => onItemClick?.(item)}
                            className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer hover:bg-card-subtle ${
                                !item.read ? 'bg-primary/10 dark:bg-primary/15' : 'bg-transparent'
                            }`}
                        >
                            {getIcon(item.type)}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1 mb-0.5">
                                    <h4 className="text-xs font-black uppercase tracking-wide text-black dark:text-white truncate">
                                        {item.title}
                                    </h4>
                                    {!item.read && (
                                        <span className="w-2 h-2 rounded-full bg-primary border border-black shrink-0"></span>
                                    )}
                                </div>
                                <p className="text-xs font-bold text-muted-foreground leading-snug">
                                    {item.description}
                                </p>
                                <span className="text-[9px] font-black uppercase text-muted-foreground/75 tracking-wider mt-1.5 inline-block">
                                    {item.time}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
