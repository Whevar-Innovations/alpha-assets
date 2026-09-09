import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navigation/Navbar';
import { Footer } from './components/Navigation/Footer';
import { ScrollToTop } from './components/Navigation/ScrollToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Invest } from './pages/Invest';
import { InvestDetail } from './pages/InvestDetail';
import { News } from './pages/News';
import { ArticleDetail } from './pages/ArticleDetail';
import { Contact } from './pages/Contact';
import { PolicyPage } from './pages/PolicyPage';
import { Careers } from './pages/Careers';
import { CareerDetail } from './pages/CareerDetail';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/invest" element={<Invest />} />
              <Route path="/invest/:serviceId" element={<InvestDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<ArticleDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:slug" element={<CareerDetail />} />
              <Route path="/legal/:slug" element={<PolicyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};
