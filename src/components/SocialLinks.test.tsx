import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { describe, expect, it } from "vitest";
import { theme } from "@/styles/theme";
import type { SocialLink } from "@/types";
import { SocialLinks } from "./SocialLinks";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("SocialLinks", () => {
  const mockLinks: SocialLink[] = [
    {
      platform: "Twitter",
      url: "https://twitter.com/example",
      icon: "/icons/twitter.svg",
    },
    {
      platform: "YouTube",
      url: "https://youtube.com/example",
      icon: "/icons/youtube.svg",
    },
    {
      platform: "GitHub",
      url: "https://github.com/example",
      icon: "/icons/github.svg",
    },
  ];

  it("すべてのソーシャルリンクが表示される", () => {
    renderWithTheme(<SocialLinks links={mockLinks} />);

    mockLinks.forEach((link) => {
      const linkElement = screen.getByRole("link", { name: link.platform });
      expect(linkElement).toBeInTheDocument();
    });
  });

  it("リンクに正しいURLが設定される", () => {
    renderWithTheme(<SocialLinks links={mockLinks} />);

    mockLinks.forEach((link) => {
      const linkElement = screen.getByRole("link", { name: link.platform });
      expect(linkElement).toHaveAttribute("href", link.url);
    });
  });

  it("すべてのリンクが新しいタブで開くように設定される", () => {
    renderWithTheme(<SocialLinks links={mockLinks} />);

    const linkElements = screen.getAllByRole("link");
    linkElements.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("各プラットフォームのアイコンが表示される", () => {
    renderWithTheme(<SocialLinks links={mockLinks} />);

    mockLinks.forEach((link) => {
      const icon = screen.getByAltText(link.platform);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", link.icon);
    });
  });

  it("デフォルトサイズ（medium）が適用される", () => {
    const { container } = renderWithTheme(<SocialLinks links={mockLinks} />);

    const linkElements = container.querySelectorAll("a");
    linkElements.forEach((link) => {
      expect(link).toHaveStyle({ width: "32px", height: "32px" });
    });
  });

  it("smallサイズが正しく適用される", () => {
    const { container } = renderWithTheme(
      <SocialLinks links={mockLinks} size="small" />,
    );

    const linkElements = container.querySelectorAll("a");
    linkElements.forEach((link) => {
      expect(link).toHaveStyle({ width: "24px", height: "24px" });
    });
  });

  it("largeサイズが正しく適用される", () => {
    const { container } = renderWithTheme(
      <SocialLinks links={mockLinks} size="large" />,
    );

    const linkElements = container.querySelectorAll("a");
    linkElements.forEach((link) => {
      expect(link).toHaveStyle({ width: "40px", height: "40px" });
    });
  });

  it("空のリンク配列でもエラーにならない", () => {
    const { container } = renderWithTheme(<SocialLinks links={[]} />);

    expect(container).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("1つのリンクのみでも正しく表示される", () => {
    const singleLink: SocialLink[] = [
      {
        platform: "Twitter",
        url: "https://twitter.com/example",
        icon: "/icons/twitter.svg",
      },
    ];

    renderWithTheme(<SocialLinks links={singleLink} />);

    const linkElement = screen.getByRole("link", { name: "Twitter" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "https://twitter.com/example");
  });

  it("aria-labelが各リンクに設定される", () => {
    renderWithTheme(<SocialLinks links={mockLinks} />);

    mockLinks.forEach((link) => {
      const linkElement = screen.getByRole("link", { name: link.platform });
      expect(linkElement).toHaveAttribute("aria-label", link.platform);
    });
  });

  it("LazyImageコンポーネントがeagerモードで使用される", () => {
    renderWithTheme(<SocialLinks links={mockLinks} />);

    // LazyImageがeagerモードで即座に画像を表示していることを確認
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(mockLinks.length);
    images.forEach((img, index) => {
      expect(img).toHaveAttribute("src", mockLinks[index].icon);
    });
  });

  it("複数の同じプラットフォームのリンクも正しく表示される", () => {
    const duplicateLinks: SocialLink[] = [
      {
        platform: "Twitter Account 1",
        url: "https://twitter.com/example1",
        icon: "/icons/twitter.svg",
      },
      {
        platform: "Twitter Account 2",
        url: "https://twitter.com/example2",
        icon: "/icons/twitter.svg",
      },
    ];

    renderWithTheme(<SocialLinks links={duplicateLinks} />);

    const linkElement1 = screen.getByRole("link", { name: "Twitter Account 1" });
    const linkElement2 = screen.getByRole("link", { name: "Twitter Account 2" });
    
    expect(linkElement1).toHaveAttribute("href", "https://twitter.com/example1");
    expect(linkElement2).toHaveAttribute("href", "https://twitter.com/example2");
  });
});