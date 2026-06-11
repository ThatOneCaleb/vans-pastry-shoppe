"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 160;

function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(255, 235, 200, 1)");
  gradient.addColorStop(0.4, "rgba(232, 201, 138, 0.5)");
  gradient.addColorStop(1, "rgba(232, 201, 138, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function FlourDust() {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds, texture } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;      // x spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;   // y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;   // z depth
      speeds[i] = 0.1 + Math.random() * 0.25;
    }
    return { positions, speeds, texture: makeGlowTexture() };
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position
      .array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // slow upward drift with gentle horizontal sway
      pos[i * 3 + 1] += speeds[i] * 0.0035;
      pos[i * 3] += Math.sin(t * 0.3 + i * 1.7) * 0.0012;
      if (pos[i * 3 + 1] > 4.5) pos[i * 3 + 1] = -4.5;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.14}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#E8C98A"
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: false, alpha: true }}
      style={{ background: "transparent" }}
    >
      <FlourDust />
    </Canvas>
  );
}
