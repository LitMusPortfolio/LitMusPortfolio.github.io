import Image from "next/image";
import { Container, GridContainer, Section } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import TitleWithLine from "@/components/TitleWithLine";
import ProfileSection from "./ProfileSection";

// ============================================
// 型定義
// ============================================

type ProfileData = {
  label: string;
  value: string;
};

type DemoSong = {
  id: string;
  title: string;
  embedId: string;
};

// ============================================
// キャラクター表示設定
// ============================================

const CHARACTER_PRESETS = {
  default: {
    desktop: {
      height: "95%",
      maxWidth: "600px",
      spacerWidth: "40%",
    },
  },
  large: {
    desktop: {
      height: "100%",
      maxWidth: "700px",
      spacerWidth: "45%",
    },
  },
  small: {
    desktop: {
      height: "85%",
      maxWidth: "500px",
      spacerWidth: "35%",
    },
  },
  compact: {
    desktop: {
      height: "80%",
      maxWidth: "450px",
      spacerWidth: "30%",
    },
  },
} as const;

// ============================================
// データ
// ============================================

const PROFILE_DATA_LEFT: ProfileData[] = [
  { label: "誕生日", value: "10月10日" },
  { label: "年齢", value: "不明" },
  { label: "身長", value: "180cm" },
  { label: "体重", value: "200kg" },
  { label: "一人称", value: "ボク" },
];

const PROFILE_DATA_RIGHT: ProfileData[] = [
  { label: "趣味", value: "旅行、歌、瞑想" },
  { label: "好き", value: "日光浴、さつまいも" },
  { label: "嫌い", value: "わからない" },
  { label: "特筆事項", value: "記憶喪失" },
  { label: "目的", value: "自分が何者か知る" },
];

const DEMO_SONGS: DemoSong[] = [
  {
    id: "1",
    title: "僕の人生は僕だけのものだった/離途",
    embedId: "szoC6fCe4dU",
  },
  { id: "2", title: "牢 - 離途", embedId: "Am0LJH7ipv0" },
];

// ============================================
// コンポーネント
// ============================================

type LitCharacterSectionProps = {
  sizePreset?: keyof typeof CHARACTER_PRESETS;
};

export default function LitCharacterSection({
  sizePreset = "default",
}: LitCharacterSectionProps = {}) {
  const config = CHARACTER_PRESETS[sizePreset];

  return (
    <Section
      id="character"
      className="relative flex min-h-screen items-center justify-center"
      style={
        {
          "--spacer-width": config.desktop.spacerWidth,
        } as React.CSSProperties
      }
    >
      {/* Character Image */}
      <div className="absolute bottom-0 left-0 z-[1] h-[95%] w-auto transition-all duration-300 max-sm:hidden">
        <Image
          src="/201_Lit立ち絵/LitB.webp"
          alt="離途 キャラクター"
          width={600}
          height={1000}
          className="h-full w-auto object-contain object-[left_bottom] drop-shadow-[var(--shadow-glow-md)]"
        />
      </div>

      {/* Main Container */}
      <Container className="flex h-full items-center gap-12 max-sm:flex-col">
        {/* Left Spacer */}
        <div
          className="shrink-0 transition-[width] duration-300 max-sm:hidden"
          style={{ width: "var(--spacer-width)" }}
        />

        {/* Content Area */}
        <div className="flex flex-1 flex-col justify-end">
          <SectionTitle isPurple>CHARACTER</SectionTitle>
          <TitleWithLine title="離途" />

          {/* Profile */}
          <GridContainer
            columns="4fr 6fr"
            gap="3rem"
            mobileColumns="1fr"
            className="w-full"
          >
            <ProfileSection data={PROFILE_DATA_LEFT} />
            <ProfileSection data={PROFILE_DATA_RIGHT} />
          </GridContainer>

          {/* Demo Songs */}
          <div className="mt-8 w-full">
            <TitleWithLine title="デモソング" />
            <GridContainer columns="1fr 1fr" gap="2rem" mobileColumns="1fr">
              {DEMO_SONGS.map((song) => (
                <div
                  key={song.id}
                  className="relative aspect-video overflow-hidden rounded-lg bg-white/10"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${song.embedId}`}
                    title={song.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-none"
                  />
                </div>
              ))}
            </GridContainer>
          </div>
        </div>
      </Container>
    </Section>
  );
}
