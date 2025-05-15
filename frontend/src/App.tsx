// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import EntertainmentPage from './components/entertainment/EntertainmentPage';
import MusicPage from './components/music/MusicPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup-login" element={<div>Signup/Login Page</div>} />

            <Route path="/entertainment" element={<EntertainmentPage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/videos" element={<div>Videos Page</div>} />
            <Route path="/services" element={<div>Services Page</div>} />
            <Route path="/projects" element={<div>Projects Page</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

