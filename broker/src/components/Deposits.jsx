import React, { useState } from 'react';
import { Copy, QrCode, AlertCircle, Clock } from 'lucide-react';
import { networks } from '../constants/networks';
import NetworkTab from './common/NetworkTab';

const Deposits = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('BTC');

  const getDepositAddress = (network) => {
    const addresses = {
      'BTC': 'bc1q5nq0zvaachxvr0w8375r3y6zq3m3r07e0zwrrm',
      'ETH': '0x25d1129d0f86a389AaC0E8e9008f02A21bBC3617',
      'SOL': 'BtFgBXXcofS4BFogY9heEK9pSR9zZmo4NHtSNQ7MC5MZ',
      'TRON': 'LWh7E38D76iuihP2pvGybc4dgn2Lgi2Y2z',
      'LTC': 'THW64yhsfjKLkgaEiLB97CgVE8kvnSuV5e'
    };
    return addresses[network] || '';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
  };

  return (
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
                <button 
                  onClick={() => copyToClipboard(getDepositAddress(selectedNetwork))}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </button>
              </div>
              <div className="font-mono text-xs sm:text-sm text-gray-900 break-all">
                {getDepositAddress(selectedNetwork)}
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
                <li>• Solana (SOL): 1 confirmation</li>
                <li>• Tron (TRON): 1 confirmation</li>
                <li>• Litecoin (LTC): 6 confirmations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposits;