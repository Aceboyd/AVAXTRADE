import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { apiClient } from '../utils/api';

const Security = ({ twoFactorEnabled, setTwoFactorEnabled }) => {
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    twoFactorCode: ''
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (securityData.currentPassword && securityData.newPassword) {
        await apiClient.post('/security/change-password/', {
          current_password: securityData.currentPassword,
          new_password: securityData.newPassword
        });
      }

      if (securityData.twoFactorCode) {
        await apiClient.post('/security/2fa/', {
          code: securityData.twoFactorCode,
          enable: !twoFactorEnabled
        });
        setTwoFactorEnabled(!twoFactorEnabled);
      }

      setSecurityData({ currentPassword: '', newPassword: '', twoFactorCode: '' });
      alert('Security settings updated successfully');
    } catch (err) {
      setError('Failed to update security settings: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        <form onSubmit={handleSecuritySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={securityData.currentPassword}
              onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current password"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={securityData.newPassword}
              onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Two-Factor Authentication (2FA) {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </label>
            <input
              type="text"
              value={securityData.twoFactorCode}
              onChange={(e) => setSecurityData({ ...securityData, twoFactorCode: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={twoFactorEnabled ? 'Enter code to disable 2FA' : 'Enter code to enable 2FA'}
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
            <Lock className="w-5 h-5" />
            <span>{isSubmitting ? 'Updating...' : 'Update Security Settings'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Security;