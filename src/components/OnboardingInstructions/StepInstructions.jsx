import React from 'react';

const StepInstructions = ({ step, title, description, mockupSrc, reverse = false }) => {
    return (
        <div className='mt-50 flex flex-col'>
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-2 max-w-6xl mx-auto -mt-20">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* instructions */}
                    <div className={
                        reverse
                            ? "md:order-2 text-right flex flex-col items-center"
                            : "md:order-1 text-left flex flex-col items-center"
                    }>
                        <div className="mb-4">
                            <button className="px-3 py-1 bg-[#222] text-sm rounded-full border border-white text-white mb-3">
                                Step {step}
                            </button>
                            <h2 className="text-3xl md:text-4xl text-white font-semibold font-inter leading-snug">
                                {title}
                            </h2>
                            <p className="text-white/80 mt-4 max-w-md text-sm md:text-base">
                                {description}
                            </p>
                        </div>
                    </div>
                    {/* mockup image */}
                    <div className={
                        reverse
                            ? "md:order-1 flex justify-start items-center"
                            : "md:order-2 flex justify-center items-center"
                    }>
                        <img src={mockupSrc} alt="Mockup" className="w-auto h-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepInstructions;