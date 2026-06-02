import Image from "next/image";
import { MoviePageProps } from "../types";
export default function MoviePage({
  nextMovie,
  movie,
  isLast,
}: MoviePageProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1>
        {movie.title} ({movie.releaseYear})
      </h1>
      <Image src={movie.posterUrl} alt="movie poster" />
      <p>{movie.explanation}</p>
      <button onClick={() => nextMovie()}>
        {isLast ? "Try different preferences" : "Next Movie"}
      </button>
    </div>
  );
}
