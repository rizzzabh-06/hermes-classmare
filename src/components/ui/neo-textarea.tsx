import { forwardRef, type TextareaHTMLAttributes } from "react";

type NeoTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  helper?: string;
  maxLength?: number;
  showCount?: boolean;
};

const NeoTextarea = forwardRef<HTMLTextAreaElement, NeoTextareaProps>(
  ({ label, error, helper, maxLength, showCount = false, className = "", id, value, ...props }, ref) => {
    const textareaId = id ?? `neo-textarea-${label?.toLowerCase().replace(/\s+/g, "-") ?? "field"}`;
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div>
        {label && (
          <label htmlFor={textareaId} className="neo-label">
            {label}
          </label>
        )}
        <div style={{ position: "relative" }}>
          <textarea
            ref={ref}
            id={textareaId}
            className={`neo-textarea ${error ? "neo-textarea--error" : ""} ${className}`}
            aria-invalid={!!error}
            maxLength={maxLength}
            value={value}
            {...props}
          />
          {showCount && maxLength && (
            <span
              style={{
                position: "absolute",
                bottom: "0.5rem",
                right: "0.75rem",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: charCount > maxLength * 0.9 ? "var(--red)" : "#9ca3af",
              }}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
        {error && (
          <p className="neo-error" role="alert">
            {error}
          </p>
        )}
        {!error && helper && <p className="neo-helper">{helper}</p>}
      </div>
    );
  },
);

NeoTextarea.displayName = "NeoTextarea";
export default NeoTextarea;
