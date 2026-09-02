import React, { useState, useEffect, useRef } from 'react';
import { Bell, Sun, Moon, Menu } from 'lucide-react';
import NotificationPanel, { NotificationItem } from './NotificationPanel';
import ProfileDropdown from './ProfileDropdown';
import ProfileModal from '../Modals/ProfileModal';
import Toast from '../UI/Toast';

interface HeaderProps {
    onMenuClick?: () => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
        id: 1,
        title: 'Tugas Hari Ini Tersedia',
        description: 'Tonton video stimulasi bahasa untuk si kecil sekarang.',
        time: '5 menit lalu',
        type: 'task',
        read: false,
    },
    {
        id: 2,
        title: 'Evaluasi Mingguan Siap',
        description: 'Laporan progres intervensi minggu ke-12 telah diperbarui.',
        time: '2 jam lalu',
        type: 'info',
        read: false,
    },
    {
        id: 3,
        title: 'Pengingat Nutrisi',
        description: 'Catat asupan gizi seimbang untuk mempertahankan kurva ideal.',
        time: 'Kemarin',
        type: 'warning',
        read: true,
    },
];

export default function Header({ onMenuClick }: HeaderProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
    
    // Role state
    const [userRole, setUserRole] = useState(() => 
        typeof window !== 'undefined' ? localStorage.getItem('userRole') || 'user' : 'user'
    );

    // Toast state
    const [toastMessage, setToastMessage] = useState('');
    const [isToastOpen, setIsToastOpen] = useState(false);

    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
                setIsNotificationOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newTheme = !prev;
            if (newTheme) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newTheme;
        });
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setToastMessage('Semua notifikasi telah ditandai sebagai dibaca.');
        setIsToastOpen(true);
    };

    const handleClearAll = () => {
        setNotifications([]);
        setToastMessage('Semua notifikasi telah dibersihkan.');
        setIsToastOpen(true);
    };

    const handleNotificationClick = (item: NotificationItem) => {
        setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
        setIsNotificationOpen(false);
    };

    const handleToggleRole = () => {
        const nextRole = userRole === 'admin' ? 'user' : 'admin';
        setUserRole(nextRole);
        localStorage.setItem('userRole', nextRole);
        setIsProfileOpen(false);
        setToastMessage(`Peran demo beralih ke: ${nextRole === 'admin' ? 'Administrator' : 'Orang Tua'}`);
        setIsToastOpen(true);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="h-20 bg-sidebar border-b-3 border-black sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 select-none transition-colors">
            <div className="flex items-center gap-3">
                <button 
                    onClick={onMenuClick}
                    className="md:hidden w-10 h-10 rounded-xl bg-card border-2 border-black flex items-center justify-center text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-card-subtle active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                    aria-label="Buka Menu Navigasi"
                >
                    <Menu className="w-5 h-5" strokeWidth={2.5} />
                </button>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4">
                {/* Dark Mode Toggle */}
                <button 
                    onClick={toggleDarkMode}
                    className="w-10 h-10 rounded-xl bg-card border-2 border-black flex items-center justify-center text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-card-subtle active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                    title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
                    aria-label="Toggle Dark Mode"
                >
                    {isDarkMode ? (
                        <Sun className="w-5 h-5 text-amber-500 fill-amber-400" />
                    ) : (
                        <Moon className="w-5 h-5 text-slate-800 fill-slate-800" />
                    )}
                </button>

                {/* Notification Button & Dropdown Container */}
                <div ref={notificationRef} className="relative">
                    <button 
                        onClick={() => {
                            setIsNotificationOpen(!isNotificationOpen);
                            setIsProfileOpen(false);
                        }}
                        className="relative w-10 h-10 rounded-xl bg-card border-2 border-black flex items-center justify-center text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-card-subtle active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                        title="Notifikasi"
                        aria-label="Notifikasi"
                    >
                        <Bell className="w-5 h-5" strokeWidth={2.5} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black border-2 border-black rounded-full text-[9px] font-black flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <NotificationPanel
                        isOpen={isNotificationOpen}
                        onClose={() => setIsNotificationOpen(false)}
                        notifications={notifications}
                        onMarkAllRead={handleMarkAllRead}
                        onClearAll={handleClearAll}
                        onItemClick={handleNotificationClick}
                    />
                </div>

                {/* Profile Pill & Dropdown Container */}
                <div ref={profileRef} className="relative">
                    <button
                        onClick={() => {
                            setIsProfileOpen(!isProfileOpen);
                            setIsNotificationOpen(false);
                        }}
                        className="flex items-center gap-3 pl-2 border-l-2 border-black/20 hover:opacity-90 transition-opacity cursor-pointer text-left"
                        aria-label="Buka Menu Profil"
                    >
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-primary">
                            <img 
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80" 
                                alt="User Profile" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Ibu+Sari&background=f472b6&color=fff';
                                }}
                            />
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-black text-black dark:text-white leading-tight uppercase">Ibu Sari</p>
                            <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider">
                                {userRole === 'admin' ? 'Admin' : 'Orang Tua'}
                            </p>
                        </div>
                    </button>

                    <ProfileDropdown
                        isOpen={isProfileOpen}
                        onClose={() => setIsProfileOpen(false)}
                        onOpenProfile={() => setIsProfileModalOpen(true)}
                        userRole={userRole}
                        onToggleRole={handleToggleRole}
                    />
                </div>
            </div>

            {/* Profile Modal */}
            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                onSaveSuccess={(msg) => {
                    setToastMessage(msg);
                    setIsToastOpen(true);
                }}
            />

            {/* Toast Notification */}
            <Toast
                message={toastMessage}
                type="success"
                isOpen={isToastOpen}
                onClose={() => setIsToastOpen(false)}
            />
        </header>
    );
}
