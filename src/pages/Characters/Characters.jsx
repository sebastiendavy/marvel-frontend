import CharacterCard from "@/react-components/CharacterCard/CharacterCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../react-components/Pagination/Pagination";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

function Characters() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Pagination
  const limit = 100;
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
    <div className="mx-auto flex justify-center">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="mx-auto p-8 flex gap-4 flex-col">
        <div className="flex justify-between items-center flex-col gap-2 sm:flex-row">
          {" "}
          <div className="flex gap-2">
            {" "}
            <h1 className="text-large font-bold">Characters</h1>
            <span className="text-gray-500">({data.count})</span>
          </div>
          <InputGroup className="bg-gray-50 w-full sm:w-64">
            <InputGroupInput
              placeholder="Search for a character..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <InputGroupAddon>
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
      <div className="mx-auto flex gap-4 justify-center py-8">
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
