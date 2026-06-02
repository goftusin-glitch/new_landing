/**
 * Central SEO keyword strategy for GOFTUS.
 *
 * Keywords were chosen from commercial-intent search research in the
 * AI automation / AI agents space across the markets GOFTUS serves
 * (US, UK, Europe, UAE/Dubai, Singapore, Malaysia, and more). They lean on
 * high-intent, conversion-driven phrases ("AI automation agency",
 * "AI agent development company", "hire AI developers") plus long-tail and
 * geo-modified variants, which together account for the majority of
 * commercial search and convert better than broad informational terms.
 */

/* ----------------------------- target markets ---------------------------- */
// Countries/regions GOFTUS targets. Used for geo-modified keywords and the
// Organization `areaServed` structured data.
export const TARGET_MARKETS = [
  "United States",
  "United Kingdom",
  "Europe",
  "Germany",
  "France",
  "United Arab Emirates",
  "Dubai",
  "Abu Dhabi",
  "Saudi Arabia",
  "Qatar",
  "Singapore",
  "Malaysia",
  "Australia",
  "Canada",
  "India",
] as const;

// Short, human-readable list for visible copy and meta descriptions.
export const MARKETS_LABEL = "the US, UK, Europe, Dubai, Singapore & Malaysia";

// Geo terms appended to keyword lists (the highest-value markets for search).
const GEO_TERMS = [
  "USA",
  "United States",
  "UK",
  "Europe",
  "Germany",
  "Dubai",
  "UAE",
  "Middle East",
  "Singapore",
  "Malaysia",
];

/* ------------------------------- keyword sets ----------------------------- */

// Brand + flagship commercial-intent terms shared across the whole site.
export const CORE_KEYWORDS = [
  "AI automation agency",
  "AI agent development company",
  "agentic AI",
  "agentic AI company",
  "AI automation services",
  "custom AI solutions",
  "AI consulting",
  "build AI agents",
  "hire AI developers",
  "enterprise AI automation",
  "business process automation",
  "intelligent automation",
  "AI chatbot development",
  "workflow automation",
  "generative AI development",
  "AI development company",
];

export const AGENTS_KEYWORDS = [
  "AI agent development",
  "custom AI agents",
  "AI agents for business",
  "multi-agent systems",
  "AI chatbot development",
  "voice AI agents",
  "customer support AI agent",
  "sales AI agent",
  "WhatsApp AI agent",
  "RAG AI agents",
  "autonomous AI agents",
  "AI agent development company",
];

export const SERVICES_KEYWORDS = [
  "AI automation services",
  "AI product development",
  "AI consulting services",
  "intelligent automation",
  "business process automation",
  "workflow automation",
  "custom AI solutions",
  "enterprise AI integration",
  "generative AI development",
  "AI strategy consulting",
  "AI implementation services",
];

export const PRODUCTS_KEYWORDS = [
  "AI products",
  "AI automation tools",
  "AI agent products",
  "AI chatbot",
  "AI knowledge assistant",
  "AI SaaS products",
  "ready-made AI solutions",
];

export const ABOUT_KEYWORDS = [
  "AI automation company",
  "AI agency founders",
  "agentic AI experts",
  "AI development team",
  "AI startup",
  "full-stack AI engineers",
];

export const CONTACT_KEYWORDS = [
  "hire AI developers",
  "build AI agent",
  "AI automation agency contact",
  "AI consulting",
  "book AI demo",
  "AI development quote",
  "talk to AI experts",
];

export const BLOG_KEYWORDS = [
  "AI agents blog",
  "agentic AI insights",
  "AI automation guides",
  "AI for business",
  "AI product development tips",
];

/* --------------------------------- helpers -------------------------------- */

/** Combine keyword groups, append geo-modified variants, and dedupe. */
export function keywords(...groups: string[][]): string {
  const base = Array.from(new Set(groups.flat()));
  // Geo-modify the first few flagship terms (avoids an unwieldy meta tag).
  const flagship = base.slice(0, 4);
  const geoVariants = flagship.flatMap((term) =>
    GEO_TERMS.slice(0, 6).map((geo) => `${term} ${geo}`)
  );
  return Array.from(new Set([...base, ...GEO_TERMS, ...geoVariants])).join(", ");
}

/** `areaServed` array for Organization/Service structured data. */
export const AREA_SERVED = TARGET_MARKETS.map((name) => ({
  "@type": "Country",
  name,
}));
