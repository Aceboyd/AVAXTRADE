import React from 'react';
import { Wallet, X, User, LogOut, RefreshCw, TrendingUp, Download, Upload, Shield, Lock, History, Settings } from 'lucide-react';

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

const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  activeTab,
  setActiveTab,
  kycStatus,
  darkMode,
  getUserDisplayName,
  isLoading,
  handleLogout
}) => {
  if (!mobileMenuOpen) return null;

  return (
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
            const IconComponent = iconMap[item.icon];
            const isDisabled = item.id === 'kyc' && (kycStatus === 'in review' || kycStatus === 'approved');
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isDisabled) return;
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
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
  );
};

export default MobileMenu;