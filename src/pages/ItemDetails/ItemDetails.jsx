import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WalletNavbar from '../../components/Navbar/WalletNavbar';
import { useUser } from '@supabase/auth-helpers-react';
import supabase from '../../helper/SupabaseClient';
import { assets } from '../../assets/assets';

const ItemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useUser();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch item data
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error || !data) {
                    setError('Item not found.');
                    setItem(null);
                } else {
                    setItem(data);
                    setError(null);
                }
            } catch (err) {
                setError('An error occurred while fetching the item.');
                setItem(null);
            }
            setLoading(false);
        };

        if (id) {
            fetchItem();
        }
    }, [id]);

    // navbar user info
    const navbarUser = user
        ? {
            name: user.user_metadata?.first_name || user.email || 'User',
            avatar_url: user.user_metadata?.avatar_url || assets.default_avatar,
            onLogout: async () => {
                await supabase.auth.signOut();
                window.location.href = '/';
            }
        }
        : null;

    // loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#101014] flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    // error state
    if (error) {
        return (
            <div className="min-h-screen bg-[#101014] flex items-center justify-center">
                <div className="text-white text-xl">{error}</div>
            </div>
        );
    }

    // no item found (just in case)
    if (!item) {
        return (
            <div className="min-h-screen bg-[#101014] flex items-center justify-center">
                <div className="text-white text-xl">Item not found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#101014] flex flex-col items-center">
            {navbarUser && <WalletNavbar user={navbarUser} />}

            <div className='mt-10'>
                {/* back button */}
                <div className="w-full max-w-5xl mt-8 flex">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 bg-[#232336] text-white px-4 py-2 rounded-lg hover:bg-[#2d2d3a] transition cursor-pointer"
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path d="M15 19l-7-7 7-7" stroke="#A25EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </button>
                </div>

                {/* product card */}
                <div
                    className="rounded-2xl max-w-5xl w-full p-8 mx-auto mt-4"
                    style={{
                        background: 'linear-gradient(180deg, #1E1E1E 0%, #3D3D3D 100%)'
                    }}
                >
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* image */}
                        <div className="flex-1 flex items-start justify-center">
                            <div className="w-full h-[340px] md:h-[400px] flex items-center justify-center">
                                <img
                                    src={item.images?.[0] || assets.default_product}
                                    alt={item.brand}
                                    className="w-full h-full object-cover rounded-xl"
                                    style={{ maxHeight: 400 }}
                                />
                            </div>
                        </div>

                        {/* details */}
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-white text-2xl font-bold">{item.brand || 'Product Name'}</div>
                                <div className="text-[#B0B0B0] text-sm">
                                    Added: {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <div className="text-[#B0B0B0] text-xs mb-1">Material</div>
                                    <div className="text-white text-base">{item.ai_material || 'N/A'}</div>
                                </div>
                                <div>
                                    <div className="text-[#B0B0B0] text-xs mb-1">Condition Score</div>
                                    <div className="text-white text-base">{item.ai_condition_score || 'N/A'}</div>
                                </div>
                                <div>
                                    <div className="text-[#B0B0B0] text-xs mb-1">Approximate Price</div>
                                    <div className="text-white text-base">
                                        {item.ai_approximate_price ? `${item.ai_approximate_price}` : 'Coming Soon'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[#B0B0B0] text-xs mb-1">Your Price</div>
                                    <div className="text-[#7C4DFF] font-bold text-base">
                                        {item.price ? `$${item.price}` : 'N/A'}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="text-[#B0B0B0] text-xs mb-1">Condition</div>
                                <div className="text-white text-base">{item.ai_condition || 'No condition description.'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
