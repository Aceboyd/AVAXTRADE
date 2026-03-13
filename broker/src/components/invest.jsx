import React, { useState } from "react";
import { apiClient } from '../utils/api';

const Invest = ({ walletData, setWalletData, setTransactions }) => {
  const [activeCategory, setActiveCategory] = useState("Trading");
  const [amount, setAmount] = useState("");
  const [cryptoType, setCryptoType] = useState("BTC");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Trading",
    "Staking",
    "Mining",
    "Fixed Income",
    "Real Estate",
    "Retirement Savings",
  ];

  const plansByCategory = {
    Trading: [
      {
        title: "Currency Trading",
        price: "$1000/week",
        profit: "Up to 10% weekly",
        features: ["Advanced AI trading", "Maximum of only 5% drawdown", "Expert Risk Management"],
      },
      {
        title: "Stocks",
        price: "$3000/week",
        profit: "Up to 15% weekly",
        features: ["Blue-chip & growth stocks", "Dividend reinvestment", "AI-powered rebalancing"],
      },
      {
        title: "Commodities & ETFs",
        price: "$5000/week",
        profit: "Up to 25% weekly",
        features: ["Gold, Oil, Agri futures", "Diversified ETF baskets", "Low-latency execution"],
      },
    ],
    Staking: [
      {
        title: "ETH 2.0 Staking",
        price: "$2000 minimum",
        profit: "4–7% APY",
        features: ["Non-custodial", "Auto-compounding", "Slashing protection"],
      },
      {
        title: "High-Yield Pools",
        price: "$5000 minimum",
        profit: "12–28% APY",
        features: ["DeFi protocols", "Impermanent loss mitigation"],
      },
      {
        title: "Layer-1 Staking",
        price: "$3500 minimum",
        profit: "9–18% APY",
        features: ["Multi-chain support", "Auto-restaking"],
      },
    ],
    Mining: [
      {
        title: "Bitcoin Cloud Mining",
        price: "$1200 / 250 TH/s",
        profit: "Daily BTC payouts",
        features: ["No hardware needed", "Maintenance included"],
      },
      {
        title: "Ethereum Classic Mining",
        price: "$1800 / 300 MH/s",
        profit: "Daily ETC rewards",
        features: ["GPU optimized", "Instant withdrawal"],
      },
      {
        title: "Multi-Coin Mining",
        price: "$4000 bundle",
        profit: "BTC + ETH + altcoins",
        features: ["Auto-switch algorithm", "Highest profitability"],
      },
    ],
    "Fixed Income": [
      {
        title: "Stablecoin Yield",
        price: "$1000 minimum",
        profit: "8–14% APY",
        features: ["USDC / USDT / DAI", "Weekly payouts"],
      },
      {
        title: "Corporate Bond Pool",
        price: "$5000 minimum",
        profit: "7–11% APY",
        features: ["Investment-grade only", "Monthly interest"],
      },
      {
        title: "Treasury Strategy",
        price: "$3000 minimum",
        profit: "5–9% APY",
        features: ["Short-term T-bills", "Very low risk"],
      },
    ],
    "Real Estate": [
      {
        title: "Tokenized Property Fund",
        price: "$10,000 minimum",
        profit: "9–16% annual",
        features: ["Rental income + appreciation"],
      },
      {
        title: "Commercial REIT Tokens",
        price: "$15,000 minimum",
        profit: "11–18% annual",
        features: ["Office & retail assets", "Quarterly distributions"],
      },
      {
        title: "Residential Development Pool",
        price: "$8000 minimum",
        profit: "12–20% projected",
        features: ["New builds", "Capital gains focus"],
      },
    ],
    "Retirement Savings": [
      {
        title: "Long-term Growth Plan",
        price: "$5000 minimum",
        profit: "Projected 8–12% p.a.",
        features: ["Tax-advantaged wrapper", "Auto-rebalancing"],
      },
      {
        title: "Balanced Retirement Fund",
        price: "$7500 minimum",
        profit: "7–11% p.a.",
        features: ["60/40 stocks-bonds", "Drawdown protection"],
      },
      {
        title: "Annuity-Style Plan",
        price: "$12,000 minimum",
        profit: "Guaranteed 6–9% p.a.",
        features: ["Lifetime income option", "Inflation adjustment"],
      },
    ],
  };

  const currentPlans = plansByCategory[activeCategory] || [];

  const handleBuy = async () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (!cryptoType) {
      alert("Please select a crypto plan");
      return;
    }

    if (numericAmount > parseFloat(walletData?.main_balance || 0)) {
      alert("Insufficient balance");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post('/auth/investment/', {
        crypto_type: cryptoType,
        amount: amount
      });

      if (setWalletData) {
        setWalletData((prev) => {
          const prevMain = parseFloat(prev?.main_balance || 0);
          const prevProfit = parseFloat(prev?.profit_balance || 0);
          const nextMain = Math.max(prevMain - numericAmount, 0);
          const nextTotal = nextMain + prevProfit;
          return {
            ...prev,
            main_balance: nextMain.toFixed(2),
            total_balance: nextTotal.toFixed(2),
          };
        });
      }

      if (setTransactions) {
        const now = new Date();
        const localTx = {
          id: `local-${now.getTime()}`,
          type: 'investment',
          network: cryptoType,
          amount: numericAmount.toFixed(2),
          status: 'pending',
          time: now.toLocaleString(),
          txId: `local-${now.getTime()}`,
        };
        setTransactions((prev) => [localTx, ...prev]);
      }

      alert("Investment successful");
      setAmount("");
    } catch (error) {
      alert(error.response?.data?.message || "Investment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Combined bordered section */}
        <div className="border border-blue-600 rounded-2xl p-6 md:p-8 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-4 md:gap-5 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-medium transition
                  border
                  ${
                    activeCategory === category
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Plans */}
          {currentPlans.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentPlans.map((plan, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors bg-white"
                >
                  <h3 className="text-blue-600 text-xl md:text-2xl font-semibold mb-4">
                    {plan.title}
                  </h3>
                  <h2 className="text-3xl md:text-4xl font-bold mb-1">
                    {plan.price}
                  </h2>
                  <p className="text-blue-600 font-medium mb-6">{plan.profit}</p>

                  <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                    <h4 className="font-semibold mb-3 text-gray-800">Includes:</h4>
                    <ul className="space-y-2 text-gray-700">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-gray-500">
              No plans available in this category.
            </p>
          )}
        </div>

        {/* Mining section */}
        <div className="border border-gray-300 rounded-xl p-6 md:p-8 max-w-2xl mx-auto bg-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">
            Buy Mining Power
          </h2>

          <p className="mb-4 text-gray-600">
            Available Balance: <span className="text-gray-900 font-medium">${walletData?.main_balance || '0.00'}</span>
          </p>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount from Balance ($)"
            className="w-full p-3.5 mb-5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
          />

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Crypto Plan
            </label>
            <select
              value={cryptoType}
              onChange={(e) => setCryptoType(e.target.value)}
              className="w-full p-3.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none bg-white"
            >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
            </select>
          </div>

          <p className="mb-2 text-gray-600">Rate: $1000 / 200TH/s</p>
          <p className="mb-4 text-blue-600 font-medium">✓ Currently all Hashpower are in stock</p>

          <p className="mb-6 text-gray-600">
            Allocate your coins and enhance your mining performance
          </p>

          <button
            onClick={handleBuy}
            disabled={isSubmitting}
            className={`w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Processing...' : 'Buy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invest;
