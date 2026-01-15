"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts } from "@/hooks/use-posts";
import { usePublishRequests } from "@/hooks/use-publish";
import { useTags } from "@/hooks/use-tags";
import {
    FileText,
    Clock,
    Tags,
    Users,
    MessageSquare,
    CheckCircle,
    XCircle,
    AlertCircle,
} from "lucide-react";

export default function AdminPage() {
    const { data: postsData, isLoading: postsLoading } = usePosts({ limit: 1 });
    const { data: requestsData, isLoading: requestsLoading } = usePublishRequests();
    const { data: tagsData, isLoading: tagsLoading } = useTags();

    const requests = requestsData?.requests || [];
    const pendingRequests = requests.filter((r) => r.status === "PENDING");

    const isLoading = postsLoading || requestsLoading || tagsLoading;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold">Admin Overview</h1>
                <p className="text-muted-foreground">Manage your blog platform</p>
            </div>

            {/* Alert for Pending Requests */}
            {pendingRequests.length > 0 && (
                <div className="flex items-center gap-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                        <p className="font-medium">
                            {pendingRequests.length} pending publish request
                            {pendingRequests.length > 1 ? "s" : ""}
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Authors are waiting for approval
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/requests">Review Requests</Link>
                    </Button>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                        <FileText className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-2xl font-bold">
                                {postsData?.pagination.total || 0}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-2xl font-bold">{pendingRequests.length}</div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
                        <Tags className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-2xl font-bold">{tagsData?.tags.length || 0}</div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                        ) : (
                            <div className="text-2xl font-bold">{requests.length}</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Publish Requests
                        </CardTitle>
                        <CardDescription>Review and approve author submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/admin/requests">Manage Requests</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            All Posts
                        </CardTitle>
                        <CardDescription>View and manage all blog posts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/admin/posts">Manage Posts</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Tags className="h-5 w-5" />
                            Tags
                        </CardTitle>
                        <CardDescription>Create and manage content tags</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/admin/tags">Manage Tags</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Users
                        </CardTitle>
                        <CardDescription>View registered users</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/admin/users">View Users</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Comments
                        </CardTitle>
                        <CardDescription>Moderate user comments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/admin/comments">Moderate Comments</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
