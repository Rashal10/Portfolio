import { skills } from "@/data/portfolio";

export default function SkillsContent() {
  return (
    <div>
      <h2 className="text-base md:text-lg font-bold tracking-widest mb-5 uppercase">
        {skills.title}
      </h2>
      <div className="space-y-4">
        {skills.categories.map((cat) => (
          <div
            key={cat.name}
            className="border-2 border-black p-4 md:p-5"
          >
            <h3 className="text-[10px] font-bold tracking-widest text-gray-600 mb-3 uppercase border-b border-black pb-2">
              {cat.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="text-[10px] border border-black px-2 py-0.5 hover:bg-black hover:text-white transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
