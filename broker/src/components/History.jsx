import React, { useState, useEffect } from 'react';
import { Download, Upload, AlertTriangle, RefreshCw } from 'lucide-react';
import { apiClient } from '../utils/api';
import StatusBadge from './common/StatusBadge';

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTransactions = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await apiClient.get('/transactions/');
      console.log('Transaction API response:', response.data);

      let transactionData = [];

      if (Array.isArray(response.data?.results)) {
        transactionData = response.data.results;
      } else if (Array.isArray(response.data)) {
        transactionData = response.data;
      } else {
        console.error('Unexpected transaction format:', response.data);
        setError('Unexpected transaction data format from server.');
        return;
      }

      const formatted = transactionData.map((tx, i) => {
        const id = String(tx.id ?? i);
        const txId = id.length > 12 ? `${id.slice(0, 6)}...${id.slice(-6)}` : id;

        return {
          id,
          type: tx.transaction_type || 'unknown',
          network: tx.crypto_type || 'n/a',
          amount: tx.amount ? parseFloat(tx.amount).toFixed(8) : '0.00000000',
          status: tx.transaction_status || 'pending',
          time: tx.created_at
            ? new Date(tx.created_at).toLocaleString('en-US', {
                timeZone: 'Africa/Lagos',
              })
            : 'unknown',
          txId,
        };
      });

      setTransactions(formatted);
    } catch (err) {
      console.error('Transaction fetch failed:', err);
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log out and log in again.');
      } else {
        setError(`Failed to fetch transactions: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Transaction History</h3>
          <button
            onClick={fetchTransactions}
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-600 py-8">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
              Loading transactions...
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-800">{error}</div>
              </div>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center text-gray-600 py-8">No transactions found</div>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      tx.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                    } flex items-center justify-center`}
                  >
                    {tx.type === 'deposit' ? (
                      <Download className="w-4 h-4 text-green-600" />
                    ) : (
                      <Upload className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 capitalize text-sm sm:text-base">
                      {tx.type}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {tx.network.toUpperCase()} • {tx.time}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">{tx.txId}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 text-sm sm:text-base">
                    {tx.amount}
                  </div>
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
  );
};

export default History;
