"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollToSection } from "@/lib/utils";
import { siteConfig } from "@/data/site.config";
import { Container } from "@/components/ui/Container";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 64);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      scrollToSection(href.slice(1));
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "nav-glass" : "bg-transparent",
        )}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 md:h-18">
            {/* Logo / Name */}
            <a
              href="#"
              className="text-base font-semibold text-text-primary hover:text-brand-light transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {siteConfig.name}
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {siteConfig.nav.links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={siteConfig.nav.resume.href}
                className="text-sm px-4 py-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
              >
                {siteConfig.nav.resume.label}
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-5 h-px bg-text-primary origin-center"
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block w-5 h-px bg-text-primary"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="block w-5 h-px bg-text-primary origin-center"
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              />
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg-primary/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {siteConfig.nav.links.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-xl text-text-secondary hover:text-text-primary transition-colors"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.06 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              href={siteConfig.nav.resume.href}
              className="mt-4 text-lg px-6 py-2 rounded-md border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ delay: 0.3 }}
            >
              {siteConfig.nav.resume.label}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
