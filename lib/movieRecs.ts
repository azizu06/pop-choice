import { openai } from "@/lib/openai";
import { supabase } from "@/lib/supabase";
import type { MovieMatch, Preferences, Session, Movie } from "@/lib/schemas";
import { instructions } from "@/lib/instructions";
import { getPosterUrl } from "@/lib/tmdb";

export const createEmbedding = async (input: string) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input,
  });
  return response.data[0].embedding;
};

const findMatches = async (embedding: number[]) => {
  const { data, error } = await supabase.rpc("match_popmovies", {
    query_embedding: embedding,
    match_threshold: 0.3,
    match_count: 5,
  });
  if (error) throw error;
  return data;
};

const getChatCompletion = async (text: string, query: string) => {
  const input = `Context: ${text}\nQuery ${query}`;
  const response = await openai.responses.create({
    model: "gpt-5-nano",
    input,
    instructions,
  });
  return response.output_text;
};

export const getMovies = async (
  session: Session,
  prefs: Preferences[],
): Promise<Movie[]> => {
  const allPrefs = prefs
    .map((p, i) => {
      return `
      Person ${i + 1}:
      Favorite Movie - ${p.favMovie}
      Movie Era - ${p.era}
      Mood - ${p.mood}
      Favorite Film Person - ${p.favPerson}
    `;
    })
    .join("\n\n");
  const input = `
  Group has ${session.peopleCount} people and ${session.time} available.
  ${allPrefs}
  `;
  const embedding = await createEmbedding(input);
  try {
    const matches = await findMatches(embedding);
    if (!matches) return [];
    const movies = await Promise.all(
      matches.map(async (m: MovieMatch) => {
        return {
          title: m.title,
          releaseYear: m.release_year,
          posterUrl: await getPosterUrl(m.title, m.release_year),
          explanation: await getChatCompletion(m.content, input),
        };
      }),
    );
    return movies;
  } catch (err) {
    console.error(err);
    return [];
  }
};
