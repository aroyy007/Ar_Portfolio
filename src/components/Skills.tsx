import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useIsMobile } from "../hooks/use-mobile";

interface Skill {
  name: string;
  color: string;
  radius: number;
  speed: number;
}

const skills: Skill[] = [
  { name: "JavaScript", color: "#ffd700", radius: 3, speed: 0.5 },
  { name: "Python", color: "#3776ab", radius: 3.5, speed: 0.4 },
  { name: "C++", color: "#00599c", radius: 4, speed: 0.6 },
  { name: "React", color: "#61dafb", radius: 3.2, speed: 0.45 },
  { name: "Node.js", color: "#68a063", radius: 3.8, speed: 0.55 },
  { name: "MongoDB", color: "#4db33d", radius: 4.2, speed: 0.35 },
  { name: "TailwindCSS", color: "#06b6d4", radius: 3.6, speed: 0.5 },
  { name: "Firebase", color: "#ff6b35", radius: 3.4, speed: 0.42 },
  { name: "TensorFlow", color: "#ff6f00", radius: 4.5, speed: 0.38 },
  { name: "Express", color: "#ffffff", radius: 3.3, speed: 0.48 },
  { name: "Redux", color: "#764abc", radius: 3.7, speed: 0.52 },
  { name: "Git", color: "#f05032", radius: 4.1, speed: 0.44 },
];

function SkillOrb({ skill, index }: { skill: Skill; index: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const offset = (index / skills.length) * Math.PI * 2;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * skill.speed;
      meshRef.current.position.x = Math.cos(time + offset) * skill.radius;
      meshRef.current.position.z = Math.sin(time + offset) * skill.radius;
      meshRef.current.position.y = Math.sin(time * 0.5 + offset) * 0.5;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.3);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
        <mesh
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.2}
          color={skill.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {skill.name}
        </Text>
      </Float>
    </group>
  );
}

function CenterCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#7c3aed"
        emissiveIntensity={0.5}
        metalness={1}
        roughness={0.1}
        wireframe
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
      
      <CenterCore />
      
      {skills.map((skill, index) => (
        <SkillOrb key={skill.name} skill={skill} index={index} />
      ))}
      
      {/* Orbital rings */}
      {[2.5, 3.5, 4.5].map((radius) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshStandardMaterial
            color="#8b5cf6"
            transparent
            opacity={0.15}
            emissive="#7c3aed"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      <Environment preset="night" />
    </>
  );
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in-left");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="section-container overflow-hidden">
      <div ref={sectionRef} className="opacity-0 translate-y-8 transition-all duration-700 mb-6 sm:mb-8 text-center">
        <h2 className="section-heading">Tech Arsenal</h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
          Interactive orbit of technologies I work with
        </p>
      </div>

      <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden">
        <Canvas
          camera={{ position: [0, 5, 10], fov: isMobile ? 60 : 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={5}
              maxDistance={15}
              autoRotate
              autoRotateSpeed={0.5}
              enableDamping
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400 px-4">
        <p className="hidden sm:block">🖱️ Drag to rotate • 🔍 Scroll to zoom • ✨ Hover planets to interact</p>
        <p className="sm:hidden">👆 Touch to rotate • 🤏 Pinch to zoom • ✨ Tap planets to interact</p>
      </div>
    </section>
  );
};

export default Skills;