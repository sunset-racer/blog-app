"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, isLoading, isAuthenticated, isAdmin } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-4rem)]">
                <div className="bg-muted/30 w-64 border-r p-4">
                    <Skeleton className="mb-4 h-8 w-32" />
                    <div className="space-y-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </div>
                <div className="flex-1 p-8">
                    <Skeleton className="mb-4 h-10 w-48" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    // Show access denied if not admin
    if (!isAdmin) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-2 text-2xl font-bold">Access Denied</h1>
                    <p className="text-muted-foreground">
                        You need administrator privileges to access this area.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
    );
}
