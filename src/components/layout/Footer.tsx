import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site.config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-tertiary">
            &copy; {year} {siteConfig.name}. Built with care.
          </p>
          <div className="flex items-center gap-6">
            {siteConfig.contact.email && (
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
              >
                Email
              </a>
            )}
            {siteConfig.contact.github && (
              <a
                href={siteConfig.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
