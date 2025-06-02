import styled from "styled-components";
import { theme } from "../styles/theme";
import TextWithBackground from "./TextWithBackground";

// セクションタイトルのラッパー
const SectionTitleWrapper = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: ${theme.typography.fontSize["5xl"]};
  margin-bottom: ${theme.space.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.fontSize["4xl"]};
    margin-bottom: ${theme.space.lg};
  }
`;

interface SectionTitleProps {
  children: string;
  isPurple?: boolean;
}

export default function SectionTitle({
  children,
  isPurple = false,
}: SectionTitleProps) {
  return (
    <SectionTitleWrapper>
      <TextWithBackground isPurple={isPurple || false}>
        {children}
      </TextWithBackground>
    </SectionTitleWrapper>
  );
}
