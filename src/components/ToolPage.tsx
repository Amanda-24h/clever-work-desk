import { useState, type ReactNode } from "react";
import { Sparkles, Copy, Check, RotateCcw, Loader2 } from "lucide-react";
import { ResponsibleAIDisclaimer } from "./Disclaimer";

export function ToolPage({
  title,
  description,
  inputLabel,
  inputPlaceholder,
  inputRows = 8,
  generateLabel = "Generate",
  renderOutput,
  children,
  minDelayMs = 1400,
}: {
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputRows?: number;
  generateLabel?: string;
  renderOutput: (input: string) => ReactNode;
  children?: ReactNode;
  minDelayMs?: number;
}) {
  const [input, setInput] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [lastInput, setLastInput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!input.trim() || state === "loading") return;
    setLastInput(input);
    setState("loading");
    setCopied(false);
    window.setTimeout(() => setState("done"), minDelayMs + Math.random() * 800);
  };

  const copyOutput = async () => {
    const el = document.getElementById("ai-output");
    if (!el) return;
    try {
      await navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input panel */}
        <section
          aria-label="Input"
          className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
        >
          <label htmlFor="tool-input" className="text-sm font-semibold text-card-foreground">
            {inputLabel}
          </label>
          <textarea
            id="tool-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={inputRows}
            placeholder={inputPlaceholder}
            className="mt-3 w-full flex-1 resize-y rounded-xl border border-input bg-background p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {children}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={generate}
              disabled={!input.trim() || state === "loading"}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {state === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {state === "loading" ? "Generating…" : generateLabel}
            </button>
            {state === "done" && (
              <button
                onClick={() => {
                  setState("idle");
                  setInput("");
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
              >
                <RotateCcw className="h-4 w-4" />
                Start over
              </button>
            )}
          </div>
        </section>

        {/* Output panel */}
        <section
          aria-label="AI output"
          aria-live="polite"
          className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-card-foreground">AI result</h2>
            {state === "done" && (
              <button
                onClick={copyOutput}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-accent"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>

          <div className="mt-3 flex-1">
            {state === "idle" && (
              <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 p-8 text-center">
                <Sparkles className="h-8 w-8 text-muted-foreground/60" />
                <p className="mt-3 text-sm font-medium text-muted-foreground">
                  Your AI-generated result will appear here
                </p>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  Describe what you need on the left, then press {generateLabel}.
                </p>
              </div>
            )}

            {state === "loading" && (
              <div className="space-y-3 rounded-xl border border-border bg-muted/40 p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  AI is working on it…
                </p>
                <div className="h-3.5 w-full rounded-full shimmer" />
                <div className="h-3.5 w-11/12 rounded-full shimmer" />
                <div className="h-3.5 w-4/5 rounded-full shimmer" />
                <div className="h-3.5 w-3/5 rounded-full shimmer" />
              </div>
            )}

            {state === "done" && (
              <div
                id="ai-output"
                className="rounded-xl border border-border bg-background p-5 text-sm leading-relaxed text-foreground"
              >
                {renderOutput(lastInput)}
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="mt-6">
        <ResponsibleAIDisclaimer />
      </div>
    </div>
  );
}
