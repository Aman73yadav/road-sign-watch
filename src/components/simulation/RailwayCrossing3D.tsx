import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RailwayCrossing3DProps {
  position: [number, number, number];
  isNightMode: boolean;
}

// Barrier arm component with red/white stripes
const BarrierArm = ({ 
  side, 
  rotation, 
  isNightMode 
}: { 
  side: "left" | "right"; 
  rotation: number; 
  isNightMode: boolean;
}) => {
  const xPos = side === "left" ? -5.5 : 5.5;
  const pivotOffset = side === "left" ? 0.15 : -0.15;
  const armDirection = side === "left" ? 1 : -1;
  
  return (
    <group position={[xPos, 2.2, 0]}>
      {/* Pivot point for rotation */}
      <group rotation={[0, 0, rotation * armDirection]}>
        {/* Main barrier arm */}
        <mesh position={[armDirection * 2.2, 0, 0]}>
          <boxGeometry args={[4, 0.15, 0.08]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Red stripes on barrier */}
        {[0.4, 1.2, 2.0, 2.8, 3.6].map((offset, i) => (
          <mesh key={i} position={[armDirection * offset, 0, 0.045]}>
            <boxGeometry args={[0.4, 0.16, 0.02]} />
            <meshStandardMaterial 
              color="#ff0000"
              emissive={isNightMode ? "#ff0000" : "#000000"}
              emissiveIntensity={isNightMode ? 0.3 : 0}
            />
          </mesh>
        ))}
        
        {/* Reflective tip */}
        <mesh position={[armDirection * 4.1, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial 
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
      
      {/* Pivot housing */}
      <mesh position={[pivotOffset, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

const RailwayCrossing3D = ({ position, isNightMode }: RailwayCrossing3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [barrierRotation, setBarrierRotation] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [lightFlash, setLightFlash] = useState(false);
  const flashTimer = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    
    // Move crossing towards camera
    groupRef.current.position.z += 0.15;
    
    // Check proximity to camera for barrier animation
    const currentZ = groupRef.current.position.z;
    const approachZone = currentZ > -25 && currentZ < 15;
    
    if (approachZone && !isActive) {
      setIsActive(true);
    } else if (!approachZone && isActive) {
      setIsActive(false);
    }
    
    // Animate barrier rotation
    const targetRotation = isActive ? Math.PI / 2 : 0; // 90 degrees when lowered
    const rotationSpeed = 1.5;
    
    if (isActive && barrierRotation < targetRotation) {
      setBarrierRotation(prev => Math.min(prev + delta * rotationSpeed, targetRotation));
    } else if (!isActive && barrierRotation > 0) {
      setBarrierRotation(prev => Math.max(prev - delta * rotationSpeed, 0));
    }
    
    // Flash warning lights when active
    if (isActive) {
      flashTimer.current += delta;
      if (flashTimer.current > 0.5) {
        setLightFlash(prev => !prev);
        flashTimer.current = 0;
      }
    }
    
    // Reset when passed
    if (groupRef.current.position.z > 20) {
      groupRef.current.position.z = position[2];
      setBarrierRotation(0);
      setIsActive(false);
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
      
      {/* Animated barrier arms */}
      <BarrierArm side="left" rotation={barrierRotation} isNightMode={isNightMode} />
      <BarrierArm side="right" rotation={barrierRotation} isNightMode={isNightMode} />
      
      {/* Crossing gate posts (left and right side) */}
      {[-5.5, 5.5].map((xPos, i) => (
        <group key={`post-${i}`} position={[xPos, 0, 0]}>
          {/* Post */}
          <mesh position={[0, 1.1, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 2.2, 8]} />
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
          
          {/* Dual warning lights (alternating flash) */}
          <mesh position={[-0.15, 3.3, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color="#ff0000"
              emissive="#ff0000"
              emissiveIntensity={isActive && lightFlash ? 1.2 : (isNightMode ? 0.3 : 0.1)}
            />
          </mesh>
          <mesh position={[0.15, 3.3, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color="#ff0000"
              emissive="#ff0000"
              emissiveIntensity={isActive && !lightFlash ? 1.2 : (isNightMode ? 0.3 : 0.1)}
            />
          </mesh>
          
          {/* Dynamic point lights for active state */}
          {isActive && isNightMode && (
            <pointLight 
              position={[lightFlash ? -0.15 : 0.15, 3.3, 0]} 
              intensity={0.8} 
              distance={6} 
              color="#ff0000" 
            />
          )}
        </group>
      ))}
    </group>
  );
};

export default RailwayCrossing3D;
