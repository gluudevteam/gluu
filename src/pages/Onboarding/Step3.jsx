import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import TopBar from '../../components/TopBar/TopBar';
import { toast } from 'react-hot-toast';
import { assets } from '../../assets/assets';
import supabase from '../../helper/SupabaseClient';

const Step3 = () => {
    const navigate = useNavigate();
    const { accountDetails, setAccountDetails } = useOnboarding();

    const handleChange = (e) => {
        setAccountDetails({
            ...accountDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleNext = async () => {
        const { firstName, lastName, phone, email, password } = accountDetails;
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !phone.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            toast.error("Please fill out all fields to continue.");
            return;
        }

        // sign up with supabase auth
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone,
                }
            }
        })

        if (error) {
            toast.error(error.message || "Sign up failed.");
            return;
        }

        toast.success("Account created! Please check your email to confirm.")

        navigate('/onboarding-ai-loading');
    };

    const handleBack = () => {
        navigate('/onboarding-step2');
    };

    return (
        <div className='min-h-screen bg-[#101014] flex flex-col'>
            <div className="relative z-10 flex-grow flex flex-col">
                <TopBar />

                <div className="flex-grow flex flex-col justify-center items-center px-4">
                    <div className="w-full flex justify-center items-center">
                        <div className="bg-[#17161D] border border-[#5E38BD] rounded-[30px] p-8 md:p-12 max-w-lg w-full mx-auto">
                            <h2 className="text-white text-2xl font-semibold text-center mb-6">Create Your Account With Gluu</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={accountDetails.firstName}
                                        onChange={handleChange}
                                        className="w-1/2 px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={accountDetails.lastName}
                                        onChange={handleChange}
                                        className="w-1/2 px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone No."
                                    value={accountDetails.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={accountDetails.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={accountDetails.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#232336] text-white placeholder-gray-400 focus:outline-none"
                                />

                                <button
                                    onClick={handleNext}
                                    className="bg-gradient-to-r from-[#A25EFF] via-[#5E38BD] to-[#5E38BD] text-white font-normal rounded-lg px-8 py-3 shadow-md hover:opacity-90 transition cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>

                            <div className="my-4 text-center text-white/70 text-sm">or register with</div>
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#232336] text-white font-medium hover:bg-[#232336]/80 transition cursor-pointer">
                                <img src={assets.google_logo} alt="Google logo" />
                                Google
                            </button>
                            <div className="mt-4 text-center text-white/60 text-sm">
                                Already have an account? <a href="/login" className="underline">Login</a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 mb-24 md:mb-10 flex items-center gap-2">
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-6 h-1.5 bg-[#5E38BD] rounded-full" />
                        <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                    </div>
                </div>

                <div className="flex justify-between items-center py-4 px-6 md:px-15">
                    <button
                        onClick={handleBack}
                        className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
                    >
                        Back
                    </button>

                </div>
            </div>

            <img
                src={assets.gradient_background_4}
                alt=""
                className="pointer-events-none select-none absolute bottom-0 left-0 w-full z-0"
                style={{ objectFit: 'cover' }}
                draggable={false}
            />
        </div>
    );
};

export default Step3;