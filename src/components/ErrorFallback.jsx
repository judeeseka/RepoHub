import { Button } from "./ui/button";
import PropTypes from "prop-types";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      role="alert"
      className="pt-20 h-screen flex flex-col justify-center items-center px-4 border border-red-500"
    >
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <Button onClick={() => resetErrorBoundary()}>Try again</Button>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func, // Assuming error is a string, adjust accordingly
  // Other PropTypes for your component
};

export default ErrorFallback;
