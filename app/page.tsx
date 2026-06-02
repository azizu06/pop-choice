"use client";
import { useState } from "react";
import SessionForm from "./components/sessionForm";
import PrefForm from "./components/prefForm";
import { Session, Preferences, Movie } from "./types";
export default function Home() {
  const [step, setStep] = useState("setup");
  const [session, setSession] = useState<Session | null>(null);
  const [prefs, setPrefs] = useState<Preferences[]>([]);
  const [recs, setRecs] = useState<Movie[]>([]);
  const [prefIdx, setPrefIdx] = useState(0);
  const [recIdx, setRecIdx] = useState(0);
  const handleSetup = (data: Session) => {
    setSession(data);
    setStep("prefs");
  };
  const handlePrefs = (data: Preferences) => {
    if (!session) return;
    const nextIdx = prefIdx + 1;
    setPrefs((prev) => [...prev, data]);
    setPrefIdx((prev) => prev + 1);
    if (nextIdx == session.peopleCount + 1) setStep("results");
  };
  const handleMovies = (data: Movie[]) => setRecs(data);
  const nextMovie = () => setRecIdx((prev) => prev + 1);
  return (
    <>
      {step === "setup" && <SessionForm handleSubmit={handleSetup} />}
      {step == "prefs" && (
        <PrefForm
          handleSubmit={handlePrefs}
          isLast={prefIdx === session?.peopleCount}
          prefIdx={prefIdx}
        />
      )}
      {step === "results" && (
        <Movie nextMovie={nextMovie} movie={recs[recIdx]} />
      )}
    </>
  );
}
