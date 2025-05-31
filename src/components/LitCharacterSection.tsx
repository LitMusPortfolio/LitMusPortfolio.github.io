import styled from "styled-components";
import { theme } from "../styles/theme";
import TextWithBackground from "./TextWithBackground";

// キャラクター詳細セクション
const CharacterDetailSection = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 45% 55%;
  align-items: center;
  position: relative;
  background: url("/LitBG.webp") no-repeat center center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

// 統合コンテナ（右側のコンテンツエリア）
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  z-index: 2;
  margin-left: 2rem;
  
  @media (max-width: 968px) {
    padding: 0 2rem;
    align-items: center;
  }
`;

// セクションタイトルのラッパー
const SectionTitleWrapper = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 8rem;
`;

// 左側のエリア（キャラクター画像用）
const LeftSection = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  
  @media (max-width: 968px) {
    display: none;
  }
`;

// キャラクター画像
const CharacterImage = styled.img`
  max-height: 100vh;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(${theme.shadows.glow.medium});
`;

export default function LitCharacterSection() {
  return (
    <>
      <CharacterDetailSection>
        <LeftSection>
          <CharacterImage
            src="/101_Lit/LitB_差し替え前提.webp"
            alt="離途 キャラクター"
          />
        </LeftSection>
        <ContentContainer>
          <SectionTitleWrapper>
            <TextWithBackground>CHARACTER</TextWithBackground>
          </SectionTitleWrapper>
        </ContentContainer>
      </CharacterDetailSection>
    </>
  );
}
