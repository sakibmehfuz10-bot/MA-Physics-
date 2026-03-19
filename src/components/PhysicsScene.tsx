import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export const AtomComponent = ({ scale = 1.5 }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      coreRef.current.position.y = Math.sin(t) * 0.1;
    }
    
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.8;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.6;
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.7;
  });

  return (
    <group scale={scale}>
      {/* Core */}
      <Sphere ref={coreRef} args={[0.4, 32, 32]}>
        <MeshDistortMaterial
          color="#06b6d4"
          speed={2}
          distort={0.3}
          radius={1}
        />
      </Sphere>

      {/* Electron Rings */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
        </mesh>
        <Sphere args={[0.08, 16, 16]} position={[1.2, 0, 0]}>
          <meshBasicMaterial color="#06b6d4" />
        </Sphere>
      </group>

      <group ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#0891b2" transparent opacity={0.3} />
        </mesh>
        <Sphere args={[0.08, 16, 16]} position={[0, 1.5, 0]}>
          <meshBasicMaterial color="#0891b2" />
        </Sphere>
      </group>

      <group ref={ring3Ref} rotation={[0, -Math.PI / 4, Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[1.8, 0.02, 16, 100]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
        </mesh>
        <Sphere args={[0.08, 16, 16]} position={[0, 0, 1.8]}>
          <meshBasicMaterial color="#22d3ee" />
        </Sphere>
      </group>
    </group>
  );
};

const Particles = ({ count = 50 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06b6d4"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

export const SmallPhysicsScene = () => {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <AtomComponent scale={1} />
        </Float>
      </Canvas>
    </div>
  );
};

export const PhysicsScene = () => {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <AtomComponent />
        </Float>
        
        <Particles />
      </Canvas>
    </div>
  );
};
