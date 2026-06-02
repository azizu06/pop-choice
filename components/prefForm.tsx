import Image from "next/image";
import Popcorn from "@/public/popcorn.png";
import { Preferences, PreferencesSchema } from "@/lib/schemas";

export type PrefFormProps = {
  handleSubmit: (data: Preferences) => void;
  isLast: boolean;
  prefIdx: number;
};

export default function PrefForm({
  handleSubmit,
  isLast,
  prefIdx,
}: PrefFormProps) {
  const types = ["new", "classic"];
  const moods = ["fun", "serious", "inspiring", "scary"];
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      favMovie: formData.get("favMovie"),
      era: formData.get("era"),
      mood: formData.get("mood"),
      favPerson: formData.get("favPerson"),
    };
    const result = PreferencesSchema.safeParse(data);
    if (!result.success) {
      console.error(result.error);
      return;
    }
    handleSubmit(result.data);
  };
  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="flex flex-col gap-1 justify-center">
        <Image src={Popcorn} alt="popcorn" />
        <h1>{prefIdx}</h1>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="favMovie">What’s your favorite movie and why?</label>
          <input type="text" name="favMovie" id="favMovie" required />
        </div>
        <div className="flex flex-col gap-1">
          <p>Are you in the mood for something new or a classic?</p>
          <div className="flex gap-1">
            {types.map((t) => (
              <div key={t}>
                <input type="radio" name="era" id={t} required value={t} />
                <label htmlFor={t}>{t.charAt(0).toUpperCase()}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>What are you in the mood for?</p>
          <div className="flex gap-1">
            {moods.map((m) => (
              <div key={m}>
                <input type="radio" name="mood" id={m} required value={m} />
                <label htmlFor={m}>{m.charAt(0).toUpperCase()}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="favPerson">
            Which famous film person would you love to be stranded on an island
            with and why?
          </label>
          <input type="text" name="favPerson" id="favPerson" required />
        </div>
        <button type="submit">{isLast ? "Get Movies" : "Next Person"}</button>
      </form>
    </div>
  );
}
