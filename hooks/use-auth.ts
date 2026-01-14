"use client";

import { useSession } from "@/lib/auth-client";
import type { Role } from "@/types/auth";

export function useAuth() {
    const { data: session, isPending, error } = useSession();

    const user = session?.user;
    const isAuthenticated = !!user;
    const role = user?.role as Role | undefined;

    const hasRole = (requiredRole: Role | Role[]): boolean => {
        if (!role) return false;

        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        return roles.includes(role);
    };

    const isReader = role === "READER";
    const isAuthor = role === "AUTHOR" || role === "ADMIN";
    const isAdmin = role === "ADMIN";

    return {
        user,
        session,
        isAuthenticated,
        isLoading: isPending,
        error,
        role,
        hasRole,
        isReader,
        isAuthor,
        isAdmin,
    };
}
