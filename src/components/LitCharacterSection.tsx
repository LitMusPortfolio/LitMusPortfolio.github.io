import styled from "styled-components";
import { theme } from "../styles/theme";
import TextWithBackground from "./TextWithBackground";

// 型定義
interface ProfileData {
  label: string;
  value: string;
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

// キャラクター詳細セクション
const CharacterDetailSection = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 45% 55%;
  align-items: center;
  position: relative;
  background: url("/LitBG.webp") no-repeat center center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

// 統合コンテナ（右側のコンテンツエリア）
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  z-index: 2;
  margin-left: 2rem;
  padding-right: 4rem;
  
  @media (max-width: 968px) {
    padding: 0 2rem;
    align-items: center;
  }
`;

// セクションタイトルのラッパー
const SectionTitleWrapper = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 8rem;
  margin-bottom: 2rem;
`;

// キャラクター名と罫線のコンテナ
const CharacterNameContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
`;

// キャラクター名
const CharacterName = styled.h2`
  font-size: 4rem;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin: 0;
  padding-right: 1rem;
  white-space: nowrap;
`;

// 共通罫線スタイル
const LineBase = styled.div`
  flex: 1;
  background: ${theme.colors.text.primary};
`;

// 名前用の罫線
const NameLine = styled(LineBase)`
  height: 2px;
  opacity: 0.5;
`;

// プロフィールコンテナ（全体）
const ProfileWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// プロフィールコンテナ（個別）
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

// プロフィール項目
const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: ${theme.colors.text.primary};
  width: 100%;
`;

// プロフィールラベル
const ProfileLabel = styled.span`
  
  font-weight: bold;
  font-size: 2rem;
`;

// プロフィール用の罫線
const ProfileLine = styled(LineBase)`
  height: 1px;
  opacity: 0.8;
  margin: 0 1rem;
`;

// プロフィール値
const ProfileValue = styled.span`
  white-space: nowrap;
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
      <CharacterDetailSection>
        <LeftSection>
          <CharacterImage
            src="/101_Lit/LitB_差し替え前提.webp"
            alt="離途 キャラクター"
          />
        </LeftSection>
        <ContentContainer>
          <SectionTitleWrapper>
            <TextWithBackground>CHARACTER</TextWithBackground>
          </SectionTitleWrapper>
          <CharacterNameContainer>
            <CharacterName>離途</CharacterName>
            <NameLine />
          </CharacterNameContainer>
          <ProfileWrapper>
            <ProfileContainer>
              {PROFILE_DATA_LEFT.map((item) => (
                <ProfileItem key={item.label}>
                  <ProfileLabel>{item.label}</ProfileLabel>
                  <ProfileLine />
                  <ProfileValue>{item.value}</ProfileValue>
                </ProfileItem>
              ))}
            </ProfileContainer>
            <ProfileContainer>
              {PROFILE_DATA_RIGHT.map((item) => (
                <ProfileItem key={item.label}>
                  <ProfileLabel>{item.label}</ProfileLabel>
                  <ProfileLine />
                  <ProfileValue>{item.value}</ProfileValue>
                </ProfileItem>
              ))}
            </ProfileContainer>
          </ProfileWrapper>
        </ContentContainer>
      </CharacterDetailSection>
    </>
  );
}
