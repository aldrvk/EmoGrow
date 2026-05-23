import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import { Shield, Star, CheckCircle, Clock, Search, X, Baby, TrendingUp, Ruler, Scale, Activity, ChevronDown, Eye } from 'lucide-react';

// Dummy children data per parent
const CHILDREN_DATA: Record<number, { name: string; age: string; gender: string; bb: string; tb: string; imt: string; imtStatus: string; progress: number }[]> = {
    1: [
        { name: 'Andi Santoso', age: '36 Bulan', gender: 'Laki-laki', bb: '14.2', tb: '95.0', imt: '15.7', imtStatus: 'Normal', progress: 75 },
        { name: 'Bunga Santoso', age: '18 Bulan', gender: 'Perempuan', bb: '9.8', tb: '78.5', imt: '15.9', imtStatus: 'Normal', progress: 40 },
    ],
    2: [
        { name: 'Dina Aminah', age: '24 Bulan', gender: 'Perempuan', bb: '8.5', tb: '80.0', imt: '13.3', imtStatus: 'Kurus', progress: 60 },
    ],
    3: [
        { name: 'Fajar Salim', age: '48 Bulan', gender: 'Laki-laki', bb: '22.0', tb: '102.0', imt: '21.1', imtStatus: 'Obesitas', progress: 20 },
    ],
    4: [
        { name: 'Gita Wati', age: '12 Bulan', gender: 'Perempuan', bb: '9.0', tb: '74.0', imt: '16.4', imtStatus: 'Normal', progress: 90 },
        { name: 'Hadi Wati', age: '42 Bulan', gender: 'Laki-laki', bb: '16.5', tb: '100.0', imt: '16.5', imtStatus: 'Normal', progress: 55 },
    ],
    5: [
        { name: 'Indra Fauzi', age: '30 Bulan', gender: 'Laki-laki', bb: '15.0', tb: '90.0', imt: '18.5', imtStatus: 'Beresiko Gizi Lebih', progress: 35 },
    ],
    6: [
        { name: 'Aira Putri Mahesa', age: '24 Bulan', gender: 'Perempuan', bb: '11.5', tb: '84.0', imt: '16.3', imtStatus: 'Normal', progress: 50 },
    ],
};

// Mock Data (tanpa email)
const MOCK_USERS = [
    { id: 1, name: 'Ibu Budi Santoso', status: 'Active', isPriority: true, lastActive: '12.5', jumlahAnak: 2 },
    { id: 2, name: 'Ibu Siti Aminah', status: 'Active', isPriority: false, lastActive: '8.2', jumlahAnak: 1 },
    { id: 3, name: 'Ibu Agus Salim', status: 'Inactive', isPriority: false, lastActive: '2.0', jumlahAnak: 1 },
    { id: 4, name: 'Ibu Rina Wati', status: 'Active', isPriority: true, lastActive: '24.5', jumlahAnak: 2 },
    { id: 5, name: 'Ibu Ahmad Fauzi', status: 'Active', isPriority: false, lastActive: '5.5', jumlahAnak: 1 },
    { id: 6, name: 'Ibu Mahesa', status: 'Active', isPriority: false, lastActive: '48.0', jumlahAnak: 1 },
];

export default function AdminPanel() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [users, setUsers] = useState(MOCK_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

    useEffect(() => {
        // Kick out non-admin users based on UI mock role
        if (typeof window !== 'undefined' && localStorage.getItem('userRole') !== 'admin') {
            window.location.href = '/';
        }
    }, []);

    const togglePriority = (userId: number) => {
        setUsers(users.map(u => 
            u.id === userId ? { ...u, isPriority: !u.isPriority } : u
        ));
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeUsersCount = users.filter(u => u.status === 'Active').length;
    const priorityUsersCount = users.filter(u => u.isPriority).length;

    const selectedUser = selectedUserId ? users.find(u => u.id === selectedUserId) : null;
    const selectedChildren = selectedUserId ? (CHILDREN_DATA[selectedUserId] || []) : [];

    const getImtColor = (status: string) => {
        if (status === 'Normal') return { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100 text-green-700' };
        if (status === 'Kurus') return { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' };
        return { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100 text-red-700' };
    };

    return (
        <div className="min-h-screen bg-background flex w-full font-sans">
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto">
                        
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <p className="text-[#f472b6] text-[11px] font-bold tracking-wider uppercase mb-1">Halaman Administrator</p>
                                <h1 className="text-netral text-3xl md:text-[36px] leading-tight font-bold">Manajemen Pengguna</h1>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Total Pengguna</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{users.length}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Pengguna Aktif</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{activeUsersCount}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-[#f472b6]">
                                    <Star className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Prioritas Tinggi</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{priorityUsersCount}</h3>
                                </div>
                            </div>
                        </div>

                        {/* User List Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Table Header actions */}
                            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h3 className="text-lg font-bold text-gray-800">Daftar Orang Tua / Ibu</h3>
                                <div className="relative">
                                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="text" 
                                        placeholder="Cari nama..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f472b6]/20 focus:border-[#f472b6] text-sm w-full sm:w-64 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Orang Tua</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Jumlah Anak</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Waktu Aktif (Jam)</th>
                                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Prioritas</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredUsers.map((user) => {
                                            const isExpanded = expandedUserId === user.id;
                                            const childrenData = CHILDREN_DATA[user.id] || [];
                                            return (
                                            <React.Fragment key={user.id}>
                                            <tr 
                                                className={`hover:bg-[#f472b6]/5 transition-colors cursor-pointer ${isExpanded ? 'bg-[#f472b6]/5' : ''}`}
                                                onClick={() => setExpandedUserId(isExpanded ? null : user.id)}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-[#f472b6]/10 flex items-center justify-center text-[#f472b6] font-bold uppercase shrink-0">
                                                            {user.name.charAt(4)}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="font-semibold text-gray-800 text-sm">{user.name}</div>
                                                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                                                        <Baby className="w-4 h-4 text-[#f472b6]" />
                                                        {user.jumlahAnak} Anak
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase ${
                                                        user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                        {user.status === 'Active' ? 'Aktif' : 'Non-aktif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1.5 text-xs font-medium">
                                                        <Clock className="w-4 h-4 text-gray-400" />
                                                        {user.lastActive} Jam
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); togglePriority(user.id); }}
                                                        className={`p-2 rounded-full transition-all ${
                                                            user.isPriority 
                                                            ? 'bg-pink-50 text-[#f472b6] hover:bg-pink-100' 
                                                            : 'text-gray-300 hover:bg-gray-50 hover:text-gray-400'
                                                        }`}
                                                        title={user.isPriority ? "Hapus dari Prioritas" : "Jadikan Prioritas"}
                                                    >
                                                        <Star className={`w-5 h-5 ${user.isPriority ? 'fill-current' : ''}`} />
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* Dropdown Row */}
                                            {isExpanded && (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-4 bg-gray-50/70">
                                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                            <div className="flex flex-wrap gap-3">
                                                                {childrenData.map((child, idx) => {
                                                                    const color = getImtColor(child.imtStatus);
                                                                    return (
                                                                        <div key={idx} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200 shadow-sm">
                                                                            <div className="w-7 h-7 rounded-full bg-[#f472b6]/15 flex items-center justify-center text-[#f472b6] font-bold text-xs">
                                                                                {idx + 1}
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-xs font-semibold text-gray-800">{child.name}</p>
                                                                                <p className="text-[10px] text-gray-500">{child.age} · <span className={color.text}>{child.imtStatus}</span></p>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); setSelectedUserId(user.id); }}
                                                                className="bg-[#f472b6] hover:bg-[#f472b6]/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md transition-all shrink-0"
                                                            >
                                                                <Eye className="w-4 h-4" /> Lihat Detail
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                            </React.Fragment>
                                            );
                                        })}
                                        {filteredUsers.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center">
                                                    <div className="text-gray-400 mb-2">
                                                        <Search className="w-8 h-8 mx-auto opacity-50" />
                                                    </div>
                                                    <p className="text-gray-500 font-medium">Tidak ada pengguna yang cocok dengan "{searchQuery}"</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </main>

                {/* Detail Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedUserId(null)}>
                        <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                            
                            {/* Modal Header */}
                            <div className="bg-[#f472b6]/10 p-6 flex justify-between items-center border-b border-[#f472b6]/20 shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-[#f472b6]/20 flex items-center justify-center text-[#f472b6] font-bold text-xl uppercase">
                                        {selectedUser.name.charAt(4)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{selectedUser.name}</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                                                selectedUser.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {selectedUser.status === 'Active' ? 'Aktif' : 'Non-aktif'}
                                            </span>
                                            {selectedUser.isPriority && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-pink-100 text-[#f472b6]">
                                                    <Star className="w-3 h-3 fill-current" /> Prioritas
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedUserId(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                
                                {/* Parent Info Summary */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <Baby className="w-5 h-5 text-[#f472b6] mx-auto mb-1" />
                                        <p className="text-xs text-gray-500 font-medium">Jumlah Anak</p>
                                        <p className="text-lg font-bold text-gray-800">{selectedChildren.length}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                                        <p className="text-xs text-gray-500 font-medium">Waktu Aktif</p>
                                        <p className="text-lg font-bold text-gray-800">{selectedUser.lastActive} Jam</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <Activity className="w-5 h-5 text-green-500 mx-auto mb-1" />
                                        <p className="text-xs text-gray-500 font-medium">Rata-rata Progress</p>
                                        <p className="text-lg font-bold text-gray-800">
                                            {selectedChildren.length > 0 
                                                ? Math.round(selectedChildren.reduce((sum, c) => sum + c.progress, 0) / selectedChildren.length) 
                                                : 0}%
                                        </p>
                                    </div>
                                </div>

                                {/* Children Details */}
                                <div>
                                    <h4 className="text-base font-bold text-gray-800 mb-4">Data Anak yang Terdaftar</h4>
                                    
                                    <div className="space-y-4">
                                        {selectedChildren.map((child, idx) => {
                                            const imtColor = getImtColor(child.imtStatus);
                                            return (
                                                <div key={idx} className={`border rounded-2xl overflow-hidden ${imtColor.bg} border-gray-200`}>
                                                    {/* Child Header */}
                                                    <div className="px-5 py-4 bg-white/70 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-[#f472b6]/15 flex items-center justify-center text-[#f472b6] font-bold text-sm">
                                                                {idx + 1}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-800 text-sm">{child.name}</p>
                                                                <p className="text-xs text-gray-500">{child.gender} · {child.age}</p>
                                                            </div>
                                                        </div>
                                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${imtColor.badge}`}>
                                                            IMT: {child.imtStatus}
                                                        </span>
                                                    </div>

                                                    {/* Child Stats */}
                                                    <div className="px-5 py-4 grid grid-cols-3 gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <Scale className="w-4 h-4 text-gray-400" />
                                                            <div>
                                                                <p className="text-[10px] text-gray-500 uppercase font-semibold">Berat Badan</p>
                                                                <p className="text-sm font-bold text-gray-800">{child.bb} kg</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Ruler className="w-4 h-4 text-gray-400" />
                                                            <div>
                                                                <p className="text-[10px] text-gray-500 uppercase font-semibold">Tinggi Badan</p>
                                                                <p className="text-sm font-bold text-gray-800">{child.tb} cm</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <TrendingUp className={`w-4 h-4 ${imtColor.text}`} />
                                                            <div>
                                                                <p className="text-[10px] text-gray-500 uppercase font-semibold">Skor IMT</p>
                                                                <p className={`text-sm font-bold ${imtColor.text}`}>{child.imt}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="px-5 pb-4">
                                                        <div className="flex justify-between items-center mb-1.5">
                                                            <span className="text-[10px] text-gray-500 font-semibold uppercase">Progress Intervensi</span>
                                                            <span className="text-[11px] font-bold text-[#f472b6]">{child.progress}%</span>
                                                        </div>
                                                        <div className="h-2 w-full bg-white/80 rounded-full overflow-hidden">
                                                            <div 
                                                                className="h-full bg-[#f472b6] rounded-full transition-all duration-700" 
                                                                style={{ width: `${child.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
