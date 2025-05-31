import styled from "styled-components";
import TextWithBackground from "./TextWithBackground";

// セクションタイトルのラッパー
const SectionTitleWrapper = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 8rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    font-size: 4rem;
    margin-bottom: 2rem;
  }
`;

interface SectionTitleProps {
  children: string;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <SectionTitleWrapper>
      <TextWithBackground>{children}</TextWithBackground>
    </SectionTitleWrapper>
  );
}
