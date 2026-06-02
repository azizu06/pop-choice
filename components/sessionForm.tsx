import Image from "next/image";
import Popcorn from "@/public/popcorn.png";
import { Session, SessionSchema } from "@/lib/schemas";

type SessionFormProps = {
  handleSubmit: (data: Session) => void;
};

export default function SessionForm({ handleSubmit }: SessionFormProps) {
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      peopleCount: formData.get("people"),
      time: formData.get("time"),
    };
    const result = SessionSchema.safeParse(data);
    if (!result.success) {
      console.error(result.error);
      return;
    }
    handleSubmit(result.data);
  };
  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="flex flex-col gap-1">
        <Image src={Popcorn} alt="popcorn" />
        <h1>PopChoice</h1>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <label htmlFor="people">
          <input
            type="number"
            name="people"
            id="people"
            placeholder="How many people?"
            required
          />
        </label>
        <label htmlFor="time">
          <input
            type="text"
            name="time"
            id="time"
            placeholder="How much time do you have?"
            required
          />
        </label>
        <button type="submit" className="p-2 flex justify-center rounded-lg">
          Start
        </button>
      </form>
    </div>
  );
}
