import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { apiClient } from '../utils/api';

const Settings = ({ user, setUser }) => {
  const [accountSettings, setAccountSettings] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await apiClient.put('/auth/user/update/', {
        fullname: accountSettings.fullname,
        email: accountSettings.email,
        phone: accountSettings.phone
      });
      
      setUser({ ...user, ...accountSettings });
      alert('Account settings updated successfully');
    } catch (err) {
      setError('Failed to update settings: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        <form onSubmit={handleSettingsSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={accountSettings.fullname}
              onChange={(e) => setAccountSettings({ ...accountSettings, fullname: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={accountSettings.email}
              onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={accountSettings.phone}
              onChange={(e) => setAccountSettings({ ...accountSettings, phone: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
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
            <SettingsIcon className="w-5 h-5" />
            <span>{isSubmitting ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;