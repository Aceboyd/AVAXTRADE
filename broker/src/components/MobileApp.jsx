import React from 'react';

const MobileApp = () => {
  return (
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Trade Anywhere with Our
              <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Mobile App
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Take your crypto trading on the go. Our mobile app delivers the same powerful features and security as our web platform, optimized for mobile trading.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Real-time Portfolio Tracking</h3>
                  <p className="text-gray-300">Monitor your investments 24/7 with live price updates and detailed analytics.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Advanced Order Types</h3>
                  <p className="text-gray-300">Execute complex trading strategies with limit, stop-loss, and advanced order types.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Biometric Security</h3>
                  <p className="text-gray-300">Secure your account with fingerprint and face recognition authentication.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="bg-black border border-gray-600 rounded-lg px-6 py-3 hover:border-blue-500 transition-colors flex items-center space-x-3"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-white font-semibold">App Store</div>
                </div>
              </a>

              <a
                href="#"
                className="bg-black border border-gray-600 rounded-lg px-6 py-3 hover:border-blue-500 transition-colors flex items-center space-x-3"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-white font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 max-w-sm mx-auto">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-3xl">
                <div className="bg-gray-900 rounded-3xl p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-semibold">Portfolio</h3>
                      <div className="text-green-400 text-sm">+12.5%</div>
                    </div>
                    
                    <div className="text-3xl font-bold text-white">$47,329.80</div>
                    
                    <div className="space-y-3">
                      {['BTC', 'ETH', 'SOL'].map((symbol, index) => (
                        <div key={symbol} className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                              index === 0 ? 'bg-orange-500' : index === 1 ? 'bg-purple-500' : 'bg-pink-500'
                            }`}>
                              {symbol.charAt(0)}
                            </div>
                            <span className="text-white">{symbol}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">${(Math.random() * 50000).toFixed(0)}</div>
                            <div className={`text-sm ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'}`}>
                              {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 10).toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-3xl blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;