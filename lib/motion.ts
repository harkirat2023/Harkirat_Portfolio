export const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuint: [0.83, 0, 0.17, 1] as const,
  soft: [0.4, 0, 0.2, 1] as const,
};
export const duration = { micro: 0.14, ui: 0.26, panel: 0.42, hero: 0.9, scene: 1.1 } as const;
export const springs = { ui: { type: "spring", stiffness: 260, damping: 30, mass: 0.8 }, drag: { type: "spring", stiffness: 120, damping: 18 } } as const;
export const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: duration.ui, ease: easing.outExpo } } };
export const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
export const maskReveal = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: duration.hero, ease: easing.outExpo } } };
