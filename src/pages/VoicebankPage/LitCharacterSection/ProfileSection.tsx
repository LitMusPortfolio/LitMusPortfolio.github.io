import styled from "styled-components";
import { theme } from "@/styles/theme";

// 型定義
type ProfileData = {
  label: string;
  value: string;
};

type ProfileSectionProps = {
  data: ProfileData[];
};

// スタイルコンポーネント
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProfileLine = styled.div`
  flex: 1;
  height: ${theme.borders.width.thin};
  background: ${theme.colors.text.primary};
  margin: 0 ${theme.space.sm};
`;

const ProfileValue = styled.span`
  white-space: nowrap;
`;

// プロフィールセクションコンポーネント
export default function ProfileSection({ data }: ProfileSectionProps) {
  return (
    <ProfileContainer>
      {data.map((item) => (
        <ProfileItem key={item.label}>
          <span>{item.label}</span>
          <ProfileLine />
          <ProfileValue>{item.value}</ProfileValue>
        </ProfileItem>
      ))}
    </ProfileContainer>
  );
}
