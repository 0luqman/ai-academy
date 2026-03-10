"use client";

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

const Playground = dynamic(() => import("./Playground"), { ssr: false });
const Quiz = dynamic(() => import("./Quiz"), { ssr: false });

const CodeBlock = ({ children, ...props }: any) => {
    const [copied, setCopied] = useState(false);
    const code = React.Children.toArray(children).find((child: any) => child && typeof child === 'object' && 'type' in child && child.type === 'code') as React.ReactElement | undefined;
    const codeString = code ? code.props.children : '';
    const language = code?.props.className?.replace('language-', '') || 'text';

    const copyToClipboard = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="group relative my-8 overflow-hidden rounded-2xl border bg-zinc-950 shadow-2xl">
            <div className="flex items-center justify-between bg-zinc-900/50 px-4 py-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{language}</span>
                </div>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
                >
                    {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-zinc-300">
                {children}
            </div>
        </div>
    );
};

export const mdxComponents = {
    Playground,
    Quiz,
    h1: (props: any) => <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-10" {...props} />,
    h2: (props: any) => <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-10 mb-4" {...props} />,
    h3: (props: any) => <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4" {...props} />,
    p: (props: any) => <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4" {...props} />,
    ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
    ol: (props: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
    code: (props: any) => <code className="relative rounded bg-muted/20 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-primary" {...props} />,
    pre: (props: any) => <CodeBlock {...props} />,
    a: (props: any) => <a className="font-medium text-primary underline underline-offset-4" {...props} />,
};
