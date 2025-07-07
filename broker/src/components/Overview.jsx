import React, { useState, useEffect } from 'react';
import {
  TrendingUp, Eye, EyeOff, Shield, CreditCard, Download, Upload, RefreshCw, AlertTriangle
} from 'lucide-react';
import { apiClient } from '../utils/api';
import { networks } from '../constants/networks';
import StatusBadge from './common/StatusBadge';

const Overview = ({
  user,
  walletData,
  showBalance,
  setShowBalance,
  kycStatus,
  isLoading,
  error,
  apiErrors
}) => {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(true);
  const [txError, setTxError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setTxLoading(true);
        const response = await apiClient.get('/transactions/');
        const raw = response.data?.results || response.data || [];

        const formatted = raw.map((tx, i) => {
          const id = String(tx.id ?? i);
          const txId = id.length > 12 ? `${id.slice(0, 6)}...${id.slice(-6)}` : id;
          return {
            id,
            type: tx.transaction_type || 'unknown',
            network: tx.crypto_type || 'n/a',
            amount: tx.amount ? parseFloat(tx.amount).toFixed(8) : '0.00000000',
            status: tx.transaction_status === 'confirmed' ? 'completed' : tx.transaction_status || 'pending',
            time: tx.created_at
              ? new Date(tx.created_at).toLocaleString('en-US', { timeZone: 'Africa/Lagos' })
              : 'unknown',
            txId,
          };
        });

        setTransactions(formatted);
        setTxError(null);
      } catch (err) {
        setTxError('Failed to fetch transactions');
      } finally {
        setTxLoading(false);
      }
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let intervalId;
    const fetchPrices = async () => {
      const prices = {};
      const cachedPrices = JSON.parse(localStorage.getItem('cryptoPrices') || '{}');
      const coinIds = networks.map(n => n.coingeckoId).join(',');

      try {
        if (cachedPrices.timestamp && Date.now() - cachedPrices.timestamp < 300000) {
          networks.forEach(n => {
            if (cachedPrices[n.binanceTicker]) {
              prices[n.binanceTicker] = cachedPrices[n.binanceTicker];
            }
          });
          if (Object.keys(prices).length === networks.length) {
            setCryptoPrices(prices);
            return;
          }
        }

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}`
        );
        const data = await response.json();

        data.forEach((coin) => {
          const network = networks.find(n => n.coingeckoId === coin.id);
          if (network) {
            prices[network.binanceTicker] = {
              symbol: network.binanceTicker,
              lastPrice: coin.current_price.toString(),
              priceChangePercent: coin.price_change_percentage_24h?.toFixed(2) || '0.00'
            };
          }
        });

        localStorage.setItem('cryptoPrices', JSON.stringify({
          ...prices,
          timestamp: Date.now()
        }));

        setCryptoPrices(prices);
        setLastUpdated(new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Lagos' }));
      } catch (err) {
        console.error('Failed to fetch prices');
      }
    };

    fetchPrices();
    intervalId = setInterval(fetchPrices, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const getNetworkData = (symbol) => {
    const networkData = walletData[symbol.toLowerCase()];
    const priceData = cryptoPrices[networks.find(n => n.symbol === symbol)?.binanceTicker || ''];
    return {
      amount: networkData?.amount || '0.00',
      usd: networkData?.usd || '0.00',
      price: priceData?.lastPrice || networkData?.price || '0.00',
      change24h: priceData?.priceChangePercent || networkData?.change24h || '0.00'
    };
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[180px] sm:min-h-[200px]">
          <div className="p-4 sm:p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Portfolio</h3>
              <button onClick={() => setShowBalance(!showBalance)} className="text-gray-500 hover:text-gray-700">
                {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {isLoading ? <RefreshCw className="w-6 h-6 animate-spin" /> : showBalance ? `$${walletData.total_balance}` : '****'}
              </div>
              <div className="text-green-600 text-sm flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% this month
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[180px] sm:min-h-[200px]">
          <div className="p-4 sm:p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">KYC Status</h3>
              <Shield className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div className="mb-2">
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <StatusBadge status={kycStatus} />}
              </div>
              <div className="text-sm text-gray-600">
                {kycStatus === 'pending' && 'Verification in progress'}
                {kycStatus === 'in review' && 'Documents under review'}
                {kycStatus === 'approved' && 'Fully verified account'}
                {kycStatus === 'rejected' && 'Please resubmit documents'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[180px] sm:min-h-[200px]">
          <div className="p-4 sm:p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Main & Profit Balance</h3>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <div className="text-sm text-gray-600">Main</div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : showBalance ? `$${walletData.main_balance}` : '****'}
              </div>
              <div className="text-sm text-gray-600 mt-4">Profit</div>
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : showBalance ? `$${walletData.profit_balance}` : '****'}
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Network Balances and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Balances */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Network Balances</h3>
            {lastUpdated && (
              <span className="text-xs text-gray-500">Last updated: {lastUpdated}</span>
            )}
          </div>
          <div className="space-y-3">
            {networks.map((network) => {
              const data = getNetworkData(network.symbol);
              const change = parseFloat(data.change24h);
              const isPositive = change >= 0;

              return (
                <div key={network.symbol} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${network.bgColor} flex items-center justify-center`}>
                      <span className={`text-sm font-semibold ${network.color}`}>{network.symbol}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{network.name}</div>
                      <div className="text-xs text-gray-500">Price: ${data.price}</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm font-medium text-gray-900">{showBalance ? `${data.amount} ${network.symbol}` : '****'}</div>
                    <div className="text-xs text-gray-500">{showBalance ? `$${data.usd}` : '****'}</div>
                    <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {showBalance ? `${isPositive ? '+' : ''}${change.toFixed(2)}% (24h)` : '****'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {txLoading ? (
              <div className="text-center text-gray-600">Loading transactions...</div>
            ) : txError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-800">{txError}</div>
                </div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center text-gray-600">No transactions found</div>
            ) : (
              transactions.slice(0, 3).map(tx => (
                <div key={tx.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${tx.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center`}>
                      {tx.type === 'deposit' ? <Download className="w-4 h-4 text-green-600" /> : <Upload className="w-4 h-4 text-red-600" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 capitalize">{tx.type}</div>
                      <div className="text-xs text-gray-500">{tx.network.toUpperCase()} • {tx.time}</div>
                      <div className="text-xs text-gray-500 font-mono">{tx.txId}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{tx.amount}</div>
                    <div className="mt-1">
                      <StatusBadge status={tx.status.toLowerCase()} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
