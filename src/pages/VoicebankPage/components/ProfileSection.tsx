import styled from "styled-components";
import { theme } from "../../../styles/theme";

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
  font-size: 1.3rem;
  color: ${theme.colors.text.primary};
  width: 100%;
`;

const ProfileLabel = styled.span`
  font-size: 1.3rem;
`;

const ProfileLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${theme.colors.text.primary};
  opacity: 0.8;
  margin: 0 1rem;
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
