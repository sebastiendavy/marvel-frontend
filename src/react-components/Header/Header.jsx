import Logo from "../../assets/marvel_logo.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

function Header() {
  return (
    <header className="flex justify-center pt-8 pb-10">
      <div className="flex justify-center flex-col items-center gap-4">
        {" "}
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
              My favorites
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
