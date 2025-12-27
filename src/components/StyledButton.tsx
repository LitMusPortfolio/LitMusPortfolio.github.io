import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type StyledButtonProps = {
  active?: boolean;
  underlineOnActive?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">;

export function StyledButton({
  active = false,
  underlineOnActive = true,
  className,
  children,
  ...props
}: StyledButtonProps) {
  return (
    <Button
      variant="styled"
      size="styled"
      active={active}
      underlineOnActive={underlineOnActive}
      className={cn(className)}
      {...props}
    >
      {children}
    </Button>
  );
}
