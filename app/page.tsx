"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { FeaturedPostsCarousel } from "@/components/featured-posts-carousel";
import { RecentPostsGrid } from "@/components/recent-posts-grid";
import { SearchBar } from "@/components/search-bar";
import { TagCloud } from "@/components/tag-cloud";
import { usePosts } from "@/hooks/use-posts";
import { useTags } from "@/hooks/use-tags";

export default function HomePage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | undefined>();

    // Fetch featured posts (recent 3 published posts)
    const { data: featuredData } = usePosts({
        limit: 3,
        sortBy: "publishedAt",
        sortOrder: "desc",
        status: "PUBLISHED",
    });

    // Fetch recent posts with filters
    const { data: postsData, isLoading: postsLoading } = usePosts({
        page,
        limit: 9,
        search: search || undefined,
        tag: selectedTag,
        sortBy: "publishedAt",
        sortOrder: "desc",
        status: "PUBLISHED",
    });

    // Fetch tags
    const { data: tagsData, isLoading: tagsLoading } = useTags();

    const handleSearch = (query: string) => {
        setSearch(query);
        setPage(1); // Reset to first page on new search
    };

    const handleTagClick = (tagSlug: string) => {
        if (selectedTag === tagSlug) {
            setSelectedTag(undefined); // Deselect if clicking the same tag
        } else {
            setSelectedTag(tagSlug);
        }
        setPage(1); // Reset to first page on tag filter
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Hero Section with Featured Posts */}
                {featuredData?.posts && featuredData.posts.length > 0 && (
                    <section className="mb-12">
                        <FeaturedPostsCarousel posts={featuredData.posts} />
                    </section>
                )}

                {/* Search and Filter Section */}
                <section className="mb-8 space-y-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                        <div className="space-y-6">
                            <SearchBar onSearch={handleSearch} defaultValue={search} />

                            {/* Active Filters Display */}
                            {(search || selectedTag) && (
                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                    <span>Active filters:</span>
                                    {search && (
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                                            Search: {search}
                                        </span>
                                    )}
                                    {selectedTag && (
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                                            Tag: {tagsData?.tags.find((t) => t.slug === selectedTag)?.name}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="lg:sticky lg:top-24 lg:self-start">
                            <TagCloud
                                tags={tagsData?.tags || []}
                                isLoading={tagsLoading}
                                selectedTag={selectedTag}
                                onTagClick={handleTagClick}
                            />
                        </div>
                    </div>
                </section>

                {/* Recent Posts Grid */}
                <section>
                    <RecentPostsGrid
                        posts={postsData?.posts || []}
                        isLoading={postsLoading}
                        pagination={postsData?.pagination}
                        onPageChange={handlePageChange}
                    />
                </section>
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
