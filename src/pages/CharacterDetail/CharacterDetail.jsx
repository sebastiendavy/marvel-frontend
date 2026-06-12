import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ComicCard from "@/react-components/ComicCard/ComicCard";

function CharacterDetail() {
  const [character, setCharacter] = useState({});
  const [comic, setComic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterResponse = await axios.get(
          `https://site--marvel-backend--n8fnmcvdjwtl.code.run/character/${characterId}`,
        );

        const comicResponse = await axios.get(
          `https://site--marvel-backend--n8fnmcvdjwtl.code.run/comics/${characterId}`,
        );
        console.log(characterResponse.data);
        setCharacter(characterResponse.data);
        setComic(comicResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <div className="mx-auto flex justify-center">
      <span>Loading... </span>
    </div>
  ) : (
    <>
      <div className=" mx-auto p-8 ">
        <div className="flex flex-col gap-4 border-b border-gray-200">
          {" "}
          <img
            className="w-24 rounded-xl"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          />{" "}
          <div className="mb-5">
            <h1 className="text-xl font-bold mb-2">{character.name}</h1>
            <p>{character.description}</p>
          </div>
        </div>
        <div className="my-8">
          <div className="flex gap-2 items-center">
            {" "}
            <h2 className="text-xl font-bold my-3">Related comics</h2>
            <span className="text-gray-500">({comic.comics.length})</span>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {comic.comics.map((comic, index) => {
              return <ComicCard comic={comic} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CharacterDetail;
