import styled, { css } from "styled-components";
import { Container, GridContainer, Section } from "@/components/Layout";
import LazyImage from "@/components/LazyImage";
import SectionTitle from "@/components/SectionTitle";
import TitleWithLine from "@/components/TitleWithLine";
import { theme } from "@/styles/theme";
// 型定義
import type { ProfileData } from "@/types";
import ProfileSection from "../components/ProfileSection";
import type { CharacterDisplayConfig } from "../config/characterConfig";
import { getCharacterConfig } from "../config/characterConfig";

interface LitCharacterSectionProps {
  // サイズプリセット: "default" | "large" | "small" | "compact"
  sizePreset?: keyof typeof import("../config/characterConfig").CHARACTER_PRESETS;
  // カスタム設定（プリセットを上書き）
  customConfig?: Partial<CharacterDisplayConfig>;
}

// CSS変数を生成する関数
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

interface DemoSong {
  id: string;
  title: string;
  embedId: string;
}

// プロフィールデータ（左側）
const PROFILE_DATA_LEFT: ProfileData[] = [
  { label: "誕生日", value: "10月10日" },
  { label: "年齢", value: "不明" },
  { label: "身長", value: "180cm" },
  { label: "体重", value: "200kg" },
  { label: "一人称", value: "ボク" },
];

// プロフィールデータ（右側）
const PROFILE_DATA_RIGHT: ProfileData[] = [
  { label: "趣味", value: "旅行、歌、瞑想" },
  { label: "好き", value: "日光浴、さつまいも" },
  { label: "嫌い", value: "わからない" },
  { label: "特筆事項", value: "記憶喪失" },
  { label: "目的", value: "自分が何者か知る" },
];

// デモソングデータ
const DEMO_SONGS: DemoSong[] = [
  {
    id: "1",
    title: "僕の人生は僕だけのものだった/離途",
    embedId: "szoC6fCe4dU",
  },
  { id: "2", title: "牢 - 離途", embedId: "Am0LJH7ipv0" },
];

// プロフィールコンテナ（全体）
const ProfileWrapper = styled(GridContainer)`
  width: 100%;
`;

// デモソングセクション
const DemoSongSection = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

// デモソングコンテナ
const DemoSongContainer = styled(GridContainer)`
`;

// デモソングアイテム
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

// キャラクター画像コンテナ
const CharacterImageContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: var(--character-height);
  max-width: var(--character-max-width);
  width: auto;
  z-index: var(--character-z-index);
  transition: all 0.3s ease;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: var(--character-display, none);
  }
`;

// キャラクター画像
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
  padding: 0;
  ${({ $config }) => generateCharacterSizeVars($config)}
`;

// 左側スペーサー
const LeftSpacer = styled.div`
  width: var(--spacer-width);
  flex-shrink: 0;
  transition: width 0.3s ease;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

// コンテンツエリア
const ContentArea = styled.div`
  flex: 1;
`;

// メインコンテナ
const MainContainer = styled(Container)`
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

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
          src="/101_Lit/LitB_差し替え前提.webp"
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
