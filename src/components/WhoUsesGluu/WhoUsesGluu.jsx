import React from 'react'
import { assets } from '../../assets/assets'

const testimonials = [
    {
        name: 'Client Name',
        role: 'Role or Position',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg', // Replace with your asset if needed
        goals: 'Start documenting her growing collection of vintage film cameras, get a better understanding of value, keep items organized, and feel confident with a digital record.',
        painPoints: 'No central list, worries about details, formal valuation confusion, scalability concerns.',
        quote: 'Gluu is perfect for someone like me just starting to take collecting seriously. The AI gives me a good baseline for value and condition without any hassle.',
    },
    {
        name: 'Client Name',
        role: 'Role or Position',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        goals: 'Start documenting her growing collection of vintage film cameras, get a better understanding of value, keep items organized, and feel confident with a digital record.',
        painPoints: 'No central list, worries about details, formal valuation confusion, scalability concerns.',
        quote: 'Gluu is perfect for someone like me just starting to take collecting seriously. The AI gives me a good baseline for value and condition without any hassle.',
    },
    {
        name: 'Client Name',
        role: 'Role or Position',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        goals: 'Start documenting her growing collection of vintage film cameras, get a better understanding of value, keep items organized, and feel confident with a digital record.',
        painPoints: 'No central list, worries about details, formal valuation confusion, scalability concerns.',
        quote: 'Gluu is perfect for someone like me just starting to take collecting seriously. The AI gives me a good baseline for value and condition without any hassle.',
    },
]

const WhoUsesGluu = () => (
    <section
        className="py-16 mb-20"
        style={{
            backgroundImage: `url(${assets.gradient_background_2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#5E38BD] to-[#A25EFF] bg-clip-text text-transparent">
            Who Uses Gluu?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {testimonials.map((t, idx) => (
                <div key={idx} className="p-8 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-[#A25EFF]" />
                        <div>
                            <div className="text-white font-bold">{t.name}</div>
                            <div className="text-gray-400 text-sm">{t.role}</div>
                        </div>
                    </div>
                    <div className="mb-2">
                        <span className="font-bold text-[#5E38BD]">Goals:</span>
                        <span className="text-gray-200 ml-1">{t.goals}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-bold text-[#A25EFF]">Pain Points:</span>
                        <span className="text-gray-200 ml-1">{t.painPoints}</span>
                    </div>
                    <blockquote className="border-l-4 border-[#A25EFF] pl-4 italic text-gray-200 mt-4">
                        "{t.quote}"
                    </blockquote>
                </div>
            ))}
        </div>
    </section>
)

export default WhoUsesGluu