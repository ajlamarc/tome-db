import { Charge } from '@urbit/api';
import React, { useState } from 'react';

function normalizeUrbitColor(color: string): string {
  if (color.startsWith('#')) {
    return color;
  }
  return `#${color.slice(2).replace('.', '').toUpperCase()}`;
}

export const AppTile = ({ image, color }: Charge) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="relative flex-none w-12 h-12 mr-3 overflow-hidden bg-gray-200 rounded-lg"
      style={{ backgroundColor: normalizeUrbitColor(color) }}
    >
      {image && !imageError && (
        <img
          className="absolute top-0 left-0 object-cover w-full h-full"
          src={image}
          alt=""
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};
