import styled from "styled-components";

const ShopSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: #050505;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Message = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  line-height: 1.8;
`;

export default function ShopPage() {
  return (
    <ShopSection>
      <Container>
        <Title>SHOP</Title>
        <Message>
          オンラインショップは現在準備中です。
          <br />
          今しばらくお待ちください。
        </Message>
      </Container>
    </ShopSection>
  );
}
