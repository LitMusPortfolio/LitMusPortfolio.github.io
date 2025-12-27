import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { BackgroundSection } from "@/components/BackgroundSection";
import { Section } from "@/components/Layout";
import LitCharacterSection from "./LitCharacterSection";
import LitDownloadSection from "./LitDownloadSection";
import LitMainSection from "./LitMainSection";
import LitRulesSection from "./LitRulesSection";

const CharacterSection = styled(Section)`
  overflow: hidden;
  padding: 0;
`;

export default function VoicebankPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <CharacterSection id="voicebank">
      <LitMainSection />

      <BackgroundSection backgroundImage="/LitBG.webp">
        <LitCharacterSection sizePreset="default" />
        <LitDownloadSection />
        <LitRulesSection />
      </BackgroundSection>
    </CharacterSection>
  );
}
