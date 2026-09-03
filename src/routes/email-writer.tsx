import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolPage } from "../components/ToolPage";

export const Route = createFileRoute("/email-writer")({
  head: () => ({
    meta: [
      { title: "Email Writer — AI Workplace Productivity Hub" },
      {
        name: "description",
        content: "Draft professional, polished emails from a few bullet points with AI.",
      },
      { property: "og:title", content: "Email Writer — AI Workplace Productivity Hub" },
      {
        property: "og:description",
        content: "Draft professional, polished emails from a few bullet points with AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailWriterPage,
});

const tones = ["Professional", "Friendly", "Concise", "Formal"] as const;

function EmailOutput() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-muted/60 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Subject
        </p>
        <p className="mt-1 font-semibold text-foreground">
          Follow-up: Q3 Marketing Budget Review — Action Needed by Friday
        </p>
      </div>
      <div className="space-y-3">
        <p>Hi Sarah,</p>
        <p>
          I hope your week is going well. I'm following up on our Q3 marketing budget review,
          which we scheduled to finalize before the end of this week.
        </p>
        <p>
          Based on our last discussion, there are two items that still need your input before
          we can lock the numbers:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Final allocation for the paid acquisition pilot (proposed $12,000)</li>
          <li>Confirmation of the events budget carryover from Q2</li>
        </ul>
        <p>
          Could you share your feedback by <strong>Friday, 3:00 PM</strong>? Once confirmed,
          I'll circulate the final version to leadership for sign-off on Monday.
        </p>
        <p>Thanks in advance — happy to jump on a quick call if that's easier.</p>
        <p>
          Best regards,
          <br />
          Alex
        </p>
      </div>
      <div className="rounded-lg border border-border bg-accent/50 px-4 py-3">
        <p className="text-xs font-semibold text-accent-foreground">AI writing notes</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Tone: professional and direct · Length: ~150 words · Includes a clear call to action
          with a deadline. Verify names, dates, and figures before sending.
        </p>
      </div>
    </div>
  );
}

function EmailWriterPage() {
  const [tone, setTone] = useState<(typeof tones)[number]>("Professional");

  return (
    <ToolPage
      title="Email Writer"
      description="Describe the email you need — the recipient, purpose, and key points — and AI drafts a polished version for you."
      inputLabel="What should this email say?"
      inputPlaceholder="e.g. Follow up with Sarah from finance about the Q3 marketing budget review. Ask her to confirm the paid ads allocation and events carryover by Friday."
      generateLabel="Draft email"
      renderOutput={() => <EmailOutput />}
    >
      <div className="mt-4">
        <p className="text-xs font-semibold text-card-foreground">Tone</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                tone === t
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-muted-foreground hover:bg-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </ToolPage>
  );
}
