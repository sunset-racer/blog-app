import { AuthorPageClient } from "@/components/pages/author-page-client";

export default async function AuthorPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <AuthorPageClient authorId={id} />;
}
