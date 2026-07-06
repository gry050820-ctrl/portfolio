"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  interactive?: boolean;
  children: React.ReactNode;
}

export function Card({
  interactive = false,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-lg border border-border bg-bg-secondary p-6",
        "transition-colors duration-300 ease-out",
        interactive && "cursor-pointer hover:bg-bg-hover hover:border-border-hover",
        className,
      )}
      whileHover={interactive ? { y: -2, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
