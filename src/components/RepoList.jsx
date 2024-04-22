import { Octokit } from "octokit";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { COLOR } from "@/utils/color";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { PropTypes } from "prop-types";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_PAT,
});

async function getData({ queryKey }) {
  const response = await octokit.request("GET /users/judeeseka/repos", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
    visibility: "all",
    per_page: 5,
    page: queryKey[1],
  });

  // Filter repositories based on search query
  const filteredRepositories = queryKey[2]
    ? {
        ...response,
        data: response.data.filter((repo) =>
          repo.name.toLowerCase().includes(queryKey[2].toLowerCase())
        ),
      }
    : response;

  return filteredRepositories;
}

const RepoList = ({ debouncedSearch }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const { data } = useQuery({
    queryKey: ["repoData", pageNumber, debouncedSearch],
    queryFn: getData,
    suspense: true,
    keepPreviousData: true,
  });

  const repoData =
    data?.data.length > 0 ? (
      data?.data.map((repo) => {
        const activeColor = COLOR[repo.language];
        return (
          <Alert className="md:w-3/4 md:mx-auto lg:w-2/3" key={repo.id}>
            <AlertTitle>
              <Link to={`/repositories/${repo.name}`}>{repo.name} </Link>
            </AlertTitle>
            <AlertDescription>{repo?.description}</AlertDescription>

            <div className="flex gap-1 items-center mt-3 ">
              {repo.language && (
                <p
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: activeColor }}
                ></p>
              )}

              <p className="text-xs">{repo.language}</p>
            </div>
          </Alert>
        );
      })
    ) : (
      <p className="text-red-600">{debouncedSearch} repository do not exist</p>
    );

  useEffect(() => {
    const linkHeader = data.headers.link;
    let nextPage = false;
    let prevPage = false;

    if (linkHeader) {
      const links = linkHeader.split(",");

      for (const link of links) {
        const [url, rel] = link.split(";");
        const cleanRel = rel.trim().split("=")[1].trim().slice(1, -1);

        if (cleanRel === "next") {
          nextPage = true;
        } else if (cleanRel === "prev") {
          prevPage = true;
        }
      }
    }

    setHasNextPage(nextPage);
    setHasPrevPage(prevPage);
  }, [data]);
  return (
    <div>
      {repoData}

      <div className="mt-8 flex items-center justify-center gap-3 mb-4">
        <Button
          variant={!hasPrevPage ? "disabled" : "default"}
          onClick={() => setPageNumber((old) => Math.max(old - 1, 1))}
        >
          Prev
        </Button>
        <p>{pageNumber}</p>
        <Button
          variant={
            (debouncedSearch !== "") | !hasNextPage ? "disabled" : "default"
          }
          onClick={() => setPageNumber((prevNum) => prevNum + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

RepoList.propTypes = {
  debouncedSearch: PropTypes.string,
};

export default RepoList;
