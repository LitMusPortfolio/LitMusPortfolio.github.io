import { useState } from "react";
import styled, { keyframes } from "styled-components";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";

// ロゴの回転アニメーション
const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// スタイル付きコンポーネント
const AppContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0;
`;

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`;

const AnimatedLogo = styled(Logo)`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${logoSpin} infinite 20s linear;
  }
`;

const Card = styled.div`
  padding: 2em;
`;

const ReadTheDocs = styled.p`
  color: #888;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppContainer>
      <LogoContainer>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <Logo src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <AnimatedLogo src={reactLogo} className="react" alt="React logo" />
        </a>
      </LogoContainer>
      <h1>Vite + React</h1>
      <Card>
        <button onClick={() => setCount((count) => count + 1)} type="button">
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
      <ReadTheDocs>Click on the Vite and React logos to learn more</ReadTheDocs>
    </AppContainer>
  );
}

export default App;
