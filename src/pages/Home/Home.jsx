import React from 'react'
import Hero from '../../components/Hero/Hero'
import { assets } from '../../assets/assets'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import WhyChooseGluu from '../../components/WhyChooseGluu/WhyChooseGluu'
import Promotion from '../../components/Promotion/Promotion'


const Home = () => {
    return (
        <div className="min-h-screen bg-[#101014]">
            <Hero
                title={
                    <>
                        Your AI-Powered Wallet for <br />
                        Real World Assets
                    </>
                }
                subtitle="Gluu V0.5 helps you effortlessly create a digital inventory of your valuable possessions. Our AI assists with identification and provides approximate value suggestions, laying the foundation for future possibilities."
                backgroundImage={assets.hero_background}
            >
                <div className="flex gap-4 justify-center mt-8">
                    <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-semibold rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer">
                        Get Started Free
                    </button>
                    <button className="bg-[#39373D] text-white font-semibold rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer">
                        Learn More
                    </button>
                </div>
            </Hero>

            <HowItWorks />

            <WhyChooseGluu />

            <Promotion
                title="Ready to Start Your Digital Inventory?"
                subtitle="Join Gluu today and unlock the first step towards understanding and managing your valuable assets."
            >
                <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-semibold rounded-lg px-8 py-3 mt-8 shadow-md hover:opacity-90 transition cursor-pointer">
                    Get Started Free
                </button>
            </Promotion>
        </div>
    )
}

export default Home
