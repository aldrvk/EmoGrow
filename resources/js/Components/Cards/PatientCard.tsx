import React from 'react';
import StatusBadge from '../Badges/StatusBadge';

export default function PatientCard() {
    return (
        <div className="bg-primary/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between border border-primary/20 shadow-sm gap-6 md:gap-0">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left w-full md:w-auto">
                <div className="w-20 h-20 rounded-2xl bg-white p-1.5 shadow-sm flex items-center justify-center border border-white shrink-0">
                    <img src="https://i.pravatar.cc/150?img=1" alt="Budi Santoso" className="w-full h-full rounded-xl object-cover" />
                </div>
                <div>
                    <h2 className="text-netral">Budi Santoso</h2>
                    <p className="text-body-thin text-netral mb-2">3 Tahun 2 Bulan</p>
                    <StatusBadge status="Overweight" variant="warning" />
                </div>
            </div>
            
            <div className="w-full md:w-1/2 max-w-lg md:mr-4">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-label-text text-netral font-semibold uppercase">Progres Program Intervensi</span>
                    <span className="text-small-text text-netral">Minggu 4 dari 24</span>
                </div>
                <div className="h-2.5 w-full bg-white rounded-full overflow-hidden mb-1 shadow-sm border border-border/50">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
                </div>
                <div className="text-right">
                    <span className="text-small-text text-primary font-medium">50% Selesai</span>
                </div>
            </div>
        </div>
    );
}
