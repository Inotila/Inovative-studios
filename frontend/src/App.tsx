// frontend/src/App.tsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import EntertainmentPage from './components/entertainment/EntertainmentPage';
import ServicePage from './components/services/ServicesPage';
import ProjectsPage from './components/projects/ProjectsPage';
import ProtectedRoute from './components/authentication/ProtectedRoute';

const RegisterPage = lazy(() => import('./components/authentication/register/register'));
const LoginPage = lazy(() => import('./components/authentication/login/login'));
const ProfilePage = lazy(() => import('./components/authentication/profile/profile'));
const MusicPage = lazy(() => import('./components/music/MusicPage'));
const VideoPage = lazy(() => import('./components/videos/videos'));


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/entertainment" element={<EntertainmentPage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/videos" element={<VideoPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

