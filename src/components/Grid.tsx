import React, { useCallback, type ReactNode } from "react";
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
  mobile: "1fr",
};

const DEFAULT_GAP = {
  default: "1rem",
  mobile: "0.5rem",
};

// スタイル付きグリッドコンテナ
const StyledGrid = styled.div<{
  $columns: { default?: string; mobile?: string };
  $gap: { default?: string; mobile?: string };
}>`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns.default || DEFAULT_COLUMNS.default};
  gap: ${({ $gap }) => $gap.default || DEFAULT_GAP.default};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: ${({ $columns }) => $columns.mobile || DEFAULT_COLUMNS.mobile};
    gap: ${({ $gap }) => $gap.mobile || DEFAULT_GAP.mobile};
  }
`;

// 汎用Gridコンポーネント
function Grid<T>({
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
  const getKey = useCallback((item: T, index: number) => {
    return keyExtractor ? keyExtractor(item, index) : index;
  }, [keyExtractor]);

  const renderGridItem = useCallback((item: T, index: number) => {
    return <div key={getKey(item, index)}>{renderItem(item, index)}</div>;
  }, [getKey, renderItem]);

  return (
    <StyledGrid
      $columns={columns}
      $gap={gap}
      className={className}
      id={id}
      role={role}
      aria-label={ariaLabel}
    >
      {items.map(renderGridItem)}
    </StyledGrid>
  );
}

export default React.memo(Grid) as typeof Grid;
