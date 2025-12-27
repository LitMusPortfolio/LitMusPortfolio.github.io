import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";

type TitleWithLineProps = {
  title: string;
  className?: string;
};

export default function TitleWithLine({
  title,
  className,
}: TitleWithLineProps) {
  return (
    <div className={cn("mb-6 flex w-full items-center", className)}>
      <h2>{title}</h2>
      <Separator className="ml-4 h-0.5 flex-1 bg-[var(--color-text-primary)] opacity-80" />
    </div>
  );
}
