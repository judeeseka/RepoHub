import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="pt-20 h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-5xl text-center">Simplify your Github Experience</h1>
      <p className="mt-2 mb-8 italic text-center w-5/6 mx-auto">
        Explore, create and manage repositories, Hassle-free
      </p>

      <Button>
        <Link to="/repositories">Browse Repositories</Link>
      </Button>

      <Button className="absolute bottom-1 left-1">
        <Link to="/not_found">Test 404</Link>
      </Button>
    </div>
  );
};

export default Home;
