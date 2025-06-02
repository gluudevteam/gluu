import React from 'react'
import { assets } from '../../assets/assets'

const steps = [
    {
        icon: assets.robot_icon,
        title: "AI-Powered Insights",
        description: "Our AI helps identify your items, suggests approximate values, and (for Client Plus Users) assists with condition reporting."
    },
    {
        icon: assets.lock_icon,
        title: "Secure & Transparent",
        description: "Your data and valuables are protected by robust encryption and transparent processes."
    },
    {
        icon: assets.wallet_icon,
        title: "Your Smart Item Wallet",
        description: "A secure, digital home for all your valuable items. Track what you own, all in one place, with easy AI assistance."
    },
    {
        icon: assets.fast_forward_icon,
        title: "Start Free, Grow With Us",
        description: "Begin with our free Client tier to document up to 10 items. As your collection or needs grow, Client Plus offers more capacity and advanced AI features. Gluu V0.5 is just the beginning."
    },
    {
        icon: assets.lightning_icon,
        title: "Effortless Documentation",
        description: (
            <>
                <span className="text-[#5E38BD] font-bold">(Client Plus)</span> Speed up item entry with AI-powered uploads.
            </>
        )
    },
    {
        icon: assets.collection_icon,
        title: "Organize with Collections",
        description: (
            <>
                <span className="text-[#5E38BD] font-bold">(Client Plus)</span> Group your items into custom collections for better management (e.g. ‘Watch Collection’, ‘Art Pieces’).
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
