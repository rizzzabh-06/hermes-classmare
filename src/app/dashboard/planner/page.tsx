import { runDemoWorkflow } from "@/lib/workflow";

const workflow = runDemoWorkflow();

export default function PlannerPage() {
  return (
    <>
      <div className="neo-page-header">
        <div>
          <h1 className="neo-page-header__title">Weekly Planner</h1>
          <p className="neo-page-header__subtitle">
            Generated from class insights — editable by the teacher, powered by Hermes.
          </p>
        </div>
      </div>

      {/* Insights Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div className="neo-stat" style={{ background: "var(--yellow)" }}>
          <div className="neo-stat__value">{workflow.insight.averageScorePercent}%</div>
          <div className="neo-stat__label">Class Average</div>
        </div>
        <div className="neo-stat" style={{ background: "var(--pink)" }}>
          <div className="neo-stat__value">{workflow.insight.studentsNeedingSupport.length}</div>
          <div className="neo-stat__label">Need Support</div>
        </div>
        <div className="neo-stat" style={{ background: "var(--blue)" }}>
          <div className="neo-stat__value">{workflow.insight.reteachingPriorities.length}</div>
          <div className="neo-stat__label">Reteach Topics</div>
        </div>
        <div className="neo-stat" style={{ background: "var(--mint)" }}>
          <div className="neo-stat__value">{workflow.insight.strongConcepts.length}</div>
          <div className="neo-stat__label">Strong Concepts</div>
        </div>
      </div>

      {/* Reteaching Priorities */}
      <section className="neo-card" style={{ padding: "1.5rem", marginBottom: "2rem", background: "var(--orange)" }}>
        <h2 className="font-display" style={{ fontWeight: 900, fontSize: "1.25rem", marginBottom: "0.75rem" }}>
          🎯 Reteaching Priorities
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {workflow.insight.reteachingPriorities.map((priority) => (
            <div key={priority} style={{ padding: "0.75rem 1rem", border: "3px solid #000", borderRadius: "var(--radius-md)", background: "white", fontWeight: 700, boxShadow: "var(--shadow-sm)" }}>
              ↳ {priority}
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Plan Grid */}
      <section>
        <h2 className="font-display" style={{ fontWeight: 900, fontSize: "1.5rem", marginBottom: "1.25rem" }}>
          Monday → Friday Plan
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem" }}>
          {workflow.weeklyPlan.map((day, i) => {
            const colors = ["var(--yellow)", "var(--pink)", "var(--blue)", "var(--mint)", "var(--purple)"];
            return (
              <div
                key={day.day}
                className="neo-card"
                style={{
                  padding: "1.5rem",
                  background: colors[i],
                  transform: `rotate(${[-2, 1.5, -1, 2, -1.5][i]}deg)`,
                  transition: "transform 0.2s ease",
                }}
                data-testid={`plan-day-${day.day.toLowerCase()}`}
              >
                <h3 className="font-display" style={{ fontWeight: 900, fontSize: "1.25rem" }}>{day.day}</h3>
                <p style={{ fontWeight: 800, fontSize: "0.875rem", marginTop: "0.75rem", lineHeight: 1.4 }}>
                  {day.objective}
                </p>
                <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    <strong>Activity:</strong> {day.activity}
                  </p>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    <strong>Differentiation:</strong> {day.differentiation}
                  </p>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    <strong>Practice:</strong> {day.practice}
                  </p>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    <strong>Check:</strong> {day.formativeCheck}
                  </p>
                </div>
                {day.resources.length > 0 && (
                  <div style={{ marginTop: "0.75rem", padding: "0.5rem 0.75rem", border: "3px solid #000", borderRadius: "var(--radius-md)", background: "white", fontSize: "0.6875rem", fontWeight: 800 }}>
                    📚 {day.resources[0]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
