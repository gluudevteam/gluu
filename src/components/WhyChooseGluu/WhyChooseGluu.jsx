import React from 'react'
import { assets } from '../../assets/assets'

const steps = [
    {
        icon: assets.robot_icon,
        title: "Delivering Insights",
        description: "To translate an asset's physical condition into actionable intelligence through a detailed Asset Profile. "
    },
    {
        icon: assets.lock_icon,
        title: "Secure & Transparent",
        description: "Your data is encrypted and protected. Only you can access your Smart Portfolio and Condition Report."
    },
    {
        icon: assets.wallet_icon,
        title: "Your Smart Asset Portfolio",
        description: "A secure, digital home for all your valuable items. Track what you own, all in one place, with assistance from your personal Gluu Agent."
    },
    {
        icon: assets.fast_forward_icon,
        title: "Start Free, Grow With Us",
        description: "Document your first 10 items for free. As your collection expands, upgrade to Client Plus to unlock advanced tools and greater capacity."
    },
    {
        icon: assets.lightning_icon,
        title: "AI-Assisted Entry",
        description: "Let our AI streamline your uploads, dramatically reducing the time and effort required to document each item."
    },
    {
        icon: assets.collection_icon,
        title: "Curate Your Portfolio",
        description: (
            <>
                <span className="text-[#5E38BD] font-bold">(Client Plus)</span> Group your assets into custom Collections, giving you powerful control to organize and manage your portfolio with precision.
            </>
        )
    },
]
const WhyChooseGluu = () => {
    return (
        <div>
            <section className="py-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#5E38BD] to-[#A25EFF] bg-clip-text text-transparent">
                    Why Choose Gluu?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="bg-[#17161D] rounded-xl p-8 flex-1 flex flex-col items-start text-left shadow-lg"
                        >
                            <img src={step.icon} alt="" className="w-12 h-12 mb-4" />
                            <h3 className="text-lg font-bold mb-2 text-white">
                                {step.title}
                            </h3>
                            <p className="text-gray-300">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default WhyChooseGluu
