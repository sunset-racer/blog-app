"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    Clock,
    Tags,
    Users,
    MessageSquare,
    ArrowLeft,
} from "lucide-react";

interface SidebarItem {
    title: string;
    href: string;
    icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
    {
        title: "Overview",
        href: "/admin",
        icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
        title: "Publish Requests",
        href: "/admin/requests",
        icon: <Clock className="h-4 w-4" />,
    },
    {
        title: "All Posts",
        href: "/admin/posts",
        icon: <FileText className="h-4 w-4" />,
    },
    {
        title: "Tags",
        href: "/admin/tags",
        icon: <Tags className="h-4 w-4" />,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: <Users className="h-4 w-4" />,
    },
    {
        title: "Comments",
        href: "/admin/comments",
        icon: <MessageSquare className="h-4 w-4" />,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-full w-64 flex-col border-r bg-muted/30">
            {/* Header */}
            <div className="flex h-16 items-center border-b px-6">
                <h2 className="text-lg font-semibold">Admin Panel</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                {sidebarItems.map((item) => {
                    const isActive =
                        item.href === "/admin"
                            ? pathname === "/admin"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {item.icon}
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t p-4">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>
            </div>
        </aside>
    );
}
