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

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('document', kycData.document);

    try {
      await apiClient.post('/kyc/submit/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setKycData({ document: null });
      setKycStatus('in review');
      alert('KYC document submitted successfully');
    } catch (err) {
      setError('Failed to submit KYC document: ' + (err.response?.data?.message || err.message));
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">KYC Verification</h3>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Verification Progress</h4>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${currentProgress.color}`}
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
              className="max-w-full h-auto rounded-lg border border-gray-200"
            />
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        <form onSubmit={handleKycSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Document (PDF, PNG, JPG)</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setKycData({ ...kycData, document: e.target.files?.[0] || null })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={kycStatus === 'in review' || kycStatus === 'approved' || isSubmitting}
            />
          </div>
          
          <button
            type="submit"
            disabled={kycStatus === 'in review' || kycStatus === 'approved' || isSubmitting}
            className={`w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 ${
              kycStatus === 'in review' || kycStatus === 'approved' || isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
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
              <strong>Requirements:</strong> Upload a government-issued ID (passport, driver's license, or national ID). 
              Ensure the document is clear and valid.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYC;