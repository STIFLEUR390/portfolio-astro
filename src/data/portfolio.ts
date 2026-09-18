// Source de vérité unique — alimente toutes les sections du portfolio.

export const site = {
  title: "Tamto Tamko Franck Herold",
  description:
    "Développeur FullStack — Laravel, Nuxt/Vue, API REST. Freelance à Douala, Cameroun, disponible remote.",
  url: "https://portfolio.aplix.nl",
  author: "Tamto Tamko Franck Herold",
  email: "heroldtamko39@gmail.com",
  phone: "+237 697626397",
  location: "Douala, Cameroun",
} as const;

export const images = {
  og: 'https://storage.applix.fr/hermes/uploads/portfolio/og-card.webp',
  hero: 'https://storage.applix.fr/hermes/uploads/portfolio/hero.webp',
  profile: {
    small: '/profile-400.webp',
    large: '/profile-800.webp',
    fallback: '/profile-400.png',
  },
  projects: {
    'Réussir TCF': 'https://storage.applix.fr/hermes/uploads/portfolio/project-reussir-tcf.webp',
    'KwikTalk': 'https://storage.applix.fr/hermes/uploads/portfolio/project-kwiktalk.webp',
  },
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
  status: string;
  featured: boolean;
  cover?: string;
};

export const projects: readonly Project[] = [
  {
    name: "Réussir TCF",
    description:
      "Plate-forme SaaS de préparation au TCF Canada — gestion utilisateurs, abonnements payants, quiz interactifs, suivi de performance, contenu dynamique.",
    stack: ["Laravel", "Vue.js", "MySQL", "Stripe"],
    url: "https://reussir-tcf.com",
    status: "En ligne",
    featured: true,
    cover: images.projects['Réussir TCF'],
  },
  {
    name: "KwikTalk",
    description:
      "Plate-forme SaaS marketing WhatsApp — campagnes automatisées, gestion de conversations, analyse de données, IA conversationnelle, multi-comptes.",
    stack: ["Laravel", "Vue.js", "WhatsApp API", "AI"],
    url: "https://kwiktalk.aplix.nl",
    status: "En ligne",
    featured: true,
    cover: images.projects['KwikTalk'],
  },
  {
    name: "ETECH KEYS",
    description:
      "Site web officiel — SMS, WhatsApp Business API, USSD et solutions cloud au Cameroun. Tech Provider Meta WhatsApp Officiel.",
    stack: ["Vue.js", "TypeScript", "Tailwind CSS", "WhatsApp API"],
    url: "https://etech-keys.com",
    status: "En ligne",
    featured: false,
    repo: "https://github.com/STIFLEUR390/etech-website",
  },
  {
    name: "MboaCaisse",
    description:
      "Application de gestion pour bar, restaurant et épicerie. Fonctionne en LAN local, sans internet obligatoire. POS offline-first.",
    stack: ["Tauri 2", "Rust", "Axum", "SQLite", "Nuxt 4"],
    status: "En développement",
    featured: true,
    repo: "https://github.com/STIFLEUR390/MboaCaisse",
  },
  {
    name: "Laralink",
    description:
      "Outil desktop pour gérer et lancer vos projets Laravel locaux sur votre réseau local — URL + QR code. Dev tool.",
    stack: ["Tauri 2", "Nuxt 4", "Laravel", "SQLite"],
    status: "Open source",
    featured: false,
    repo: "https://github.com/STIFLEUR390/laralink",
  },
  {
    name: "S3 Policies Generator",
    description:
      "Générateur de politiques S3/RustFS — Terraform, CloudFormation, guardrails, validator. PWA open source.",
    stack: ["Vue.js", "Terraform", "CloudFormation", "PWA"],
    url: "https://s3-policies-generator.vercel.app",
    status: "Open source",
    featured: false,
    repo: "https://github.com/STIFLEUR390/s3-policies-generator",
  },
] as const;

export const skills = {
  "Langages & Frameworks": [
    "Laravel",
    "PHP",
    "Nuxt / Vue.js",
    "JavaScript",
    "TypeScript",
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
  "Desktop & Systems": ["Rust", "Tauri 2", "Axum", "SQLite"],
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

export type Service = {
  title: string;
  description: string;
  features: readonly string[];
};

export const services: readonly Service[] = [
  {
    title: "Développement Web Full-Stack",
    description:
      "Applications web sur mesure avec Laravel (backend) et Vue.js/Nuxt (frontend).",
    features: [
      "Sites vitrines et e-commerce",
      "SaaS et applications métier",
      "Tableaux de bord et backoffices",
      "Responsive design, accessible",
    ],
  },
  {
    title: "API REST & Intégrations",
    description:
      "Conception et développement d'API REST robustes, connectées à vos systèmes existants.",
    features: [
      "API REST / GraphQL",
      "Intégrations tierces (paiement, SMS, email)",
      "Webhooks et automatisations",
      "Documentation Swagger/OpenAPI",
    ],
  },
  {
    title: "Mobile Money & USSD",
    description:
      "Intégration des solutions de paiement mobile et USSD pour le marché camerounais et africain.",
    features: [
      "API Mobile Money MTN *039#",
      "Services USSD interactifs",
      "Paiements en ligne sécurisés",
      "Adapté aux contraintes locales (offline, feature phones)",
    ],
  },
  {
    title: "DevOps & Maintenance",
    description:
      "Mise en production, déploiement continu et maintenance d'applications existantes.",
    features: [
      "Déploiement Docker / CI/CD",
      "Mise en production Nginx / VPS",
      "Monitoring et optimisation",
      "Refactoring et montées de version",
    ],
  },
] as const;

export const bio = {
  intro:
    "Développeur full-stack basé à Douala, Cameroun. Je construis des applications web robustes et performantes depuis 2018, avec un focus sur Laravel et Vue.js.",
  approach:
    "Je travaille principalement avec des PME et startups qui ont besoin d'outils sur mesure — plateformes SaaS, API d'intégration, solutions de paiement mobile. Mon objectif : livrer des produits fonctionnels, maintenables et adaptés au contexte local.",
  values: [
    "Code propre et maintenable",
    "Communication transparente",
    "Respect des délais",
    "Solutions adaptées au contexte africain",
  ],
  availability: "Freelance disponible · Remote ou Douala",
} as const;

export const certifications = [
  {
    name: "Développement Web Full Stack",
    issuer: "Udemy",
    date: "Février 2023",
    topics:
      "HTML5, CSS3, Bootstrap, JavaScript/jQuery, PHP, MySQL, AJAX, gestion BD",
  },
] as const;
