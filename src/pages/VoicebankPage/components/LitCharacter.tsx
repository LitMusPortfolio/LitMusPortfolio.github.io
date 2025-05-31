import { useEffect } from "react";
import styled from "styled-components";
import LitCharacterSection from "./LitCharacterSection";
import LitDownloadSection from "./LitDownloadSection";
import LitMainSection from "./LitMainSection";

const CharacterSection = styled.section`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

// CharacterSectionとDownloadSectionを統合するコンテナ
const IntegratedSection = styled.div`
  position: relative;
  background: url("/LitBG.webp") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  
  /* 幾何学模様のオーバーレイ */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(45deg, rgba(139, 92, 246, 0.1) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(139, 92, 246, 0.1) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(139, 92, 246, 0.1) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(139, 92, 246, 0.1) 75%);
    background-size: 30px 30px;
    background-position: 0 0, 0 15px, 15px -15px, -15px 0px;
    z-index: 0;
  }
`;

const SideDecoration = styled.div`
  position: absolute;
  left: -100px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  
  img {
    height: 200px;
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export default function LitCharacter() {
  useEffect(() => {
    // ESCキーでモーダルを閉じる（各セクションで個別に実装）
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // 各セクションのモーダルが独自に処理
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <CharacterSection id="voicebank">
      <SideDecoration>
        <img src="/010_PageSideTitleSvg/Character.svg" alt="CHARACTER" />
      </SideDecoration>

      {/* メインセクション - 離途紹介 */}
      <LitMainSection />

      {/* CharacterSectionとDownloadSectionを統合 */}
      <IntegratedSection>
        {/* キャラクター詳細セクション */}
        <LitCharacterSection />

        {/* ダウンロードセクション */}
        <LitDownloadSection />
      </IntegratedSection>
    </CharacterSection>
  );
}
