import styled from "styled-components";
import { theme } from "../styles/theme";

// キャラクター詳細セクション
const CharacterDetailSection = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  background: linear-gradient(135deg, #2a1458 0%, #3d1a7a 50%, #4a1f99 100%);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(167, 139, 250, 0.2) 0%, transparent 50%);
    z-index: 0;
  }
`;

// 統合コンテナ
const ContentContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 968px) {
    padding: 0 2rem;
    align-items: center;
  }
`;

// セクションタイトル
const SectionTitle = styled.img`
  max-height: 15vw;
  width: auto;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.9))
          drop-shadow(${theme.shadows.glow.large});
  
  @media (max-width: 768px) {
    max-height: 20vw;
  }
`;

// キャラクター画像（左側）
const CharacterImage = styled.div`
  position: absolute;
  bottom: 0;
  max-height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  z-index: 1;
  pointer-events: none;
  
  img {
    height: 90vh;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(${theme.shadows.glow.medium});
  }
  
  @media (max-width: 968px) {
    display: none;
  }
`;

export default function LitCharacterSection() {
  return (
    <>
      <CharacterDetailSection>
        <ContentContainer></ContentContainer>
        <CharacterImage>
          <img src="/101_Lit/LitB_差し替え前提.webp" alt="離途 キャラクター" />
        </CharacterImage>
      </CharacterDetailSection>
    </>
  );
}
