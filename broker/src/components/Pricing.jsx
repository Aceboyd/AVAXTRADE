import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Currency Trading',
      price: '1000',
      period: 'week',
      description: 'Up to 10% weekly',
      features: [
        'Advanced AI trading',
        'Maximum of only 5% drawdown',
        'Expert Risk Management'
      ],
      popular: false,
      buttonText: 'Get Started',
      buttonStyle: 'border-2 border-gray-600 text-white hover:border-blue-500 hover:bg-blue-500/10'
    },
    {
      name: 'Stocks',
      price: '3000',
      period: 'week',
      description: 'Up to 15% weekly',
      features: [
        'Advanced AI trading',
        'Maximum of only 5% drawdown',
        'Expert Risk Management'
      ],
      popular: true,
      buttonText: 'Start Trading',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500'
    },
    {
      name: 'Commodities & ETFs',
      price: '5000',
      period: 'week',
      description: 'Up to 25% weekly',
      features: [
        'Advanced AI trading',
        'Maximum of only 5% drawdown',
        'Expert Risk Management'
      ],
      popular: false,
      buttonText: 'Contact Us',
      buttonStyle: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Select Your <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Investment Plan</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose a plan tailored to your trading needs with advanced tools and security.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-900/50 backdrop-blur-sm border rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-3 ${
                plan.popular 
                  ? 'border-blue-500 ring-2 ring-blue-500/20 scale-105 z-10' 
                  : 'border-gray-800'
              }`}
              style={{ minHeight: '480px' }}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-300 text-base">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/login">
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4 text-lg">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Long Term</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Short Term</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Retirement plan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
