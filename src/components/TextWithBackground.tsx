import styled from "styled-components";

interface TextWithBackgroundProps {
  children: React.ReactNode;
  isPurple?: boolean;
}

const Container = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  line-height: 1;
  /* フォントのメトリクスに基づく調整 */
  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 1em;
  }
`;

const Background = styled.div<{
  isPurple?: boolean;
}>`
  position: absolute;
  /* テキストの実際の高さに合わせる */
  top: 0.18em;
  bottom: 0.05em;
  left: -0.001rem;
  right: -0.001rem;
  background-image: ${(props) =>
    props.isPurple ? "url('/titleBG.webp')" : "url('/nameBG.webp')"};
  background-size: auto 100%;
  background-position: center;
  background-repeat: repeat-x;
  z-index: ${({ theme }) => theme.zIndex.behind};
`;

const Content = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: block;
  /* 上下の余白を削除 */
  line-height: 0.8;
  padding: 0.1em 0;
`;

export default function TextWithBackground({
  children,
  isPurple = false,
}: TextWithBackgroundProps) {
  return (
    <Container>
      <Background isPurple={isPurple} />
      <Content>{children}</Content>
    </Container>
  );
}
