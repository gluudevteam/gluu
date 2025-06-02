import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Chatbot from './components/Chatbot/Chatbot'
import HowItWorks from './pages/HowItWorks/HowItWorks'

const App = () => {
    return (
        <Router>
            {/* navbar */}
            <Navbar />
            
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/how-it-works' element={<HowItWorks />} />
            </Routes>
            {/* footer */}
            

            {/* chatbot */}
            <Chatbot />
        </Router>
    )
}

export default App
