"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getPath } from "@/lib/utils";

/**
 * Contact Section.
 *
 * Low-friction conversion: resume download + email + GitHub.
 * Closing reinforcement of the narrative.
 *
 * Answers: "Why is it worth contacting you?"
 */
export function ContactSection() {
  const { contact, hero } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      id={siteConfig.sections.contact}
      ref={ref}
      className="py-32 md:py-40"
    >
      <Container>
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Title */}
          <p className="text-xs uppercase tracking-widest text-text-tertiary mb-3">
            Contact
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            为什么值得联系我？
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-10">
            不是一个"会写 PRD 的求职者"——
            而是一个能发现问题、快速验证、用 AI 加速落地、
            并持续迭代的产品实践者。如果你正在寻找一个
            真正能把想法变成产品的人，我们可以聊聊。
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="primary" size="lg" href={getPath(hero.cta.secondary.href)}>
              下载简历 PDF
            </Button>
            {contact.email && (
              <Button
                variant="secondary"
                size="lg"
                href={`mailto:${contact.email}`}
              >
                发送邮件
              </Button>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 text-sm text-text-tertiary">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-text-secondary transition-colors"
              >
                {contact.email}
              </a>
            )}
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-secondary transition-colors"
              >
                GitHub
              </a>
            )}
            {contact.wechat && (
              <span className="text-text-tertiary">微信：见二维码</span>
            )}
          </div>

          {/* WeChat QR placeholder */}
          {!contact.wechat && (
            <p className="text-xs text-text-tertiary/60 mt-6">
              微信二维码 · 即将添加
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
