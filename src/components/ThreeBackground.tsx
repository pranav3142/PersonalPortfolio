import { Canvas, useFrame } from '@react-three/fiber';
import { useFBX, Environment, Stars } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function Mountain() {
  const fbx = useFBX('/models/snowy-mountain.fbx');
  const meshRef = useRef<THREE.Group>(null);

  // Clone the scene to avoid issues if used multiple times (though here it's once)
  const scene = fbx.clone();

  // Ensure textures are rendered correctly
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      // Apply a snowy material since textures are missing
      mesh.material = new THREE.MeshStandardMaterial({
        color: '#f0f0f0', // White/Snow color
        roughness: 0.7,
        metalness: 0.1,
        flatShading: true, // Low-poly look
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });

  useFrame(() => {
    if (meshRef.current) {
      // Rotate based on scroll position with initial offset
      const scrollY = window.scrollY;
      // Start at 90 degrees (Math.PI / 2) and rotate
      meshRef.current.rotation.y = Math.PI / 2 + scrollY * 0.001;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={0.0035} // Reduced scale further
      position={[0, -1, 0]}
      rotation={[0.1, 0, 0]}
    />
  );
}

function LoadingFallback() {
  return null;
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <Suspense fallback={<LoadingFallback />}>
          <Mountain />
          <Environment preset="sunset" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
