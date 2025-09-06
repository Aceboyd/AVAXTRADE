import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MarketTicker from "../components/MarketTicker";
import Benefits from "../components/Benefits";
import SupportedCryptos from "../components/SupportedCryptos";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import MobileApp from "../components/MobileApp";
import About from "../components/About";
import TestimonyPopup from "../components/testimonypop"; // 👈 import here
import CryptoNews from "../components/CryptoNews"; // 👈 import

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <MarketTicker />
        <Benefits />
        <SupportedCryptos />
        <Testimonials />
        <Pricing />
        <MobileApp />
        <About />
        <CryptoNews />   {/* 👈 New Section here */}
      </main>
      <Footer />
      <TestimonyPopup />
    </div>
  );
}

export default LandingPage;
