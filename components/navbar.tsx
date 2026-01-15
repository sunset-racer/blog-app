"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { BookOpen, LogOut, User, FileEdit, Shield, Menu, LayoutDashboard, X } from "lucide-react";
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

                    <div className="flex items-center gap-3">
                        {/* Prominent Dashboard button for Authors/Admins */}
                        {isAuthenticated && isAuthor && (
                            <Button variant="outline" size="sm" asChild className="gap-2">
                                <Link href="/dashboard">
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Link>
                            </Button>
                        )}

                        {/* Admin Panel button */}
                        {isAuthenticated && isAdmin && (
                            <Button variant="outline" size="sm" asChild className="gap-2 border-amber-500/50 text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:border-amber-500/30 dark:text-amber-500 dark:hover:bg-amber-950 dark:hover:text-amber-400">
                                <Link href="/admin">
                                    <Shield className="h-4 w-4" />
                                    Admin
                                </Link>
                            </Button>
                        )}

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
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium">{user.name}</p>
                                                {user.role && (
                                                    <Badge
                                                        variant={isAdmin ? "default" : "secondary"}
                                                        className={`text-xs ${isAdmin ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                                                    >
                                                        {user.role}
                                                    </Badge>
                                                )}
                                            </div>
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
                                                Admin Panel
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
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t bg-background md:hidden">
                    <div className="container mx-auto px-4 py-4">
                        {/* User Info (if authenticated) */}
                        {isAuthenticated && user && (
                            <div className="mb-4 flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.image || undefined} alt={user.name} />
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium truncate">{user.name}</p>
                                        {user.role && (
                                            <Badge
                                                variant={isAdmin ? "default" : "secondary"}
                                                className={`text-xs ${isAdmin ? "bg-amber-500" : ""}`}
                                            >
                                                {user.role}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                </div>
                            </div>
                        )}

                        {/* Navigation Links */}
                        <div className="space-y-1">
                            <Link
                                href="/posts"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FileEdit className="h-4 w-4 text-muted-foreground" />
                                Posts
                            </Link>
                            <Link
                                href="/tags"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                Tags
                            </Link>
                        </div>

                        {isAuthenticated && user ? (
                            <>
                                {/* Dashboard Links for Authors/Admins */}
                                {(isAuthor || isAdmin) && (
                                    <>
                                        <div className="my-3 border-t" />
                                        <div className="space-y-1">
                                            {isAuthor && (
                                                <Link
                                                    href="/dashboard"
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                                                    Dashboard
                                                </Link>
                                            )}
                                            {isAdmin && (
                                                <Link
                                                    href="/admin"
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50 dark:text-amber-500 dark:hover:bg-amber-950"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <Shield className="h-4 w-4" />
                                                    Admin Panel
                                                </Link>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Account Links */}
                                <div className="my-3 border-t" />
                                <div className="space-y-1">
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        Profile
                                    </Link>
                                </div>

                                <div className="mt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            handleSignOut();
                                        }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="my-3 border-t" />
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1" asChild>
                                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button size="sm" className="flex-1" asChild>
                                        <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                            Sign Up
                                        </Link>
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
