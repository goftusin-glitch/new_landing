export interface PostSection {
  heading: string;
  paragraphs: string[];
}

export interface Post {
  slug: string;
  title: string;
  cat: string;
  author: string;
  /** Human-readable date for display. */
  date: string;
  /** ISO 8601 date for SEO (article:published_time / datePublished). */
  iso: string;
  read: string;
  excerpt: string;
  featured?: boolean;
  intro: string;
  sections: PostSection[];
}

export const posts: Post[] = [
  {
    slug: "narrow-deep-agents",
    title: "The case for narrow, deep agents",
    cat: "AI Agents",
    author: "Thirumurugan",
    date: "May 12, 2026",
    iso: "2026-05-12",
    read: "8 min",
    featured: true,
    excerpt:
      "Why specialist agents outperform monolithic models in production environments — and how to architect for it.",
    intro:
      "It's tempting to build one giant agent that can do everything. In practice, the agents that survive contact with real users are narrow, deep, and boring in the best way — they do one job extremely well.",
    sections: [
      {
        heading: "Why one big agent fails",
        paragraphs: [
          "A single agent with twenty tools and a sprawling prompt is hard to reason about and harder to debug. Every new capability you bolt on increases the surface area for the model to get confused, pick the wrong tool, or hallucinate a step.",
          "Worse, you can't measure it. When a do-everything agent fails, you rarely know which responsibility broke, so every fix is a guess.",
        ],
      },
      {
        heading: "Narrow agents are testable",
        paragraphs: [
          "When an agent owns a single, well-defined job — qualify this lead, answer from these docs, reconcile this invoice — you can write evals for it, watch its metrics, and improve it in isolation.",
          "Narrow scope also means a shorter prompt, fewer tools, and a much smaller space for things to go wrong.",
        ],
      },
      {
        heading: "Compose, don't combine",
        paragraphs: [
          "The right way to get broad capability is orchestration: a coordinator routes work to the specialist that owns it, and each specialist stays small. You get the breadth of a big system with the reliability of small parts.",
          "Start narrow, prove it in production, then compose. That order matters more than any framework choice.",
        ],
      },
    ],
  },
  {
    slug: "tool-calling-at-scale",
    title: "Tool-calling at scale: lessons from building agents",
    cat: "Agentic AI",
    author: "Bharathvaj",
    date: "Apr 28, 2026",
    iso: "2026-04-28",
    read: "6 min",
    excerpt:
      "What we've learned wiring agents into real business tools — and the failure modes that only show up in production.",
    intro:
      "Tool-calling is where agents meet reality. A model that reasons beautifully is useless if it calls the wrong API or fumbles the arguments. Here's what holds up when real traffic hits.",
    sections: [
      {
        heading: "Name and describe tools like a user would",
        paragraphs: [
          "Models pick tools based on names and descriptions, so write them for a reader, not a compiler. Clear, specific descriptions cut wrong-tool errors dramatically.",
          "Keep the tool count per agent small. If you need many tools, that's usually a sign you need more than one agent.",
        ],
      },
      {
        heading: "Validate everything the model produces",
        paragraphs: [
          "Treat tool arguments as untrusted input. Validate against a schema, and return clear, structured errors the agent can recover from instead of failing silently.",
          "A good error message is a second chance for the agent to get it right.",
        ],
      },
      {
        heading: "Make every call observable",
        paragraphs: [
          "Log every tool call, its arguments, and its result. When something breaks at 2am, traces are the difference between a five-minute fix and a five-hour mystery.",
        ],
      },
    ],
  },
  {
    slug: "back-office-automation-multi-agent",
    title: "Automating back-office work with multi-agent ops",
    cat: "Automation",
    author: "GOFTUS Team",
    date: "Apr 14, 2026",
    iso: "2026-04-14",
    read: "5 min",
    excerpt:
      "The repetitive, multi-step processes hiding in every business — and how agents quietly take them over.",
    intro:
      "The highest-ROI automation is rarely glamorous. It's the invoice that gets re-keyed, the form that gets routed, the report that gets assembled by hand every week.",
    sections: [
      {
        heading: "Find the repeated steps",
        paragraphs: [
          "Start by mapping a process that happens the same way many times a week. Those are the jobs where an agent pays for itself fastest.",
        ],
      },
      {
        heading: "Keep a human in the loop where it counts",
        paragraphs: [
          "Automate the busywork, but route anything risky or ambiguous to a person. The goal is to remove drudgery, not accountability.",
        ],
      },
      {
        heading: "Measure time returned",
        paragraphs: [
          "Track the hours the automation gives back. That's the number that earns trust and unlocks the next process.",
        ],
      },
    ],
  },
  {
    slug: "mvp-to-product-ai",
    title: "From MVP to product: shipping AI that sticks",
    cat: "Product Development",
    author: "Thirumurugan",
    date: "Apr 02, 2026",
    iso: "2026-04-02",
    read: "10 min",
    excerpt:
      "Most AI demos die after the wow moment. Here's how we turn a prototype into something people keep using.",
    intro:
      "A demo proves something is possible. A product proves it's reliable. The gap between them is where most AI projects quietly stall.",
    sections: [
      {
        heading: "Ship the smallest useful thing",
        paragraphs: [
          "Pick one workflow and make the AI genuinely better than the status quo at it. Narrow and excellent beats broad and mediocre every time.",
        ],
      },
      {
        heading: "Design for the wrong answer",
        paragraphs: [
          "Models are wrong sometimes. Great AI products make mistakes cheap to catch and easy to correct, with confidence signals and graceful fallbacks.",
        ],
      },
      {
        heading: "Close the loop",
        paragraphs: [
          "Feed real usage back into evals and prompts. The products that stick are the ones that visibly get better the more they're used.",
        ],
      },
    ],
  },
  {
    slug: "build-voice-agent-30-minutes",
    title: "Build a voice agent in 30 minutes",
    cat: "Tutorials",
    author: "Bharathvaj",
    date: "Mar 19, 2026",
    iso: "2026-03-19",
    read: "12 min",
    excerpt:
      "A practical walkthrough for standing up a working voice agent — from speech in to action out.",
    intro:
      "Voice agents feel like magic, but the pipeline is straightforward once you see the pieces. Here's the shortest path to something that actually answers a call.",
    sections: [
      {
        heading: "The pipeline",
        paragraphs: [
          "Speech-to-text turns audio into words, the model reasons and calls tools, and text-to-speech turns the answer back into a voice. Keep each stage swappable.",
        ],
      },
      {
        heading: "Latency is the product",
        paragraphs: [
          "In voice, every hundred milliseconds is felt. Stream wherever you can and keep the model's job tight so replies come back fast.",
        ],
      },
      {
        heading: "Handle the handoff",
        paragraphs: [
          "Decide early when the agent should escalate to a human, and make that transition smooth. Knowing its limits is what makes a voice agent trustworthy.",
        ],
      },
    ],
  },
  {
    slug: "lessons-first-ai-products",
    title: "What we learned building our first AI products",
    cat: "Case Studies",
    author: "GOFTUS Team",
    date: "Mar 04, 2026",
    iso: "2026-03-04",
    read: "7 min",
    excerpt:
      "Honest notes from shipping our earliest products — what worked, what we'd do differently, and what stuck.",
    intro:
      "When we started GOFTUS in 2025, we shipped small on purpose. Those first products taught us more than any amount of planning could have.",
    sections: [
      {
        heading: "Small bets, fast feedback",
        paragraphs: [
          "Launching small let us learn what users actually needed instead of what we assumed they wanted. Most of our roadmap came from that feedback, not a whiteboard.",
        ],
      },
      {
        heading: "Reliability beats cleverness",
        paragraphs: [
          "The features people loved weren't the flashiest — they were the ones that worked every single time. We learned to spend our effort there.",
        ],
      },
      {
        heading: "Build for production from day one",
        paragraphs: [
          "Guardrails, logging, and evals aren't things to add later. Building them in early is what let us scale from small products to custom AI for businesses.",
        ],
      },
    ],
  },
  {
    slug: "rag-that-works-in-production",
    title: "RAG architectures that actually work in production",
    cat: "Agentic AI",
    author: "Bharathvaj",
    date: "Feb 22, 2026",
    iso: "2026-02-22",
    read: "9 min",
    excerpt:
      "Retrieval-augmented generation is easy to demo and hard to productionize. Here's what separates the two.",
    intro:
      "RAG looks simple: retrieve some context, hand it to the model, get a grounded answer. The hard part is everything around that loop.",
    sections: [
      {
        heading: "Retrieval quality is everything",
        paragraphs: [
          "If the right chunk isn't retrieved, the model can't use it. Good chunking, hybrid search, and re-ranking matter far more than the model you pick.",
        ],
      },
      {
        heading: "Ground every claim",
        paragraphs: [
          "Cite sources and design the prompt so the model answers from the retrieved context, not its memory. Sourced answers are what make RAG trustworthy.",
        ],
      },
      {
        heading: "Keep the index fresh",
        paragraphs: [
          "Stale data quietly erodes trust. A boring, reliable pipeline that keeps the index current beats a clever one that drifts.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
