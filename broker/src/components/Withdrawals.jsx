import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { networks } from '../constants/networks';
import { apiClient } from '../utils/api';
import NetworkTab from './common/NetworkTab';
import StatusBadge from './common/StatusBadge';

const Withdrawals = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('BTC');
  const [withdrawalData, setWithdrawalData] = useState({ amount: '', address: '' });
  const [withdrawalStatus, setWithdrawalStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    if (!withdrawalData.amount || !withdrawalData.address) {
      setError('Please enter amount and address');
      return;
    }

    setIsSubmitting(true);
    setWithdrawalStatus('pending');
    setError(null);

    try {
      await apiClient.post('/withdraw/', {
        network: selectedNetwork,
        amount: withdrawalData.amount,
        address: withdrawalData.address
      });
      
      setWithdrawalData({ amount: '', address: '' });
      setWithdrawalStatus('completed');
      alert('Withdrawal request submitted successfully');
    } catch (err) {
      setError('Failed to submit withdrawal: ' + (err.response?.data?.message || err.message));
      setWithdrawalStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Withdraw Funds</h3>
        
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {networks.map((network) => (
            <NetworkTab
              key={network.symbol}
              network={network}
              isActive={selectedNetwork === network.symbol}
              onClick={(symbol) => {
                setSelectedNetwork(symbol);
                setWithdrawalStatus(null);
                setError(null);
              }}
            />
          ))}
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Withdrawal'}</span>
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
              <strong>Important:</strong> Ensure the address is correct for {selectedNetwork}. 
              Incorrect addresses may result in permanent loss of funds.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawals;