import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Professional Trader',
      avatar: 'SC',
      content: 'The fastest execution speeds I\'ve experienced. CryptoTrade has become my go-to platform for all crypto trading.',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'DeFi Investor',
      avatar: 'MR',
      content: 'Security and user experience are top-notch. I feel confident managing my entire portfolio here.',
      rating: 5,
    },
    {
      name: 'Emily Johnson',
      role: 'Crypto Beginner',
      avatar: 'EJ',
      content: 'Started as a complete beginner. The intuitive interface and educational resources made trading accessible.',
      rating: 5,
    },
  ];

  const trustBadges = [
    { text: '50M+', label: 'Active Users' },
    { text: '$2.5B+', label: 'Daily Volume' },
    { text: '99.9%', label: 'Uptime' },
    { text: '180+', label: 'Countries' },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {trustBadges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                {badge.text}
              </div>
              <div className="text-gray-300 text-lg">{badge.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Millions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See what our community of traders and investors have to say about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;