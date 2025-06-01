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
  margin-bottom: 2rem;
`;

// 罫線
const Line = styled.div`
  flex: 1;
  height: 2px;
  background: ${theme.colors.text.primary};
  opacity: 0.8;
  margin-left: 1rem;
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
