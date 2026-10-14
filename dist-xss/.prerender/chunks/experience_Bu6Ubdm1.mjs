import { d as createComponent, f as __exportAll, i as experiences, r as certifications, t as $$BaseLayout } from "./BaseLayout_DTBMdX30.mjs";
import { a as renderComponent, f as renderTemplate, p as maybeRenderHead } from "./server_CJG2v792.mjs";
//#region src/pages/experience.astro
var experience_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Experience,
	file: () => $$file,
	url: () => $$url
});
var $$Experience = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Experience" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="py-20"><div class="reveal"><h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Experience</h1><p class="mt-3 max-w-xl text-muted-foreground">Parcours professionnel et formations.</p></div><!-- Experience pro --><div class="reveal reveal-delay-1 mt-12"><h2 class="mb-8 text-lg font-semibold">Parcours professionnel</h2><div class="relative space-y-10 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border/50">${experiences.map((exp) => renderTemplate`<div class="relative pl-8"><div class="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-primary bg-background"></div><div class="flex flex-wrap items-baseline gap-x-3 gap-y-1"><h3 class="font-semibold">${exp.role}</h3><span class="text-sm text-muted-foreground">${exp.company} &middot; ${exp.location}</span></div><p class="mt-1 text-xs font-medium text-primary">${exp.period}</p><p class="mt-2 text-sm text-muted-foreground">${exp.description}</p>${exp.highlights.length > 0 && renderTemplate`<ul class="mt-3 space-y-1.5">${exp.highlights.map((h) => renderTemplate`<li class="flex items-start gap-2.5 text-sm text-muted-foreground"><span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary"></span>${h}</li>`)}</ul>`}</div>`)}</div></div><!-- Certifications --><div class="reveal mt-16"><h2 class="mb-8 text-lg font-semibold">Certifications</h2><div class="grid gap-4 sm:grid-cols-2">${certifications.map((cert) => renderTemplate`<div class="rounded-xl border border-border/50 bg-card p-5"><div class="flex flex-wrap items-baseline justify-between gap-2"><h3 class="font-semibold">${cert.name}</h3><span class="text-xs text-muted-foreground">${cert.date}</span></div><p class="mt-1 text-sm text-muted-foreground">${cert.issuer}</p><p class="mt-2 text-xs text-muted-foreground leading-relaxed">${cert.topics}</p></div>`)}</div></div></section>` })}`;
}, "/workspace/portfolio-astro/src/pages/experience.astro", void 0);
var $$file = "/workspace/portfolio-astro/src/pages/experience.astro";
var $$url = "/experience";
//#endregion
//#region \0virtual:astro:page:src/pages/experience@_@astro
var page = () => experience_exports;
//#endregion
export { page };
