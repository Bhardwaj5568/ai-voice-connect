import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface AvatarProps {
  state: 'idle' | 'listening' | 'speaking' | 'processing';
}

// Animated eyes that follow and blink
const Eyes = ({ state }: { state: string }) => {
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftPupilRef = useRef<THREE.Mesh>(null);
  const rightPupilRef = useRef<THREE.Mesh>(null);
  
  useFrame((frameState) => {
    const time = frameState.clock.elapsedTime;
    
    // Blinking animation
    const blinkCycle = Math.sin(time * 0.5) > 0.95;
    const eyeScaleY = blinkCycle ? 0.1 : 1;
    
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, eyeScaleY, 0.3);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, eyeScaleY, 0.3);
    }
    
    // Pupil movement
    if (leftPupilRef.current && rightPupilRef.current) {
      const lookX = Math.sin(time * 0.8) * 0.03;
      const lookY = Math.cos(time * 0.6) * 0.02;
      
      leftPupilRef.current.position.x = -0.15 + lookX;
      leftPupilRef.current.position.y = 0.1 + lookY;
      rightPupilRef.current.position.x = 0.15 + lookX;
      rightPupilRef.current.position.y = 0.1 + lookY;
    }
  });

  const eyeColor = state === 'listening' ? '#ef4444' : state === 'speaking' ? '#22c55e' : '#00f5ff';

  return (
    <group position={[0, 0.15, 0.35]}>
      {/* Left eye */}
      <mesh ref={leftEyeRef} position={[-0.15, 0.1, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh ref={leftPupilRef} position={[-0.15, 0.1, 0.05]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={0.5} />
      </mesh>
      
      {/* Right eye */}
      <mesh ref={rightEyeRef} position={[0.15, 0.1, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh ref={rightPupilRef} position={[0.15, 0.1, 0.05]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Animated mouth that responds to speaking
const Mouth = ({ state }: { state: string }) => {
  const mouthRef = useRef<THREE.Mesh>(null);
  
  useFrame((frameState) => {
    if (!mouthRef.current) return;
    const time = frameState.clock.elapsedTime;
    
    if (state === 'speaking') {
      // Animate mouth opening/closing when speaking
      const mouthOpen = Math.abs(Math.sin(time * 15)) * 0.06 + 0.02;
      mouthRef.current.scale.y = mouthOpen * 10;
    } else if (state === 'listening') {
      // Slight smile when listening
      mouthRef.current.scale.y = 0.3;
    } else {
      // Neutral/smile for idle
      mouthRef.current.scale.y = 0.2;
    }
  });

  return (
    <mesh ref={mouthRef} position={[0, -0.1, 0.38]}>
      <boxGeometry args={[0.15, 0.02, 0.02]} />
      <meshStandardMaterial color="#1a1a2e" />
    </mesh>
  );
};

// Sound wave rings for listening/speaking states
const SoundWaves = ({ state }: { state: string }) => {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((frameState) => {
    if (!ringsRef.current) return;
    const time = frameState.clock.elapsedTime;
    
    ringsRef.current.children.forEach((ring, i) => {
      if (state === 'speaking' || state === 'listening') {
        const scale = 1 + Math.sin(time * 3 + i * 0.5) * 0.2;
        const opacity = 0.6 - i * 0.15;
        ring.scale.setScalar(scale + i * 0.3);
        (ring as THREE.Mesh).material = new THREE.MeshBasicMaterial({
          color: state === 'speaking' ? '#22c55e' : '#ef4444',
          transparent: true,
          opacity: Math.max(0, opacity),
        });
      } else {
        ring.scale.setScalar(0);
      }
    });
  });

  return (
    <group ref={ringsRef} position={[0, 0, -0.2]}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.5 + i * 0.2, 0.52 + i * 0.2, 32]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
};

// Floating particles around the avatar
const FloatingParticles = ({ state }: { state: string }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 30;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = (i / particleCount) * Math.PI * 2;
      const radius = 0.8 + Math.random() * 0.3;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return pos;
  }, []);

  useFrame((frameState) => {
    if (!particlesRef.current) return;
    const time = frameState.clock.elapsedTime;
    
    particlesRef.current.rotation.y = time * 0.3;
    
    const speed = state === 'processing' ? 2 : state === 'speaking' ? 1 : 0.5;
    particlesRef.current.rotation.y = time * speed * 0.3;
  });

  const particleColor = state === 'processing' ? '#f97316' : state === 'speaking' ? '#22c55e' : state === 'listening' ? '#ef4444' : '#00f5ff';

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
        size={0.04}
        color={particleColor}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Main avatar body - a cute robot/orb character
const AvatarBody = ({ state }: { state: string }) => {
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Group>(null);
  
  useFrame((frameState) => {
    const time = frameState.clock.elapsedTime;
    
    if (bodyRef.current) {
      // Gentle bobbing motion
      const bobSpeed = state === 'speaking' ? 3 : state === 'listening' ? 2 : 1;
      const bobAmount = state === 'speaking' ? 0.08 : 0.04;
      bodyRef.current.position.y = Math.sin(time * bobSpeed) * bobAmount;
      
      // Slight rotation based on state
      if (state === 'processing') {
        bodyRef.current.rotation.y = time * 0.5;
      } else {
        bodyRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      }
    }
    
    if (headRef.current) {
      // Head tilt
      headRef.current.rotation.z = Math.sin(time * 0.8) * 0.05;
      headRef.current.rotation.x = Math.sin(time * 0.6) * 0.03;
    }
    
    if (antennaRef.current) {
      // Antenna wobble
      antennaRef.current.rotation.z = Math.sin(time * 4) * 0.2;
    }
  });

  const bodyColor = state === 'speaking' ? '#22c55e' : state === 'listening' ? '#ef4444' : state === 'processing' ? '#f97316' : '#00f5ff';
  const glowIntensity = state === 'idle' ? 0.2 : 0.5;

  return (
    <group ref={bodyRef}>
      {/* Head */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={headRef}>
          <Sphere args={[0.45, 32, 32]}>
            <MeshDistortMaterial
              color={bodyColor}
              metalness={0.8}
              roughness={0.2}
              distort={state === 'speaking' ? 0.2 : 0.1}
              speed={state === 'speaking' ? 4 : 2}
              emissive={bodyColor}
              emissiveIntensity={glowIntensity}
            />
          </Sphere>
          
          {/* Eyes and mouth */}
          <Eyes state={state} />
          <Mouth state={state} />
          
          {/* Antenna */}
          <group ref={antennaRef} position={[0, 0.45, 0]}>
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
              <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial 
                color={bodyColor} 
                emissive={bodyColor} 
                emissiveIntensity={state === 'idle' ? 0.3 : 0.8} 
              />
            </mesh>
          </group>
          
          {/* Ear pieces */}
          <mesh position={[-0.42, 0.1, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.42, 0.1, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </Float>
      
      {/* Glowing ring around head */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[0.55, 0.02, 16, 32]} />
        <meshBasicMaterial color={bodyColor} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const AvatarScene = ({ state }: AvatarProps) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={1} color="#ffffff" />
      <pointLight position={[-2, -2, 2]} intensity={0.5} color="#8b5cf6" />
      
      <AvatarBody state={state} />
      <SoundWaves state={state} />
      <FloatingParticles state={state} />
    </>
  );
};

export const AIAvatar3D = ({ state }: AvatarProps) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <AvatarScene state={state} />
      </Canvas>
    </div>
  );
};
