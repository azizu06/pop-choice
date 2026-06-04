"use server";
import { headers } from "next/headers";
import { getMovies } from "@/lib/movieRecs";
import type { Session, Preferences } from "@/lib/schemas";
import { ratelimit } from "@/lib/ratelimit";

export const getMovieRecs = async (session: Session, prefs: Preferences[]) => {
  if (ratelimit) {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) return [];
  }
  return getMovies(session, prefs);
};
