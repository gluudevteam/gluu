import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import TopBar from '../../components/TopBar/TopBar';
import { toast } from 'react-hot-toast';
import { assets } from '../../assets/assets';

const Step2 = () => {
    const navigate = useNavigate();
    const { itemDetails, setItemDetails } = useOnboarding();

    const handleChange = (e) => {
        setItemDetails({
            ...itemDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleNext = () => {
        const { brand, type, price, zip } = itemDetails;
        if (
            !brand.trim() ||
            !type.trim() ||
            !price.toString().trim() ||
            !zip.trim()
        ) {
            toast.error("Please fill out all fields to continue.");
            return;
        }
        navigate('/onboarding-step3');
    };

    const handleBack = () => {
        navigate('/onboarding-step1');
    };

    return (
        <div className='min-h-screen bg-[#101014] flex flex-col'>
            <div className="relative z-10 flex-grow flex flex-col">
                <TopBar />

                <div className="flex-grow flex flex-col justify-center items-center px-4">
                    <div className="w-full flex justify-center items-center">
                        <div className="bg-[#17161D] border border-[#5E38BD] rounded-[30px] p-8 md:p-12 max-w-lg w-full mx-auto">
                            <h2 className="text-white text-2xl font-semibold text-center mb-2">Provide your item details</h2>
                            <p className="text-white/80 text-start mb-6 text-sm">
                                Let us know a bit more about your item—its brand, condition, and any unique features. This helps us tailor your AI report to your specific product.
                            </p>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="brand"
                                    placeholder="Brand"
                                    value={itemDetails.brand}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="type"
                                    placeholder="Type"
                                    value={itemDetails.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={itemDetails.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="Your Zip Code"
                                    value={itemDetails.zip}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 mb-24 md:mb-10 flex items-center gap-2">
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-6 h-1.5 bg-[#5E38BD] rounded-full" />
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                    </div>
                </div>

                <div className="flex justify-between items-center py-4 px-6 md:px-15">
                    <button
                        onClick={handleBack}
                        className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
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

export default Step2;