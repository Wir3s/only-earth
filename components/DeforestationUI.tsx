'use client';

export default function DeforestationUI({
  activeCategories,
  toggleCategory,
  categoryColors,
}: {
  activeCategories: string[];
  toggleCategory: (category: string) => void;
  categoryColors: { [key: string]: string };
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        left: 20,
        background: 'rgba(0, 0, 0, 0.8)',  // Dark, semi-transparent background
        padding: '10px',
        borderRadius: '8px',
        zIndex: 10,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '1rem',
        color: '#fff', // White text for legibility
      }}
    >
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
    </div>
  );
}


