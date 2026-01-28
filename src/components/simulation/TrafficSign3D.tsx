import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

interface TrafficSign3DProps {
  position: [number, number, number];
  signImage: string;
  signName: string;
  classNumber: number;
  onDetected?: (name: string, classNumber: number) => void;
}

const TrafficSign3D = ({ position, signImage, signName, classNumber, onDetected }: TrafficSign3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showLabel, setShowLabel] = useState(false);
  const [detected, setDetected] = useState(false);
  
  const texture = useTexture(signImage);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Move sign towards camera
    groupRef.current.position.z += 0.15;
    
    // Detection zone
    if (groupRef.current.position.z > -5 && groupRef.current.position.z < 5 && !detected) {
      setShowLabel(true);
      setDetected(true);
      onDetected?.(signName, classNumber);
    }
    
    // Reset when passed
    if (groupRef.current.position.z > 20) {
      groupRef.current.position.z = position[2];
      setShowLabel(false);
      setDetected(false);
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* Sign post */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Sign backing */}
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[1.2, 1.2, 0.1]} />
        <meshStandardMaterial color="#333333" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Sign face */}
      <mesh position={[0, 2.8, 0.06]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      
      {/* Detection glow effect */}
      {detected && (
        <mesh position={[0, 2.8, 0.05]}>
          <ringGeometry args={[0.55, 0.7, 32]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
        </mesh>
      )}
      
      {/* Label */}
      {showLabel && (
        <Html position={[0, 4, 0]} center>
          <div className="bg-card/90 backdrop-blur-sm border border-secondary/50 rounded-lg px-3 py-2 text-center animate-fade-in whitespace-nowrap">
            <div className="text-secondary text-xs font-mono">DETECTED</div>
            <div className="text-foreground text-sm font-semibold">{signName}</div>
            <div className="text-muted-foreground text-xs">Class {classNumber}</div>
          </div>
        </Html>
      )}
    </group>
  );
};

export default TrafficSign3D;
