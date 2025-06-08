import React from 'react'
import { assets } from '../../assets/assets'

const Modal = ({ open, title, message, onClose, onConfirm }) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(213,213,213,0.23)' }}
        >
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative border-2 border-[#5E38BD]">
                <button
                    className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 cursor-pointer"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="flex items-center mb-4">
                    <span className="mr-2 flex items-center">
                        <img src={assets.info_icon} alt="info" className="" />
                    </span>
                    <h2 className="text-xl font-bold text-[#5E38BD]">{title}</h2>
                </div>
                <div className="mb-6 text-gray-800">{message}</div>
                <button
                    className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-2 text-lg shadow hover:opacity-90 transition cursor-pointer"
                    onClick={onConfirm}
                >
                    Yes
                </button>
            </div>
        </div>
    )
}

export default Modal
