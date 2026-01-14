"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminPublishRequestsList } from "@/components/admin-publish-requests-list";
import { usePublishRequests } from "@/hooks/use-publish";

export default function AdminPublishRequestsPage() {
    const [activeTab, setActiveTab] = useState("PENDING");
    const { data } = usePublishRequests();

    const requests = data?.requests || [];
    const pendingCount = requests.filter((r) => r.status === "PENDING").length;
    const approvedCount = requests.filter((r) => r.status === "APPROVED").length;
    const rejectedCount = requests.filter((r) => r.status === "REJECTED").length;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold">Publish Requests</h1>
                <p className="text-muted-foreground">
                    Review and manage author publish requests
                </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="PENDING">
                        Pending ({pendingCount})
                    </TabsTrigger>
                    <TabsTrigger value="APPROVED">
                        Approved ({approvedCount})
                    </TabsTrigger>
                    <TabsTrigger value="REJECTED">
                        Rejected ({rejectedCount})
                    </TabsTrigger>
                    <TabsTrigger value="all">
                        All ({requests.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="PENDING" className="mt-6">
                    <AdminPublishRequestsList filter="PENDING" />
                </TabsContent>

                <TabsContent value="APPROVED" className="mt-6">
                    <AdminPublishRequestsList filter="APPROVED" />
                </TabsContent>

                <TabsContent value="REJECTED" className="mt-6">
                    <AdminPublishRequestsList filter="REJECTED" />
                </TabsContent>

                <TabsContent value="all" className="mt-6">
                    <AdminPublishRequestsList filter="all" />
                </TabsContent>
            </Tabs>
        </div>
    );
}
