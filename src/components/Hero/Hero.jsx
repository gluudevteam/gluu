import React from 'react'

const Hero = ({ title, subtitle, backgroundImage, children }) => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center min-h-[60vh] px-4 py-16 overflow-hidden" style={{ backgroundColor: '#101014' }}>
            {backgroundImage && (
                <img
                    src={backgroundImage}
                    alt=""
                    className="absolute inset-0 w-full h-fit object-cover z-0 pointer-events-none select-none py-60"
                    draggable={false}
                />
            )}
            <div className="z-10 relative">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">{subtitle}</p>
                {children}
            </div>
        </section>
    )
}

export default Hero
