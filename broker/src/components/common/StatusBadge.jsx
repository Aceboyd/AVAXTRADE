import React from 'react';
import { Clock, CheckCircle, X } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: 'text-yellow-700 bg-yellow-100', icon: Clock, text: 'Pending' },
    completed: { color: 'text-green-700 bg-green-100', icon: CheckCircle, text: 'Completed' },
    confirmed: { color: 'text-green-700 bg-green-100', icon: CheckCircle, text: 'Completed' }, // ← mapped here
    failed: { color: 'text-red-700 bg-red-100', icon: X, text: 'Failed' },
    approved: { color: 'text-green-700 bg-green-100', icon: CheckCircle, text: 'Approved' },
    rejected: { color: 'text-red-700 bg-red-100', icon: X, text: 'Rejected' },
    'in review': { color: 'text-blue-700 bg-blue-100', icon: Clock, text: 'In Review' }
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <IconComponent className="w-3 h-3 mr-1" />
      {config.text}
    </span>
  );
};

export default StatusBadge;
