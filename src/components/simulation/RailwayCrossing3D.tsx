import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RailwayCrossing3DProps {
  position: [number, number, number];
  isNightMode: boolean;
}

const RailwayCrossing3D = ({ position, isNightMode }: RailwayCrossing3DProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    
    // Move crossing towards camera
    groupRef.current.position.z += 0.15;
    
    // Reset when passed
    if (groupRef.current.position.z > 20) {
      groupRef.current.position.z = position[2];
    }
  });

  const railColor = isNightMode ? "#4a4a4a" : "#5a5a5a";
  const tieColor = isNightMode ? "#2d1f1a" : "#4a3428";
  const warningColor = "#ffcc00";

  return (
    <group ref={groupRef} position={position}>
      {/* Railway ties (wooden sleepers) */}
      {[-6, -4, -2, 0, 2, 4, 6].map((xOffset, i) => (
        <mesh 
          key={`tie-${i}`} 
          position={[xOffset, 0.02, 0]}
        >
          <boxGeometry args={[0.8, 0.15, 3]} />
          <meshStandardMaterial color={tieColor} roughness={0.95} />
        </mesh>
      ))}
      
      {/* Rails */}
      <mesh position={[0, 0.12, -0.8]}>
        <boxGeometry args={[14, 0.08, 0.1]} />
        <meshStandardMaterial 
          color={railColor} 
          metalness={0.9} 
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.12, 0.8]}>
        <boxGeometry args={[14, 0.08, 0.1]} />
        <meshStandardMaterial 
          color={railColor} 
          metalness={0.9} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Rail top surface (shiny) */}
      <mesh position={[0, 0.17, -0.8]}>
        <boxGeometry args={[14, 0.02, 0.06]} />
        <meshStandardMaterial 
          color="#888888" 
          metalness={1} 
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.17, 0.8]}>
        <boxGeometry args={[14, 0.02, 0.06]} />
        <meshStandardMaterial 
          color="#888888" 
          metalness={1} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Warning stripes on road */}
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((zOffset, i) => (
        <mesh 
          key={`stripe-before-${i}`} 
          position={[zOffset * 0.6, 0.01, -3]} 
          rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        >
          <planeGeometry args={[0.3, 1]} />
          <meshStandardMaterial 
            color={warningColor}
            emissive={isNightMode ? warningColor : "#000000"}
            emissiveIntensity={isNightMode ? 0.15 : 0}
          />
        </mesh>
      ))}
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((zOffset, i) => (
        <mesh 
          key={`stripe-after-${i}`} 
          position={[zOffset * 0.6, 0.01, 3]} 
          rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
        >
          <planeGeometry args={[0.3, 1]} />
          <meshStandardMaterial 
            color={warningColor}
            emissive={isNightMode ? warningColor : "#000000"}
            emissiveIntensity={isNightMode ? 0.15 : 0}
          />
        </mesh>
      ))}
      
      {/* Crossing gate posts (left and right side) */}
      {[-5.5, 5.5].map((xPos, i) => (
        <group key={`post-${i}`} position={[xPos, 0, 0]}>
          {/* Post */}
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 3, 8]} />
            <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
          </mesh>
          
          {/* Cross sign (X) */}
          <mesh position={[0, 2.8, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.15, 1.2, 0.05]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 2.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.15, 1.2, 0.05]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          
          {/* Warning light (red) */}
          <mesh position={[0, 3.2, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color="#ff0000"
              emissive="#ff0000"
              emissiveIntensity={isNightMode ? 0.8 : 0.3}
            />
          </mesh>
          {isNightMode && (
            <pointLight 
              position={[0, 3.2, 0]} 
              intensity={0.5} 
              distance={5} 
              color="#ff0000" 
            />
          )}
        </group>
      ))}
    </group>
  );
};

export default RailwayCrossing3D;
