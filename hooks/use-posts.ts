"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Post, PostsResponse, PostFilters } from "@/types/api";

// Query keys
export const postKeys = {
    all: ["posts"] as const,
    lists: () => [...postKeys.all, "list"] as const,
    list: (filters: PostFilters) => [...postKeys.lists(), filters] as const,
    details: () => [...postKeys.all, "detail"] as const,
    detail: (slug: string) => [...postKeys.details(), slug] as const,
    detailById: (id: string) => [...postKeys.all, "detail-by-id", id] as const,
};

// Get posts with filters
export function usePosts(filters: PostFilters = {}) {
    return useQuery({
        queryKey: postKeys.list(filters),
        queryFn: async () => {
            const response = await api.get<PostsResponse>("/api/posts", {
                params: filters as Record<string, string | number | boolean | undefined>,
            });
            return response;
        },
    });
}

// Get single post by slug
export function usePost(slug: string) {
    return useQuery({
        queryKey: postKeys.detail(slug),
        queryFn: async () => {
            const response = await api.get<Post>(`/api/posts/${slug}`);
            return response;
        },
        enabled: !!slug,
    });
}

// Get single post by ID (for editing)
export function usePostById(id: string) {
    return useQuery({
        queryKey: postKeys.detailById(id),
        queryFn: async () => {
            const response = await api.get<Post>(`/api/posts/${id}`);
            return response;
        },
        enabled: !!id,
    });
}

// Create post
export function useCreatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            title: string;
            content: string;
            excerpt?: string;
            coverImage?: string;
            tags?: string[];
        }) => {
            return await api.post<Post>("/api/posts", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.lists() });
        },
    });
}

// Update post
export function useUpdatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            data,
        }: {
            id: string;
            data: {
                title?: string;
                content?: string;
                excerpt?: string;
                coverImage?: string;
                tags?: string[];
            };
        }) => {
            return await api.put<Post>(`/api/posts/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.lists() });
            queryClient.invalidateQueries({ queryKey: postKeys.details() });
        },
    });
}

// Delete post
export function useDeletePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            return await api.delete(`/api/posts/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.lists() });
        },
    });
}

// Increment post views (optimistic update)
export function useIncrementViews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (slug: string) => {
            return await api.post(`/api/posts/${slug}/view`);
        },
        onSuccess: (_, slug) => {
            queryClient.invalidateQueries({ queryKey: postKeys.detail(slug) });
        },
    });
}
