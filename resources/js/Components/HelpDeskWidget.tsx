import React, { useState, useEffect, useRef } from 'react';
import { X, Bot, Send, HelpCircle } from 'lucide-react';

const faqs = [
    { question: "Bagaimana cara melihat laporan evaluasi?", answer: "Anda dapat melihat laporan evaluasi melalui menu 'Laporan Evaluasi' di sidebar sebelah kiri." },
    { question: "Apa itu Screening Anak?", answer: "Screening Anak adalah fitur untuk memeriksa perkembangan awal anak Anda melalui beberapa pertanyaan observasi." },
    { question: "Bagaimana cara mengisi data aktivitas?", answer: "Masuk ke menu 'Aktivitas', lalu klik tombol untuk mencatat jadwal tidur, makan, atau stimulasi pada hari ini." },
];

export default function HelpDeskWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Halo! Saya Asisten Help Desk EmoGrow. Ada yang bisa saya bantu?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.location.pathname === '/login') {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [window.location.pathname]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    if (!isVisible) return null;

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        // Tambah pesan dari user
        const newMsg = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInputValue("");

        // Cek jika pesannya persis dengan salah satu FAQ
        const faqMatch = faqs.find(f => f.question === text);

        setTimeout(() => {
            setMessages(prev => [...prev, { 
                id: Date.now(), 
                text: faqMatch ? faqMatch.answer : "Pesan Anda telah diterima. Tim kami akan merespons pertanyaan Anda sesegera mungkin.", 
                sender: 'ai' 
            }]);
        }, 600);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend(inputValue);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans">
            {/* Jendela Obrolan */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-[350px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden flex flex-col origin-bottom-right transition-all duration-200">
                    {/* Header Simpel */}
                    <div className="bg-[#f472b6] p-3.5 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5" />
                            <h3 className="font-semibold text-sm">Help Desk</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Area Pesan */}
                    <div className="h-[320px] p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 text-sm rounded-lg ${
                                    msg.sender === 'user' 
                                    ? 'bg-[#f472b6] text-white rounded-br-none' 
                                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* List FAQ - Muncul jika belum banyak obrolan */}
                        {messages.length < 3 && (
                            <div className="mt-2 flex flex-col gap-2">
                                <span className="text-xs text-gray-500 font-medium px-1">FAQ (Paling sering ditanyakan):</span>
                                {faqs.map((faq, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => handleSend(faq.question)}
                                        className="text-left text-xs bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 p-2.5 rounded-lg transition-colors shadow-sm"
                                    >
                                        {faq.question}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Area Input */}
                    <div className="p-3 bg-white border-t border-gray-200">
                        <form onSubmit={onSubmit} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Tulis pesan..."
                                className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#f472b6] focus:ring-1 focus:ring-[#f472b6] rounded-md py-2 px-3 text-sm transition-all outline-none"
                            />
                            <button 
                                type="submit" 
                                disabled={!inputValue.trim()}
                                className={`p-2 rounded-md transition-all flex items-center justify-center ${
                                    inputValue.trim() 
                                    ? 'bg-[#f472b6] text-white hover:bg-[#e85a9f]' 
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Tombol Buka/Tutup */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg text-white transition-transform duration-200 hover:scale-105 z-50 ${
                    isOpen ? 'bg-gray-800' : 'bg-[#f472b6]'
                }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <HelpCircle className="w-7 h-7" />}
            </button>
        </div>
    );
}
