import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ComicDetail() {
  const [comic, setComic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { comicId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comicResponse = await axios.get(
          `https://site--marvel-backend--n8fnmcvdjwtl.code.run/comic/${comicId}`,
        );
        console.log(comicResponse.data);
        setComic(comicResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [comicId]);

  return isLoading ? (
    <div className="mx-auto flex justify-center">
      <span>Loading... </span>
    </div>
  ) : (
    <>
      <div className="mx-auto p-8 ">
        <div className="flex flex-col gap-4 ">
          {" "}
          <img
            className="w-96 rounded-xl"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          />{" "}
          <div className="mb-5">
            <h1 className="text-xl font-bold mb-2">{comic.title}</h1>
            <p>{comic.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComicDetail;
