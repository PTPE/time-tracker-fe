"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export default function Select({
  label,
  options,
  defaultValue,
  placeholder,
  onChange,
  value,
  className,
}: Props) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const handleSelectedValue = (val: string) => {
    if (!isControlled) setInternalValue(val);
    setOpen(false);
    onChange?.(val);
  };

  const selectedLabel =
    options.find((o) => o.value === selectedValue)?.label ?? placeholder ?? "";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={clsx("flex flex-col gap-2 font-semibold", className)}
      ref={ref}
    >
      {label && <label className="text-foreground-secondary">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={clsx(
            "text-foreground border-border-default hover:bg-surface-primary w-full cursor-pointer rounded-lg border p-3 text-left transition-all duration-300 outline-none",
            open && "border-teal",
            !selectedValue && "text-foreground-tertiary",
          )}
        >
          {selectedLabel}
          <span className="float-right">{open ? "▲" : "▼"}</span>
        </button>

        {open && (
          <ul className="border-border-default bg-surface-primary absolute z-10 mt-1 w-full overflow-auto rounded-lg border shadow-md">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelectedValue(option.value)}
                className={clsx(
                  "hover-surface cursor-pointer px-4 py-3",
                  option.value === selectedValue && "text-teal font-bold",
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
