"use server";
import { headers } from "next/headers";
import { getMovies } from "@/lib/movieRecs";
import { checkRateLimit } from "@/lib/rateLimit";
import type { Session, Preferences, Movie } from "@/lib/schemas";

type MovieRecsResult = {
  movies: Movie[];
  error?: string;
};

const getClientKey = async () => {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  return `${clientIp}:${userAgent}`;
};

export const getMovieRecs = async (
  session: Session,
  prefs: Preferences[],
): Promise<MovieRecsResult> => {
  const rateLimit = checkRateLimit(await getClientKey());

  if (!rateLimit.allowed) {
    const minutes = Math.max(
      1,
      Math.ceil((rateLimit.resetAt - Date.now()) / 60_000),
    );

    return {
      movies: [],
      error: `Too many recommendation requests. Try again in about ${minutes} minutes.`,
    };
  }

  const movies = await getMovies(session, prefs);

  return {
    movies,
  };
};
