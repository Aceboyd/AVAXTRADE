import React from 'react';
import { TrendingUp, Shield, Clock, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-4 pb-4 sm:pt-8 sm:pb-8">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 mb-3 sm:mb-4 lg:mb-6">
              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-blue-400 mr-1 sm:mr-1.5 lg:mr-2" />
              <span className="text-blue-300 text-xs sm:text-xs lg:text-sm font-medium">#1 Crypto Trading Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight">
              <span className="block text-white mb-1 sm:mb-1.5 lg:mb-2">Trade Crypto with</span>
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Confidence & Security
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-1 sm:px-2 lg:px-0">
              Experience next-generation cryptocurrency trading with advanced security, 
              real-time analytics, and seamless execution. Join over 50 million users worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 lg:gap-4 justify-center lg:justify-start items-center mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-4 lg:px-0">
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-xl text-sm sm:text-base lg:text-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25">
                Start Trading Now
              </button>
              <button className="w-full sm:w-auto border-2 border-gray-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-xl text-sm sm:text-base lg:text-lg font-semibold hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 lg:grid-cols-4 text-center lg:text-left px-1 sm:px-2 lg:px-0">
              <div className="flex flex-col items-center lg:flex-row lg:items-start space-y-1 lg:space-y-0 lg:space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-xs lg:text-sm font-semibold">Bank-Level</p>
                  <p className="text-gray-400 text-xs">Security</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center lg:flex-row lg:items-start space-y-1 lg:space-y-0 lg:space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-xs lg:text-sm font-semibold">24/7</p>
                  <p className="text-gray-400 text-xs">Support</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center lg:flex-row lg:items-start space-y-1 lg:space-y-0 lg:space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-xs lg:text-sm font-semibold">Advanced</p>
                  <p className="text-gray-400 text-xs">Analytics</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center lg:flex-row lg:items-start space-y-1 lg:space-y-0 lg:space-x-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-xs lg:text-sm font-semibold">50M+</p>
                  <p className="text-gray-400 text-xs">Users</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Trading Dashboard Image */}
          <div className="relative lg:order-2">
            {/* Main Dashboard Image */}
            <div className="relative mx-2 sm:mx-4 lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-2.5 sm:p-3 lg:p-6 shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/6801647/pexels-photo-6801647.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Cryptocurrency trading dashboard"
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-80 object-cover rounded-xl"
                />
                
                {/* Floating Stats Cards - More compact for mobile */}
                <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 lg:-top-4 lg:-right-4 bg-green-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-4 lg:py-2 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-1 sm:space-x-1.5 lg:space-x-2">
                    <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs sm:text-xs lg:text-sm font-semibold">+24.5%</span>
                  </div>
                  <p className="text-xs text-green-100 hidden sm:hidden lg:block">Portfolio Growth</p>
                </div>
                
                <div className="absolute -bottom-1.5 -left-1.5 sm:-bottom-2 sm:-left-2 lg:-bottom-4 lg:-left-4 bg-blue-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-4 lg:py-2 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-1 sm:space-x-1.5 lg:space-x-2">
                    <span className="text-xs sm:text-xs lg:text-sm font-semibold">$67,432</span>
                  </div>
                  <p className="text-xs text-blue-100 hidden sm:hidden lg:block">Total Balance</p>
                </div>
              </div>
            </div>

            {/* Floating Crypto Icons - Smaller and more compact */}
            <div className="absolute top-2 -left-2 sm:top-4 sm:-left-4 lg:top-8 lg:-left-8 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-orange-500/30 animate-pulse hidden xs:flex">
              <span className="text-orange-400 font-bold text-xs sm:text-sm lg:text-lg">₿</span>
            </div>
            
            <div className="absolute bottom-2 -right-2 sm:bottom-4 sm:-right-4 lg:bottom-8 lg:-right-8 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-500/30 animate-pulse hidden xs:flex" style={{animationDelay: '1s'}}>
              <span className="text-purple-400 font-bold text-xs sm:text-sm lg:text-lg">Ξ</span>
            </div>
            
            <div className="absolute top-1/2 -left-4 sm:-left-6 lg:-left-12 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-green-500/30 animate-pulse hidden sm:flex" style={{animationDelay: '2s'}}>
              <span className="text-green-400 font-bold text-xs sm:text-xs lg:text-sm">₳</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Hidden on mobile */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-blue-500/30 rounded-lg animate-pulse hidden xl:block"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border border-cyan-400/30 rounded-full animate-pulse hidden xl:block" style={{animationDelay: '1s'}}></div>
    </section>
  );
};

export default Hero;