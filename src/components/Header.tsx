import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
`;

const Nav = styled.nav`
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(Link)`
  display: inline-block;
  
  img {
    height: 40px;
    cursor: pointer;
  }
`;

const MenuList = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${(props) => (props.$isOpen ? "0" : "-100%")};
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    transition: right 0.3s ease;
  }
`;

const MenuItem = styled.li`
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  
  a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color 0.3s ease;
    font-size: 0.9rem;
    
    &:hover {
      color: #00bfff;
    }
  }
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
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
