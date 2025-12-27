import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BackgroundSection } from "@/components/BackgroundSection";
import { Section } from "@/components/Layout";
import "./voicebank.css";
import LitCharacterSection from "./LitCharacterSection";
import LitDownloadSection from "./LitDownloadSection";
import LitMainSection from "./LitMainSection";
import LitRulesSection from "./LitRulesSection";

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
    <Section id="voicebank" className="overflow-hidden p-0">
      <LitMainSection />

      <BackgroundSection backgroundImage="/LitBG.webp">
        <LitCharacterSection sizePreset="default" />
        <LitDownloadSection />
        <LitRulesSection />
      </BackgroundSection>
    </Section>
  );
}
