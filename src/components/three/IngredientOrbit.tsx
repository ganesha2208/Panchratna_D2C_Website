"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { panchratna } from "@/lib/product";

const COLORS = ["#7dc04b", "#a26c3d", "#fb8a3a", "#f97316", "#90d095", "#fdb272"];

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.4;
    ref.current.rotation.x += dt * 0.15;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial
          color="#55a125"
          emissive="#7dc04b"
          emissiveIntensity={0.55}
          roughness={0.3}
          metalness={0.6}
          flatShading
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, tilt, color }: { radius: number; tilt: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.z += dt * 0.05;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
    </mesh>
  );
}

function IngredientNode({
  index,
  total,
  radius,
  speed,
  tilt,
  color,
  label,
  marathi,
  percent,
  icon,
}: {
  index: number;
  total: number;
  radius: number;
  speed: number;
  tilt: number;
  color: string;
  label: string;
  marathi: string;
  percent: number;
  icon: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const offset = (index / total) * Math.PI * 2;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t) * radius * Math.sin(tilt);
    ref.current.position.z = Math.sin(t) * radius * Math.cos(tilt);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.32, 24, 18]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
      <Html center distanceFactor={6} zIndexRange={[20, 0]}>
        <div className="pointer-events-none flex w-44 -translate-y-14 flex-col items-center gap-1 text-center">
          <div className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-800 shadow-soft ring-1 ring-brand-100 backdrop-blur">
            <span className="mr-1.5">{icon}</span>
            {label}
          </div>
          <div className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-glow">
            {percent}% · {marathi}
          </div>
        </div>
      </Html>
    </group>
  );
}

function Particles({ count = 140 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 3;
      const a = Math.random() * Math.PI * 2;
      arr[i * 3 + 0] = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = Math.sin(a) * r - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#7dc04b" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const ings = panchratna.ingredients;

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={1.6} color="#7dc04b" distance={8} />
      <directionalLight position={[5, 6, 4]} intensity={0.8} />

      <Particles />
      <OrbitRing radius={2.2} tilt={Math.PI / 2} color="#6bb534" />
      <OrbitRing radius={2.9} tilt={Math.PI / 2.4} color="#f97316" />
      <OrbitRing radius={3.6} tilt={Math.PI / 2.8} color="#90d095" />

      <Core />

      {ings.map((ing, i) => (
        <IngredientNode
          key={ing.name}
          index={i}
          total={ings.length}
          radius={[2.2, 2.9, 3.6, 2.5, 3.2, 2.8][i]}
          speed={[0.35, 0.3, 0.25, 0.4, 0.28, 0.32][i]}
          tilt={[0.25, 0.6, 0.4, 0.15, 0.55, 0.3][i]}
          color={COLORS[i % COLORS.length]}
          label={ing.name}
          marathi={ing.marathi}
          percent={ing.percent}
          icon={ing.icon}
        />
      ))}
    </>
  );
}

export default function IngredientOrbit() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 7.5], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
