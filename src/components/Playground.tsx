"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Play, Trash2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function Playground({ initialCode }: { initialCode?: string }) {
    const [code, setCode] = useState(initialCode || '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isPyodideReady, setIsPyodideReady] = useState(false);
    const pyodideRef = useRef<any>(null);

    useEffect(() => {
        const loadPyodide = async () => {
            try {
                // Load Pyodide from CDN since it's client-side only and WASM based
                if (!(window as any).loadPyodide) {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
                    document.head.appendChild(script);

                    script.onload = async () => {
                        const pyodide = await (window as any).loadPyodide({
                            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
                        });
                        pyodideRef.current = pyodide;
                        setIsPyodideReady(true);
                    };
                } else {
                    setIsPyodideReady(true);
                }
            } catch (error) {
                console.error("Failed to load Pyodide:", error);
            }
        };
        loadPyodide();
    }, []);

    const runCode = async () => {
        if (!pyodideRef.current) return;
        setIsRunning(true);
        setIsError(false);
        setOutput('');

        try {
            // Intercept stdout
            pyodideRef.current.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
      `);

            await pyodideRef.current.runPythonAsync(code);

            const stdout = pyodideRef.current.runPython("sys.stdout.getvalue()");
            const stderr = pyodideRef.current.runPython("sys.stderr.getvalue()");

            if (stderr) {
                setIsError(true);
            }
            setOutput(stdout + stderr);
        } catch (e: any) {
            setIsError(true);
            setOutput(e.message || "An error occurred.");
        } finally {
            setIsRunning(false);
        }
    };

    const clearOutput = () => {
        setOutput('');
        setIsError(false);
    };

    return (
        <div className="flex flex-col rounded-xl border border-border bg-card shadow-2xl overflow-hidden my-8 transition-all hover:border-primary/30">
            <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Python Workspace</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={clearOutput}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                        title="Clear Output"
                    >
                        <Trash2 size={16} />
                    </button>
                    <button
                        onClick={runCode}
                        disabled={!isPyodideReady || isRunning}
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 active:scale-95 shadow-lg shadow-primary/20 gap-2"
                    >
                        {isRunning ? (
                            <>
                                <Loader2 size={14} className="animate-spin" />
                                Running...
                            </>
                        ) : (
                            <>
                                <Play size={14} fill="currentColor" />
                                Run Code
                            </>
                        )}
                    </button>
                </div>
            </div>
            <div className="h-[350px] w-full border-b relative">
                <MonacoEditor
                    height="100%"
                    language="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val || '')}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 16, bottom: 16 },
                        fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
                        lineNumbersMinChars: 3,
                    }}
                />
            </div>
            <div className="bg-[#0d0d0d] p-6 text-sm font-mono h-40 overflow-y-auto border-t border-white/5">
                {!isPyodideReady ? (
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Loader2 size={16} className="animate-spin" />
                        <span className="animate-pulse">Initializing Pyodide Runtime...</span>
                    </div>
                ) : (
                    <pre className={cn(
                        "whitespace-pre-wrap break-all leading-relaxed",
                        isError ? "text-red-400" : "text-zinc-300"
                    )}>
                        {output || <span className="text-white/20 italic"># Output will appear here...</span>}
                    </pre>
                )}
            </div>
        </div>
    );
}
