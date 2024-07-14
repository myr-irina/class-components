import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorDetails: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorDetails: '',
  };

  public static getDerivedStateFromError(_: Error): Partial<State> {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);

    this.setState({
      errorDetails: `Error caught: ${error.message}\nError Info: ${JSON.stringify(errorInfo)}`,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong:</p>
          <pre>{this.state.errorDetails}</pre>
          <button onClick={() => this.resetError()}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }

  private resetError() {
    this.setState({ hasError: false, errorDetails: '' });
  }
}

export default ErrorBoundary;
