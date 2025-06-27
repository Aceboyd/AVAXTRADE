import React, { useState } from 'react';
import { 
  Wallet, 
  Upload, 
  Download, 
  Shield, 
  Settings, 
  LogOut,
  Copy,
  QrCode,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Smartphone,
  Lock,
  Key,
  Globe,
  TrendingUp,
  History,
  Bell,
  User,
  Camera,
  FileText,
  CreditCard,
  Menu,
  ChevronLeft
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNetwork, setSelectedNetwork] = useState('BTC');
  const [darkMode, setDarkMode] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [kycStatus, setKycStatus] = useState('pending'); // pending, approved, rejected
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    const config = statusConfig[status];
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  const OverviewContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Portfolio</h3>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {showBalance ? '$7,728.35' : '****'}
          </div>
          <div className="text-green-600 text-sm flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12.5% this month
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">KYC Status</h3>
            <Shield className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-2">
            <StatusBadge status={kycStatus} />
          </div>
          <div className="text-sm text-gray-600">
            {kycStatus === 'pending' && 'Verification in progress'}
            {kycStatus === 'approved' && 'Fully verified account'}
            {kycStatus === 'rejected' && 'Please resubmit documents'}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Security Score</h3>
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">85%</div>
          <div className="text-sm text-gray-600">
            Enable 2FA to improve security
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

  const WithdrawalsContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Send Cryptocurrency</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Network</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {networks.map((network) => (
                <NetworkTab
                  key={network.symbol}
                  network={network}
                  isActive={selectedNetwork === network.symbol}
                  onClick={setSelectedNetwork}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder={`Enter ${selectedNetwork} address`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <input
                type="number"
                step="0.00000001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-20 text-sm"
                placeholder="0.00000000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 text-sm">{selectedNetwork}</span>
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Available: {balances[selectedNetwork].amount} {selectedNetwork}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Network Fee</label>
            <div className="grid grid-cols-3 gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                <div className="font-medium">Slow</div>
                <div className="text-xs text-gray-500">~30 min</div>
              </button>
              <button className="px-3 py-2 border-2 border-blue-500 bg-blue-50 text-blue-700 rounded-lg text-sm">
                <div className="font-medium">Standard</div>
                <div className="text-xs">~10 min</div>
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                <div className="font-medium">Fast</div>
                <div className="text-xs text-gray-500">~5 min</div>
              </button>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <strong>Warning:</strong> Cryptocurrency transactions are irreversible. 
                Please double-check the recipient address before confirming.
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Review Transaction
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const KYCContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-2 sm:space-y-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">KYC Verification</h3>
          <StatusBadge status={kycStatus} />
        </div>

        {kycStatus === 'pending' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  Your KYC verification is currently being processed. This typically takes 24-48 hours.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800 text-sm">Identity Document</span>
                </div>
                <div className="text-sm text-green-700">Submitted</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800 text-sm">Selfie Verification</span>
                </div>
                <div className="text-sm text-green-700">Submitted</div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800 text-sm">Review Process</span>
                </div>
                <div className="text-sm text-yellow-700">In Progress</div>
              </div>
            </div>
          </div>
        )}

        {kycStatus === 'approved' && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-800">
                  <strong>Congratulations!</strong> Your identity has been successfully verified. 
                  You now have full access to all platform features.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Verification Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Verified: December 15, 2024</div>
                  <div>Document Type: Passport</div>
                  <div>Verification Level: Full</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Available Features</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Unlimited deposits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Unlimited withdrawals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>All network access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {kycStatus === 'rejected' && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-800">
                  <strong>Verification Failed</strong> - Please review the issues below and resubmit your documents.
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Issues Found:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <X className="w-4 h-4 text-red-600 mt-0.5" />
                  <span>Document image is blurry or unclear</span>
                </li>
                <li className="flex items-start space-x-2">
                  <X className="w-4 h-4 text-red-600 mt-0.5" />
                  <span>Selfie does not match ID document</span>
                </li>
              </ul>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Start New Verification
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const SecurityContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <div className="font-medium text-gray-900 text-sm sm:text-base">Authenticator App</div>
                <div className="text-xs sm:text-sm text-gray-500">Use Google Authenticator or similar app</div>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  twoFactorEnabled 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {twoFactorEnabled ? 'Disable' : 'Enable'}
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <div className="font-medium text-gray-900 text-sm sm:text-base">SMS Authentication</div>
                <div className="text-xs sm:text-sm text-gray-500">Receive codes via text message</div>
              </div>
              <button className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200">
                Configure
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Password Security</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900 text-sm sm:text-base">Change Password</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <strong>Strong Password Tips:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Use at least 12 characters</li>
                    <li>• Include uppercase and lowercase letters</li>
                    <li>• Add numbers and special characters</li>
                    <li>• Avoid common words or personal information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Login Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3 flex-1">
              <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-gray-900 text-sm sm:text-base">Current Session</div>
                <div className="text-xs sm:text-sm text-gray-500 truncate">Chrome on Windows • 192.168.1.100</div>
              </div>
            </div>
            <div className="text-sm text-green-600 font-medium">Active</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3 flex-1">
              <Smartphone className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-gray-900 text-sm sm:text-base">Mobile App</div>
                <div className="text-xs sm:text-sm text-gray-500 truncate">iOS • 192.168.1.105 • 2 hours ago</div>
              </div>
            </div>
            <button className="text-sm text-red-600 hover:text-red-700">Terminate</button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">
            Logout from All Devices
          </button>
        </div>
      </div>
    </div>
  );

  const HistoryContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Transaction History</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Networks</option>
              <option>Bitcoin</option>
              <option>Ethereum</option>
              <option>BSC</option>
              <option>Avalanche</option>
              <option>Polygon</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Types</option>
              <option>Deposits</option>
              <option>Withdrawals</option>
            </select>
          </div>
        </div>

        {/* Mobile view - Card layout */}
        <div className="block sm:hidden space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {tx.type === 'deposit' ? (
                    <Download className="w-4 h-4 text-green-600" />
                  ) : (
                    <Upload className="w-4 h-4 text-red-600" />
                  )}
                  <span className="capitalize font-medium text-sm">{tx.type}</span>
                  <span className="font-medium text-sm">{tx.network}</span>
                </div>
                <StatusBadge status={tx.status} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">{tx.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span>{tx.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">TX ID:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs">{tx.txId}</span>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view - Table layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Network</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {tx.type === 'deposit' ? (
                        <Download className="w-4 h-4 text-green-600" />
                      ) : (
                        <Upload className="w-4 h-4 text-red-600" />
                      )}
                      <span className="capitalize font-medium">{tx.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium">{tx.network}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium">{tx.amount}</span>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="py-4 px-4 text-gray-600">{tx.time}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm text-gray-600">{tx.txId}</span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SettingsContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value="user@example.com"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC+0 (UTC)</option>
              <option>UTC+1 (Central European Time)</option>
              <option>UTC+9 (Japan Standard Time)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="font-medium text-gray-900 text-sm sm:text-base">Email Notifications</div>
              <div className="text-xs sm:text-sm text-gray-500">Receive updates about your account</div>
            </div>
            <button className="w-12 h-6 bg-blue-500 rounded-full relative flex-shrink-0">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="font-medium text-gray-900 text-sm sm:text-base">SMS Notifications</div>
              <div className="text-xs sm:text-sm text-gray-500">Receive text messages for important updates</div>
            </div>
            <button className="w-12 h-6 bg-gray-300 rounded-full relative flex-shrink-0">
              <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="font-medium text-gray-900 text-sm sm:text-base">Transaction Alerts</div>
              <div className="text-xs sm:text-sm text-gray-500">Get notified of deposits and withdrawals</div>
            </div>
            <button className="w-12 h-6 bg-blue-500 rounded-full relative flex-shrink-0">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Display Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="font-medium text-gray-900 text-sm sm:text-base">Dark Mode</div>
              <div className="text-xs sm:text-sm text-gray-500">Switch to dark theme</div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full relative flex-shrink-0 ${darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="font-medium text-gray-900 text-sm sm:text-base">Hide Balances</div>
              <div className="text-xs sm:text-sm text-gray-500">Hide balance amounts by default</div>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className={`w-12 h-6 rounded-full relative flex-shrink-0 ${!showBalance ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${!showBalance ? 'translate-x-6' : 'translate-x-1'}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'deposits':
        return <DepositsContent />;
      case 'withdrawals':
        return <WithdrawalsContent />;
      case 'kyc':
        return <KYCContent />;
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
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
              
              <button className={`hidden sm:flex p-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                <User className="w-5 h-5" />
              </button>
              
              <button className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
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
                  <span className="font-medium">Profile</span>
                </button>
                <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
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
          {/* Desktop Sidebar */}
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;