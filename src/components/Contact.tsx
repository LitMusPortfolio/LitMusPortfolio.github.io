import styled from "styled-components";

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: #0a0a0a;
  position: relative;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 4rem;
  text-align: center;
  background: linear-gradient(45deg, #00ff00, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContactForm = styled.form`
  background: rgba(255, 255, 255, 0.03);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
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

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(0, 255, 0, 0.2);
      border-color: #00ff00;
      transform: translateY(-3px);
    }
    
    img {
      width: 24px;
      height: 24px;
      filter: brightness(0) invert(1);
    }
  }
`;

const SideDecoration = styled.div`
  position: absolute;
  right: -100px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  
  img {
    height: 200px;
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理
    console.log("フォームが送信されました");
  };

  return (
    <ContactSection id="contact">
      <SideDecoration>
        <img src="/010_PageSideTitleSvg/CONTACT.svg" alt="CONTACT" />
      </SideDecoration>

      <Container>
        <SectionTitle>CONTACT</SectionTitle>

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

          <SocialLinks>
            <a
              href="https://twitter.com/litmus9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/001_top/icon_X.svg" alt="X (Twitter)" />
            </a>
            <a
              href="https://www.youtube.com/@litmus9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/001_top/icon_youtube.svg" alt="YouTube" />
            </a>
            <a
              href="https://www.nicovideo.jp/user/12345678"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/001_top/icon_niconico.svg" alt="niconico" />
            </a>
          </SocialLinks>
        </ContactInfo>
      </Container>
    </ContactSection>
  );
}
