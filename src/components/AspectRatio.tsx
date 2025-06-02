import styled from "styled-components";

interface AspectRatioProps {
  ratio?: "16:9" | "4:3" | "1:1" | "3:2";
}

const ratioMap = {
  "16:9": "56.25%",
  "4:3": "75%",
  "1:1": "100%",
  "3:2": "66.67%",
};

export const AspectRatio = styled.div<AspectRatioProps>`
  position: relative;
  padding-bottom: ${({ ratio = "16:9" }) => ratioMap[ratio]};
  overflow: hidden;
  
  > * {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
