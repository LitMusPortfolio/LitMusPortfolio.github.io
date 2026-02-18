"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type GridProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  className?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
};

export default function Grid<T>({
  items,
  renderItem,
  keyExtractor,
  className,
  id,
  role,
  "aria-label": ariaLabel,
}: GridProps<T>) {
  return (
    <div
      className={cn(
        "grid auto-rows-fr gap-4",
        "grid-cols-[repeat(auto-fill,minmax(22%,1fr))]",
        "max-[968px]:grid-cols-[repeat(auto-fill,minmax(30%,1fr))]",
        "max-sm:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] max-sm:gap-2",
        className,
      )}
      id={id}
      {...(role ? { role, "aria-label": ariaLabel } : {})}
    >
      {items.map((item, index) => {
        const key = keyExtractor ? keyExtractor(item, index) : index;
        return <div key={key}>{renderItem(item, index)}</div>;
      })}
    </div>
  );
}
