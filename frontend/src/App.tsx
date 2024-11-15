// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';  // Keeping the HomePage component
import Navbar from './components/navbar/Navbar';  
import Footer from './components/footer/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* HomePage component */}
          <Route path="/" element={<HomePage />} />
          {/* Placeholder routes for other pages */}
          <Route path="/signup-login" element={<div>Signup/Login Page</div>} />
          <Route path="/music" element={<div>Music Page</div>} />
          <Route path="/videos" element={<div>Videos Page</div>} />
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/projects" element={<div>Projects Page</div>} />
        </Routes>
        <Footer />  {/* Footer at the bottom */}
      </div>
    </Router>
  );
}

export default App;
