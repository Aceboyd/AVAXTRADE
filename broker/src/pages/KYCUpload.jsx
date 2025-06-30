import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, AlertCircle, ChevronLeft } from 'lucide-react';

const KYCUpload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (file) {
      // Simulate file upload
      console.log('Uploading file:', file.name);
      // In a real app, you'd send the file to a server here
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upload ID Card</h3>
            <Link
              to="/dashboard"
              className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Dashboard
            </Link>
          </div>

          <div className="space-y-6">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
            >
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                {file ? file.name : 'Drag and drop your ID card here, or click to select'}
              </p>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="id-upload"
              />
              <label
                htmlFor="id-upload"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer text-sm"
              >
                Select File
              </label>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <strong>Requirements:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Upload a clear image or PDF of your government-issued ID</li>
                    <li>• Ensure all details are visible and not obscured</li>
                    <li>• Supported formats: JPG, PNG, PDF</li>
                    <li>• Maximum file size: 5MB</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleSubmit}
                disabled={!file}
                className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-colors ${
                  file
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit ID
              </button>
              <Link
                to="/dashboard"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCUpload;