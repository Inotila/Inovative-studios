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
            <Route path="/signup-login" element={<div>Signup/Login Page</div>} />
            <Route path="/entertainment" element={<EntertainmentPage />} />
            <Route
              path="/music"
              element={
                <Suspense fallback={<div>Loading music...</div>}>
                  <MusicPage />
                </Suspense>
              }
            />
            <Route
              path="/videos"
              element={
                <Suspense fallback={<div>Loading videos...</div>}>
                  <VideoPage />
                </Suspense>
              }
            />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/register"
              element={
                <Suspense fallback={<div>Loading register...</div>}>
                  <RegisterPage />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<div>Loading login...</div>}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div>Loading profile...</div>}>
                    <ProfilePage />
                  </Suspense>
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

