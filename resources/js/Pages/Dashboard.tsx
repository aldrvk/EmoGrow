import React, { useState } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import PatientCard from '../Components/Cards/PatientCard';
import ProgressTimelineCard from '../Components/Cards/ProgressTimelineCard';
import TaskListCard from '../Components/Cards/TaskListCard';
import MetricCard from '../Components/Cards/MetricCard';

export default function Dashboard() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex w-full">
            <Sidebar 
                isOpen={isMobileMenuOpen} 
                onClose={() => setIsMobileMenuOpen(false)} 
            />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="mb-4 px-1">
                            <h1 className="text-netral text-3xl md:text-[40px] leading-tight">Selamat Datang di EmoGROW</h1>
                            <p className="text-body-thin text-netral">Kamis, 24 Oktober 2023</p>
                        </div>
                        
                        <PatientCard />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <ProgressTimelineCard />
                            </div>
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <TaskListCard />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <MetricCard 
                                        title="BERAT BADAN ANAK (BB)"
                                        value="12.0"
                                        unit="kg"
                                        subtext="-0.5 kg bulan ini"
                                        icon="scale"
                                        variant="secondary"
                                    />
                                    <MetricCard 
                                        title="IMT ANAK"
                                        value="17.8"
                                        unit="Normal"
                                        hasBar={true}
                                        icon="ruler"
                                        variant="primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
