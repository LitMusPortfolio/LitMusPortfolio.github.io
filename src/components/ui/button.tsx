"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // Gradient button for primary actions
        gradient:
          "cursor-pointer rounded-lg border-none bg-gradient-primary text-base text-[var(--color-text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-button active:translate-y-0",
        // Custom styled variant matching original StyledButton exactly
        styled:
          "relative cursor-pointer border-none bg-transparent px-6 py-4 transition-colors duration-300 hover:text-primary focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 rounded-none",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        // No size constraints for styled variant
        styled: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  active = false,
  underlineOnActive = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    active?: boolean;
    underlineOnActive?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  // Underline animation classes (only for styled variant)
  const underlineClasses =
    variant === "styled" && underlineOnActive
      ? cn(
          "after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transition-transform after:duration-300",
          active ? "after:scale-x-100" : "after:scale-x-0",
        )
      : "";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-active={active}
      className={cn(
        buttonVariants({ variant, size, className }),
        underlineClasses,
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
