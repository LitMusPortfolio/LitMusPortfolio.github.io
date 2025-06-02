import { useEffect } from "react";
import styled from "styled-components";
import { BackgroundSection } from "@/components/BackgroundSection";
import { Section, SideDecoration } from "../../../components/Layout";
import LitCharacterSection from "../sections/LitCharacterSection";
import LitDownloadSection from "../sections/LitDownloadSection";
import LitMainSection from "../sections/LitMainSection";
import LitRulesSection from "../sections/LitRulesSection";

const CharacterSection = styled(Section)`
  overflow: hidden;
  padding: 0;
`;

// CharacterSectionとDownloadSectionを統合するコンテナ
const IntegratedSection = styled(BackgroundSection)`
  /* 幾何学模様のオーバーレイ */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(45deg, rgba(139, 92, 246, ${({ theme }) => theme.opacity[10]}) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(139, 92, 246, ${({ theme }) => theme.opacity[10]}) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(139, 92, 246, ${({ theme }) => theme.opacity[10]}) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(139, 92, 246, ${({ theme }) => theme.opacity[10]}) 75%);
    background-size: 30px 30px;
    background-position: 0 0, 0 15px, 15px -15px, -15px 0px;
    z-index: ${({ theme }) => theme.zIndex.base};
  }
  
  > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
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
      <IntegratedSection backgroundImage="/LitBG.webp">
        {/* キャラクター詳細セクション */}
        <LitCharacterSection />

        {/* ダウンロードセクション */}
        <LitDownloadSection />

        {/* 利用規約セクション */}
        <LitRulesSection />
      </IntegratedSection>
    </CharacterSection>
  );
}
