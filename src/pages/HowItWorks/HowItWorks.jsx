import React from 'react'
// import GreetingRobot from '../../components/GreetingRobot/GreetingRobot'
import Hero from '../../components/Hero/Hero'
import { assets } from '../../assets/assets'
import OnboardingInstructions from '../../components/OnboardingInstructions/OnboardingInstructions'
import StepInstructions from '../../components/OnboardingInstructions/StepInstructions'
import FooterPromotion from '../../components/FooterPromotion/FooterPromotion'
import { Link } from 'react-router-dom'

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-[#101014]">
            <Hero
                title="How Does Gluu Work?"
                subtitle="From snap to smart report—see your items in a whole new way with Gluu."
                backgroundImage={assets.hero_background}
            >
                <div className='flex gap-4 justify-center mt-8'>
                    <Link to='/onboarding-step1'>
                        <button className='bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer'>
                            Get Started Free
                        </button>
                    </Link>
                </div>
            </Hero>

            {/* <OnboardingInstructions /> */}

            {/* <Step1Instructions />

            <Step2Instructions /> */}

            {/* step 1 */}
            <StepInstructions
                step={1}
                title="Take a photo of your item"
                description="In this step, we’ll ask you to snap a clear photo of your item to help Gluu assess its condition. Gluu will use this image to generate a condition report."
                mockupSrc={assets.step1_mockup}
            />

            {/* step 2 */}
            <StepInstructions
                step={2}
                title="Describe your item"
                description="Share some basic information, like the brand and estimated price. This helps keep your personal item list organized."
                mockupSrc={assets.step2_mockup}
                reverse
            />

            {/* step 3 */}
            <StepInstructions
                step={3}
                title="Sign Up"
                description="Create your account in 4 easy steps now and unlock full access!"
                mockupSrc={assets.step3_mockup}
            />

            {/* step 4 */}
            <StepInstructions
                step={4}
                title={
                    <>
                        Get Your Detailed <br />
                        Asset Profile
                    </>
                }
                description="Create your account in 4 easy steps now and unlock full access!"
                mockupSrc={assets.step4_mockup}
                reverse
            />

            <FooterPromotion
                title="Ready to Start Your Digital Inventory?"
                subtitle="At Gluu, our mission is to empower individuals by making it simple to document, understand, and ultimately realize the full potential of their Real World Assets. With V0.5, we're starting with a foundational portfolio, helping you build a clear picture of what you own and its approximate value. "
            >
                <div className='flex gap-4 justify-center mt-8'>
                    <Link to='/onboarding-step1'>
                        <button className='bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer'>
                            Get Started Free
                        </button>
                    </Link>
                </div>
            </FooterPromotion>
        </div>

    )
}

export default HowItWorks
