type TextWithBackgroundProps = {
  children: React.ReactNode;
  isPurple?: boolean;
};

export default function TextWithBackground({
  children,
  isPurple = false,
}: TextWithBackgroundProps) {
  const bgImage = isPurple ? "/titleBG.webp" : "/nameBG.webp";

  return (
    <span className="relative inline-flex items-center leading-[1] before:inline-block before:h-[1em] before:w-0 before:content-['']">
      <div
        className="absolute bottom-[0.05em] left-[-0.001rem] right-[-0.001rem] top-[0.18em] -z-10 bg-[length:auto_100%] bg-center bg-repeat-x"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <span className="relative z-[2] block py-[0.1em] leading-[0.8]">
        {children}
      </span>
    </span>
  );
}
