import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WalletNavbar from '../../components/Navbar/WalletNavbar';
import { useUser } from '@supabase/auth-helpers-react';
import supabase from '../../helper/SupabaseClient';
import { assets } from '../../assets/assets';
import { toast } from 'react-hot-toast'

const ItemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useUser();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // for editing
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [newBrand, setNewBrand] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // for deleting
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

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

    // handle delete
    const handleDelete = async () => {
        setIsDeleting(true)
        const { error } = await supabase.from('products').delete().eq('id', id)
        setIsDeleting(false)

        // const confirmDelete = window.confirm('Are you sure you want to delete this item?')
        // if (!confirmDelete) return

        // const { error } = await supabase.from('products').delete().eq('id', id)

        if (error) {
            toast.error('Failed to delete item.')
        } else {
            toast.success('Item deleted successfully!')
            navigate('/wallet') // redirect back to wallet
        }
    }

    if (loading) return <div className="min-h-screen bg-[#101014] flex justify-center items-center text-white">Loading...</div>
    if (error) return <div className="min-h-screen bg-[#101014] flex justify-center items-center text-white">{error}</div>
    if (!item) return <div className="min-h-screen bg-[#101014] flex justify-center items-center text-white">Item not found.</div>


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
                            {/* edit + delete buttons */}
                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={() => {
                                        setNewBrand(item.brand || '')
                                        setNewPrice(item.price || '')
                                        setIsEditOpen(true)
                                    }}
                                    className="bg-[#3A2F71] text-white px-4 py-2 rounded-lg hover:bg-[#4f3c94] transition cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    // onClick={handleDelete}
                                    onClick={() => setIsDeleteOpen(true)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>

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

            {/* edit modal */}
            {isEditOpen && (
                <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-[#1f1f2b] p-6 rounded-xl w-full max-w-md">
                        <h3 className="text-white text-xl font-semibold mb-4">Edit Product</h3>

                        <div className="mb-4">
                            <label className="block text-white mb-1">Brand</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-[#2c2c3b] text-white"
                                value={newBrand}
                                onChange={(e) => setNewBrand(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-white mb-1">Your Price ($)</label>
                            <input
                                type="number"
                                className="w-full p-2 rounded bg-[#2c2c3b] text-white"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 cursor-pointer"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    setIsSubmitting(true)
                                    const { error } = await supabase
                                        .from('products')
                                        .update({
                                            brand: newBrand.trim(),
                                            price: parseFloat(newPrice),
                                        })
                                        .eq('id', id)

                                    if (error) {
                                        toast.error('Failed to update item.')
                                    } else {
                                        toast.success('Item updated successfully!')
                                        setItem({ ...item, brand: newBrand.trim(), price: parseFloat(newPrice) })
                                        setIsEditOpen(false)
                                    }
                                    setIsSubmitting(false)
                                }}
                                className="px-4 py-2 rounded bg-[#7C4DFF] text-white hover:bg-[#6b3eea] cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* delete modal */}
            {isDeleteOpen && (
                <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-[#1f1f2b] p-6 rounded-xl w-full max-w-sm text-white">
                        <h3 className="text-xl font-semibold mb-4">Delete Item</h3>
                        <p className="mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsDeleteOpen(false)}
                                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 cursor-pointer"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemDetails;
