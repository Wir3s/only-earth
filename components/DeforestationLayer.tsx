// components/DeforestationLayer.tsx
'use client';
import { useEffect, useState, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Html, Sphere } from '@react-three/drei'; // Add this import
import { fetchDeforestationData } from '../lib/gfwApi';
import { createHotspotTexture } from '../lib/geoJsonToTexture';
import * as THREE from 'three';
import categoryColors from '../lib/categoryColors';

export default function DeforestationLayer({
  globeRadius = 2,
  activeCategories,
}: {
  globeRadius?: number;
  activeCategories: string[];
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hotspotTexture, setHotspotTexture] = useState<THREE.Texture | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { camera } = useThree();
  
// Calculate current view bounds based on camera position
const viewBounds = useMemo(() => {
  // Cast camera to PerspectiveCamera to access fov and aspect
  const perspCamera = camera as THREE.PerspectiveCamera;
  
  const distance = camera.position.length();
  const fov = perspCamera.fov * (Math.PI / 180);
  const visibleHeight = 2 * Math.tan(fov / 2) * distance;
  const visibleWidth = visibleHeight * perspCamera.aspect;
  
  // Convert to lat/lon bounds (simplified)
  const bounds = [-visibleWidth/2, -visibleHeight/2, visibleWidth/2, visibleHeight/2];
  return bounds;
}, [camera.position, camera]);
  
  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      setIsLoading(true);
      setErrorMessage(null);
      
      try {
        const data = await fetchDeforestationData(viewBounds);
        
        if (!isMounted) return;
        
        // Filter data by active categories if needed
        const filteredData = {
          ...data,
          features: data.features.filter((feature: any) => {
            // Get the category from attributes
            const pattern = feature.attributes?.PATTERN || '';
            // Normalize it by removing " Hot Spot" if present
            const normalized = pattern.replace(" Hot Spot", "");
            return activeCategories.includes(normalized);
          })
        };
        
        const isMobile = window.innerWidth < 640;
        const texture = createHotspotTexture(
          filteredData,
          4096, 
          2048,
          categoryColors, // Pass your mapping here
          isMobile ? 0.9 : 0.6    // more opaque on mobile
        );
        
        setHotspotTexture(texture);
      } catch (error) {
        console.error("Error loading deforestation data:", error);
        if (isMounted) {
          setErrorMessage("Failed to load deforestation data");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    if (activeCategories.length > 0) {
      loadData();
    } else {
      setHotspotTexture(null);
      setIsLoading(false);
    }
    
    return () => {
      isMounted = false;
    };
  }, [viewBounds, activeCategories]);
  
  if (isLoading) {
    return (
      <Html center>
        <div className="text-white bg-black bg-opacity-50 p-2 rounded">
          Loading deforestation data...
        </div>
      </Html>
    );
  }
  
  if (errorMessage) {
    return (
      <Html center>
        <div className="text-white bg-black bg-opacity-50 p-2 rounded">
          Error: {errorMessage}
        </div>
      </Html>
    );
  }
  
  if (!hotspotTexture) return null;
  
  return (
    <Sphere args={[globeRadius + 0.01, 64, 64]}>
      <meshBasicMaterial
        map={hotspotTexture}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
      />
    </Sphere>
  );
}




