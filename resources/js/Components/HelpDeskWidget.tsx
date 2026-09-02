import React, { useState, useEffect, useRef } from 'react';
import { X, Bot, Send, MessageCircle } from 'lucide-react';
import { router } from '@inertiajs/react';

const faqs = [
    { question: "Bagaimana cara melihat laporan evaluasi?", answer: "Anda dapat melihat laporan evaluasi perkembangan anak melalui menu 'Laporan Evaluasi' pada sidebar di sebelah kiri." },
    { question: "Apa itu Screening Anak?", answer: "Screening Anak adalah fitur untuk memeriksa pertumbuhan antropometri (IMT) dan milestone motorik anak Anda secara berkala." },
    { question: "Bagaimana cara mengisi aktivitas harian?", answer: "Masuk ke menu 'Aktivitas', pilih aktivitas yang tersedia hari ini, lalu klik 'Mulai Sesi' untuk menyelesaikan panduan stimulasi." },
];

export default function HelpDeskWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Halo Ibu/Bapak! Saya Asisten EmoGROW. Ada yang bisa saya bantu terkait tumbuh kembang si kecil?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [currentPath, setCurrentPath] = useState(() => 
        typeof window !== 'undefined' ? window.location.pathname : '/'
    );
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updatePath = () => setCurrentPath(window.location.pathname);
        
        let removeNavigateListener: (() => void) | undefined;
        try {
            removeNavigateListener = router.on('navigate', () => {
                setCurrentPath(window.location.pathname);
            });
        } catch (e) {
            // fallback
        }

        window.addEventListener('popstate', updatePath);

        return () => {
            if (removeNavigateListener) removeNavigateListener();
            window.removeEventListener('popstate', updatePath);
        };
    }, []);

    // Sembunyikan widget di halaman login, register, dan auth
    const isAuthPage = currentPath.startsWith('/login') || currentPath.startsWith('/register') || currentPath.startsWith('/auth');

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    if (isAuthPage) return null;

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const newMsg = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInputValue("");

        const faqMatch = faqs.find(f => f.question === text);

        setTimeout(() => {
            setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                text: faqMatch ? faqMatch.answer : "Terima kasih atas pertanyaannya. Tim spesialis tumbuh kembang EmoGROW akan merespons pertanyaan Anda sesegera mungkin.", 
                sender: 'ai' 
            }]);
        }, 500);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend(inputValue);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans select-none">
            {/* Jendela Obrolan */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-[360px] bg-card rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-3 border-black overflow-hidden flex flex-col origin-bottom-right animate-in fade-in zoom-in-95 duration-200">
                    {/* Header */}
                    <div className="bg-primary p-4 flex items-center justify-between text-black border-b-3 border-black">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                <Bot className="w-5 h-5 text-black" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="font-black text-sm uppercase tracking-tight leading-tight">Asisten EmoGROW</h3>
                                <p className="text-[10px] text-black font-extrabold uppercase tracking-wide">Bantuan Cepat & Panduan</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="bg-white text-black border-2 border-black p-1.5 rounded-xl hover:bg-yellow-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                            aria-label="Tutup Bantuan"
                        >
                            <X className="w-4 h-4" strokeWidth={3} />
                        </button>
                    </div>

                    {/* Area Pesan */}
                    <div className="h-[320px] p-4 overflow-y-auto bg-sidebar flex flex-col gap-3">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3.5 text-xs md:text-sm font-bold leading-relaxed rounded-2xl ${
                                    msg.sender === 'user' 
                                    ? 'bg-primary text-black border-2 border-black rounded-br-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                                    : 'bg-card border-2 border-black text-foreground rounded-bl-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* List FAQ */}
                        {messages.length < 3 && (
                            <div className="mt-2 flex flex-col gap-2">
                                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider px-1">Pertanyaan Umum:</span>
                                {faqs.map((faq, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => handleSend(faq.question)}
                                        className="text-left text-xs bg-card hover:bg-card-subtle text-foreground border-2 border-black p-2.5 rounded-xl transition-all font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                                    >
                                        {faq.question}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Area Input */}
                    <div className="p-3 bg-card border-t-3 border-black">
                        <form onSubmit={onSubmit} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ketik pertanyaan Anda..."
                                className="w-full bg-background border-2 border-black rounded-xl py-2 px-3.5 text-xs md:text-sm font-bold text-foreground placeholder:text-muted-foreground/60 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none"
                            />
                            <button 
                                type="submit" 
                                disabled={!inputValue.trim()}
                                className={`p-2.5 rounded-xl border-2 border-black transition-all flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                    inputValue.trim() 
                                    ? 'bg-success text-black hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer' 
                                    : 'bg-muted text-muted-foreground/60 border-black/40 cursor-not-allowed'
                                }`}
                                aria-label="Kirim Pesan"
                            >
                                <Send className="w-4 h-4" strokeWidth={2.5} />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Tombol Buka/Tutup */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-14 h-14 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all z-50 cursor-pointer ${
                    isOpen ? 'bg-black text-white' : 'bg-primary text-black'
                }`}
                aria-label={isOpen ? "Tutup Help Desk" : "Buka Help Desk"}
            >
                {isOpen ? <X className="w-6 h-6" strokeWidth={3} /> : <MessageCircle className="w-6 h-6" strokeWidth={2.5} />}
            </button>
        </div>
    );
}
