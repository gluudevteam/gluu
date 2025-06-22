import React from 'react'
import { assets } from '../../assets/assets'
import Hero from '../../components/Hero/Hero'
import WhyChooseGluu from '../../components/WhyChooseGluu/WhyChooseGluu'
import WhatWeOffer from '../../components/WhatWeOffer/WhatWeOffer'
import OurMission from '../../components/OurMission/OurMission'
import WhoUsesGluu from '../../components/WhoUsesGluu/WhoUsesGluu'
import OurPartners from '../../components/OurPartners/OurPartners'
import FooterPromotion from '../../components/FooterPromotion/FooterPromotion'
import { Link } from 'react-router-dom'

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
                subtitle="Every valuable asset you own deserves a digital identity. For too long, the things we own have been overlooked and disconnected. Gluu brings them into the light, ensuring they are seen, understood, and valued."
                backgroundImage={assets.hero_background}
            >
                <div className="flex gap-4 justify-center mt-8">
                    <Link to='/onboarding-step1'>
                        <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer">
                            Get Started Free
                        </button>
                    </Link>
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
                <Link to='/onboarding-step1'>
                    <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 mt-8 shadow-md hover:opacity-90 transition cursor-pointer">
                        Get Started Free
                    </button>
                </Link>
            </FooterPromotion>
        </div>
    )
}

export default About
