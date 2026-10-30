"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
export function Reveal({ children, className }: { children: ReactNode; className?: string }) { const reduce = useReducedMotion(); return <motion.div className={cn(className)} initial={{ opacity: 0, y: reduce ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12% 0px" }} transition={{ duration: reduce ? 0.2 : 0.42, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>; }
