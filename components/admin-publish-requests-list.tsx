"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AdminPublishRequestCard } from "@/components/admin-publish-request-card";
import { usePublishRequests, type PublishRequest } from "@/hooks/use-publish";
import { Clock } from "lucide-react";

interface AdminPublishRequestsListProps {
    filter?: "all" | "PENDING" | "APPROVED" | "REJECTED";
}

export function AdminPublishRequestsList({ filter = "all" }: AdminPublishRequestsListProps) {
    const { data, isLoading, refetch } = usePublishRequests(
        filter === "all" ? undefined : filter
    );

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-48 w-full" />
                ))}
            </div>
        );
    }

    const requests = data?.requests || [];

    if (requests.length === 0) {
        return (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                    <Clock className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">No publish requests</h3>
                    <p className="text-sm text-muted-foreground">
                        {filter === "all"
                            ? "There are no publish requests yet."
                            : `No ${filter.toLowerCase()} requests found.`}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {requests.map((request) => (
                <AdminPublishRequestCard
                    key={request.id}
                    request={request}
                    onUpdated={() => refetch()}
                />
            ))}
        </div>
    );
}
