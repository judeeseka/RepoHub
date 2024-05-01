import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Octokit } from "octokit";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_PAT,
});

async function handleDelete(payload) {
  const response = await octokit.request("DELETE /repos/{owner}/{repo}", {
    owner: "judeeseka",
    repo: payload.name,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return response;
}

const DeleteModal = (props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const payload = { name: props.repoName };
    const response = await handleDelete(payload);
    queryClient.invalidateQueries({ queryKey: ["allRepoData"] });
    props.setDeleteModal(false);
    navigate("/repositories");
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this
          repository.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={(e) => handleClick(e)}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

DeleteModal.propTypes = {
  repoName: PropTypes.string,
  setDeleteModal: PropTypes.func,
};

export default DeleteModal;
