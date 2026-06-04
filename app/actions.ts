"use server";
import { headers } from "next/headers";
import { getMovies } from "@/lib/movieRecs";
import type { Session, Preferences, Movie } from "@/lib/schemas";
import { ratelimit } from "@/lib/ratelimit";

type MovieRecsResult = {
  movies: Movie[];
  error?: string;
};

export const getMovieRecs = async (
  session: Session,
  prefs: Preferences[],
): Promise<MovieRecsResult> => {
  try {
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for")?.split(",")[0].trim();
    const ip = forwarded || headersList.get("x-real-ip") || "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return {
        movies: [],
        error: "Too many recommendation requests. Try again later.",
      };
    }
  } catch (error) {
    console.error("Rate limit check failed", error);
  }

  const movies = await getMovies(session, prefs);

  return {
    movies,
  };
};
