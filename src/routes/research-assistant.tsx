import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Lightbulb, AlertTriangle } from "lucide-react";
import { ToolPage } from "../components/ToolPage";

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "Research Assistant — AI Workplace Productivity Hub" },
      {
        name: "description",
        content: "Get structured AI research briefs on any topic with key findings and open questions.",
      },
      { property: "og:title", content: "Research Assistant — AI Workplace Productivity Hub" },
      {
        property: "og:description",
        content: "Get structured AI research briefs on any topic with key findings and open questions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchAssistantPage,
});

function ResearchOutput() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <BookOpen className="h-4 w-4 text-primary" />
          Overview
        </h3>
        <p className="mt-1.5">
          The topic sits at the intersection of rapid adoption and evolving best practice.
          Industry surveys suggest roughly 65% of organizations are piloting initiatives in
          this area, with early adopters reporting 20–40% efficiency gains. The field is
          maturing quickly, and guidance published more than 18 months ago is often outdated.
        </p>
      </div>
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Lightbulb className="h-4 w-4 text-primary" />
          Key findings
        </h3>
        <ul className="mt-1.5 list-disc space-y-1.5 pl-5">
          <li>Adoption is highest in teams with clearly documented workflows and ownership.</li>
          <li>The biggest reported barrier is data quality, not tooling or budget.</li>
          <li>Organizations that start with a narrow pilot scale 2× faster than broad rollouts.</li>
          <li>Peer benchmarking shows payback periods of 6–12 months for typical deployments.</li>
        </ul>
      </div>
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <AlertTriangle className="h-4 w-4 text-primary" />
          Gaps & open questions
        </h3>
        <ul className="mt-1.5 list-disc space-y-1.5 pl-5">
          <li>Long-term retention and ROI data beyond 24 months is still scarce.</li>
          <li>Regulatory guidance varies significantly by region and is changing fast.</li>
        </ul>
      </div>
      <div className="rounded-lg border border-border bg-accent/50 px-4 py-3">
        <p className="text-xs font-semibold text-accent-foreground">AI research note</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          This brief is a general AI synthesis, not live research. Statistics are illustrative
          — verify facts and cite primary sources before using this in decisions or documents.
        </p>
      </div>
    </div>
  );
}

function ResearchAssistantPage() {
  return (
    <ToolPage
      title="Research Assistant"
      description="Enter a topic or question and receive a structured brief with key findings, gaps, and next steps."
      inputLabel="What do you want to research?"
      inputPlaceholder="e.g. Current best practices for hybrid work policies in mid-size tech companies."
      inputRows={5}
      generateLabel="Research"
      renderOutput={() => <ResearchOutput />}
    />
  );
}
