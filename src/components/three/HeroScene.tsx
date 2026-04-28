"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ProductPlane() {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, "/media/products/main.png");
  // Improve sampling for crisp edges on the textured plane
  if (texture) {
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
  }

  useFrame(({ pointer }, dt) => {
    if (!ref.current) return;
    // Subtle parallax follow on cursor
    ref.current.rotation.y = THREE.MathUtils.damp(
      ref.current.rotation.y,
      pointer.x * 0.35,
      4,
      dt,
    );
    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      -pointer.y * 0.2,
      4,
      dt,
    );
  });

  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.9}>
      <mesh ref={ref}>
        <planeGeometry args={[3.4, 3.4]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </Float>
  );
}

function GlowRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.z += dt * 0.15;
  });
  return (
    <mesh ref={ref} position={[0, 0, -0.6]}>
      <ringGeometry args={[1.85, 1.95, 96]} />
      <meshBasicMaterial color="#7dc04b" transparent opacity={0.55} side={THREE.DoubleSide} />
    </mesh>
  );
}

function DashedRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.z -= dt * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, 0, -0.7]}>
      <ringGeometry args={[2.25, 2.27, 96]} />
      <meshBasicMaterial color="#f97316" transparent opacity={0.45} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const green = new THREE.Color("#7dc04b");
    const orange = new THREE.Color("#fb8a3a");
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.9;
      positions[i * 3 + 0] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(phi) * r * 0.6;
      positions[i * 3 + 2] = Math.sin(theta) * r * 0.4 - 1.2;

      const c = Math.random() < 0.65 ? green : orange;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

function Leaf({
  position,
  color = "#6bb534",
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color?: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.18;
    ref.current.rotation.z = Math.sin(t * 0.7) * 0.4;
    ref.current.rotation.y = t * 0.6;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.18, 12, 8]} />
      <meshStandardMaterial
        color={color}
        roughness={0.45}
        metalness={0.1}
        emissive={color}
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 6]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, -2, 4]} intensity={0.4} color="#fb8a3a" />

      <Particles />
      <GlowRing />
      <DashedRing />
      <ProductPlane />

      <Leaf position={[2.2, 0.8, 0.3]} color="#7dc04b" speed={1.1} />
      <Leaf position={[-2.4, -0.6, 0.4]} color="#fb8a3a" scale={0.8} speed={0.9} />
      <Leaf position={[1.8, -1.4, -0.3]} color="#55a125" scale={1.1} speed={1.3} />
      <Leaf position={[-2.0, 1.4, -0.2]} color="#fdb272" scale={0.7} speed={1.05} />
      <Leaf position={[0.4, 2.4, -0.5]} color="#90d095" scale={0.6} speed={0.8} />

      <Environment preset="sunset" />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
