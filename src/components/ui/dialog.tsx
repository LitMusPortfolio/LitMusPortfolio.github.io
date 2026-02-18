"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/utils/cn";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

// Variant styles matching original ModalContainer exactly
const dialogContentVariants = {
  default:
    "bg-[rgba(20,20,30,0.95)] backdrop-blur-[20px] border border-purple-500/30 shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_100px_rgba(139,92,246,0.1),inset_0_0_50px_rgba(139,92,246,0.05)]",
  download:
    "bg-gradient-to-br from-[rgba(20,20,30,0.98)] to-[rgba(30,20,40,0.98)] border border-purple-500/20 shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_120px_rgba(139,92,246,0.15),inset_0_0_60px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]",
  glass: "glass rounded-xl",
};

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        // Exact match to original ModalOverlay
        "fixed inset-0 z-[9999] bg-black/80 backdrop-blur-[10px]",
        // Fade animation
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

type DialogContentVariant = "default" | "download" | "glass";

function DialogContent({
  className,
  children,
  showCloseButton = true,
  variant = "default",
  maxWidth,
  hasImage = false,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  variant?: DialogContentVariant;
  maxWidth?: string;
  hasImage?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          // Exact match to original ModalContainer base styles
          "fixed left-1/2 top-1/2 z-[10000] h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl p-8",
          // Grid layout for image variant
          hasImage ? "grid grid-cols-[0.4fr_0.6fr]" : "block",
          // Variant-specific styles
          dialogContentVariants[variant],
          // Fade animation
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className,
        )}
        style={maxWidth ? { maxWidth } : undefined}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-2 focus:outline-offset-2 focus:outline-primary disabled:pointer-events-none"
          >
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

// Custom components for Modal compatibility
function DialogImageSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center overflow-hidden p-8 [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
      {children}
    </div>
  );
}

function DialogContentInner({
  variant,
  title,
  children,
}: {
  variant?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(variant === "download" ? "p-16" : "p-12")}>
      {title && (
        <div className="mb-8 flex w-full items-center">
          <h2 className="m-0 whitespace-nowrap text-[2rem] font-semibold text-[var(--color-text-primary)]">
            {title}
          </h2>
          <div className="ml-4 h-0.5 flex-1 bg-[var(--color-text-primary)] opacity-80" />
        </div>
      )}
      {children}
    </div>
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogContentInner,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogImageSection,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
