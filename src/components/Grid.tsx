import type { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

// グリッドコンポーネントのProps
interface GridProps<T> {
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
}

// デフォルトのグリッド設定
const DEFAULT_COLUMNS = {
  default: "repeat(auto-fill, minmax(320px, 1fr))",
  tablet: "repeat(auto-fill, minmax(280px, 1fr))",
  mobile: "repeat(auto-fill, minmax(240px, 1fr))",
  small: "1fr",
};

const DEFAULT_GAP = {
  default: "1.5rem",
  tablet: "1rem",
  mobile: "0.75rem",
  small: "0.5rem",
};

// スタイル付きグリッドコンテナ
const StyledGrid = styled.div<{
  $columns: {
    default?: string;
    tablet?: string;
    mobile?: string;
    small?: string;
  };
  $gap: { default?: string; tablet?: string; mobile?: string; small?: string };
}>`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns.default || DEFAULT_COLUMNS.default};
  gap: ${({ $gap }) => $gap.default || DEFAULT_GAP.default};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: ${({ $columns }) => $columns.tablet || DEFAULT_COLUMNS.tablet};
    gap: ${({ $gap }) => $gap.tablet || DEFAULT_GAP.tablet};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: ${({ $columns }) => $columns.mobile || DEFAULT_COLUMNS.mobile};
    gap: ${({ $gap }) => $gap.mobile || DEFAULT_GAP.mobile};
  }
  
  @media (max-width: ${theme.breakpoints.small}) {
    grid-template-columns: ${({ $columns }) => $columns.small || DEFAULT_COLUMNS.small};
    gap: ${({ $gap }) => $gap.small || DEFAULT_GAP.small};
  }
`;

// 汎用Gridコンポーネント
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
    <StyledGrid
      $columns={columns}
      $gap={gap}
      className={className}
      id={id}
      role={role}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const key = keyExtractor ? keyExtractor(item, index) : index;
        return <div key={key}>{renderItem(item, index)}</div>;
      })}
    </StyledGrid>
  );
}
