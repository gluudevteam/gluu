import React, { useState } from 'react'

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('');
    }

    return (
        <section className="bg-[#111015] py-10 px-4 rounded-xl max-w-2xl mx-auto mt-16 mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
                Join the Gluu Community
            </h2>
            <p className="text-white/80 text-center mb-6 text-sm md:text-base">
                Subscribe for product updates, security insights, Canadian compliance information, and the latest on secure digital identity management—no spam, just the good stuff to keep your data and users safe.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 justify-center">
                <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="flex-1 px-4 py-2 rounded-md bg-[#222028] text-white placeholder-white/60 focus:outline-none"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
                >
                    Subscribe Now
                </button>
            </form>
        </section>
    )
}

export default Newsletter
