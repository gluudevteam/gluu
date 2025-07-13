import React, { useState } from 'react'
import supabase from '../../helper/SupabaseClient'
import { toast } from 'react-hot-toast'

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // subscribe to gluu logic
        setLoading(true)

        try {
            const normalizedEmail = email.trim().toLowerCase()

            const { error } = await supabase
                .from('subscribers')
                .insert({ email: normalizedEmail })

            if (error) {
                if (error.code === '23505') {
                    toast.error('You are already subscribed.')
                } else {
                    toast.error('There was an error subscribing. Please try again.')
                    console.error(error)
                }
            } else {
                toast.success('Thanks for subscribing!')
                setEmail('')
            }
        } finally {
            setLoading(false)
        }
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
                    disabled={loading}
                    className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
                >
                    {/* Subscribe Now */}
                    {loading ? 'Subscribing...' : 'Subscribe Now'}
                </button>
            </form>
        </section>
    )
}

export default Newsletter
