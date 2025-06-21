import React, { useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import TopBar from '../../components/TopBar/TopBar';
import { assets } from '../../assets/assets';
import { toast } from 'react-hot-toast';

const Step1 = () => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { images, setImages } = useOnboarding();

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => [...prev, { id: Date.now() + Math.random(), src: reader.result }]);
            };
            reader.readAsDataURL(file);
        });

        event.target.value = null;
    };

    const handleRemove = (id) => {
        setImages(prev => prev.filter(image => image.id !== id));
    };

    return (
        <div className='min-h-screen bg-[#101014] flex flex-col'>
            <div className="relative z-10 flex-grow flex flex-col">
                <TopBar />

                <div className="flex-grow flex flex-col justify-center items-center px-4">
                    <div className="w-full max-w-[1000px] mx-auto">
                        <h1 className="text-2xl md:text-3xl font-semibold text-left text-white mb-5">
                            Add some photos of your item
                        </h1>
                        <p className="text-sm text-white text-left mb-8">
                            You'll need to upload at least one photo to get started. Click to upload photos. Include front, back, and any flaws if applicable.
                        </p>
                    </div>

                    <div className="w-full max-w-[1000px] flex flex-col items-center">
                        <div className="w-full h-[400px] border-2 border-dashed border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-900/40">
                            <img src={assets.camera_icon} alt="Camera" className="mb-4" />
                            <button
                                onClick={handleButtonClick}
                                className="border-[0.5px] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
                            >
                                Add photos
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        {images.length > 0 && (
                            <div className="mt-6 w-full grid grid-cols-2 md:grid-cols-3 gap-4">
                                {images.map(image => (
                                    <div
                                        key={image.id}
                                        className="relative border border-gray-700 rounded-lg overflow-hidden shadow-lg"
                                    >
                                        <img
                                            src={image.src}
                                            alt="Preview"
                                            className="w-full h-auto object-cover"
                                        />
                                        <button
                                            onClick={() => handleRemove(image.id)}
                                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
                                            title="Remove image"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-20 mb-24 md:mb-10 flex items-center gap-2">
                        <div className="w-6 h-1.5 bg-[#5E38BD] rounded-full" />
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                    </div>
                </div>

                <div className="flex justify-end items-center py-4 px-6 md:px-15">
                    {/* <button
                    onClick={() => navigate('/onboarding-step2')}
                    className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
                >
                    Next
                </button> */}

                    <button
                        onClick={() => {
                            if (images.length > 0) {
                                navigate('/onboarding-step2');
                            } else {
                                toast.error('Please upload at least one image to continue.')
                            }
                        }}
                        disabled={images.length === 0}
                        className={`bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md transition cursor-pointer
                        ${images.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
                    `}
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

export default Step1;
