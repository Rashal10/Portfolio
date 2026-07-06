import { experience } from "@/data/portfolio";
import { renderBoldText } from "@/lib/rich-text";

export default function ExperienceContent() {
  return (
    <div>
      <h2 className="text-base md:text-lg font-bold tracking-widest mb-5 uppercase">
        {experience.title}
      </h2>
      <div className="space-y-5">
        {experience.entries.map((entry) => (
          <div
            key={`${entry.company}-${entry.role}`}
            className="border-2 border-black p-4 md:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-bold text-sm md:text-base">{entry.role}</h3>
                <p className="font-bold text-xs md:text-sm mt-1">{entry.company}</p>
              </div>
              <span className="text-[10px] border-2 border-black px-2.5 py-1 whitespace-nowrap shrink-0">
                {entry.dates}
              </span>
            </div>
            <ul className="space-y-2.5 mb-4 list-none">
              {entry.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:font-bold"
                >
                  {renderBoldText(bullet)}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] border border-black px-2 py-0.5 bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
