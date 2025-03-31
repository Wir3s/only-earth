'use client';

import { useState } from 'react';

export default function DeforestationUI({
  activeCategories,
  toggleCategory,
  categoryColors,
}: {
  activeCategories: string[];
  toggleCategory: (category: string) => void;
  categoryColors: { [key: string]: string };
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        left: 20,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '10px',
        borderRadius: '8px',
        zIndex: 10,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '1rem',
        color: '#fff',
      }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          background: 'rgba(255,255,255,0.1)', // slight white background
          border: '1px solid rgba(255,255,255,0.5)',
          borderRadius: '4px',
          color: '#fff',
          cursor: 'pointer',
          marginBottom: '8px',
          padding: '4px 8px'
        }}
      >
        {isCollapsed ? 'Show Legend' : 'Hide Legend'}
      </button>
      {!isCollapsed && (
        <>
          <strong style={{ fontSize: '1.2rem', display: 'block', marginBottom: '8px' }}>
            Filter Hotspots:
          </strong>
          {Object.keys(categoryColors).map((category) => (
            <div key={category} style={{ marginTop: '4px' }}>
              <input
                type="checkbox"
                id={category}
                checked={activeCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              <label htmlFor={category} style={{ color: categoryColors[category], marginLeft: '4px' }}>
                {category}
              </label>
            </div>
          ))}
        </>
      )}
    </div>
  );
}


