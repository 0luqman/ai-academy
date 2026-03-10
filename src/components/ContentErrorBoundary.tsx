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

export class ContentErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
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
        <div className="my-12 p-8 rounded-[2rem] border border-red-500/20 bg-red-500/5 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Content Rendering Error</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            We encountered an issue while rendering this lesson's content. This might be due to malformed MDX or a temporary glitch.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-all"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-8 p-4 bg-black/40 rounded-lg text-left text-xs font-mono overflow-auto max-h-40 text-red-400">
              {this.state.error?.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
