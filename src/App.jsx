import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Chatbot from './components/Chatbot/Chatbot'
import HowItWorks from './pages/HowItWorks/HowItWorks'
import About from './pages/About/About'

const App = () => {
    return (
        <Router>
            {/* navbar */}
            <Navbar />
            
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/how-it-works' element={<HowItWorks />} />
                <Route path='/about' element={<About />} />
            </Routes>
            {/* footer */}
            

            {/* chatbot */}
            <Chatbot />
        </Router>
    )
}

export default App
