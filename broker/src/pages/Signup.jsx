import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Zap } from 'lucide-react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Added success state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); // Clear previous success message
    setIsLoading(true);

    // Basic client-side validation
    if (fullname.length < 2) {
      setError('Name must be at least 2 characters');
      setIsLoading(false);
      return;
    }
    if (!email.includes('@') || email.length < 3) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      // Make API call to Django backend
      await axios.post('https://avaxbacklog.onrender.com/api/auth/register/', {
        email,
        fullname,
        password
      });

      console.log('Signup successful:', { fullname, email });
      setSuccess('Account created successfully! Redirecting to login...');
      // Delay navigation to show success message
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3-second delay
    } catch (err) {
      // Handle errors from the API
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message || 
                            err.response.data.email || 
                            err.response.data.fullname || 
                            err.response.data.password || 
                            'Signup failed. Please try again.';
        setError(errorMessage);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center pt-20 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '-1s' }}></div>
        </div>

        {/* Subtle Chart Animation */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 400 200" className="absolute top-0 left-0">
            <path
              d="M0,150 Q100,100 200,120 T400,80"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              className="animate-chart"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Signup Form */}
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
              <p className="text-gray-400">Join AVAXTRADE to start trading</p>
            </div>

            {error && (
              <div className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-4 text-sm text-center" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 text-green-300 p-3 rounded-xl mb-4 text-sm text-center" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="fullname" className="text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="fullname"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                    aria-describedby={error ? 'fullname-error' : undefined}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    required
                    aria-describedby={error ? 'email-error' : undefined}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                    required
                    aria-describedby={error ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Sign up"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" aria-hidden="true" />
                    Sign Up
                  </>
                )}
              </button>
            </form>

            {/* Login CTA */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  aria-label="Sign in to existing account"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 mb-6 text-center">
            <p className="text-xs text-gray-500">
              By signing up, you agree to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;