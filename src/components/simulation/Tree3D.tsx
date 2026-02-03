import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Tree3DProps {
  position: [number, number, number];
  scale?: number;
  treeType?: "pine" | "oak" | "bush";
  isNightMode: boolean;
}

const Tree3D = ({ position, scale = 1, treeType = "pine", isNightMode }: Tree3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialZ = useRef(position[2]);

  // Randomize tree appearance slightly
  const variation = useMemo(() => ({
    trunkHeight: 0.8 + Math.random() * 0.4,
    foliageScale: 0.9 + Math.random() * 0.3,
    rotation: Math.random() * Math.PI * 2,
  }), []);

  useFrame(() => {
    if (!groupRef.current) return;
    
    groupRef.current.position.z += 0.15;
    
    if (groupRef.current.position.z > 25) {
      groupRef.current.position.z = initialZ.current;
    }
  });

  const trunkColor = isNightMode ? "#2d1f1a" : "#4a3428";
  const foliageColor = isNightMode ? "#1a3d1a" : "#2d5a2d";
  const foliageDark = isNightMode ? "#0f2a0f" : "#1f4a1f";

  if (treeType === "bush") {
    return (
      <group ref={groupRef} position={position} scale={scale} rotation={[0, variation.rotation, 0]}>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.6 * variation.foliageScale, 8, 8]} />
          <meshStandardMaterial color={foliageColor} roughness={0.9} />
        </mesh>
        <mesh position={[0.3, 0.3, 0.2]}>
          <sphereGeometry args={[0.4 * variation.foliageScale, 8, 8]} />
          <meshStandardMaterial color={foliageDark} roughness={0.9} />
        </mesh>
      </group>
    );
  }

  if (treeType === "oak") {
    return (
      <group ref={groupRef} position={position} scale={scale} rotation={[0, variation.rotation, 0]}>
        {/* Trunk */}
        <mesh position={[0, variation.trunkHeight / 2, 0]}>
          <cylinderGeometry args={[0.15, 0.2, variation.trunkHeight, 8]} />
          <meshStandardMaterial color={trunkColor} roughness={0.95} />
        </mesh>
        {/* Foliage - rounded crown */}
        <mesh position={[0, variation.trunkHeight + 0.8, 0]}>
          <sphereGeometry args={[1.2 * variation.foliageScale, 8, 8]} />
          <meshStandardMaterial color={foliageColor} roughness={0.9} />
        </mesh>
        <mesh position={[0.4, variation.trunkHeight + 0.5, 0.3]}>
          <sphereGeometry args={[0.8 * variation.foliageScale, 8, 8]} />
          <meshStandardMaterial color={foliageDark} roughness={0.9} />
        </mesh>
        <mesh position={[-0.3, variation.trunkHeight + 0.6, -0.2]}>
          <sphereGeometry args={[0.7 * variation.foliageScale, 8, 8]} />
          <meshStandardMaterial color={foliageColor} roughness={0.9} />
        </mesh>
      </group>
    );
  }

  // Default: Pine tree
  return (
    <group ref={groupRef} position={position} scale={scale} rotation={[0, variation.rotation, 0]}>
      {/* Trunk */}
      <mesh position={[0, variation.trunkHeight / 2, 0]}>
        <cylinderGeometry args={[0.08, 0.12, variation.trunkHeight, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.95} />
      </mesh>
      {/* Foliage layers - cone shapes */}
      <mesh position={[0, variation.trunkHeight + 0.5, 0]}>
        <coneGeometry args={[0.8 * variation.foliageScale, 1.2, 8]} />
        <meshStandardMaterial color={foliageColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, variation.trunkHeight + 1.2, 0]}>
        <coneGeometry args={[0.6 * variation.foliageScale, 1, 8]} />
        <meshStandardMaterial color={foliageDark} roughness={0.9} />
      </mesh>
      <mesh position={[0, variation.trunkHeight + 1.8, 0]}>
        <coneGeometry args={[0.4 * variation.foliageScale, 0.8, 8]} />
        <meshStandardMaterial color={foliageColor} roughness={0.9} />
      </mesh>
    </group>
  );
};

export default Tree3D;
