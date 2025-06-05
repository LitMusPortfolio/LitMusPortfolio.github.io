import styled from "styled-components";
import { BackgroundSection } from "@/components/BackgroundSection";
import { Container, SideDecoration } from "@/components/Layout";
import LazyImage from "@/components/LazyImage";
import SectionTitle from "@/components/SectionTitle";
import TitleWithLine from "@/components/TitleWithLine";

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 7fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const CharacterImage = styled(LazyImage)`
  img {
    width: 80%;
    height: auto;
    display: block;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AboutSection = styled(BackgroundSection)`
  min-height: 0;
`;

export default function About() {
  return (
    <AboutSection id="about" backgroundImage="/LitMusBG.webp">
      <SideDecoration svgPath="/010_PageSideTitleSvg/ABOUT.svg" />
      <Container>
        <SectionTitle>ABOUT</SectionTitle>

        <ContentWrapper>
          <div>
            <CharacterImage
              src="/002_about/LitMusIcon.webp"
              alt="LitMus"
              fallback="/002_about/LitMusIcon.webp"
            />
          </div>

          <div>
            <TitleWithLine title="LitMus" />
            <h3 style={{ marginBottom: "1rem" }}>
              音楽 / イラスト / デザイン
              <br />
              動画 / 合成音声用ライブラリ提供
            </h3>

            <Profile>
              <p>2000年9月9日生まれ。</p>
              <p>
                2022年よりボーカロイドのMVイラストを担当。
                <br />
                イラストを描く傍ら、動画制作にも興味を持ち制作を始める。
                <br />
                また、2024年4月より音楽制作を開始する。
              </p>
              <p>
                ジャンルに囚われず様々な分野の制作に挑戦するのが好き。
                <br />
                メインの活動を定義せず、音楽もイラストも動画も同じ熱量で活動している。
              </p>
              <p>
                合成音声に深く興味を持ち、オープンソースであるOpenUtauの開発に携わったり、合成音声ライブラリ「離途」では自分が音声提供からイラスト、楽曲制作までマルチに制作を行う。
              </p>
              <p>好きな食べ物は回鍋肉。</p>
            </Profile>
          </div>
        </ContentWrapper>
      </Container>
    </AboutSection>
  );
}
