import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingObject({ position, color, speed = 1, size = 1 }: { position: [number, number, number], color: string, speed?: number, size?: number }) {
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.4}
          radius={size}
          transparent
          opacity={0.4}
        />
      </Sphere>
    </Float>
  );
}

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-white dark:bg-neutral-950 transition-colors duration-500">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleField count={1500} />
        
        {/* Floating "Atoms" or scientific shapes */}
        <FloatingObject position={[-3, 2, -2]} color="#0891b2" speed={1.5} size={0.6} />
        <FloatingObject position={[3, -2, -1]} color="#0ea5e9" speed={1.2} size={0.8} />
        <FloatingObject position={[2, 3, -3]} color="#22d3ee" speed={2} size={0.4} />
        <FloatingObject position={[-4, -3, -4]} color="#06b6d4" speed={0.8} size={1.2} />
        
        {/* Subtle background glow */}
        <mesh position={[0, 0, -10]}>
          <planeGeometry args={[50, 50]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.1} />
        </mesh>
      </Canvas>
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_70%,rgba(255,255,255,0.2)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,transparent_70%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

export default Background3D;
