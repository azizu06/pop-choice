"use server";
import { getMovies } from "@/lib/movieRecs";
import { Session, Preferences } from "@/lib/schemas";

export const getMovieRecs = async (session: Session, prefs: Preferences[]) => {
  return getMovies(session, prefs);
};
