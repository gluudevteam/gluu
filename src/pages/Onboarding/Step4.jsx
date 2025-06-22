import React, { useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { assets } from '../../assets/assets';
import { useOnboarding } from '../../context/OnboardingContext';
import { toast } from 'react-hot-toast';
import supabase from '../../helper/SupabaseClient';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@supabase/auth-helpers-react'

const Step4 = () => {
    const { images, itemDetails, accountDetails, aiInsights } = useOnboarding();
    const user = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);

        // prepare images as array of URLs or base64
        const imageArray = images.map(img => img.src);

        // // prepare AI fields (use context or placeholders)
        // const {
        //     brand: ai_brand = 'Dior Tote Handbag',
        //     material: ai_material = 'Leather',
        //     conditionScore: ai_condition_score = '6.5',
        //     approximatePrice: ai_approximate_price = 'Coming Soon on v.1',
        //     condition: ai_condition = `This leather item appears to be in fair condition. It has undergone standard wear and tear consistent with typical use. The structural integrity remains intact, but signs of age, such as surface wear and possible fading, are visible. No major damage is apparent, and it retains functional and aesthetic value. However, a professional inspection is recommended for any high-value or collectible items to confirm its precise condition and potential need for restoration.`
        // } = aiInsights || {};

        // use hardcoded values for now
        const ai_brand = 'Dior Tote Handbag';
        const ai_material = 'Leather';
        const ai_condition_score = '6.5';
        const ai_approximate_price = 'Coming Soon on v.1';
        const ai_condition = `This leather item appears to be in fair condition. It has undergone standard wear and tear consistent with typical use. The structural integrity remains intact, but signs of age, such as surface wear and possible fading, are visible. No major damage is apparent, and it retains functional and aesthetic value. However, a professional inspection is recommended for any high-value or collectible items to confirm its precise condition and potential need for restoration.`;

        const { brand, type, price, zip } = itemDetails;

        // console.log('Current user ID:', user?.id);
        console.log('Current user:', user);
        const { error } = await supabase
            .from('products')
            .insert([
                {
                    user_id: user ? user.id : null,
                    brand,
                    type,
                    price,
                    zip,
                    images: imageArray,
                    ai_brand,
                    ai_material,
                    ai_condition_score,
                    ai_approximate_price,
                    ai_condition,
                }
            ]);

        setLoading(false);

        if (error) {
            console.error('Supabase insert error:', error); // Add this line
            toast.error('Failed to save product. Please try again.');
            return;
        }

        toast.success('Product saved!');
        navigate('/wallet');
    }

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

                {/* <div className="flex justify-end items-center py-4 px-6 md:px-15">
                    <button
                        // onClick={} // this should redirect the user to their wallet dashboard
                        className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
                    >
                        Next
                    </button>
                </div> */}

                <div className="flex justify-end items-center py-4 px-6 md:px-15">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={`bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md transition cursor-pointer
                        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
                    `}
                    >
                        {loading ? 'Saving...' : 'Next'}
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