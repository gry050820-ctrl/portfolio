"use client";

import { motion } from "framer-motion";

interface HeroGreetingProps {
  text: string;
  delay?: number;
}

/**
 * Small greeting line above the main title.
 * "你好，我是 柚子"
 */
export function HeroGreeting({ text, delay = 0.1 }: HeroGreetingProps) {
  return (
    <motion.p
      className="text-sm md:text-base text-text-tertiary mb-4 tracking-wide"
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
