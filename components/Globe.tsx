// components/Globe.tsx
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import DeforestationLayer from './DeforestationLayer';

interface GlobeSceneProps {
  activeCategories: string[];
}

function Globe() {
  const texture = useLoader(THREE.TextureLoader, '/worldtopobathydec24.png');
  return (
    <Sphere args={[2, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
}

export default function GlobeScene({ activeCategories }: GlobeSceneProps) {
  return (
    <Canvas className="h-full">
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      
      <Globe />
      <DeforestationLayer globeRadius={2} activeCategories={activeCategories} />
      
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}

