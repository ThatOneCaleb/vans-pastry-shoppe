"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 220;

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
  const { gl, viewport } = useThree();
  // mouse position in world units; parked far away until first move
  const mouse = useRef({ x: 999, y: 999, vx: 0, vy: 0, px: 999, py: 999 });

  const { positions, speeds, velocities, texture } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const velocities = new Float32Array(PARTICLE_COUNT * 2);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;      // x spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;   // y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;   // z depth
      speeds[i] = 0.1 + Math.random() * 0.25;
    }
    return { positions, speeds, velocities, texture: makeGlowTexture() };
  }, []);

  // The canvas sits in a pointer-events-none layer, so track the window instead
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      if (rect.bottom < 0) return; // hero scrolled away
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const m = mouse.current;
      m.px = m.x;
      m.py = m.y;
      m.x = (ndcX * viewport.width) / 2;
      m.y = (ndcY * viewport.height) / 2;
      // cursor velocity drives how hard particles get flung
      m.vx = m.x - m.px;
      m.vy = m.y - m.py;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [gl, viewport.width, viewport.height]);

  useFrame((state) => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position
      .array as Float32Array;
    const t = state.clock.elapsedTime;
    const m = mouse.current;
    const RADIUS = 2.4;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iv = i * 2;

      // ambient drift: slow rise with gentle sway
      pos[ix + 1] += speeds[i] * 0.0035;
      pos[ix] += Math.sin(t * 0.3 + i * 1.7) * 0.0012;

      // cursor repulsion with swirl — closer particles get pushed harder,
      // plus a perpendicular component so they curl around the cursor
      const dx = pos[ix] - m.x;
      const dy = pos[ix + 1] - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < RADIUS && dist > 0.0001) {
        const force = (1 - dist / RADIUS) ** 2 * 0.06;
        const nx = dx / dist;
        const ny = dy / dist;
        const fling = Math.min(
          1.5,
          Math.sqrt(m.vx * m.vx + m.vy * m.vy) * 2 + 0.3
        );
        velocities[iv] += (nx + -ny * 0.6) * force * fling;
        velocities[iv + 1] += (ny + nx * 0.6) * force * fling;
      }

      // integrate + damp so flung particles glide back to ambient drift
      pos[ix] += velocities[iv];
      pos[ix + 1] += velocities[iv + 1];
      velocities[iv] *= 0.94;
      velocities[iv + 1] *= 0.94;

      // wrap vertically, keep horizontal in bounds
      if (pos[ix + 1] > 4.5) pos[ix + 1] = -4.5;
      if (pos[ix + 1] < -4.6) pos[ix + 1] = 4.5;
      if (pos[ix] > 8.5) pos[ix] = -8.5;
      if (pos[ix] < -8.5) pos[ix] = 8.5;
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
