"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ContentErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Content Error Boundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="my-12 p-8 rounded-[2rem] border-2 border-red-500/20 bg-red-500/5 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-red-500 tracking-tight">Content Loading Error</h3>
              <p className="text-sm text-red-500/60 font-medium tracking-tight">We encountered a problem rendering this part of the lesson.</p>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-4 mb-6 overflow-x-auto border border-red-500/10">
            <pre className="text-xs font-mono text-red-400/80 leading-relaxed">
              {this.state.error?.message || "Unknown rendering error"}
            </pre>
          </div>

          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm transition-all hover:bg-red-600 active:scale-95 shadow-lg shadow-red-500/20"
          >
            <RefreshCcw size={16} />
            Try Again
          </button>
        </div>
      );
    }

    return this.children;
  }
}
