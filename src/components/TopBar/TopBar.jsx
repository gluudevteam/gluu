import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const TopBar = ({ onExit }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between py-4 px-6 md:px-15">
            <img src={assets.gluu_logo} alt="Gluu Logo" className="h-8" />
            <button
                className="bg-[#23202C] text-white px-5 py-2 rounded-lg font-inter font-medium hover:bg-[#2d2938] transition"
                onClick={onExit || (() => navigate('/'))}
            >
                Exit
            </button>
        </div>
    )
}

export default TopBar
