import { notFound } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import ResourceEditor from "@/components/admin/ResourceEditor";
import { getFormSchema } from "@/lib/admin-forms";

export default function AdminResourcePage({
  params,
}: {
  params: { resource: string };
}) {
  const schema = getFormSchema(params.resource);
  if (!schema) notFound();

  return (
    <>
      <AdminNav />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <ResourceEditor schema={schema} />
      </main>
    </>
  );
}
