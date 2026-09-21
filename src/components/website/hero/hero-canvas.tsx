"use client";

import {
  Canvas,
} from "@react-three/fiber";

import {
  Suspense,
} from "react";

import {
  HeroMachineScene,
} from "./hero-machine-scene";

export function HeroCanvas() {
  return (
    <div className="hero-canvas">
      <Canvas
        camera={{
          position: [
            5.2,
            2.7,
            6.7,
          ],
          fov: 38,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference:
            "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <HeroMachineScene />
        </Suspense>
      </Canvas>
    </div>
  );
}