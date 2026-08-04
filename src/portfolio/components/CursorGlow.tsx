import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Soft light that follows the cursor (mouse spotlight effect). */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 140, damping: 26, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 140, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] h-[34rem] w-[34rem] -ml-[17rem] -mt-[17rem] rounded-full mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(0,245,212,0.09) 0%, rgba(123,97,255,0.07) 32%, transparent 68%)",
      }}
    />
  );
}
