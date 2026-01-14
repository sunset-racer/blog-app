import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PostStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED" | "PENDING_APPROVAL";

interface PostStatusBadgeProps {
    status: PostStatus;
    className?: string;
}

const statusConfig: Record<PostStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    DRAFT: {
        label: "Draft",
        variant: "secondary",
    },
    PENDING: {
        label: "Pending",
        variant: "outline",
    },
    PENDING_APPROVAL: {
        label: "Pending",
        variant: "outline",
    },
    PUBLISHED: {
        label: "Published",
        variant: "default",
    },
    REJECTED: {
        label: "Rejected",
        variant: "destructive",
    },
};

export function PostStatusBadge({ status, className }: PostStatusBadgeProps) {
    const config = statusConfig[status] || statusConfig.DRAFT;

    return (
        <Badge variant={config.variant} className={cn(className)}>
            {config.label}
        </Badge>
    );
}
