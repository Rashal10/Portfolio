import { education } from "@/data/portfolio";

export default function EducationContent() {
  return (
    <div>
      <h2 className="text-base md:text-lg font-bold tracking-widest mb-5 uppercase">
        {education.title}
      </h2>
      <div className="space-y-5">
        {education.entries.map((entry) => (
          <div
            key={entry.degree}
            className="border-2 border-black p-4 md:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <h3 className="font-bold text-sm md:text-base">{entry.degree}</h3>
              <span className="text-[10px] border-2 border-black px-2.5 py-1 whitespace-nowrap shrink-0">
                {entry.dates}
              </span>
            </div>
            <p className="text-gray-800">{entry.school}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
