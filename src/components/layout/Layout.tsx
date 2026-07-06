import { Nav } from "./Nav";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
