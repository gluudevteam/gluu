import React from 'react'
import { assets } from '../../assets/assets'

const Step2Instructions = () => {
    return (
        <div className='mt-50 flex flex-col'>
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-2 max-w-6xl mx-auto -mt-20">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* left: instructions */}
                    <div>
                        <div className="mb-4">
                            <button className="px-3 py-1 bg-[#222] text-sm rounded-full border border-white text-white mb-3">
                                Step 1
                            </button>
                            <h2 className="text-3xl md:text-4xl text-white font-semibold font-inter leading-snug">
                                Take a photo of your item
                            </h2>
                            <p className="text-white/80 mt-4 max-w-md text-sm md:text-base">
                                In this step, we’ll ask you to snap a clear photo of your item to help Gluu assess its
                                condition. Gluu will use this image to generate a condition report.
                            </p>
                        </div>
                    </div>

                    {/* right: mockup image */}
                    <div className="w-full flex justify-center items-center">
                        <img src={assets.step1_mockup} alt="Mockup" className="w-auto h-auto" />
                    </div>
                </div>

                {/* step indicator */}
                {/* <div className="mt-20 mb-24 md:mb-10 flex items-center gap-2">
                    <div className="w-6 h-1.5 bg-[#5E38BD] rounded-full" />
                    <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                    <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                    <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                </div> */}
            </div>
        </div>
    )
}

export default Step2Instructions
