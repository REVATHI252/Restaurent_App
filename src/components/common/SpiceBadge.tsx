import React from 'react';
import { Flame } from 'lucide-react';

export function SpiceBadge({ level }: { level: 'Mild' | 'Medium' | 'Spicy' | 'Extra Spicy' }) {
  const getFlameCount = () => {
    switch (level) {
      case 'Mild':
        return 1;
      case 'Medium':
        return 2;
      case 'Spicy':
        return 3;
      case 'Extra Spicy':
        return 4;
      default:
        return 2;
    }
  };

  const count = getFlameCount();

  return (
    <div
      className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-paradise-maroon-50 border border-paradise-maroon-200 text-xs font-medium text-paradise-maroon-800"
      title={`Spice Level: ${level}`}
    >
      <div className="flex items-center text-amber-600">
        {Array.from({ length: count }).map((_, i) => (
          <Flame key={i} className="w-3 h-3 fill-amber-500 text-amber-600 -mr-0.5" />
        ))}
      </div>
      <span className="text-[11px] font-semibold text-paradise-maroon-900 ml-1">{level}</span>
    </div>
  );
}

export default SpiceBadge;
