import type { Decorator } from "@storybook/react";

export const withViewports: Decorator = (Story, _context) => {
  // storycapでのスクリーンショット時に複数のビューポートでキャプチャする設定
  // この設定により、各ストーリーで指定されたビューポートでスクリーンショットが撮影される
  return <Story />;
};

// 使用例:
// export const MyStory = {
//   parameters: {
//     viewport: {
//       viewports: ["iPhone 6", "iPad", "Desktop"],
//     },
//   },
// };
