import { useLocation } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitAutomationInquiry } from "@/lib/backend-api";

const improveChoices = [
  "Customer follow-ups",
  "Sales tracking",
  "Daily operations",
  "Reports and data",
  "Staff coordination",
  "Not sure yet",
] as const;

const currentToolChoices = [
  "Excel / Sheets",
  "Email / calls",
  "WhatsApp",
  "Existing software",
  "Mixed tools",
] as const;

export function AutomationPromptModal() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [improveChoice, setImproveChoice] = useState("");
  const [currentToolChoice, setCurrentToolChoice] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () =>
      Boolean(
        improveChoice &&
          currentToolChoice &&
          company.trim().length > 1 &&
          email.trim().length > 4 &&
          email.includes("@"),
      ),
    [improveChoice, currentToolChoice, company, email],
  );

  useEffect(() => {
    if (location.pathname !== "/") {
      setOpen(false);
      return;
    }
    const timer = window.setTimeout(() => setOpen(true), 5000);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await submitAutomationInquiry({
        choice: improveChoice,
        fullName: company.trim(),
        email: email.trim(),
        company: company.trim(),
        exploration: improveChoice,
        description: `Current workflow: ${currentToolChoice}`,
      });
      setOpen(false);
      setImproveChoice("");
      setCurrentToolChoice("");
      setCompany("");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[94vw] max-w-2xl rounded-[2rem] border-accent/30 bg-background p-8 text-foreground shadow-2xl">
        <DialogHeader className="space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent">
            Free Workflow Check
          </p>
          <DialogTitle className="font-typemachine text-3xl leading-tight">
            Can your team work smarter?
          </DialogTitle>
          <DialogDescription>
            Get a free workflow check and see where software, AI, or automation can help your
            business.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              label="1. What do you want to improve?"
              value={improveChoice}
              onChange={setImproveChoice}
              options={improveChoices}
            />
            <SelectField
              label="2. How do you manage it now?"
              value={currentToolChoice}
              onChange={setCurrentToolChoice}
              options={currentToolChoices}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              label="3. Company name"
              value={company}
              onChange={setCompany}
              placeholder="Enter company name"
            />
            <TextField
              label="4. Work email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="h-12 flex-1 rounded-xl bg-foreground px-5 font-bold text-background transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Get my free check"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-12 rounded-xl bg-surface px-5 font-bold ring-1 ring-border transition-colors hover:bg-muted"
            >
              Maybe later
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl bg-background px-4 text-sm ring-1 ring-border focus:outline-none focus:ring-accent"
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl bg-background px-4 text-sm ring-1 ring-border focus:outline-none focus:ring-accent"
      />
    </label>
  );
}
