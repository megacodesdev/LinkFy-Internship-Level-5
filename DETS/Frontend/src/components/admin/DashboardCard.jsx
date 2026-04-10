// src/components/admin/DashboardCard.jsx
import React from 'react';
import { Plus } from 'lucide-react';

const DashboardCard = ({ title, count, color = 'indigo', content, showAddButton = false }) => {
  const getColorClass = () => {
    const colorMap = {
      'indigo': 'bg-indigo-600',
      'yellow': 'bg-yellow-500',
      'green': 'bg-green-500',
      'red': 'bg-red-500',
      'purple': 'bg-purple-500',
      'blue': 'bg-blue-500'
    };
    
    return colorMap[color] || colorMap.indigo;
  };
  
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className={`w-2 h-2 rounded-full ${getColorClass()} mr-2`}></div>
        <span className="font-medium">{title}</span>
        {count !== undefined && (
          <span className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
        {showAddButton && (
          <button className="ml-auto text-gray-400 p-1 rounded-full hover:bg-gray-100">
            <Plus size={16} />
          </button>
        )}
      </div>
      <div className={`h-1 ${getColorClass()} mb-4 rounded`}></div>
      
      <div>
        {content}
      </div>
    </div>
  );
};

export default DashboardCard;