import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductGallery from './components/ProductGallery';
import RealImages from './components/RealImages';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AIConsultant from './components/AIConsultant';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen text-slate-800 selection:bg-amber-500 selection:text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <ProductGallery />
        <RealImages />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <AIConsultant />
    </div>
  );
}

export default App;