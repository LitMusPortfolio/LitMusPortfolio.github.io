import { cn } from "@/lib/utils";

type StyledButtonProps = {
  active?: boolean;
  underlineOnActive?: boolean;
  variant?: "default" | "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function StyledButton({
  active = false,
  underlineOnActive = true,
  className,
  children,
  ...props
}: StyledButtonProps) {
  return (
    <button
      className={cn(
        "relative cursor-pointer whitespace-nowrap border-none bg-transparent px-6 py-4 transition-colors duration-300",
        "hover:text-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:cursor-not-allowed disabled:opacity-60",
        underlineOnActive &&
          "after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transition-transform after:duration-300",
        underlineOnActive && (active ? "after:scale-x-100" : "after:scale-x-0"),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
