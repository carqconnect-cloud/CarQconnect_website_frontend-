import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <h2 className="font-display text-[22px] md:text-[32px] lg:text-[42px] leading-tight font-[800] text-ink text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-2 md:mt-4 text-body-lg text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
