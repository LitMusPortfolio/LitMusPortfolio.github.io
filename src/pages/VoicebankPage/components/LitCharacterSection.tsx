import styled from "styled-components";
import { ContentContainer, GridContainer } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import TitleWithLine from "@/components/TitleWithLine";
import { theme } from "@/styles/theme";
// 型定義
import type { ProfileData } from "@/types";
import ProfileSection from "./ProfileSection";

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
  { id: "1", title: "デモソング1", embedId: "dQw4w9WgXcQ" },
  { id: "2", title: "牢 - 離途", embedId: "Am0LJH7ipv0" },
];

// キャラクター詳細セクション
const CharacterDetailSection = styled(GridContainer)`
  min-height: 100vh;
  align-items: center;
`;

// コンテンツコンテナのカスタマイズ
const StyledContentContainer = styled(ContentContainer)`
  margin-left: 2rem;
  padding-top: 8rem;
  padding-bottom: 2rem;
  padding-right: 4rem;
  
  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "968px"}) {
    padding: 0 2rem;
    margin-left: 0;
  }
`;

// タイトルテキスト
const TitleText = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin: 0;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// プロフィールコンテナ（全体）
const ProfileWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 3rem;
  margin-top: 1rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// デモソングセクション
const DemoSongSection = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

// デモソングコンテナ
const DemoSongContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
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

// 左側のエリア（キャラクター画像用）
const LeftSection = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  
  @media (max-width: 968px) {
    display: none;
  }
`;

// キャラクター画像
const CharacterImage = styled.img`
  max-height: 100vh;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(${theme.shadows.glow.medium});
`;

export default function LitCharacterSection() {
  return (
    <>
      <CharacterDetailSection $columns="45% 55%" $mobileColumns="1fr">
        <LeftSection>
          <CharacterImage
            src="/101_Lit/LitB_差し替え前提.webp"
            alt="離途 キャラクター"
          />
        </LeftSection>
        <StyledContentContainer>
          <SectionTitle>CHARACTER</SectionTitle>
          <TitleWithLine>
            <TitleText>離途</TitleText>
          </TitleWithLine>
          <ProfileWrapper>
            <ProfileSection data={PROFILE_DATA_LEFT} />
            <ProfileSection data={PROFILE_DATA_RIGHT} />
          </ProfileWrapper>
          <DemoSongSection>
            <TitleWithLine>
              <TitleText>デモソング</TitleText>
            </TitleWithLine>
            <DemoSongContainer>
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
        </StyledContentContainer>
      </CharacterDetailSection>
    </>
  );
}
