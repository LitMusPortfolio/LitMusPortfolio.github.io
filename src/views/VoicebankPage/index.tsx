"use client";

import { useEffect } from "react";
import { BackgroundSection } from "@/components/BackgroundSection";
import { Section } from "@/components/Layout";
import "./voicebank.css";
import LitCharacterSection from "./LitCharacterSection";
import LitDownloadSection from "./LitDownloadSection";
import LitMainSection from "./LitMainSection";
import LitRulesSection from "./LitRulesSection";

export default function VoicebankPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

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
