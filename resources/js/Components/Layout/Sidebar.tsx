import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Users, BookOpen, Activity, LineChart, FileText, LogOut, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
];

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [width, setWidth] = useState(256);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const isResizing = useRef(false);
    const { url } = usePage();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing.current) return;
            let newWidth = e.clientX;
            if (newWidth < 80) newWidth = 80;
            if (newWidth > 400) newWidth = 400;
            setWidth(newWidth);
            if (newWidth < 120 && !isCollapsed) setIsCollapsed(true);
            if (newWidth >= 120 && isCollapsed) setIsCollapsed(false);
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
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            <div 
                ref={sidebarRef}
                style={{ width: isOpen ? 256 : (isCollapsed ? 80 : width) }}
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-border min-h-screen flex flex-col transition-all duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Resize Handle (Desktop Only) */}
                <div 
                    className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/20 z-50 hidden md:block"
                    onMouseDown={handleMouseDown}
                />

                <div className={`h-24 flex items-center border-b border-border relative ${isCollapsed ? 'justify-center px-0' : 'px-8'}`}>
                    {!isCollapsed && (
                        <div className="flex-1 truncate">
                            <h2 className="text-netral truncate">EmoGROW</h2>
                            <p className="text-small-text text-netral/70 -mt-1 truncate">Nurturing Professionalism</p>
                        </div>
                    )}
                    {isCollapsed && <LayoutDashboard className="w-8 h-8 text-primary" />}
                    
                    {/* Mobile Close Button */}
                    <button onClick={onClose} className="md:hidden absolute right-4 text-netral hover:text-primary">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 py-6 flex flex-col gap-1 overflow-x-hidden">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = url === item.route;
                        return (
                            <Link
                                key={index}
                                href={item.route}
                                className={`flex items-center py-3 transition-colors ${isCollapsed ? 'justify-center px-0 border-transparent' : 'px-8 border-r-4'} ${
                                    isActive
                                        ? `bg-primary/5 text-primary ${!isCollapsed ? 'border-primary' : ''}`
                                        : 'border-transparent text-netral hover:bg-accent hover:text-accent-foreground'
                                }`}
                                title={isCollapsed ? item.name : undefined}
                            >
                                <Icon className={`w-5 h-5 shrink-0 ${!isCollapsed ? 'mr-4' : ''}`} />
                                {!isCollapsed && (
                                    <span className={`truncate ${isActive ? 'text-body-bold' : 'text-body-thin'}`}>
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-border mt-auto">
                    {/* Desktop Collapse Toggle */}
                    <div className="hidden md:flex p-2 border-b border-border/50 justify-end">
                        <button 
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-1.5 rounded-lg text-netral hover:bg-netral/10 transition-colors"
                        >
                            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                        </button>
                    </div>
                    
                    <div className={`p-6 ${isCollapsed ? 'flex justify-center' : ''}`}>
                        <a href="#" className={`flex items-center text-netral hover:text-primary transition-colors group ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? "Logout" : undefined}>
                            <LogOut className={`w-5 h-5 shrink-0 ${!isCollapsed ? 'mr-4' : ''}`} />
                            {!isCollapsed && <span className="text-body-thin truncate">Logout</span>}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

