"use client";

import Image from "next/image";
import type React from "react";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentInner,
  DialogImageSection,
} from "@/components/ui/dialog";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  hasImage?: boolean;
  title?: string;
  imageUrl?: string;
  variant?: "default" | "download" | "glass";
  ariaLabel?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  maxWidth,
  hasImage = false,
  title,
  imageUrl,
  variant = "default",
  ariaLabel,
}: ModalProps): React.JSX.Element {
  const showImage = hasImage || !!imageUrl;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        variant={variant}
        maxWidth={maxWidth}
        hasImage={showImage}
        aria-label={ariaLabel || title || "Modal dialog"}
        showCloseButton={false}
      >
        {showImage && (
          <DialogImageSection>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title || "Modal image"}
                width={800}
                height={600}
              />
            )}
          </DialogImageSection>
        )}
        <DialogContentInner variant={variant} title={title}>
          {children}
        </DialogContentInner>
      </DialogContent>
    </Dialog>
  );
}
