export const networks = [
  { symbol: 'BTC', name: 'Bitcoin', color: 'text-orange-500', bgColor: 'bg-orange-50', binanceTicker: 'BTCUSDT', coingeckoId: 'bitcoin' },
  { symbol: 'ETH', name: 'Ethereum', color: 'text-blue-500', bgColor: 'bg-blue-50', binanceTicker: 'ETHUSDT', coingeckoId: 'ethereum' },
  { symbol: 'SOL', name: 'Solana', color: 'text-teal-500', bgColor: 'bg-teal-50', binanceTicker: 'SOLUSDT', coingeckoId: 'solana' },
  { symbol: 'TRON', name: 'Tron', color: 'text-red-500', bgColor: 'bg-red-50', binanceTicker: 'TRXUSDT', coingeckoId: 'tron' },
  { symbol: 'LTC', name: 'Litecoin', color: 'text-gray-500', bgColor: 'bg-gray-50', binanceTicker: 'LTCUSDT', coingeckoId: 'litecoin' }
];

export const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: 'TrendingUp' },
  { id: 'deposits', label: 'Deposits', icon: 'Download' },
  { id: 'withdrawals', label: 'Withdrawals', icon: 'Upload' },
  { id: 'kyc', label: 'KYC Verification', icon: 'Shield' },
  { id: 'security', label: 'Security', icon: 'Lock' },
  { id: 'history', label: 'Transaction History', icon: 'History' },
  { id: 'settings', label: 'Account Settings', icon: 'Settings' },
];