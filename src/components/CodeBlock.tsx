"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    children: React.ReactNode;
}

const CodeBlock = ({ children }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    const preRef = React.useRef<HTMLPreElement>(null);

    const onCopy = () => {
        if (!preRef.current) return;
        const code = preRef.current.innerText;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group mt-6 mb-4">
            <button
                onClick={onCopy}
                className="absolute right-4 top-4 p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 active:scale-95"
                title="Copy code"
            >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            </button>
            <pre
                ref={preRef}
                className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#0d0d0e] p-6 font-mono text-sm leading-relaxed text-zinc-300 shadow-2xl"
            >
                {children}
            </pre>
        </div>
    );
};

export default CodeBlock;
