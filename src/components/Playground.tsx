"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Play, RotateCcw, Terminal, Code2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface PlaygroundProps {
    initialCode?: string;
}

export default function Playground({ initialCode }: PlaygroundProps) {
    const [code, setCode] = useState(initialCode || '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [isPyodideReady, setIsPyodideReady] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const pyodideRef = useRef<any>(null);

    useEffect(() => {
        const loadPyodide = async () => {
            try {
                if (!(window as any).loadPyodide) {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
                    document.head.appendChild(script);

                    script.onload = async () => {
                        try {
                            const pyodide = await (window as any).loadPyodide({
                                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
                            });
                            pyodideRef.current = pyodide;
                            setIsPyodideReady(true);
                        } catch (err) {
                            console.error("Pyodide init error:", err);
                            setError("Failed to initialize Python runtime.");
                        }
                    };
                } else if (!pyodideRef.current) {
                    // Script already exists but ref not set
                     const pyodide = await (window as any).loadPyodide({
                        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
                    });
                    pyodideRef.current = pyodide;
                    setIsPyodideReady(true);
                } else {
                    setIsPyodideReady(true);
                }
            } catch (error) {
                console.error("Failed to load Pyodide:", error);
                setError("Failed to load Python environment.");
            }
        };
        loadPyodide();
    }, []);

    const runCode = async () => {
        if (!pyodideRef.current) return;
        setIsRunning(true);
        setOutput('');
        setError(null);

        try {
            // Setup stdout/stderr capture
            pyodideRef.current.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
            `);

            await pyodideRef.current.runPythonAsync(code);

            const stdout = pyodideRef.current.runPython("sys.stdout.getvalue()");
            const stderr = pyodideRef.current.runPython("sys.stderr.getvalue()");

            setOutput(stdout);
            if (stderr) setError(stderr);
        } catch (e: any) {
            setError(e.message || "An error occurred during execution.");
        } finally {
            setIsRunning(false);
        }
    };

    const resetCode = () => {
        setCode(initialCode || '');
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
                        disabled={!isPyodideReady || isRunning}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50 active:scale-95",
                            isRunning && "animate-pulse"
                        )}
                    >
                        {isRunning ? (
                            <RotateCcw className="animate-spin" size={16} />
                        ) : (
                            <Play size={16} fill="currentColor" />
                        )}
                        {isRunning ? "Running..." : "Run Code"}
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="h-[400px] w-full relative border-b bg-[#1e1e1e]">
                {!isPyodideReady && !error && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                            <p className="text-sm font-medium animate-pulse">Initializing Python 3.11 Runtime...</p>
                        </div>
                    </div>
                )}
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
                    }}
                />
            </div>

            {/* Console Output */}
            <div className="bg-[#0c0c0d] p-6 min-h-[140px] max-h-[300px] overflow-y-auto font-mono">
                <div className="flex items-center gap-2 mb-3 text-muted-foreground/50 border-b border-white/5 pb-2">
                    <Terminal size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">Output Console</span>
                </div>

                {error && (
                    <div className="flex gap-3 text-red-400 mb-2 items-start">
                        <AlertCircle size={16} className="mt-1 shrink-0" />
                        <pre className="text-sm whitespace-pre-wrap leading-relaxed">{error}</pre>
                    </div>
                )}

                {!output && !error && isPyodideReady && (
                    <p className="text-zinc-600 text-sm italic">Click &quot;Run Code&quot; to see results here...</p>
                )}

                {output && (
                    <pre className="text-sm text-green-400/90 leading-relaxed whitespace-pre-wrap">{output}</pre>
                )}
            </div>

            {/* Footer Status */}
            <div className="px-6 py-2 border-t bg-muted/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", isPyodideReady ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-yellow-500")} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                        {isPyodideReady ? "Python 3.11 (WASM) Online" : "Connecting..."}
                    </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/30 uppercase">Powered by Pyodide</span>
            </div>
        </div>
    );
}
