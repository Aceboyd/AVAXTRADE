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
    setWithdrawalStatus('pending'); // Show immediately
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
    <div className="space-y-6 px-3 sm:px-0">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">

        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 text-center sm:text-left">
          Withdraw Funds
        </h3>

        {/* Network Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
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

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-sm sm:text-base">
            <div className="text-red-800">{error}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleWithdrawalSubmit} className="space-y-5">
          {/* Amount */}
          <div className="space-y-1">
            <label className="block text-sm sm:text-md font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              step="0.00000001"
              value={withdrawalData.amount}
              onChange={(e) =>
                setWithdrawalData({ ...withdrawalData, amount: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         text-black text-base sm:text-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              disabled={isSubmitting}
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="block text-sm sm:text-md font-medium text-gray-700">
              Destination Address
            </label>
            <input
              type="text"
              value={withdrawalData.address}
              onChange={(e) =>
                setWithdrawalData({ ...withdrawalData, address: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         text-black text-base sm:text-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter wallet address"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 sm:py-3 px-6 rounded-lg flex items-center justify-center space-x-2 
            text-base sm:text-lg font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Withdrawal'}</span>
          </button>
        </form>

        {/* Status */}
        {withdrawalStatus && (
          <div className="mt-4 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-2">
              Withdrawal Status
            </h4>
            <StatusBadge status={withdrawalStatus} />
          </div>
        )}

        {/* Warning */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm sm:text-base text-yellow-800 leading-relaxed">
              <strong>Important:</strong> Ensure the address is correct for{" "}
              {selectedNetwork}. Incorrect addresses may result in permanent
              loss of funds.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Withdrawals;
