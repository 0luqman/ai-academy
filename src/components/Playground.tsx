    "use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function Playground({ initialCode }: { initialCode?: string }) {
    const [code, setCode] = useState(initialCode || '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
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

            setOutput(stdout + stderr);
        } catch (e: any) {
            setOutput(e.message || "An error occurred.");
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="flex flex-col rounded-lg border bg-background shadow-sm overflow-hidden my-6">
            <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
                <span className="text-sm font-medium">Python Workspace</span>
                <button
                    onClick={runCode}
                    disabled={!isPyodideReady || isRunning}
                    className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                    {isRunning ? "Running..." : "Run Code"}
                </button>
            </div>
            <div className="h-[300px] w-full border-b">
                <MonacoEditor
                    height="100%"
                    language="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val || '')}
                    options={{ minimap: { enabled: false }, fontSize: 14 }}
                />
            </div>
            <div className="bg-[#1e1e1e] p-4 text-sm font-mono text-zinc-300 h-32 overflow-y-auto">
                {!isPyodideReady ? (
                    <span className="text-muted-foreground animate-pulse">Initializing Pyodide Runtime...</span>
                ) : (
                    <pre>{output || "Output will appear here..."}</pre>
                )}
            </div>
        </div>
    );
}
