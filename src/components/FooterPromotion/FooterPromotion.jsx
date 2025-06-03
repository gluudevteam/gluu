import React from 'react'

const FooterPromotion = ({ title, subtitle, children }) => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center min-h-[40vh] px-4 py-16 overflow-hidden">

            <div className="z-10 relative">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-[#5E38BD] to-[#A25EFF] bg-clip-text text-transparent">{title}</h1>
                <p className="text-gray-200 max-w-2xl mx-auto">{subtitle}</p>
                {children}
            </div>
        </section>
    )
}

export default FooterPromotion
