import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

export type AvatarEmotion = 'happy' | 'thinking' | 'confused' | 'excited' | 'neutral';
export type AvatarState = 'idle' | 'listening' | 'speaking' | 'processing';

interface AvatarProps {
  state: AvatarState;
  emotion?: AvatarEmotion;
  isGreeting?: boolean;
}

// Animated eyes that follow and express emotions
const Eyes = ({ state, emotion }: { state: string; emotion: AvatarEmotion }) => {
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftPupilRef = useRef<THREE.Mesh>(null);
  const rightPupilRef = useRef<THREE.Mesh>(null);
  const leftBrowRef = useRef<THREE.Mesh>(null);
  const rightBrowRef = useRef<THREE.Mesh>(null);
  
  useFrame((frameState) => {
    const time = frameState.clock.elapsedTime;
    
    // Blinking animation
    const blinkCycle = Math.sin(time * 0.5) > 0.95;
    const eyeScaleY = blinkCycle ? 0.1 : 1;
    
    // Emotion-based eye expressions
    let targetEyeScaleY = eyeScaleY;
    let browRotation = 0;
    
    switch (emotion) {
      case 'happy':
        targetEyeScaleY = blinkCycle ? 0.1 : 0.7; // Squinting happy eyes
        browRotation = -0.2;
        break;
      case 'thinking':
        targetEyeScaleY = blinkCycle ? 0.1 : 1;
        browRotation = 0.3; // Raised eyebrow
        break;
      case 'confused':
        browRotation = 0.4;
        break;
      case 'excited':
        targetEyeScaleY = blinkCycle ? 0.1 : 1.2; // Wide eyes
        break;
    }
    
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, targetEyeScaleY, 0.3);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, targetEyeScaleY, 0.3);
    }
    
    // Eyebrow animation
    if (leftBrowRef.current && rightBrowRef.current) {
      leftBrowRef.current.rotation.z = THREE.MathUtils.lerp(leftBrowRef.current.rotation.z, browRotation, 0.1);
      rightBrowRef.current.rotation.z = THREE.MathUtils.lerp(rightBrowRef.current.rotation.z, -browRotation, 0.1);
      
      // Confused: asymmetric brows
      if (emotion === 'confused') {
        leftBrowRef.current.rotation.z = THREE.MathUtils.lerp(leftBrowRef.current.rotation.z, 0.4, 0.1);
        rightBrowRef.current.rotation.z = THREE.MathUtils.lerp(rightBrowRef.current.rotation.z, -0.1, 0.1);
      }
    }
    
    // Pupil movement - more active when thinking
    if (leftPupilRef.current && rightPupilRef.current) {
      const lookSpeed = emotion === 'thinking' ? 2 : 0.8;
      const lookRange = emotion === 'thinking' ? 0.05 : 0.03;
      const lookX = Math.sin(time * lookSpeed) * lookRange;
      const lookY = Math.cos(time * lookSpeed * 0.75) * (lookRange * 0.6);
      
      leftPupilRef.current.position.x = -0.15 + lookX;
      leftPupilRef.current.position.y = 0.1 + lookY;
      rightPupilRef.current.position.x = 0.15 + lookX;
      rightPupilRef.current.position.y = 0.1 + lookY;
    }
  });

  const eyeColor = state === 'listening' ? '#ef4444' : state === 'speaking' ? '#22c55e' : '#00f5ff';

  return (
    <group position={[0, 0.15, 0.35]}>
      {/* Eyebrows */}
      <mesh ref={leftBrowRef} position={[-0.15, 0.22, 0.02]}>
        <boxGeometry args={[0.1, 0.02, 0.02]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh ref={rightBrowRef} position={[0.15, 0.22, 0.02]}>
        <boxGeometry args={[0.1, 0.02, 0.02]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
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

// Animated mouth that responds to speaking and emotions
const Mouth = ({ state, emotion }: { state: string; emotion: AvatarEmotion }) => {
  const mouthRef = useRef<THREE.Mesh>(null);
  const smileRef = useRef<THREE.Mesh>(null);
  
  useFrame((frameState) => {
    const time = frameState.clock.elapsedTime;
    
    if (mouthRef.current) {
      if (state === 'speaking') {
        // Animate mouth opening/closing when speaking
        const mouthOpen = Math.abs(Math.sin(time * 15)) * 0.06 + 0.02;
        mouthRef.current.scale.y = mouthOpen * 10;
        mouthRef.current.visible = true;
      } else {
        mouthRef.current.visible = false;
      }
    }
    
    if (smileRef.current) {
      smileRef.current.visible = state !== 'speaking';
      
      // Emotion-based mouth shape
      let smileScale = 1;
      switch (emotion) {
        case 'happy':
        case 'excited':
          smileScale = 1.3;
          break;
        case 'confused':
          smileScale = 0.5;
          smileRef.current.rotation.x = Math.PI; // Frown
          break;
        case 'thinking':
          smileScale = 0.7;
          break;
        default:
          smileRef.current.rotation.x = 0;
      }
      smileRef.current.scale.setScalar(THREE.MathUtils.lerp(smileRef.current.scale.x, smileScale, 0.1));
    }
  });

  return (
    <group position={[0, -0.1, 0.38]}>
      {/* Speaking mouth */}
      <mesh ref={mouthRef}>
        <boxGeometry args={[0.15, 0.02, 0.02]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Smile/expression mouth */}
      <mesh ref={smileRef} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </group>
  );
};

// Arms with gesture animations
const Arms = ({ state, isGreeting }: { state: string; isGreeting: boolean }) => {
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const [wavePhase, setWavePhase] = useState(0);
  
  useEffect(() => {
    if (isGreeting) {
      setWavePhase(0);
    }
  }, [isGreeting]);
  
  useFrame((frameState) => {
    const time = frameState.clock.elapsedTime;
    
    if (rightArmRef.current) {
      if (isGreeting) {
        // Waving gesture
        rightArmRef.current.rotation.z = Math.sin(time * 10) * 0.5 - 1.2;
        rightArmRef.current.position.y = 0.05;
      } else if (state === 'speaking') {
        // Gesturing while speaking
        rightArmRef.current.rotation.z = Math.sin(time * 3) * 0.3 + 0.4;
        rightArmRef.current.position.y = Math.sin(time * 2) * 0.05;
      } else {
        // Idle position
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.3, 0.05);
        rightArmRef.current.position.y = THREE.MathUtils.lerp(rightArmRef.current.position.y, 0, 0.05);
      }
    }
    
    if (leftArmRef.current) {
      if (state === 'listening') {
        // Attentive gesture
        leftArmRef.current.rotation.z = Math.sin(time * 1.5) * 0.1 - 0.5;
      } else if (state === 'processing') {
        // Thinking pose
        leftArmRef.current.rotation.z = -0.8;
        leftArmRef.current.position.y = 0.15;
      } else {
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.3, 0.05);
        leftArmRef.current.position.y = THREE.MathUtils.lerp(leftArmRef.current.position.y, 0, 0.05);
      }
    }
  });

  return (
    <>
      {/* Left arm */}
      <group ref={leftArmRef} position={[-0.5, -0.1, 0]}>
        <mesh>
          <capsuleGeometry args={[0.05, 0.2, 4, 8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#00f5ff" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Right arm */}
      <group ref={rightArmRef} position={[0.5, -0.1, 0]}>
        <mesh>
          <capsuleGeometry args={[0.05, 0.2, 4, 8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#00f5ff" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </>
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

// Main avatar body
const AvatarBody = ({ state, emotion, isGreeting }: AvatarProps) => {
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
      
      // Rotation based on state
      if (state === 'processing') {
        bodyRef.current.rotation.y = time * 0.5;
      } else {
        bodyRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      }
    }
    
    if (headRef.current) {
      // Head nodding when greeting or listening
      if (isGreeting) {
        headRef.current.rotation.x = Math.sin(time * 4) * 0.15;
      } else if (state === 'listening') {
        headRef.current.rotation.x = Math.sin(time * 2) * 0.05;
      } else {
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, 0.05);
      }
      
      // Head tilt based on emotion
      if (emotion === 'confused') {
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, 0.2, 0.05);
      } else if (emotion === 'thinking') {
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, -0.1, 0.05);
      } else {
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, Math.sin(time * 0.8) * 0.05, 0.05);
      }
    }
    
    if (antennaRef.current) {
      // Antenna wobble - more active when excited
      const wobbleIntensity = emotion === 'excited' ? 0.4 : 0.2;
      antennaRef.current.rotation.z = Math.sin(time * 4) * wobbleIntensity;
    }
  });

  const bodyColor = state === 'speaking' ? '#22c55e' : state === 'listening' ? '#ef4444' : state === 'processing' ? '#f97316' : '#00f5ff';
  const glowIntensity = state === 'idle' ? 0.2 : 0.5;

  return (
    <group ref={bodyRef}>
      {/* Arms */}
      <Arms state={state} isGreeting={isGreeting || false} />
      
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
          <Eyes state={state} emotion={emotion || 'neutral'} />
          <Mouth state={state} emotion={emotion || 'neutral'} />
          
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

const AvatarScene = ({ state, emotion, isGreeting }: AvatarProps) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={1} color="#ffffff" />
      <pointLight position={[-2, -2, 2]} intensity={0.5} color="#8b5cf6" />
      
      <AvatarBody state={state} emotion={emotion} isGreeting={isGreeting} />
      <SoundWaves state={state} />
      <FloatingParticles state={state} />
    </>
  );
};

export const AIAvatar3D = ({ state, emotion = 'neutral', isGreeting = false }: AvatarProps) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <AvatarScene state={state} emotion={emotion} isGreeting={isGreeting} />
      </Canvas>
    </div>
  );
};
