import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useNewItem } from '../../context/NewItemContext';
import { useUser } from '@supabase/auth-helpers-react';
import supabase from '../../helper/SupabaseClient';

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

const AddNewItem = () => {
    const navigate = useNavigate();
    const { setImages, setItemDetails } = useNewItem();
    const [images, setImagesLocal] = useState([]);
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const [itemCount, setItemCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // NEW: Store user data (for upload_limit)
    const [userData, setUserData] = useState(null);

    const fileInputRef = useRef(null);
    const user = useUser();

    // Fetch user data and item count
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            // Fetch item count
            const { count } = await supabase
                .from('products')
                .select('id', { count: 'exact', head: true })
                .eq('user_id', user.id);
            setItemCount(count || 0);
            // Fetch user data (plan, upload_limit)
            const { data: userRow } = await supabase
                .from('users')
                .select('*')
                .eq('email', user.email)
                .single();
            setUserData(userRow);
            setLoading(false);
        };
        if (user) fetchData();
    }, [user]);

    // Use dynamic upload limit (default to 10 if not loaded yet)
    const uploadLimit = userData?.upload_limit ?? 10;

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setImagesLocal(files.map(file => ({
                file,
                url: URL.createObjectURL(file)
            })));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (images.length === 0) newErrors.images = 'Please upload at least one image.';
        if (!brand.trim()) newErrors.brand = 'Brand is required.';
        if (!type.trim()) newErrors.type = 'Type is required.';
        if (!price || isNaN(price) || Number(price) <= 0) newErrors.price = 'Valid price is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async (e) => {
        e.preventDefault();
        if (itemCount >= uploadLimit) {
            setErrors({ limit: `You have reached your upload limit of ${uploadLimit} items. Upgrade to Client Plus to add more.` });
            return;
        }
        if (validate()) {
            // Convert images to base64
            const base64Images = await Promise.all(images.map(img => fileToBase64(img.file)));
            setImages(base64Images); // Save to context if needed elsewhere
            setItemDetails({ brand, type, price });

            // // INSERT INTO SUPABASE
            // const { error } = await supabase
            //     .from('products')
            //     .insert([{
            //         user_id: user.id,
            //         brand,
            //         type,
            //         price,
            //         images: base64Images, // <--- Save base64 array here!
            //     }]);
            // if (error) {
            //     setErrors({ submit: 'Failed to save item: ' + error.message });
            //     return;
            // }

            navigate('/ai-loading');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#101014] flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#101014] flex flex-col items-center py-10">
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

            <div className="bg-[#17161D] border border-[#5E38BD] rounded-2xl max-w-xl w-full p-8 mx-auto mt-20">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Add New Item</h2>
                <form onSubmit={handleNext} className="flex flex-col gap-6">
                    {errors.limit && <div className="text-red-400 text-sm mb-2">{errors.limit}</div>}

                    {/* Image Upload */}
                    <div>
                        <label className="block text-[#B0B0B0] text-sm mb-2">
                            Upload Images <span className="text-[#A25EFF]">*</span>
                        </label>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={itemCount >= uploadLimit}
                        />

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={itemCount >= uploadLimit}
                            className={`bg-[#232336] text-white border border-[#5E38BD] rounded-lg px-4 py-2 w-full text-center ${itemCount >= uploadLimit ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2d2d3a]'
                                }`}
                        >
                            Select Images
                        </button>

                        {errors.images && <div className="text-red-400 text-xs mt-1">{errors.images}</div>}

                        <div className="flex gap-2 mt-3 flex-wrap">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img.url}
                                    alt={`preview-${idx}`}
                                    className="w-20 h-20 object-cover rounded-lg border border-[#232336]"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-[#B0B0B0] text-sm mb-2">
                            Brand <span className="text-[#A25EFF]">*</span>
                        </label>
                        <input
                            type="text"
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none"
                            placeholder="e.g. Rolex"
                            disabled={itemCount >= uploadLimit}
                        />
                        {errors.brand && <div className="text-red-400 text-xs mt-1">{errors.brand}</div>}
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-[#B0B0B0] text-sm mb-2">
                            Type <span className="text-[#A25EFF]">*</span>
                        </label>
                        <input
                            type="text"
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none"
                            placeholder="e.g. Watch"
                            disabled={itemCount >= uploadLimit}
                        />
                        {errors.type && <div className="text-red-400 text-xs mt-1">{errors.type}</div>}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-[#B0B0B0] text-sm mb-2">
                            Price <span className="text-[#A25EFF]">*</span>
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none"
                            placeholder="e.g. 1200"
                            min="0"
                            step="any"
                            disabled={itemCount >= uploadLimit}
                        />
                        {errors.price && <div className="text-red-400 text-xs mt-1">{errors.price}</div>}
                    </div>

                    {/* Next button */}
                    <button
                        type="submit"
                        disabled={itemCount >= uploadLimit}
                        className={`bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-semibold rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition mt-4 ${itemCount >= uploadLimit ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        Next
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNewItem;

// 07/05/2025 - last functioning code
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { assets } from '../../assets/assets';
// import { useNewItem } from '../../context/NewItemContext';
// import { useUser } from '@supabase/auth-helpers-react';
// import supabase from '../../helper/SupabaseClient';

// const FREE_UPLOAD_LIMIT = 10;

// const AddNewItem = () => {
//     const navigate = useNavigate();
//     const { setImages, setItemDetails } = useNewItem();
//     const [images, setImagesLocal] = useState([]);
//     const [brand, setBrand] = useState('');
//     const [type, setType] = useState('');
//     const [price, setPrice] = useState('');
//     const [errors, setErrors] = useState({});
//     const [itemCount, setItemCount] = useState(0);
//     const [loading, setLoading] = useState(true);

//     const fileInputRef = useRef(null); // 🔑 Use ref

//     const user = useUser();

//     useEffect(() => {
//         const fetchItemCount = async () => {
//             if (!user) return;
//             const { count } = await supabase
//                 .from('products')
//                 .select('id', { count: 'exact', head: true })
//                 .eq('user_id', user.id);
//             setItemCount(count || 0);
//             setLoading(false);
//         };
//         if (user) fetchItemCount();
//     }, [user]);

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         if (files.length > 0) {
//             setImagesLocal(files.map(file => ({
//                 file,
//                 url: URL.createObjectURL(file)
//             })));
//         }
//     };

//     const validate = () => {
//         const newErrors = {};
//         if (images.length === 0) newErrors.images = 'Please upload at least one image.';
//         if (!brand.trim()) newErrors.brand = 'Brand is required.';
//         if (!type.trim()) newErrors.type = 'Type is required.';
//         if (!price || isNaN(price) || Number(price) <= 0) newErrors.price = 'Valid price is required.';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleNext = (e) => {
//         e.preventDefault();
//         if (itemCount >= FREE_UPLOAD_LIMIT) {
//             setErrors({ limit: 'You have reached the free tier limit of 10 items. Upgrade to Client Plus to add more.' });
//             return;
//         }
//         if (validate()) {
//             setImages(images.map(img => img.file));
//             setItemDetails({ brand, type, price });
//             navigate('/ai-loading');
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-[#101014] flex items-center justify-center">
//                 <div className="text-white text-xl">Loading...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#101014] flex flex-col items-center py-10">
//             {/* back button */}
//             <div className="w-full max-w-5xl mt-8 flex">
//                 <button
//                     onClick={() => navigate(-1)}
//                     className="flex items-center gap-2 bg-[#232336] text-white px-4 py-2 rounded-lg hover:bg-[#2d2d3a] transition cursor-pointer"
//                 >
//                     <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
//                         <path d="M15 19l-7-7 7-7" stroke="#A25EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                     Back
//                 </button>
//             </div>

//             <div className="bg-[#17161D] border border-[#5E38BD] rounded-2xl max-w-xl w-full p-8 mx-auto mt-20">
//                 <h2 className="text-white text-2xl font-bold mb-6 text-center">Add New Item</h2>
//                 <form onSubmit={handleNext} className="flex flex-col gap-6">
//                     {errors.limit && <div className="text-red-400 text-sm mb-2">{errors.limit}</div>}

//                     {/* Image Upload */}
//                     <div>
//                         <label className="block text-[#B0B0B0] text-sm mb-2">
//                             Upload Images <span className="text-[#A25EFF]">*</span>
//                         </label>

//                         <input
//                             ref={fileInputRef}
//                             type="file"
//                             accept="image/*"
//                             multiple
//                             onChange={handleImageChange}
//                             className="hidden"
//                             disabled={itemCount >= FREE_UPLOAD_LIMIT}
//                         />

//                         <button
//                             type="button"
//                             onClick={() => fileInputRef.current?.click()}
//                             disabled={itemCount >= FREE_UPLOAD_LIMIT}
//                             className={`bg-[#232336] text-white border border-[#5E38BD] rounded-lg px-4 py-2 w-full text-center ${itemCount >= FREE_UPLOAD_LIMIT ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2d2d3a]'
//                                 }`}
//                         >
//                             Select Images
//                         </button>

//                         {errors.images && <div className="text-red-400 text-xs mt-1">{errors.images}</div>}

//                         <div className="flex gap-2 mt-3 flex-wrap">
//                             {images.map((img, idx) => (
//                                 <img
//                                     key={idx}
//                                     src={img.url}
//                                     alt={`preview-${idx}`}
//                                     className="w-20 h-20 object-cover rounded-lg border border-[#232336]"
//                                 />
//                             ))}
//                         </div>
//                     </div>

//                     {/* Brand */}
//                     <div>
//                         <label className="block text-[#B0B0B0] text-sm mb-2">
//                             Brand <span className="text-[#A25EFF]">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             value={brand}
//                             onChange={e => setBrand(e.target.value)}
//                             className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none"
//                             placeholder="e.g. Rolex"
//                             disabled={itemCount >= FREE_UPLOAD_LIMIT}
//                         />
//                         {errors.brand && <div className="text-red-400 text-xs mt-1">{errors.brand}</div>}
//                     </div>

//                     {/* Type */}
//                     <div>
//                         <label className="block text-[#B0B0B0] text-sm mb-2">
//                             Type <span className="text-[#A25EFF]">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             value={type}
//                             onChange={e => setType(e.target.value)}
//                             className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none"
//                             placeholder="e.g. Watch"
//                             disabled={itemCount >= FREE_UPLOAD_LIMIT}
//                         />
//                         {errors.type && <div className="text-red-400 text-xs mt-1">{errors.type}</div>}
//                     </div>

//                     {/* Price */}
//                     <div>
//                         <label className="block text-[#B0B0B0] text-sm mb-2">
//                             Price <span className="text-[#A25EFF]">*</span>
//                         </label>
//                         <input
//                             type="number"
//                             value={price}
//                             onChange={e => setPrice(e.target.value)}
//                             className="w-full px-4 py-2 rounded-lg bg-[#232336] text-white outline-none"
//                             placeholder="e.g. 1200"
//                             min="0"
//                             step="any"
//                             disabled={itemCount >= FREE_UPLOAD_LIMIT}
//                         />
//                         {errors.price && <div className="text-red-400 text-xs mt-1">{errors.price}</div>}
//                     </div>

//                     {/* Next button */}
//                     <button
//                         type="submit"
//                         disabled={itemCount >= FREE_UPLOAD_LIMIT}
//                         className={`bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-semibold rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition mt-4 ${itemCount >= FREE_UPLOAD_LIMIT ? 'opacity-50 cursor-not-allowed' : ''
//                             }`}
//                     >
//                         Next
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddNewItem;
