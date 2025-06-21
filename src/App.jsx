import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Chatbot from './components/Chatbot/Chatbot'
import HowItWorks from './pages/HowItWorks/HowItWorks'
import About from './pages/About/About'
import SignUpLanding from './pages/SignUpLanding/SignUpLanding'
import Pricing from './pages/Pricing/Pricing'
import Upgrade from './pages/Upgrade/Upgrade'
import Step1 from './pages/Onboarding/Step1'
import Step2 from './pages/Onboarding/Step2'
import Step3 from './pages/Onboarding/Step3'
import Step4 from './pages/Onboarding/Step4'
import OnboardingAiLoading from './pages/Onboarding/OnboardingAiLoading.jsx'
import { OnboardingProvider } from './context/OnboardingContext.jsx'
import { Toaster } from 'react-hot-toast';

const HIDE_NAVBAR_ROUTES = [
    '/signup',
    '/upgrade',
    '/onboarding-step1',
    '/onboarding-step2',
    '/onboarding-step3',
    '/onboarding-step4',
    '/onboarding-ai-loading',
]

const HIDE_CHATBOT_ROUTES = [
    '/onboarding-step1',
    '/onboarding-step2',
    '/onboarding-step3',
    '/onboarding-step4',
    '/onboarding-ai-loading',
]

const AppContent = () => {
    const location = useLocation();
    const hideNavbar = HIDE_NAVBAR_ROUTES.includes(location.pathname);
    const hideChatbot = HIDE_CHATBOT_ROUTES.includes(location.pathname);
    return (
        <>
            {/* navbar */}
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/how-it-works' element={<HowItWorks />} />
                <Route path='/pricing' element={<Pricing />} />
                <Route path='/about' element={<About />} />

                {/* onboarding steps */}
                <Route path='/onboarding-step1' element={<Step1 />} />
                <Route path='/onboarding-step2' element={<Step2 />} />
                <Route path='/onboarding-step3' element={<Step3 />} />
                <Route path='/onboarding-step4' element={<Step4 />} />
                <Route path='/onboarding-ai-loading' element={<OnboardingAiLoading />} />

                {/* signup */}
                <Route path='/signup' element={<SignUpLanding />} />

                {/* upgrade page */}
                <Route path='/upgrade' element={<Upgrade />} />
            </Routes>

            {/* chatbot */}
            {!hideChatbot && <Chatbot />}

            {/* toast notification */}
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

const App = () => (
    <Router>
        <OnboardingProvider>
            <AppContent />
        </OnboardingProvider>
    </Router>
);


export default App
