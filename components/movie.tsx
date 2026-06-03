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
    <div className="screen movie-screen">
      <section className="movie-info">
        <h1 className="movie-title">
        {movie.title} ({movie.releaseYear})
        </h1>
        <Image
          className="movie-poster"
          src={movie.posterUrl ?? Poster}
          alt={`${movie.title} poster`}
          width={325}
          height={480}
        />
        <p className="movie-copy">{movie.explanation}</p>
      </section>
      <button className="primary-button movie-button" onClick={() => nextMovie()}>
        {isPending
          ? "Generating..."
          : isLast
            ? "Try different preferences"
            : "Next Movie"}
      </button>
    </div>
  );
}
