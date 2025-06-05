import { useEffect } from "react";
import styled from "styled-components";
import { BackgroundSection } from "@/components/BackgroundSection";
import { Section } from "../../../components/Layout";
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
      {/* メインセクション - 離途紹介 */}
      <LitMainSection />

      {/* CharacterSectionとDownloadSectionを統合 */}
      <IntegratedSection backgroundImage="/LitBG.webp">
        {/* キャラクター詳細セクション */}
        <LitCharacterSection sizePreset="default" />

        {/* ダウンロードセクション */}
        <LitDownloadSection />

        {/* 利用規約セクション */}
        <LitRulesSection />
      </IntegratedSection>
    </CharacterSection>
  );
}
