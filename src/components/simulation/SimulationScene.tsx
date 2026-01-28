import { Suspense, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import RoadScene from "./RoadScene";
import TrafficSign3D from "./TrafficSign3D";

// Import sign images
import sign00 from "@/assets/signs/sign-00.png";
import sign01 from "@/assets/signs/sign-01.png";
import sign02 from "@/assets/signs/sign-02.png";
import sign03 from "@/assets/signs/sign-03.png";
import sign04 from "@/assets/signs/sign-04.png";
import sign05 from "@/assets/signs/sign-05.png";
import sign11 from "@/assets/signs/sign-11.png";
import sign12 from "@/assets/signs/sign-12.png";
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

interface Detection {
  name: string;
  classNumber: number;
  timestamp: number;
  confidence: number;
}

interface SimulationSceneProps {
  onDetection: (detection: Detection) => void;
}

const SimulationScene = ({ onDetection }: SimulationSceneProps) => {
  const handleDetection = useCallback((name: string, classNumber: number) => {
    onDetection({
      name,
      classNumber,
      timestamp: Date.now(),
      confidence: 85 + Math.random() * 14,
    });
  }, [onDetection]);

  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={60} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#4af" />
      
      {/* Sky */}
      <color attach="background" args={["#0a0a15"]} />
      <fog attach="fog" args={["#0a0a15", 30, 100]} />
      
      <Suspense fallback={null}>
        <RoadScene />
        
        {signs.map((sign, index) => (
          <TrafficSign3D
            key={index}
            position={sign.position}
            signImage={sign.image}
            signName={sign.name}
            classNumber={sign.class}
            onDetected={handleDetection}
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
