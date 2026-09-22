import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:gap-8">
      <div>
        {eyebrow ? (
          <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#f36b21]">
            {eyebrow}
          </span>
        ) : null}

        <h1 className="m-0 text-[clamp(32px,4vw,48px)] leading-none tracking-[-0.04em]">
          {title}
        </h1>

        {description ? (
          <p className="mt-3 max-w-[620px] text-[14px] leading-[1.6] text-[#707070]">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex items-start gap-2.5">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
