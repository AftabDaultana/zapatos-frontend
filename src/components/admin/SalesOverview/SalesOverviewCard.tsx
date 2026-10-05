import type { ComponentType } from "react";

interface SalesOverviewCardProps {
  icon: ComponentType<{ size?: number }>;
  title: string;
  total: string;
  backgroundColor: string;
}

export default function SalesOverviewCard({
  icon: Icon,
  title,
  total,
  backgroundColor,
}: SalesOverviewCardProps) {
  return (
    <article
      className={`min-w-0 rounded-lg border border-neutral-200 p-5 ${backgroundColor}`}
    >
      <div className="flex justify-center mb-4">
        <Icon size={50} />
      </div>
      <p className="text-sm text-neutral-600 text-center">{title}</p>
      <h2 className="mt-2 break-all text-2xl font-bold text-neutral-950 text-center">
        {total}
      </h2>
    </article>
  );
}
