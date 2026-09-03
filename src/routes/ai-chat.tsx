import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SendHorizonal, Loader2, Sparkles, User } from "lucide-react";
import { ResponsibleAIDisclaimer } from "../components/Disclaimer";

export const Route = createFileRoute("/ai-chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — AI Workplace Productivity Hub" },
      {
        name: "description",
        content: "Chat with an AI assistant to brainstorm, problem-solve, and get instant answers.",
      },
      { property: "og:title", content: "AI Chat — AI Workplace Productivity Hub" },
      {
        property: "og:description",
        content: "Chat with an AI assistant to brainstorm, problem-solve, and get instant answers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AIChatPage,
});

type Message = { role: "user" | "assistant"; text: string };

const cannedReplies = [
  "Great question. Based on what you've described, I'd suggest starting with the highest-impact item first: define a clear outcome, break it into two or three concrete steps, and set a short checkpoint to review progress. Would you like me to turn this into a task plan?",
  "Here's a quick breakdown: 1) Clarify the goal and constraints, 2) List the options with pros and cons, 3) Pick the lowest-risk option that meets your deadline, and 4) review results after one week. Want me to expand on any of these steps?",
  "I can help with that. A solid approach is to draft a short version first, get feedback from one stakeholder, and then refine. Iterating in small loops beats trying to perfect it in one pass. Shall I draft a first version for you?",
  "From what you've shared, the main trade-off is speed versus thoroughness. If the deadline is firm, prioritize the essentials and schedule a follow-up review. If quality matters more, negotiate the timeline early rather than late.",
];

const suggestions = [
  "Help me prepare for my performance review",
  "Brainstorm names for our new internal tool",
  "How do I prioritize a long to-do list?",
];

function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm your AI work assistant. Ask me anything — brainstorm ideas, get writing help, plan your day, or think through a problem.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const replyIndex = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setThinking(true);
    const reply = cannedReplies[replyIndex.current % cannedReplies.length];
    replyIndex.current += 1;
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      setThinking(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-8 sm:px-6">
      <header className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">AI Chat</h1>
        <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
          Brainstorm, problem-solve, and get instant AI answers — right in your workspace.
        </p>
      </header>

      <div className="flex min-h-[480px] flex-1 flex-col rounded-2xl border border-border bg-card shadow-sm">
        <div
          className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6"
          aria-live="polite"
          aria-label="Conversation"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </span>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.text}
              </div>
              {m.role === "user" && (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                  <User className="h-4 w-4 text-accent-foreground" />
                </span>
              )}
            </div>
          ))}
          {thinking && (
            <div className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                Thinking…
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 px-4 pb-3 sm:px-6">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border p-3 sm:p-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message…"
            aria-label="Message"
            className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label="Send message"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizonal className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>

      <div className="mt-5">
        <ResponsibleAIDisclaimer />
      </div>
    </div>
  );
}
