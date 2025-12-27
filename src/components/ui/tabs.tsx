"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type * as React from "react";

import { cn } from "@/utils/cn";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: "default" | "filter";
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        variant === "default" &&
          "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        // Filter variant matching original TabContainer exactly
        variant === "filter" && [
          "relative mb-8 flex flex-wrap items-center justify-start gap-8",
          "after:ml-8 after:h-0.5 after:flex-1 after:bg-white/20",
          "max-sm:after:hidden",
        ],
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  variant = "default",
  underlineOnActive = false,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  variant?: "default" | "styled";
  underlineOnActive?: boolean;
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        variant === "default" &&
          "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Styled variant matching original StyledButton exactly
        variant === "styled" && [
          "relative cursor-pointer whitespace-nowrap border-none bg-transparent px-6 py-4 transition-colors duration-300",
          "hover:text-primary",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          "disabled:cursor-not-allowed disabled:opacity-60",
        ],
        // Underline animation for styled variant
        variant === "styled" &&
          underlineOnActive && [
            "after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:transition-transform after:duration-300",
            "data-[state=inactive]:after:scale-x-0",
            "data-[state=active]:after:scale-x-100",
          ],
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
