import { cn } from "@/utils/cn";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: Props) {
  const base =
    "px-6 py-3 text-sm font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-teal text-white hover-teal",
    secondary:
      "bg-transparent text-text-primary border border-border-default hover-surface",
  };

  return (
    <button {...props} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}
