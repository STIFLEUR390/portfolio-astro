import { F as InvalidComponentArgs, Q as AstroError, a as renderComponent, f as renderTemplate, g as createRenderInstruction, h as addAttribute, l as renderSlot, m as renderHead, p as maybeRenderHead, w as createAstro } from "./server_CJG2v792.mjs";
import { defineComponent, mergeProps, onMounted, onUnmounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Moon, Sparkles, Sun } from "@lucide/vue";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/astro/dist/runtime/server/astro-component.js
function validateArgs(args) {
	if (args.length !== 3) return false;
	if (!args[0] || typeof args[0] !== "object") return false;
	return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
	const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
	const fn = (...args) => {
		if (!validateArgs(args)) throw new AstroError({
			...InvalidComponentArgs,
			message: InvalidComponentArgs.message(name)
		});
		return cb(...args);
	};
	Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	fn.isAstroComponentFactory = true;
	fn.moduleId = moduleId;
	fn.propagation = propagation;
	return fn;
}
function createComponentWithOptions(opts) {
	return baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
}
function createComponent(arg1, moduleId, propagation) {
	if (typeof arg1 === "function") return baseCreateComponent(arg1, moduleId, propagation);
	else return createComponentWithOptions(arg1);
}
//#endregion
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region src/components/interactive/DarkModeToggle.vue
var _sfc_main$1 = /*@__PURE__*/ defineComponent({
	__name: "DarkModeToggle",
	setup(__props, { expose: __expose }) {
		__expose();
		const isDark = ref(false);
		let observer = null;
		onMounted(() => {
			const stored = localStorage.getItem("theme");
			isDark.value = stored === "dark" || !stored && window.matchMedia("(prefers-color-scheme: dark)").matches;
			observer = new MutationObserver(() => {
				isDark.value = document.documentElement.classList.contains("dark");
			});
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["class"]
			});
		});
		onUnmounted(() => {
			observer?.disconnect();
			observer = null;
		});
		function toggle() {
			const next = !isDark.value;
			document.documentElement.classList.toggle("dark", next);
			localStorage.setItem("theme", next ? "dark" : "light");
		}
		const __returned__ = {
			isDark,
			get observer() {
				return observer;
			},
			set observer(v) {
				observer = v;
			},
			toggle,
			get Sun() {
				return Sun;
			},
			get Moon() {
				return Moon;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<button${ssrRenderAttrs(mergeProps({
		class: "relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
		"aria-label": $setup.isDark ? "Passer en mode clair" : "Passer en mode sombre"
	}, _attrs))}>`);
	if ($setup.isDark) _push(ssrRenderComponent($setup["Sun"], { class: "h-4 w-4" }, null, _parent));
	else _push(ssrRenderComponent($setup["Moon"], { class: "h-4 w-4" }, null, _parent));
	_push(`</button>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/interactive/DarkModeToggle.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var DarkModeToggle_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region src/data/portfolio.ts
var site = {
	title: "Tamto Tamko Franck Herold",
	description: "Développeur FullStack - Laravel, Nuxt/Vue, API REST. Freelance à Douala, Cameroun, disponible remote.",
	url: "https://portfolio.aplix.nl",
	author: "Tamto Tamko Franck Herold",
	email: "heroldtamko39@gmail.com",
	phone: "+237 697626397",
	location: "Douala, Cameroun"
};
var images = {
	og: "https://storage.applix.fr/hermes/uploads/portfolio/og-card.webp",
	hero: "https://storage.applix.fr/hermes/uploads/portfolio/hero.webp",
	profile: {
		small: "/profile-400.webp",
		large: "/profile-800.webp",
		fallback: "/profile-400.png"
	},
	projects: {
		"Réussir TCF": "https://storage.applix.fr/hermes/uploads/portfolio/project-reussir-tcf.webp",
		"KwikTalk": "https://storage.applix.fr/hermes/uploads/portfolio/project-kwiktalk.webp"
	}
};
var socials = [{
	label: "GitHub",
	url: "https://github.com/STIFLEUR390",
	icon: "github"
}, {
	label: "Email",
	url: `mailto:${site.email}`,
	icon: "mail"
}];
var projects = [
	{
		name: "Réussir TCF",
		description: "Plate-forme SaaS de préparation au TCF Canada. Gestion utilisateurs, abonnements payants, quiz interactifs, suivi de performance, contenu dynamique.",
		stack: [
			"Laravel",
			"Vue.js",
			"MySQL",
			"Stripe"
		],
		url: "https://reussir-tcf.com",
		status: "En ligne",
		featured: true,
		cover: images.projects["Réussir TCF"]
	},
	{
		name: "KwikTalk",
		description: "Plate-forme SaaS marketing WhatsApp. Campagnes automatisées, gestion de conversations, analyse de données, IA conversationnelle, multi-comptes.",
		stack: [
			"Laravel",
			"Vue.js",
			"WhatsApp API",
			"AI"
		],
		url: "https://kwiktalk.aplix.nl",
		status: "En ligne",
		featured: true,
		cover: images.projects["KwikTalk"]
	},
	{
		name: "ETECH KEYS",
		description: "Site web officiel. SMS, WhatsApp Business API, USSD et solutions cloud au Cameroun. Tech Provider Meta WhatsApp Officiel.",
		stack: [
			"Vue.js",
			"TypeScript",
			"Tailwind CSS",
			"WhatsApp API"
		],
		url: "https://etech-keys.com",
		status: "En ligne",
		featured: false,
		repo: "https://github.com/STIFLEUR390/etech-website"
	},
	{
		name: "MboaCaisse",
		description: "Application de gestion pour bar, restaurant et épicerie. Fonctionne en LAN local, sans internet obligatoire. POS offline-first.",
		stack: [
			"Tauri 2",
			"Rust",
			"Axum",
			"SQLite",
			"Nuxt 4"
		],
		status: "En développement",
		featured: true,
		repo: "https://github.com/STIFLEUR390/MboaCaisse"
	},
	{
		name: "Laralink",
		description: "Outil desktop pour gérer et lancer vos projets Laravel locaux sur votre réseau local. URL + QR code. Dev tool.",
		stack: [
			"Tauri 2",
			"Nuxt 4",
			"Laravel",
			"SQLite"
		],
		status: "Open source",
		featured: false,
		repo: "https://github.com/STIFLEUR390/laralink"
	},
	{
		name: "S3 Policies Generator",
		description: "Générateur de politiques S3/RustFS. Terraform, CloudFormation, guardrails, validator. PWA open source.",
		stack: [
			"Vue.js",
			"Terraform",
			"CloudFormation",
			"PWA"
		],
		url: "https://s3-policies-generator.vercel.app",
		status: "Open source",
		featured: false,
		repo: "https://github.com/STIFLEUR390/s3-policies-generator"
	}
];
var skills = {
	"Langages & Frameworks": [
		"Laravel",
		"PHP",
		"Nuxt / Vue.js",
		"JavaScript",
		"TypeScript",
		"HTML5",
		"CSS3"
	],
	"API & Backend": [
		"API REST",
		"GraphQL",
		"MySQL / MariaDB",
		"SQLite",
		"USSD",
		"Mobile Money (MTN)"
	],
	Frontend: [
		"Tailwind CSS",
		"Bootstrap",
		"Bulma",
		"Responsive Design"
	],
	"Outils & DevOps": [
		"Git",
		"Docker",
		"Linux",
		"CI/CD"
	],
	"Desktop & Systems": [
		"Rust",
		"Tauri 2",
		"Axum",
		"SQLite"
	]
};
var experiences = [{
	role: "Développeur Web",
	company: "ETECH KEYS",
	location: "Douala, Cameroun",
	period: "Juil 2019 - Aujourd'hui",
	description: "Développement d'applications web full-stack pour des clients du secteur bancaire, télécom et éducation.",
	highlights: [
		"Applications USSD + API Mobile Money MTN *039#",
		"API REST de suivi client et gestion commerciale",
		"Plateforme de vente d'assurance via banques (validation par assureur)",
		"Site e-commerce",
		"SaaS de gestion scolaire"
	]
}, {
	role: "Stagiaire Développeur Web",
	company: "ETECH KEYS",
	location: "Douala, Cameroun",
	period: "2018 - 2019",
	description: "Fondamentaux du développement web : HTML, CSS, PHP, MySQL.",
	highlights: ["Site vitrine pour entreprise de matériaux"]
}];
var services = [
	{
		title: "Développement Web Full-Stack",
		description: "Applications web sur mesure avec Laravel (backend) et Vue.js/Nuxt (frontend).",
		features: [
			"Sites vitrines et e-commerce",
			"SaaS et applications métier",
			"Tableaux de bord et backoffices",
			"Responsive design, accessible"
		]
	},
	{
		title: "API REST & Intégrations",
		description: "Conception et développement d'API REST robustes, connectées à vos systèmes existants.",
		features: [
			"API REST / GraphQL",
			"Intégrations tierces (paiement, SMS, email)",
			"Webhooks et automatisations",
			"Documentation Swagger/OpenAPI"
		]
	},
	{
		title: "Mobile Money & USSD",
		description: "Intégration des solutions de paiement mobile et USSD pour le marché camerounais et africain.",
		features: [
			"API Mobile Money MTN *039#",
			"Services USSD interactifs",
			"Paiements en ligne sécurisés",
			"Adapté aux contraintes locales (offline, feature phones)"
		]
	},
	{
		title: "DevOps & Maintenance",
		description: "Mise en production, déploiement continu et maintenance d'applications existantes.",
		features: [
			"Déploiement Docker / CI/CD",
			"Mise en production Nginx / VPS",
			"Monitoring et optimisation",
			"Refactoring et montées de version"
		]
	}
];
var bio = {
	intro: "Développeur full-stack basé à Douala, Cameroun. Je construis des applications web robustes et performantes depuis 2018, avec un focus sur Laravel et Vue.js.",
	approach: "Je travaille principalement avec des PME et startups qui ont besoin d'outils sur mesure : plateformes SaaS, API d'intégration, solutions de paiement mobile. Mon objectif : livrer des produits fonctionnels, maintenables et adaptés au contexte local.",
	values: [
		"Code propre et maintenable",
		"Communication transparente",
		"Respect des délais",
		"Solutions adaptées au contexte africain"
	],
	availability: "Freelance disponible · Remote ou Douala"
};
var certifications = [{
	name: "Développement Web Full Stack",
	issuer: "Udemy",
	date: "Février 2023",
	topics: "HTML5, CSS3, Bootstrap, JavaScript/jQuery, PHP, MySQL, AJAX, gestion BD"
}];
//#endregion
//#region src/components/base/Header.astro
createAstro("https://portfolio.aplix.nl");
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const navLinks = [
		{
			label: "Accueil",
			href: "/"
		},
		{
			label: "Projets",
			href: "/projets"
		},
		{
			label: "Blog",
			href: "/blog"
		},
		{
			label: "Services",
			href: "/services"
		},
		{
			label: "Contact",
			href: "/contact"
		}
	];
	const currentPath = Astro.url.pathname;
	return renderTemplate`${maybeRenderHead($$result)}<header class="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"><div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"><!-- Logo / Name --><a href="/" class="text-sm font-bold tracking-tight hover:text-primary transition-colors duration-200">${site.author.split(" ").slice(-1)[0]}</a><!-- Desktop nav --><nav class="hidden items-center gap-1 md:flex" aria-label="Navigation principale">${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(["rounded-lg px-3.5 py-2 text-sm transition-all duration-200 hover:bg-accent", currentPath === link.href || link.href !== "/" && currentPath.startsWith(link.href) ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"], "class:list")}>${link.label}</a>`)}<div class="ml-3 pl-3 border-l border-border/50">${renderComponent($$result, "DarkModeToggle", DarkModeToggle_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/workspace/portfolio-astro/src/components/interactive/DarkModeToggle.vue",
		"client:component-export": "default"
	})}</div></nav><!-- Mobile: dark mode + hamburger --><div class="flex items-center gap-2 md:hidden">${renderComponent($$result, "DarkModeToggle", DarkModeToggle_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/workspace/portfolio-astro/src/components/interactive/DarkModeToggle.vue",
		"client:component-export": "default"
	})}<button id="mobile-menu-btn" class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background text-foreground transition-colors duration-200 hover:bg-accent" aria-label="Ouvrir le menu" aria-expanded="false"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div></div><!-- Mobile nav panel --><nav id="mobile-menu" class="hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-5 pb-4 pt-2 md:hidden" aria-label="Navigation principale">${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(["block rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-accent", currentPath === link.href || link.href !== "/" && currentPath.startsWith(link.href) ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"], "class:list")}>${link.label}</a>`)}</nav></header>${renderScript($$result, "/workspace/portfolio-astro/src/components/base/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/workspace/portfolio-astro/src/components/base/Header.astro", void 0);
//#endregion
//#region src/components/interactive/FxToggle.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "FxToggle",
	setup(__props, { expose: __expose }) {
		__expose();
		const enabled = ref(false);
		const achievements = ref(0);
		function refreshCount() {
			try {
				const list = JSON.parse(localStorage.getItem("fx-achievements") || "[]");
				achievements.value = Array.isArray(list) ? list.length : 0;
			} catch {
				achievements.value = 0;
			}
		}
		function toggle() {
			const next = !enabled.value;
			enabled.value = next;
			localStorage.setItem("fx", next ? "1" : "0");
			document.documentElement.classList.toggle("fx-enabled", next);
			window.dispatchEvent(new CustomEvent("fx:change", { detail: next }));
		}
		onMounted(() => {
			enabled.value = document.documentElement.classList.contains("fx-enabled");
			refreshCount();
			window.addEventListener("fx:achievements", refreshCount);
		});
		onUnmounted(() => {
			window.removeEventListener("fx:achievements", refreshCount);
		});
		const __returned__ = {
			enabled,
			achievements,
			refreshCount,
			toggle,
			get Sparkles() {
				return Sparkles;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<button${ssrRenderAttrs(mergeProps({
		"aria-pressed": $setup.enabled,
		"aria-label": $setup.enabled ? "Désactiver les effets animés" : "Activer les effets animés",
		title: $setup.enabled ? "Désactiver les effets animés" : "Activer les effets animés",
		class: ["fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:scale-105 active:scale-95", $setup.enabled ? "border-primary bg-primary text-primary-foreground shadow-primary/30" : "border-border/60 bg-card/90 text-foreground backdrop-blur"]
	}, _attrs))}>`);
	_push(ssrRenderComponent($setup["Sparkles"], { class: ["h-5 w-5", $setup.enabled ? "animate-pulse" : "opacity-60"] }, null, _parent));
	if ($setup.achievements > 0) _push(`<span class="absolute -left-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-semibold text-secondary-foreground" aria-hidden="true">${ssrInterpolate($setup.achievements)}</span>`);
	else _push(`<!---->`);
	_push(`</button>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/interactive/FxToggle.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var FxToggle_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/components/base/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="mt-24 border-t border-border/50"><div class="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><div class="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4"><!-- Brand --><div class="lg:col-span-2"><a href="/" class="text-base font-bold tracking-tight hover:text-primary transition-colors duration-200">${site.author}</a><p class="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">${site.description}</p><div class="mt-5 flex items-center gap-3">${socials.map((s) => renderTemplate`<a${addAttribute(s.url, "href")}${addAttribute(s.url.startsWith("http") ? "_blank" : void 0, "target")}${addAttribute(s.url.startsWith("http") ? "noopener noreferrer" : void 0, "rel")} class="inline-flex h-8 items-center rounded-lg border border-border/50 px-3 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-foreground">${s.label}</a>`)}</div></div><!-- Navigation --><div><p class="mb-4 text-sm font-medium">Navigation</p><ul class="space-y-2">${[
		{
			label: "Accueil",
			href: "/"
		},
		{
			label: "Projets",
			href: "/projets"
		},
		{
			label: "Blog",
			href: "/blog"
		},
		{
			label: "Services",
			href: "/services"
		},
		{
			label: "Contact",
			href: "/contact"
		}
	].map((link) => renderTemplate`<li><a${addAttribute(link.href, "href")} class="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">${link.label}</a></li>`)}</ul></div><!-- Contact --><div><p class="mb-4 text-sm font-medium">Contact</p><ul class="space-y-2 text-sm text-muted-foreground"><li><a${addAttribute(`mailto:${site.email}`, "href")} class="transition-colors duration-200 hover:text-foreground">${site.email}</a></li><li><a${addAttribute(`tel:${site.phone}`, "href")} class="transition-colors duration-200 hover:text-foreground">${site.phone}</a></li><li>${site.location}</li></ul></div></div><!-- Bottom bar --><div class="flex flex-col items-center justify-between gap-3 border-t border-border/50 py-6 sm:flex-row"><p class="text-xs text-muted-foreground">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ${site.author}. Tous droits reserves.</p><p class="text-xs text-muted-foreground">${site.location}</p></div></div></footer>`;
}, "/workspace/portfolio-astro/src/components/base/Footer.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://portfolio.aplix.nl");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title, description } = Astro.props;
	const pageTitle = title ? `${title} - ${site.author}` : `${site.author} - Developpeur FullStack`;
	const pageDescription = description ?? site.description;
	return renderTemplate`<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(pageDescription, "content")}><meta name="author"${addAttribute(site.author, "content")}><!-- Open Graph --><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(pageDescription, "content")}><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro.url.href, "content")}><meta property="og:image"${addAttribute(images.og, "content")}><meta property="og:image:width" content="2048"><meta property="og:image:height" content="1152"><meta property="og:image:type" content="image/webp"><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(pageDescription, "content")}><meta name="twitter:image"${addAttribute(images.og, "content")}><!-- Canonical --><link rel="canonical"${addAttribute(`${site.url}${Astro.url.pathname}`, "href")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${pageTitle}</title><!-- Dark mode: prevent flash --><script>
      (function () {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark)) {
          document.documentElement.classList.add('dark');
        }

        // Effets animés : état posé avant paint (pas de flash), OFF par
        // défaut si l'utilisateur préfère les animations réduites.
        const fx = localStorage.getItem('fx');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (fx === '1' || (fx === null && !reduced)) {
          document.documentElement.classList.add('fx-enabled');
        }
      })();
    <\/script>${renderHead($$result)}</head><body class="min-h-dvh bg-background text-foreground antialiased">${renderComponent($$result, "Header", $$Header, {})}<main class="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}${renderComponent($$result, "FxToggle", FxToggle_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/workspace/portfolio-astro/src/components/interactive/FxToggle.vue",
		"client:component-export": "default"
	})}${renderScript($$result, "/workspace/portfolio-astro/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}${renderScript($$result, "/workspace/portfolio-astro/src/layouts/BaseLayout.astro?astro&type=script&index=1&lang.ts")}</body></html>`;
}, "/workspace/portfolio-astro/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { images as a, site as c, createComponent as d, __exportAll as f, experiences as i, skills as l, bio as n, projects as o, certifications as r, services as s, $$BaseLayout as t, socials as u };
