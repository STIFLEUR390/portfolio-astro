import { d as createComponent, f as __exportAll, o as projects, t as $$BaseLayout } from "./BaseLayout_DTBMdX30.mjs";
import { a as renderComponent, f as renderTemplate, h as addAttribute, p as maybeRenderHead } from "./server_CJG2v792.mjs";
//#region src/pages/projets.astro
var projets_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Projets,
	file: () => $$file,
	url: () => $$url
});
var $$Projets = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Projets" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="py-20"><div class="reveal"><h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Projets</h1><p class="mt-3 max-w-xl text-muted-foreground">Selection de projets professionnels et personnels.</p></div><div class="reveal reveal-delay-1 mt-12 grid gap-6 sm:grid-cols-2">${projects.map((project) => renderTemplate`<article class="group card-hover overflow-hidden rounded-xl border border-border/50 bg-card">${project.cover && renderTemplate`<div class="aspect-[16/10] overflow-hidden"><img${addAttribute(project.cover, "src")}${addAttribute(`Apercu de ${project.name}`, "alt")} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"></div>`}<div class="p-6"><div class="mb-3 flex items-center justify-between"><h2 class="font-semibold">${project.name}</h2><span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">${project.status}</span></div><p class="text-sm leading-relaxed text-muted-foreground">${project.description}</p><div class="mt-4 flex flex-wrap gap-1.5">${project.stack.map((tech) => renderTemplate`<span class="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">${tech}</span>`)}</div><div class="mt-5 flex gap-3">${project.url && renderTemplate`<a${addAttribute(project.url, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]">Voir le site<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"></path></svg></a>`}${project.repo && renderTemplate`<a${addAttribute(project.repo, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border/60 px-3.5 text-xs font-medium transition-all duration-200 hover:bg-accent active:scale-[0.98]">Code source<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"></path></svg></a>`}</div></div></article>`)}</div></section>` })}`;
}, "/workspace/portfolio-astro/src/pages/projets.astro", void 0);
var $$file = "/workspace/portfolio-astro/src/pages/projets.astro";
var $$url = "/projets";
//#endregion
//#region \0virtual:astro:page:src/pages/projets@_@astro
var page = () => projets_exports;
//#endregion
export { page };
