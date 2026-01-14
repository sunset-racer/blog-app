import type { Role } from "./auth";

export interface Author {
    id: string;
    name: string;
    image?: string | null;
    role?: Role;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    _count?: {
        posts: number;
    };
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string | null;
    coverImage?: string | null;
    status: "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";
    views: number;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
    author: Author;
    tags: Tag[];
    _count?: {
        comments: number;
    };
}

export interface PostsResponse {
    posts: Post[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: Author;
    postId: string;
}

export interface CommentWithPost extends Comment {
    post: {
        id: string;
        title: string;
        slug: string;
        status: string;
    };
}

export interface CommentsResponse {
    comments: Comment[];
}

export interface MyCommentsResponse {
    comments: CommentWithPost[];
}

export interface TagsResponse {
    tags: Tag[];
}

export interface PostFilters {
    page?: number;
    limit?: number;
    search?: string;
    tag?: string;
    authorId?: string;
    status?: string;
    sortBy?: "createdAt" | "updatedAt" | "views" | "publishedAt";
    sortOrder?: "asc" | "desc";
}
