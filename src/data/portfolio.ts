// Source de vérité unique — alimente toutes les sections du portfolio.

export const site = {
  title: "Tamto Tamko Franck Herold",
  description:
    "Développeur FullStack — Laravel, Nuxt/Vue, API REST. Freelance à Douala, Cameroun, disponible remote.",
  url: "https://portfolio.applix.fr",
  author: "Tamto Tamko Franck Herold",
  email: "heroldtamko39@gmail.com",
  phone: "+237 697626397",
  location: "Douala, Cameroun",
} as const;

export const socials = [
  { label: "GitHub", url: "https://github.com/STIFLEUR390", icon: "github" },
  { label: "Email", url: `mailto:${site.email}`, icon: "mail" },
] as const;

export type Project = {
  name: string;
  description: string;
  stack: readonly string[];
  url?: string;
  repo?: string;
  status: "live" | "en cours" | "terminé";
  featured: boolean;
};

export const projects: readonly Project[] = [
  {
    name: "Reussir TCF",
    description:
      "SaaS de préparation au TCF Canada — gestion utilisateurs, abonnements payants, quiz interactifs, suivi de performance, contenu dynamique.",
    stack: ["Laravel", "Vue.js", "MySQL", "Stripe"],
    url: "https://reussir-tcf.com",
    status: "live",
    featured: true,
  },
  {
    name: "KwikTalk",
    description:
      "Plateforme SaaS marketing WhatsApp — campagnes automatisées, gestion de conversations, analyse de données, IA conversationnelle, multi-comptes.",
    stack: ["Laravel", "Vue.js", "WhatsApp API", "AI"],
    url: "https://whatspro.aplix.nl",
    status: "live",
    featured: true,
  },
] as const;

export const skills = {
  "Langages & Frameworks": [
    "Laravel",
    "PHP",
    "Nuxt / Vue.js",
    "JavaScript",
    "HTML5",
    "CSS3",
  ],
  "API & Backend": [
    "API REST",
    "GraphQL",
    "MySQL / MariaDB",
    "SQLite",
    "USSD",
    "Mobile Money (MTN)",
  ],
  Frontend: ["Tailwind CSS", "Bootstrap", "Bulma", "Responsive Design"],
  "Outils & DevOps": ["Git", "Docker", "Linux", "CI/CD"],
} as const;

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: readonly string[];
};

export const experiences: readonly Experience[] = [
  {
    role: "Développeur Web",
    company: "ETECH KEYS",
    location: "Douala, Cameroun",
    period: "Juil 2019 — Aujourd'hui",
    description:
      "Développement d'applications web full-stack pour des clients du secteur bancaire, télécom et éducation.",
    highlights: [
      "Applications USSD + API Mobile Money MTN *039#",
      "API REST de suivi client et gestion commerciale",
      "Plateforme de vente d'assurance via banques (validation par assureur)",
      "Site e-commerce",
      "SaaS de gestion scolaire",
    ],
  },
  {
    role: "Stagiaire Développeur Web",
    company: "ETECH KEYS",
    location: "Douala, Cameroun",
    period: "2018 — 2019",
    description:
      "Fondamentaux du développement web : HTML, CSS, PHP, MySQL.",
    highlights: ["Site vitrine pour entreprise de matériaux"],
  },
] as const;

export const certifications = [
  {
    name: "Développement Web Full Stack",
    issuer: "Udemy",
    date: "Février 2023",
    topics:
      "HTML5, CSS3, Bootstrap, JavaScript/jQuery, PHP, MySQL, AJAX, gestion BD",
  },
] as const;
