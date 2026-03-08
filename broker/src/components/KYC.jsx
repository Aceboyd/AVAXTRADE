import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import axios from 'axios';

const KYC = ({ user, kycStatus, setKycStatus }) => {
  const [kycData, setKycData] = useState({ document: null });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to get the auth token from storage
  const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) {
      console.warn('No authentication token found in storage');
      return {};
    }
    return {
      Authorization: `Token ${token}`,  // Standard for DRF TokenAuthentication or Knox
    };
  };

  const handleKycSubmit = async (e) => {
    e.preventDefault();

    if (!kycData.document) {
      setError('Please select a document to upload');
      return;
    }

    if (!user?.id) {
      setError('User information is missing');
      return;
    }

    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) {
      setError('You are not logged in. Please log in again.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('image_url', kycData.document);
    formData.append('user', user.id);  // Try this first (user ID as integer/string)

    try {
      const response = await axios.post(
        'https://avaxbacklog.onrender.com/kyc/',
        formData,
        {
          headers: getAuthHeaders(),
          timeout: 30000,
        }
      );

      setKycData({ document: null });
      setKycStatus('in review');
      alert('KYC document submitted successfully');
      console.log('KYC Response:', response.data);
    } catch (err) {
      let message = 'Unknown error';

      if (err.response) {
        console.log('Full error response:', err.response.data);  // Check this in browser console!

        if (err.response.status === 401) {
          message = 'Authentication failed (401 Unauthorized). Possible reasons:\n- Token is missing, invalid, or expired.\n- Log out and log in again to get a fresh token.\n- Check if token is correctly saved in localStorage/sessionStorage after login.';
        } else if (err.response.status === 400) {
          // Improved parsing of DRF-style errors
          const data = err.response.data;
          const errors = [];

          if (data?.detail) errors.push(data.detail);
          if (data?.message) errors.push(data.message);
          if (data?.non_field_errors) errors.push(data.non_field_errors.join(' '));
          if (data?.image_url) errors.push('image_url: ' + data.image_url.join(' '));
          if (data?.user) errors.push('user: ' + data.user.join(' '));

          // Fallback: stringify all
          if (errors.length === 0) errors.push(JSON.stringify(data));

          message = 'Bad request (400). Validation error: ' + errors.join(' | ');
        } else {
          message = `Server error ${err.response.status}: ${JSON.stringify(err.response.data)}`;
        }
      } else if (err.request) {
        message = 'No response from server. Check internet or server might be sleeping (Render free tier).';
      } else {
        message = err.message;
      }

      setError('Failed to submit KYC document: ' + message);
      console.error('KYC submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of the component (progress, UI, etc.) remains the same
  const kycProgress = {
    rejected: { progress: 0, label: 'Rejected - Please resubmit documents', color: 'bg-red-500' },
    pending: { progress: 0, label: 'Pending - Upload your documents', color: 'bg-yellow-500' },
    'in review': { progress: 50, label: 'In Review - Your documents are under review', color: 'bg-blue-500' },
    approved: { progress: 100, label: 'Approved - Your account is fully verified', color: 'bg-green-500' }
  };

  const currentProgress = kycProgress[kycStatus] || kycProgress.pending;

  const isDisabled = kycStatus === 'in review' || kycStatus === 'approved' || isSubmitting;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">KYC Verification</h3>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Verification Progress</h4>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${currentProgress.color}`}
              style={{ width: `${currentProgress.progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">{currentProgress.label}</p>
        </div>

        {user?.kyc_photo && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Document</h4>
            <img
              src={user.kyc_photo}
              alt="KYC Document"
              className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm"
            />
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 whitespace-pre-line">{error}</div>
          </div>
        )}

        <form onSubmit={handleKycSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Document (PDF, PNG, JPG)
            </label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setKycData({ ...kycData, document: e.target.files?.[0] || null })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={isDisabled}
            />
            {kycData.document && (
              <p className="mt-2 text-sm text-gray-600">Selected: {kycData.document.name}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 font-medium transition-all ${
              isDisabled
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit KYC Document'}</span>
          </button>
        </form>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <strong>Requirements:</strong> Upload a clear government-issued ID (passport, driver's license, or national ID card). 
              Ensure all details are visible and the document is valid.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYC;