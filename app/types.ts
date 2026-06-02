export type Session = {
  peopleCount: number;
  time: string;
};

export type Preferences = {
  favMovie: string;
  movieType: "new" | "classic";
  mood: "fun" | "serious" | "inspiring" | "scary";
  favPerson: string;
};

export type Movie = {
  title: string;
  releaseYear: number;
  posterUrl: string;
  explanation: string;
};
