"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
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
    console.error("MDX Content Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="my-12 p-8 rounded-[2rem] border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4 text-red-500">
            <AlertCircle size={24} />
            <h3 className="text-xl font-bold">Content Rendering Error</h3>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We encountered an issue while rendering this lesson's content. This usually happens due to malformed interactive components or MDX syntax.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20"
          >
            <RotateCcw size={16} />
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-6 p-4 rounded-xl bg-black/50 text-red-400 text-xs overflow-x-auto border border-red-500/10">
              {this.state.error?.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
