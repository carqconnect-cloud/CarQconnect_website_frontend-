import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  backButton,
  children,
  className = "",
  style,
}: {
  eyebrow?: string;
  backButton?: ReactNode;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section 
      className={`relative overflow-hidden ${className || "pt-[max(env(safe-area-inset-top),clamp(80px,10vw,120px))] pb-8 md:pb-12"}`}
      style={{ background: 'radial-gradient(60% 120% at 90% 0%, rgba(255,106,0,.28) 0%, rgba(255,106,0,0) 62%), linear-gradient(180deg, #fff1e3 0%, #f7f9fc 100%)', ...style }}
    >
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 flex flex-col items-start text-left font-display">
        {backButton && <div className="mb-1 md:mb-3">{backButton}</div>}
        <h1 className="font-display text-[clamp(24px,6.4vw,54px)] font-[800] leading-[1.1] tracking-[-0.02em] text-[#0f1220] max-w-[800px] text-balance mb-2 md:mb-[12px]">
          {title}
        </h1>
        {description && (
          <p className="text-[15px] sm:text-[16px] text-[#454c60] max-w-[560px] leading-[1.6]">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
