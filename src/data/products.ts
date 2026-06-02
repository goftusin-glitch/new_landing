import {
  BookOpen, Mic, MessageCircle, Database, Workflow, Bot, Sparkles, Rocket,
  Boxes, Headphones, Zap, Plug, Brain, Cpu, type LucideIcon,
} from "lucide-react";

export interface Product {
  id: string;
  name: string;
  tag: string;
  status: string; // "Live" | "Beta" | "Available"
  icon: string; // key into PRODUCT_ICONS
  desc: string;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  href?: string;
}

/** Icons selectable for a product. The stored value is the string key. */
export const PRODUCT_ICONS: Record<string, LucideIcon> = {
  BookOpen, Mic, MessageCircle, Database, Workflow, Bot, Sparkles, Rocket,
  Boxes, Headphones, Zap, Plug, Brain, Cpu,
};

export const PRODUCT_STATUSES = ["Live", "Beta", "Available"] as const;

export const products: Product[] = [
  {
    id: "ml-book",
    name: "Machine Learning — by Tamil",
    tag: "Book",
    status: "Available",
    icon: "BookOpen",
    featured: true,
    desc: "A hands-on Machine Learning book that breaks core ML concepts into clear, practical lessons — built to take readers from fundamentals to building real models.",
    tags: ["Education", "Machine Learning", "Print"],
  },
  {
    id: "voice-agent",
    name: "Voice Support Agent",
    tag: "AI Agent",
    status: "Live",
    icon: "Mic",
    desc: "A real-time voice agent that answers calls, resolves common requests, and escalates the rest — connected to your tools.",
    tags: ["Voice", "Support", "Realtime"],
  },
  {
    id: "whatsapp-agent",
    name: "WhatsApp Commerce Agent",
    tag: "AI Agent",
    status: "Live",
    icon: "MessageCircle",
    desc: "Conversational sales and support on WhatsApp — product discovery, orders, and FAQs handled end to end.",
    tags: ["WhatsApp", "Sales", "Support"],
  },
  {
    id: "rag-assistant",
    name: "RAG Knowledge Assistant",
    tag: "AI Product",
    status: "Live",
    icon: "Database",
    desc: "An assistant grounded in your own documents and data, giving teams and customers accurate, sourced answers.",
    tags: ["RAG", "Search", "Docs"],
  },
  {
    id: "automation-suite",
    name: "Workflow Automation Suite",
    tag: "Automation",
    status: "Live",
    icon: "Workflow",
    desc: "Connect your apps and let agents run repetitive, multi-step processes automatically with a full audit trail.",
    tags: ["Automation", "Integrations"],
  },
  {
    id: "agent-platform",
    name: "Custom Agent Platform",
    tag: "Platform",
    status: "Beta",
    icon: "Bot",
    desc: "The foundation we build on — orchestration, memory, tool-calling, and guardrails for production-grade AI agents.",
    tags: ["Agents", "Orchestration"],
  },
];
