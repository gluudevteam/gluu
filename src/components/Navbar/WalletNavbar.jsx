import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../../assets/assets';

const WalletNavbar = ({ user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="w-full bg-[#18161F] py-4 px-6 md:px-16 flex items-center justify-between">
            {/* logo */}
            <div className="flex items-center">
                <img src={assets.gluu_logo} alt="Gluu Logo" className="h-8" />
            </div>
            
            {/* user avatar and menu dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                    onClick={() => setDropdownOpen((open) => !open)}
                >
                    <img
                        src={user?.avatar_url || assets.default_avatar}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-white text-sm font-semibold">{user?.name || 'User'}</span>
                    <svg
                        className={`w-4 h-4 text-white transition-transform 
                            ${dropdownOpen ? 'rotate-180' : ''}
                            `}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <a
                            href="/profile"
                            className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                        >
                            Profile
                        </a>
                        <a
                            href="/account-settings"
                            className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                        >
                            Account Settings
                        </a>
                        <a
                            href="/support"
                            className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                        >
                            Support
                        </a>
                        <a
                            href="/support"
                            className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                        >
                            Privacy Policy
                        </a>
                        <div className="border-t my-1" />
                        <button
                            onClick={user?.onLogout}
                            className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default WalletNavbar;