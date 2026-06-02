export type Session = {
  peopleCount: number;
  time: string;
};

export type Preferences = {
  favMovie: string;
  era: "new" | "classic";
  mood: "fun" | "serious" | "inspiring" | "scary";
  favPerson: string;
};

export type Movie = {
  title: string;
  releaseYear: number;
  posterUrl: string;
  explanation: string;
};

export type SessionFormProps = {
  handleSubmit: (data: Session) => void;
};

export type PrefFormProps = {
  handleSubmit: (data: Preferences) => void;
  isLast: boolean;
  prefIdx: number;
};
