import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../helper/SupabaseClient';
import { useUser } from '@supabase/auth-helpers-react';
import { useNewItem } from '../../context/NewItemContext';

const DEFAULTS = {
    brand: 'Dior Tote Handbag',
    material: 'Leather',
    conditionScore: '6.5',
    approximatePrice: 'Coming Soon on v.1',
    condition: `This leather item appears to be in fair condition. It has undergone standard wear and tear consistent with typical use. The structural integrity remains intact, but signs of age, such as surface wear and possible fading, are visible. No major damage is apparent, and it retains functional and aesthetic value. However, a professional inspection is recommended for any high-value or collectible items to confirm its precise condition and potential need for restoration.`
};

const AiInsights = () => {
    const navigate = useNavigate();
    const user = useUser();
    const { images, itemDetails, clearNewItem } = useNewItem();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Use default values for now
    const [brand] = useState(DEFAULTS.brand);
    const [material] = useState(DEFAULTS.material);
    const [conditionScore] = useState(DEFAULTS.conditionScore);
    const [approximatePrice] = useState(DEFAULTS.approximatePrice);
    const [condition] = useState(DEFAULTS.condition);

    // // Helper to upload images to Supabase Storage and get URLs
    // const uploadImagesAndGetUrls = async () => {
    //     if (!images || images.length === 0) return [];
    //     const urls = [];
    //     for (const file of images) {
    //         const fileExt = file.name.split('.').pop();
    //         const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    //         const { error: uploadError } = await supabase
    //             .storage
    //             .from('product-images')
    //             .upload(fileName, file);
    //         if (uploadError) {
    //             throw new Error('Image upload failed');
    //         }
    //         const { data: publicUrlData } = supabase
    //             .storage
    //             .from('product-images')
    //             .getPublicUrl(fileName);
    //         urls.push(publicUrlData.publicUrl);
    //     }
    //     return urls;
    // };

    const handleSave = async () => {
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase
                .from('products')
                .insert([{
                    user_id: user ? user.id : null,
                    brand: itemDetails.brand,
                    type: itemDetails.type,
                    price: itemDetails.price,
                    images: images,
                    ai_brand: brand,
                    ai_material: material,
                    ai_condition_score: conditionScore,
                    ai_approximate_price: approximatePrice,
                    ai_condition: condition,
                }]);

            setLoading(false);

            if (error) {
                console.error('Supabase insert error:', error);
                setError('Failed to save item. Please try again.');
                return;
            }

            clearNewItem();
            navigate('/wallet');
        } catch (err) {
            console.error('Unexpected error:', err);
            setLoading(false);
            setError('An unexpected error occurred.');
        }
    };


    return (
        <div className="min-h-screen bg-[#101014] flex flex-col items-center py-10">
            <div className="bg-[#17161D] border border-[#5E38BD] rounded-2xl max-w-xl w-full p-8 mx-auto">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">AI Insights</h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-[#B0B0B0] text-sm mb-1">Brand</label>
                        <input
                            type="text"
                            value={brand}
                            readOnly
                            className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[#B0B0B0] text-sm mb-1">Material</label>
                        <input
                            type="text"
                            value={material}
                            readOnly
                            className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[#B0B0B0] text-sm mb-1">Condition Score</label>
                        <input
                            type="text"
                            value={conditionScore}
                            readOnly
                            className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[#B0B0B0] text-sm mb-1">Approximate Price</label>
                        <input
                            type="text"
                            value={approximatePrice}
                            readOnly
                            className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[#B0B0B0] text-sm mb-1">Condition</label>
                        <textarea
                            value={condition}
                            readOnly
                            rows={5}
                            className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none resize-none"
                        />
                    </div>
                    {error && <div className="text-red-400 text-sm">{error}</div>}
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={`bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-semibold rounded-lg px-8 py-3 shadow-md mt-4 transition
                        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                    >
                        {loading ? 'Saving...' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiInsights;