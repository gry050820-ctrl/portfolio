"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Fixed top bar for project detail pages.
 * Shows back-to-lab link and the project context.
 */
export function ProjectDetailNav() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 nav-glass"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Container>
        <nav className="flex items-center h-14 md:h-16">
          <a
            href="/#lab"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <span className="text-brand-light">&larr;</span>
            返回 Product Lab
          </a>
        </nav>
      </Container>
    </motion.header>
  );
}
