import Logo from "../../assets/marvel_logo.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

function Header() {
  return (
    <header className="flex flex-col justify-center pb-10 gap-16">
      <div className="w-full flex justify-end p-2 gap-3 border-b border-gray-100">
        <Button variant="outline" size="sm">
          Log in
        </Button>
        <Button variant="outline" size="sm">
          Sign up
        </Button>
      </div>{" "}
      <div className="flex justify-center flex-col items-center gap-4">
        <Link to="/">
          <img src={Logo} alt="Logo Marvel" className="w-28" />
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/characters">
            <Button variant="ghost">Characters</Button>
          </Link>
          <Link to="/comics">
            {" "}
            <Button variant="ghost">Comics</Button>
          </Link>
          <Link to="/favorites">
            {" "}
            <Button variant="ghost">
              <Heart />
              Favorites
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
