"use server";
import { headers } from "next/headers";
import { getMovies } from "@/lib/movieRecs";
import type { Session, Preferences } from "@/lib/schemas";
import { ratelimit } from "@/lib/ratelimit";

export const getMovieRecs = async (session: Session, prefs: Preferences[]) => {
  if (ratelimit) {
    try {
      const headersList = await headers();
      const forwarded = headersList.get("x-forwarded-for")?.split(",")[0].trim();
      const ip = forwarded || headersList.get("x-real-ip") || "anonymous";
      const { success } = await ratelimit.limit(ip);
      if (!success) return [];
    } catch {
      // Upstash unavailable — degrade gracefully and allow the request
    }
  }
  return getMovies(session, prefs);
};
