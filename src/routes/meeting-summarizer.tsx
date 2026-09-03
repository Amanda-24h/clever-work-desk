import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "../components/ToolPage";

export const Route = createFileRoute("/meeting-summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Summarizer — AI Workplace Productivity Hub" },
      {
        name: "description",
        content: "Turn meeting notes and transcripts into clear summaries, decisions, and action items.",
      },
      { property: "og:title", content: "Meeting Summarizer — AI Workplace Productivity Hub" },
      {
        property: "og:description",
        content: "Turn meeting notes and transcripts into clear summaries, decisions, and action items.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeetingSummarizerPage,
});

function SummaryOutput() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Summary</h3>
        <p className="mt-1.5">
          The team reviewed progress on the website relaunch, confirmed the new launch date of
          October 14, and discussed risks around content migration. Marketing committed to a
          revised campaign plan, and engineering flagged the search feature as the main
          schedule risk. Overall sentiment: cautiously on track.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">Key decisions</h3>
        <ul className="mt-1.5 list-disc space-y-1.5 pl-5">
          <li>Launch date moved from October 7 to October 14 to allow full QA of search.</li>
          <li>Blog content migration will be outsourced to the content agency.</li>
          <li>Weekly status meetings move from Monday to Tuesday at 10:00.</li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">Action items</h3>
        <ul className="mt-1.5 space-y-2">
          {[
            { task: "Draft revised campaign plan and share with leadership", owner: "Priya (Marketing)", due: "Sep 12" },
            { task: "Complete search feature load testing", owner: "Diego (Engineering)", due: "Sep 19" },
            { task: "Send agency SOW for blog migration", owner: "Alex (PM)", due: "Sep 9" },
            { task: "Update project timeline in the tracker", owner: "Alex (PM)", due: "Sep 5" },
          ].map((a) => (
            <li
              key={a.task}
              className="flex flex-col gap-1 rounded-lg border border-border bg-muted/40 px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>{a.task}</span>
              <span className="text-xs font-medium text-muted-foreground">
                {a.owner} · due {a.due}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-border bg-accent/50 px-4 py-3">
        <p className="text-xs font-semibold text-accent-foreground">AI summarization note</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Owners and deadlines were inferred from the notes — confirm assignments with
          attendees before distributing the minutes.
        </p>
      </div>
    </div>
  );
}

function MeetingSummarizerPage() {
  return (
    <ToolPage
      title="Meeting Summarizer"
      description="Paste raw notes or a transcript and get a structured summary with key decisions and action items."
      inputLabel="Paste meeting notes or transcript"
      inputPlaceholder="e.g. Product sync Sep 3 — discussed website relaunch timeline, search feature risk, marketing campaign changes…"
      inputRows={10}
      generateLabel="Summarize"
      renderOutput={() => <SummaryOutput />}
    />
  );
}
