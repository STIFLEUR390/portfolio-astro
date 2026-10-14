import { d as createComponent, f as __exportAll, t as $$BaseLayout } from "./BaseLayout_DTBMdX30.mjs";
import { a as renderComponent, f as renderTemplate, p as maybeRenderHead } from "./server_CJG2v792.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Page introuvable" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center"><p class="text-7xl font-bold text-primary/20">404</p><h1 class="mt-4 text-2xl font-semibold">Page introuvable</h1><p class="mt-2 max-w-sm text-muted-foreground">La page que vous cherchez n'existe pas ou a ete deplacee.</p><a href="/" class="mt-8 inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">Retour a l'accueil</a></section>` })}`;
}, "/workspace/portfolio-astro/src/pages/404.astro", void 0);
var $$file = "/workspace/portfolio-astro/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
