import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { DownloadItem } from "../types";
import { useDownloadModal } from "./useDownloadModal";

describe("useDownloadModal", () => {
  const mockItem: DownloadItem = {
    id: 1,
    type: "talk",
    category: "UTAU",
    name: "Test Voice Bank",
    description: "Test description",
  };

  it("初期状態では選択されたアイテムがnullで、モーダルは閉じている", () => {
    const { result } = renderHook(() => useDownloadModal());

    expect(result.current.selectedItem).toBeNull();
    expect(result.current.isOpen).toBe(false);
  });

  it("openModalを呼ぶとアイテムが選択され、モーダルが開く", () => {
    const { result } = renderHook(() => useDownloadModal());

    act(() => {
      result.current.openModal(mockItem);
    });

    expect(result.current.selectedItem).toEqual(mockItem);
    expect(result.current.isOpen).toBe(true);
  });

  it("closeModalを呼ぶと選択がクリアされ、モーダルが閉じる", () => {
    const { result } = renderHook(() => useDownloadModal());

    // まずモーダルを開く
    act(() => {
      result.current.openModal(mockItem);
    });

    expect(result.current.isOpen).toBe(true);

    // モーダルを閉じる
    act(() => {
      result.current.closeModal();
    });

    expect(result.current.selectedItem).toBeNull();
    expect(result.current.isOpen).toBe(false);
  });

  it("異なるアイテムでモーダルを開き直すことができる", () => {
    const { result } = renderHook(() => useDownloadModal());

    const anotherItem: DownloadItem = {
      id: 2,
      type: "sing",
      category: "SynthV",
      name: "Another Voice Bank",
      description: "Another description",
    };

    // 最初のアイテムでモーダルを開く
    act(() => {
      result.current.openModal(mockItem);
    });

    expect(result.current.selectedItem).toEqual(mockItem);

    // 別のアイテムでモーダルを開き直す
    act(() => {
      result.current.openModal(anotherItem);
    });

    expect(result.current.selectedItem).toEqual(anotherItem);
    expect(result.current.isOpen).toBe(true);
  });

  it("openModalとcloseModalの参照は再レンダリング後も安定している", () => {
    const { result, rerender } = renderHook(() => useDownloadModal());

    const openModalRef = result.current.openModal;
    const closeModalRef = result.current.closeModal;

    // 再レンダリング
    rerender();

    // useCallbackにより参照が維持されることを確認
    expect(result.current.openModal).toBe(openModalRef);
    expect(result.current.closeModal).toBe(closeModalRef);
  });
});
