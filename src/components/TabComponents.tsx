import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type TabContainerProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const TabContainer = forwardRef<HTMLDivElement, TabContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative mb-8 flex flex-wrap items-center justify-start gap-8",
          "after:ml-8 after:h-0.5 after:flex-1 after:bg-white/20",
          "max-sm:after:hidden",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabContainer.displayName = "TabContainer";
