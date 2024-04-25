import RepoList from "@/components/RepoList";
import { Input } from "@/components/ui/input";
import { SkeletonDemo } from "@/components/ui/skeleton";
import useDebounce from "@/hooks/useDebounce";
import { Suspense, useState } from "react";

const AllRepo = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const content = (
    <Suspense
      fallback={[...Array(5).keys()].map((i) => (
        <SkeletonDemo key={i} />
      ))}
    >
      <RepoList debouncedSearch={debouncedSearch} />
    </Suspense>
  );
  return (
    <div className="container pt-20 lg:flex lg:flex-col lg:h-screen lg:justify-center">
      <h2 className="text-3xl text-center mb-8">All Repositories</h2>
      <div>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {content}
    </div>
  );
};

export default AllRepo;
