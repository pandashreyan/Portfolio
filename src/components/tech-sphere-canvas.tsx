"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// 20 Core skills to place on our 3D globe
const SKILLS = [
  "Next.js", "React", "Node.js", "TypeScript",
  "Python", "PyTorch", "TensorFlow", "Scikit-Learn",
  "MongoDB", "Firebase", "PostgreSQL", "React Native",
  "Docker", "Git & GitHub", "C++", "Flask",
  "Streamlit", "NLTK", "Open Source", "Genkit AI"
];

// Individual floating Skill badge in 3D
function SkillBadge3D({ name, pos, index }: { name: string; pos: [number, number, number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const colorGradients = [
    "from-cyan-500 to-blue-600",
    "from-purple-500 to-pink-600",
    "from-yellow-500 to-orange-600",
    "from-green-500 to-emerald-600",
  ];

  const gradient = colorGradients[index % colorGradients.length];

  return (
    <Html
      position={pos}
      center
      distanceFactor={6}
      className="pointer-events-auto select-none"
    >
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`px-4 py-2 rounded-full border font-extrabold whitespace-nowrap text-xs md:text-sm cursor-pointer transition-all duration-300 flex items-center gap-2 ${
          hovered
            ? "scale-125 border-cyan-400 text-white bg-gradient-to-r " + gradient + " shadow-[0_0_30px_rgba(0,229,255,0.9)] z-50 font-black"
            : "text-cyan-300 hover:text-white bg-[hsl(240,50%,10%)]/95 backdrop-blur-md border-cyan-500/40 shadow-[0_0_20px_rgba(0,229,255,0.25)]"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: hovered ? "translateZ(40px)" : "translateZ(0px)",
        }}
      >
        <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${gradient} ${hovered ? "animate-ping" : "shadow-[0_0_8px_#00e5ff]"}`} />
        <span>{name}</span>
      </button>
    </Html>
  );
}

// Tech Globe component
function TechGlobe({ radius = 3.5 }: { radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Calculate Fibonacci sphere points for uniform 3D distribution
  const points = useMemo(() => {
    const temp = [];
    const count = SKILLS.length;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      temp.push({
        name: SKILLS[i],
        pos: [x, y, z] as [number, number, number],
      });
    }
    return temp;
  }, [radius]);

  // Handle auto-rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Emissive Inner Core Sphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.82, 32, 32]} />
        <meshStandardMaterial
          color="#082f49"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 2. Vibrant Outer Wireframe */}
      <mesh>
        <sphereGeometry args={[radius * 0.95, 24, 24]} />
        <meshBasicMaterial
          color="#00e5ff"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* 3. Glowing Constellation Nodes at Vertices */}
      {points.map((pt, idx) => (
        <mesh key={`node-${pt.name}`} position={pt.pos}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color={idx % 2 === 0 ? "#00e5ff" : "#e879f9"} />
        </mesh>
      ))}

      {/* 4. Floating skill badges */}
      {points.map((pt, idx) => (
        <SkillBadge3D
          key={pt.name}
          name={pt.name}
          pos={pt.pos}
          index={idx}
        />
      ))}
    </group>
  );
}

// Cosmic floating particles in 3D space
function CosmicDust({ count = 120 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random shell distribution around the tech sphere
      const r = 4.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = -state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00e5ff"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </points>
  );
}

export default function TechSphereCanvas() {
  return (
    <div className="w-full h-[550px] cursor-grab active:cursor-grabbing relative select-none">
      {/* Visual background shadows/glows */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent filter blur-3xl pointer-events-none rounded-full" />
      
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 60 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        {/* The 3D rotating skill sphere */}
        <TechGlobe radius={3.6} />
        
        {/* Floating background dust particles */}
        <CosmicDust count={150} />
        
        {/* Orbital controls to rotate the tech sphere manually */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
