import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Floating button */}
            {!isOpen && (
                <button
                    className="fixed bottom-8 right-8 z-50 shadow-lg rounded-full bg-gradient-to-br from-[#A084FF] to-[#6F4FFF] w-16 h-16 flex items-center justify-center cursor-pointer"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open chat"
                >
                    <img src={assets.chatbot_icon} alt="Chatbot" className="w-8 h-8" />
                </button>
            )}

            {/* Chatbot modal */}
            {isOpen && (
                <div className="fixed bottom-8 right-8 z-50 w-[370px] max-w-[95vw] bg-[#F7F3FF] border-2 border-[#A084FF] rounded-2xl shadow-2xl flex flex-col">
                    {/* Header */}
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
                    {/* Description */}
                    <div className="px-6 pb-2 text-base text-[#232136]">
                        Ask about plans, features, or get quick tips on using your wallet!
                    </div>
                    {/* Chat area */}
                    <div className="bg-white rounded-xl mx-4 my-3 p-4 min-h-[100px] flex flex-col gap-3">
                        <div className="flex items-start gap-2">
                            <img src={assets.gluu_bot_icon} alt="GluuBot" className="mt-1" />
                            <div className="bg-[#F3EBFF] text-black px-4 py-2 rounded-lg text-sm">
                                Hi! I’m GluuBot. How can I help you today?
                            </div>
                        </div>
                    </div>
                    {/* Input */}
                    <form className="flex items-center gap-2 px-4 pb-4">
                        <input
                            type="text"
                            placeholder="Type your question..."
                            className="flex-1 rounded-lg border border-[#E0D7F7] px-3 py-2 text-sm focus:outline-none focus:border-[#A084FF] bg-[#F7F3FF]"
                            disabled
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-b from-[#5E38BD] to-[#A25EFF] p-2 rounded-lg text-white"
                            disabled
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