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
  
  /* 右端まで伸びる罫線 */
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    margin-left: 2rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    
    &::after {
      display: none;
    }
  }
`;
