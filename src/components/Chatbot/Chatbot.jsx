import React, { useState, useRef } from 'react'
import { assets } from '../../assets/assets'

const DIFy_API_URL = 'https://api.dify.ai/v1/chat-messages';
const DIFy_API_KEY = 'app-Dg1g7emOvC9iUBA6D2Riqz9N';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null)

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(DIFy_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DIFy_API_KEY}`
                },
                body: JSON.stringify({
                    inputs: {},
                    query: input,
                    response_mode: 'blocking',
                    user: 'gluu-test-user' // 🔧 required!
                })
            });

            const data = await res.json();
            console.log('Dify response:', data);

            const botMsg = {
                role: 'assistant',
                content: data.answer || 'Sorry, I could not get a response.'
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to GluuBot.' }]);
        } finally {
            setLoading(false);
        }
    };

    const fetchWelcomeMessage = async () => {
        setLoading(true);
        try {
            const res = await fetch(DIFy_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DIFy_API_KEY}`
                },
                body: JSON.stringify({
                    inputs: {},
                    query: 'Hello', // ✅ Send a default trigger query
                    response_mode: 'blocking',
                    user: 'gluu-test-user'
                })
            });

            const data = await res.json();
            console.log("Welcome Message:", data);

            setMessages([{
                role: 'assistant',
                content: data.answer || 'Hello! How can I help you today?'
            }]);
        } catch (err) {
            console.error(err);
            setMessages([{
                role: 'assistant',
                content: 'Error loading welcome message.'
            }]);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {/* floating button */}
            {!isOpen && (
                <button
                    className="fixed bottom-8 right-8 z-50 shadow-lg rounded-full bg-gradient-to-br from-[#A084FF] to-[#6F4FFF] w-16 h-16 flex items-center justify-center cursor-pointer"
                    // onClick={() => setIsOpen(true)}
                    onClick={() => {
                        setIsOpen(true);
                        if (messages.length === 0) fetchWelcomeMessage();
                    }}
                    aria-label="Open chat"
                >
                    <img src={assets.chatbot_icon} alt="Chatbot" className="w-8 h-8" />
                </button>
            )}

            {/* chatbot modal */}
            {isOpen && (
                <div className="fixed bottom-8 right-8 z-50 w-[370px] max-w-[95vw] bg-[#F7F3FF] border-2 border-[#A084FF] rounded-2xl shadow-2xl flex flex-col">
                    {/* header */}
                    <div className="flex items-center justify-between px-6 py-4 rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <img src={assets.gluu_bot_icon} alt="GluuBot" />
                            <span className="font-bold text-lg text-[#5E38BD]">Chat with GluuBot</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-[#7C3AED] hover:text-[#5E38BD] text-2xl font-bold cursor-pointer"
                            aria-label="Close chat"
                        >
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    {/* description */}
                    <div className="px-6 pb-2 text-base text-[#232136]">
                        Ask about plans, features, or get quick tips on using your wallet!
                    </div>
                    {/* chat area */}
                    <div className="bg-white rounded-xl mx-4 my-3 p-4 min-h-[100px] flex flex-col gap-3 max-h-72 overflow-y-auto">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                {msg.role === 'assistant' && <img src={assets.gluu_bot_icon} alt="GluuBot" className="mt-1" />}
                                <div className={`${msg.role === 'assistant' ? 'bg-[#F3EBFF] text-black' : 'bg-[#A084FF] text-white'} px-4 py-2 rounded-lg text-sm max-w-[80%]`}>
                                    {msg.content}
                                </div>
                                {msg.role === 'user' && <img src={assets.chatbot_icon} alt="You" className="mt-1 w-6 h-6" />}
                            </div>
                        ))}
                        {loading && (
                            <div className="flex items-start gap-2">
                                <img src={assets.gluu_bot_icon} alt="GluuBot" className="mt-1" />
                                <div className="bg-[#F3EBFF] text-black px-4 py-2 rounded-lg text-sm animate-pulse">GluuBot is typing...</div>
                            </div>
                        )}
                    </div>
                    {/* input */}
                    <form className="flex items-center gap-2 px-4 pb-4" onSubmit={sendMessage}>
                        <input
                            type="text"
                            placeholder="Type your question..."
                            className="flex-1 rounded-lg border border-[#E0D7F7] px-3 py-2 text-sm focus:outline-none focus:border-[#A084FF] bg-[#F7F3FF]"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            disabled={loading}
                            ref={inputRef}
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-b from-[#5E38BD] to-[#A25EFF] p-2 rounded-lg text-white disabled:opacity-50"
                            disabled={loading || !input.trim()}
                        >
                            <svg width="24" height="24" fill="none" viewBox="0 0 20 20">
                                <path d="M3.5 10L16.5 4L13.5 17L10 12.5L3.5 10Z" fill="currentColor" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default Chatbot