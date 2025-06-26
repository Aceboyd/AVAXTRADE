import React from 'react';

const SupportedCryptos = () => {
  const cryptos = [
    { name: 'Bitcoin', symbol: 'BTC', color: 'from-orange-500 to-yellow-500' },
    { name: 'Ethereum', symbol: 'ETH', color: 'from-purple-500 to-blue-500' },
    { name: 'Solana', symbol: 'SOL', color: 'from-purple-400 to-pink-500' },
    { name: 'Cardano', symbol: 'ADA', color: 'from-blue-500 to-cyan-400' },
    { name: 'Polkadot', symbol: 'DOT', color: 'from-pink-500 to-red-500' },
    { name: 'Chainlink', symbol: 'LINK', color: 'from-blue-600 to-indigo-500' },
    { name: 'Litecoin', symbol: 'LTC', color: 'from-gray-400 to-gray-600' },
    { name: 'Polygon', symbol: 'MATIC', color: 'from-purple-600 to-blue-600' },
  ];

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trade 100+ <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Cryptocurrencies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Access the most popular cryptocurrencies and emerging altcoins all in one secure platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {cryptos.map((crypto, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 group text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${crypto.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-white font-bold text-lg">{crypto.symbol.charAt(0)}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">{crypto.symbol}</h3>
              <p className="text-gray-400 text-sm">{crypto.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105">
            View All Cryptocurrencies
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupportedCryptos;