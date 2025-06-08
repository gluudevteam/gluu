import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import { assets } from '../../assets/assets';


const Step4Instructions = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-[#101014] text-white flex flex-col">
            <TopBar />

            {/* gradient background */}
            <div
                className="absolute left-0 top-50 w-full h-[540px] z-0 pointer-events-none select-none"
                style={{
                    backgroundImage: `url(${assets.gradient_background_3})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-2 max-w-6xl mx-auto -mt-20">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* left: instructions */}
                    <div>
                        <div className="mb-4">
                            <button className="px-3 py-1 bg-[#222] text-sm rounded-full border border-white/10 mb-3">
                                Step 4
                            </button>
                            <h2 className="text-3xl md:text-4xl font-semibold font-inter leading-snug">
                                Get You AI Condition Report
                            </h2>
                            <p className="text-white/80 mt-4 max-w-md text-sm md:text-base">
                                Gluu's AI will analyze your item photo and generate a condition report—giving your insight into its state and potential repairs.
                            </p>
                        </div>
                    </div>

                    {/* right: jitter video */}
                    <div className="w-full flex justify-center items-center">
                        {/* video */}
                        {/* <video
                            src={assets.jitter_step1_video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="rounded-2xl shadow-lg max-w-100 h-auto"
                        /> */}
                        <img src={assets.step1_mockup} alt="Mockup" className="w-auto h-auto" />
                    </div>
                </div>

                {/* step indicator */}
                <div className="mt-20 mb-24 md:mb-10 flex items-center gap-2">
                    <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                    <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                    <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                    <div className="w-6 h-1.5 bg-[#5E38BD] rounded-full" />
                </div>
            </div>

            {/* navigation buttons at the bottom */}
            <div className="w-full py-4 px-6 md:px-15 flex justify-between items-center absolute left-0 bottom-0 md:bottom-10 z-20 pb-5">
                <button
                    className="text-sm text-white/70 hover:text-white transition cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
                <button
                    // link to next page
                    onClick={() => navigate('/onboarding/step-1/upload')}
                    className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Step4Instructions;
