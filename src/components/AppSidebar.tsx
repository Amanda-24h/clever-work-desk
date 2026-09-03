import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-writer", label: "Email Writer", icon: Mail },
  { to: "/meeting-summarizer", label: "Meeting Summarizer", icon: FileText },
  { to: "/task-planner", label: "Task Planner", icon: ListChecks },
  { to: "/research-assistant", label: "Research Assistant", icon: Search },
  { to: "/ai-chat", label: "AI Chat", icon: MessageSquare },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1 px-3" aria-label="Main navigation">
      {navItems.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 py-3 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="flex items-center gap-2 text-sm font-bold text-sidebar-foreground">
          <Sparkles className="h-4 w-4 text-sidebar-primary" />
          AI Workplace Productivity Hub
        </span>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar">
            <div className="flex items-center justify-between border-b border-sidebar-border px-5 py-4">
              <span className="flex items-center gap-2 text-sm font-bold text-sidebar-foreground">
                <Sparkles className="h-4 w-4 text-sidebar-primary" />
                AI Productivity Hub
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="rounded-lg p-1.5 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-sidebar lg:flex">
        <div className="flex items-center gap-2.5 border-b border-sidebar-border px-5 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary">
            <Sparkles className="h-5 w-5 text-sidebar-primary-foreground" />
          </span>
          <div>
            <p className="text-sm font-bold leading-tight text-sidebar-foreground">
              AI Workplace
            </p>
            <p className="text-xs text-sidebar-foreground/60">Productivity Hub</p>
          </div>
        </div>
        <div className="mt-4 flex-1">
          <NavLinks />
        </div>
        <div className="border-t border-sidebar-border p-4">
          <p className="text-xs leading-relaxed text-sidebar-foreground/60">
            AI outputs may be inaccurate — always review before use.
          </p>
        </div>
      </aside>
    </>
  );
}
