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
    <div className="admin-page-header">
      <div>
        {eyebrow ? (
          <span className="admin-page-eyebrow">
            {eyebrow}
          </span>
        ) : null}

        <h1>
          {title}
        </h1>

        {description ? (
          <p>
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="admin-page-actions">
          {actions}
        </div>
      ) : null}
    </div>
  );
}