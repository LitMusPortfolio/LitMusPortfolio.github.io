import styled from "styled-components";
import { Container, Section, SideDecoration } from "@/components/Layout/";
import { PageTitle } from "@/components/PageTitle";
import { SocialLinks as CommonSocialLinks } from "@/components/SocialLinks";
import { glassmorphism } from "@/styles/utils";
import type { SocialLink } from "@/types";

const ContactSectionWrapper = styled(Section)`
  display: flex;
  align-items: center;
`;

const ContactContainer = styled(Container)`
  max-width: 800px;
`;

// SectionTitleはPageTitleコンポーネントで置き換え

const ContactForm = styled.form`
  ${glassmorphism}
  padding: 3rem;
  border-radius: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #00ff00;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00ff00;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00ff00;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #00ff00, #00ffff);
  border: none;
  border-radius: 50px;
  color: #000;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(0, 255, 0, 0.3);
  }
`;

const ContactInfo = styled.div`
  margin-top: 4rem;
  text-align: center;
`;

const InfoItem = styled.div`
  margin-bottom: 1.5rem;
  
  h3 {
    color: #00ff00;
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #fff;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
  }
`;

const SocialLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

// SideDecorationは共通コンポーネントを使用

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理
    console.log("フォームが送信されました");
  };

  const socialLinks: SocialLink[] = [
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
    <ContactSectionWrapper id="contact">
      <SideDecoration $side="right">
        <img src="/010_PageSideTitleSvg/CONTACT.svg" alt="CONTACT" />
      </SideDecoration>

      <ContactContainer>
        <PageTitle gradientColors={{ color1: "#00ff00", color2: "#00ffff" }}>
          CONTACT
        </PageTitle>

        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">お名前</Label>
            <Input type="text" id="name" name="name" required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" id="email" name="email" required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">件名</Label>
            <Input type="text" id="subject" name="subject" required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">メッセージ</Label>
            <TextArea id="message" name="message" required />
          </FormGroup>

          <SubmitButton type="submit">送信する</SubmitButton>
        </ContactForm>

        <ContactInfo>
          <InfoItem>
            <h3>Email</h3>
            <a href="mailto:contact@litmus9.com">contact@litmus9.com</a>
          </InfoItem>

          <SocialLinksWrapper>
            <CommonSocialLinks links={socialLinks} size="large" />
          </SocialLinksWrapper>
        </ContactInfo>
      </ContactContainer>
    </ContactSectionWrapper>
  );
}
