import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SimplePageBody } from "@/components/ui/SimplePageBody";
import { InfoPageShell } from "@/components/ui/InfoPageShell";
import { siteConfig } from "@/data/content";
import { getPageBySlug } from "@/lib/cms/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) {
    return { title: "Страница не найдена" };
  }
  return {
    title: page.title,
    description: page.description || page.excerpt || `${page.title} — ${siteConfig.name}`,
  };
}

export default async function CmsDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <InfoPageShell
      eyebrow={page.eyebrow || "Информация"}
      title={page.title}
      description={page.description || page.excerpt || ""}
    >
      {page.body ? <SimplePageBody body={page.body} /> : null}
    </InfoPageShell>
  );
}
