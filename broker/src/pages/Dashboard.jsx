import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Wallet, Upload, Download, Shield, Settings, LogOut, Copy, QrCode,
  CheckCircle, AlertCircle, Clock, X, Moon, Sun, Eye, EyeOff,
  Smartphone, Lock, Key, Globe, TrendingUp, History, Bell, User,
  Menu, CreditCard, AlertTriangle, RefreshCw
} from 'lucide-react';
import axios from 'axios';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const Dashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNetwork, setSelectedNetwork] = useState('BTC');
  const [darkMode, setDarkMode] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [kycStatus, setKycStatus] = useState('pending');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // User data state
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userError, setUserError] = useState(null);
  
  const navigate = useNavigate();

  // Configuration data
  const networks = [
    { symbol: 'BTC', name: 'Bitcoin', color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { symbol: 'ETH', name: 'Ethereum', color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { symbol: 'BSC', name: 'Binance Smart Chain', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { symbol: 'AVAX', name: 'Avalanche', color: 'text-red-500', bgColor: 'bg-red-50' },
    { symbol: 'MATIC', name: 'Polygon', color: 'text-purple-500', bgColor: 'bg-purple-50' }
  ];

  const balances = {
    BTC: { amount: '0.00542', usd: '2,456.78' },
    ETH: { amount: '1.234', usd: '4,567.89' },
    BSC: { amount: '0.567', usd: '234.56' },
    AVAX: { amount: '12.34', usd: '345.67' },
    MATIC: { amount: '567.89', usd: '123.45' }
  };

  const transactions = [
    { id: '1', type: 'deposit', network: 'BTC', amount: '0.00542', status: 'completed', time: '2 hours ago', txId: 'abc123...def456' },
    { id: '2', type: 'withdrawal', network: 'ETH', amount: '0.5', status: 'pending', time: '1 day ago', txId: 'xyz789...uvw012' },
    { id: '3', type: 'deposit', network: 'AVAX', amount: '50.0', status: 'completed', time: '3 days ago', txId: 'mno345...pqr678' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'deposits', label: 'Deposits', icon: Download },
    { id: 'withdrawals', label: 'Withdrawals', icon: Upload },
    { id: 'kyc', label: 'KYC Verification', icon: Shield },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'history', label: 'Transaction History', icon: History },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  // User data fetching
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoadingUser(true);
      setUserError(null);

      // Check both sessionStorage and localStorage for token
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      console.log('Dashboard: Checking for token...');
      console.log('sessionStorage token:', sessionStorage.getItem('token') ? `Present (${sessionStorage.getItem('token').substring(0, 20)}...)` : 'Not found');
      console.log('localStorage token:', localStorage.getItem('token') ? `Present (${localStorage.getItem('token').substring(0, 20)}...)` : 'Not found');
      console.log('Dashboard: Retrieved token:', token ? token.substring(0, 20) + '...' : 'Not found');

      if (!token) {
        console.warn('Dashboard: No authentication token found');
        setUserError('Please log in to access your dashboard');
        setIsLoadingUser(false);
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('https://avaxbacklog.onrender.com/api/auth/user/', {
          headers: {
            'Authorization': `Token ${token}`, // Use Token instead of Bearer
            'Content-Type': 'application/json',
          },
          timeout: 15000,
        });
        console.log('Dashboard: Success with endpoint: /api/auth/user/', response.data);

        let userData = response.data;
        if (response.data.user) {
          userData = response.data.user;
        } else if (response.data.data && response.data.data.user) {
          userData = response.data.data.user;
        } else if (response.data.data) {
          userData = response.data.data;
        }

        console.log('Dashboard: Extracted user data:', userData);

        if (userData && (userData.fullname || userData.email || userData.username)) {
          const normalizedUser = {
            fullname: userData.fullname?.trim() || userData.username || userData.email?.split('@')[0] || 'User',
            email: userData.email || '',
            id: userData.id || userData.user_id || '',
            phone: userData.phone || userData.phone_number || '',
            avatar: userData.avatar || userData.profile_picture || ''
          };
          setUser(normalizedUser);
          console.log('Dashboard: User data set successfully:', normalizedUser);
        } else {
          console.error('Dashboard: Invalid user data structure:', userData);
          setUserError('Invalid user data received from server');
        }
      } catch (error) {
        console.error('Dashboard: Failed to fetch user data:', error);
        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED') {
            setUserError('Request timeout - please check your connection');
          } else if (error.response?.status === 401) {
            setUserError('Session expired - please log in again');
            sessionStorage.removeItem('token');
            localStorage.removeItem('token');
            navigate('/login');
          } else if (error.response?.status === 404) {
            setUserError('User endpoint not found - please contact support');
          } else if (error.response?.status >= 500) {
            setUserError('Server error - please try again later');
          } else if (!error.response) {
            setUserError('Network error - please check your connection');
          } else {
            setUserError(`Error: ${error.response.status} - ${error.response.data?.message || error.response.data?.error || 'Unknown error'}`);
          }
        } else {
          setUserError('Unexpected error occurred');
        }
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Helper function to get user display name
  const getUserDisplayName = () => {
    if (isLoadingUser) return 'Loading...';
    if (userError) return 'User';
    if (user?.fullname) return user.fullname;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (token) {
        await axios.post('https://avaxbacklog.onrender.com/api/auth/logout/', {}, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        });
      }
    } catch (error) {
      console.warn('Dashboard: Logout API call failed, proceeding with local cleanup:', error);
    } finally {
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  // Component definitions
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

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'text-yellow-700 bg-yellow-100', icon: Clock, text: 'Pending' },
      completed: { color: 'text-green-700 bg-green-100', icon: CheckCircle, text: 'Completed' },
      failed: { color: 'text-red-700 bg-red-100', icon: X, text: 'Failed' },
      approved: { color: 'text-green-700 bg-green-100', icon: CheckCircle, text: 'Approved' },
      rejected: { color: 'text-red-700 bg-red-100', icon: X, text: 'Rejected' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  // User status display component
  const UserStatusDisplay = () => {
    if (userError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm text-red-800">
                <strong>Failed to load user data:</strong> {userError}
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm text-red-700 hover:text-red-800 underline flex items-center space-x-1"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const OverviewContent = () => (
    <div className="space-y-6">
      <UserStatusDisplay />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[180px] sm:min-h-[200px]">
          <div className="p-4 sm:p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Portfolio</h3>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {showBalance ? '$7,728.35' : '****'}
              </div>
              <div className="text-green-600 text-sm flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% this month
              </div>
            </div>
          </div>
        </div>

        <Link to="/kyc-upload" className="block">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[180px] sm:min-h-[200px] hover:bg-gray-50 transition-colors">
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">KYC Status</h3>
                <Shield className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="mb-2">
                  <StatusBadge status={kycStatus} />
                </div>
                <div className="text-sm text-gray-600">
                  {kycStatus === 'pending' && 'Verification in progress'}
                  {kycStatus === 'approved' && 'Fully verified account'}
                  {kycStatus === 'rejected' && 'Please resubmit documents'}
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[180px] sm:min-h-[200px] sm:col-span-2 lg:col-span-1">
          <div className="p-4 sm:p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Main and Profit Balance</h3>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Main</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {showBalance ? '$7,728.35' : '****'}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Profit</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {showBalance ? '$966.04' : '****'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Network Balances</h3>
          <div className="space-y-3 sm:space-y-4">
            {networks.map((network) => (
              <div key={network.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${network.bgColor} flex items-center justify-center`}>
                    <span className={`text-sm font-semibold ${network.color}`}>
                      {network.symbol}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm sm:text-base">{network.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{network.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 text-sm sm:text-base">
                    {showBalance ? balances[network.symbol].amount : '****'}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {showBalance ? `$${balances[network.symbol].usd}` : '****'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3 sm:space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${tx.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center`}>
                    {tx.type === 'deposit' ? (
                      <Download className="w-4 h-4 text-green-600" />
                    ) : (
                      <Upload className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 capitalize text-sm sm:text-base">{tx.type}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{tx.network} • {tx.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 text-sm sm:text-base">{tx.amount}</div>
                  <div className="mt-1">
                    <StatusBadge status={tx.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DepositsContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Select Network</h3>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {networks.map((network) => (
            <NetworkTab
              key={network.symbol}
              network={network}
              isActive={selectedNetwork === network.symbol}
              onClick={setSelectedNetwork}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Deposit Address</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Address</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </button>
              </div>
              <div className="font-mono text-xs sm:text-sm text-gray-900 break-all">
                {selectedNetwork === 'BTC' && 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'}
                {selectedNetwork === 'ETH' && '0x742d35Cc6634C0532925a3b8D4c2E43f4a4f2B7e'}
                {selectedNetwork === 'BSC' && '0x742d35Cc6634C0532925a3b8D4c2E43f4a4f2B7e'}
                {selectedNetwork === 'AVAX' && '0x742d35Cc6634C0532925a3b8D4c2E43f4a4f2B7e'}
                {selectedNetwork === 'MATIC' && '0x742d35Cc6634C0532925a3b8D4c2E43f4a4f2B7e'}
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <strong>Important:</strong> Only send {selectedNetwork} to this address. 
                  Sending other cryptocurrencies may result in permanent loss.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">QR Code</h4>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 sm:p-8 flex items-center justify-center">
              <QrCode className="w-24 h-24 sm:w-32 sm:h-32 text-gray-400" />
            </div>
            <div className="text-center">
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                Download QR Code
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <strong>Minimum Confirmations:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Bitcoin (BTC): 2 confirmations</li>
                <li>• Ethereum (ETH): 12 confirmations</li>
                <li>• BSC: 15 confirmations</li>
                <li>• Avalanche: 1 confirmation</li>
                <li>• Polygon: 128 confirmations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'deposits':
        return <DepositsContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <header className={`border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} sticky top-0 z-40`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className={`lg:hidden p-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <Menu className="w-6 h-6" />
                </button>
                <Wallet className={`w-6 sm:w-8 h-6 sm:h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h1 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Avaxtrade
                </h1>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <button className={`p-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                  <Bell className="w-5 h-5" />
                </button>
                
                <button className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                  <User className="w-5 h-5" />
                  <span className="text-sm">
                    {getUserDisplayName()}
                  </span>
                  {isLoadingUser && <RefreshCw className="w-4 h-4 animate-spin ml-1" />}
                </button>
                
                <button
                  onClick={handleLogout}
                  className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
            <div className={`fixed left-0 top-0 h-full w-80 max-w-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Wallet className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Avaxtrade
                  </h2>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="p-4 space-y-2">
                {sidebarItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? darkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                          : darkMode
                            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
                
                <div className="pt-4 border-t border-gray-200">
                  <h1 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                    <User className="w-5 h-5" />
                    <span className="font-medium">{getUserDisplayName()}</span>
                    {isLoadingUser && <RefreshCw className="w-4 h-4 animate-spin ml-1" />}
                  </h1>
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="hidden lg:block lg:col-span-1">
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? darkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                          : darkMode
                            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;