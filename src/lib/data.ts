
export const HERO_TEXT_MAIN = "Hi, I'm Shreyan";
export const HERO_TEXT_SUB = "Full Stack Developer";

export const ABOUT_TEXT = `I'm a Computer Science student at KIIT University passionate about solving real-world problems using AI and full-stack development. I'm a Smart India Hackathon finalist and an active open-source contributor. I love turning ideas into code. My journey in computer science is driven by a deep curiosity for problem-solving and a mission to leverage my skills in innovative projects that push the boundaries of what's possible.`;

export interface Skill {
  name: string;
  icon?: string; // For future use with icons if desired, for now, just text
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python" }, { name: "JavaScript" }, { name: "TypeScript" },
      { name: "Java" }, { name: "C++" }, { name: "HTML" }, { name: "CSS" },
    ],
  },
  {
    title: "Libraries & Frameworks",
    skills: [
      { name: "React" }, { name: "Next.js" }, { name: "Node.js" }, { name: "Express.js" },
      { name: "Scikit-learn" }, { name: "Pandas" }, { name: "NumPy" },
      { name: "TensorFlow" }, { name: "PyTorch" }, { name: "Flask" }, { name: "Streamlit" },
    ],
  },
  {
    title: "Databases & Cloud",
    skills: [
      { name: "MongoDB" }, { name: "Firebase" }, { name: "PostgreSQL" }, { name: "MySQL" },
    ],
  },
  {
    title: "Dev Tools & Platforms",
    skills: [
      { name: "Git & GitHub" }, { name: "Docker" }, { name: "VS Code" }, { name: "Jupyter Notebooks" }, { name: "Postman" }
    ],
  },
  {
    title: "Concepts",
    skills: [
      { name: "Data Structures & Algorithms" }, { name: "Artificial Intelligence" }, { name: "Machine Learning" },
      { name: "Full-Stack Development" }, { name: "Data Analysis" }, { name: "Open Source Contribution" },
      { name: "RESTful APIs" }, { name: "Agile Development" }
    ],
  },
];


export const EXPERIENCES = [
  {
    year: "2024 - Present",
    role: "Open Source Contributor",
    company: "GitHub",
    description: `Actively contributing to various open-source projects, focusing on full-stack web development and AI/ML tools. Collaborating with developers worldwide to improve codebase and add new features.`,
    technologies: ["React.js", "Next.js", "Python", "TypeScript"],
  },
  {
    year: "2022 - 2026",
    role: "B.Tech Student",
    company: "KIIT University",
    description: `Pursuing a degree in Computer Science. Gaining strong foundational knowledge in algorithms, data structures, and software engineering principles while building practical projects.`,
    technologies: ["C++", "Java", "Data Structures", "Algorithms"],
  },
];

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  repoUrl: string;
  imageHint?: string;
  localImageKey?: string; // To map to a statically imported image
}


export const PROJECTS: Project[] = [
  {
    title: "BallotBox",
    description: "BallotBox is an AI-powered, full-stack election management platform built with Next.js 15, React, TypeScript, Tailwind CSS, Firebase, MongoDB, and Genkit AI for secure, real-time, and role-based voting experiences.",
    technologies: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Firebase", "MongoDB", "Genkit AI"],
    liveUrl: "#",
    repoUrl: "#",
    localImageKey: "ballotBoxImage"
  },
  {
    title: "React Portfolio (This Website)",
    description: "My personal portfolio website built with Next.js, React, and Tailwind CSS, showcasing my projects, skills, and journey.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    liveUrl: "/",
    repoUrl: "https://github.com/pandashreyan/Nextjs-portfolio",
    localImageKey: "reactPortfolioImage"
  },
  {
    title: "IPL Win Predictor",
    description: "ML model predicting match outcomes using historical data with a dashboard, providing real-time insights and win probabilities.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Matplotlib"],
    liveUrl: "#",
    repoUrl: "https://github.com/pandashreyan/machine-learning-mini-project/tree/main",
    localImageKey: "iplPredictorImage"
  },
  {
    title: "Text Summarizer",
    description: "An AI-powered tool that condenses long texts into concise summaries, using natural language processing techniques.",
    technologies: ["Python", "NLTK", "Streamlit", "Transformers", "Flask"],
    liveUrl: "#",
    repoUrl: "https://github.com/Bornin112004/text-summarizer-using-llm-and-flask",
    localImageKey: "textSummarizerImage"
  },
  {
    title: "Nagrik aur Sambhidhan App",
    description: "Contributed to developing an application that transforms interactions with the Constitution, making it engaging and accessible.",
    technologies: ["React Native", "Bootstrap", "Flask", "MySQL", "Java", "Apache OpenNLP"],
    liveUrl: "#",
    repoUrl: "https://github.com/pandashreyan/SIHAPP",
    localImageKey: "nagrikAppImage"
  },
  {
    title: "Carbon Footprint Calculator",
    description:
      "A web application allowing users to calculate their carbon footprint based on daily activities, offering insights into environmental impact.",
    technologies: ["HTML", "CSS", "Streamlit", "Python", "Pandas"],
    liveUrl: "#",
    repoUrl: "https://github.com/pandashreyan/ML-projects",
    localImageKey: "carbonFootprintImage"
  },
];

export interface Achievement {
  title: string;
  description: string;
  year?: string;
  link?: string;
  icon?: React.ElementType; // For lucide-react icons
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Smart India Hackathon (SIH) 2024 Finalist",
    description: "Reached the finals of SIH 2024, a nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives.",
    year: "2024",
  },
  {
    title: "Open Source Contributor",
    description: "Actively contribute to various open-source projects on GitHub, focusing on web development and AI/ML tools.",
    link: "https://github.com/pandashreyan",
  },
  {
    title: "Competitive Programming",
    description: "Regular participant and problem solver on platforms like LeetCode and Codeforces, honing algorithmic and data structure skills.",
    // Individual links can be added if desired, or this can be a general statement
  },
];


export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatarUrl?: string;
  company?: string;
  avatarHint?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Shreyan is skilled and helped us build a model using Ollama where we presented real-world scenarios of crime cases he has solved. We were able to achieve our SIH project.",
    name: "Sankalp Prajapati",
    title: "Smart India Hackathon Lead",
    avatarUrl: "https://placehold.co/100x100/F0EBFF/30204A.png",
    avatarHint: "team lead student"
  },
  {
    quote: "Shreyan is a highly skilled developer with a keen eye for detail. He consistently produces clean, efficient code and is a great communicator. I highly recommend him for any development role.",
    name: "Vipul Singh",
    title: "Full Stack Developer",
    avatarUrl: "https://placehold.co/100x100/EBF4FF/76779A.png",
    avatarHint: "man portrait"
  },
  {
    quote: "The portfolio Shreyan built for me is fantastic! It's modern, responsive, and truly captures my personal brand. I've received so many compliments on it since it went live.",
    name: "Harshit Singh",
    title: "Freelance Designer",
    avatarUrl: "https://placehold.co/100x100/EBF4FF/76779A.png", 
    avatarHint: "designer avatar"
  }
];



