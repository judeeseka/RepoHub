import { Octokit } from "octokit";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropTypes } from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Modal from "./Modal";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_PAT,
});

async function getSingleData({ queryKey }) {
  const response = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: "judeeseka",
    repo: queryKey[1],
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return response;
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Format date according to user's locale
};

const RepoDetails = ({ data: errorData }) => {
  const { name } = useParams();
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["singleRepoData", name],
    queryFn: getSingleData,
    suspense: true,
  });

  return (
    <div className="container">
      <Card className="w-full md:w-5/6 md:mx-auto lg:w-1/2">
        <CardHeader>
          <CardTitle className="text-center md:text-4xl">{name}</CardTitle>
          <CardDescription className="text-center md:text-2xl">
            {data?.data.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center md:text-2xl">
            Owner:{" "}
            <span className="font-semibold">{data?.data.owner?.login}</span>
          </p>
          <p className="text-center md:text-2xl">
            Language:{" "}
            <span className="font-semibold">{data?.data.language}</span>
          </p>
          <p className="text-center md:text-2xl">
            Creation Date:{" "}
            <span className="font-semibold">
              {formatDate(data?.data.created_at)}
            </span>
          </p>
          <p className="text-center md:text-2xl">
            Last Updated Date:{" "}
            <span className="font-semibold">
              {formatDate(data?.data.updated_at)}
            </span>
          </p>
          {errorData && <p>{`${errorData}: ${data?.data.license.name}`}</p>}
          <p className="text-center md:text-2xl">
            Number of Stars:{" "}
            <span className="font-semibold">{data?.data.stargazers_count}</span>
          </p>
          <p className="text-center md:text-2xl">
            Number of Forks:{" "}
            <span className="font-semibold">{data?.data.forks_count}</span>
          </p>
          <p className="text-center md:text-2xl">
            Number of Watchers:{" "}
            <span className="font-semibold">{data?.data.watchers_count}</span>
          </p>
          <p className="text-center md:text-2xl underline italic my-3">
            <a target="_blank" href={data?.data.html_url}>
              View on GitHub
            </a>
          </p>
        </CardContent>

        {new Date(data?.data.created_at) > new Date("2024-04-23T22:03:23Z") && (
          <CardFooter className="flex justify-center gap-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="text-xl">
                  Edit
                </Button>
              </DialogTrigger>
              <Modal
                title="Edit Repository"
                description="Make changes to your profile here. Click save when you're done."
                action="Save Changes"
                repoName={name}
                repoDescription={data?.data.description}
                method="PATCH"
                setOpen={setOpen}
              />
            </Dialog>

            <AlertDialog open={deleteModal} onOpenChange={setDeleteModal}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="text-xl">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <DeleteModal setDeleteModal={setDeleteModal} repoName={name} />
            </AlertDialog>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

RepoDetails.propTypes = {
  data: PropTypes.string,
};

export default RepoDetails;
