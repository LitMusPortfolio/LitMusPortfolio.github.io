import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LitCharacter from "./components/LitCharacter";

export default function VoicebankPage() {
  const location = useLocation();

  useEffect(() => {
    // URLハッシュがある場合、該当セクションにスクロール
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return <LitCharacter />;
}
