import { forwardRef, type SelectHTMLAttributes } from "react";

type NeoSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  helper?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
};

const NeoSelect = forwardRef<HTMLSelectElement, NeoSelectProps>(
  ({ label, error, helper, options, placeholder, className = "", id, ...props }, ref) => {
    const selectId = id ?? `neo-select-${label?.toLowerCase().replace(/\s+/g, "-") ?? "field"}`;
    return (
      <div>
        {label && (
          <label htmlFor={selectId} className="neo-label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`neo-select ${className}`}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
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

NeoSelect.displayName = "NeoSelect";
export default NeoSelect;
