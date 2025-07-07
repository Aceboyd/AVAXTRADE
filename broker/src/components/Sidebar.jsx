import React from 'react';
import { TrendingUp, Download, Upload, Shield, Lock, History, Settings } from 'lucide-react';

const iconMap = {
  TrendingUp, Download, Upload, Shield, Lock, History, Settings
};

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: 'TrendingUp' },
  { id: 'deposits', label: 'Deposits', icon: 'Download' },
  { id: 'withdrawals', label: 'Withdrawals', icon: 'Upload' },
  { id: 'kyc', label: 'KYC Verification', icon: 'Shield' },
  { id: 'security', label: 'Security', icon: 'Lock' },
  { id: 'history', label: 'Transaction History', icon: 'History' },
  { id: 'settings', label: 'Account Settings', icon: 'Settings' },
];

const Sidebar = ({ activeTab, setActiveTab, kycStatus, darkMode }) => {
  return (
    <nav className="space-y-2">
      {sidebarItems.map((item) => {
        const IconComponent = iconMap[item.icon];
        const isDisabled = item.id === 'kyc' && (kycStatus === 'in review' || kycStatus === 'approved');
        
        return (
          <button
            key={item.id}
            onClick={() => {
              if (isDisabled) return;
              setActiveTab(item.id);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              isDisabled
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : activeTab === item.id
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
  );
};

export default Sidebar;