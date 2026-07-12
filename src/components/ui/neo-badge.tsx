type BadgeVariant =
  | "draft"
  | "ready"
  | "generated"
  | "published"
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "review"
  | "active"
  | "inactive";

type NeoBadgeProps = {
  variant: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
};

export default function NeoBadge({ variant, children, dot = false }: NeoBadgeProps) {
  return (
    <span className={`neo-badge neo-badge--${variant}`}>
      {dot && (
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "currentColor",
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}
