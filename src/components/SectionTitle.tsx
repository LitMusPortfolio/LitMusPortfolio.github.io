import TextWithBackground from "./TextWithBackground";

type SectionTitleProps = {
  children: string;
  isPurple?: boolean;
};

export default function SectionTitle({
  children,
  isPurple = false,
}: SectionTitleProps) {
  return (
    <h1 className="mb-8 flex flex-col items-start">
      <TextWithBackground isPurple={isPurple}>{children}</TextWithBackground>
    </h1>
  );
}
