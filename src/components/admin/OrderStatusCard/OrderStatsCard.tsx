import { ArrowDownRight } from "lucide-react";
import type { ComponentType } from "react";

interface OrderStatsCardProps {
  icon: ComponentType<{ size?: number }>;
  title: string;
  count: number;
}

export default function OrderStatsCard({
  icon: Icon,
  title,
  count,
}: OrderStatsCardProps) {
  return (
    <article className="bg-white p-5 max-w-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="p-6 rounded-full bg-neutral-200">
          <Icon size={50} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-sm font-medium text-neutral-700">{title}</h3>

          <p className="text-3xl font-bold text-neutral-950">{count}</p>
        </div>
        <div className="self-end">
          <ArrowDownRight size={28} className="text-neutral-950" />
        </div>
      </div>
    </article>
  );
}
