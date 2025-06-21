import React from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { assets } from '../../assets/assets';
// import { useOnboarding } from '../../context/OnboardingContext';

const Step4 = () => {
    // // Inside Step4 component
    // const { aiInsights } = useOnboarding();

    // <input value={aiInsights.brand} readOnly ... />
    // // etc.
    return (
        <div className='min-h-screen bg-[#101014] flex flex-col'>
            <div className="relative z-10 flex-grow flex flex-col">
                <TopBar />

                <div className="flex-grow flex flex-col justify-center items-center px-4">
                    <div className="w-full flex justify-center items-center">
                        <div className="bg-[#17161D] border border-[#5E38BD] rounded-[30px] p-8 md:p-12 max-w-2xl w-full mx-auto">
                            <h2 className="text-white text-2xl font-semibold text-center mb-6">Your Item AI-Insights</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-white/80 text-sm mb-1">Brand</label>
                                    <input
                                        type="text"
                                        value="Dior Tote Handbag"
                                        readOnly
                                        className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 text-sm mb-1">Material</label>
                                    <input
                                        type="text"
                                        value="Leather"
                                        readOnly
                                        className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 text-sm mb-1">Condition Score</label>
                                    <input
                                        type="text"
                                        value="6.5"
                                        readOnly
                                        className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 text-sm mb-1">Approximate Price</label>
                                    <input
                                        type="text"
                                        value="Coming Soon on v.1"
                                        readOnly
                                        className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-white/80 text-sm mb-1">Condition</label>
                                <textarea
                                    value={`This leather item appears to be in fair condition. It has undergone standard wear and tear consistent with typical use. The structural integrity remains intact, but signs of age, such as surface wear and possible fading, are visible. No major damage is apparent, and it retains functional and aesthetic value. However, a professional inspection is recommended for any high-value or collectible items to confirm its precise condition and potential need for restoration.`}
                                    readOnly
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 mb-24 md:mb-10 flex items-center gap-2">
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-6 h-1.5 bg-[#5E38BD] rounded-full" />
                    </div>
                </div>

                <div className="flex justify-end items-center py-4 px-6 md:px-15">
                    <button
                        // onClick={} // this should redirect the user to their wallet dashboard
                        className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>

            <img
                src={assets.gradient_background_4}
                alt=""
                className="pointer-events-none select-none absolute bottom-0 left-0 w-full z-0"
                style={{ objectFit: 'cover' }}
                draggable={false}
            />
        </div>
    );
};

export default Step4;