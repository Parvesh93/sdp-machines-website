"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function PlaceholderMachine() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.12; });
  return (
    <group ref={group}>
      <mesh position={[0, .15, 0]}><boxGeometry args={[3.8, 1.8, 1.5]} /><meshStandardMaterial color="#707070" metalness={.75} roughness={.32} /></mesh>
      <mesh position={[0, 1.4, 0]}><boxGeometry args={[2.6, .55, 1.1]} /><meshStandardMaterial color="#252525" metalness={.65} roughness={.4} /></mesh>
      <mesh position={[1.65, .55, .84]}><boxGeometry args={[.4, 1.1, .25]} /><meshStandardMaterial color="#ff6a00" /></mesh>
    </group>
  );
}

export function MachineStage() {
  return (
    <div className="canvasWrap">
      <Canvas dpr={[1, 1.5]} camera={{ position: [5, 3, 6], fov: 38 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={.65} />
        <directionalLight position={[4, 7, 3]} intensity={2.2} />
        <PlaceholderMachine />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
}
