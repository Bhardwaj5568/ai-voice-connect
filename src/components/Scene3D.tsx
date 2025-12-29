import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

// Hook to track scroll progress
const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollProgress;
};

// Shared scroll state for Three.js components
let globalScrollProgress = 0;

const FloatingOrb = ({ 
  position, 
  color, 
  scale = 1, 
  speed = 1,
  scrollOffset = 0 
}: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number; 
  speed?: number;
  scrollOffset?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef(position);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scroll = globalScrollProgress;
      const time = state.clock.elapsedTime;
      
      // Scroll-based movement with parallax
      const scrollY = scroll * 15 * (1 + scrollOffset);
      const scrollX = Math.sin(scroll * Math.PI * 2 + scrollOffset) * 3;
      
      meshRef.current.position.x = initialPos.current[0] + scrollX;
      meshRef.current.position.y = initialPos.current[1] - scrollY;
      meshRef.current.position.z = initialPos.current[2] + scroll * 5;
      
      // Enhanced rotation based on scroll
      meshRef.current.rotation.x = time * 0.2 * speed + scroll * Math.PI;
      meshRef.current.rotation.y = time * 0.3 * speed + scroll * Math.PI * 0.5;
      
      // Scale pulse based on scroll
      const pulseScale = 1 + Math.sin(scroll * Math.PI * 4) * 0.1;
      meshRef.current.scale.setScalar(scale * pulseScale);
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 30;
      pos[i + 1] = (Math.random() - 0.5) * 30;
      pos[i + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const scroll = globalScrollProgress;
      const time = state.clock.elapsedTime;
      
      // Scroll-based rotation acceleration
      particlesRef.current.rotation.y = time * 0.02 + scroll * Math.PI * 2;
      particlesRef.current.rotation.x = time * 0.01 + scroll * Math.PI;
      
      // Move particles forward on scroll
      particlesRef.current.position.z = scroll * 10;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const GlowingRing = ({ radius, color, scrollMultiplier = 1 }: { radius: number; color: string; scrollMultiplier?: number }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      const scroll = globalScrollProgress;
      const time = state.clock.elapsedTime;
      
      // Dynamic tilt based on scroll
      ringRef.current.rotation.x = Math.PI * 0.5 + Math.sin(time * 0.5) * 0.1 + scroll * Math.PI * scrollMultiplier;
      ringRef.current.rotation.z = time * 0.2 + scroll * Math.PI * 2;
      
      // Scale expansion on scroll
      const scaleMultiplier = 1 + scroll * 0.5;
      ringRef.current.scale.setScalar(scaleMultiplier);
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
};

const AnimatedTorus = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef<[number, number, number]>([4, -2, -3]);
  
  useFrame((state) => {
    if (torusRef.current) {
      const scroll = globalScrollProgress;
      const time = state.clock.elapsedTime;
      
      // Orbit path based on scroll
      const orbitRadius = 5;
      const angle = scroll * Math.PI * 4 + time * 0.1;
      
      torusRef.current.position.x = Math.cos(angle) * orbitRadius;
      torusRef.current.position.y = Math.sin(angle) * 2 - scroll * 8;
      torusRef.current.position.z = Math.sin(angle * 0.5) * 3 - 3;
      
      // Enhanced rotation
      torusRef.current.rotation.x = time * 0.3 + scroll * Math.PI * 3;
      torusRef.current.rotation.y = time * 0.2 + scroll * Math.PI * 2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={torusRef} position={initialPos.current}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.9}
          roughness={0.1}
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// Spiral geometry that expands on scroll
const ScrollSpiral = () => {
  const spiralRef = useRef<THREE.Group>(null);
  
  const spiralPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 200; i++) {
      const t = i / 200;
      const angle = t * Math.PI * 8;
      const radius = 2 + t * 4;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * 15,
        Math.sin(angle) * radius
      ));
    }
    return points;
  }, []);

  useFrame(() => {
    if (spiralRef.current) {
      const scroll = globalScrollProgress;
      spiralRef.current.rotation.y = scroll * Math.PI * 4;
      spiralRef.current.position.y = -scroll * 20 + 10;
      spiralRef.current.scale.setScalar(0.5 + scroll * 0.5);
    }
  });

  return (
    <group ref={spiralRef}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={spiralPoints.length}
            array={new Float32Array(spiralPoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00f5ff" transparent opacity={0.3} />
      </line>
    </group>
  );
};

// Camera controller that responds to scroll
const ScrollCamera = () => {
  const { camera } = useThree();
  
  useFrame(() => {
    const scroll = globalScrollProgress;
    
    // Subtle camera movement based on scroll
    camera.position.y = -scroll * 2;
    camera.position.z = 10 + scroll * 3;
    camera.lookAt(0, -scroll * 5, 0);
  });
  
  return null;
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" angle={0.3} />
      
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      <FloatingOrb position={[-4, 2, -5]} color="#00f5ff" scale={1.5} speed={0.8} scrollOffset={0} />
      <FloatingOrb position={[5, -1, -8]} color="#8b5cf6" scale={2} speed={0.6} scrollOffset={0.3} />
      <FloatingOrb position={[-2, -3, -6]} color="#00f5ff" scale={1} speed={1.2} scrollOffset={0.6} />
      <FloatingOrb position={[3, 3, -10]} color="#f97316" scale={1.2} speed={0.5} scrollOffset={0.9} />
      
      <ParticleField />
      <ScrollSpiral />
      
      <GlowingRing radius={3} color="#00f5ff" scrollMultiplier={1} />
      <GlowingRing radius={4.5} color="#8b5cf6" scrollMultiplier={1.5} />
      
      <AnimatedTorus />
      <ScrollCamera />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

export const Scene3D = () => {
  const scrollProgress = useScrollProgress();
  
  // Update global scroll state for Three.js components
  useEffect(() => {
    globalScrollProgress = scrollProgress;
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
