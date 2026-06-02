import Image from "next/image";
import Popcorn from "@/public/popcorn.png";

export default function StartForm({ handleSubmit }) {
  return (
    <div className="flex flex-col gap-2 justify-center">
      <div className="flex flex-col gap-1">
        <Image src={Popcorn} alt="popcorn" />
        <h1>PopChoice</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
