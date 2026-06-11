import { Heart } from "lucide-react";
import { useState } from "react";

function CharacterCard({ comic, onToggleFavorite }) {
  const noImage = comic.thumbnail.path.includes("image_not_available");
  const favoritesComics =
    JSON.parse(localStorage.getItem("favoritesComics")) || [];

  const [isLiked, setIsLiked] = useState(
    favoritesComics.find((el) => el._id === comic._id) ? true : false,
  );

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favoritesComics =
      JSON.parse(localStorage.getItem("favoritesComics")) || [];
    const found = favoritesComics.find((el) => el._id === comic._id);

    let newComicFavorites;
    if (found) {
      // Si déjà présent en favori, on le retire
      newComicFavorites = favoritesComics.filter((el) => el._id !== comic._id);
    } else {
      // Si pas présent, on ajoute le comic dans la liste
      favoritesComics.push(comic);
      newComicFavorites = favoritesComics;
    }

    localStorage.setItem("favoritesComics", JSON.stringify(newComicFavorites));
    setIsLiked(!found);

    if (onToggleFavorite) onToggleFavorite();
  };
  return (
    <>
      <div className="relative rounded-xl flex-1 flex flex-col overflow-hidden h-auto border border-gray-300 hover:bg-gray-50">
        {noImage ? (
          <div>
            <img
              src="https://i.pinimg.com/736x/db/b2/12/dbb2129035f83c491af200bb58e257cc.jpg"
              className="object-cover w-full h-80"
            />
          </div>
        ) : (
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            className="h-80"
          />
        )}
        <div
          className="bg-white p-2 rounded-full absolute top-3 right-3 hover:bg-gray-100"
          onClick={handleFavorite}
        >
          <Heart
            className={isLiked ? "text-red-500" : "text-black"}
            fill={isLiked ? "currentColor" : "none"}
          />
        </div>
        <div className="p-3">
          {" "}
          <h1 className="font-semibold truncate">{comic.title}</h1>
        </div>
      </div>
    </>
  );
}

export default CharacterCard;
