import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AutomationPromptModal } from "./AutomationPromptModal";
import { prefetchPosts } from "@/lib/backend-api";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    // Only prefetch when not already on the blog pages — blog handles its own fetch
    if (!pathname.startsWith("/blog")) {
      prefetchPosts();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-clip">
      <AutomationPromptModal />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
