import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Chatbot from './components/Chatbot/Chatbot'
import HowItWorks from './pages/HowItWorks/HowItWorks'
import About from './pages/About/About'
import SignUpLanding from './pages/SignUpLanding/SignUpLanding'
import OnboardingStep1 from './pages/Onboarding/OnboardingStep1'
import OnboardingStep2 from './pages/Onboarding/OnboardingStep2'
import OnboardingStep3 from './pages/Onboarding/OnboardingStep3'
import OnboardingStep4 from './pages/Onboarding/OnboardingStep4'
import Pricing from './pages/Pricing/Pricing'
import Upgrade from './pages/Upgrade/Upgrade'
import Step1Instructions from './pages/Onboarding/Step1Instructions'
import Step2Instructions from './pages/Onboarding/Step2Instructions'

const HIDE_NAVBAR_ROUTES = [
    '/signup',
    '/onboarding/step1-instructions',
    '/onboarding/step2-instructions',
    '/onboarding/step-1',
    '/onboarding/step-2',
    '/onboarding/step-3',
    '/onboarding/step-4',
    '/upgrade'
]

const HIDE_CHATBOT_ROUTES = [
    '/onboarding/step1-instructions',
    '/onboarding/step2-instructions',
    
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

                {/* signup */}
                <Route path='/signup' element={<SignUpLanding />} />

                {/* onboarding instructions */}
                <Route path='/onboarding/step1-instructions' element={<Step1Instructions />} />
                <Route path='/onboarding/step2-instructions' element={<Step2Instructions />} />

                {/* onboarding */}
                <Route path='/onboarding/step-1' element={<OnboardingStep1 />} />
                <Route path='/onboarding/step-2' element={<OnboardingStep2 />} />
                <Route path='/onboarding/step-3' element={<OnboardingStep3 />} />
                <Route path='/onboarding/step-4' element={<OnboardingStep4 />} />

                {/* upgrade page */}
                <Route path='/upgrade' element={<Upgrade />} />
            </Routes>

            {/* chatbot */}
            {!hideChatbot && <Chatbot />}
        </>
    );
};

const App = () => (
    <Router>
        <AppContent />
    </Router>
);


export default App
