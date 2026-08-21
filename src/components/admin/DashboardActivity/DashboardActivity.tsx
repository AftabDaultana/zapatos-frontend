import type { ReactNode } from "react";

interface DashboardActivityProps {
  children: ReactNode;
}

export default function DashboardActivity({
  children,
}: DashboardActivityProps) {
  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      {children}
    </section>
  );
}
