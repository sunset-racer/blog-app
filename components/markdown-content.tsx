"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
    content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
    return (
        <article className="prose prose-zinc dark:prose-invert max-w-none">
            <ReactMarkdown
                components={{
                    // Customize heading styles
                    h1: ({ children }) => (
                        <h1 className="text-3xl font-bold tracking-tight mb-4 mt-8">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-2xl font-bold tracking-tight mb-3 mt-6">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-xl font-semibold mb-2 mt-4">
                            {children}
                        </h3>
                    ),
                    // Customize paragraph
                    p: ({ children }) => (
                        <p className="mb-4 leading-7 text-muted-foreground">
                            {children}
                        </p>
                    ),
                    // Customize links
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            className="text-primary underline underline-offset-4 hover:text-primary/80"
                            target={href?.startsWith("http") ? "_blank" : undefined}
                            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                            {children}
                        </a>
                    ),
                    // Customize lists
                    ul: ({ children }) => (
                        <ul className="mb-4 ml-6 list-disc space-y-2">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="mb-4 ml-6 list-decimal space-y-2">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="leading-7 text-muted-foreground">
                            {children}
                        </li>
                    ),
                    // Customize code blocks
                    code: ({ className, children }) => {
                        const isInline = !className;
                        if (isInline) {
                            return (
                                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                                    {children}
                                </code>
                            );
                        }
                        return (
                            <code className="block rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
                                {children}
                            </code>
                        );
                    },
                    pre: ({ children }) => (
                        <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4">
                            {children}
                        </pre>
                    ),
                    // Customize blockquotes
                    blockquote: ({ children }) => (
                        <blockquote className="mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
                            {children}
                        </blockquote>
                    ),
                    // Customize images
                    img: ({ src, alt }) => (
                        <img
                            src={src}
                            alt={alt}
                            className="my-6 rounded-lg"
                        />
                    ),
                    // Customize horizontal rules
                    hr: () => (
                        <hr className="my-8 border-border" />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}
