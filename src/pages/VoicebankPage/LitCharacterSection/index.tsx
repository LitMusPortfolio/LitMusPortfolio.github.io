import styled, { css } from "styled-components";
import { Container, GridContainer, Section } from "@/components/Layout";
import LazyImage from "@/components/LazyImage";
import SectionTitle from "@/components/SectionTitle";
import TitleWithLine from "@/components/TitleWithLine";
import { theme } from "@/styles/theme";
import ProfileSection from "./ProfileSection";

// ============================================
// 型定義
// ============================================

type ProfileData = {
  label: string;
  value: string;
};

type CharacterDisplayConfig = {
  desktop: {
    height: string;
    maxWidth: string;
    spacerWidth: string;
    imagePosition?: string;
    zIndex?: number;
  };
  tablet: {
    height: string;
    maxWidth: string;
    spacerWidth: string;
  };
  mobile: {
    display: "none" | "block";
  };
};

type DemoSong = {
  id: string;
  title: string;
  embedId: string;
};

// ============================================
// キャラクター表示設定
// ============================================

const DEFAULT_CHARACTER_CONFIG: CharacterDisplayConfig = {
  desktop: {
    height: "95%",
    maxWidth: "600px",
    spacerWidth: "40%",
    imagePosition: "left bottom",
    zIndex: 1,
  },
  tablet: {
    height: "85%",
    maxWidth: "400px",
    spacerWidth: "35%",
  },
  mobile: {
    display: "none",
  },
};

const CHARACTER_PRESETS = {
  default: DEFAULT_CHARACTER_CONFIG,

  large: {
    desktop: {
      height: "100%",
      maxWidth: "700px",
      spacerWidth: "45%",
      imagePosition: "left bottom",
      zIndex: 1,
    },
    tablet: {
      height: "90%",
      maxWidth: "450px",
      spacerWidth: "40%",
    },
    mobile: {
      display: "none" as const,
    },
  },

  small: {
    desktop: {
      height: "85%",
      maxWidth: "500px",
      spacerWidth: "35%",
      imagePosition: "left bottom",
      zIndex: 1,
    },
    tablet: {
      height: "75%",
      maxWidth: "350px",
      spacerWidth: "30%",
    },
    mobile: {
      display: "none" as const,
    },
  },

  compact: {
    desktop: {
      height: "80%",
      maxWidth: "450px",
      spacerWidth: "30%",
      imagePosition: "left bottom",
      zIndex: 1,
    },
    tablet: {
      height: "70%",
      maxWidth: "300px",
      spacerWidth: "25%",
    },
    mobile: {
      display: "block" as const,
    },
  },
} as const;

function getCharacterConfig(
  preset: keyof typeof CHARACTER_PRESETS = "default",
): CharacterDisplayConfig {
  return CHARACTER_PRESETS[preset] || DEFAULT_CHARACTER_CONFIG;
}

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
// スタイル
// ============================================

const generateCharacterSizeVars = (config: CharacterDisplayConfig) => css`
  --character-height: ${config.desktop.height};
  --character-max-width: ${config.desktop.maxWidth};
  --spacer-width: ${config.desktop.spacerWidth};
  --character-z-index: ${config.desktop.zIndex || 1};
  --character-position: ${config.desktop.imagePosition || "left bottom"};

  @media (max-width: ${theme.breakpoints.tablet}) {
    --character-height: ${config.tablet.height};
    --character-max-width: ${config.tablet.maxWidth};
    --spacer-width: ${config.tablet.spacerWidth};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    --character-display: ${config.mobile.display};
  }
`;

const ProfileWrapper = styled(GridContainer)`
  width: 100%;
`;

const DemoSongSection = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const DemoSongContainer = styled(GridContainer)`
`;

const DemoSongItem = styled.div`
  aspect-ratio: 16 / 9;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const CharacterImageContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 95%;
  width: auto;
  z-index: var(--character-z-index);
  transition: all 0.3s ease;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: var(--character-display, none);
  }
`;

const CharacterImage = styled(LazyImage)`
  height: 100%;
  width: auto;

  img {
    height: 100%;
    width: auto;
    object-fit: contain;
    object-position: var(--character-position);
    filter: drop-shadow(${theme.shadows.glow.medium});
  }
`;

const CharacterSection = styled(Section)<{ $config: CharacterDisplayConfig }>`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $config }) => generateCharacterSizeVars($config)}
`;

const LeftSpacer = styled.div`
  width: var(--spacer-width);
  flex-shrink: 0;
  transition: width 0.3s ease;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MainContainer = styled(Container)`
  display: flex;
  gap: 3rem;
  align-items: center;
  height: 100%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

// ============================================
// コンポーネント
// ============================================

type LitCharacterSectionProps = {
  sizePreset?: keyof typeof CHARACTER_PRESETS;
  customConfig?: Partial<CharacterDisplayConfig>;
};

export default function LitCharacterSection({
  sizePreset = "default",
  customConfig,
}: LitCharacterSectionProps = {}) {
  const config = {
    ...getCharacterConfig(sizePreset),
    ...customConfig,
  } as CharacterDisplayConfig;

  return (
    <CharacterSection id="character" $config={config}>
      <CharacterImageContainer>
        <CharacterImage
          src="/201_Lit立ち絵/LitB.webp"
          alt="離途 キャラクター"
        />
      </CharacterImageContainer>
      <MainContainer>
        <LeftSpacer />
        <ContentArea>
          <SectionTitle isPurple>CHARACTER</SectionTitle>
          <TitleWithLine title="離途" />
          <ProfileWrapper $columns="4fr 6fr" $gap="3rem" $mobileColumns="1fr">
            <ProfileSection data={PROFILE_DATA_LEFT} />
            <ProfileSection data={PROFILE_DATA_RIGHT} />
          </ProfileWrapper>
          <DemoSongSection>
            <TitleWithLine title="デモソング" />
            <DemoSongContainer
              $columns="1fr 1fr"
              $gap="2rem"
              $mobileColumns="1fr"
            >
              {DEMO_SONGS.map((song) => (
                <DemoSongItem key={song.id}>
                  <iframe
                    src={`https://www.youtube.com/embed/${song.embedId}`}
                    title={song.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </DemoSongItem>
              ))}
            </DemoSongContainer>
          </DemoSongSection>
        </ContentArea>
      </MainContainer>
    </CharacterSection>
  );
}
