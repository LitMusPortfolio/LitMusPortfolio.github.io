import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.max};
  background: ${theme.effects.glassmorphism.background};
  backdrop-filter: ${theme.effects.glassmorphism.backdropFilter};
  padding: ${theme.space.sm} 0;
`;

const Nav = styled.nav`
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.space.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.space.sm};
  }
`;

const Logo = styled(Link)`
  display: inline-block;
  
  img {
    height: ${theme.sizes.button.md};
    cursor: pointer;
  }
`;

const MenuList = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  gap: ${theme.space.lg};
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    position: fixed;
    top: 0;
    right: ${(props) => (props.$isOpen ? "0" : "-100%")};
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, ${theme.opacity[95]});
    flex-direction: column;
    justify-content: center;
    gap: ${theme.space.xl};
    transition: right ${theme.animation.duration.base} ease;
  }
`;

const MenuItem = styled.li`
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  
  a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: ${theme.typography.heading.letterSpacingEn};
    transition: color ${theme.animation.duration.base} ease;
    font-size: ${theme.typography.fontSize.sm};
    
    &:hover {
      color: ${theme.colors.primary.light};
    }
  }
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
    // Force scroll to top
    window.scrollTo(0, 0);
  };

  return (
    <HeaderContainer>
      <Nav aria-label="Main navigation">
        <Logo
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          aria-label="LitMus9 home"
        >
          <img src="/001_top/LitMus9_logo.webp" alt="LitMus9" />
        </Logo>
        <MenuList $isOpen={isMenuOpen}>
          <MenuItem>
            <Link to="/about" onClick={handleNavClick}>
              About
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/works" onClick={handleNavClick}>
              Works
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/voicebank" onClick={handleNavClick}>
              Voicebank
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/shop" onClick={handleNavClick}>
              Shop
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/contact" onClick={handleNavClick}>
              Contact
            </Link>
          </MenuItem>
        </MenuList>
      </Nav>
    </HeaderContainer>
  );
}
