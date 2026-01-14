"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/auth-client";
import { BookOpen, LogOut, User, Settings, FileEdit, Shield, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { useState } from "react";

export function Navbar() {
    const router = useRouter();
    const { user, isAuthenticated, isAuthor, isAdmin } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        toast.success("Signed out successfully");
        router.push("/");
        router.refresh();
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <BookOpen className="h-6 w-6" />
                    <span>TechBlog</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-6 md:flex">
                    <Link href="/posts" className="text-sm font-medium transition-colors hover:text-primary">
                        Posts
                    </Link>
                    <Link href="/tags" className="text-sm font-medium transition-colors hover:text-primary">
                        Tags
                    </Link>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        {isAuthenticated && user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user.image || undefined} alt={user.name} />
                                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    {isAuthor && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer">
                                                <FileEdit className="mr-2 h-4 w-4" />
                                                My Posts
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    {isAdmin && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin" className="cursor-pointer">
                                                <Shield className="mr-2 h-4 w-4" />
                                                Admin
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/login">Sign In</Link>
                                </Button>
                                <Button size="sm" asChild>
                                    <Link href="/signup">Sign Up</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t md:hidden">
                    <div className="container mx-auto space-y-3 px-4 py-4">
                        <Link
                            href="/posts"
                            className="block text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Posts
                        </Link>
                        <Link
                            href="/tags"
                            className="block text-sm font-medium transition-colors hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Tags
                        </Link>

                        {isAuthenticated && user ? (
                            <>
                                <hr />
                                <Link
                                    href="/profile"
                                    className="block text-sm font-medium transition-colors hover:text-primary"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                {isAuthor && (
                                    <Link
                                        href="/dashboard"
                                        className="block text-sm font-medium transition-colors hover:text-primary"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        My Posts
                                    </Link>
                                )}
                                {isAdmin && (
                                    <Link
                                        href="/admin"
                                        className="block text-sm font-medium transition-colors hover:text-primary"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Admin
                                    </Link>
                                )}
                                <Button variant="destructive" size="sm" className="w-full" onClick={handleSignOut}>
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <hr />
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        Sign In
                                    </Link>
                                </Button>
                                <Button size="sm" className="w-full" asChild>
                                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        Sign Up
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
