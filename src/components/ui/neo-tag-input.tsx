"use client";

import { useState, useRef, type KeyboardEvent, type ChangeEvent } from "react";

type NeoTagInputProps = {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  error?: string;
  helper?: string;
  maxTags?: number;
  colorVariant?: "yellow" | "mint" | "blue" | "pink" | "purple";
};

export default function NeoTagInput({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter…",
  error,
  helper,
  maxTags,
  colorVariant = "yellow",
}: NeoTagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const id = `neo-tag-${label?.toLowerCase().replace(/\s+/g, "-") ?? "input"}`;
  const tagClass = colorVariant === "yellow" ? "neo-tag" : `neo-tag neo-tag--${colorVariant}`;

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!tag) return;
    if (value.includes(tag)) return;
    if (maxTags && value.length >= maxTags) return;
    onChange([...value, tag]);
    setInputValue("");
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val.includes(",")) {
      val.split(",").forEach((seg) => addTag(seg));
    } else {
      setInputValue(val);
    }
  }

  return (
    <div>
      {label && (
        <label htmlFor={id} className="neo-label">
          {label}
        </label>
      )}
      <div
        className={`neo-tag-container${error ? " neo-input--error" : ""}`}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, i) => (
          <span key={`${tag}-${i}`} className={tagClass}>
            {tag}
            <button
              type="button"
              className="neo-tag__remove"
              onClick={(e) => { e.stopPropagation(); removeTag(i); }}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          id={id}
          type="text"
          className="neo-tag-input"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={!!maxTags && value.length >= maxTags}
        />
      </div>
      {error && (
        <p className="neo-error" role="alert">{error}</p>
      )}
      {!error && helper && <p className="neo-helper">{helper}</p>}
    </div>
  );
}
