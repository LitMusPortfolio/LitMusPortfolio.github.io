import styled from "styled-components";
import { theme } from "../styles/theme";
import TextWithBackground from "./TextWithBackground";

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

// 罫線
const NameLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${theme.colors.text.primary};
  opacity: 0.5;
`;

// プロフィールコンテナ
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 2rem;
  width: 100%;
`;

// プロフィール項目
const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  width: 100%;
`;

// プロフィールラベル
const ProfileLabel = styled.span`
  min-width: 8rem;
  font-weight: bold;
  opacity: 0.8;
  padding-right: 1rem;
`;

// プロフィール罫線
const ProfileLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${theme.colors.text.primary};
  opacity: 0.3;
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
          <ProfileContainer>
            <ProfileItem>
              <ProfileLabel>誕生日</ProfileLabel>
              <ProfileLine />
              <ProfileValue>10月10日</ProfileValue>
            </ProfileItem>
            <ProfileItem>
              <ProfileLabel>年齢</ProfileLabel>
              <ProfileLine />
              <ProfileValue>不明</ProfileValue>
            </ProfileItem>
            <ProfileItem>
              <ProfileLabel>身長</ProfileLabel>
              <ProfileLine />
              <ProfileValue>180cm</ProfileValue>
            </ProfileItem>
            <ProfileItem>
              <ProfileLabel>体重</ProfileLabel>
              <ProfileLine />
              <ProfileValue>200kg</ProfileValue>
            </ProfileItem>
            <ProfileItem>
              <ProfileLabel>一人称</ProfileLabel>
              <ProfileLine />
              <ProfileValue>ボク</ProfileValue>
            </ProfileItem>
          </ProfileContainer>
        </ContentContainer>
      </CharacterDetailSection>
    </>
  );
}
