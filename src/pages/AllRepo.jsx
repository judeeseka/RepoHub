import Modal from "@/components/Modal";
import RepoList from "@/components/RepoList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SkeletonDemo } from "@/components/ui/skeleton";
import useDebounce from "@/hooks/useDebounce";
import { Suspense, useState } from "react";

const AllRepo = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

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
      <div className="flex gap-4 justify-center">
        <Input
          className="md:w-1/2 lg:w-2/5 mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>New</Button>
          </DialogTrigger>
          <Modal title="New Repository" action="Create" setOpen={setOpen} />
        </Dialog>
      </div>
      {content}
    </div>
  );
};

export default AllRepo;
