import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Dashboard } from './pages/Dashboard';
import { Draws } from './pages/Draws';
import { QuickDraw } from './pages/QuickDraw';
import { ScheduledDraw } from './pages/ScheduledDraw';
import { Connections } from './pages/Connections';
import { History } from './pages/History';
import { LandingPage } from './pages/LandingPage';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { useThemeStore } from './store/themeStore';

export function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Protected routes */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="draws" element={<Draws />} />
          <Route path="draws/quick" element={<QuickDraw />} />
          <Route path="draws/scheduled" element={<ScheduledDraw />} />
          <Route path="history" element={<History />} />
          <Route path="connections" element={<Connections />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}