import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RoadScene = () => {
  const roadRef = useRef<THREE.Group>(null);

  // Create road texture pattern
  const roadTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    
    // Road base
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(0, 0, 512, 512);
    
    // Center dashed line
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 8;
    ctx.setLineDash([40, 30]);
    ctx.beginPath();
    ctx.moveTo(256, 0);
    ctx.lineTo(256, 512);
    ctx.stroke();
    
    // Side lines
    ctx.setLineDash([]);
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(40, 512);
    ctx.moveTo(472, 0);
    ctx.lineTo(472, 512);
    ctx.stroke();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 20);
    return texture;
  }, []);

  // Animate road scrolling
  useFrame((_, delta) => {
    if (roadTexture) {
      roadTexture.offset.y -= delta * 0.5;
    }
  });

  return (
    <group ref={roadRef}>
      {/* Main road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[10, 200]} />
        <meshStandardMaterial map={roadTexture} />
      </mesh>
      
      {/* Ground on sides */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-15, -0.02, 0]}>
        <planeGeometry args={[20, 200]} />
        <meshStandardMaterial color="#1a3d1a" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[15, -0.02, 0]}>
        <planeGeometry args={[20, 200]} />
        <meshStandardMaterial color="#1a3d1a" />
      </mesh>
    </group>
  );
};

export default RoadScene;
