// components/Globe.tsx
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  // Load a texture (ensure you have an appropriate image in your public folder, e.g., /earth-texture.jpg)
  const texture = useLoader(THREE.TextureLoader, '/worldtopobathydec24.png');
  
  return (
    <Sphere args={[2, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
}

export default function GlobeScene() {
  return (
    <Canvas>
      {/* Basic lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      {/* Your interactive globe */}
      <Globe />
      
      {/* Enable user interactions like rotate and zoom */}
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}
