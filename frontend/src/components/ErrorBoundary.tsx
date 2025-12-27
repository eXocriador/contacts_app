import React from "react";
import Spinner from "./Spinner";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    // Можна додати логування у зовнішній сервіс тут
    // console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text-default p-8">
          <h1 className="text-3xl font-bold mb-4 text-danger">
            Something went wrong
          </h1>
          <p className="mb-4 text-text-secondary">
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button onClick={this.handleReload} className="btn-primary mb-6">
            Reload Page
          </button>
          {process.env.NODE_ENV === "development" && (
            <div className="bg-surface border border-border rounded-lg p-4 w-full max-w-xl overflow-auto text-xs text-left">
              <pre>{this.state.error?.toString()}</pre>
              <pre>{this.state.errorInfo?.componentStack}</pre>
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
