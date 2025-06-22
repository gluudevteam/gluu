import React from 'react';

const WalletHeader = ({ totalValue = 0, totalItems = 0, alert }) => (
    <div className="w-full flex flex-col gap-8 mb-8 mt-8">
        <h1 className="text-white text-4xl font-bold mb-2">My Wallet</h1>
        <span className="text-white/70 text-base mb-6 block">
            Track and manage your documented items and their value.
        </span>
        <div className="flex gap-6">
            {/* Total Value Card */}
            <div className="bg-[#18161F] rounded-xl px-10 py-5 flex flex-col items-center justify-center min-w-[170px] min-h-[100px] shadow-md text-center">
                <span className="text-white text-md font-medium mb-1">Total Value</span>
                <span className="text-[#7C4DFF] text-4xl font-bold leading-tight mb-1">
                    ${Number(totalValue).toLocaleString()}
                </span>
                <span className="text-[#A0A0A0] text-sm mt-1">User Value</span>
            </div>
            {/* Total Items Card */}
            <div className="bg-[#18161F] rounded-xl px-10 py-5 flex flex-col items-center justify-center min-w-[140px] min-h-[100px] shadow-md text-center">
                <span className="text-white text-md font-medium mb-1">Total Items</span>
                <span className="text-[#7C4DFF] text-4xl font-bold leading-tight">
                    {Number(totalItems).toLocaleString()}
                </span>
            </div>
            {/* Optional alert */}
            {alert && (
                <div className="flex-1 flex items-center justify-center md:justify-end mt-8 md:mt-0">
                    {alert}
                </div>
            )}
        </div>
    </div>
);

export default WalletHeader;


// import React from 'react';

// const WalletHeader = ({ totalValue = 0, totalItems = 0, onAddNew }) => (
//     <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 px-6 md:px-16 mt-8">
//         <div>
//             <h1 className="text-white text-3xl font-semibold mb-4">My Wallet</h1>
//             <div className="flex gap-6">
//                 <div className="bg-[#232336] rounded-xl px-6 py-4 flex flex-col items-center">
//                     <span className="text-[#A25EFF] text-2xl font-bold">
//                         ${Number(totalValue).toLocaleString()}
//                     </span>
//                     <span className="text-white/70 text-xs mt-1">Total Approximate Value</span>
//                 </div>
//                 <div className="bg-[#232336] rounded-xl px-6 py-4 flex flex-col items-center">
//                     <span className="text-[#A25EFF] text-2xl font-bold">
//                         {Number(totalItems).toLocaleString()}
//                     </span>
//                     <span className="text-white/70 text-xs mt-1">Total Items</span>
//                 </div>
//             </div>
//         </div>
//         {/* <div className="flex flex-col items-end gap-3">
//             <button
//                 onClick={onAddNew}
//                 className="bg-[#5E38BD] hover:bg-[#A25EFF] text-white font-semibold px-5 py-2 rounded-lg transition mt-2"
//             >
//                 + Add New Item
//             </button>
//         </div> */}
//     </div>
// );

// export default WalletHeader;

// // import React, { useEffect, useState } from 'react'
// // import WalletNavbar from '../../components/Navbar/WalletNavbar'
// // import { useUser } from '@supabase/auth-helpers-react'
// // import { assets } from '../../assets/assets'
// // import supabase from '../../helper/SupabaseClient'

// // const WalletHeader = ({ totalValue, totalItems, onAddNew }) => (
// //     <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 px-6 md:px-16 mt-8">
// //         <div>
// //             <h1 className="text-white text-3xl font-semibold mb-4">My Wallet</h1>
// //             <div className="flex gap-6">
// //                 <div className="bg-[#232336] rounded-xl px-6 py-4 flex flex-col items-center">
// //                     <span className="text-[#A25EFF] text-2xl font-bold">${totalValue.toLocaleString()}</span>
// //                     <span className="text-white/70 text-xs mt-1">Total Approximate Value</span>
// //                 </div>
// //                 <div className="bg-[#232336] rounded-xl px-6 py-4 flex flex-col items-center">
// //                     <span className="text-[#A25EFF] text-2xl font-bold">{totalItems}</span>
// //                     <span className="text-white/70 text-xs mt-1">Total Items</span>
// //                 </div>
// //             </div>
// //         </div>
// //         <div className="flex flex-col items-end gap-3">
// //             <button
// //                 onClick={onAddNew}
// //                 className="bg-[#5E38BD] hover:bg-[#A25EFF] text-white font-semibold px-5 py-2 rounded-lg transition mt-2"
// //             >
// //                 + Add New Item
// //             </button>
// //         </div>
// //     </div>
// // );

// // const Wallet = () => {
// //     const user = useUser();
// //     const [products, setProducts] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     const navbarUser = {
// //         name: user?.user_metadata?.first_name || user?.email || 'User',
// //         avatar_url: user?.user_metadata?.avatar_url || assets.default_avatar
// //     };

// //     useEffect(() => {
// //         const fetchProducts = async () => {
// //             if (!user) return;
// //             setLoading(true);
// //             const { data, error } = await supabase
// //                 .from('products')
// //                 .select('*')
// //                 .eq('user_id', user.id);
// //             if (!error) setProducts(data || []);
// //             setLoading(false);
// //         };
// //         fetchProducts();
// //     }, [user]);

// //     // Calculate total value (sum of price fields)
// //     const totalValue = products.reduce((sum, item) => {
// //         const price = Number(item.price) || 0;
// //         return sum + price;
// //     }, 0);

// //     const totalItems = products.length;

// //     return (
// //         <div className='min-h-screen bg-[#000000]'>
// //             <WalletNavbar user={navbarUser} />
// //             <WalletHeader
// //                 totalValue={totalValue}
// //                 totalItems={totalItems}
// //                 onAddNew={() => {/* handle add new item */ }}
// //             />
// //             {/* wallet content */}
// //             {loading ? (
// //                 <div className="text-white text-center mt-10">Loading...</div>
// //             ) : (
// //                 <div className="text-white text-center mt-10">
// //                     {/* Product grid will go here */}
// //                     {products.length === 0 && <div>No items yet.</div>}
// //                 </div>
// //             )}
// //         </div>
// //     )
// // }

// // export default Wallet
