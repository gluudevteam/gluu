import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Upgrade = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-[#101014] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
            {/* gradient background at the bottom */}
            <img
                src={assets.gradient_background_3}
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-none z-0"
                style={{ minWidth: 1200 }}
            />

            {/* header row */}
            <div className="w-full max-w-5xl flex items-center justify-between mb-10 relative z-10 font-inter">
                <button
                    className="flex items-center text-sm text-white cursor-pointer"
                    onClick={() => navigate('/pricing')}
                >
                    <AiOutlineArrowLeft className="mr-2 text-lg" />
                    <img src={assets.back_to_wallet} alt="" />
                    &nbsp; Pricing
                </button>
                <h1 className="text-2xl md:text-3xl font-bold text-white text-center flex-1">
                    Upgrade to Client Plus
                </h1>
                {/* spacer for alignment */}
                <div className="w-[90px] md:w-[110px]" />
            </div>

            {/* details row */}
            <div className="w-full max-w-5xl flex flex-col md:flex-row gap-15 relative z-10">
                {/* left: summary */}
                <div className="flex-1 flex flex-col items-start ">
                    <div className="w-full">
                        <h3 className="text-white text-sm font-bold mb-4">Subscribe to Gluu</h3>
                        <div className="flex items-center mb-4">
                            <span className="bg-white text-[#5E38BD] px-3 py-1 rounded-full text-xs font-semibold mr-2">
                                Client Plus
                            </span>
                            <span className="text-[#5E38BD] font-bold text-base">$1.95</span>
                            <span className="ml-1 text-gray-400 text-xs">/month</span>
                        </div>
                        <ul className="mb-6 space-y-2 text-sm">
                            <li className="flex items-center text-white">
                                <span className="mr-2 text-lg text-white">
                                    <img src={assets.check_icon} alt="Check icon" />
                                </span> Up to 200 Items
                            </li>
                            <li className="flex items-center text-white">
                                <span className="mr-2 text-lg">
                                    <img src={assets.check_icon} alt="Check icon" />
                                </span> Faster AI Uploads
                            </li>
                            <li className="flex items-center text-white">
                                <span className="mr-2 text-lg">
                                    <img src={assets.check_icon} alt="Check icon" />
                                </span> All Item Condition Report
                            </li>
                            <li className="flex items-center text-white">
                                <span className="mr-2 text-lg">
                                    <img src={assets.check_icon} alt="Check icon" />
                                </span> Collections & Advanced Organization
                            </li>
                        </ul>
                        <div className="pt-4 text-sm">
                            <div className="flex justify-between text-white">
                                <span className="font-bold">Client Plus Subscription</span>
                                <span>$1.95</span>
                            </div>

                            <div className="text-xs text-gray-300 mb-5">Billed monthly</div>

                            <div className="border-t-[0.5px] border-white text-white flex justify-between pt-2 mb-5">
                                <span>Subtotal</span>
                                <span>$1.95</span>
                            </div>

                            <div className="border-t-[0.5px] border-white text-white flex justify-between pt-2 mb-5">
                                <span>Total</span>
                                <span>$1.95</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* right: payment form */}
                <div className="flex-1 bg-[#181828] rounded-2xl p-8 border-2 border-[#5E38BD] flex flex-col justify-center">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-white text-sm mb-2 font-semibold">Pay with card</label>
                            <div className="flex gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="flex-1 bg-[#232336] rounded-lg px-4 py-2 text-white outline-none border border-[#232336] focus:border-purple-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="flex-1 bg-[#232336] rounded-lg px-4 py-2 text-white outline-none border border-[#232336] focus:border-purple-400"
                                />
                            </div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-[#232336] rounded-lg px-4 py-2 text-white outline-none border border-[#232336] focus:border-purple-400 mb-4"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-2 font-semibold">Card information</label>
                            <div className="flex gap-2 mb-4">
                                <img src={assets.paypal_icon} alt="PayPal" className="h-8" />
                                <img src={assets.master_card_icon} alt="Mastercard" className="h-8" />
                                <img src={assets.visa_icon} alt="Visa" className="h-8" />
                            </div>
                            <input
                                type="text"
                                placeholder="Full name on card"
                                className="w-full bg-[#232336] rounded-lg px-4 py-2 text-white outline-none border border-[#232336] focus:border-purple-400 mb-2"
                            />
                            <select className="w-full bg-[#232336] rounded-lg px-4 py-2 text-white outline-none border border-[#232336] focus:border-purple-400">
                                <option>Country or region</option>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>United Kingdom</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 mt-6 shadow-md hover:opacity-90 transition cursor-pointer"
                        >
                            Upgrade to Client Plus
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Upgrade