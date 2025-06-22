import React from 'react'
import Hero from '../../components/Hero/Hero'
import { assets } from '../../assets/assets'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import WhyChooseGluu from '../../components/WhyChooseGluu/WhyChooseGluu'
import Promotion from '../../components/Promotion/Promotion'
import { Link } from 'react-router-dom'
import Newsletter from '../../components/Newsletter/Newsletter'


const Home = () => {
    return (
        <div className="min-h-screen bg-[#101014]">
            <Hero
                title={
                    <>
                        The Smart Portfolio for Your <br />
                        Real World Assets
                    </>
                }
                subtitle="Gluu V0.5 helps you effortlessly create a digital inventory of your valuable possessions. The platform assists with identification and provides approximate value suggestions, laying the foundation for future possibilities."
                backgroundImage={assets.hero_background}
            >
                <div className="flex gap-4 justify-center mt-8">
                    <Link to='/onboarding-step1'>
                        <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer">
                            Get Started Free
                        </button>
                    </Link>
                    <Link to='/about'>
                        <button className="bg-[#39373D] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer">
                            Learn More
                        </button>
                    </Link>
                </div>
            </Hero>

            <HowItWorks />

            <WhyChooseGluu />

            <Newsletter />

            <Promotion
                title="Ready to Start your Gluu Portfolio?"
                subtitle="Create your Gluu account here to start building your Smart Portfolio. "
            >
                <Link to='/onboarding-step1'>
                    <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 mt-8 shadow-md hover:opacity-90 transition cursor-pointer">
                        Get Started Free
                    </button>
                </Link>
            </Promotion>
        </div>
    )
}

export default Home
