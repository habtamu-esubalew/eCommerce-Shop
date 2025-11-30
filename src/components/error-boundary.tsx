"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorMessage = this.state.error?.message 
        ? String(this.state.error.message)
        : "An unexpected error occurred";

      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 p-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p className="text-muted-foreground max-w-md">
              {errorMessage}
            </p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => this.setState({ hasError: false, error: null })}>
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link href={ROUTES.HOME}>Go Home</Link>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

