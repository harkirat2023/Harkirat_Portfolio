import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 220, damping: 24, mass: 0.6 });
  const ry = useSpring(my, { stiffness: 220, damping: 24, mass: 0.6 });

  useEffect(() => {
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (coarse) return;
    const onMove = (e) => {
      mx.set(e.clientX - 19); // ring half-size = center on cursor
      my.set(e.clientY - 19);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3.5}px, ${e.clientY - 3.5}px)`;
      }
    };
    const onOver = (e) => {
      if (e.target.closest("a, button, .btn, .tag-chip, .project, .role-card, .stat")) {
        ringRef.current?.classList.add("hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest("a, button, .btn, .tag-chip, .project, .role-card, .stat")) {
        ringRef.current?.classList.remove("hover");
      }
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [mx, my]);

  return (
    <>
      <motion.div className="cursor-dot fixed left-0 top-0 z-[1100] size-[7px] bg-accent" ref={dotRef} aria-hidden="true" />
      <motion.div
        className="cursor-ring fixed left-0 top-0 z-[1100] size-[38px]"
        ref={ringRef}
        style={{ x: rx, y: ry }}
        aria-hidden="true"
      />
    </>
  );
}

