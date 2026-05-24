import React, { useState, useRef, useEffect } from "react";

/**
 * SelectInput — A custom select dropdown replacing Ant Design Select.
 *
 * Props:
 *   value       — selected value (optional, for controlled mode)
 *   onChange    — (value) => void
 *   placeholder — string
 *   options     — [{ value, label }]
 *   className   — additional wrapper classes
 */
const SelectInput = ({ value, onChange, placeholder = "Select...", options = [], className = "" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((o) => o.value === value || o.value === value?.toString());

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid var(--border-default)",
          color: selected ? "var(--foreground)" : "var(--foreground-muted)",
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--foreground-muted)" }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-xl p-1 shadow-xl backdrop-blur-xl"
          style={{
            background: "rgba(10,10,12,0.95)",
            border: "1px solid var(--border-default)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-white/[0.06]"
              style={{
                color: "var(--foreground)",
                background: value === opt.value || value?.toString() === opt.value?.toString()
                  ? "rgba(94,106,210,0.15)"
                  : "transparent",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
