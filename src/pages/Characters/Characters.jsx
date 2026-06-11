import CharacterCard from "@/react-components/CharacterCard/CharacterCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Pagination from "../../react-components/Pagination/Pagination";

function Characters() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Pagination
  const limit = 20;
  const pagesTab = [];
  if (data) {
    let pageNumber = 1;
    for (let i = 1; i < data.count; i = i + limit) {
      pagesTab.push(pageNumber);
      pageNumber++;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--n8fnmcvdjwtl.code.run/characters?limit=${limit}&skip=${(page - 1) * limit}&name=${search}`,
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [limit, page, search]);

  return isLoading ? (
    <div className=" max-w-6xl mx-auto flex justify-center">
      <span>Loading... </span>
    </div>
  ) : (
    <>
      <div className=" max-w-6xl mx-auto flex gap-4 flex-col">
        <div className="flex justify-between items-center">
          {" "}
          <div className="flex gap-2">
            {" "}
            <h1 className="text-large font-bold">Characters</h1>
            <span className="text-gray-500">({data.count})</span>
          </div>
          <Input
            type="search"
            placeholder="Search for a character..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="bg-gray-100 w-3xs"
          />{" "}
        </div>

        <div className="grid grid-cols-5 gap-4 flex-wrap">
          {" "}
          {data.results.map((character, index) => {
            return (
              <Link to={`/character/${character._id}`} key={index}>
                <CharacterCard character={character} />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex gap-4 justify-center py-8">
        {" "}
        <Pagination
          setPage={setPage}
          limit={limit}
          pagesTab={pagesTab}
          data={data}
          page={page}
        />
      </div>
    </>
  );
}

export default Characters;
