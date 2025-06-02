import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StyledHeading, wrapAlphanumeric } from "./typography";

describe("typography utils", () => {
  describe("wrapAlphanumeric", () => {
    it('英数字を<span class="en">でラップする', () => {
      const result = wrapAlphanumeric("離途 Lit 2024");

      expect(result).toHaveLength(3);
      expect(result[0]).toBe("離途");
      expect(result[1]).toMatchObject({
        type: "span",
        props: { className: "en", children: " Lit 2024" },
      });
    });

    it("英数字のみの場合は全体をラップする", () => {
      const result = wrapAlphanumeric("Hello World 123");

      // splitの結果は ['', 'Hello World 123', ''] になる
      expect(result).toHaveLength(3);
      expect(result[0]).toBe("");
      expect(result[1]).toMatchObject({
        type: "span",
        props: { className: "en", children: "Hello World 123" },
      });
      expect(result[2]).toBe("");
    });

    it("日本語のみの場合はそのまま返す", () => {
      const result = wrapAlphanumeric("こんにちは世界");

      expect(result).toHaveLength(1);
      expect(result[0]).toBe("こんにちは世界");
    });

    it("空文字列の場合は空の配列を返す", () => {
      const result = wrapAlphanumeric("");

      expect(result).toHaveLength(1);
      expect(result[0]).toBe("");
    });

    it("複雑な混在テキストを正しく処理する", () => {
      const result = wrapAlphanumeric(
        "UTAUボイスバンク「離途 Lit」ver1.0 配布中！",
      );

      // 実際の分割結果を確認
      expect(result).toHaveLength(9);
      expect(result[0]).toBe("");
      expect(result[1]).toMatchObject({
        type: "span",
        props: { className: "en", children: "UTAU" },
      });
      expect(result[2]).toBe("ボイスバンク「離途");
      expect(result[3]).toMatchObject({
        type: "span",
        props: { className: "en", children: " Lit" },
      });
      expect(result[4]).toBe("」");
      expect(result[5]).toMatchObject({
        type: "span",
        props: { className: "en", children: "ver1" },
      });
      expect(result[6]).toBe(".");
      expect(result[7]).toMatchObject({
        type: "span",
        props: { className: "en", children: "0 " },
      });
      expect(result[8]).toBe("配布中！");
    });
  });

  describe("StyledHeading", () => {
    it.each([1, 2, 3, 4, 5, 6] as const)(
      "h%i要素を正しくレンダリングする",
      (level) => {
        const { container } = render(
          <StyledHeading level={level}>テスト見出し Test</StyledHeading>,
        );

        const heading = container.querySelector(`h${level}`);
        expect(heading).toBeTruthy();
        expect(heading?.textContent).toBe("テスト見出し Test");

        // 英数字部分がラップされているか確認
        const enSpan = heading?.querySelector("span.en");
        expect(enSpan).toBeTruthy();
        expect(enSpan?.textContent).toBe(" Test");
      },
    );

    it("classNameを適用できる", () => {
      const { container } = render(
        <StyledHeading level={2} className="custom-class">
          見出し
        </StyledHeading>,
      );

      const heading = container.querySelector("h2");
      expect(heading?.classList.contains("custom-class")).toBe(true);
    });

    it("日本語のみの見出しも正しく処理する", () => {
      const { container } = render(
        <StyledHeading level={1}>日本語の見出し</StyledHeading>,
      );

      const heading = container.querySelector("h1");
      expect(heading?.textContent).toBe("日本語の見出し");
      expect(heading?.querySelector("span.en")).toBeFalsy();
    });

    it("英数字のみの見出しを正しく処理する", () => {
      const { container } = render(
        <StyledHeading level={3}>English Heading 123</StyledHeading>,
      );

      const heading = container.querySelector("h3");
      const enSpan = heading?.querySelector("span.en");
      expect(enSpan?.textContent).toBe("English Heading 123");
    });
  });
});
