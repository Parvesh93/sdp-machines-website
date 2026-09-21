"use client";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  Environment,
  Float,
  Grid,
} from "@react-three/drei";

import {
  useRef,
} from "react";

import * as THREE from "three";

function MachinePlaceholder() {
  const group =
    useRef<THREE.Group>(null);

  const targetRotation =
    useRef({
      x: 0,
      y: 0,
    });

  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;

    targetRotation.current.x =
      pointer.y * 0.08;

    targetRotation.current.y =
      pointer.x * 0.18;

    group.current.rotation.x =
      THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetRotation.current.x,
        0.04,
      );

    group.current.rotation.y =
      THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotation.current.y +
          state.clock.elapsedTime * 0.04,
        0.04,
      );

    group.current.position.y =
      Math.sin(
        state.clock.elapsedTime * 0.7,
      ) * 0.04;
  });

  return (
    <group
      ref={group}
      rotation={[
        -0.06,
        -0.25,
        0,
      ]}
    >
      {/* BASE */}

      <mesh
        position={[0, -1.2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[4.7, 0.35, 2.5]}
        />

        <meshStandardMaterial
          color="#252725"
          metalness={0.85}
          roughness={0.32}
        />
      </mesh>

      {/* LEFT COLUMN */}

      <mesh
        position={[-1.75, 0, 0]}
        castShadow
      >
        <boxGeometry
          args={[0.55, 2.5, 0.7]}
        />

        <meshStandardMaterial
          color="#656965"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* RIGHT COLUMN */}

      <mesh
        position={[1.75, 0, 0]}
        castShadow
      >
        <boxGeometry
          args={[0.55, 2.5, 0.7]}
        />

        <meshStandardMaterial
          color="#656965"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* TOP GANTRY */}

      <mesh
        position={[0, 1.05, 0]}
        castShadow
      >
        <boxGeometry
          args={[4.1, 0.5, 0.8]}
        />

        <meshStandardMaterial
          color="#414441"
          metalness={0.9}
          roughness={0.27}
        />
      </mesh>

      {/* CENTRAL PROCESSING BLOCK */}

      <mesh
        position={[0, 0.05, 0]}
        castShadow
      >
        <boxGeometry
          args={[1.5, 1.05, 1.35]}
        />

        <meshStandardMaterial
          color="#171817"
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      {/* CUTTING DISC */}

      <mesh
        position={[0, -0.05, 0.75]}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.82,
            0.82,
            0.08,
            64,
          ]}
        />

        <meshStandardMaterial
          color="#bfc3be"
          metalness={1}
          roughness={0.18}
        />
      </mesh>

      {/* SDP ACCENT STRIP */}

      <mesh
        position={[
          0,
          0.38,
          -0.71,
        ]}
      >
        <boxGeometry
          args={[
            1.2,
            0.13,
            0.03,
          ]}
        />

        <meshStandardMaterial
          color="#d8ff3e"
          emissive="#d8ff3e"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* CONTROL PANEL */}

      <mesh
        position={[
          2.05,
          0.35,
          0.15,
        ]}
        rotation={[0, -0.15, 0]}
        castShadow
      >
        <boxGeometry
          args={[
            0.5,
            0.9,
            0.35,
          ]}
        />

        <meshStandardMaterial
          color="#191a19"
          metalness={0.65}
          roughness={0.35}
        />
      </mesh>

      <mesh
        position={[
          2.23,
          0.47,
          0.1,
        ]}
        rotation={[0, -0.15, 0]}
      >
        <planeGeometry
          args={[0.26, 0.38]}
        />

        <meshStandardMaterial
          color="#d8ff3e"
          emissive="#d8ff3e"
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

export function HeroMachineScene() {
  return (
    <>
      <ambientLight
        intensity={0.35}
      />

      <directionalLight
        position={[4, 7, 5]}
        intensity={3.2}
        castShadow
      />

      <directionalLight
        position={[-5, 2, -4]}
        intensity={1.4}
      />

      <pointLight
        position={[0, 1, 4]}
        intensity={14}
        distance={10}
      />

      <Float
        speed={1}
        rotationIntensity={0}
        floatIntensity={0.15}
      >
        <MachinePlaceholder />
      </Float>

      <Grid
        position={[0, -1.42, 0]}
        args={[20, 20]}
        cellSize={0.45}
        cellThickness={0.4}
        cellColor="#454945"
        sectionSize={2.25}
        sectionThickness={0.7}
        sectionColor="#6c716c"
        fadeDistance={13}
        fadeStrength={1.5}
        infiniteGrid
      />

      <Environment preset="warehouse" />
    </>
  );
}