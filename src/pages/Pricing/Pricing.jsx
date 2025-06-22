import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../../components/Hero/Hero'
import PricingPlan from '../../components/PricingPlan/PricingPlan'
import { assets } from '../../assets/assets'
import FooterPromotion from '../../components/FooterPromotion/FooterPromotion'
import Modal from '../../components/Modal/Modal'

const plans = [
    {
        title: 'Client',
        price: '$0',
        description: 'Perfect for getting started. Document your first few valuable items in your AI-powered Gluu wallet.',
        features: [
            'Up to 10 Item Uploads to Your Wallet',
            'AI Assistant (Item understanding & value suggestions)',
            'Secure Digital Wallet',
            'View AI Approximate Value Suggestions',
        ],
        buttonText: 'Get Started Free',
    },
    {
        title: 'Client Plus',
        price: '$1.95',
        description: 'Unlock more capacity and powerful AI features for comprehensive asset management and insights.',
        features: [
            'All Client Tier features, PLUS:',
            'Up to 200 Item Uploads to Your Wallet',
            'AI-Powered Item Upload (Faster Documentation)',
            'Create & Organize Items with Collections',
        ],
        buttonText: 'Upgrade to Client Plus',
    },
]

const Pricing = () => {
    const [selected, setSelected] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const handleButtonClick = (plan) => {
        if (plan.title === 'Client Plus') {
            setShowModal(true)
        }
    }

    const handleModalConfirm = () => {
        setShowModal(false)
        navigate('/upgrade')
    }

    return (
        <div className="min-h-screen bg-[#101014]">
            <Hero
                title={
                    <>
                        Flexible plans to value your <br />
                        Real World Assets
                    </>
                }
                subtitle="Start for free, document up to 10 items, and unlock advanced AI features with Client Plus. Choose the plan that fits your collection."
                backgroundImage={assets.hero_background}
            />

            {/* pricing plans */}
            <div className="flex flex-col md:flex-row gap-6 justify-center -mt-30 relative z-10">
                {plans.map((plan, idx) => (
                    <PricingPlan
                        key={plan.title}
                        {...plan}
                        highlighted={selected === idx}
                        onClick={() => setSelected(idx)}
                        onButtonClick={() => handleButtonClick(plan)}
                    />
                ))}
            </div>

            <Modal
                open={showModal}
                title="Upgrade to Client Plus"
                message="Are you sure you want to upgrade to Client Plus?"
                onClose={() => setShowModal(false)}
                onConfirm={handleModalConfirm}
            />

            {/* promotion */}
            <FooterPromotion
                title="Ready to Start Your Digital Inventory?"
                subtitle="At Gluu, our mission is to empower individuals by making it simple to document, understand, and ultimately realize the full potential of their Real World Assets. With V0.5, we're starting with a foundational AI-powered wallet, helping you build a clear picture of what you own and its approximate value. We believe this is the first step towards a more transparent and accessible future for RWA management."
            >
                <Link to='/onboarding-step1'>
                    <button className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 mt-8 shadow-md hover:opacity-90 transition cursor-pointer">
                        Learn More About Gluu
                    </button>
                </Link>
            </FooterPromotion>
        </div>
    )
}

export default Pricing
