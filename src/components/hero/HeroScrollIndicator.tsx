"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Breathing downward arrow that fades out on scroll.
 * Signals "there's more below" without being intrusive.
 */
export function HeroScrollIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setHidden(true);
      }
    };

    // Check initial position
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-xs text-text-tertiary">向下滚动探索</span>
          <motion.span
            className="text-text-tertiary text-lg"
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            &darr;
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
