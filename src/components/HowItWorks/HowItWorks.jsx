import React from 'react'
import { assets } from '../../assets/assets'

const steps = [
    {
        icon: assets.how_it_works_step_1,
        title: "1. Document Your Assets",
        description: (
            <>
                Securely upload details and images of your items into your personal <span className="text-[#5E38BD] font-bold">Gluu Portfolio</span>. The platform assists in identifying and categorizing your valuables.
            </>
        )
    },
    {
        icon: assets.how_it_works_step_2,
        title: "2. Get AI-Powered Insights",
        description: "Leverage the platform for approximate value suggestions based on item details and market data. Understand your collection's potential worth."
    },
    {
        icon: assets.how_it_works_step_3,
        title: "3. Build Your Digital Inventory",
        // description: (
        //     <>
        //         Create a comprehensive record of your Real World Asset (RWAs). Your Gluu Wallet is the first step towards organizing your assets and unlocking their future potential.{" "}
        //         <span className="text-[#5E38BD] font-bold">
        //             (Future versions will explore transaction capabilities!)
        //         </span>
        //     </>
        // )
        description: (
            <>
                Create a comprehensive record of your Real World Assets (RWAs). Your <span className="text-[#5E38BD] font-bold">Gluu Portfolio</span> is the first step towards organizing your assets and unlocking their future potential.
            </>
        )
    },
]

const HowItWorks = () => {
    return (
        <section className="py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#5E38BD] to-[#A25EFF] bg-clip-text text-transparent">
                How It Works
            </h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto px-4">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className="bg-[#17161D] rounded-xl p-8 flex-1 flex flex-col items-start text-left shadow-lg"
                    >
                        <img src={step.icon} alt="" className="w-12 h-12 mb-4 self-center" />
                        <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-[#F3EBFF] to-[#5E38BD] bg-clip-text text-transparent">
                            {step.title}
                        </h3>
                        <p className="text-gray-300">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default HowItWorks