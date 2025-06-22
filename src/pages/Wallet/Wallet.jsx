import React, { useEffect, useState, useRef } from 'react';
import WalletNavbar from '../../components/Navbar/WalletNavbar';
import WalletHeader from '../../components/WalletHeader/WalletHeader';
import { useUser } from '@supabase/auth-helpers-react';
import { assets } from '../../assets/assets';
import supabase from '../../helper/SupabaseClient';
import { Link } from 'react-router-dom';

const FREE_UPLOAD_LIMIT = 10;

const Wallet = () => {
    const user = useUser();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasLoadedOnce = useRef(false);

    const navbarUser = {
        name: user?.user_metadata?.first_name || user?.email || 'User',
        avatar_url: user?.user_metadata?.avatar_url || assets.default_avatar,
        onLogout: async () => {
            await supabase.auth.signOut();
            window.location.href = '/';
        }
    };

    useEffect(() => {
        if (!user || hasLoadedOnce.current) return;

        setLoading(true);
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('user_id', user.id);
            setProducts(!error ? data || [] : []);
            setLoading(false);
            hasLoadedOnce.current = true;
        };

        fetchProducts();
    }, [user]);

    const totalValue = products.reduce((sum, item) => Number(item.price) + sum, 0);
    const totalItems = products.length;

    // Alert for upload limit
    const alert = totalItems >= FREE_UPLOAD_LIMIT ? (
        <div className="flex items-center justify-between bg-[#101014] border-2 border-[#A25EFF] rounded-xl px-8 py-6 w-full md:w-auto mt-4 md:mt-0">
            <span className="text-white text-base font-medium">
                You have reached your 10 free uploads.
            </span>
            <Link to="/upgrade">
                <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer ml-4">
                    Upgrade to Client Plus
                </button>
            </Link>
        </div>
    ) : null;

    return (
        <div className='min-h-screen bg-[#000000]'>
            <WalletNavbar user={navbarUser} />
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-25">
                <WalletHeader
                    totalValue={totalValue}
                    totalItems={totalItems}
                    alert={alert}
                />
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => {/* handle add new item */ }}
                        className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
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
                                        // className="object-cover w-full h-full"
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
                                                <div className="text-[#A25EFF] font-semibold">
                                                    {item.ai_value || 'Coming Soon on v.1'}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white/70 text-xs">Your Price</div>
                                                <div className="text-[#A25EFF] font-semibold">
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


// import React, { useEffect, useState, useRef } from 'react';
// import WalletNavbar from '../../components/Navbar/WalletNavbar';
// import WalletHeader from '../../components/WalletHeader/WalletHeader';
// import { useUser } from '@supabase/auth-helpers-react';
// import { assets } from '../../assets/assets';
// import supabase from '../../helper/SupabaseClient';

// const FREE_UPLOAD_LIMIT = 10;

// const Wallet = () => {
//     const user = useUser();
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const hasLoadedOnce = useRef(false);

//     const navbarUser = {
//         name: user?.user_metadata?.first_name || user?.email || 'User',
//         avatar_url: user?.user_metadata?.avatar_url || assets.default_avatar,
//         onLogout: async () => {
//             await supabase.auth.signOut();
//             window.location.href = '/';
//         }
//     };

//     // useEffect(() => {
//     //     const fetchProducts = async () => {
//     //         if (!user) return;
//     //         setLoading(true);
//     //         const { data, error } = await supabase
//     //             .from('products')
//     //             .select('*')
//     //             .eq('user_id', user.id);
//     //         console.log('Fetched products:', data, 'Error:', error, 'User:', user);
//     //         if (!error) setProducts(data || []);
//     //         setLoading(false);
//     //     };
//     //     fetchProducts();
//     // }, [user]);

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

//     // const totalValue = products.reduce((sum, item) => {
//     //     const price = Number(item.price) || 0;
//     //     return sum + price;
//     // }, 0);

//     const totalValue = products.reduce((sum, item) => Number(item.price) + sum, 0);
//     const totalItems = products.length;

//     return (
//         // <div className='min-h-screen bg-[#000000]'>
//         //     <WalletNavbar user={navbarUser} />
//         //     <WalletHeader
//         //         totalValue={totalValue}
//         //         totalItems={totalItems}
//         //         onAddNew={() => {/* handle add new item */ }}
//         //     />
//         //     {loading ? (
//         //         <div className="text-white text-center mt-10">Loading...</div>
//         //     ) : (
//         //         <div className="text-white text-center mt-10">
//         //             {products.length === 0 && <div>No items yet.</div>}
//         //         </div>
//         //     )}
//         // </div>

//         <div className='min-h-screen bg-[#000000]'>
//             <WalletNavbar user={navbarUser} />
//             <div className="max-w-7xl mx-auto px-4">
//                 <WalletHeader
//                     totalValue={totalValue}
//                     totalItems={totalItems}
//                     onAddNew={() => {/* handle add new item */ }}
//                 />
//                 {totalItems >= FREE_UPLOAD_LIMIT && (
//                     <div className="flex items-center justify-between bg-[#18161F] border-2 border-[#A25EFF] rounded-xl px-8 py-6 mb-8">
//                         <span className="text-white text-base font-medium">
//                             You have reached your 10 free uploads.
//                         </span>
//                         <button className="bg-[#A25EFF] hover:bg-[#5E38BD] text-white font-semibold px-6 py-2 rounded-lg transition">
//                             Upgrade to Client Plus
//                         </button>
//                     </div>
//                 )}
//                 <div className="flex justify-end mb-6">
//                     <button
//                         onClick={() => {/* handle add new item */ }}
//                         className="bg-[#A25EFF] hover:bg-[#5E38BD] text-white font-semibold px-6 py-2 rounded-lg transition"
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
//                             <div
//                                 key={item.id}
//                                 className="bg-[#232336] rounded-2xl overflow-hidden shadow-lg flex flex-col"
//                             >
//                                 <div className="h-56 w-full bg-gray-900 flex items-center justify-center overflow-hidden">
//                                     <img
//                                         src={item.images?.[0] || assets.default_product}
//                                         alt={item.brand}
//                                         className="object-cover w-full h-full"
//                                     />
//                                 </div>
//                                 <div className="p-5 flex-1 flex flex-col">
//                                     <div className="text-white text-lg font-semibold mb-1">{item.brand || 'Product Name'}</div>
//                                     <div className="text-white/70 text-xs mb-4">
//                                         Added: {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
//                                     </div>
//                                     <div className="flex justify-between items-end mt-auto">
//                                         <div>
//                                             <div className="text-white/70 text-xs mb-1">AI Value</div>
//                                             <div className="text-white text-base font-bold">
//                                                 {item.ai_approximate_price
//                                                     ? `$${item.ai_approximate_price}`
//                                                     : '$500 - $650'}
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <div className="text-white/70 text-xs mb-1 text-right">Your Price</div>
//                                             <div className="text-[#A25EFF] text-base font-bold text-right">
//                                                 ${item.price}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Wallet;

// // import React from 'react'
// // import WalletHeader from '../../components/WalletHeader/WalletHeader'
// // import { useUser } from '@supabase/auth-helpers-react'
// // import { assets } from '../../assets/assets';

// // const Wallet = () => {
// //     const user = useUser();

// //     // map user info to the props expected by the wallet navbar
// //     const navbarUser = {
// //         name: user?.user_metadata?.first_name || user?.email || 'User',
// //         avatar_url: user?.user_metadata?.avatar_url || assets.default_avatar // or use a default if not set
// //     };

// //     return (
// //         <div className='min-h-screen bg-[#000000]'>
// //             {/* navbar + header */}
// //             <WalletHeader />
// //         </div>
// //     )
// // }

// // export default Wallet