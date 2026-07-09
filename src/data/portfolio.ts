export type WindowId =
  | "about"
  | "education"
  | "experience"
  | "skills"
  | "projects"
  | "contact"
  | null;

export type ProjectId =
  | "baremetal-llm"
  | "language-systems"
  | "podcast-agent"
  | "signal-sight"
  | "deco-doc"
  | "code-arena"
  | "treasure-hunt"
  | "snake-rl";

export const profile = {
  name: "Rashal",
  handle: "@RashalHQ",
  tagline: "Escaping the Matrix",
  introText: "How you doin'",
  status: "OPEN FOR WORK",
  statusUpdated: "TODAY",
  avatar: "/images/avatar.png",
  photos: ["/images/avatar.png"],
  desktopBg: "/images/desktop-bg.png",
};

export const links = {
  email: "mailto:rashaljeet766@gmail.com",
  emailAddress: "rashaljeet766@gmail.com",
  github: "https://github.com/Rashal10",
  linkedin: "https://www.linkedin.com/in/rashaljeetsingh",
  twitter: "https://x.com/RashalHQ",
  resume:
    "https://drive.google.com/file/d/1qSgLMfcM46I9jc5L9M1poPEFvj_SX3zk/view?usp=sharing",
};

export const about = {
  title: "ABOUT ME",
  paragraphs: [
    "Hey! I am Rashal.",
    "I am a 3rd year CS student, and honestly the thing that drives most of what I do is just curiosity. I want to know what is actually going on under the hood of things. I need to know why it works the way it does.",
    "Right now that curiosity is pointed mostly at AI, Machine Learning, and Robotics. I have spent time in LLMs, NLP, Reinforcement Learning, and Computer Vision, not because it looks good on paper, but because these are the areas where you can actually peel things apart and see the machinery.",
    "Sometimes that curiosity gets pretty existential too. I catch myself wondering what is outside the matrix, whether any of this is even real, or if we are all just running inside some simulation.",
  ],
  binaryLines: [
    "01010100 01101000 01100001 01110100 00100111 01110011",
    "00100000 01110111 01101000 01100001 01110100 00100000",
    "01110011 01101000 01100101 00100000 01110011 01100001 01101001 01100100",
  ],
  binaryDecoded: "That's what she said",
};

export const galleryPhotos = [
  { id: "photo-01", src: "/photos/photo-01.png", alt: "Orion Nebula" },
  { id: "photo-02", src: "/photos/photo-02.png", alt: "Spider-Man at the window" },
  { id: "photo-03", src: "/photos/photo-03.png", alt: "Western quote sign" },
  { id: "photo-04", src: "/photos/photo-04.png", alt: "The Office cast" },
  { id: "photo-05", src: "/photos/photo-05.png", alt: "Gladiator quote" },
  { id: "photo-06", src: "/photos/photo-06.png", alt: "Lone figure under red sky" },
  { id: "photo-07", src: "/photos/photo-07.png", alt: "House and rocket launch" },
  { id: "photo-08", src: "/photos/photo-08.png", alt: "DOOM Eternal — Doom Slayer" },
  { id: "photo-09", src: "/photos/photo-09.png", alt: "Batman in the rain" },
  { id: "photo-10", src: "/photos/photo-10.png", alt: "AC/DC band portrait" },
  { id: "photo-11", src: "/photos/photo-11.png", alt: "Glitch-art Versailles gardens" },
  { id: "photo-12", src: "/photos/photo-12.png", alt: "Pixel art underwater whales and ruins" },
];

export const education = {
  title: "EDUCATION",
  entries: [
    {
      degree: "B.Tech in Computer Science",
      school: "Focused on AI, Machine Learning, and Data Structures & Algorithms",
      dates: "Present - 2028",
    },
  ],
};

export const experience = {
  title: "WORK EXPERIENCE",
  entries: [
    {
      role: "Machine Learning & AI Intern",
      company: "BeeSkilled",
      dates: "May - July 2026",
      bullets: [
        "**Completed an online internship** in Machine Learning and Artificial Intelligence, working on core ML concepts, model development, and evaluation.",
        "**Gained hands-on experience** with Python-based AI and ML workflows, from data preparation through model training and assessment.",
        "**Built practical understanding** of applied machine learning pipelines and real-world model deployment considerations.",
      ],
      tags: ["Python", "Machine Learning", "AI", "Model Development"],
    },
  ],
};

export const skills = {
  title: "SKILLS",
  categories: [
    {
      name: "Programming Languages",
      items: ["Python", "C++", "Java", "JavaScript", "C", "HTML", "CSS"],
    },
    {
      name: "AI & Machine Learning",
      items: [
        "Machine Learning",
        "Deep Learning",
        "Transformers",
        "LLMs",
        "NLP",
        "Reinforcement Learning",
        "RLHF",
        "PPO",
        "Computer Vision",
        "OpenCV",
        "Hugging Face",
        "PyTorch",
        "NumPy",
      ],
    },
    {
      name: "Tools & Technologies",
      items: [
        "Git",
        "GitHub",
        "LangGraph",
        "Apache Maven",
        "Linux",
        "API Development",
      ],
    },
    {
      name: "Core Computer Science",
      items: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Computer Architecture",
        "Databases",
      ],
    },
  ],
};

export const projects = {
  title: "PROJECTS",
  items: [
    {
      id: "baremetal-llm" as ProjectId,
      filename: "Baremetal LLM.txt",
      title: "Baremetal LLM",
      github: "https://github.com/Rashal10/Baremetal-LLM",
      description:
        "A transformer-based language model built entirely from scratch to understand architecture design and training dynamics. Implements Multi-Head Attention, RoPE, RMSNorm, SwiGLU, KV Caching, MoE, and RLHF.",
      tags: ["Python", "PyTorch", "Transformers", "RLHF", "PPO"],
    },
    {
      id: "deco-doc" as ProjectId,
      filename: "DecoDoc.txt",
      title: "DecoDoc",
      github: "https://github.com/Rashal10/DecoDoc",
      demo: "https://deco-doc.vercel.app/",
      description:
        "AI-powered research paper assistant. Paste an arXiv ID, DOI, abstract, or PDF and get structured summaries, methods breakdowns, flashcards, citation context, and study notes.",
      tags: ["TypeScript", "React", "Node.js", "Groq", "LLMs", "PostgreSQL"],
    },
    {
      id: "language-systems" as ProjectId,
      filename: "LanguageSystemsResearch.txt",
      title: "LanguageSystemsResearch",
      github: "https://github.com/Rashal10/LanguageSystemsLab",
      description:
        "Constraint-aware NLP systems for legal simplification and clinical summarization. Fine-tuned modern LLMs using QLoRA and PEFT for domain-specific applications.",
      tags: ["Python", "PyTorch", "LLaMA 3", "T5", "BART", "QLoRA"],
    },
    {
      id: "podcast-agent" as ProjectId,
      filename: "PodcastGen-Agent.txt",
      title: "PodcastGen-Agent",
      github: "https://github.com/Rashal10/PodcastGen-Agent",
      description:
        "An AI-powered agentic pipeline that generates complete podcast episodes from a topic. Integrates research, script writing, speech synthesis, and music generation.",
      tags: ["Python", "LangGraph", "LLMs", "XTTS-v2", "MusicGen"],
    },
    {
      id: "signal-sight" as ProjectId,
      filename: "SignalSight.txt",
      title: "SignalSight",
      github: "https://github.com/Rashal10/Traffic-Light-Detection",
      description:
        "A learning-based traffic light perception system for urban driving. Computer vision pipeline for traffic light detection and state classification in real-world environments.",
      tags: ["OpenCV", "PyTorch", "Computer Vision", "NumPy"],
    },
    {
      id: "code-arena" as ProjectId,
      filename: "CodeArena.txt",
      title: "CodeArena",
      github: "https://github.com/Rashal10/CodeArena",
      demo: "https://codearena-sayan.vercel.app/",
      description:
        "Full-stack web platform for creating, managing, and participating in online coding contests with problem management, code submissions, judging, and live leaderboards.",
      tags: ["TypeScript", "React", "Full-Stack", "Web Platform"],
    },
    {
      id: "treasure-hunt" as ProjectId,
      filename: "TreasureHunt.txt",
      title: "Treasure Hunt",
      github: "https://github.com/Rashal10/TreasureHunt",
      demo: "https://treasure-hunt-eight-sigma.vercel.app/",
      description:
        "Pirate-themed pathfinding visualizer. Paint custom terrain maps and watch Uniform Cost Search and Greedy Best-First Search navigate from ship to treasure, with side-by-side algorithm comparisons.",
      tags: ["JavaScript", "Algorithms", "Pathfinding", "Visualization"],
    },
    {
      id: "snake-rl" as ProjectId,
      filename: "SnakeRL.txt",
      title: "SnakeRL",
      github: "https://github.com/Rashal10/SnakeRL",
      description:
        "Snake game evolved into a reinforcement learning playground. Classic Pygame gameplay in Phase 1, then a DQN agent with experience replay that learns to play — with neon visuals, power-ups, and training plots.",
      tags: ["Python", "PyTorch", "Pygame", "DQN", "Reinforcement Learning"],
    },
  ],
};

export const contact = {
  title: "CONTACT INFO",
  message:
    "If you are into AI, machine learning, startups, ambitious projects, or just building cool things, let's connect. I am always up for meaningful conversations, new ideas, and exciting collaborations. hmu👾",
};

export const desktopIcons = [
  { id: "about" as const, label: "About Me.txt", type: "file" as const },
  { id: "education" as const, label: "Education.txt", type: "file" as const },
  {
    id: "experience" as const,
    label: "Work Experience.txt",
    type: "file" as const,
  },
  { id: "skills" as const, label: "Skills.txt", type: "file" as const },
  { id: "projects" as const, label: "Projects", type: "folder" as const },
  { id: "contact" as const, label: "Contact Info.txt", type: "file" as const },
];
