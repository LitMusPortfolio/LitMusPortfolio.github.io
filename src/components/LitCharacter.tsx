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

      {/* キャラクター詳細セクション */}
      <LitCharacterSection />

      {/* ダウンロードセクション */}
      <LitDownloadSection />
    </CharacterSection>
  );
}
