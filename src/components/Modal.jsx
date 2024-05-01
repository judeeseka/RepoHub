import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PropTypes } from "prop-types";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { Octokit } from "octokit";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_PAT,
});

async function handlePostRequest(payload) {
  const response = await octokit.request("POST /user/repos", {
    name: payload.name,
    description: payload.description,
    homepage: "https://github.com",
    private: false,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return response;
}

async function handleUpdateRequest(payload) {
  const response = await octokit.request("PATCH /repos/{owner}/{repo}", {
    owner: "judeeseka",
    repo: payload.repoName,
    name: payload.name,
    description: payload.description,
    homepage: "https://github.com",
    has_issues: true,
    has_projects: true,
    has_wiki: true,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return response;
}

const Modal = (props) => {
  const [name, setName] = useState(props.repoName || "");
  const [description, setDescription] = useState(props.repoDescription || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const payload = { name, description };

    try {
      if (props.method) {
        const payload = { name, description, repoName: props.repoName };
        const response = await handleUpdateRequest(payload);
        queryClient.invalidateQueries({ queryKey: ["singleRepoData"] });
        setIsLoading(false);
        setName("");
        setDescription("");
        props.setOpen(false);

        if (props.repoName !== name) {
          queryClient.invalidateQueries({ queryKey: ["allRepoData"] });
          navigate("/");
        }
      } else {
        const response = await handlePostRequest(payload);
        queryClient.invalidateQueries({ queryKey: ["allRepoData"] });
        setIsLoading(false);
        setName("");
        setDescription("");
        props.setOpen(false);
      }
    } catch (error) {
      const length = error.response.data.errors.length - 1;
      const errorMessage = error.response.data.errors[length].message;
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="max-w-[90%] md:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogDescription>{props.description}</DialogDescription>
      </DialogHeader>
      <form className="grid gap-4 py-4">
        <div className="grid md:grid-cols-4 items-center gap-y-2 md:gap-4">
          <Label htmlFor="name" className="md:text-right">
            Name
          </Label>
          <Input
            id="name"
            placeholder="new-repository"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center italic -mt-3 md:w-[278px] md:text-left md:ml-auto">
            {error}
          </p>
        )}

        <div className="grid md:grid-cols-4 items-center gap-y-2 md:gap-4">
          <Label htmlFor="description" className="md:text-right">
            Description
          </Label>
          <Input
            id="description"
            placeholder="brief description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="col-span-3"
          />
        </div>
      </form>
      <DialogFooter>
        <Button
          variant={isLoading ? "disabled" : "default"}
          type="submit"
          onClick={(event) => handleSubmit(event)}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {props.action}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.string,
  repoName: PropTypes.string,
  repoDescription: PropTypes.string,
  method: PropTypes.string,
  setOpen: PropTypes.func,
};

export default Modal;
