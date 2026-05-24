import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Users, BookOpen, Activity, LineChart, FileText, LogOut, ChevronLeft, ChevronRight, X, Shield } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const menuItems = [
    { name: 'Dashboard', route: '/', icon: LayoutDashboard },
    { name: 'Screening Anak', route: '/screening-anak', icon: Users },
    { name: 'Edukasi', route: '/edukasi', icon: BookOpen },
    { name: 'Aktivitas', route: '/aktivitas', icon: Activity },
    { name: 'Monitoring', route: '/monitoring', icon: LineChart },
    { name: 'Laporan Evaluasi', route: '/laporan-evaluasi', icon: FileText },
    { name: 'Admin Panel', route: '/admin', icon: Shield },
];

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [width, setWidth] = useState(260); // Disesuaikan sedikit lebih lebar untuk neubrutalism padding
    const sidebarRef = useRef<HTMLDivElement>(null);
    const isResizing = useRef(false);
    const { url } = usePage();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing.current) return;
            let newWidth = e.clientX;
            if (newWidth < 90) newWidth = 90;
            if (newWidth > 400) newWidth = 400;
            setWidth(newWidth);
            if (newWidth < 140 && !isCollapsed) setIsCollapsed(true);
            if (newWidth >= 140 && isCollapsed) setIsCollapsed(false);
        };

        const handleMouseUp = () => {
            isResizing.current = false;
            document.body.style.cursor = 'default';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isCollapsed]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
        document.body.style.cursor = 'col-resize';
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <div 
                ref={sidebarRef}
                style={{ width: isOpen ? 260 : (isCollapsed ? 90 : width) }}
                className={`fixed inset-y-0 left-0 z-50 bg-[#fbfbf4] border-r-3 md:border-3 border-black shadow-[4px_0px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                            md:m-3 md:rounded-[2rem] min-h-[calc(100vh-24px)] flex flex-col transition-all duration-300 ease-out md:relative md:translate-x-0 
                            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Resize Handle (Desktop Only) */}
                <div 
                    className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-black/10 z-50 hidden md:block"
                    onMouseDown={handleMouseDown}
                />

                {/* Header Brand */}
                <div className={`h-24 flex items-center relative border-b-2 border-black/10 ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}>
                    {!isCollapsed ? (
                        <div className="flex items-center gap-3 truncate transition-all duration-300 animate-in fade-in zoom-in-95">
                            <div className="w-10 h-10 bg-[#a3e635] border-2 border-black flex items-center justify-center text-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
                                <LayoutDashboard className="w-5 h-5" strokeWidth={2.5} />
                            </div>
                            <div className="truncate">
                                <h2 className="text-lg font-black tracking-tight text-black uppercase">EmoGROW</h2>
                                <p className="text-[10px] font-extrabold text-black/60 uppercase tracking-wider -mt-0.5 truncate">Professionalism</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-11 h-11 bg-[#a3e635] border-2 border-black flex items-center justify-center text-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                            <LayoutDashboard className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                    )}
                    
                    {/* Mobile Close Button */}
                    <button onClick={onClose} className="md:hidden absolute right-4 p-1.5 bg-red-100 border-2 border-black rounded-xl text-black hover:bg-red-200 transition-all">
                        <X className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 py-6 flex flex-col gap-2 overflow-x-hidden overflow-y-auto px-3">
                    {menuItems.map((item, index) => {
                        // Hide Admin Panel if the mock userRole is not admin
                        if (item.name === 'Admin Panel' && typeof window !== 'undefined' && localStorage.getItem('userRole') !== 'admin') {
                            return null;
                        }
                        
                        const Icon = item.icon;
                        const isActive = url === item.route;
                        
                        return (
                            <Link
                                key={index}
                                href={item.route}
                                className={`flex items-center py-3 rounded-xl border-2 border-transparent transition-all duration-200 group
                                           ${isCollapsed ? 'justify-center px-0' : 'px-4'} 
                                           ${isActive
                                                ? 'bg-[#a3e635] text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
                                                : 'text-black/80 hover:bg-white hover:border-black hover:text-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                           }`}
                                title={isCollapsed ? item.name : undefined}
                            >
                                <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-105 ${!isCollapsed ? 'mr-3.5' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                                {!isCollapsed && (
                                    <span className={`text-xs uppercase tracking-wide truncate ${isActive ? 'font-black' : 'font-extrabold'}`}>
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Area */}
                <div className="mt-auto border-t-2 border-black/10 bg-black/[0.01] rounded-b-[2rem] p-4 space-y-2">
                    {/* Desktop Collapse Toggle */}
                    <div className="hidden md:flex justify-center">
                        <button 
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="w-full py-1.5 flex items-center justify-center bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                        >
                            {isCollapsed ? <ChevronRight className="w-4 h-4" strokeWidth={2.5} /> : <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />}
                        </button>
                    </div>
                    
                    {/* Logout Link */}
                    <div className={`${isCollapsed ? 'flex justify-center' : ''}`}>
                        <Link 
                            href="/login" 
                            className={`w-full flex items-center py-2.5 rounded-xl border-2 border-transparent text-black/70 hover:text-red-600 hover:bg-red-50 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} 
                            title={isCollapsed ? "Logout" : undefined}
                        >
                            <LogOut className={`w-5 h-5 shrink-0 transition-transform group-hover:translate-x-0.5 ${!isCollapsed ? 'mr-3.5' : ''}`} strokeWidth={2} />
                            {!isCollapsed && <span className="text-xs uppercase tracking-wide font-extrabold truncate">Logout</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}