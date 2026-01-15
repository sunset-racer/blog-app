"use client";

import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminPostsTable } from "@/components/admin-posts-table";
import { AdminPostsFilters } from "@/components/admin-posts-filters";
import { usePosts, useDeletePost } from "@/hooks/use-posts";
import { toast } from "sonner";
import { ChevronDown, Trash2, Loader2 } from "lucide-react";

export default function AdminPostsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [status, setStatus] = useState("all");
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { data, isLoading, refetch } = usePosts({
        page,
        limit: 20,
        search: search || undefined,
        status: status === "all" ? undefined : status,
    });

    const deletePost = useDeletePost();

    const selectedCount = Object.keys(rowSelection).length;
    const selectedIds = Object.keys(rowSelection);

    const handleSearch = () => {
        setSearch(searchInput);
        setPage(1);
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        setPage(1);
    };

    const handleClearFilters = () => {
        setSearch("");
        setSearchInput("");
        setStatus("all");
        setPage(1);
    };

    const handleBulkDelete = async () => {
        setIsDeleting(true);
        try {
            // Delete posts one by one
            for (const id of selectedIds) {
                await deletePost.mutateAsync(id);
            }
            toast.success(`${selectedCount} post(s) deleted successfully`);
            setRowSelection({});
            setBulkDeleteDialogOpen(false);
            refetch();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete posts");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">All Posts</h1>
                    <p className="text-muted-foreground">
                        Manage all blog posts across all authors
                    </p>
                </div>

                {/* Bulk Actions */}
                {selectedCount > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {selectedCount} selected
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => setBulkDeleteDialogOpen(true)}
                                className="text-destructive"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Filters */}
            <AdminPostsFilters
                search={searchInput}
                onSearchChange={setSearchInput}
                status={status}
                onStatusChange={handleStatusChange}
                onSearch={handleSearch}
                onClear={handleClearFilters}
            />

            {/* Posts Table */}
            <AdminPostsTable
                posts={data?.posts || []}
                isLoading={isLoading}
                onDeleted={() => refetch()}
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
            />

            {/* Pagination */}
            {data && data.pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                        Showing {(page - 1) * 20 + 1} to{" "}
                        {Math.min(page * 20, data.pagination.total)} of {data.pagination.total}{" "}
                        posts
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(page - 1)}
                            disabled={page <= 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= data.pagination.totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* Bulk Delete Confirmation Dialog */}
            <Dialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete {selectedCount} Post(s)</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {selectedCount} selected post(s)? This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setBulkDeleteDialogOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleBulkDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Trash2 className="mr-2 h-4 w-4" />
                            )}
                            Delete All
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
