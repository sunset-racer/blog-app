import { TagPageClient } from "@/components/pages/tag-page-client";

export default async function TagPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <TagPageClient slug={slug} />;
}
