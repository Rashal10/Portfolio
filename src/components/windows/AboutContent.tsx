import { about } from "@/data/portfolio";
import BinaryEasterEgg from "@/components/windows/BinaryEasterEgg";

export default function AboutContent() {
  return (
    <div>
      <h2 className="text-base md:text-lg font-bold tracking-widest mb-5 uppercase">
        {about.title}
      </h2>
      <div className="border-2 border-black p-4 md:p-5 space-y-3 text-gray-800">
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <BinaryEasterEgg />
    </div>
  );
}
