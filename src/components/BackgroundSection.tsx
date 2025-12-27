import { Section } from "@/components/Layout";
import { cn } from "@/lib/utils";

type BackgroundSectionProps = React.HTMLAttributes<HTMLElement> & {
  backgroundImage?: string;
  overlay?: boolean;
  children: React.ReactNode;
};

export function BackgroundSection({
  backgroundImage,
  children,
  className,
  ...props
}: BackgroundSectionProps) {
  return (
    <Section className={cn("relative", className)} {...props}>
      {backgroundImage && (
        <div
          className="absolute inset-0 z-[-1000] bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {children}
    </Section>
  );
}
