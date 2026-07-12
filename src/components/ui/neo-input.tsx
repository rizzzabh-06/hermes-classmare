import { forwardRef, type InputHTMLAttributes } from "react";

type NeoInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helper?: string;
};

const NeoInput = forwardRef<HTMLInputElement, NeoInputProps>(
  ({ label, error, helper, className = "", id, ...props }, ref) => {
    const inputId = id ?? `neo-input-${label?.toLowerCase().replace(/\s+/g, "-") ?? "field"}`;
    return (
      <div>
        {label && (
          <label htmlFor={inputId} className="neo-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`neo-input ${error ? "neo-input--error" : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="neo-error" role="alert">
            {error}
          </p>
        )}
        {!error && helper && (
          <p id={`${inputId}-helper`} className="neo-helper">
            {helper}
          </p>
        )}
      </div>
    );
  },
);

NeoInput.displayName = "NeoInput";
export default NeoInput;
