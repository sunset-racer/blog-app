"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Comment, CommentsResponse } from "@/types/api";

// Query keys
export const commentKeys = {
    all: ["comments"] as const,
    lists: () => [...commentKeys.all, "list"] as const,
    list: (postId: string) => [...commentKeys.lists(), postId] as const,
};

// Get comments for a post
export function useComments(postId: string) {
    return useQuery({
        queryKey: commentKeys.list(postId),
        queryFn: async () => {
            const response = await api.get<CommentsResponse>(`/api/comments/posts/${postId}`);
            return response;
        },
        enabled: !!postId,
    });
}

// Create comment
export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
            return await api.post<Comment>(`/api/comments/posts/${postId}`, { content });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: commentKeys.list(variables.postId) });
        },
    });
}

// Update comment
export function useUpdateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, content, postId }: { id: string; content: string; postId: string }) => {
            return await api.put<Comment>(`/api/comments/${id}`, { content });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: commentKeys.list(variables.postId) });
        },
    });
}

// Delete comment
export function useDeleteComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, postId }: { id: string; postId: string }) => {
            return await api.delete(`/api/comments/${id}`);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: commentKeys.list(variables.postId) });
        },
    });
}
