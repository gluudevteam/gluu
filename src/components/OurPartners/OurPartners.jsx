import React from 'react'
import { assets } from '../../assets/assets'

const partners = [
    { name: 'Dify', icon: assets.dify_icon },
    { name: 'OpenAI', icon: assets.open_ai_icon },
    { name: 'Stripe', icon: assets.stripe_icon },
    { name: 'Vercel', icon: assets.vercel_icon },
    { name: 'Supabase', icon: assets.supabase_icon },
]

const OurPartners = () => {
    return (
        <section className="py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#5E38BD] to-[#A25EFF] bg-clip-text text-transparent">
                Our Partners
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
                {partners.map((partner, idx) => (
                    <div
                        key={idx}
                        className="w-28 h-28 flex items-center justify-center rounded-lg"
                    >
                        <img
                            src={partner.icon}
                            alt={partner.name}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default OurPartners