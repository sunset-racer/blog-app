"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { TagHeader } from "@/components/tag-header";
import { SortDropdown, type SortOption } from "@/components/sort-dropdown";
import { PostsGrid } from "@/components/posts-grid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useTag } from "@/hooks/use-tags";
import { usePosts } from "@/hooks/use-posts";
import Link from "next/link";

export default function TagPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [page, setPage] = useState(1);
    const [currentSort, setCurrentSort] = useState("latest");
    const [sortBy, setSortBy] = useState<"createdAt" | "updatedAt" | "viewCount" | "publishedAt">("publishedAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    // Fetch tag info
    const { data: tag, isLoading: tagLoading, error: tagError } = useTag(slug);

    // Fetch posts with this tag
    const { data: postsData, isLoading: postsLoading } = usePosts({
        page,
        limit: 12,
        tagSlug: slug,
        sortBy,
        sortOrder,
        status: "PUBLISHED",
    });

    const handleSortChange = (sort: SortOption) => {
        setCurrentSort(sort.value);
        setSortBy(sort.sortBy);
        setSortOrder(sort.sortOrder);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (tagLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="container mx-auto max-w-6xl px-4 py-8">
                    <Skeleton className="mb-4 h-10 w-32" />
                    <Skeleton className="mb-8 h-32 w-full" />
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-96 w-full" />
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    if (tagError || !tag) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="container mx-auto max-w-6xl px-4 py-8">
                    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                        <h1 className="mb-4 text-3xl font-bold">Tag Not Found</h1>
                        <p className="mb-6 text-muted-foreground">
                            The tag you're looking for doesn't exist or has been removed.
                        </p>
                        <Button asChild>
                            <Link href="/posts">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Browse All Posts
                            </Link>
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto max-w-6xl px-4 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="mb-6"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                {/* Tag Header */}
                <div className="mb-8">
                    <TagHeader tag={tag} postCount={postsData?.pagination.total} />
                </div>

                {/* Sort Options */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
                    <SortDropdown currentSort={currentSort} onSortChange={handleSortChange} />
                </div>

                {/* Posts Grid */}
                <PostsGrid
                    posts={postsData?.posts || []}
                    isLoading={postsLoading}
                    pagination={postsData?.pagination}
                    onPageChange={handlePageChange}
                    emptyMessage={`No posts found with the tag "${tag.name}". Check back later for new content!`}
                />
            </main>

            {/* Footer */}
            <footer className="mt-16 border-t">
                <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
                    <p>© 2025 TechBlog. Built with Next.js and Better-Auth.</p>
                </div>
            </footer>
        </div>
    );
}
