"use client";

import { useState, useEffect } from "react";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Post } from "@/types/api";

interface FeaturedPostsCarouselProps {
    posts: Post[];
}

export function FeaturedPostsCarousel({ posts }: FeaturedPostsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!posts || posts.length === 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [posts.length]);

    return (
        <div className="relative w-full">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Featured Posts</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Previous post">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Next post">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {posts.map((post) => (
                        <div key={post.id} className="w-full flex-shrink-0">
                            <PostCard post={post} featured />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots indicator */}
            <div className="mt-4 flex justify-center gap-2">
                {posts.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                            index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
