import styled from "styled-components";
import { theme } from "@/styles/theme";

// 型定義
interface ProfileData {
  label: string;
  value: string;
}

interface ProfileSectionProps {
  data: ProfileData[];
}

// スタイルコンポーネント
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.primary};
  width: 100%;
`;

const ProfileLabel = styled.span`
  font-weight: bold;
  font-size: ${theme.typography.fontSize.lg};
`;

const ProfileLine = styled.div`
  flex: 1;
  height: ${theme.borders.width.thin};
  background: ${theme.colors.text.primary};
  opacity: ${theme.opacity[80]};
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
          <ProfileLabel>{item.label}</ProfileLabel>
          <ProfileLine />
          <ProfileValue>{item.value}</ProfileValue>
        </ProfileItem>
      ))}
    </ProfileContainer>
  );
}
