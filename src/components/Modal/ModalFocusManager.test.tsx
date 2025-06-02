import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useModalFocusManager, useScrollLock } from "./ModalFocusManager";

describe("useModalFocusManager", () => {
  let modalRef: React.RefObject<HTMLDivElement>;
  let mockOnClose: ReturnType<typeof vi.fn>;
  let mockFocusableElement: HTMLElement;
  let mockActiveElement: HTMLElement;

  beforeEach(() => {
    // DOM要素のモック
    mockFocusableElement = document.createElement("button");
    mockFocusableElement.focus = vi.fn();

    mockActiveElement = document.createElement("input");
    mockActiveElement.focus = vi.fn();

    // activeElementのモック
    Object.defineProperty(document, "activeElement", {
      writable: true,
      configurable: true,
      value: mockActiveElement,
    });

    // modalRefのモック
    modalRef = {
      current: {
        querySelectorAll: vi.fn().mockReturnValue([mockFocusableElement]),
      } as unknown as HTMLDivElement,
    };

    mockOnClose = vi.fn();

    // setTimeoutのモック
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("モーダルが開いたときに最初のフォーカス可能要素にフォーカスする", () => {
    renderHook(() =>
      useModalFocusManager({
        isOpen: true,
        modalRef,
        onClose: mockOnClose,
      }),
    );

    // setTimeoutが実行される
    vi.advanceTimersByTime(100);

    expect(modalRef.current?.querySelectorAll).toHaveBeenCalledWith(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    expect(mockFocusableElement.focus).toHaveBeenCalled();
  });

  it("Escapeキーでモーダルを閉じる", () => {
    renderHook(() =>
      useModalFocusManager({
        isOpen: true,
        modalRef,
        onClose: mockOnClose,
      }),
    );

    // Escapeキーイベントを発火
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(event);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("Tabキーでフォーカストラップが機能する", () => {
    const firstElement = document.createElement("button");
    const lastElement = document.createElement("button");
    firstElement.focus = vi.fn();
    lastElement.focus = vi.fn();

    modalRef.current = {
      querySelectorAll: vi.fn().mockReturnValue([firstElement, lastElement]),
    } as unknown as HTMLDivElement;

    renderHook(() =>
      useModalFocusManager({
        isOpen: true,
        modalRef,
        onClose: mockOnClose,
      }),
    );

    // 最後の要素がフォーカスされている状態でTabキー
    Object.defineProperty(document, "activeElement", {
      value: lastElement,
    });

    const tabEvent = new KeyboardEvent("keydown", { key: "Tab" });
    document.dispatchEvent(tabEvent);

    expect(firstElement.focus).toHaveBeenCalled();
  });

  it("Shift+Tabキーで逆方向のフォーカストラップが機能する", () => {
    const firstElement = document.createElement("button");
    const lastElement = document.createElement("button");
    firstElement.focus = vi.fn();
    lastElement.focus = vi.fn();

    modalRef.current = {
      querySelectorAll: vi.fn().mockReturnValue([firstElement, lastElement]),
    } as unknown as HTMLDivElement;

    renderHook(() =>
      useModalFocusManager({
        isOpen: true,
        modalRef,
        onClose: mockOnClose,
      }),
    );

    // 最初の要素がフォーカスされている状態でShift+Tabキー
    Object.defineProperty(document, "activeElement", {
      value: firstElement,
    });

    const shiftTabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
    });
    Object.defineProperty(shiftTabEvent, "preventDefault", {
      value: vi.fn(),
    });
    document.dispatchEvent(shiftTabEvent);

    expect(lastElement.focus).toHaveBeenCalled();
  });

  it("モーダルが閉じられたときに元の要素にフォーカスを戻す", () => {
    const { unmount } = renderHook(() =>
      useModalFocusManager({
        isOpen: true,
        modalRef,
        onClose: mockOnClose,
      }),
    );

    unmount();

    expect(mockActiveElement.focus).toHaveBeenCalled();
  });

  it("isOpenがfalseの場合は何もしない", () => {
    renderHook(() =>
      useModalFocusManager({
        isOpen: false,
        modalRef,
        onClose: mockOnClose,
      }),
    );

    vi.advanceTimersByTime(100);

    expect(modalRef.current?.querySelectorAll).not.toHaveBeenCalled();
    expect(mockFocusableElement.focus).not.toHaveBeenCalled();
  });
});

describe("useScrollLock", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("isOpenがtrueのときbodyのoverflowをhiddenに設定する", () => {
    renderHook(() => useScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("isOpenがfalseのときbodyのoverflowを元に戻す", () => {
    document.body.style.overflow = "hidden";

    renderHook(() => useScrollLock(false));

    expect(document.body.style.overflow).toBe("");
  });

  it("アンマウント時にbodyのoverflowをリセットする", () => {
    const { unmount } = renderHook(() => useScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("isOpenの値が変わったときに適切に更新される", () => {
    const { rerender } = renderHook(({ isOpen }) => useScrollLock(isOpen), {
      initialProps: { isOpen: true },
    });

    expect(document.body.style.overflow).toBe("hidden");

    rerender({ isOpen: false });

    expect(document.body.style.overflow).toBe("");

    rerender({ isOpen: true });

    expect(document.body.style.overflow).toBe("hidden");
  });
});
