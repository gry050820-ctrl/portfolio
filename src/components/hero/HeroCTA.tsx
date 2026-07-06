"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { getPath } from "@/lib/utils";

interface HeroCTAProps {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  delay?: number;
}

/**
 * Two CTA buttons: primary (filled) + secondary (outlined).
 * "进入作品展厅 →" + "下载简历 PDF"
 */
export function HeroCTA({
  primary,
  secondary,
  delay = 0.55,
}: HeroCTAProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Button variant="primary" size="lg" href={primary.href.startsWith("#") ? primary.href : getPath(primary.href)}>
        {primary.label}
        <span className="ml-1">&rarr;</span>
      </Button>
      <Button variant="secondary" size="lg" href={secondary.href.startsWith("#") ? secondary.href : getPath(secondary.href)}>
        {secondary.label}
      </Button>
    </motion.div>
  );
}
