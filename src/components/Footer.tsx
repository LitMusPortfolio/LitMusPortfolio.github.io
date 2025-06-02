import { Link } from "react-router-dom";
import styled from "styled-components";
import LazyImage from "./LazyImage";
import { SocialLinks } from "./SocialLinks";

const FooterContainer = styled.footer`
  background: #000;
  padding: 3rem 6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
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
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const PageTop = styled(LazyImage)`
  cursor: pointer;
  width: 10rem;
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  border: 0.1rem solid white;
  padding: 0.5rem 4rem;
  border-radius: 3rem;
  font-size: 1.5rem;
`;

const SNSLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  span {
    margin-right: 0.5rem;
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
          <PageTop
            src="/001_top/FooterPageTop.svg"
            alt=""
            aria-hidden="true"
            onClick={scrollToTop}
          />
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
