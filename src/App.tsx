import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navigation/Navbar';
import { Footer } from './components/Navigation/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Invest } from './pages/Invest';
import { InvestDetail } from './pages/InvestDetail';
import { News } from './pages/News';
import { Contact } from './pages/Contact';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/invest/:serviceId" element={<InvestDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
