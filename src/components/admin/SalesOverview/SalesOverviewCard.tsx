import type { ComponentType } from "react";

interface SalesOverviewCardProps {
  icon: ComponentType<{ size?: number }>;
  title: string;
  total: string;
  cash: string;
  card: string;
  backgroundColor: string;
}

export default function SalesOverviewCard({
  icon: Icon,
  title,
  total,
  cash,
  card,
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
      <div className="my-5 border-t border-neutral-200" />
      <div className="flex gap-3 px-2 justify-between">
        <div>
          <p className="text-sm text-neutral-600 text-center">Cash</p>
          <p className="mt-1 break-all text-sm font-semibold text-neutral-950 text-center">
            {cash}
          </p>
        </div>
        <div className="border-l border-neutral-200 pl-4" />
        <div>
          <p className="text-sm text-neutral-600 text-center">Card</p>
          <p className="mt-1 break-all text-sm font-semibold text-neutral-950 text-center">
            {card}
          </p>
        </div>
      </div>
    </article>
  );
}
