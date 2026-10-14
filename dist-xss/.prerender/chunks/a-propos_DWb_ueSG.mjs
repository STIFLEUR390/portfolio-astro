import { a as images, c as site, d as createComponent, f as __exportAll, n as bio, t as $$BaseLayout } from "./BaseLayout_DTBMdX30.mjs";
import { a as renderComponent, f as renderTemplate, h as addAttribute, p as maybeRenderHead } from "./server_CJG2v792.mjs";
//#region src/pages/a-propos.astro
var a_propos_exports = /* @__PURE__ */ __exportAll({
	default: () => $$APropos,
	file: () => $$file,
	url: () => $$url
});
var $$APropos = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "A propos" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="py-20"><div class="reveal"><h1 class="text-3xl font-bold tracking-tight sm:text-4xl">A propos</h1></div><div class="mt-12 grid gap-12 lg:grid-cols-5"><!-- Bio principale --><div class="lg:col-span-3 space-y-6"><p class="reveal text-lg leading-relaxed text-muted-foreground">${bio.intro}</p><p class="reveal reveal-delay-1 leading-relaxed text-muted-foreground">${bio.approach}</p><!-- Valeurs --><div class="reveal reveal-delay-2 mt-10"><h2 class="mb-5 text-lg font-semibold">Ce qui me guide</h2><ul class="grid gap-3 sm:grid-cols-2">${bio.values.map((v) => renderTemplate`<li class="flex items-center gap-2.5 text-sm"><span class="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>${v}</li>`)}</ul></div></div><!-- Sidebar --><div class="lg:col-span-2 space-y-5"><!-- Photo --><div class="reveal overflow-hidden rounded-xl border border-border/50"><picture><source${addAttribute(images.profile.small, "srcset")} type="image/webp"><img${addAttribute(images.profile.fallback, "src")}${addAttribute(site.author, "alt")} class="h-56 w-full object-cover" width="400" height="400" loading="lazy"></picture></div><div class="reveal reveal-delay-1 rounded-xl border border-border/50 bg-card p-5 space-y-4"><div><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Localisation</p><p class="mt-1 text-sm">${site.location}</p></div><div class="border-t border-border/50 pt-4"><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p><a${addAttribute(`mailto:${site.email}`, "href")} class="mt-1 block text-sm text-primary transition-colors duration-200 hover:text-primary/80">${site.email}</a></div><div class="border-t border-border/50 pt-4"><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Disponibilite</p><p class="mt-1 text-sm">${bio.availability}</p></div></div><a href="/contact" class="reveal reveal-delay-2 flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">Me contacter</a></div></div></section>` })}`;
}, "/workspace/portfolio-astro/src/pages/a-propos.astro", void 0);
var $$file = "/workspace/portfolio-astro/src/pages/a-propos.astro";
var $$url = "/a-propos";
//#endregion
//#region \0virtual:astro:page:src/pages/a-propos@_@astro
var page = () => a_propos_exports;
//#endregion
export { page };
