import React from 'react';
import Hero from '../components/Hero';
import MarketTicker from '../components/MarketTicker';
import Benefits from '../components/Benefits';
import SupportedCryptos from '../components/SupportedCryptos';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import MobileApp from '../components/MobileApp';
import About from '../components/About';

function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <MarketTicker />
      <Benefits />
      <SupportedCryptos />
      <Testimonials />
      <Pricing />
      <MobileApp />
      <About />
    </main>
  );
}

export default LandingPage;