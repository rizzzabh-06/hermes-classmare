"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_SECTIONS = [
  {
    label: "Core",
    links: [
      { href: "/dashboard", icon: "📊", label: "Dashboard" },
      { href: "/dashboard/classes", icon: "🏫", label: "Classes" },
      { href: "/dashboard/assessments", icon: "📝", label: "Assessments" },
    ],
  },
  {
    label: "Intelligence",
    links: [
      { href: "/dashboard/planner", icon: "📅", label: "Weekly Planner" },
      { href: "/dashboard/demo", icon: "⚡", label: "Demo Flow" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="neo-button neo-button--sm"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          zIndex: 200,
          display: "none",
        }}
        id="sidebar-toggle"
      >
        ☰
      </button>

      <aside className={`neo-sidebar${mobileOpen ? " neo-sidebar--open" : ""}`}>
        <div className="neo-sidebar__logo">
          <div className="neo-sidebar__logo-icon">H</div>
          <div>
            <div style={{ lineHeight: 1.1 }}>Hermes</div>
            <div style={{ fontSize: "0.625rem", fontWeight: 600, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Classroom Intelligence
            </div>
          </div>
        </div>

        <nav className="neo-sidebar__nav" aria-label="Main navigation">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="neo-sidebar__section">{section.label}</div>
              {section.links.map((link) => {
                const isActive =
                  link.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`neo-sidebar__link${isActive ? " neo-sidebar__link--active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="neo-sidebar__link-icon">{link.icon}</span>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="neo-sidebar__footer">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--mint)", border: "2px solid var(--ink)", flexShrink: 0 }} />
            Hermes Desktop + Convex
          </div>
          <div style={{ marginTop: "0.375rem", fontSize: "0.6875rem", color: "#9ca3af" }}>
            v0.1.0 · CBSE Board
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 99,
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
