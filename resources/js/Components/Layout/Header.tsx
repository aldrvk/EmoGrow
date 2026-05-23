import React, { useState, useEffect } from 'react';
import { Bell, Sun, Moon, Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    return (
        <header className="h-24 bg-background flex items-center justify-between px-4 md:px-8 transition-colors duration-300">
            <div className="flex items-center">
                <button 
                    onClick={onMenuClick}
                    className="md:hidden text-netral hover:text-primary transition-colors flex items-center justify-center p-2 rounded-lg hover:bg-netral/5"
                    aria-label="Toggle Menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6">
                <button className="text-netral hover:text-primary transition-colors flex items-center justify-center rounded-full">
                    <Bell className="w-5 h-5" />
                </button>
                
                <button 
                    onClick={toggleDarkMode}
                    className="text-netral hover:text-primary transition-colors flex items-center justify-center rounded-full"
                    aria-label="Toggle Dark Mode"
                >
                    {isDarkMode ? (
                        <Sun className="w-5 h-5" />
                    ) : (
                        <Moon className="w-5 h-5" />
                    )}
                </button>

                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center cursor-pointer">
                    <img src="https://i.pravatar.cc/150?img=11" alt="User Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        </header>
    );
}
