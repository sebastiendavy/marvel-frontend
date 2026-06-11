import { Heart } from "lucide-react";
import { useState } from "react";

function CharacterCard({ character, onToggleFavorite }) {
  const noImage = character.thumbnail.path.includes("image_not_available");

  const favorites =
    JSON.parse(localStorage.getItem("favoritesCharacters")) || [];

  const [isLiked, setIsLiked] = useState(
    favorites.find((el) => el._id === character._id) ? true : false,
  );

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites =
      JSON.parse(localStorage.getItem("favoritesCharacters")) || [];
    const found = favorites.find((el) => el._id === character._id);

    let newFavorites;
    if (found) {
      // Si déjà présent en favori, on le retire
      newFavorites = favorites.filter((el) => el._id !== character._id);
    } else {
      // Si pas présent, on ajoute le character dans la liste
      favorites.push(character);
      newFavorites = favorites;
    }

    localStorage.setItem("favoritesCharacters", JSON.stringify(newFavorites));
    setIsLiked(!found);

    if (onToggleFavorite) onToggleFavorite();
  };
  return (
    <>
      <div className=" relative rounded-xl flex-1 h-80 flex flex-col overflow-hidden border border-gray-300 h-auto hover:bg-gray-50 group">
        {noImage ? (
          <div>
            <img
              src="https://www.gazetebirlik.com/cropImages/1280x/uploads/haberler/2026/03/77oJ-2026-marvel-filmleri-neler-avengers-doomsday-ne-zaman-cikacak-spider-man-brand-new-day-konusu-ne-blade-yayin-tarihi-belli-mi.jpg"
              className="grayscale h-56 object-cover "
            />
          </div>
        ) : (
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            className="grayscale h-56 object-cover group-hover:grayscale-0 transition duration-300 "
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
          <h1 className="font-semibold truncate">{character.name}</h1>
        </div>
      </div>
    </>
  );
}

export default CharacterCard;
