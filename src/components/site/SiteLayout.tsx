import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AutomationPromptModal } from "./AutomationPromptModal";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-clip">
      <AutomationPromptModal />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
