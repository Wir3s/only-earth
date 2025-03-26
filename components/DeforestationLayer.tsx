// components/DeforestationLayer.tsx
'use client';

interface DataPoint {
  lat: number;
  lon: number;
  category: string;
  rate: number;
}

const sampleData: DataPoint[] = [
  { lat: -3.4653, lon: -62.2159, category: 'Intensifying', rate: 5 },
  { lat: -10.0, lon: 120.0, category: 'Sporadic', rate: 3 },
  { lat: 5.0, lon: 30.0, category: 'New', rate: 2 },
];

function latLongToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

const categoryColors: { [key: string]: string } = {
  New: '#FF4500',         // Bright OrangeRed
  Sporadic: '#FF8C00',    // DarkOrange remains
  Intensifying: '#B22222', // FireBrick, a deep red
  Persistent: '#A0522D',   // Sienna, a brownish tone
  Diminishing: '#A9A9A9',  // Dim Gray
};


export default function DeforestationLayer({
  globeRadius = 2,
  activeCategories,
}: {
  globeRadius?: number;
  activeCategories: string[];
}) {
  return (
    <>
      {sampleData.map((point, index) => {
        if (!activeCategories.includes(point.category)) return null;
        const [x, y, z] = latLongToVector3(point.lat, point.lon, globeRadius);
        const scale = 0.05 * point.rate;
        return (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[scale, 8, 8]} />
            <meshStandardMaterial color={categoryColors[point.category]} />
          </mesh>
        );
      })}
    </>
  );
}

