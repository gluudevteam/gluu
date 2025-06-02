import React from 'react'
import { assets } from '../../assets/assets'

const Promotion = ({ title, subtitle, children }) => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center min-h-[40vh] px-4 py-16 overflow-hidden"
            style={{
                backgroundImage: `url(${assets.gradient_background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            <div className="z-10 relative">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h1>
                <p className="text-gray-200 max-w-2xl mx-auto">{subtitle}</p>
                {children}
            </div>
        </section>
    )
}

export default Promotion
