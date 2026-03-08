"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ContentErrorBoundary extends Component<Props, State> {
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
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="my-12 p-8 rounded-[2rem] border border-red-500/20 bg-red-500/5 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-foreground">Content Loading Error</h3>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            We encountered a problem while rendering this part of the lesson.
            This usually happens due to a formatting error in the content source.
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all active:scale-95"
          >
            <RotateCcw size={16} />
            Try Again
          </button>
          {process.env.NODE_ENV === "development" && (
            <pre className="mt-4 p-4 rounded-lg bg-black/50 text-red-400 text-xs text-left overflow-auto max-w-full font-mono">
              {this.state.error?.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
