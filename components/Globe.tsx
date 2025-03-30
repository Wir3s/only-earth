// components/Globe.tsx
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import DeforestationLayer from './DeforestationLayer';
import { testGfwApiConnection } from '../lib/gfwApi';

interface GlobeSceneProps {
  activeCategories: string[];
}

// API connection status component
function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<{
    loading: boolean;
    success?: boolean;
    error?: string;
    featureCount?: number;
  }>({
    loading: true
  });

  useEffect(() => {
    async function checkApiConnection() {
      try {
        const result = await testGfwApiConnection();
        setApiStatus({
          loading: false,
          success: result.success,
          featureCount: result.featureCount,
          error: result.success ? undefined : result.error
        });
      } catch (error) {
        setApiStatus({
          loading: false,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    checkApiConnection();
  }, []);

  // Position this status indicator in the top-right corner of the canvas
  return (
    <Html position={[0, 2.5, 0]} center>
      <div className="text-xs bg-black bg-opacity-70 text-white p-2 rounded" style={{ width: '200px' }}>
        <h4 className="font-bold mb-1">GFW API Status:</h4>
        {apiStatus.loading ? (
          <p>Connecting to GFW API...</p>
        ) : apiStatus.success ? (
          <p className="text-green-400">
            ✓ Connected ({apiStatus.featureCount || 0} hotspots found)
          </p>
        ) : (
          <p className="text-red-400">
            ✗ Connection error: {apiStatus.error || 'Unknown'}
          </p>
        )}
      </div>
    </Html>
  );
}

function GlobeContent({ texture, activeCategories }: { texture: THREE.Texture, activeCategories: string[] }) {
  return (
    <>
      <ambientLight intensity={2.0} />
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>
      
      {/* Only render deforestation layer if we have active categories */}
      {activeCategories.length > 0 && (
        <DeforestationLayer
          globeRadius={2.01}
          activeCategories={activeCategories}
        />
      )}
      
      {/* Add API status indicator */}
      <ApiStatus />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />
    </>
  );
}

export default function GlobeScene({ activeCategories }: GlobeSceneProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={<FallbackLoader />}>
          <GlobeContentWrapper activeCategories={activeCategories} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function GlobeContentWrapper({ activeCategories }: { activeCategories: string[] }) {
  const texture = useLoader(THREE.TextureLoader, '/worldtopobathydec24.png');
  return <GlobeContent texture={texture} activeCategories={activeCategories} />;
}

function FallbackLoader() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial color="gray" />
      <Html center>
        <div className="text-white">Loading Globe...</div>
      </Html>
    </mesh>
  );
}


