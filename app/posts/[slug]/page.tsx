import { PostDetailPageClient } from "@/components/pages/post-detail-page-client";

export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <PostDetailPageClient slug={slug} />;
}
