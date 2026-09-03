import { createFileRoute } from "@tanstack/react-router";
import { Circle, Clock3 } from "lucide-react";
import { ToolPage } from "../components/ToolPage";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "Task Planner — AI Workplace Productivity Hub" },
      {
        name: "description",
        content: "Break goals and projects into prioritized, actionable tasks with AI.",
      },
      { property: "og:title", content: "Task Planner — AI Workplace Productivity Hub" },
      {
        property: "og:description",
        content: "Break goals and projects into prioritized, actionable tasks with AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TaskPlannerPage,
});

const plan = [
  {
    phase: "Phase 1 · Foundation (Week 1)",
    tasks: [
      { title: "Define project scope and success criteria", priority: "High", effort: "3 hrs" },
      { title: "Stakeholder kickoff and requirements gathering", priority: "High", effort: "2 hrs" },
      { title: "Audit existing content and assets", priority: "Medium", effort: "4 hrs" },
    ],
  },
  {
    phase: "Phase 2 · Execution (Weeks 2–3)",
    tasks: [
      { title: "Draft first deliverables and circulate for review", priority: "High", effort: "6 hrs" },
      { title: "Incorporate feedback and finalize v2", priority: "High", effort: "4 hrs" },
      { title: "Set up tracking board and weekly check-ins", priority: "Medium", effort: "1 hr" },
    ],
  },
  {
    phase: "Phase 3 · Launch (Week 4)",
    tasks: [
      { title: "Final QA pass and sign-off", priority: "High", effort: "3 hrs" },
      { title: "Launch and monitor first-48-hour metrics", priority: "High", effort: "4 hrs" },
      { title: "Retrospective and lessons-learned doc", priority: "Low", effort: "1.5 hrs" },
    ],
  },
];

const priorityStyles: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning text-warning-foreground",
  Low: "bg-success text-success-foreground",
};

function PlanOutput() {
  return (
    <div className="space-y-5">
      <p>
        Your goal has been broken into <strong>9 tasks across 3 phases</strong>, prioritized by
        impact and dependencies.
      </p>
      {plan.map((p) => (
        <div key={p.phase}>
          <h3 className="text-sm font-semibold text-foreground">{p.phase}</h3>
          <ul className="mt-2 space-y-2">
            {p.tasks.map((t) => (
              <li
                key={t.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 px-3.5 py-2.5"
              >
                <Circle className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div className="flex-1">
                  <p>{t.title}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${priorityStyles[t.priority]}`}
                    >
                      {t.priority}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="h-3 w-3" />
                      {t.effort}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="rounded-lg border border-border bg-accent/50 px-4 py-3">
        <p className="text-xs font-semibold text-accent-foreground">AI planning note</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Time estimates are rough AI guesses — adjust them to your team's actual capacity
          before committing to dates.
        </p>
      </div>
    </div>
  );
}

function TaskPlannerPage() {
  return (
    <ToolPage
      title="Task Planner"
      description="Describe your goal or project and AI breaks it into a phased, prioritized plan with effort estimates."
      inputLabel="What's your goal?"
      inputPlaceholder="e.g. Relaunch the company website within 4 weeks — new design, migrated blog content, improved search."
      inputRows={6}
      generateLabel="Create plan"
      renderOutput={() => <PlanOutput />}
    />
  );
}
