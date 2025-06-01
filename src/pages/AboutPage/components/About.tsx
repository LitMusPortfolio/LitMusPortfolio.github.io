import styled from "styled-components";
import { Container, Section, SideDecoration } from "@/components/Layout/";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";
import { glassmorphism } from "@/styles/utils";

const GridContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 300;
`;

const ProfileInfo = styled.div`
  margin-top: 3rem;
  ${glassmorphism}
  padding: 2rem;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.3);
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  strong {
    min-width: 140px;
    color: ${theme.colors.primary.light};
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  span {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: -40px;
    left: -40px;
    right: -40px;
    bottom: -40px;
    background: radial-gradient(circle at center, ${theme.colors.primary.main}, transparent);
    opacity: 0.3;
    filter: blur(60px);
    z-index: -1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 30px;
  box-shadow: 
    0 20px 60px rgba(139, 92, 246, 0.3),
    0 0 0 2px rgba(139, 92, 246, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const SkillsSection = styled.div`
  margin-top: 3rem;
`;

const SkillsTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: ${theme.colors.primary.light};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillTag = styled.span`
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: default;
  
  &:hover {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.2));
    border-color: ${theme.colors.primary.main};
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(139, 92, 246, 0.3);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatCard = styled.div`
  ${glassmorphism}
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  
  h4 {
    font-size: 2rem;
    color: ${theme.colors.primary.main};
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export default function About() {
  return (
    <Section id="about">
      <SideDecoration $side="left">
        <img src="/010_PageSideTitleSvg/ABOUT.svg" alt="ABOUT" />
      </SideDecoration>

      <GridContainer>
        <ContentWrapper>
          <SectionTitle>ABOUT</SectionTitle>
          <Description>
            LitMus9は音楽制作を中心に、イラストレーション、デザイン、
            3DCG、映像制作など幅広いクリエイティブ活動を展開しています。
          </Description>
          <Description>
            VOCALOIDプロデューサーとして、感情に訴える楽曲制作を心がけ、
            聴く人の心に残る作品づくりを目指しています。
          </Description>

          <ProfileInfo>
            <ProfileItem>
              <strong>活動開始</strong>
              <span>2020年〜</span>
            </ProfileItem>
            <ProfileItem>
              <strong>主な活動</strong>
              <span>音楽制作 / イラスト / デザイン</span>
            </ProfileItem>
            <ProfileItem>
              <strong>使用ソフト</strong>
              <span>Logic Pro / Photoshop / Blender</span>
            </ProfileItem>
          </ProfileInfo>

          <SkillsSection>
            <SkillsTitle>Skills & Expertise</SkillsTitle>
            <SkillsList>
              <SkillTag>音楽制作</SkillTag>
              <SkillTag>作詞・作曲</SkillTag>
              <SkillTag>イラスト</SkillTag>
              <SkillTag>3DCG</SkillTag>
              <SkillTag>映像編集</SkillTag>
              <SkillTag>デザイン</SkillTag>
            </SkillsList>
          </SkillsSection>

          <StatsContainer>
            <StatCard>
              <h4>50+</h4>
              <p>楽曲制作</p>
            </StatCard>
            <StatCard>
              <h4>100+</h4>
              <p>イラスト作品</p>
            </StatCard>
            <StatCard>
              <h4>5年</h4>
              <p>活動年数</p>
            </StatCard>
          </StatsContainer>
        </ContentWrapper>

        <ImageWrapper>
          <ProfileImage src="/002_about/LitMusIcon.webp" alt="LitMus9" />
        </ImageWrapper>
      </GridContainer>
    </Section>
  );
}
