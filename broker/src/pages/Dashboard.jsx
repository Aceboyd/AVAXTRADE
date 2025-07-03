import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Wallet, Upload, Download, Shield, Settings, LogOut, Copy, QrCode,
  CheckCircle, AlertCircle, Clock, X, Moon, Sun, Eye, EyeOff,
  Lock, History, TrendingUp, Bell, User, Menu, CreditCard, AlertTriangle, RefreshCw
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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiErrors, setApiErrors] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [walletData, setWalletData] = useState({
    main_balance: '0.00',
    profit_balance: '0.00',
    total_balance: '0.00',
    btc: { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
    eth: { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
    bsc: { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
    avax: { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
    matic: { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
  });
  const [withdrawalData, setWithdrawalData] = useState({ amount: '', address: '' });
  const [kycData, setKycData] = useState({ document: null });
  const [securityData, setSecurityData] = useState({ currentPassword: '', newPassword: '', twoFactorCode: '' });
  const [transactions, setTransactions] = useState([
    { id: '1', type: 'deposit', network: 'BTC', amount: '0.00542', status: 'completed', time: '2 hours ago', txId: 'abc123...def456' },
    { id: '2', type: 'withdrawal', network: 'ETH', amount: '0.5', status: 'pending', time: '1 day ago', txId: 'xyz789...uvw012' },
    { id: '3', type: 'deposit', network: 'AVAX', amount: '50.0', status: 'completed', time: '3 days ago', txId: 'mno345...pqr678' },
  ]);
  const [accountSettings, setAccountSettings] = useState({ fullname: '', email: '', phone: '' });

  const navigate = useNavigate();

  // Configuration data
  const networks = [
    { symbol: 'BTC', name: 'Bitcoin', color: 'text-orange-500', bgColor: 'bg-orange-50', binanceTicker: 'BTCUSDT', coingeckoId: 'bitcoin' },
    { symbol: 'ETH', name: 'Ethereum', color: 'text-blue-500', bgColor: 'bg-blue-50', binanceTicker: 'ETHUSDT', coingeckoId: 'ethereum' },
    { symbol: 'BSC', name: 'Binance Smart Chain', color: 'text-yellow-500', bgColor: 'bg-yellow-50', binanceTicker: 'BNBUSDT', coingeckoId: 'binancecoin' },
    { symbol: 'AVAX', name: 'Avalanche', color: 'text-red-500', bgColor: 'bg-red-50', binanceTicker: 'AVAXUSDT', coingeckoId: 'avalanche-avax' },
    { symbol: 'MATIC', name: 'Polygon', color: 'text-purple-500', bgColor: 'bg-purple-50', binanceTicker: 'MATICUSDT', coingeckoId: 'matic-network' }
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

  // Retry logic for API calls
  const retryFetch = async (url, options, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get(url, { ...options, timeout: 10000 });
        return response;
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  };

  // Update wallet data with crypto prices
  const updateWalletData = (prices, userData) => {
    setWalletData(prev => {
      const updatedWallet = { ...prev };
      let totalCryptoValue = 0;

      networks.forEach(network => {
        const symbol = network.symbol.toLowerCase();
        const price = parseFloat(prices[network.binanceTicker]?.lastPrice || prev[symbol]?.price || '0.00');
        const change24h = parseFloat(prices[network.binanceTicker]?.priceChangePercent || prev[symbol]?.change24h || '0.00');
        const rawAmount = userData.balances?.[symbol]?.amount || prev[symbol]?.amount || '0.00';
        const cryptoAmount = parseFloat(rawAmount);
        const usdValue = isNaN(cryptoAmount) || isNaN(price) ? '0.00' : (cryptoAmount * price).toFixed(2);

        updatedWallet[symbol] = {
          amount: isNaN(cryptoAmount) ? '0.00' : cryptoAmount.toFixed(8),
          usd: usdValue,
          price: price.toFixed(2),
          change24h: change24h.toFixed(2)
        };

        totalCryptoValue += parseFloat(usdValue || 0);
      });

      updatedWallet.total_balance = (
        parseFloat(updatedWallet.main_balance || 0) +
        parseFloat(updatedWallet.profit_balance || 0) +
        totalCryptoValue
      ).toFixed(2);

      return updatedWallet;
    });
    setLastUpdated(new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Lagos' }));
  };

  // Fetch user data and crypto prices with CoinGecko
  useEffect(() => {
    let intervalId = null;

    const fetchPrices = async () => {
      const prices = {};
      const newApiErrors = [];
      const cachedPrices = JSON.parse(localStorage.getItem('cryptoPrices') || '{}');

      const coinIds = networks.map(n => n.coingeckoId).join(',');

      try {
        if (cachedPrices.timestamp && Date.now() - cachedPrices.timestamp < 300000) {
          networks.forEach(n => {
            if (cachedPrices[n.binanceTicker]) {
              prices[n.binanceTicker] = cachedPrices[n.binanceTicker];
            }
          });
          if (Object.keys(prices).length === networks.length) return prices;
        }

        const response = await retryFetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
          {}
        );
        response.data.forEach(coin => {
          const network = networks.find(n => n.coingeckoId === coin.id);
          if (network) {
            prices[network.binanceTicker] = {
              symbol: network.binanceTicker,
              lastPrice: coin.current_price.toString(),
              priceChangePercent: coin.price_change_percentage_24h.toString()
            };
          }
        });
        localStorage.setItem('cryptoPrices', JSON.stringify({
          ...prices,
          timestamp: Date.now()
        }));
      } catch (err) {
        console.error('CoinGecko fetch failed:', err);
        networks.forEach(network => {
          if (!prices[network.binanceTicker]) {
            newApiErrors.push(`Failed to fetch ${network.symbol} price: ${err.message}. Try using a VPN or changing DNS to 8.8.8.8.`);
          }
        });
      }

      setApiErrors(newApiErrors);
      return prices;
    };

    const fetchUserDataAndPrices = async () => {
      setIsLoading(true);
      setError(null);
      setApiErrors([]);

      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) {
        setError('Please log in to access your dashboard');
        setIsLoading(false);
        navigate('/login');
        return;
      }

      try {
        // Fetch user data
        const userResponse = await axios.get('https://avaxbacklog.onrender.com/api/auth/user/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 15000,
        });

        let userData = userResponse.data;
        if (userResponse.data.user) {
          userData = userResponse.data.user;
        } else if (userResponse.data.data && userResponse.data.data.user) {
          userData = userResponse.data.data.user;
        } else if (userResponse.data.data) {
          userData = userResponse.data.data;
        }

        console.log('Backend response:', userData);

        if (userData && (userData.fullname || userData.email || userData.username)) {
          const normalizedUser = {
            fullname: userData.fullname?.trim() || userData.username || userData.email?.split('@')[0] || 'User',
            email: userData.email || '',
            id: userData.id || userData.user_id || '',
            phone: userData.phone || userData.phone_number || '',
            avatar: userData.avatar || userData.profile_picture || ''
          };
          setUser(normalizedUser);
          setAccountSettings({
            fullname: normalizedUser.fullname,
            email: normalizedUser.email,
            phone: normalizedUser.phone
          });
        } else {
          setError('Invalid user data received from server');
        }

        const normalizedWalletData = {
          main_balance: userData.main ? parseFloat(userData.main).toFixed(2) : '0.00',
          profit_balance: userData.profit ? parseFloat(userData.profit).toFixed(2) : '0.00',
          total_balance: userData.total ? parseFloat(userData.total).toFixed(2) : (
            (parseFloat(userData.main || 0) + parseFloat(userData.profit || 0)).toFixed(2)
          ),
          btc: userData.balances?.btc || { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
          eth: userData.balances?.eth || { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
          bsc: userData.balances?.bsc || { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
          avax: userData.balances?.avax || { amount: '10.0', usd: '0.00', price: '0.00', change24h: '0.00' },
          matic: userData.balances?.matic || { amount: '100.0', usd: '0.00', price: '0.00', change24h: '0.00' },
        };
        setWalletData(normalizedWalletData);

        if (userData.kyc_status) {
          setKycStatus(userData.kyc_status.toLowerCase());
        }

        if (userData.two_factor_enabled !== undefined) {
          setTwoFactorEnabled(userData.two_factor_enabled);
        }

        // Initial price fetch
        const prices = await fetchPrices();
        updateWalletData(prices, normalizedWalletData);

        // Poll prices every 30 seconds
        intervalId = setInterval(async () => {
          const newPrices = await fetchPrices();
          setWalletData(prev => {
            updateWalletData(newPrices, prev);
            return prev;
          });
        }, 30000);

      } catch (error) {
        console.error('Dashboard: Failed to fetch data:', error);
        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED') {
            setError('Request timeout - please check your connection');
          } else if (error.response?.status === 401) {
            setError('Session expired - please log in again');
            sessionStorage.removeItem('token');
            localStorage.removeItem('token');
            navigate('/login');
          } else if (error.response?.status === 404) {
            setError('User endpoint not found - please contact support');
          } else if (error.response?.status >= 500) {
            setError('Server error - please try again later');
          } else if (!error.response) {
            setError('Network error - please check your connection');
          } else {
            setError(`Error: ${error.response.status} - ${error.response.data?.message || error.response.data?.error || 'Unknown error'}`);
          }
        } else {
          setError('Unexpected error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDataAndPrices();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [navigate]);

  // Helper function to get user display name
  const getUserDisplayName = () => {
    if (isLoading) return 'Loading...';
    if (error) return 'User';
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

  const UserStatusDisplay = () => {
    const errorsToShow = [error, ...apiErrors].filter(e => e);
    if (errorsToShow.length === 0) return null;

    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm text-red-800">
              <strong>Errors:</strong>
              <ul className="list-disc pl-4 mt-1">
                {errorsToShow.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2 text-sm text-red-700">
              <p><strong>Troubleshooting:</strong></p>
              <ul className="list-disc pl-4">
                <li>Check your internet connection.</li>
                <li>Try using a VPN (e.g., ProtonVPN, NordVPN) to bypass potential regional restrictions in Nigeria.</li>
                <li>Change DNS settings to Google DNS (8.8.8.8, 8.8.4.4).</li>
                <li>Click "Retry" to attempt fetching data again.</li>
              </ul>
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
                {isLoading ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : showBalance ? (
                  `$${walletData.total_balance}`
                ) : (
                  '****'
                )}
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
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <StatusBadge status={kycStatus} />
                  )}
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
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : showBalance ? (
                      `$${walletData.main_balance}`
                    ) : (
                      '****'
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Profit</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : showBalance ? (
                      `$${walletData.profit_balance}`
                    ) : (
                      '****'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Network Balances</h3>
            {lastUpdated && (
              <span className="text-xs text-gray-500">Last updated: {lastUpdated}</span>
            )}
          </div>
          <div className="space-y-3 sm:space-y-4">
            {networks.map((network) => {
              const networkData = walletData[network.symbol.toLowerCase()];
              const change24h = parseFloat(networkData?.change24h || 0);
              const isPositiveChange = change24h >= 0;

              return (
                <div key={network.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${network.bgColor} flex items-center justify-center`}>
                      <span className={`text-sm font-semibold ${network.color}`}>
                        {network.symbol}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">{network.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {isLoading ? 'Loading...' : `Price: $${networkData?.price || '0.00'}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-medium text-gray-900 text-sm sm:text-base">
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : showBalance ? (
                        `${networkData?.amount || '0.00'} ${network.symbol}`
                      ) : (
                        '****'
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : showBalance ? (
                        `$${networkData?.usd || '0.00'}`
                      ) : (
                        '****'
                      )}
                    </div>
                    <div className={`text-xs sm:text-sm ${
                      isPositiveChange ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : showBalance ? (
                        `${isPositiveChange ? '+' : ''}${change24h.toFixed(2)}% (24h)`
                      ) : (
                        '****'
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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

  const WithdrawalsContent = () => {
    const [withdrawalStatus, setWithdrawalStatus] = useState(null);

    const handleWithdrawalSubmit = async (e) => {
      e.preventDefault();
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) {
        setError('Please log in to submit a withdrawal');
        return;
      }
      if (!withdrawalData.amount || !withdrawalData.address) {
        setError('Please enter amount and address');
        return;
      }
      setWithdrawalStatus('pending');
      try {
        const response = await axios.post(
          'https://avaxbacklog.onrender.com/api/withdraw/',
          {
            network: selectedNetwork,
            amount: withdrawalData.amount,
            address: withdrawalData.address
          },
          {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
            timeout: 10000
          }
        );
        setError(null);
        setWithdrawalData({ amount: '', address: '' });
        setWithdrawalStatus('completed');
        alert('Withdrawal request submitted successfully');
      } catch (err) {
        setError('Failed to submit withdrawal: ' + (err.response?.data?.message || err.message));
        setWithdrawalStatus('failed');
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 text-black">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Withdraw Funds</h3>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {networks.map((network) => (
              <NetworkTab
                key={network.symbol}
                network={network}
                isActive={selectedNetwork === network.symbol}
                onClick={(symbol) => {
                  setSelectedNetwork(symbol);
                  setWithdrawalStatus(null); // Reset status when switching networks
                }}
              />
            ))}
          </div>
          <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                step="0.00000001"
                value={withdrawalData.amount}
                onChange={(e) => setWithdrawalData({ ...withdrawalData, amount: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Destination Address</label>
              <input
                type="text"
                value={withdrawalData.address}
                onChange={(e) => setWithdrawalData({ ...withdrawalData, address: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter wallet address"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Submit Withdrawal</span>
            </button>
          </form>
          {withdrawalStatus && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Withdrawal Status</h4>
              <StatusBadge status={withdrawalStatus} />
            </div>
          )}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <strong>Important:</strong> Ensure the address is correct for {selectedNetwork}. Incorrect addresses may result in permanent loss of funds.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const KycContent = () => {
    const handleKycSubmit = async (e) => {
      e.preventDefault();
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) {
        setError('Please log in to submit KYC documents');
        return;
      }
      if (!kycData.document) {
        setError('Please select a document to upload');
        return;
      }
      const formData = new FormData();
      formData.append('document', kycData.document);
      try {
        const response = await axios.post(
          'https://avaxbacklog.onrender.com/api/kyc/submit/',
          formData,
          {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'multipart/form-data',
            },
            timeout: 15000
          }
        );
        setError(null);
        setKycData({ document: null });
        setKycStatus('pending');
        alert('KYC document submitted successfully');
      } catch (err) {
        setError('Failed to submit KYC document: ' + (err.response?.data?.message || err.message));
      }
    };

    // Progress bar configuration based on KYC status
    const kycProgress = {
      rejected: { progress: 0, label: 'Rejected - Please resubmit documents', color: 'bg-red-500' },
      pending: { progress: 50, label: 'Pending - Your documents are under review', color: 'bg-yellow-500' },
      approved: { progress: 100, label: 'Approved - Your account is fully verified', color: 'bg-green-500' }
    };

    const currentProgress = kycProgress[kycStatus] || kycProgress.pending;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">KYC Verification</h3>
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Verification Progress</h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${currentProgress.color}`}
                style={{ width: `${currentProgress.progress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{currentProgress.label}</p>
          </div>
          <form onSubmit={handleKycSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Document (PDF, PNG, JPG)</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setKycData({ ...kycData, document: e.target.files[0] })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={kycStatus === 'approved'}
              className={`w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 ${
                kycStatus === 'approved'
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span>Submit KYC Document</span>
            </button>
          </form>
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <strong>Requirements:</strong> Upload a government-issued ID (passport, driver’s license, or national ID). Ensure the document is clear and valid.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SecurityContent = () => {
    const handleSecuritySubmit = async (e) => {
      e.preventDefault();
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) {
        setError('Please log in to update security settings');
        return;
      }
      try {
        if (securityData.currentPassword && securityData.newPassword) {
          await axios.post(
            'https://avaxbacklog.onrender.com/api/security/change-password/',
            {
              current_password: securityData.currentPassword,
              new_password: securityData.newPassword
            },
            {
              headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
              },
              timeout: 10000
            }
          );
        }
        if (securityData.twoFactorCode) {
          await axios.post(
            'https://avaxbacklog.onrender.com/api/security/2fa/',
            { code: securityData.twoFactorCode, enable: !twoFactorEnabled },
            {
              headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
              },
              timeout: 10000
            }
          );
          setTwoFactorEnabled(!twoFactorEnabled);
        }
        setError(null);
        setSecurityData({ currentPassword: '', newPassword: '', twoFactorCode: '' });
        alert('Security settings updated successfully');
      } catch (err) {
        setError('Failed to update security settings: ' + (err.response?.data?.message || err.message));
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
          <form onSubmit={handleSecuritySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                value={securityData.currentPassword}
                onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={securityData.newPassword}
                onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Two-Factor Authentication (2FA) {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </label>
              <input
                type="text"
                value={securityData.twoFactorCode}
                onChange={(e) => setSecurityData({ ...securityData, twoFactorCode: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={twoFactorEnabled ? 'Enter code to disable 2FA' : 'Enter code to enable 2FA'}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Lock className="w-5 h-5" />
              <span>Update Security Settings</span>
            </button>
          </form>
        </div>
      </div>
    );
  };

  const HistoryContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
        <div className="space-y-3 sm:space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center text-gray-600">No transactions found</div>
          ) : (
            transactions.map((tx) => (
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
                    <div className="text-xs text-gray-500 font-mono">{tx.txId}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 text-sm sm:text-base">{tx.amount}</div>
                  <div className="mt-1">
                    <StatusBadge status={tx.status} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const SettingsContent = () => {
    const handleSettingsSubmit = async (e) => {
      e.preventDefault();
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (!token) {
        setError('Please log in to update account settings');
        return;
      }
      try {
        const response = await axios.put(
          'https://avaxbacklog.onrender.com/api/auth/user/update/',
          {
            fullname: accountSettings.fullname,
            email: accountSettings.email,
            phone: accountSettings.phone
          },
          {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
            timeout: 10000
          }
        );
        setUser({ ...user, ...accountSettings });
        setError(null);
        alert('Account settings updated successfully');
      } catch (err) {
        setError('Failed to update settings: ' + (err.response?.data?.message || err.message));
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
          <form onSubmit={handleSettingsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={accountSettings.fullname}
                onChange={(e) => setAccountSettings({ ...accountSettings, fullname: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={accountSettings.email}
                onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={accountSettings.phone}
                onChange={(e) => setAccountSettings({ ...accountSettings, phone: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Settings className="w-5 h-5" />
              <span>Save Settings</span>
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'deposits':
        return <DepositsContent />;
      case 'withdrawals':
        return <WithdrawalsContent />;
      case 'kyc':
        return <KycContent />;
      case 'security':
        return <SecurityContent />;
      case 'history':
        return <HistoryContent />;
      case 'settings':
        return <SettingsContent />;
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
                  {isLoading && <RefreshCw className="w-4 h-4 animate-spin ml-1" />}
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
                  <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                    <User className="w-5 h-5" />
                    <span className="font-medium">{getUserDisplayName()}</span>
                    {isLoading && <RefreshCw className="w-4 h-4 animate-spin ml-1" />}
                  </button>
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