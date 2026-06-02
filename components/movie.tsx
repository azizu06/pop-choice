import Image from "next/image";
import Poster from "@/public/poster.png";
import { Movie } from "@/lib/schemas";
export type MoviePageProps = {
  nextMovie: () => void;
  isLast: boolean;
  isPending: boolean;
  movie: Movie;
};

export default function MoviePage({
  nextMovie,
  movie,
  isLast,
  isPending,
}: MoviePageProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1>
        {movie.title} ({movie.releaseYear})
      </h1>
      <Image
        src={movie.posterUrl ?? Poster}
        alt={`${movie.title} poster`}
        width={300}
        height={450}
      />
      <p>{movie.explanation}</p>
      <button onClick={() => nextMovie()}>
        {isPending
          ? "Generating..."
          : isLast
            ? "Try different preferences"
            : "Next Movie"}
      </button>
    </div>
  );
}
