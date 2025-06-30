import React, { useEffect } from 'react';

const MarketTicker = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BINANCE:BTCUSDT", title: "Bitcoin" },
        { proName: "BINANCE:ETHUSDT", title: "Ethereum" },
        { proName: "BINANCE:BNBUSDT", title: "BNB" },
        { proName: "BINANCE:XRPUSDT", title: "XRP" },
        { proName: "BINANCE:ADAUSDT", title: "Cardano" },
        { proName: "BINANCE:DOGEUSDT", title: "Dogecoin" },
        { proName: "BINANCE:MATICUSDT", title: "Polygon" },
        { proName: "BINANCE:SOLUSDT", title: "Solana" },
        { proName: "BINANCE:DOTUSDT", title: "Polkadot" },
        { proName: "BINANCE:AVAXUSDT", title: "Avalanche" },
        { proName: "BINANCE:SHIBUSDT", title: "Shiba Inu" },
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en"
    });
    document.getElementById('tradingview-widget')?.appendChild(script);
  }, []);

  return (
    <div id="markets" className="w-full overflow-hidden h-20" />
  );
};

export default MarketTicker;
