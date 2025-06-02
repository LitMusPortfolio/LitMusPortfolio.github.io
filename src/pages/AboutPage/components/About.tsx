import styled from "styled-components";
import { BackgroundSection } from "@/components/BackgroundSection";
import { Container, GridContainer } from "@/components/Layout";
import LazyImage from "@/components/LazyImage";
import SectionTitle from "@/components/SectionTitle";

const StyledGridContainer = styled(GridContainer)`
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  border: ${({ theme }) => theme.borders.width.thick} solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borders.radius.lg};
  overflow: hidden;
`;

const CharacterImage = styled(LazyImage)`
  width: 100%;
  height: auto;
  display: block;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const RightSection = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  padding-right: ${({ theme }) => theme.space["2xl"]};
`;

const ProfileTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.space.sm};
  letter-spacing: ${({ theme }) => theme.typography.heading.letterSpacingEn};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }
`;

const ProfileSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.space.xl};
  padding-bottom: ${({ theme }) => theme.space.md};
  border-bottom: ${({ theme }) => theme.borders.width.thin} solid ${({ theme }) => `rgba(255, 255, 255, ${theme.opacity[30]})`};
`;

const ProfileDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: 2;
  color: ${({ theme }) => `rgba(255, 255, 255, ${theme.opacity[95]})`};
  
  p {
    margin-bottom: ${({ theme }) => theme.space.md};
  }
`;

export default function About() {
  return (
    <BackgroundSection id="about" backgroundImage="/LitMusBG.webp">
      <Container>
        <SectionTitle>ABOUT</SectionTitle>

        <StyledGridContainer
          $columns="1fr 1fr"
          $gap="6rem"
          $mobileColumns="1fr"
        >
          <LeftSection>
            <ImageFrame>
              <CharacterImage
                src="/002_about/LitMusIcon.webp"
                alt="LitMus"
                fallback="/002_about/LitMusIcon.webp"
              />
            </ImageFrame>
          </LeftSection>

          <RightSection>
            <ProfileTitle>LitMus</ProfileTitle>
            <ProfileSubtitle>
              音楽 / イラスト / デザイン / 動画 / 合成音声用ライブラリ提供
            </ProfileSubtitle>

            <ProfileDescription>
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
            </ProfileDescription>
          </RightSection>
        </StyledGridContainer>
      </Container>
    </BackgroundSection>
  );
}
