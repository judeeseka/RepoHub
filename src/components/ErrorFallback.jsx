import { Button } from "./ui/button";
import PropTypes from "prop-types";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div
        role="alert"
        className="p-4 max-w-[90%] w-[384px] border border-slate-400 text-center bg-white"
      >
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }} className="whitespace-normal my-4">
          {error.message}
        </pre>
        <Button onClick={() => resetErrorBoundary()}>Try again</Button>
      </div>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func, // Assuming error is a string, adjust accordingly
  // Other PropTypes for your component
};

export default ErrorFallback;
