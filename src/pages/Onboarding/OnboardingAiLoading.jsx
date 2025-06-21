import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { assets } from '../../assets/assets';

const OnboardingAiLoading = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding-step4');
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#101014] flex flex-col justify-center items-center">
            <img src={assets.gluu_logo} alt="Gluu logo" className="h-12 mb-10" />
            <GridLoader
                color="#5E38BD"
                loading={true}
                size={15}
                margin={2}
                className="mb-10"
            />
            <p className="text-white text-lg mt-8 text-center">
                AI is processing your item. Please wait...
            </p>
        </div>
    );
};

export default OnboardingAiLoading;