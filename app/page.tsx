"use client";
import { useState, useTransition } from "react";
import SessionForm from "@/components/sessionForm";
import PrefForm from "@/components/prefForm";
import MoviePage from "@/components/movie";
import type { Preferences, Session, Movie } from "@/lib/schemas";
import { getMovieRecs } from "./actions";
export default function Home() {
  const [step, setStep] = useState("setup");
  const [isPending, startTransition] = useTransition();
  const [session, setSession] = useState<Session | null>(null);
  const [prefs, setPrefs] = useState<Preferences[]>([]);
  const [recs, setRecs] = useState<Movie[]>([]);
  const [prefIdx, setPrefIdx] = useState(1);
  const [recIdx, setRecIdx] = useState(0);
  const curMovie = recs[recIdx];
  const handleSetup = (data: Session) => {
    setSession(data);
    setStep("prefs");
  };
  const handlePrefs = (data: Preferences) => {
    if (!session) return;
    const allPrefs = [...prefs, data];
    if (allPrefs.length !== session.peopleCount) {
      setPrefs(allPrefs);
      setPrefIdx((prev) => prev + 1);
      return;
    }
    startTransition(async () => {
      const movies = await getMovieRecs(session, allPrefs);
      setRecs(movies);
      setPrefs(allPrefs);
      setStep("results");
    });
  };
  const resetAll = () => {
    setSession(null);
    setPrefs([]);
    setRecs([]);
    setRecIdx(0);
    setPrefIdx(1);
    setStep("setup");
  };
  const nextMovie = () => {
    if (recIdx == recs.length - 1) return resetAll();
    setRecIdx((prev) => prev + 1);
  };
  return (
    <main className="app-shell">
      {step === "setup" && <SessionForm handleSubmit={handleSetup} />}
      {step == "prefs" && (
        <PrefForm
          handleSubmit={handlePrefs}
          isLast={prefIdx === session?.peopleCount}
          isPending={isPending}
          prefIdx={prefIdx}
        />
      )}
      {step === "results" && curMovie && (
        <MoviePage
          nextMovie={nextMovie}
          movie={curMovie}
          isLast={recs.length - 1 === recIdx}
        />
      )}
      {step === "results" && !curMovie && (
        <div className="screen empty-screen">
          <section className="empty-info">
            <h1 className="movie-title">No movies found</h1>
            <p className="movie-copy empty-copy">
              Try adjusting the group preferences so PopChoice has more to work
              with.
            </p>
          </section>
          <button className="primary-button movie-button" onClick={resetAll}>
            Reset
          </button>
        </div>
      )}
    </main>
  );
}
