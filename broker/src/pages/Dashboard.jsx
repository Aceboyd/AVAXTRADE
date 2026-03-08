import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header2';
import Sidebar from '../components/Sidebar';
import MobileMenu from '../components/MobileMenu';
import Overview from '../components/Overview';
import Invest from '../components/invest';
import Deposits from '../components/Deposits';
import Withdrawals from '../components/Withdrawals';
import KYC from '../components/KYC';
import Security from '../components/Security';
import History from '../components/History';
import Settings from '../components/Settings';
import { apiClient } from '../utils/api';

const Dashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [kycStatus, setKycStatus] = useState('pending');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiErrors, setApiErrors] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [walletData, setWalletData] = useState({
    main_balance: '0.00',
    profit_balance: '0.00',
    total_balance: '0.00',
    btc: { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
    eth: { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
    sol: { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
    tron: { amount: '10.0', usd: '0.00', price: '0.00', change24h: '0.00' },
    ltc: { amount: '100.0', usd: '0.00', price: '0.00', change24h: '0.00' },
  });

  const navigate = useNavigate();

  // Fetch user data and transactions
  useEffect(() => {
    let intervalId;

    const fetchUserData = async () => {
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
        const userResponse = await apiClient.get('/auth/user/');

        let userData = userResponse.data;
        if (userResponse.data.user) {
          userData = userResponse.data.user;
        } else if (userResponse.data.data && userResponse.data.data.user) {
          userData = userResponse.data.data.user;
        } else if (userResponse.data.data) {
          userData = userResponse.data.data;
        }

        if (userData && (userData.fullname || userData.email || userData.username)) {
          const normalizedUser = {
            fullname: userData.fullname?.trim() || userData.username || userData.email?.split('@')[0] || 'User',
            email: userData.email || '',
            id: userData.id || userData.user_id || '',
            phone: userData.phone || userData.phone_number || '',
            avatar: userData.avatar || userData.profile_picture || '',
            kyc_status: userData.kyc_status || 'pending',
            kyc_photo: userData.kyc_photo || ''
          };
          setUser(normalizedUser);
          setKycStatus(normalizedUser.kyc_status.toLowerCase());
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
          sol: userData.balances?.sol || { amount: '0.00', usd: '0.00', price: '0.00', change24h: '0.00' },
          tron: userData.balances?.tron || { amount: '10.0', usd: '0.00', price: '0.00', change24h: '0.00' },
          ltc: userData.balances?.ltc || { amount: '100.0', usd: '0.00', price: '0.00', change24h: '0.00' },
        };
        setWalletData(normalizedWalletData);

        if (userData.two_factor_enabled !== undefined) {
          setTwoFactorEnabled(userData.two_factor_enabled);
        }

        // Fetch transactions
        try {
          const transactionResponse = await apiClient.get('/transactions/');
          const transactionData = transactionResponse.data.results || transactionResponse.data;
          const formattedTransactions = transactionData.map((tx) => ({
            id: tx.id,
            type: tx.transaction_type.toLowerCase(),
            network: tx.crypto_type.toUpperCase(),
            amount: parseFloat(tx.amount).toFixed(8),
            status: tx.transaction_status.toLowerCase(),
            time: new Date(tx.created_at).toLocaleString('en-US', { timeZone: 'Africa/Lagos' }),
            txId: tx.id.slice(0, 6) + '...' + tx.id.slice(-6)
          }));
          setTransactions(formattedTransactions);
        } catch (transactionErr) {
          if (transactionErr.response?.status === 401) {
            setApiErrors(prev => [...prev, 'Unable to fetch transactions: Authentication failed. Please log out and log in again.']);
          } else {
            setApiErrors(prev => [...prev, `Failed to fetch transactions: ${transactionErr.message}. Try using a VPN or changing DNS to 8.8.8.8.`]);
          }
        }

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

    fetchUserData();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [navigate]);

  const getUserDisplayName = () => {
    if (isLoading) return 'Loading...';
    if (error) return 'User';
    if (user?.fullname) return user.fullname;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

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

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Overview
            user={user}
            walletData={walletData}
            showBalance={showBalance}
            setShowBalance={setShowBalance}
            kycStatus={kycStatus}
            isLoading={isLoading}
            error={error}
            transactions={transactions}
            apiErrors={apiErrors}
          />
        );
      case 'deposits':
        return <Deposits />;
      case 'withdrawals':
        return <Withdrawals />;
      case 'invest':
        return <Invest />;
      case 'kyc':
        return <KYC user={user} kycStatus={kycStatus} setKycStatus={setKycStatus} />;
      case 'security':
        return <Security twoFactorEnabled={twoFactorEnabled} setTwoFactorEnabled={setTwoFactorEnabled} />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings user={user} setUser={setUser} />;
      default:
        return (
          <Overview
            user={user}
            walletData={walletData}
            showBalance={showBalance}
            setShowBalance={setShowBalance}
            kycStatus={kycStatus}
            isLoading={isLoading}
            error={error}
            transactions={transactions}
            apiErrors={apiErrors}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setMobileMenuOpen={setMobileMenuOpen}
          getUserDisplayName={getUserDisplayName}
          isLoading={isLoading}
          handleLogout={handleLogout}
        />

        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          kycStatus={kycStatus}
          darkMode={darkMode}
          getUserDisplayName={getUserDisplayName}
          isLoading={isLoading}
          handleLogout={handleLogout}
        />

        <div className="flex min-h-screen">
          {/* Desktop sidebar — fixed position */}
          <aside
  className={`
    hidden md:block
    fixed inset-y-0 left-0 z-20
    w-64 lg:w-72 xl:w-80
    border-r border-gray-200
    overflow-hidden    // ← remove or change this if present
  `}
      >
      <div className="h-screen overflow-y-auto bg-inherit">   {/* ← important */}
        <div className="p-4 md:p-6">
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                kycStatus={kycStatus}
                darkMode={darkMode}
              />
            </div>
            </div>
          </aside>

          {/* Main content — shifted right on desktop */}
          <main
            className={`
              flex-1
              md:ml-64 lg:ml-72 xl:ml-80
              min-h-screen
            `}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

function App() {
  return <Dashboard />;
}

export default App;