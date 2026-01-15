"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left side - Branding & Info */}
            <div className="hidden lg:flex flex-col bg-primary text-primary-foreground">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <BookOpen className="h-6 w-6" />
                        <span>TechBlog</span>
                    </Link>
                </div>
                <div className="flex-1 flex flex-col justify-center px-12 pb-12">
                    <blockquote className="space-y-6">
                        <p className="text-lg font-medium leading-relaxed">
                            &ldquo;TechBlog has transformed how I share my technical knowledge. The platform is intuitive,
                            the community is supportive, and the reach is incredible.&rdquo;
                        </p>
                        <footer className="text-sm opacity-80">
                            <cite className="not-italic font-semibold">Sarah Chen</cite>
                            <span className="block mt-1">Senior Software Engineer at TechCorp</span>
                        </footer>
                    </blockquote>
                </div>
                <div className="p-8 space-y-4">
                    <div className="flex items-center gap-8 text-sm opacity-80">
                        <div>
                            <p className="text-2xl font-bold">10K+</p>
                            <p>Active Writers</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">50K+</p>
                            <p>Articles Published</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">1M+</p>
                            <p>Monthly Readers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex flex-col">
                {/* Top bar with logo (mobile) and theme toggle */}
                <div className="flex items-center justify-between p-4 lg:justify-end">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl lg:hidden">
                        <BookOpen className="h-6 w-6" />
                        <span>TechBlog</span>
                    </Link>
                    <ThemeToggle />
                </div>

                {/* Form container */}
                <div className="flex-1 flex items-center justify-center p-4">
                    {children}
                </div>

                {/* Footer */}
                <div className="p-4 text-center text-xs text-muted-foreground">
                    <p>
                        By continuing, you agree to our{" "}
                        <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
