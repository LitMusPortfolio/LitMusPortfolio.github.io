import styled from "styled-components";
import { Container, Section, SideDecoration } from "@/components/Layout/";
import { theme } from "@/styles/theme";
import { glassmorphism } from "@/styles/utils";

const AboutContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const ContentCard = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  ${glassmorphism}
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(139, 92, 246, 0.2);
  max-width: 1000px;
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 2rem;
    gap: 2rem;
  }
`;

const CharacterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CharacterImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  border: 3px solid ${theme.colors.primary.main};
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(139, 92, 246, 0.3));
    pointer-events: none;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AboutTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, ${theme.colors.primary.light}, ${theme.colors.primary.main});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.2em;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const ProfileName = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: 600;
`;

const ProfileDescription = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  white-space: pre-line;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  
  &::before {
    content: '▸';
    color: ${theme.colors.primary.light};
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

export default function About() {
  return (
    <Section id="about">
      <SideDecoration $side="left">
        <img src="/010_PageSideTitleSvg/ABOUT.svg" alt="ABOUT" />
      </SideDecoration>

      <AboutContainer>
        <ContentCard>
          <CharacterSection>
            <CharacterImageWrapper>
              <CharacterImage src="/002_about/LitMusIcon.webp" alt="LitMus9" />
            </CharacterImageWrapper>
          </CharacterSection>

          <ContentSection>
            <AboutTitle>ABOUT</AboutTitle>
            <ProfileName>LitMus9</ProfileName>
            <ProfileDescription>{`音楽 / イラスト / デザイン / 動画 / 合成音声用ライブラリ提供

2020年5月3日生まれ。

22才あたりからかろうじてONIイラストを描き、
イラストを描く中で、現在制作される動画を自作で制作を始める。
また、VOCALOID等で音楽制作を始める。

ジャンルに囚われず自分が好きなものに挑戦するのが好き。
メインの活動を更新せず、音楽とイラストも描きも同じ熱量で活動している。

合成音声に深く関係を持ち、オープンソースの各種GentleDataの提供からリリースまで
あり、合成音声ライブラリ『離途』ではあらゆる音声調教からイラスト、動画制作
までマルチに制作を行う。

好きな食べ物は焼肉。`}</ProfileDescription>

            <InfoList>
              <InfoItem>音楽制作 - VOCALOID・合成音声楽曲の作詞作曲</InfoItem>
              <InfoItem>
                イラスト制作 - キャラクターデザイン・イラストレーション
              </InfoItem>
              <InfoItem>動画制作 - MV・PV制作</InfoItem>
              <InfoItem>合成音声ライブラリ開発 - 『離途』開発者</InfoItem>
            </InfoList>
          </ContentSection>
        </ContentCard>
      </AboutContainer>
    </Section>
  );
}
