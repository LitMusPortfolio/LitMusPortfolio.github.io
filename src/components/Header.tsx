import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

export default function Header() {
  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[9999] bg-[rgba(0,0,0,0.3)] py-2 backdrop-blur-[10px]">
      <nav
        className="mx-auto flex max-w-[95%] items-center justify-between px-8 max-sm:px-4"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          aria-label="LitMus9 home"
          className="inline-block h-10"
        >
          <LazyImage src="/001_top/LitMus9_logo.webp" alt="LitMus9" eager />
        </Link>
        <ul className="my-[17.6px] flex gap-8">
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
              <ExternalLink className="ml-1 inline-block h-[0.8em] w-[0.8em]" />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/contact" onClick={handleNavClick}>
              Contact
            </Link>
          </MenuItem>
        </ul>
      </nav>
    </header>
  );
}

function MenuItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="font-[Montserrat,sans-serif] before:content-[''] [&_a]:uppercase [&_a]:tracking-[0.1em] [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-primary-light">
      {children}
    </li>
  );
}
