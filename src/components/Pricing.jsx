import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'Beginner',
      price: '0',
      period: 'Forever Free',
      description: 'Perfect for getting started with crypto trading',
      features: [
        'Basic spot trading',
        'Market & limit orders',
        'Mobile app access',
        'Email support',
        '0.25% trading fee',
        'Basic portfolio tracking'
      ],
      popular: false,
      buttonText: 'Get Started Free',
      buttonStyle: 'border-2 border-gray-600 text-white hover:border-blue-500 hover:bg-blue-500/10'
    },
    {
      name: 'Pro',
      price: '29',
      period: 'per month',
      description: 'Advanced tools for serious traders',
      features: [
        'Advanced trading tools',
        'Futures & options trading',
        'Priority customer support',
        'Advanced charting',
        '0.15% trading fee',
        'Portfolio analytics',
        'API access',
        'Stop-loss & take-profit'
      ],
      popular: true,
      buttonText: 'Start Pro Trial',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500'
    },
    {
      name: 'Elite',
      price: '99',
      period: 'per month',
      description: 'Premium features for institutional traders',
      features: [
        'All Pro features',
        'Dedicated account manager',
        'Custom trading algorithms',
        'Institutional-grade security',
        '0.05% trading fee',
        'Advanced risk management',
        'White-label solutions',
        'Direct market access',
        'Custom integrations'
      ],
      popular: false,
      buttonText: 'Contact Sales',
      buttonStyle: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Choose Your <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Trading Plan</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include bank-level security and 24/7 support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-900/50 backdrop-blur-sm border rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-blue-500 ring-2 ring-blue-500/20 scale-105' 
                  : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>256-bit SSL encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Cold storage security</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Multi-factor authentication</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>Regulatory in compliance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;