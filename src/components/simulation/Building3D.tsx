import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Building3DProps {
  position: [number, number, number];
  isNightMode: boolean;
}

const Building3D = ({ position, isNightMode }: Building3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialZ = useRef(position[2]);

  // Randomize building appearance
  const building = useMemo(() => ({
    width: 2 + Math.random() * 3,
    depth: 2 + Math.random() * 2,
    height: 3 + Math.random() * 6,
    floors: Math.floor(2 + Math.random() * 4),
    color: [`#4a4a5a`, `#5a5a6a`, `#6a6a7a`, `#3a4a5a`, `#5a4a4a`][Math.floor(Math.random() * 5)],
    roofType: Math.random() > 0.5 ? "flat" : "peaked",
    rotation: Math.random() * 0.2 - 0.1,
  }), []);

  useFrame(() => {
    if (!groupRef.current) return;
    
    groupRef.current.position.z += 0.15;
    
    if (groupRef.current.position.z > 25) {
      groupRef.current.position.z = initialZ.current;
    }
  });

  const windowColor = isNightMode ? "#ffdd88" : "#88ccff";
  const windowEmissive = isNightMode ? 0.8 : 0;
  const buildingColor = isNightMode 
    ? building.color.replace(/[5-7]/g, (m) => String(parseInt(m) - 2))
    : building.color;

  // Generate window positions
  const windows = useMemo(() => {
    const windowList: { x: number; y: number; lit: boolean }[] = [];
    const windowsPerFloor = Math.floor(building.width / 0.8);
    
    for (let floor = 0; floor < building.floors; floor++) {
      for (let w = 0; w < windowsPerFloor; w++) {
        windowList.push({
          x: -building.width / 2 + 0.5 + w * 0.8,
          y: 0.8 + floor * (building.height / building.floors),
          lit: Math.random() > 0.3,
        });
      }
    }
    return windowList;
  }, [building]);

  return (
    <group ref={groupRef} position={position} rotation={[0, building.rotation, 0]}>
      {/* Main building body */}
      <mesh position={[0, building.height / 2, 0]}>
        <boxGeometry args={[building.width, building.height, building.depth]} />
        <meshStandardMaterial color={buildingColor} roughness={0.8} />
      </mesh>
      
      {/* Roof */}
      {building.roofType === "peaked" ? (
        <mesh position={[0, building.height + 0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[building.width * 0.7, 1, 4]} />
          <meshStandardMaterial color="#5a3a2a" roughness={0.9} />
        </mesh>
      ) : (
        <mesh position={[0, building.height + 0.1, 0]}>
          <boxGeometry args={[building.width + 0.2, 0.2, building.depth + 0.2]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.7} />
        </mesh>
      )}
      
      {/* Windows on front face */}
      {windows.map((win, i) => (
        <mesh 
          key={i} 
          position={[win.x, win.y, building.depth / 2 + 0.01]}
        >
          <planeGeometry args={[0.4, 0.5]} />
          <meshStandardMaterial 
            color={win.lit && isNightMode ? windowColor : "#224466"}
            emissive={win.lit ? windowColor : "#000000"}
            emissiveIntensity={win.lit ? windowEmissive : 0}
          />
        </mesh>
      ))}
      
      {/* Door */}
      <mesh position={[0, 0.7, building.depth / 2 + 0.01]}>
        <planeGeometry args={[0.6, 1.4]} />
        <meshStandardMaterial color="#3a2a1a" />
      </mesh>
      
      {/* Building lights at night */}
      {isNightMode && (
        <pointLight 
          position={[0, building.height / 2, building.depth / 2 + 1]} 
          intensity={0.3} 
          distance={5} 
          color="#ffdd88" 
        />
      )}
    </group>
  );
};

export default Building3D;
