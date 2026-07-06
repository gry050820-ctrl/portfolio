"use client";

import { motion } from "framer-motion";

/**
 * Subtle radial glow positioned in the upper-right third of the Hero.
 * A single, restrained atmospheric element — not a light show.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Primary glow — brand color, very low opacity */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(108,92,231,0.12) 0%, rgba(108,92,231,0.04) 40%, transparent 70%)",
          top: "-15%",
          right: "-10%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Secondary glow — cooler tone, bottom-left */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          bottom: "-5%",
          left: "-8%",
        }}
      />

      {/* Optional: ultra-subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
