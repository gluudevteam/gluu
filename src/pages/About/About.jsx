import React from 'react'
import { assets } from '../../assets/assets'
import Hero from '../../components/Hero/Hero'
import WhyChooseGluu from '../../components/WhyChooseGluu/WhyChooseGluu'
import WhatWeOffer from '../../components/WhatWeOffer/WhatWeOffer'
import OurMission from '../../components/OurMission/OurMission'
import WhoUsesGluu from '../../components/WhoUsesGluu/WhoUsesGluu'
import OurPartners from '../../components/OurPartners/OurPartners'
import FooterPromotion from '../../components/FooterPromotion/FooterPromotion'

const About = () => {
    return (
        <div className="min-h-screen bg-[#101014]">
            <Hero
                title={
                    <>
                        Turning Everyday Items <br />
                        into Digital Assets
                    </>
                }
                subtitle="We live in a world where everything is connected — yet the things we own are often overlooked, undervalued, or forgotten. At Gluu, we’re changing that. We believe that your physical items deserve a digital identity."
                backgroundImage={assets.hero_background}
            >
                <div className="flex gap-4 justify-center mt-8">
                    <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer">
                        Get Started Free
                    </button>
                </div>
            </Hero>

            <OurMission />

            <WhatWeOffer />

            <WhoUsesGluu />

            <OurPartners />

            <FooterPromotion
                title="Open Your AI Wallet for Valuables — Free!"
                subtitle="Join collectors and owners who use Gluu to organize, document and discover the value of what they own."
            >
                <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 mt-8 shadow-md hover:opacity-90 transition cursor-pointer">
                    Get Started Free
                </button>
            </FooterPromotion>
        </div>
    )
}

export default About
