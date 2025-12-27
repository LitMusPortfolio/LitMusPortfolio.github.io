// 型定義
type ProfileData = {
  label: string;
  value: string;
};

type ProfileSectionProps = {
  data: ProfileData[];
};

// プロフィールセクションコンポーネント
export default function ProfileSection({ data }: ProfileSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <div key={item.label} className="flex w-full items-center">
          <span>{item.label}</span>
          <div className="mx-2 h-px flex-1 bg-[var(--color-text-primary)]" />
          <span className="whitespace-nowrap">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
