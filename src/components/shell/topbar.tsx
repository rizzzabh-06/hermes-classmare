"use client";

import { usePathname } from "next/navigation";

function breadcrumbFromPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) return [{ label: "Dashboard", current: true }];

  return segments.map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    current: i === segments.length - 1,
  }));
}

export default function Topbar() {
  const pathname = usePathname();
  const crumbs = breadcrumbFromPath(pathname);

  return (
    <header className="neo-topbar">
      <div className="neo-topbar__breadcrumb">
        {crumbs.map((crumb, i) => (
          <span key={i}>
            {i > 0 && <span className="neo-topbar__breadcrumb-sep">/</span>}
            <span className={crumb.current ? " neo-topbar__breadcrumb-current" : ""}>
              {" "}{crumb.label}
            </span>
          </span>
        ))}
      </div>

      <div className="neo-topbar__actions">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.375rem 0.75rem",
            border: "2px dashed var(--ink)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#6b7280",
          }}
          title="Activate Wispr Flow for voice input"
        >
          🎤 Wispr Flow
        </div>

        <div
          style={{
            width: "2.25rem",
            height: "2.25rem",
            border: "3px solid var(--ink)",
            background: "var(--purple)",
            display: "grid",
            placeItems: "center",
            fontWeight: 900,
            fontSize: "0.875rem",
            boxShadow: "2px 2px 0 var(--ink)",
            cursor: "pointer",
          }}
          title="Teacher profile"
        >
          T
        </div>
      </div>
    </header>
  );
}
