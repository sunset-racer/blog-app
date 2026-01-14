import { Badge } from "@/components/ui/badge";
import { Tag as TagIcon } from "lucide-react";
import type { Tag } from "@/types/api";

interface TagHeaderProps {
    tag: Tag;
    postCount?: number;
}

export function TagHeader({ tag, postCount }: TagHeaderProps) {
    const count = postCount ?? tag._count?.posts ?? 0;

    return (
        <header className="space-y-4 rounded-lg border bg-card p-8 text-card-foreground">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <TagIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <Badge variant="secondary" className="mb-2">
                        Tag
                    </Badge>
                    <h1 className="text-3xl font-bold tracking-tight">{tag.name}</h1>
                </div>
            </div>

            {tag.description && (
                <p className="text-lg text-muted-foreground">{tag.description}</p>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{count} {count === 1 ? 'post' : 'posts'}</span>
            </div>
        </header>
    );
}
