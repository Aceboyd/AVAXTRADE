import React from 'react';

const About = () => {
  const stats = [
    { number: '2018', label: 'Founded' },
    { number: '50M+', label: 'Users Worldwide' },
    { number: '200+', label: 'Countries Served' },
    { number: '99.9%', label: 'Uptime Record' }
  ];

  const team = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Co-Founder',
      avatar: 'AT',
      description: 'Former Goldman Sachs executive with 15+ years in fintech and blockchain technology.'
    },
    {
      name: 'Sarah Kim',
      role: 'CTO & Co-Founder',
      avatar: 'SK',
      description: 'Ex-Google engineer specializing in distributed systems and cryptocurrency infrastructure.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Security',
      avatar: 'MC',
      description: 'Cybersecurity expert with experience at major financial institutions and crypto exchanges.'
    }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Security First',
      description: 'We prioritize the security of your assets above all else, implementing industry-leading protection measures.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Innovation',
      description: 'Constantly pushing the boundaries of what\'s possible in cryptocurrency trading and technology.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community',
      description: 'Building a global community of traders and investors who support each other\'s success.'
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">AVAXTRADE</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Founded in 2018, AVAXTRADE has grown to become one of the world's most trusted cryptocurrency exchanges. 
            We're on a mission to make digital assets accessible, secure, and profitable for everyone.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-12 mb-20">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              To democratize access to cryptocurrency trading by providing a secure, user-friendly platform that empowers 
              individuals and institutions to participate in the digital economy. We believe that everyone should have the 
              opportunity to benefit from the revolutionary potential of blockchain technology.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="mb-6 flex justify-center">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{value.title}</h4>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12">Leadership Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                  {member.avatar}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                <p className="text-blue-400 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-300 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-xl p-12">
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Join AVAXTRADE?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your cryptocurrency trading journey with the platform trusted by millions worldwide.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;