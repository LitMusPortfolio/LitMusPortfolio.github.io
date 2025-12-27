import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type GridProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  columns?: {
    default?: string;
    mobile?: string;
  };
  gap?: {
    default?: string;
    mobile?: string;
  };
  className?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
};

const DEFAULT_COLUMNS = {
  default: "repeat(auto-fill, minmax(22%, 1fr))",
  tablet: "repeat(auto-fill, minmax(30%, 1fr))",
  mobile: "repeat(auto-fill, minmax(20%, 1fr))",
};

const DEFAULT_GAP = {
  default: "1rem",
  mobile: "0.5rem",
};

export default function Grid<T>({
  items,
  renderItem,
  keyExtractor,
  columns = DEFAULT_COLUMNS,
  gap = DEFAULT_GAP,
  className,
  id,
  role,
  "aria-label": ariaLabel,
}: GridProps<T>) {
  return (
    <div
      className={cn("grid auto-rows-fr", className)}
      style={
        {
          gridTemplateColumns: columns.default || DEFAULT_COLUMNS.default,
          gap: gap.default || DEFAULT_GAP.default,
        } as React.CSSProperties
      }
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
