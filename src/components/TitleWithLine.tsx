import styled from "styled-components";
import { theme } from "../styles/theme";

// 共通タイトル付き罫線コンポーネント
interface TitleWithLineProps {
  title: string;
  className?: string;
}

// タイトルと罫線のコンテナ
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${theme.space.md};
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
  title,
  className,
}: TitleWithLineProps) {
  return (
    <Container className={className}>
      <h2>{title}</h2>
      <Line />
    </Container>
  );
}
