import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { apiClient } from '../utils/api';

const KYC = ({ user, kycStatus, setKycStatus }) => {
  const [kycData, setKycData] = useState({ document: null });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('image_url', kycData.document);  // Use field name expected by backend
    formData.append('user', user.id);                // Or user.email / username if needed

    try {
      const response = await apiClient.post('https://avaxbacklog.onrender.com/kyc/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setKycData({ document: null });
      setKycStatus('in review');
      alert('KYC document submitted successfully');
      console.log('Response:', response.data);
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data || err.message;
      setError('Failed to submit KYC document: ' + message);
      console.error('KYC submit error:', err.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="text-sm text-red-800">{error}</div>
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