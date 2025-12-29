import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

interface FloatingMiniAvatarProps {
  isActive: boolean;
  onClick: () => void;
}

const MiniAvatarBody = ({ isActive }: { isActive: boolean }) => {
  const bodyRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const [isWaving, setIsWaving] = useState(true);
  
  useEffect(() => {
    // Wave on mount for 3 seconds
    const timer = setTimeout(() => setIsWaving(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (bodyRef.current) {
      // Gentle bobbing
      bodyRef.current.position.y = Math.sin(time * 2) * 0.05;
      bodyRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
    
    // Waving animation
    if (rightArmRef.current) {
      if (isWaving) {
        rightArmRef.current.rotation.z = Math.sin(time * 8) * 0.4 - 0.8;
      } else {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          0.3,
          0.1
        );
      }
    }
    
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 1.5) * 0.1 - 0.3;
    }
  });

  const bodyColor = isActive ? '#22c55e' : '#00f5ff';

  return (
    <group ref={bodyRef} scale={0.8}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Head */}
        <Sphere args={[0.3, 32, 32]}>
          <MeshDistortMaterial
            color={bodyColor}
            metalness={0.8}
            roughness={0.2}
            distort={0.1}
            speed={2}
            emissive={bodyColor}
            emissiveIntensity={0.3}
          />
        </Sphere>
        
        {/* Eyes */}
        <mesh position={[-0.1, 0.08, 0.25]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.1, 0.08, 0.25]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.1, 0.08, 0.28]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0.1, 0.08, 0.28]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        
        {/* Smile */}
        <mesh position={[0, -0.05, 0.28]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        
        {/* Arms */}
        <mesh ref={leftArmRef} position={[-0.35, -0.1, 0]}>
          <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh ref={rightArmRef} position={[0.35, -0.1, 0]}>
          <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Antenna */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

export const FloatingMiniAvatar = ({ isActive, onClick }: FloatingMiniAvatarProps) => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed right-6 z-50 w-20 h-20 cursor-pointer transition-all duration-300 hover:scale-110"
      style={{ 
        bottom: `${Math.min(140 + scrollY * 0.05, 200)}px`,
        transform: `translateY(${Math.sin(scrollY * 0.01) * 5}px)`
      }}
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} intensity={1} />
        <MiniAvatarBody isActive={isActive} />
      </Canvas>
    </div>
  );
};
