"use client";

import { FileText } from "lucide-react";
import { projects, type ProjectId } from "@/data/portfolio";

type ProjectsContentProps = {
  onSelectProject: (id: ProjectId) => void;
  onBack: () => void;
  selectedProject: ProjectId | null;
};

export default function ProjectsContent({
  onSelectProject,
  onBack,
  selectedProject,
}: ProjectsContentProps) {
  const selected = selectedProject
    ? projects.items.find((p) => p.id === selectedProject)
    : null;

  if (selected) {
    return (
      <div>
        <button
          type="button"
          onClick={onBack}
          className="text-[10px] mb-4 hover:underline font-mono"
        >
          &larr; Back to Projects
        </button>
        <div className="border-2 border-black p-4 md:p-5">
          <h2 className="text-sm font-bold tracking-widest mb-2 uppercase">
            {selected.title}
          </h2>
          <p className="text-gray-800 mb-4">{selected.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {selected.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] border border-black px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={selected.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
            >
              View on GitHub &rarr;
            </a>
            {selected.demo ? (
              <a
                href={selected.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
              >
                Live Demo &rarr;
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-base md:text-lg font-bold tracking-widest mb-5 uppercase">
        {projects.title}
      </h2>
      <div className="border-2 border-black divide-y-2 divide-black">
        {projects.items.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelectProject(project.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 transition-colors text-left group"
          >
            <FileText size={16} className="shrink-0" />
            <span className="text-[10px] text-gray-400 uppercase w-8 shrink-0">
              FILE
            </span>
            <span className="text-xs group-hover:underline">{project.filename}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
