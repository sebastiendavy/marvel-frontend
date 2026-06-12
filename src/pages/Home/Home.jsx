import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex gap-4 flex-col p-20">
        <div className="w-full max-w-6xl mx-auto flex justify-between flex-col items-center gap-10">
          {" "}
          <h1 className="text-4xl">Welcome to Marvel!</h1>
          <p>Learn more about Marvel characters and comics.</p>
          <div className="flex gap-6">
            {" "}
            <div className="flex flex-col items-center gap-6">
              {" "}
              <img
                src="https://m.media-amazon.com/images/I/91zK5wI394L._UF1000,1000_QL80_.jpg"
                className="w-3xs h-96 object-cover rounded-xl"
              />
              <Link to="/comics">
                <Button size="lg" className="bg-[#EC1D23] hover:bg-[#b60b11]">
                  See all comics
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-6">
              {" "}
              <img
                src="https://cdn.nerdist.com/wp-content/uploads/2024/07/29161127/Doctor-Doom-with-energy-fist-1.jpg"
                className="w-3xs h-96 object-cover rounded-xl"
              />
              <Link to="/characters">
                <Button
                  size="lg"
                  className="bg-[#EC1D23] w-full hover:bg-[#b60b11] "
                >
                  See all characters
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
