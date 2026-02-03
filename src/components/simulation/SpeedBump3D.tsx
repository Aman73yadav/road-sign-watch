import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpeedBump3DProps {
  position: [number, number, number];
  isNightMode: boolean;
}

const SpeedBump3D = ({ position, isNightMode }: SpeedBump3DProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    
    // Move bump towards camera
    groupRef.current.position.z += 0.15;
    
    // Reset when passed
    if (groupRef.current.position.z > 20) {
      groupRef.current.position.z = position[2];
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main bump body */}
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.15, 8, 8, 16]} />
        <meshStandardMaterial 
          color={isNightMode ? "#1a1a1a" : "#2a2a2a"} 
          roughness={0.9}
        />
      </mesh>
      
      {/* Yellow warning stripes */}
      {[-3, -1.5, 0, 1.5, 3].map((xOffset, i) => (
        <mesh 
          key={i} 
          position={[xOffset, 0.16, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.4, 0.5]} />
          <meshStandardMaterial 
            color="#ffcc00" 
            emissive={isNightMode ? "#ffcc00" : "#000000"}
            emissiveIntensity={isNightMode ? 0.2 : 0}
          />
        </mesh>
      ))}
      
      {/* Road marking before bump */}
      <mesh position={[0, 0.01, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 0.3]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive={isNightMode ? "#ffffff" : "#000000"}
          emissiveIntensity={isNightMode ? 0.1 : 0}
        />
      </mesh>
      <mesh position={[0, 0.01, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 0.3]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive={isNightMode ? "#ffffff" : "#000000"}
          emissiveIntensity={isNightMode ? 0.1 : 0}
        />
      </mesh>
    </group>
  );
};

export default SpeedBump3D;
