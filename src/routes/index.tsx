import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Clock3,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { ResponsibleAIDisclaimer } from "../components/Disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Hub" },
      {
        name: "description",
        content:
          "Your AI workspace: draft emails, summarize meetings, plan tasks, research topics, and chat with an AI assistant.",
      },
      { property: "og:title", content: "Dashboard — AI Workplace Productivity Hub" },
      {
        property: "og:description",
        content:
          "Your AI workspace: draft emails, summarize meetings, plan tasks, research topics, and chat with an AI assistant.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email-writer",
    icon: Mail,
    title: "Email Writer",
    description: "Draft polished, professional emails in seconds from a few bullet points.",
  },
  {
    to: "/meeting-summarizer",
    icon: FileText,
    title: "Meeting Summarizer",
    description: "Turn raw meeting notes or transcripts into clear summaries and action items.",
  },
  {
    to: "/task-planner",
    icon: ListChecks,
    title: "Task Planner",
    description: "Break goals into prioritized, actionable tasks with realistic timelines.",
  },
  {
    to: "/research-assistant",
    icon: Search,
    title: "Research Assistant",
    description: "Get structured research briefs on any topic, with key points and sources.",
  },
  {
    to: "/ai-chat",
    icon: MessageSquare,
    title: "AI Chat",
    description: "Ask anything — brainstorm, problem-solve, and get instant AI answers.",
  },
] as const;

const stats = [
  { icon: Zap, label: "AI tasks completed", value: "1,284", trend: "+12% this week" },
  { icon: Clock3, label: "Hours saved", value: "96.5", trend: "+8% this week" },
  { icon: TrendingUp, label: "Productivity score", value: "87", trend: "+4 pts" },
];

const recentActivity = [
  { tool: "Email Writer", item: "Q3 budget follow-up to finance team", time: "2 min ago" },
  { tool: "Meeting Summarizer", item: "Weekly product sync — 5 action items", time: "1 hr ago" },
  { tool: "Task Planner", item: "Website relaunch plan — 14 tasks", time: "3 hrs ago" },
  { tool: "AI Chat", item: "Brainstorm: onboarding improvements", time: "Yesterday" },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-2xl bg-primary px-6 py-8 text-primary-foreground shadow-sm sm:px-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          AI Workplace Productivity Hub
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-primary-foreground/85 sm:text-base">
          Welcome back. Pick a tool below to draft, summarize, plan, research, or chat — all
          powered by AI, always reviewed by you.
        </p>
      </header>

      {/* Stats */}
      <section aria-label="Usage statistics" className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value, trend }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Icon className="h-4 w-4 text-accent-foreground" />
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-card-foreground">{value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-success-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {trend}
            </p>
          </div>
        ))}
      </section>

      {/* Tools */}
      <section aria-label="AI tools" className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Your AI tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map(({ to, icon: Icon, title, description }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <Icon className="h-5 w-5 text-accent-foreground" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-card-foreground">{title}</h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open tool
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section aria-label="Recent activity" className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Recent activity</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <ul className="divide-y divide-border">
            {recentActivity.map((a) => (
              <li
                key={a.item}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-card-foreground">{a.item}</p>
                  <p className="text-xs text-muted-foreground">{a.tool}</p>
                </div>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-8">
        <ResponsibleAIDisclaimer />
      </div>
    </div>
  );
}
