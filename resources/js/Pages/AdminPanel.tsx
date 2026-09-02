import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '../Components/Layout/Sidebar';
import Header from '../Components/Layout/Header';
import Badge from '../Components/Badges/Badge';
import Toast from '../Components/UI/Toast';
import {
    Shield, Star, CheckCircle, Clock, Search, X, Baby,
    TrendingUp, Ruler, Scale, Activity, ChevronDown, Eye,
    Plus, Pencil, Save, Filter
} from 'lucide-react';
import { computeBMI, getBMIStatus } from '../utils/bmi';

interface ChildDetail {
    name: string;
    age: string;
    gender: string;
    bb: string;
    tb: string;
    imt: string;
    imtStatus: string;
    progress: number;
}

interface User {
    id: number;
    name: string;
    status: 'Active' | 'Inactive';
    isPriority: boolean;
    lastActive: string;
    jumlahAnak: number;
}

type ChildrenDataMap = Record<number, ChildDetail[]>;

const computeImt = (bb: string, tb: string): { imt: string; imtStatus: string } => {
    const bmi = computeBMI(bb, tb);
    if (bmi === null) return { imt: '-', imtStatus: 'Normal' };
    const status = getBMIStatus(bmi);
    return { imt: bmi.toString(), imtStatus: status };
};

const INITIAL_CHILDREN_DATA: ChildrenDataMap = {
    1: [
        { name: 'Andi Santoso', age: '36 Bulan', gender: 'Laki-laki', bb: '14.2', tb: '95.0', imt: '15.7', imtStatus: 'Normal', progress: 75 },
        { name: 'Bunga Santoso', age: '18 Bulan', gender: 'Perempuan', bb: '9.8', tb: '78.5', imt: '15.9', imtStatus: 'Normal', progress: 40 },
    ],
    2: [{ name: 'Dina Aminah', age: '24 Bulan', gender: 'Perempuan', bb: '8.5', tb: '80.0', imt: '13.3', imtStatus: 'Kurus', progress: 60 }],
    3: [{ name: 'Fajar Salim', age: '48 Bulan', gender: 'Laki-laki', bb: '22.0', tb: '102.0', imt: '21.1', imtStatus: 'Obesitas', progress: 20 }],
    4: [
        { name: 'Gita Wati', age: '12 Bulan', gender: 'Perempuan', bb: '9.0', tb: '74.0', imt: '16.4', imtStatus: 'Normal', progress: 90 },
        { name: 'Hadi Wati', age: '42 Bulan', gender: 'Laki-laki', bb: '16.5', tb: '100.0', imt: '16.5', imtStatus: 'Normal', progress: 55 },
    ],
    5: [{ name: 'Indra Fauzi', age: '30 Bulan', gender: 'Laki-laki', bb: '15.0', tb: '90.0', imt: '18.5', imtStatus: 'Beresiko Gizi Lebih', progress: 35 }],
    6: [{ name: 'Aira Putri Mahesa', age: '24 Bulan', gender: 'Perempuan', bb: '11.5', tb: '84.0', imt: '16.3', imtStatus: 'Normal', progress: 50 }],
};

const INITIAL_USERS: User[] = [
    { id: 1, name: 'Ibu Budi Santoso', status: 'Active', isPriority: true, lastActive: '12.5', jumlahAnak: 2 },
    { id: 2, name: 'Ibu Siti Aminah', status: 'Active', isPriority: false, lastActive: '8.2', jumlahAnak: 1 },
    { id: 3, name: 'Ibu Agus Salim', status: 'Inactive', isPriority: false, lastActive: '2.0', jumlahAnak: 1 },
    { id: 4, name: 'Ibu Rina Wati', status: 'Active', isPriority: true, lastActive: '24.5', jumlahAnak: 2 },
    { id: 5, name: 'Ibu Ahmad Fauzi', status: 'Active', isPriority: false, lastActive: '5.5', jumlahAnak: 1 },
    { id: 6, name: 'Ibu Mahesa', status: 'Active', isPriority: false, lastActive: '48.0', jumlahAnak: 1 },
];

const emptyChild = (): ChildDetail => ({
    name: '', age: '', gender: 'Laki-laki', bb: '', tb: '', imt: '-', imtStatus: 'Normal', progress: 0,
});

export default function AdminPanel() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    const [childrenData, setChildrenData] = useState<ChildrenDataMap>(INITIAL_CHILDREN_DATA);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
    const [filterByActiveTime, setFilterByActiveTime] = useState(false);

    // Modal state
    const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
    const [editTarget, setEditTarget] = useState<User | null>(null);

    // Form state
    const [formName, setFormName] = useState('');
    const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');
    const [formChildren, setFormChildren] = useState<ChildDetail[]>([emptyChild()]);

    // Toast state
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'warning' | 'info' | 'error'>('info');

    const showToast = (msg: string, type: 'success' | 'warning' | 'info' | 'error' = 'info') => {
        setToastMessage(msg);
        setToastType(type);
        setIsToastOpen(true);
    };

    const openAddModal = () => {
        setFormName('');
        setFormStatus('Active');
        setFormChildren([emptyChild()]);
        setEditTarget(null);
        setModalMode('add');
    };

    const openEditModal = (user: User) => {
        setFormName(user.name);
        setFormStatus(user.status);
        const existing = childrenData[user.id] || [];
        setFormChildren(existing.length > 0 ? existing.map(c => ({ ...c })) : [emptyChild()]);
        setEditTarget(user);
        setModalMode('edit');
    };

    const closeModal = () => {
        setModalMode(null);
        setEditTarget(null);
    };

    const handleChildCount = (count: number) => {
        if (count < 1 || count > 5) return;
        setFormChildren(prev => {
            if (count > prev.length) {
                return [...prev, ...Array(count - prev.length).fill(null).map(emptyChild)];
            }
            return prev.slice(0, count);
        });
    };

    const updateFormChild = (idx: number, field: keyof ChildDetail, value: string) => {
        setFormChildren(prev => {
            const next = [...prev];
            next[idx] = { ...next[idx], [field]: value };
            if (field === 'bb' || field === 'tb') {
                const bb = field === 'bb' ? value : next[idx].bb;
                const tb = field === 'tb' ? value : next[idx].tb;
                const computed = computeImt(bb, tb);
                next[idx] = { ...next[idx], ...computed };
            }
            return next;
        });
    };

    const handleSave = () => {
        if (!formName.trim()) return;
        if (modalMode === 'add') {
            const newId = Math.max(...users.map(u => u.id)) + 1;
            const newUser: User = {
                id: newId,
                name: formName.trim(),
                status: formStatus,
                isPriority: false,
                lastActive: '0.0',
                jumlahAnak: formChildren.length,
            };
            setUsers(prev => [...prev, newUser]);
            setChildrenData(prev => ({ ...prev, [newId]: formChildren }));
            showToast(`Pengguna "${formName.trim()}" dan ${formChildren.length} profil anak berhasil ditambahkan!`, 'success');
        } else if (modalMode === 'edit' && editTarget) {
            setUsers(prev => prev.map(u =>
                u.id === editTarget.id
                    ? { ...u, name: formName.trim(), status: formStatus, jumlahAnak: formChildren.length }
                    : u
            ));
            setChildrenData(prev => ({ ...prev, [editTarget.id]: formChildren }));
            showToast(`Data "${formName.trim()}" berhasil diperbarui!`, 'success');
        }
        closeModal();
    };

    const togglePriority = (userId: number) => {
        setUsers(users.map(u => {
            if (u.id === userId) {
                const nextPriority = !u.isPriority;
                showToast(`Prioritas ${u.name} ${nextPriority ? 'diaktifkan' : 'dinonaktifkan'}.`, 'info');
                return { ...u, isPriority: nextPriority };
            }
            return u;
        }));
    };

    const prioritizeAllFiltered = () => {
        const ids = new Set(filteredUsers.map(u => u.id));
        setUsers(prev => prev.map(u => ids.has(u.id) ? { ...u, isPriority: true } : u));
        showToast('Semua pengguna dalam filter berhasil dijadikan prioritas!', 'success');
    };

    const filteredUsers = users
        .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(u => !filterByActiveTime || parseFloat(u.lastActive) >= 10);

    const allFilteredArePriority = filteredUsers.length > 0 && filteredUsers.every(u => u.isPriority);
    const activeUsersCount = users.filter(u => u.status === 'Active').length;
    const priorityUsersCount = users.filter(u => u.isPriority).length;

    const selectedUser = selectedUserId ? users.find(u => u.id === selectedUserId) : null;
    const selectedChildren = selectedUserId ? (childrenData[selectedUserId] || []) : [];

    const getImtBadgeVariant = (status: string): 'success' | 'info' | 'warning' | 'danger' => {
        if (status === 'Normal') return 'success';
        if (status === 'Kurus') return 'info';
        if (status === 'Beresiko Gizi Lebih') return 'warning';
        return 'danger';
    };

    const renderFormModal = () => {
        if (!modalMode) return null;
        const isEdit = modalMode === 'edit';

        return (
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[200] flex items-center justify-center p-4"
                onClick={closeModal}
            >
                <div
                    className="bg-card rounded-2xl w-full max-w-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-3 border-black overflow-hidden relative max-h-[92vh] flex flex-col select-none"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="bg-primary p-5 flex justify-between items-center border-b-3 border-black text-black shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                {isEdit ? <Pencil className="w-5 h-5" strokeWidth={2.5} /> : <Plus className="w-5 h-5" strokeWidth={3} />}
                            </div>
                            <div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-black">
                                    {isEdit ? `Edit Akun — ${editTarget?.name}` : 'Tambah Akun Pengguna Baru'}
                                </h3>
                                <p className="text-xs font-bold text-black/70 uppercase tracking-wide">Perubahan akan langsung tersimpan ke data pengguna</p>
                            </div>
                        </div>
                        <button onClick={closeModal} className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer">
                            <X className="w-5 h-5 stroke-black" strokeWidth={3} />
                        </button>
                    </div>

                    {/* Scrollable body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-sidebar">
                        {/* Nama & Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-black text-black dark:text-white uppercase tracking-wide pl-1">Nama Orang Tua</label>
                                <input
                                    type="text"
                                    value={formName}
                                    onChange={e => setFormName(e.target.value)}
                                    placeholder="Contoh: Ibu Budi Santoso"
                                    className="w-full bg-card border-2 border-black rounded-xl px-4 py-2.5 text-sm font-bold text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-black text-black dark:text-white uppercase tracking-wide pl-1">Status Akun</label>
                                <select
                                    value={formStatus}
                                    onChange={e => setFormStatus(e.target.value as 'Active' | 'Inactive')}
                                    className="w-full bg-card border-2 border-black rounded-xl px-4 py-2.5 text-sm font-bold text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none cursor-pointer"
                                >
                                    <option value="Active">Aktif</option>
                                    <option value="Inactive">Non-aktif</option>
                                </select>
                            </div>
                        </div>

                        {/* Jumlah Anak Stepper */}
                        <div className="space-y-2">
                            <label className="text-xs font-black text-black dark:text-white uppercase tracking-wide pl-1">Jumlah Anak</label>
                            <div className="flex items-center gap-4 bg-card rounded-xl px-4 py-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <button
                                    type="button"
                                    onClick={() => handleChildCount(formChildren.length - 1)}
                                    disabled={formChildren.length <= 1}
                                    className="w-9 h-9 rounded-lg bg-muted border-2 border-black flex items-center justify-center text-foreground font-black text-xl shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] disabled:opacity-30 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                                >−</button>
                                <span className="flex-1 text-center font-black text-2xl text-black dark:text-white">{formChildren.length}</span>
                                <button
                                    type="button"
                                    onClick={() => handleChildCount(formChildren.length + 1)}
                                    disabled={formChildren.length >= 5}
                                    className="w-9 h-9 rounded-lg bg-success border-2 border-black flex items-center justify-center text-black font-black text-xl shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] disabled:opacity-30 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                                >+</button>
                            </div>
                        </div>

                        {/* Child Forms */}
                        <div className="space-y-4">
                            {formChildren.map((child, idx) => (
                                <div key={idx} className="bg-card rounded-2xl border-3 border-black p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-black/10">
                                        <div className="w-7 h-7 rounded-lg bg-success border-2 border-black flex items-center justify-center text-black font-black text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                            {idx + 1}
                                        </div>
                                        <h4 className="font-black text-black dark:text-white uppercase text-sm">Data Anak {idx + 1}</h4>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="sm:col-span-2 space-y-1">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase pl-1">Nama Anak</label>
                                            <input
                                                type="text"
                                                value={child.name}
                                                onChange={e => updateFormChild(idx, 'name', e.target.value)}
                                                placeholder="Nama lengkap anak"
                                                className="w-full border-2 border-black rounded-lg px-3 py-2 text-sm font-bold bg-sidebar outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase pl-1">Usia</label>
                                            <input
                                                type="text"
                                                value={child.age}
                                                onChange={e => updateFormChild(idx, 'age', e.target.value)}
                                                placeholder="Contoh: 24 Bulan"
                                                className="w-full border-2 border-black rounded-lg px-3 py-2 text-sm font-bold bg-sidebar outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase pl-1">Jenis Kelamin</label>
                                            <select
                                                value={child.gender}
                                                onChange={e => updateFormChild(idx, 'gender', e.target.value)}
                                                className="w-full border-2 border-black rounded-lg px-3 py-2 text-sm font-bold bg-sidebar outline-none cursor-pointer"
                                            >
                                                <option>Laki-laki</option>
                                                <option>Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase pl-1">Berat Badan (kg)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={child.bb}
                                                onChange={e => updateFormChild(idx, 'bb', e.target.value)}
                                                placeholder="Contoh: 12.5"
                                                className="w-full border-2 border-black rounded-lg px-3 py-2 text-sm font-bold bg-sidebar outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase pl-1">Tinggi Badan (cm)</label>
                                            <input
                                                type="number"
                                                step="1"
                                                value={child.tb}
                                                onChange={e => updateFormChild(idx, 'tb', e.target.value)}
                                                placeholder="Contoh: 85"
                                                className="w-full border-2 border-black rounded-lg px-3 py-2 text-sm font-bold bg-sidebar outline-none"
                                            />
                                        </div>
                                        {child.bb && child.tb && (
                                            <div className="sm:col-span-2">
                                                <div className="flex items-center gap-2 p-2.5 rounded-lg border-2 border-black bg-card-subtle text-xs font-black uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                                    <TrendingUp className="w-4 h-4 stroke-[3]" />
                                                    IMT Otomatis: {child.imt} — {child.imtStatus}
                                                </div>
                                            </div>
                                        )}
                                        <div className="sm:col-span-2 space-y-1 pt-1">
                                            <div className="flex justify-between">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase">Progress Intervensi</label>
                                                <span className="text-xs font-black text-primary">{child.progress}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="1"
                                                value={child.progress}
                                                onChange={e => updateFormChild(idx, 'progress', e.target.value)}
                                                className="w-full accent-black cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-5 border-t-3 border-black flex justify-end gap-3 shrink-0 bg-card">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-5 py-2.5 rounded-xl border-2 border-black bg-card text-xs font-black uppercase text-foreground hover:bg-card-subtle active:translate-x-[1px] active:translate-y-[1px] active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={!formName.trim()}
                            className="bg-success text-black border-2 border-black px-6 py-2.5 rounded-xl text-xs font-black uppercase flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-40 cursor-pointer transition-all"
                        >
                            <Save className="w-4 h-4 stroke-[2.5]" />
                            {isEdit ? 'Simpan Perubahan' : 'Tambah Pengguna'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background flex w-full font-sans select-none">
            <Head title="Admin Panel - EmoGROW" />
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1200px] mx-auto space-y-8">

                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap">
                            <div className="min-w-0 flex-1">
                                <p className="text-primary text-[10px] font-black tracking-wider uppercase mb-1">Halaman Administrator</p>
                                <h1 className="text-black dark:text-white text-3xl md:text-4xl font-black uppercase tracking-tight">Manajemen Pengguna</h1>
                            </div>
                            <button
                                onClick={openAddModal}
                                className="shrink-0 flex items-center gap-2 bg-primary text-black border-2 border-black px-5 py-2.5 rounded-xl text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all self-start md:self-auto cursor-pointer"
                            >
                                <Plus className="w-4 h-4" strokeWidth={3} /> Tambah Pengguna
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-card p-6 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
                                <div className="w-12 h-12 bg-info text-white border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <Shield className="w-6 h-6" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Total Pengguna</p>
                                    <h3 className="text-2xl font-black text-black dark:text-white tracking-tight">{users.length}</h3>
                                </div>
                            </div>
                            <div className="bg-card p-6 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
                                <div className="w-12 h-12 bg-success text-black border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle className="w-6 h-6" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Pengguna Aktif</p>
                                    <h3 className="text-2xl font-black text-black dark:text-white tracking-tight">{activeUsersCount}</h3>
                                </div>
                            </div>
                            <div className="bg-card p-6 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary text-black border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <Star className="w-6 h-6 fill-black" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Prioritas Tinggi</p>
                                    <h3 className="text-2xl font-black text-black dark:text-white tracking-tight">{priorityUsersCount}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Table Card */}
                        <div className="bg-card rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">

                            {/* Toolbar */}
                            <div className="p-6 border-b-3 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card">
                                <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white">Daftar Orang Tua / Ibu</h3>
                                <div className="flex flex-wrap items-center gap-3">
                                    {/* Search */}
                                    <div className="relative">
                                        <Search className="w-4 h-4 text-foreground absolute left-3.5 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
                                        <input
                                            type="text"
                                            placeholder="Cari nama..."
                                            value={searchQuery}
                                            onChange={e => setSearchQuery(e.target.value)}
                                            className="pl-10 pr-4 py-2 bg-background border-2 border-black rounded-xl text-sm font-bold text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none w-full sm:w-52"
                                        />
                                    </div>

                                    {/* Filter ≥10 jam */}
                                    <button
                                        onClick={() => setFilterByActiveTime(prev => !prev)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-nowrap cursor-pointer ${filterByActiveTime
                                                ? 'bg-primary text-black translate-x-[-1px] translate-y-[-1px]'
                                                : 'bg-card text-foreground hover:bg-card-subtle'
                                            }`}
                                    >
                                        <Filter className="w-3.5 h-3.5" strokeWidth={3} />
                                        ≥ 10 jam aktif
                                        {filterByActiveTime && (
                                            <span className="ml-1 bg-black text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                                                {filteredUsers.length}
                                            </span>
                                        )}
                                    </button>

                                    {/* Prioritaskan Semua */}
                                    {filterByActiveTime && (
                                        <button
                                            onClick={prioritizeAllFiltered}
                                            disabled={filteredUsers.length === 0 || allFilteredArePriority}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap cursor-pointer"
                                            title={allFilteredArePriority ? 'Semua sudah diprioritaskan' : 'Tandai semua hasil filter sebagai prioritas'}
                                        >
                                            <Star className="w-3.5 h-3.5 fill-black" />
                                            Prioritaskan Semua
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-card-subtle border-b-3 border-black text-black dark:text-white">
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">Nama Orang Tua</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">Jumlah Anak</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">Waktu Aktif</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-center">Prioritas</th>
                                            <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y-2 divide-black/10">
                                        {filteredUsers.map(user => {
                                            const isExpanded = expandedUserId === user.id;
                                            const childrenForUser = childrenData[user.id] || [];
                                            const isHighActive = parseFloat(user.lastActive) >= 10;

                                            return (
                                                <React.Fragment key={user.id}>
                                                    <tr
                                                        className={`hover:bg-card-subtle transition-colors cursor-pointer ${isExpanded ? 'bg-card-subtle' : ''}`}
                                                        onClick={() => setExpandedUserId(isExpanded ? null : user.id)}
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-xl bg-primary border-2 border-black flex items-center justify-center text-black font-black uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] shrink-0">
                                                                    {user.name.charAt(4) || 'U'}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-black text-black dark:text-white text-sm uppercase">{user.name}</span>
                                                                    <ChevronDown className={`w-4 h-4 text-black transition-transform ${isExpanded ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-1.5 text-xs font-black text-black dark:text-white uppercase">
                                                                <Baby className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
                                                                {childrenForUser.length} Anak
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <Badge variant={user.status === 'Active' ? 'success' : 'netral'}>
                                                                {user.status === 'Active' ? 'Aktif' : 'Non-aktif'}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-1.5">
                                                                <Clock className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
                                                                <span className="text-xs font-black text-black dark:text-white">
                                                                    {user.lastActive} Jam
                                                                </span>
                                                                {isHighActive && (
                                                                    <span className="bg-primary text-black border border-black px-1.5 py-0.5 rounded text-[9px] font-black uppercase">
                                                                        ≥10j
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <button
                                                                onClick={e => { e.stopPropagation(); togglePriority(user.id); }}
                                                                className={`p-1.5 rounded-lg border-2 border-black transition-all cursor-pointer ${
                                                                    user.isPriority 
                                                                        ? 'bg-warning text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]' 
                                                                        : 'bg-card text-muted-foreground hover:text-foreground shadow-none'
                                                                }`}
                                                                title={user.isPriority ? 'Hapus dari Prioritas' : 'Jadikan Prioritas'}
                                                            >
                                                                <Star className={`w-4 h-4 ${user.isPriority ? 'fill-black' : ''}`} strokeWidth={2.5} />
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <button
                                                                onClick={e => { e.stopPropagation(); openEditModal(user); }}
                                                                className="p-1.5 rounded-lg border-2 border-black bg-card text-foreground hover:bg-card-subtle shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                                                                title="Edit pengguna"
                                                            >
                                                                <Pencil className="w-4 h-4" strokeWidth={2.5} />
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    {isExpanded && (
                                                        <tr>
                                                            <td colSpan={6} className="px-6 py-5 bg-card-subtle border-t-2 border-black/20">
                                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                                    <div className="flex flex-wrap gap-3">
                                                                        {childrenForUser.map((child, idx) => (
                                                                            <div key={idx} className="flex items-center gap-2.5 bg-card rounded-xl p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                                                <div className="w-7 h-7 rounded-lg bg-primary border-2 border-black flex items-center justify-center text-black font-black text-xs">
                                                                                    {idx + 1}
                                                                                </div>
                                                                                <div>
                                                                                    <p className="text-xs font-black uppercase text-black dark:text-white">{child.name}</p>
                                                                                    <div className="flex items-center gap-2 mt-0.5">
                                                                                        <span className="text-[10px] font-extrabold text-muted-foreground uppercase">{child.age}</span>
                                                                                        <Badge variant={getImtBadgeVariant(child.imtStatus)}>
                                                                                            {child.imtStatus}
                                                                                        </Badge>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="flex gap-2 shrink-0">
                                                                        <button
                                                                            onClick={e => { e.stopPropagation(); openEditModal(user); }}
                                                                            className="border-2 border-black bg-card text-foreground hover:bg-card-subtle px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                                                                        >
                                                                            <Pencil className="w-3.5 h-3.5" strokeWidth={2.5} /> Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={e => { e.stopPropagation(); setSelectedUserId(user.id); }}
                                                                            className="bg-success text-black border-2 border-black px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                                                                        >
                                                                            <Eye className="w-3.5 h-3.5" strokeWidth={2.5} /> Lihat Detail
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}

                                        {filteredUsers.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-12 text-center">
                                                    <p className="text-xs font-black uppercase text-muted-foreground">
                                                        {filterByActiveTime
                                                            ? 'Tidak ada pengguna dengan waktu aktif ≥ 10 jam.'
                                                            : `Tidak ada pengguna yang cocok dengan "${searchQuery}"`
                                                        }
                                                    </p>
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
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] flex items-center justify-center p-4" onClick={() => setSelectedUserId(null)}>
                        <div className="bg-card rounded-2xl w-full max-w-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-3 border-black overflow-hidden relative max-h-[90vh] flex flex-col select-none" onClick={e => e.stopPropagation()}>
                            <div className="bg-primary p-6 flex justify-between items-center border-b-3 border-black text-black shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-black font-black text-xl uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        {selectedUser.name.charAt(4) || 'U'}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase tracking-tight text-black">{selectedUser.name}</h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <Badge variant={selectedUser.status === 'Active' ? 'success' : 'netral'}>
                                                {selectedUser.status === 'Active' ? 'Aktif' : 'Non-aktif'}
                                            </Badge>
                                            {selectedUser.isPriority && (
                                                <Badge variant="warning">
                                                    <Star className="w-3 h-3 fill-black mr-1" /> Prioritas
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => { setSelectedUserId(null); openEditModal(selectedUser); }}
                                        className="flex items-center gap-1.5 bg-white border-2 border-black text-black hover:bg-yellow-50 px-3 py-1.5 rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                                    >
                                        <Pencil className="w-3.5 h-3.5" strokeWidth={2.5} /> Edit
                                    </button>
                                    <button onClick={() => setSelectedUserId(null)} className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer">
                                        <X className="w-5 h-5 stroke-black" strokeWidth={3} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-sidebar">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-card rounded-xl border-2 border-black p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Baby className="w-5 h-5 text-foreground mx-auto mb-1" strokeWidth={2.5} />
                                        <p className="text-[10px] font-black uppercase text-muted-foreground">Jumlah Anak</p>
                                        <p className="text-xl font-black text-black dark:text-white mt-0.5">{selectedChildren.length}</p>
                                    </div>
                                    <div className="bg-card rounded-xl border-2 border-black p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Clock className="w-5 h-5 text-foreground mx-auto mb-1" strokeWidth={2.5} />
                                        <p className="text-[10px] font-black uppercase text-muted-foreground">Waktu Aktif</p>
                                        <p className="text-xl font-black text-black dark:text-white mt-0.5">{selectedUser.lastActive} Jam</p>
                                    </div>
                                    <div className="bg-card rounded-xl border-2 border-black p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Activity className="w-5 h-5 text-foreground mx-auto mb-1" strokeWidth={2.5} />
                                        <p className="text-[10px] font-black uppercase text-muted-foreground">Progress</p>
                                        <p className="text-xl font-black text-primary mt-0.5">
                                            {selectedChildren.length > 0 ? Math.round(selectedChildren.reduce((a, b) => a + b.progress, 0) / selectedChildren.length) : 0}%
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-black uppercase tracking-tight text-black dark:text-white">Detail Pertumbuhan Anak</h4>
                                    {selectedChildren.map((child, idx) => (
                                        <div key={idx} className="bg-card rounded-2xl border-3 border-black p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-4">
                                            <div className="flex justify-between items-center pb-3 border-b-2 border-black/10">
                                                <div>
                                                    <h5 className="font-black uppercase text-black dark:text-white text-base">{child.name}</h5>
                                                    <p className="text-xs font-bold text-muted-foreground uppercase">{child.age} · {child.gender}</p>
                                                </div>
                                                <Badge variant={getImtBadgeVariant(child.imtStatus)}>
                                                    {child.imtStatus}
                                                </Badge>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="bg-sidebar rounded-xl border-2 border-black p-3 text-center">
                                                    <p className="text-[10px] font-black uppercase text-muted-foreground">Berat</p>
                                                    <p className="text-base font-black text-black dark:text-white">{child.bb} kg</p>
                                                </div>
                                                <div className="bg-sidebar rounded-xl border-2 border-black p-3 text-center">
                                                    <p className="text-[10px] font-black uppercase text-muted-foreground">Tinggi</p>
                                                    <p className="text-base font-black text-black dark:text-white">{child.tb} cm</p>
                                                </div>
                                                <div className="bg-sidebar rounded-xl border-2 border-black p-3 text-center">
                                                    <p className="text-[10px] font-black uppercase text-muted-foreground">IMT</p>
                                                    <p className="text-base font-black text-black dark:text-white">{child.imt}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-1 pt-1">
                                                <div className="flex justify-between text-xs font-black uppercase">
                                                    <span>Progress Intervensi</span>
                                                    <span className="text-primary">{child.progress}%</span>
                                                </div>
                                                <div className="w-full bg-muted border-2 border-black h-3.5 rounded-full overflow-hidden p-0.5">
                                                    <div className="bg-success h-full rounded-full transition-all duration-500" style={{ width: `${child.progress}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Toast 
                    message={toastMessage}
                    type={toastType}
                    isOpen={isToastOpen}
                    onClose={() => setIsToastOpen(false)}
                />
            </div>
        </div>
    );
}