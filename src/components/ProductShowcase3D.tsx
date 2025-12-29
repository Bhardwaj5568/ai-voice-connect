import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, RoundedBox, Cylinder, Torus, MeshDistortMaterial, Environment, ContactShadows, Sparkles } from '@react-three/drei';
import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';

// Loading component for 3D canvas
const Loader3D = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Loading 3D Model...</p>
    </div>
  </div>
);

// Particle effects component
const ParticleAura = ({ color }: { color: string }) => {
  return (
    <>
      <Sparkles
        count={100}
        scale={4}
        size={2}
        speed={0.4}
        color={color}
        opacity={0.6}
      />
      <Sparkles
        count={50}
        scale={3}
        size={4}
        speed={0.2}
        color="#8b5cf6"
        opacity={0.4}
      />
    </>
  );
};

// Glowing aura effect
const GlowingAura = ({ color }: { color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1.8 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

interface ProductProps {
  isActive: boolean;
  color: string;
  position?: [number, number, number];
}

// AI Voice Assistant Product
const VoiceAssistantModel = ({ isActive, color }: ProductProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main orb */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            distort={0.3}
            speed={2}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Glowing rings */}
        <group ref={ringsRef}>
          <Torus args={[1.4, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </Torus>
          <Torus args={[1.6, 0.015, 16, 100]} rotation={[Math.PI / 2.5, 0.3, 0]}>
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
          </Torus>
        </group>
        
        {/* Sound wave indicators */}
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[0, 0.3 + i * 0.2, 1.2]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.3 + Math.random() * 0.3, 0.05]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Chatbot Product
const ChatbotModel = ({ isActive, color }: ProductProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Chat bubble body */}
        <RoundedBox args={[2, 1.5, 0.3]} radius={0.2} smoothness={4}>
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
        </RoundedBox>
        
        {/* Chat tail */}
        <mesh position={[-0.8, -0.9, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
        </mesh>
        
        {/* Typing dots */}
        {[-0.4, 0, 0.4].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.2]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff" 
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
        
        {/* AI brain icon */}
        <mesh position={[0, 0.9, 0]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Automation Workflow Product
const AutomationModel = ({ isActive, color }: ProductProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const gearsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (gearsRef.current) {
      gearsRef.current.children.forEach((child, i) => {
        child.rotation.z = state.clock.elapsedTime * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Central hub */}
        <Cylinder args={[0.5, 0.5, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Cylinder>
        
        {/* Gears */}
        <group ref={gearsRef}>
          <mesh position={[1, 0.5, 0]}>
            <torusGeometry args={[0.4, 0.08, 8, 8]} />
            <meshStandardMaterial color="#8b5cf6" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-1, -0.5, 0]}>
            <torusGeometry args={[0.35, 0.07, 8, 8]} />
            <meshStandardMaterial color="#f97316" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.5, -0.8, 0.3]}>
            <torusGeometry args={[0.3, 0.06, 8, 8]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
        
        {/* Connection lines */}
        {[
          { start: [0, 0, 0], end: [1, 0.5, 0] },
          { start: [0, 0, 0], end: [-1, -0.5, 0] },
          { start: [0, 0, 0], end: [0.5, -0.8, 0.3] },
        ].map((line, i) => (
          <mesh key={i} position={[
            (line.start[0] + line.end[0]) / 2,
            (line.start[1] + line.end[1]) / 2,
            (line.start[2] + line.end[2]) / 2
          ]}>
            <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Lead Gen Product
const LeadGenModel = ({ isActive, color }: ProductProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Funnel top */}
        <Cylinder args={[1.2, 0.8, 0.5, 32]} position={[0, 0.8, 0]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} transparent opacity={0.8} />
        </Cylinder>
        
        {/* Funnel middle */}
        <Cylinder args={[0.8, 0.4, 0.5, 32]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} transparent opacity={0.85} />
        </Cylinder>
        
        {/* Funnel bottom */}
        <Cylinder args={[0.4, 0.2, 0.6, 32]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.1} />
        </Cylinder>
        
        {/* Leads (floating spheres going into funnel) */}
        {[...Array(5)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.sin(i * 1.2) * 0.8,
              1.2 + i * 0.15,
              Math.cos(i * 1.2) * 0.8
            ]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#8b5cf6" : "#f97316"} 
              emissive={i % 2 === 0 ? "#8b5cf6" : "#f97316"}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
        
        {/* Output */}
        <mesh position={[0, -0.8, 0]}>
          <octahedronGeometry args={[0.2]} />
          <meshStandardMaterial 
            color="#22c55e" 
            emissive="#22c55e" 
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
};

const products = [
  {
    id: 1,
    name: 'AI Voice Agent',
    description: 'Intelligent voice-powered assistant that handles calls, appointments, and customer queries 24/7 in multiple languages.',
    color: '#00f5ff',
    Model: VoiceAssistantModel,
  },
  {
    id: 2,
    name: 'AI Chatbot',
    description: 'Smart conversational bot that engages visitors, qualifies leads, and provides instant support on your website.',
    color: '#8b5cf6',
    Model: ChatbotModel,
  },
  {
    id: 3,
    name: 'Workflow Automation',
    description: 'Streamline your business processes with AI-powered automation that saves time and reduces errors.',
    color: '#f97316',
    Model: AutomationModel,
  },
  {
    id: 4,
    name: 'Lead Generation',
    description: 'Capture, qualify, and nurture leads automatically with intelligent AI systems that never sleep.',
    color: '#00f5ff',
    Model: LeadGenModel,
  },
];

export const ProductShowcase3D = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(5);
  const [isInteracting, setIsInteracting] = useState(false);
  const controlsRef = useRef<any>(null);
  
  const activeProduct = products[activeIndex];
  const ActiveModel = activeProduct.Model;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setZoom(5);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.max(3, prev - 1));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.min(8, prev + 1));
  };

  const handleInteractionStart = () => {
    setIsInteracting(true);
  };

  const handleInteractionEnd = () => {
    setIsInteracting(false);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="products">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Interactive Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Explore Our <span className="text-gradient">AI Products</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag to rotate, scroll to zoom, and discover how our AI solutions can transform your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* 3D Canvas */}
          <div className="relative h-[400px] md:h-[500px] glass-card rounded-2xl overflow-hidden">
            <Suspense fallback={<Loader3D />}>
              <Canvas
                camera={{ position: [0, 0, zoom], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.4} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                  
                  {/* Particle and glow effects */}
                  <ParticleAura color={activeProduct.color} />
                  <GlowingAura color={activeProduct.color} />
                  
                  <ActiveModel isActive={true} color={activeProduct.color} />
                  
                  <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2}
                    far={4}
                  />
                  
                  <Environment preset="city" />
                  
                  <OrbitControls
                    ref={controlsRef}
                    enableZoom={true}
                    enablePan={false}
                    minDistance={3}
                    maxDistance={8}
                    autoRotate={!isInteracting}
                    autoRotateSpeed={1.5}
                    enableDamping={true}
                    dampingFactor={0.05}
                    touches={{ ONE: 1, TWO: 2 }}
                    onStart={handleInteractionStart}
                    onEnd={handleInteractionEnd}
                  />
                </Suspense>
              </Canvas>
            </Suspense>


            {/* Product indicator dots */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex-1">
                <span 
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: activeProduct.color }}
                >
                  Product {activeIndex + 1} of {products.length}
                </span>
                <h3 className="text-3xl font-bold mt-1">{activeProduct.name}</h3>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Features list */}
            <ul className="space-y-3">
              {[
                '24/7 Availability',
                'Multi-language Support',
                'Easy Integration',
                'Analytics Dashboard',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeProduct.color }}
                  />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-4 pt-4">
              <Button 
                className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90"
                onClick={() => {
                  const message = encodeURIComponent(`Hi, I'd like to request a demo for ${activeProduct.name}.`);
                  window.open(`https://wa.me/917792848355?text=${message}`, '_blank');
                }}
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
