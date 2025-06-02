import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="w-full bg-[#18161F] py-4 px-6 md:px-16 lg:px-60 flex items-center justify-between relative">
            {/* logo */}
            <div className="flex items-center">
                <img src={assets.gluu_logo} alt="Gluu Logo" className="h-10" />
            </div>
            {/* desktop navigation links */}
            <div className="hidden md:flex items-center space-x-6">
                <Link to='/' className="text-white font-inter font-normal text-sm hover:text-gray-300">Home</Link>
                <Link to='/how-it-works' className="text-white font-inter font-normal text-sm hover:text-gray-300">How It Works</Link>
                <Link to='/pricing' className="text-white font-inter font-normal text-sm hover:text-gray-300">Pricing</Link>
                <Link to='/about' className="text-white font-inter font-normal text-sm hover:text-gray-300">About</Link>
            </div>
            {/* desktop sign up button */}
            <div className="hidden md:block">
                <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-inter font-semibold text-sm px-8 py-3 rounded-lg shadow hover:opacity-90 transition">
                    <Link to='/signup'>Sign Up Free</Link>
                </button>
            </div>
            {/* hamburger icon */}
            <button
                className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    {menuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    )}
                </svg>
            </button>
            {/* mobile menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#18161F] shadow-lg flex flex-col items-center py-6 z-50 md:hidden">
                    <Link to='/' className="text-white font-inter font-normal text-base py-2" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to='/how-it-works' className="text-white font-inter font-normal text-base py-2" onClick={() => setMenuOpen(false)}>How It Works</Link>
                    <Link to='/pricing' className="text-white font-inter font-normal text-base py-2" onClick={() => setMenuOpen(false)}>Pricing</Link>
                    <Link to='/about' className="text-white font-inter font-normal text-base py-2" onClick={() => setMenuOpen(false)}>About</Link>
                    <button className="mt-4 bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-inter font-semibold text-base px-8 py-3 rounded-lg shadow hover:opacity-90 transition">
                        <Link to='/signup' onClick={() => setMenuOpen(false)}>Sign Up Free</Link>
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar