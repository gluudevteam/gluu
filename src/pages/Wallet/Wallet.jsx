import React, { useEffect, useState, useRef } from 'react';
import WalletNavbar from '../../components/Navbar/WalletNavbar';
import WalletHeader from '../../components/WalletHeader/WalletHeader';
import { useUser } from '@supabase/auth-helpers-react';
import { assets } from '../../assets/assets';
import supabase from '../../helper/SupabaseClient';
import { Link, useNavigate } from 'react-router-dom';

// modal component
const UpgradeModal = ({ open, onClose, onUpgrade }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-70"></div>
            {/* Modal */}
            <div className="relative bg-[#18161F] border-2 border-[#A25EFF] rounded-2xl shadow-lg max-w-md w-full p-8 z-10 flex flex-col items-center">
                <button
                    className="absolute top-4 right-4 text-[#A25EFF] hover:text-white text-2xl font-bold cursor-pointer"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="text-white text-xl font-semibold mb-4 text-center">
                    Upgrade to Client Plus
                </div>
                <div className="text-white/80 text-base mb-6 text-center">
                    You have reached your upload limit. Upgrade to Client Plus to add more items to your wallet and unlock premium features!
                </div>
                <button
                    className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-semibold rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
                    onClick={onUpgrade}
                >
                    Upgrade Now
                </button>
            </div>
        </div>
    );
};

const SuccessBanner = () => (
    <div className="bg-black text-white text-sm font-medium p-4 rounded-lg mb-6 text-center">
        Thank you for upgrading to <strong>Client Plus</strong>! Your upload limit is now 200.
    </div>
);

const Wallet = () => {
    const user = useUser();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasLoadedOnce = useRef(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

    // NEW: Store user data (plan, upload_limit, etc.)
    const [userData, setUserData] = useState(null);

    // Fetch user data from Supabase
    const fetchUserData = async (email) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        if (!error && data) setUserData(data);
    };

    // Fetch products and user data on mount
    useEffect(() => {
        if (!user || hasLoadedOnce.current) return;

        setLoading(true);
        const fetchAll = async () => {
            // Fetch products
            const { data: productsData, error: productsError } = await supabase
                .from('products')
                .select('*')
                .eq('user_id', user.id);
            setProducts(!productsError ? productsData || [] : []);
            // Fetch user data
            await fetchUserData(user.email);
            setLoading(false);
            hasLoadedOnce.current = true;
        };

        fetchAll();
    }, [user]);

    // Re-fetch user data after successful upgrade
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');
        if (success && user) {
            fetchUserData(user.email);
            setShowSuccess(true);
            setTimeout(() => {
                window.history.replaceState({}, document.title, '/wallet');
            }, 3000);
        }
    }, [user]);

    // Use dynamic upload limit (default to 10 if not loaded yet)
    const uploadLimit = userData?.upload_limit ?? 10;
    const plan = userData?.plan ?? 'free';

    const totalValue = products.reduce((sum, item) => Number(item.price) + sum, 0);
    const totalItems = products.length;

    // Alert for upload limit
    const alert = (!loading && userData && totalItems >= uploadLimit) ? (
        <div className="flex items-center justify-between bg-[#101014] border-2 border-[#A25EFF] rounded-xl px-8 py-6 w-full md:w-auto mt-4 md:mt-0">
            <span className="text-white text-base font-medium">
                You have reached your {uploadLimit} uploads.
            </span>
            {plan === 'free' && (
                <Link to="/upgrade">
                    <button
                        className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer ml-4">
                        Upgrade to Client Plus
                    </button>
                </Link>
            )}
        </div>
    ) : null;

    // Only allow adding new item if under upload limit
    const handleAddNewItem = () => {
        if (totalItems >= uploadLimit) {
            setShowUpgradeModal(true);
        } else {
            navigate('/add-new-item');
        }
    };

    const navbarUser = {
        name: user?.user_metadata?.first_name || user?.email || 'User',
        avatar_url: user?.user_metadata?.avatar_url || assets.default_avatar,
        onLogout: async () => {
            await supabase.auth.signOut();
            window.location.href = '/';
        }
    };

    // Stripe upgrade logic (unchanged)
    const handleUpgrade = async () => {
        if (!user) {
            alert('You must be logged in to upgrade.');
            return;
        }

        try {
            const res = await fetch('http://localhost:4242/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, email: user.email }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error('Failed response:', text);
                alert('Error: ' + text);
                return;
            }

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Upgrade failed. No checkout URL returned.');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            alert('Error connecting to payment gateway.');
        }
    };

    return (
        <div className='min-h-screen bg-[#000000]'>
            <WalletNavbar user={navbarUser} />

            <UpgradeModal
                open={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                onUpgrade={handleUpgrade}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-25">
                {showSuccess && <SuccessBanner />}
                <WalletHeader
                    totalValue={totalValue}
                    totalItems={totalItems}
                    alert={alert}
                />

                <div className="flex justify-end mb-6">
                    <button
                        className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
                        onClick={handleAddNewItem}
                    >
                        + Add New Item
                    </button>
                </div>

                {loading ? (
                    <div className="text-white text-center mt-10">Loading...</div>
                ) : products.length === 0 ? (
                    <div className="text-white text-center mt-10">No items yet.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {products.map((item) => (
                            <Link
                                key={item.id}
                                to={`/item-details/${item.id}`}
                                className="block"
                                style={{ textDecoration: 'none' }}
                            >
                                <div
                                    key={item.id}
                                    className="bg-[#232336] rounded-2xl overflow-hidden shadow-lg flex flex-col"
                                    style={{
                                        background: 'linear-gradient(180deg, #1E1E1E 0%, #3D3D3D 100%)'
                                    }}
                                >
                                    <div
                                        className="p-4 flex items-center justify-center"
                                    >
                                        <img
                                            src={item.images?.[0] || assets.default_product}
                                            alt={item.brand}
                                        />
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="text-white text-lg font-semibold mb-1">{item.brand || 'Product Name'}</div>
                                        <div className="text-white/70 text-xs mb-4">
                                            Added: {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                                        </div>
                                        <div className="flex justify-between items-end mt-auto">
                                            <div>
                                                <div className="text-white/70 text-xs">AI Value</div>
                                                <div className="text-white font-semibold">
                                                    {item.ai_value || 'Coming Soon on v.1'}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white/70 text-xs">Your Price</div>
                                                <div className="text-white font-semibold">
                                                    {item.price ? `$${item.price}` : 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wallet;


// 07/05/2025 - last functioning code edited
// import React, { useEffect, useState, useRef } from 'react';
// import WalletNavbar from '../../components/Navbar/WalletNavbar';
// import WalletHeader from '../../components/WalletHeader/WalletHeader';
// import { useUser } from '@supabase/auth-helpers-react';
// import { assets } from '../../assets/assets';
// import supabase from '../../helper/SupabaseClient';
// import { Link, useNavigate } from 'react-router-dom';

// const FREE_UPLOAD_LIMIT = 10;

// // modal component
// const UpgradeModal = ({ open, onClose, onUpgrade }) => {
//     if (!open) return null;
//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//             {/* Overlay */}
//             <div className="fixed inset-0 bg-black bg-opacity-70"></div>
//             {/* Modal */}
//             <div className="relative bg-[#18161F] border-2 border-[#A25EFF] rounded-2xl shadow-lg max-w-md w-full p-8 z-10 flex flex-col items-center">
//                 <button
//                     className="absolute top-4 right-4 text-[#A25EFF] hover:text-white text-2xl font-bold cursor-pointer"
//                     onClick={onClose}
//                     aria-label="Close"
//                 >
//                     &times;
//                 </button>
//                 <div className="text-white text-xl font-semibold mb-4 text-center">
//                     Upgrade to Client Plus
//                 </div>
//                 <div className="text-white/80 text-base mb-6 text-center">
//                     You have reached your 10 free uploads. Upgrade to Client Plus to add more items to your wallet and unlock premium features!
//                 </div>
//                 <button
//                     className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-semibold rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
//                     onClick={onUpgrade}
//                 >
//                     Upgrade Now
//                 </button>
//             </div>
//         </div>
//     );
// };

// // success banner for subscribing to client plus
// const SuccessBanner = () => (
//     <div className="bg-black text-white text-sm font-medium p-4 rounded-lg mb-6 text-center">
//         Thank you for upgrading to <strong>Client Plus</strong>! Your upload limit is now 200.
//     </div>
// );

// const Wallet = () => {
//     const user = useUser();
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const hasLoadedOnce = useRef(false);
//     const [showUpgradeModal, setShowUpgradeModal] = useState(false);
//     const navigate = useNavigate();
//     const [showSuccess, setShowSuccess] = useState(false);

//     const handleAddNewItem = () => {
//         if (products.length >= FREE_UPLOAD_LIMIT) {
//             setShowUpgradeModal(true);
//         } else {
//             navigate('/add-new-item');
//         }
//     }

//     const navbarUser = {
//         name: user?.user_metadata?.first_name || user?.email || 'User',
//         avatar_url: user?.user_metadata?.avatar_url || assets.default_avatar,
//         onLogout: async () => {
//             await supabase.auth.signOut();
//             window.location.href = '/';
//         }
//     };

//     useEffect(() => {
//         if (!user || hasLoadedOnce.current) return;

//         setLoading(true);
//         const fetchProducts = async () => {
//             const { data, error } = await supabase
//                 .from('products')
//                 .select('*')
//                 .eq('user_id', user.id);
//             setProducts(!error ? data || [] : []);
//             setLoading(false);
//             hasLoadedOnce.current = true;
//         };

//         fetchProducts();
//     }, [user]);

//     const totalValue = products.reduce((sum, item) => Number(item.price) + sum, 0);
//     const totalItems = products.length;

//     // Alert for upload limit
//     const alert = totalItems >= FREE_UPLOAD_LIMIT ? (
//         <div className="flex items-center justify-between bg-[#101014] border-2 border-[#A25EFF] rounded-xl px-8 py-6 w-full md:w-auto mt-4 md:mt-0">
//             <span className="text-white text-base font-medium">
//                 You have reached your 10 free uploads.
//             </span>
//             <Link to="/upgrade">
//                 <button
//                     className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer ml-4">
//                     Upgrade to Client Plus
//                 </button>
//             </Link>
//         </div>
//     ) : null;

//     // stripe upgrade logic
//     const handleUpgrade = async () => {
//         if (!user) {
//             alert('You must be logged in to upgrade.');
//             return;
//         }

//         try {
//             const res = await fetch('http://localhost:4242/create-checkout-session', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ userId: user.id, email: user.email }),
//             });

//             if (!res.ok) {
//                 const text = await res.text();
//                 console.error('Failed response:', text);
//                 alert('Error: ' + text);
//                 return;
//             }

//             const data = await res.json();
//             if (data.url) {
//                 window.location.href = data.url;
//             } else {
//                 alert('Upgrade failed. No checkout URL returned.');
//             }
//         } catch (err) {
//             console.error('Fetch error:', err);
//             alert('Error connecting to payment gateway.');
//         }
//     };

//     // show a success message if redirected from stripe
//     // useEffect(() => {
//     //     const params = new URLSearchParams(window.location.search);
//     //     if (params.get('success')) {
//     //         alert('Thank you for upgrading! Your payment was successful.')
//     //     }
//     // }, []);

//     useEffect(() => {
//         const params = new URLSearchParams(window.location.search);
//         const success = params.get('success');

//         if (success) {
//             setShowSuccess(true);
//             // remove ?success=true from the URL after 3 seconds
//             setTimeout(() => {
//                 window.history.replaceState({}, document.title, '/wallet');
//             }, 3000);
//         }
//     }, []);

//     return (
//         <div className='min-h-screen bg-[#000000]'>
//             <WalletNavbar user={navbarUser} />

//             <UpgradeModal
//                 open={showUpgradeModal}
//                 onClose={() => setShowUpgradeModal(false)}
//                 onUpgrade={handleUpgrade}
//             />

//             <div className="max-w-7xl mx-auto px-4 md:px-8 mt-25">
//                 <WalletHeader
//                     totalValue={totalValue}
//                     totalItems={totalItems}
//                     alert={alert}
//                 />
//                 {/* <div className="flex justify-end mb-6">
//                     <Link to='/add-new-item'>
//                         <button
//                             onClick={ handleAddNewItem}
//                             className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
//                         >
//                             + Add New Item
//                         </button>
//                     </Link>
//                 </div> */}

//                 <div className="flex justify-end mb-6">
//                     <button
//                         className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
//                         onClick={handleAddNewItem}
//                     >
//                         + Add New Item
//                     </button>
//                 </div>

//                 {loading ? (
//                     <div className="text-white text-center mt-10">Loading...</div>
//                 ) : products.length === 0 ? (
//                     <div className="text-white text-center mt-10">No items yet.</div>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//                         {products.map((item) => (
//                             <Link
//                                 key={item.id}
//                                 to={`/item-details/${item.id}`}
//                                 className="block"
//                                 style={{ textDecoration: 'none' }}
//                             >
//                                 <div
//                                     key={item.id}
//                                     className="bg-[#232336] rounded-2xl overflow-hidden shadow-lg flex flex-col"
//                                     style={{
//                                         background: 'linear-gradient(180deg, #1E1E1E 0%, #3D3D3D 100%)'
//                                     }}
//                                 >
//                                     <div
//                                         className="p-4 flex items-center justify-center"
//                                     >
//                                         <img
//                                             src={item.images?.[0] || assets.default_product}
//                                             alt={item.brand}
//                                         // className="object-cover w-full h-full"
//                                         />
//                                     </div>
//                                     <div className="p-5 flex-1 flex flex-col">
//                                         <div className="text-white text-lg font-semibold mb-1">{item.brand || 'Product Name'}</div>
//                                         <div className="text-white/70 text-xs mb-4">
//                                             Added: {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
//                                         </div>
//                                         <div className="flex justify-between items-end mt-auto">
//                                             <div>
//                                                 <div className="text-white/70 text-xs">AI Value</div>
//                                                 <div className="text-white font-semibold">
//                                                     {item.ai_value || 'Coming Soon on v.1'}
//                                                 </div>
//                                             </div>
//                                             <div className="text-right">
//                                                 <div className="text-white/70 text-xs">Your Price</div>
//                                                 <div className="text-white font-semibold">
//                                                     {item.price ? `$${item.price}` : 'N/A'}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Wallet;


// // import React, { useEffect, useState, useRef } from 'react';
// // import WalletNavbar from '../../components/Navbar/WalletNavbar';
// // import WalletHeader from '../../components/WalletHeader/WalletHeader';
// // import { useUser } from '@supabase/auth-helpers-react';
// // import { assets } from '../../assets/assets';
// // import supabase from '../../helper/SupabaseClient';

// // const FREE_UPLOAD_LIMIT = 10;

// // const Wallet = () => {
// //     const user = useUser();
// //     const [products, setProducts] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const hasLoadedOnce = useRef(false);

// //     const navbarUser = {
// //         name: user?.user_metadata?.first_name || user?.email || 'User',
// //         avatar_url: user?.user_metadata?.avatar_url || assets.default_avatar,
// //         onLogout: async () => {
// //             await supabase.auth.signOut();
// //             window.location.href = '/';
// //         }
// //     };

// //     // useEffect(() => {
// //     //     const fetchProducts = async () => {
// //     //         if (!user) return;
// //     //         setLoading(true);
// //     //         const { data, error } = await supabase
// //     //             .from('products')
// //     //             .select('*')
// //     //             .eq('user_id', user.id);
// //     //         console.log('Fetched products:', data, 'Error:', error, 'User:', user);
// //     //         if (!error) setProducts(data || []);
// //     //         setLoading(false);
// //     //     };
// //     //     fetchProducts();
// //     // }, [user]);

// //     useEffect(() => {
// //         if (!user || hasLoadedOnce.current) return;

// //         setLoading(true);
// //         const fetchProducts = async () => {
// //             const { data, error } = await supabase
// //                 .from('products')
// //                 .select('*')
// //                 .eq('user_id', user.id);
// //             setProducts(!error ? data || [] : []);
// //             setLoading(false);
// //             hasLoadedOnce.current = true;
// //         };

// //         fetchProducts();
// //     }, [user]);

// //     // const totalValue = products.reduce((sum, item) => {
// //     //     const price = Number(item.price) || 0;
// //     //     return sum + price;
// //     // }, 0);

// //     const totalValue = products.reduce((sum, item) => Number(item.price) + sum, 0);
// //     const totalItems = products.length;

// //     return (
// //         // <div className='min-h-screen bg-[#000000]'>
// //         //     <WalletNavbar user={navbarUser} />
// //         //     <WalletHeader
// //         //         totalValue={totalValue}
// //         //         totalItems={totalItems}
// //         //         onAddNew={() => {/* handle add new item */ }}
// //         //     />
// //         //     {loading ? (
// //         //         <div className="text-white text-center mt-10">Loading...</div>
// //         //     ) : (
// //         //         <div className="text-white text-center mt-10">
// //         //             {products.length === 0 && <div>No items yet.</div>}
// //         //         </div>
// //         //     )}
// //         // </div>

// //         <div className='min-h-screen bg-[#000000]'>
// //             <WalletNavbar user={navbarUser} />
// //             <div className="max-w-7xl mx-auto px-4">
// //                 <WalletHeader
// //                     totalValue={totalValue}
// //                     totalItems={totalItems}
// //                     onAddNew={() => {/* handle add new item */ }}
// //                 />
// //                 {totalItems >= FREE_UPLOAD_LIMIT && (
// //                     <div className="flex items-center justify-between bg-[#18161F] border-2 border-[#A25EFF] rounded-xl px-8 py-6 mb-8">
// //                         <span className="text-white text-base font-medium">
// //                             You have reached your 10 free uploads.
// //                         </span>
// //                         <button className="bg-[#A25EFF] hover:bg-[#5E38BD] text-white font-semibold px-6 py-2 rounded-lg transition">
// //                             Upgrade to Client Plus
// //                         </button>
// //                     </div>
// //                 )}
// //                 <div className="flex justify-end mb-6">
// //                     <button
// //                         onClick={() => {/* handle add new item */ }}
// //                         className="bg-[#A25EFF] hover:bg-[#5E38BD] text-white font-semibold px-6 py-2 rounded-lg transition"
// //                     >
// //                         + Add New Item
// //                     </button>
// //                 </div>
// //                 {loading ? (
// //                     <div className="text-white text-center mt-10">Loading...</div>
// //                 ) : products.length === 0 ? (
// //                     <div className="text-white text-center mt-10">No items yet.</div>
// //                 ) : (
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
// //                         {products.map((item) => (
// //                             <div
// //                                 key={item.id}
// //                                 className="bg-[#232336] rounded-2xl overflow-hidden shadow-lg flex flex-col"
// //                             >
// //                                 <div className="h-56 w-full bg-gray-900 flex items-center justify-center overflow-hidden">
// //                                     <img
// //                                         src={item.images?.[0] || assets.default_product}
// //                                         alt={item.brand}
// //                                         className="object-cover w-full h-full"
// //                                     />
// //                                 </div>
// //                                 <div className="p-5 flex-1 flex flex-col">
// //                                     <div className="text-white text-lg font-semibold mb-1">{item.brand || 'Product Name'}</div>
// //                                     <div className="text-white/70 text-xs mb-4">
// //                                         Added: {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
// //                                     </div>
// //                                     <div className="flex justify-between items-end mt-auto">
// //                                         <div>
// //                                             <div className="text-white/70 text-xs mb-1">AI Value</div>
// //                                             <div className="text-white text-base font-bold">
// //                                                 {item.ai_approximate_price
// //                                                     ? `$${item.ai_approximate_price}`
// //                                                     : '$500 - $650'}
// //                                             </div>
// //                                         </div>
// //                                         <div>
// //                                             <div className="text-white/70 text-xs mb-1 text-right">Your Price</div>
// //                                             <div className="text-[#A25EFF] text-base font-bold text-right">
// //                                                 ${item.price}
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default Wallet;

// // // import React from 'react'
// // // import WalletHeader from '../../components/WalletHeader/WalletHeader'
// // // import { useUser } from '@supabase/auth-helpers-react'
// // // import { assets } from '../../assets/assets';

// // // const Wallet = () => {
// // //     const user = useUser();

// // //     // map user info to the props expected by the wallet navbar
// // //     const navbarUser = {
// // //         name: user?.user_metadata?.first_name || user?.email || 'User',
// // //         avatar_url: user?.user_metadata?.avatar_url || assets.default_avatar // or use a default if not set
// // //     };

// // //     return (
// // //         <div className='min-h-screen bg-[#000000]'>
// // //             {/* navbar + header */}
// // //             <WalletHeader />
// // //         </div>
// // //     )
// // // }

// // // export default Wallet