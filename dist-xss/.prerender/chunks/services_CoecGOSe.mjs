import { d as createComponent, f as __exportAll, s as services, t as $$BaseLayout } from "./BaseLayout_DTBMdX30.mjs";
import { a as renderComponent, f as renderTemplate, p as maybeRenderHead } from "./server_CJG2v792.mjs";
//#region src/pages/services.astro
var services_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Services,
	file: () => $$file,
	url: () => $$url
});
var $$Services = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Services" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="py-20"><div class="reveal"><h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Services</h1><p class="mt-3 max-w-xl text-muted-foreground">Prestations de developpement web full-stack, du prototype au deploiement.</p></div><div class="reveal reveal-delay-1 mt-12 grid gap-5 sm:grid-cols-2">${services.map((service) => renderTemplate`<article class="card-hover rounded-xl border border-border/50 bg-card p-7"><h2 class="font-semibold">${service.title}</h2><p class="mt-2 text-sm leading-relaxed text-muted-foreground">${service.description}</p><ul class="mt-5 space-y-2">${service.features.map((f) => renderTemplate`<li class="flex items-start gap-2.5 text-sm text-muted-foreground"><span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary"></span>${f}</li>`)}</ul></article>`)}</div><!-- CTA --><section class="reveal mt-16 overflow-hidden rounded-2xl border border-border/50 bg-accent/50 p-10 text-center sm:p-14"><h2 class="text-2xl font-bold tracking-tight">Un projet en tete ?</h2><p class="mx-auto mt-3 max-w-md text-muted-foreground">Decrivez votre besoin et recevez un devis sous 48h.</p><a href="/contact" class="mt-6 inline-flex h-11 items-center rounded-lg bg-primary px-7 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">Demander un devis</a></section></section>` })}`;
}, "/workspace/portfolio-astro/src/pages/services.astro", void 0);
var $$file = "/workspace/portfolio-astro/src/pages/services.astro";
var $$url = "/services";
//#endregion
//#region \0virtual:astro:page:src/pages/services@_@astro
var page = () => services_exports;
//#endregion
export { page };
