"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Play, RotateCcw, Terminal, Code2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPyodide } from '@/lib/pyodide-store';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface PlaygroundProps {
    initialCode?: string;
}

const DEFAULT_CODE = `# Welcome to the Interactive Python IDE!
# Write your code here and click "Run Code" to execute.

print("Hello, AI Academy!")

# Try some math
a = 10
b = 5
print(f"The sum of {a} and {b} is {a + b}")
`;

export default function Playground({ initialCode }: PlaygroundProps) {
    // Robust prop handling for MDX
    const getInitialCode = () => {
        if (!initialCode) return DEFAULT_CODE;
        try {
            // Check if it's a JSON string (sometimes MDX passes it this way)
            if (typeof initialCode === 'string' && (initialCode.startsWith('"') || initialCode.startsWith('{') || initialCode.startsWith('['))) {
                return JSON.parse(initialCode);
            }
        } catch (e) {
            // Not JSON, use as is
        }
        return initialCode;
    };

    const [code, setCode] = useState(getInitialCode());
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);
    const pyodideRef = useRef<any>(null);

    // Run code logic
    const runCode = async () => {
        setIsRunning(true);
        setOutput('');
        setError(null);

        try {
            if (!pyodideRef.current) {
                setStatus('loading');
                const pyodide = await getPyodide();
                pyodideRef.current = pyodide;
                setStatus('ready');
            }

            const pyodide = pyodideRef.current;

            // Better way to capture output using StringIO
            pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
            `);

            try {
                await pyodide.runPythonAsync(code);
            } catch (err: any) {
                setError(err.message);
            }

            const stdout = pyodide.runPython("sys.stdout.getvalue()");
            const stderr = pyodide.runPython("sys.stderr.getvalue()");

            if (stdout) setOutput(stdout);
            if (stderr) {
                setError(prev => prev ? prev + "\n" + stderr : stderr);
            }
        } catch (e: any) {
            console.error("Runner Error:", e);
            setError(e.message || "An error occurred while running the code.");
        } finally {
            setIsRunning(false);
        }
    };

    const resetCode = () => {
        setCode(initialCode || DEFAULT_CODE);
        setOutput('');
        setError(null);
    };

    return (
        <div className="flex flex-col rounded-2xl border bg-card shadow-2xl overflow-hidden my-10 group transition-all hover:border-primary/30">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b bg-muted/30 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/40" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                        <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/40" />
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <Code2 size={16} className="text-primary" />
                        <span className="text-sm font-bold tracking-tight">Interactive Python IDE</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={resetCode}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                        title="Reset Code"
                    >
                        <RotateCcw size={18} />
                    </button>
                    <button
                        onClick={runCode}
                        disabled={isRunning}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50 active:scale-95",
                            isRunning && "animate-pulse"
                        )}
                    >
                        {isRunning || status === 'loading' ? (
                            <Loader2 className="animate-spin" size={16} />
                        ) : (
                            <Play size={16} fill="currentColor" />
                        )}
                        {status === 'loading' ? "Initializing..." : isRunning ? "Running..." : "Run Code"}
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="h-[400px] w-full relative border-b bg-[#1e1e1e]">
                <MonacoEditor
                    height="100%"
                    language="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val || '')}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 15,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 20, bottom: 20 },
                        lineNumbers: "on",
                        renderLineHighlight: "all",
                        cursorSmoothCaretAnimation: "on",
                        smoothScrolling: true,
                        readOnly: isRunning
                    }}
                />
            </div>

            {/* Console Output */}
            <div className="bg-[#0c0c0d] p-6 min-h-[140px] max-h-[300px] overflow-y-auto font-mono">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2 text-muted-foreground/50">
                        <Terminal size={14} />
                        <span className="text-xs font-bold uppercase tracking-widest">Output Console</span>
                    </div>
                    {status === 'loading' && (
                        <span className="text-[10px] text-primary animate-pulse font-bold tracking-widest uppercase">Downloading Runtime...</span>
                    )}
                </div>

                {error && (
                    <div className="flex gap-3 text-red-400 mb-2 items-start animate-in fade-in duration-300">
                        <AlertCircle size={16} className="mt-1 shrink-0" />
                        <pre className="text-sm whitespace-pre-wrap leading-relaxed">{error}</pre>
                    </div>
                )}

                {!output && !error && !isRunning && (
                    <p className="text-zinc-600 text-sm italic">Click &quot;Run Code&quot; to execute and see results...</p>
                )}

                {output && (
                    <pre className="text-sm text-green-400/90 leading-relaxed whitespace-pre-wrap animate-in fade-in duration-300">{output}</pre>
                )}
            </div>

            {/* Footer Status */}
            <div className="px-6 py-2 border-t bg-muted/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full",
                        status === 'ready' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" :
                        status === 'loading' ? "bg-yellow-500 animate-pulse" : "bg-zinc-500")} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                        {status === 'ready' ? "Python 3.11 (WASM) Online" :
                         status === 'loading' ? "Initializing Kernel..." : "Kernel Idle"}
                    </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest">Powered by Pyodide</span>
            </div>
        </div>
    );
}
