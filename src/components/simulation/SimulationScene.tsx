import { Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import RoadScene from "./RoadScene";
import TrafficSign3D from "./TrafficSign3D";
import SpeedBump3D from "./SpeedBump3D";
import RailwayCrossing3D from "./RailwayCrossing3D";

// Import sign images
import sign01 from "@/assets/signs/sign-01.png";
import sign02 from "@/assets/signs/sign-02.png";
import sign03 from "@/assets/signs/sign-03.png";
import sign11 from "@/assets/signs/sign-11.png";
import sign13 from "@/assets/signs/sign-13.png";
import sign14 from "@/assets/signs/sign-14.png";
import sign17 from "@/assets/signs/sign-17.png";
import sign18 from "@/assets/signs/sign-18.png";
import sign25 from "@/assets/signs/sign-25.png";
import sign33 from "@/assets/signs/sign-33.png";
import sign35 from "@/assets/signs/sign-35.png";
import sign38 from "@/assets/signs/sign-38.png";

const signs = [
  { image: sign01, name: "Speed Limit 30", class: 1, position: [-4, 0, -100] as [number, number, number] },
  { image: sign14, name: "Stop", class: 14, position: [4, 0, -80] as [number, number, number] },
  { image: sign02, name: "Speed Limit 50", class: 2, position: [-4, 0, -60] as [number, number, number] },
  { image: sign13, name: "Yield", class: 13, position: [4, 0, -40] as [number, number, number] },
  { image: sign25, name: "Road Work", class: 25, position: [-4, 0, -20] as [number, number, number] },
  { image: sign17, name: "No Entry", class: 17, position: [4, 0, 0] as [number, number, number] },
  { image: sign03, name: "Speed Limit 60", class: 3, position: [-4, 0, -140] as [number, number, number] },
  { image: sign38, name: "Keep Right", class: 38, position: [4, 0, -120] as [number, number, number] },
  { image: sign33, name: "Turn Right Ahead", class: 33, position: [-4, 0, -160] as [number, number, number] },
  { image: sign35, name: "Ahead Only", class: 35, position: [4, 0, -180] as [number, number, number] },
  { image: sign11, name: "Right Curve", class: 11, position: [-4, 0, -200] as [number, number, number] },
  { image: sign18, name: "General Caution", class: 18, position: [4, 0, -220] as [number, number, number] },
];

// Speed bump positions along the road
const speedBumps: [number, number, number][] = [
  [0, 0, -30],
  [0, 0, -90],
  [0, 0, -150],
  [0, 0, -210],
];

// Railway crossing positions
const railwayCrossings: [number, number, number][] = [
  [0, 0, -70],
  [0, 0, -170],
];

interface Detection {
  name: string;
  classNumber: number;
  timestamp: number;
  confidence: number;
}

interface SimulationSceneProps {
  onDetection: (detection: Detection) => void;
  isNightMode: boolean;
}

const SimulationScene = ({ onDetection, isNightMode }: SimulationSceneProps) => {
  const handleDetection = useCallback((name: string, classNumber: number) => {
    onDetection({
      name,
      classNumber,
      timestamp: Date.now(),
      confidence: 85 + Math.random() * 14,
    });
  }, [onDetection]);

  // Day/Night theme colors
  const theme = isNightMode
    ? {
        background: "#0a0a15",
        fog: "#0a0a15",
        ambient: 0.2,
        directional: 0.6,
        ground: "#0d1a0d",
      }
    : {
        background: "#87CEEB",
        fog: "#87CEEB",
        ambient: 0.8,
        directional: 1.2,
        ground: "#2d5a2d",
      };

  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={60} />
      
      {/* Lighting */}
      <ambientLight intensity={theme.ambient} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={theme.directional}
        castShadow
        shadow-mapSize={[2048, 2048]}
        color={isNightMode ? "#aaccff" : "#fffaf0"}
      />
      {isNightMode && (
        <>
          <pointLight position={[-10, 10, -10]} intensity={0.3} color="#4af" />
          <pointLight position={[0, 5, 0]} intensity={0.2} color="#ff6600" />
        </>
      )}
      {!isNightMode && (
        <hemisphereLight intensity={0.5} color="#87CEEB" groundColor="#2d5a2d" />
      )}
      
      {/* Sky */}
      <color attach="background" args={[theme.background]} />
      <fog attach="fog" args={[theme.fog, isNightMode ? 30 : 50, isNightMode ? 100 : 150]} />
      
      {/* Stars for night mode */}
      {isNightMode && (
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      )}
      
      {/* Sun/Moon */}
      {!isNightMode ? (
        <mesh position={[30, 40, -50]}>
          <sphereGeometry args={[5, 32, 32]} />
          <meshBasicMaterial color="#fff5d4" />
        </mesh>
      ) : (
        <mesh position={[-20, 30, -40]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#f0f0ff" />
        </mesh>
      )}
      
      <Suspense fallback={null}>
        <RoadScene isNightMode={isNightMode} groundColor={theme.ground} />
        
        {signs.map((sign, index) => (
          <TrafficSign3D
            key={`sign-${index}`}
            position={sign.position}
            signImage={sign.image}
            signName={sign.name}
            classNumber={sign.class}
            onDetected={handleDetection}
            isNightMode={isNightMode}
          />
        ))}
        
        {/* Speed bumps */}
        {speedBumps.map((position, index) => (
          <SpeedBump3D
            key={`bump-${index}`}
            position={position}
            isNightMode={isNightMode}
          />
        ))}
        
        {/* Railway crossings */}
        {railwayCrossings.map((position, index) => (
          <RailwayCrossing3D
            key={`railway-${index}`}
            position={position}
            isNightMode={isNightMode}
          />
        ))}
      </Suspense>
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        minDistance={5}
        maxDistance={20}
      />
    </Canvas>
  );
};

export default SimulationScene;
