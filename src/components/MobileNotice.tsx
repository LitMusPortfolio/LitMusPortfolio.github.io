import styled from "styled-components";

const NoticeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background.dark};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space["2xl"]};
  text-align: center;
  z-index: 9999;
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.space.lg};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  letter-spacing: ${({ theme }) => theme.typography.body.letterSpacing};
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
  line-height: 1.8;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  letter-spacing: ${({ theme }) => theme.typography.body.letterSpacing};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const SubMessage = styled.p`
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  letter-spacing: ${({ theme }) => theme.typography.body.letterSpacing};
`;

export const MobileNotice = () => {
  return (
    <NoticeContainer>
      <IconWrapper>💻</IconWrapper>
      <Title>PCでの閲覧をお願いします</Title>
      <Message>
        申し訳ございません。
        <br />
        現在このサイトはスマートフォンに
        <br />
        対応しておりません。
      </Message>
      <SubMessage>
        PCからアクセスしていただけますよう
        <br />
        お願いいたします。
      </SubMessage>
    </NoticeContainer>
  );
};
