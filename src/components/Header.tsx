import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";
import LazyImage from "./LazyImage";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.max};
  background: ${theme.effects.glassmorphism.background};
  backdrop-filter: ${theme.effects.glassmorphism.backdropFilter};
  padding: ${theme.space.xs} 0;
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
  height: ${theme.sizes.button.md};
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: ${theme.space.lg};
`;

const MenuItem = styled.li`
  font-family: 'Montserrat', sans-serif;

  a {
    color: ${theme.colors.text.primary};
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: ${theme.typography.heading.letterSpacingEn};
    
    &:hover {
      color: ${theme.colors.primary.light};
    }
  }

  &::before {
    content: '';
  }
`;

const ExternalLinkIcon = styled.span`
  display: inline-block;
  width: 0.8em;
  height: 0.8em;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 60%;
    border: ${theme.borders.width.base} solid currentColor;
    border-bottom: none;
    border-left: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 30%;
    right: 30%;
    width: 70%;
    height: ${theme.borders.width.base};
    background: currentColor;
    transform: rotate(-45deg);
    transform-origin: right center;
  }
`;

const Header = React.memo(() => {
  const handleNavClick = () => {
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
          <LazyImage src="/001_top/LitMus9_logo.webp" alt="LitMus9" eager />
        </Logo>
        <MenuList>
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
            <Link
              to="https://litmus9.booth.pm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop
              <ExternalLinkIcon />
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
});

export default Header;
