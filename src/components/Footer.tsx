import { Link } from "react-router-dom";
import styled from "styled-components";
import LazyImage from "./LazyImage";
import { SocialLinks } from "./SocialLinks";

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background.darker};
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space['3xl']};
  border-top: ${({ theme }) => theme.borders.width.thin} solid ${({ theme }) => `rgba(255, 255, 255, ${theme.opacity[10]})`};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.lg};
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.space.lg};
  border-top: ${({ theme }) => theme.borders.width.thin} solid ${({ theme }) => `rgba(255, 255, 255, ${theme.opacity[10]})`};
  color: ${({ theme }) => `rgba(255, 255, 255, ${theme.opacity[50]})`};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

const PageTop = styled.div`
  cursor: pointer;
  width: 10rem;
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  border: ${({ theme }) => theme.borders.width.thin} solid ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space['2xl']};
  border-radius: ${({ theme }) => theme.borders.radius['2xl']};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const SNSLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
  
  span {
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      platform: "X (Twitter)",
      url: "https://twitter.com/litmus9",
      icon: "/001_top/icon_X.svg",
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@litmus9",
      icon: "/001_top/icon_youtube.svg",
    },
    {
      platform: "niconico",
      url: "https://www.nicovideo.jp/user/12345678",
      icon: "/001_top/icon_niconico.svg",
    },
  ];

  return (
    <>
      <FooterContainer>
        <LeftSection>
          <PageTop onClick={scrollToTop}>
            <LazyImage
              src="/001_top/FooterPageTop.svg"
              alt=""
              aria-hidden="true"
            />
          </PageTop>
        </LeftSection>
        <RightSection>
          <SNSLinksWrapper>
            <span>SNS</span>
            <SocialLinks links={socialLinks} size="small" />
          </SNSLinksWrapper>
          <Contact>
            <Link to="/contact">CONTACT ▶</Link>
          </Contact>
          <Copyright>
            <p>&copy; 2022 - 2025 LitMus9_. All rights reserved.</p>
          </Copyright>
        </RightSection>
      </FooterContainer>
    </>
  );
}
