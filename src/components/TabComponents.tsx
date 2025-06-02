import styled from "styled-components";
import { theme } from "../styles/theme";

// タブコンポーネント
export const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* 右端まで伸びる罫線 */
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    margin-left: 2rem;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 1.5rem;
    
    &::after {
      display: none;
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 1rem;
    padding-bottom: 0.5rem;
  }
  
  @media (max-width: ${theme.breakpoints.small}) {
    gap: 0.75rem;
  }
`;
