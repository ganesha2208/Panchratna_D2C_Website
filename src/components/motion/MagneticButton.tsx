"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";
import Link from "next/link";

type CommonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

type Props =
  | (CommonProps & { href: string; onClick?: never; type?: never })
  | (CommonProps & { href?: undefined; onClick?: () => void; type?: "button" | "submit" });

export default function MagneticButton({
  children,
  className,
  strength = 18,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set((mx / (r.width / 2)) * strength);
    y.set((my / (r.height / 2)) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Inner = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex">
      {children}
    </motion.span>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-flex"
    >
      {"href" in rest && rest.href ? (
        <Link href={rest.href} className={className}>
          {Inner}
        </Link>
      ) : (
        <button
          type={(rest as { type?: "button" | "submit" }).type ?? "button"}
          onClick={(rest as { onClick?: () => void }).onClick}
          className={className}
        >
          {Inner}
        </button>
      )}
    </div>
  );
}
