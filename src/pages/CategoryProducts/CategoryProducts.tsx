import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb/Breadcrumb";

export default function CategoryProducts() {
  const { categorySlug } = useParams();
  return (
    <main className="flex flex-col gap-6 px-6 py-6 md:px-12">
      <Breadcrumb
        items={[
          { label: "HOME", path: "/" },
          {
            label: categorySlug?.toUpperCase() ?? "CATEGORY",
          },
        ]}
      />

      <h1 className="text-3xl font-medium text-neutral-950">
        {categorySlug?.toUpperCase() ?? "CATEGORY"}
      </h1>
    </main>
  );
}
