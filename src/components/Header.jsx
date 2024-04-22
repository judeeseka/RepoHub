import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-10 bg-[#DFDBFE]">
      <div className="flex p-4 md:px-12 justify-between">
        <div className="flex gap-1 items-center">
          <img src={logo} className="w-8" />
          <p className="text-xl">RepoHub</p>
        </div>

        <div>
          <Button variant="link" className="md:h-11 md:rounded-md md:px-8">
            <Link to="/">Home</Link>
          </Button>
          <Button>
            <Link to="/repositories">Explore</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
