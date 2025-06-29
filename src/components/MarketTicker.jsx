import React, { useState, useEffect } from 'react';

const MarketTicker = () => {
  const [prices, setPrices] = useState({
    bitcoin: { price: '0', change: 0 },
    ethereum: { price: '0', change: 0 },
    solana: { price: '0', change: 0 }
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        
        setPrices({
          bitcoin: {
            price: data.bitcoin?.usd?.toLocaleString() || '0',
            change: data.bitcoin?.usd_24h_change || 0
          },
          ethereum: {
            price: data.ethereum?.usd?.toLocaleString() || '0',
            change: data.ethereum?.usd_24h_change || 0
          },
          solana: {
            price: data.solana?.usd?.toLocaleString() || '0',
            change: data.solana?.usd_24h_change || 0
          }
        });
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const tickerItems = [
    { name: 'Bitcoin', symbol: 'BTC', ...prices.bitcoin },
    { name: 'Ethereum', symbol: 'ETH', ...prices.ethereum },
    { name: 'Solana', symbol: 'SOL', ...prices.solana }
  ];

  return (
    <div id="markets" className="bg-gray-900/50 backdrop-blur-sm border-y border-gray-800 py-4 overflow-hidden">
      <div className="ticker-scroll flex space-x-12 whitespace-nowrap">
        {/* Duplicate items for seamless scroll */}
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-xs font-bold">
                {item.symbol.charAt(0)}
              </div>
              <span className="font-semibold">{item.symbol}</span>
            </div>
            <span className="text-2xl font-bold">${item.price}</span>
            <span className={`px-2 py-1 rounded text-sm font-semibold ${
              item.change >= 0 
                ? 'text-green-400 bg-green-500/20' 
                : 'text-red-400 bg-red-500/20'
            }`}>
              {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;