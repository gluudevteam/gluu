import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar/TopBar'

const steps = [
    {
        title: "1. Take a photo of your item",
        description: "Snap a clear photo of your item to help Gluu assess its condition. You’ll use this image to generate a condition report."
    },
    {
        title: "2. Tell us about your item",
        description: "Share some basic info, like the brand and estimated price. This helps keep your personal item list organized."
    },
    {
        title: "3. Sign Up",
        description: "Create a Gluu account using your email or Google. This gives you access to your personal wallet and AI features."
    },
    {
        title: "4. Get Your AI Condition Report",
        description: "Gluu’s AI will analyze your item photo and generate a condition report—giving you insight into its state and potential repairs."
    },
]

const SignUpLanding = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-[#101014] flex flex-col">
            <TopBar />
            {/* Gradient background */}
            <div
                className="absolute left-0 top-50 w-full h-[540px] z-0 pointer-events-none select-none"
                style={{
                    backgroundImage: `url(${assets.gradient_background_3})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="relative flex-1 flex flex-col justify-center z-10">
                <div className="flex flex-col md:flex-row items-start justify-between max-w-6xl mx-auto w-full px-6 pt-8">
                    {/* Left: Heading */}
                    <div className="flex-1 flex items-center justify-center md:justify-start min-h-[320px]">
                        <h1 className="text-white text-3xl md:text-5xl font-semibold font-inter leading-tight drop-shadow-lg">
                            It’s easy to get<br />started on Gluu
                        </h1>
                    </div>
                    {/* Right: Steps */}
                    <div className="flex-1 mt-12 md:mt-0 md:ml-12 w-full max-w-xl">
                        {steps.map((step, idx) => (
                            <div key={idx} className="mb-8 last:mb-0">
                                <div className="flex items-start">
                                    <div className="w-full">
                                        <h2 className="font-bold text-2xl md:text-3xl mb-2 text-[#A25EFF] font-inter">
                                            {step.title}
                                        </h2>
                                        <p className="text-sm md:text-base text-white font-inter mb-9 ml-8">
                                            {step.description}
                                        </p>
                                        <div className="border-b border-[#FFFFFF] mt-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Get Started Button */}
                <div className="flex justify-end max-w-6xl mx-auto w-full px-6 mt-8">
                    <button
                        className="bg-[#A25EFF] hover:bg-[#8d4be6] text-white font-inter font-semibold px-8 py-3 rounded-lg shadow transition"
                        onClick={() => navigate('/onboarding/step1-instructions')}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUpLanding