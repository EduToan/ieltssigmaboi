import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import TestDashboard from './components/TestDashboard';
import ReadingSection from './components/skills/ReadingSection';
import WritingSection from './components/skills/WritingSection';
import ListeningSection from './components/skills/ListeningSection';
import ListeningTest from './components/listening/ListeningTest';
import SpeakingSection from './components/skills/SpeakingSection';

function AppRoutes() {
  const location = useLocation();
  const hideNavbarRoutes = ['/test/listening/practice'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/test" element={<TestDashboard />} />
        <Route path="/test/reading" element={<ReadingSection />} />
        <Route path="/test/writing" element={<WritingSection />} />
        <Route path="/test/listening" element={<ListeningSection />} />
        <Route path="/test/listening/practice" element={<ListeningTest />} />
        <Route path="/test/speaking" element={<SpeakingSection />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

