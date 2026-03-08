"use client";

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const Playground = dynamic(() => import("./Playground"), { ssr: false });
const Quiz = dynamic(() => import("./Quiz"), { ssr: false });

const CodeBlock = ({ children, className }: any) => {
    const [copied, setCopied] = useState(false);
    const code = children.props.children;
    const language = className?.replace('language-', '') || 'text';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-8">
            <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                    {language}
                </span>
                <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95"
                    title="Copy code"
                >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-white/60" />}
                </button>
            </div>
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d0e] p-6 font-mono text-sm leading-relaxed text-white/90 shadow-2xl">
                {children}
            </pre>
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
    code: (props: any) => <code className="relative rounded bg-primary/10 px-[0.3rem] py-[0.2rem] font-mono text-sm font-bold text-primary" {...props} />,
    pre: (props: any) => <CodeBlock {...props} />,
    a: (props: any) => <a className="font-medium text-primary underline underline-offset-4" {...props} />,
};
