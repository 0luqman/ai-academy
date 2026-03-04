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
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Content Error Boundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center my-10 backdrop-blur-xl">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Something went wrong with this lesson content.</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
            We encountered an error while rendering this part of the lesson. This is usually due to malformed content in the lesson file.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
          >
            <RotateCcw size={16} />
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
