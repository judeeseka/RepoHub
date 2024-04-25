import ErrorFallback from "@/components/ErrorFallback";
import RepoDetails from "@/components/RepoDetails";
import { Button } from "@/components/ui/button";
import { SkeletonDemo } from "@/components/ui/skeleton";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

const SingleRepoData = () => {
  const navigate = useNavigate();
  const [testError, setTestError] = useState(false);
  const content = (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setTestError(false);
        navigate("/");
      }}
    >
      <Suspense fallback={<SkeletonDemo />}>
        <RepoDetails data={testError ? "License" : ""} />
      </Suspense>
    </ErrorBoundary>
  );

  return (
    <div>
      {content}
      <Button
        className="absolute bottom-1 left-1"
        onClick={() => setTestError(true)}
      >
        Test Error
      </Button>
    </div>
  );
};

export default SingleRepoData;
