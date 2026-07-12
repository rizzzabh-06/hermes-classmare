"use client";

import Link from "next/link";

const QUICK_ACTIONS = [
  { label: "Create Assessment", href: "/dashboard/assessments/new", icon: "📝", color: "var(--yellow)" },
  { label: "Add Students", href: "/dashboard/classes", icon: "👥", color: "var(--mint)" },
  { label: "View Classes", href: "/dashboard/classes", icon: "🏫", color: "var(--blue)" },
  { label: "Weekly Planner", href: "/dashboard/planner", icon: "📅", color: "var(--purple)" },
  { label: "Run Demo", href: "/dashboard/demo", icon: "⚡", color: "var(--orange)" },
];

const STATS = [
  { value: "3", label: "Students Seeded", color: "var(--mint)" },
  { value: "1", label: "Assessment Ready", color: "var(--yellow)" },
  { value: "3", label: "Pending Reviews", color: "var(--pink)" },
  { value: "75%", label: "Class Average", color: "var(--blue)" },
];

const RECENT_ACTIVITY = [
  { stage: "evaluation", status: "completed", message: "Quadrilaterals assessment evaluated for 3 students.", time: "Just now" },
  { stage: "planner", status: "completed", message: "Weekly plan generated from class insight data.", time: "Just now" },
  { stage: "review", status: "awaiting_review", message: "Kabir's answer flagged for teacher review — confidence 78%.", time: "Just now" },
  { stage: "submission", status: "completed", message: "Meera's response submitted for evaluation.", time: "Just now" },
];

export default function DashboardPage() {
  return (
    <>
      {/* Page Header */}
      <div className="neo-page-header">
        <div>
          <h1 className="neo-page-header__title">Dashboard</h1>
          <p className="neo-page-header__subtitle">Welcome back, Teacher. Here&apos;s your classroom overview.</p>
        </div>
        <Link href="/dashboard/assessments/new" className="neo-button px-5 py-3">
          + New Assessment
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {STATS.map((stat) => (
          <div key={stat.label} className="neo-stat" style={{ borderLeft: `6px solid ${stat.color}` }}>
            <div className="neo-stat__value">{stat.value}</div>
            <div className="neo-stat__label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem" }}>
          Quick Actions
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.75rem" }}>
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="neo-card neo-card--hover"
              style={{
                padding: "1.25rem",
                textDecoration: "none",
                color: "var(--ink)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                borderTop: `5px solid ${action.color}`,
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{action.icon}</span>
              <span style={{ fontWeight: 800, fontSize: "0.875rem", fontFamily: "'Space Grotesk', sans-serif" }}>
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity + Info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Activity Feed */}
        <section className="neo-card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem" }}>
            Recent Activity
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {RECENT_ACTIVITY.map((event, i) => (
              <div
                key={i}
                style={{
                  padding: "0.875rem",
                  border: "3px solid var(--ink)",
                  background: "var(--background)",
                  boxShadow: "3px 3px 0 var(--ink)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.375rem" }}>
                  <span style={{ fontWeight: 800, textTransform: "uppercase", fontSize: "0.75rem", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {event.stage}
                  </span>
                  <span
                    className={`neo-badge neo-badge--${event.status === "completed" ? "completed" : "review"}`}
                  >
                    {event.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>{event.message}</p>
                <p style={{ fontSize: "0.6875rem", color: "#9ca3af", fontWeight: 500, marginTop: "0.25rem", marginBottom: 0 }}>{event.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Info */}
        <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="neo-card" style={{ padding: "1.5rem", background: "var(--yellow)" }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: "1.125rem", marginBottom: "0.5rem" }}>
              🎯 Hermes-Powered Intelligence
            </h3>
            <p style={{ fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>
              This platform uses Hermes Desktop as the AI reasoning surface. Evaluations are deterministic, teacher-reviewable, and curriculum-aligned.
            </p>
          </div>

          <div className="neo-card" style={{ padding: "1.5rem", background: "var(--blue)" }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: "1.125rem", marginBottom: "0.5rem" }}>
              🎤 Voice Input Ready
            </h3>
            <p style={{ fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>
              Wispr Flow provides the teacher&apos;s voice input surface — dictate assessments, rubrics, comments, and planner constraints directly into editable fields.
            </p>
          </div>

          <div className="neo-card" style={{ padding: "1.5rem", background: "var(--mint)" }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: "1.125rem", marginBottom: "0.5rem" }}>
              📊 CBSE Board · Grade 8
            </h3>
            <p style={{ fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>
              Seeded with Understanding Quadrilaterals chapter — angle sum property and parallelogram properties. Ready for evaluation demo.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
