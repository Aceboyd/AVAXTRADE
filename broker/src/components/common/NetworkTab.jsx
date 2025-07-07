import React from 'react';

const NetworkTab = ({ network, isActive, onClick }) => (
  <button
    onClick={() => onClick(network.symbol)}
    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm whitespace-nowrap ${
      isActive 
        ? `${network.color} ${network.bgColor} border-2 border-current` 
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    }`}
  >
    {network.symbol}
  </button>
);

export default NetworkTab;