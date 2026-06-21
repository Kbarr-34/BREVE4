import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SummarizerPage from './pages/SummarizerPage';
import ResultPage from './pages/ResultPage';
import AccountPage from './pages/AccountPage';

const App = () => {
  const [summaryResult, setSummaryResult] = useState({ summary: '', videoUrl: '' });
  const location = useLocation();
  const hideNav = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="relative z-10">
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/summarizer" element={<SummarizerPage setSummaryResult={setSummaryResult} />} />
        <Route path="/result" element={<ResultPage summaryResult={summaryResult} />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </div>
  );
};

export default App;