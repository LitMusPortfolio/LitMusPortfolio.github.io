import styled from "styled-components";
import { theme } from "../styles/theme";

// 共通タイトル付き罫線コンポーネント
interface TitleWithLineProps {
  children: React.ReactNode;
  className?: string;
}

// タイトルと罫線のコンテナ
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${theme.space.lg};
`;

// 罫線
const Line = styled.div`
  flex: 1;
  height: ${theme.borders.width.base};
  background: ${theme.colors.text.primary};
  opacity: ${theme.opacity[80]};
  margin-left: ${theme.space.sm};
`;

export default function TitleWithLine({
  children,
  className,
}: TitleWithLineProps) {
  return (
    <Container className={className}>
      {children}
      <Line />
    </Container>
  );
}
