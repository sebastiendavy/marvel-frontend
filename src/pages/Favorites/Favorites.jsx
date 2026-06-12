import CharacterCard from "@/react-components/CharacterCard/CharacterCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import ComicCard from "@/react-components/ComicCard/ComicCard";

function Favorites() {
  // useState pour ce qu'il y a localstorage
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoritesCharacters")) || [],
  );

  // changement de ce qu'il y a dans localstorage
  const refreshFavorites = () => {
    setFavorites(JSON.parse(localStorage.getItem("favoritesCharacters")) || []);
  };

  const [favoritesComics, setFavoritesComics] = useState(
    JSON.parse(localStorage.getItem("favoritesComics")) || [],
  );

  const refreshComicFavorites = () => {
    setFavoritesComics(
      JSON.parse(localStorage.getItem("favoritesComics")) || [],
    );
  };

  return (
    <>
      {" "}
      <div className="mx-auto p-8 flex gap-4 flex-col">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {" "}
            <h1 className="text-large font-bold">Characters</h1>
            <span className="text-gray-500">({favorites.length})</span>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {" "}
            {favorites.map((character) => {
              return (
                <Link key={character._id} to={`/character/${character._id}`}>
                  {" "}
                  <CharacterCard
                    key={character._id}
                    character={character}
                    onToggleFavorite={refreshFavorites}
                  />
                </Link>
              );
            })}
          </div>
        </div>{" "}
        <div className="mt-6 mb-20 flex flex-col gap-4">
          {" "}
          <div className="flex gap-2">
            {" "}
            <h1 className="text-large font-bold">Comics</h1>
            <span className="text-gray-500">({favoritesComics.length})</span>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {" "}
            {favoritesComics.map((comic) => {
              return (
                <Link key={comic._id} to={`/comic/${comic._id}`}>
                  {" "}
                  <ComicCard
                    key={comic._id}
                    comic={comic}
                    onToggleFavorite={refreshComicFavorites}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Favorites;
