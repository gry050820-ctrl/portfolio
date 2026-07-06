"use client";

import { motion } from "framer-motion";

interface HeroTitleProps {
  text: string;
  delay?: number;
}

/**
 * Main hero title — large, bold, the focal point.
 * "把 AI 做成产品的人"
 */
export function HeroTitle({ text, delay = 0.25 }: HeroTitleProps) {
  return (
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-text-primary leading-tight"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {text}
    </motion.h1>
  );
}
