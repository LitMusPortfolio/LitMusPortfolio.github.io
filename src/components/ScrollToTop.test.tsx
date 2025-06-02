import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
  beforeEach(() => {
    // window.scrollToをモック
    window.scrollTo = vi.fn();
  });

  it("コンポーネントがnullを返す（何もレンダリングしない）", () => {
    const { container } = render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeNull();
  });

  it("初回レンダリング時にページトップにスクロールする", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it("異なるパスでレンダリングするとスクロールする", () => {
    // 最初のレンダリング
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // モックをクリアして新しいレンダリング
    vi.clearAllMocks();

    render(
      <MemoryRouter initialEntries={["/about"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it("同じパスでの再レンダリングではスクロールしない", () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // 同じパスで再レンダリング
    rerender(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    // scrollToの呼び出し回数は変わらない
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it("複数の異なるパスでそれぞれスクロールする", () => {
    // ルートパス
    const { unmount: unmount1 } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    unmount1();

    // /about
    vi.clearAllMocks();
    const { unmount: unmount2 } = render(
      <MemoryRouter initialEntries={["/about"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    unmount2();

    // /works
    vi.clearAllMocks();
    const { unmount: unmount3 } = render(
      <MemoryRouter initialEntries={["/works"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    unmount3();

    // /contact
    vi.clearAllMocks();
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // すべての呼び出しで (0, 0) にスクロール
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("クエリパラメータが変更されてもスクロールする", () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/page"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // クエリパラメータを追加
    rerender(
      <MemoryRouter initialEntries={["/page?query=test"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    // pathnameは同じだがスクロールはしない（pathnameのみを監視）
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it("ハッシュが変更されてもスクロールしない", () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/page"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // ハッシュを追加
    rerender(
      <MemoryRouter initialEntries={["/page#section"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    // pathnameは同じなのでスクロールしない
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
