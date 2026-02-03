import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StreetLamp3DProps {
  position: [number, number, number];
  isNightMode: boolean;
}

const StreetLamp3D = ({ position, isNightMode }: StreetLamp3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialZ = useRef(position[2]);

  useFrame(() => {
    if (!groupRef.current) return;
    
    groupRef.current.position.z += 0.15;
    
    if (groupRef.current.position.z > 25) {
      groupRef.current.position.z = initialZ.current;
    }
  });

  const poleColor = isNightMode ? "#2a2a2a" : "#3a3a3a";
  const lightColor = "#ffcc66";

  return (
    <group ref={groupRef} position={position}>
      {/* Pole */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 4, 8]} />
        <meshStandardMaterial color={poleColor} metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Lamp arm */}
      <mesh position={[0.4, 3.8, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
        <meshStandardMaterial color={poleColor} metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Lamp housing */}
      <mesh position={[0.7, 3.9, 0]}>
        <boxGeometry args={[0.4, 0.15, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Light bulb */}
      <mesh position={[0.7, 3.8, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={lightColor}
          emissive={lightColor}
          emissiveIntensity={isNightMode ? 1 : 0.1}
        />
      </mesh>
      
      {/* Light cone at night */}
      {isNightMode && (
        <>
          <pointLight 
            position={[0.7, 3.7, 0]} 
            intensity={1.5} 
            distance={8} 
            color={lightColor}
            castShadow
          />
          <spotLight
            position={[0.7, 3.7, 0]}
            angle={Math.PI / 4}
            penumbra={0.5}
            intensity={2}
            distance={10}
            color={lightColor}
            target-position={[0.7, 0, 0]}
          />
        </>
      )}
    </group>
  );
};

export default StreetLamp3D;
