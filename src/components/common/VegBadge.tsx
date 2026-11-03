import React from 'react';

export function VegBadge({ isVeg, size = 'md' }: { isVeg: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5 border-[1.5px] p-[1.5px]',
    md: 'w-4 h-4 border-2 p-0.5',
    lg: 'w-5 h-5 border-2 p-1',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-sm transition-transform ${sizeClasses[size]} ${
        isVeg ? 'border-emerald-600 bg-white' : 'border-rose-700 bg-white'
      }`}
      title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
    >
      <div
        className={`rounded-full ${dotSizes[size]} ${
          isVeg ? 'bg-emerald-600' : 'bg-rose-700'
        }`}
      />
    </div>
  );
}

export default VegBadge;
