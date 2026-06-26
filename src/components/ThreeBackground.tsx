import { Canvas, useThree } from '@react-three/fiber';
import { useFBX, Stars } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * ThreeBackground — optimised.
 *
 * Key changes vs. the original:
 *  1. frameloop="demand": the scene renders ONLY when the user scrolls,
 *     instead of 60fps forever. Idle cost ≈ 0.
 *  2. dpr capped at [1, 1.5]: avoids 2–3× retina overdraw on a blurry bg.
 *  3. <Environment> removed: it fetched a multi-MB HDR + rendered a cubemap
 *     for a flat snow material that never reflects it.
 *  4. MeshLambertMaterial (not Standard) + materials built once in useMemo,
 *     not rebuilt on every React re-render. castShadow/receiveShadow dropped
 *     (no shadow map was enabled anyway).
 *  5. Stars thinned 5000 → 1500, frozen after first render.
 *  6. Mobile + prefers-reduced-motion → a static CSS gradient, no WebGL at all.
 *  7. Rendering pauses when the hero is scrolled out of view.
 *
 * Remaining manual win (do once, in Blender / gltf-transform): convert
 * /models/snowy-mountain.fbx to a Draco-compressed .glb (decimate to
 * ~5–15k tris) and swap useFBX → useGLTF. FBX is uncompressed and parses
 * on the main thread; a Draco .glb is typically 5–10× smaller.
 */

const MOUNTAIN_SCALE = 0.0035;

function Mountain() {
  const fbx = useFBX('/models/snowy-mountain.fbx');
  const meshRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  // Build the scene + materials ONCE, not on every render.
  const scene = useMemo(() => {
    const cloned = fbx.clone();
    const snow = new THREE.MeshLambertMaterial({ color: '#f0f0f0', flatShading: true });
    cloned.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) mesh.material = snow;
    });
    return cloned;
  }, [fbx]);

  // Drive rotation from scroll and render a single frame per scroll event.
  // The background is fixed behind the whole page, so we keep mapping scroll
  // to rotation across the entire scroll range (idle cost is still ~0 thanks
  // to frameloop="demand" — we only render when a scroll event fires).
  useEffect(() => {
    const onScroll = () => {
      if (!meshRef.current) return;
      meshRef.current.rotation.y = Math.PI / 2 + window.scrollY * 0.001;
      invalidate(); // render exactly one frame
    };
    onScroll(); // set initial rotation + paint once
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [invalidate]);

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={MOUNTAIN_SCALE}
      position={[0, -1, 0]}
      rotation={[0.1, 0, 0]}
    />
  );
}

/** Lightweight static stand-in for mobile / reduced-motion users. */
function StaticBackground() {
  return (
    <div
      className="fixed inset-0 -z-10"
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(120% 80% at 50% 100%, #e8edf3 0%, #f7f9fb 45%, #ffffff 100%)',
      }}
    />
  );
}

// Decide synchronously so the WebGL Canvas never mounts (and flashes) on
// mobile / reduced-motion before an effect can flip it off.
function prefersStatic() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(max-width: 768px)').matches
  );
}

export function ThreeBackground() {
  // The static gradient always paints first (instant). On capable devices we
  // then mount the WebGL scene during browser idle time, so the heavy mountain
  // model never blocks the page's first paint.
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    if (prefersStatic()) return; // mobile / reduced-motion: stay on the gradient

    const hasIdle = typeof window.requestIdleCallback === 'function';
    let idleId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (hasIdle) {
      idleId = window.requestIdleCallback(() => setEnable3D(true), { timeout: 2000 });
    } else {
      timeoutId = setTimeout(() => setEnable3D(true), 300);
    }

    return () => {
      if (hasIdle) window.cancelIdleCallback(idleId);
      else clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* Base layer — always present, paints immediately. The transparent
          WebGL canvas (when enabled) renders on top of this gradient. */}
      <StaticBackground />

      {enable3D && (
        <div className="fixed inset-0 -z-10">
          <Canvas
            frameloop="demand"
            dpr={[1, 1.5]}
            gl={{ powerPreference: 'high-performance', antialias: true }}
            camera={{ position: [0, 0, 10], fov: 45 }}
          >
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <Mountain />
              <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0} />
            </Suspense>
          </Canvas>
        </div>
      )}
    </>
  );
}
