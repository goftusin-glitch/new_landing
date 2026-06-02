import { useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { Mic, BrainCircuit, Wrench, Play, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Mic,
    title: "Input",
    text: "A voice, text, or API trigger enters the orchestrator and becomes the agent's goal.",
  },
  {
    icon: BrainCircuit,
    title: "Reason",
    text: "The model plans a path forward, reasoning over RAG memory and live business context.",
  },
  {
    icon: Wrench,
    title: "Tools",
    text: "It calls the right tools — CRM, ERP, code, browsers — to gather data and take action.",
  },
  {
    icon: Play,
    title: "Act",
    text: "Steps execute with guardrails, a full audit trail, and human-in-the-loop where it matters.",
  },
  {
    icon: RefreshCw,
    title: "Learn",
    text: "Outcomes feed back into memory and policies, so the system improves with every run.",
  },
];

/** A node on the spine that fills with the accent color once the scroll line reaches it. */
function TimelineNode({
  progress,
  threshold,
  Icon,
}: {
  progress: MotionValue<number>;
  threshold: number;
  Icon: LucideIcon;
}) {
  const [active, setActive] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setActive(v >= threshold));

  return (
    <div
      className={`grid place-items-center size-12 rounded-2xl ring-1 shadow-sm transition-colors duration-500 ${
        active
          ? "bg-accent text-accent-foreground ring-accent"
          : "bg-background text-accent ring-border"
      }`}
    >
      <Icon className="size-5" />
    </div>
  );
}

export function HowItWorks() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.8", "end 0.55"],
  });
  // Spine fills top-to-bottom as the section scrolls through the viewport.
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-surface border-y border-border py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl mb-12 lg:mb-14">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">How it works</span>
          <h2 className="font-typemachine text-4xl font-bold tracking-tight mt-4 mb-4">From signal to decision in seconds.</h2>
          <p className="text-muted-foreground">
            A unified command layer that handles authentication, memory, and error correction across your
            stack — every request flows through the same five stages.
          </p>
        </Reveal>

        <div ref={railRef} className="relative">
          {/* Spine track — left rail on mobile, centered on desktop */}
          <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-2 bottom-2 w-0.5 bg-border" />
          {/* Animated fill that grows with scroll */}
          <motion.div
            style={{ scaleY: fillScale }}
            className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-2 bottom-2 w-0.5 bg-accent origin-top"
          />

          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, i) => {
              const leftSide = i % 2 === 0;
              const threshold = (i + 0.5) / steps.length;
              return (
                <div
                  key={step.title}
                  className="relative pl-20 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-14 lg:items-center"
                >
                  {/* Node on the spine */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-0 lg:top-1/2 lg:-translate-y-1/2 z-10">
                    <TimelineNode progress={scrollYProgress} threshold={threshold} Icon={step.icon} />
                  </div>

                  {/* Short connector from spine to card (desktop) */}
                  <div
                    className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-0.5 w-10 bg-border ${
                      leftSide ? "right-1/2 mr-6" : "left-1/2 ml-6"
                    }`}
                  />

                  {/* Card */}
                  <Reveal
                    as="div"
                    from={leftSide ? "left" : "right"}
                    className={
                      leftSide
                        ? "lg:col-start-1 lg:flex lg:justify-end lg:pr-8"
                        : "lg:col-start-2 lg:pl-8"
                    }
                  >
                    <div className="w-full max-w-md text-center bg-background rounded-2xl p-5 ring-1 ring-border transition-colors hover:ring-accent">
                      <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                        Stage 0{i + 1}
                      </span>
                      <h4 className="font-typemachine font-bold text-xl mt-2 mb-1.5">{step.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">{step.text}</p>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
