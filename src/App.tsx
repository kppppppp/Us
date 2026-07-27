import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LenisProvider } from './providers/LenisProvider';
import SplashCursor from './components/ui/SplashCursor';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Industries from './pages/Industries';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Insights from './pages/Insights';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

export const App: React.FC = () => {
  return (
    <LenisProvider>
      <SplashCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:id" element={<ServiceDetail />} />
            <Route path="industries" element={<Industries />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="case-studies/:id" element={<CaseStudyDetail />} />
            <Route path="insights" element={<Insights />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LenisProvider>
  );
};

export default App;
