"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ContentErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Content Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="my-8 rounded-[2rem] border border-red-500/20 bg-red-500/5 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
            <AlertCircle size={32} />
          </div>
          <h2 className="mb-2 text-xl font-black tracking-tight text-foreground">
            Oops! Content Loading Error
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Something went wrong while rendering this part of the lesson. This usually happens due to malformed content or a temporary client-side mismatch.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-2.5 text-xs font-black uppercase tracking-widest text-background transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCcw size={14} />
            Try to reload
          </button>
          {process.env.NODE_ENV === "development" && (
            <pre className="mt-8 overflow-auto rounded-lg bg-black/50 p-4 text-left text-xs font-mono text-red-400">
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ContentErrorBoundary;
