import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const UserStatusDisplay = ({ error, apiErrors }) => {
  const errorsToShow = [error, ...apiErrors].filter(e => e);
  if (errorsToShow.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <div className="text-sm text-red-800">
            <strong>Errors:</strong>
            <ul className="list-disc pl-4 mt-1">
              {errorsToShow.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2 text-sm text-red-700">
            <p><strong>Troubleshooting:</strong></p>
            <ul className="list-disc pl-4">
              <li>Check your internet connection.</li>
              <li>Try using a VPN (e.g., ProtonVPN, NordVPN) to bypass potential regional restrictions in Nigeria.</li>
              <li>Change DNS settings to Google DNS (8.8.8.8, 8.8.4.4).</li>
              <li>Click "Retry" to attempt fetching data again.</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-700 hover:text-red-800 underline flex items-center space-x-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserStatusDisplay;