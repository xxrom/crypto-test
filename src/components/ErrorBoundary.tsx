import { FC, useState } from "react";

export const ErrorBoundary: FC<{}> = ({ children }) => {
  const [state, setState] = useState<{ error: any }>({
    error: null,
  });

  try {
    if (!state?.error) {
      // Normally, just render children
      return <>{children}</>;
    }
  } catch (error) {
    // Catch errors in any components below and re-render with error message
    setState({
      error,
    });
    // You can also log error messages to an error reporting service here
  }

  return (
    <div>
      <h2>Something went wrong.</h2>

      <details style={{ whiteSpace: "pre-wrap" }}>
        {state?.error?.toString()}
      </details>
    </div>
  );
};
