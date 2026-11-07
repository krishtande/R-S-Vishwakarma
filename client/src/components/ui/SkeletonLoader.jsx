import React from 'react';

const SkeletonLoader = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="h-12 bg-gray-100 rounded-t-lg mb-2"></div>
      
      {/* Rows Skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 p-4 border-b border-gray-50">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div 
              key={colIndex} 
              className={`h-4 bg-gray-200 rounded ${colIndex === 0 ? 'w-1/4' : colIndex === columns - 1 ? 'w-1/12 ml-auto' : 'w-1/5'}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
