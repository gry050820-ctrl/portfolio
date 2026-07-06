"use client";

import { motion } from "framer-motion";

interface HeroSubtitleProps {
  text: string;
  delay?: number;
}

/**
 * Capability tagline below the main title.
 * "擅长需求拆解 · 快速验证 · AI 工具链搭建 · 产品落地"
 */
export function HeroSubtitle({ text, delay = 0.4 }: HeroSubtitleProps) {
  return (
    <motion.p
      className="text-base md:text-lg text-text-secondary mt-6 max-w-lg mx-auto leading-relaxed"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {text}
    </motion.p>
  );
}
