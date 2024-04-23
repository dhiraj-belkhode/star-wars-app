import React from "react";
import axios, { AxiosError } from "axios";

interface ErrorBoundaryProps {
  fallbackUI?: React.ReactNode;
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  status?: number;
}

/**
 * ErrorBoundary component for catching errors in its child component tree.
 * It uses the componentDidCatch lifecycle method to handle errors gracefully.
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Initial state
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Lifecycle method called when an error is thrown within a child component.
   * It sets the state to indicate an error occurred and logs the error.
   * @param error - The error that was thrown.
   * @param info - Information about the component stack when the error occurred.
   */
  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // Update the state to indicate an error occurred
    this.setState({ hasError: true, error });

    // Log the error and additional information
    console.error("ErrorBoundary caught an error:", error);
    console.error("Component stack:", info.componentStack);

    // Check if the error is an instance of AxiosError
    console.log(isAxiosError(error));
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError;

      // Log the response data from the AxiosError
      if (axiosError.response) {
        this.setState({
          hasError: true,
          error,
          status: axiosError.response.status,
        });
      }
    }
  }

  render(): React.ReactNode {
    // Check if an error occurred
    if (this.state.hasError) {
      // Return the fallback UI or a default message
      if (this.state.status === 404) {
        return (
          this.props.fallbackUI || (
            <div style={{ textAlign: "center" }}>
              <h1>Record not found.</h1>
            </div>
          )
        );
      }
      return (
        this.props.fallbackUI || (
          <div style={{ textAlign: "center" }}>
            <h1>Something went wrong.</h1>
            <p>An error occurred. Please try again later.</p>
          </div>
        )
      );
    }

    // Render the child components if no error occurred
    return this.props.children;
  }
}

/**
 * Type guard to check if an error is an instance of AxiosError.
 * @param error - The error to check.
 * @returns True if the error is an instance of AxiosError, otherwise false.
 */
function isAxiosError(error: unknown): error is AxiosError {
  // Check if error is an object and has isAxiosError method

  // const error: Error | AxiosError<unknown, any> = // Your error object

  if (axios.isAxiosError(error)) {
    console.log("axios"); // Access response data if it's an AxiosError
  }

  if (typeof error === "object" && error !== null && "isAxiosError" in error) {
    const axiosError = error as AxiosError;
    console.log(axiosError);
    // Return the value of isAxiosError property (boolean)
    return axiosError.isAxiosError === true;
  }
  return false; // Return false if the error is not an instance of AxiosError
}

export default ErrorBoundary;
