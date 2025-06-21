import { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [itemDetails, setItemDetails] = useState({
        brand: '',
        type: '',
        price: '',
        zip: ''
    });
    const [accountDetails, setAccountDetails] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    });
    const [aiInsights, setAiInsights] = useState({
        brand: '',
        material: '',
        conditionScore: '',
        approximatePrice: '',
        condition: '',
    })

    return (
        <OnboardingContext.Provider value={{
            images, setImages,
            itemDetails, setItemDetails,
            accountDetails, setAccountDetails
        }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => useContext(OnboardingContext);
