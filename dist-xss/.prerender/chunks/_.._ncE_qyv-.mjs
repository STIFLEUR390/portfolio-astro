import { d as createComponent, f as __exportAll, t as $$BaseLayout } from "./BaseLayout_DTBMdX30.mjs";
import { S as unescapeHTML, a as renderComponent, f as renderTemplate, h as addAttribute, o as Fragment, p as maybeRenderHead, w as createAstro } from "./server_CJG2v792.mjs";
import { t as getAllPosts } from "./ghost_B9KTWUja.mjs";
//#region src/pages/blog/[...slug].astro
var ____slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Component,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://portfolio.aplix.nl");
async function getStaticPaths() {
	const PAGE_SIZE = 6;
	const allPosts = await getAllPosts();
	const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);
	const paths = [];
	paths.push({
		params: { slug: void 0 },
		props: {
			type: "listing",
			posts: allPosts.slice(0, PAGE_SIZE),
			currentPage: 1,
			totalPages
		}
	});
	for (let i = 2; i <= totalPages; i++) paths.push({
		params: { slug: String(i) },
		props: {
			type: "listing",
			posts: allPosts.slice((i - 1) * PAGE_SIZE, i * PAGE_SIZE),
			currentPage: i,
			totalPages
		}
	});
	for (let i = 0; i < allPosts.length; i++) {
		const post = allPosts[i];
		const older = i < allPosts.length - 1 ? allPosts[i + 1] : null;
		const newer = i > 0 ? allPosts[i - 1] : null;
		paths.push({
			params: { slug: post.slug },
			props: {
				type: "article",
				post,
				prevPost: older ? {
					slug: older.slug,
					title: older.title
				} : null,
				nextPost: newer ? {
					slug: newer.slug,
					title: newer.title
				} : null
			}
		});
	}
	return paths;
}
var $$Component = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Component;
	const { slug } = Astro.props;
	const type = Astro.props.type;
	return renderTemplate`${type === "listing" ? renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": Astro.props.currentPage > 1 ? `Blog - Page ${Astro.props.currentPage}` : "Blog" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="py-20"><div class="reveal"><h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1><p class="mt-3 max-w-xl text-muted-foreground">Articles techniques sur Laravel, Vue.js, DevOps et veille.</p></div><div class="reveal reveal-delay-1 mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${Astro.props.posts.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="group card-hover block overflow-hidden rounded-xl border border-border/50 bg-card">${post.feature_image && renderTemplate`<div class="aspect-[16/9] overflow-hidden"><img${addAttribute(post.feature_image, "src")}${addAttribute(post.feature_image_alt || post.title, "alt")} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"></div>`}<div class="p-5"><div class="flex items-center gap-2 text-xs text-muted-foreground"><time${addAttribute(post.published_at, "datetime")}>${new Date(post.published_at).toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric"
	})}</time>${post.reading_time && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span>&middot;</span><span>${post.reading_time} min de lecture</span>` })}`}</div><h2 class="mt-2 font-semibold transition-colors duration-200 group-hover:text-primary">${post.title}</h2>${post.custom_excerpt && renderTemplate`<p class="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">${post.custom_excerpt}</p>`}${post.tags?.length > 0 && renderTemplate`<div class="mt-3 flex flex-wrap gap-1.5">${post.tags.map((tag) => renderTemplate`<span class="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">${tag.name}</span>`)}</div>`}</div></a>`)}</div>${Astro.props.posts.length === 0 && renderTemplate`<p class="mt-12 text-center text-muted-foreground">Aucun article pour le moment.</p>`}<nav class="mt-12 flex items-center justify-between border-t border-border/50 pt-6">${Astro.props.currentPage > 2 ? renderTemplate`<a${addAttribute(`/blog/${Astro.props.currentPage - 1}`, "href")} class="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent active:scale-[0.98]"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>Precedent</a>` : Astro.props.currentPage === 2 ? renderTemplate`<a href="/blog" class="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent active:scale-[0.98]"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>Precedent</a>` : renderTemplate`<div></div>`}<span class="text-sm text-muted-foreground">Page ${Astro.props.currentPage} / ${Astro.props.totalPages}</span>${Astro.props.currentPage < Astro.props.totalPages ? renderTemplate`<a${addAttribute(`/blog/${Astro.props.currentPage + 1}`, "href")} class="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent active:scale-[0.98]">Suivant<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a>` : renderTemplate`<div></div>`}</nav></section>` })}` : renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": Astro.props.post.title,
		"description": Astro.props.post.custom_excerpt ?? Astro.props.post.excerpt
	}, { "default": ($$result) => renderTemplate`<article class="py-20"><!-- Back link --><a href="/blog" class="reveal mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>Retour au blog</a><!-- Feature image -->${Astro.props.post.feature_image && renderTemplate`<div class="reveal mb-8 aspect-[16/9] overflow-hidden rounded-xl border border-border/50"><img${addAttribute(Astro.props.post.feature_image, "src")}${addAttribute(Astro.props.post.feature_image_alt || Astro.props.post.title, "alt")} class="h-full w-full object-cover">${Astro.props.post.feature_image_caption && renderTemplate`<p class="mt-2 text-center text-xs text-muted-foreground italic">${Astro.props.post.feature_image_caption}</p>`}</div>`}<!-- Header --><header class="reveal mb-10"><div class="flex items-center gap-2 text-xs text-muted-foreground"><time${addAttribute(Astro.props.post.published_at, "datetime")}>${new Date(Astro.props.post.published_at).toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric"
	})}</time>${Astro.props.post.reading_time && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span>&middot;</span><span>${Astro.props.post.reading_time} min de lecture</span>` })}`}</div><h1 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">${Astro.props.post.title}</h1>${Astro.props.post.tags?.length > 0 && renderTemplate`<div class="mt-4 flex flex-wrap gap-2">${Astro.props.post.tags.map((tag) => renderTemplate`<span class="rounded-full border border-border/50 bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">${tag.name}</span>`)}</div>`}</header><!-- Content --><div class="reveal reveal-delay-1 prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-heading prose-headings:tracking-tight
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-code:before:content-none prose-code:after:content-none
        prose-pre:border prose-pre:border-border/50
        prose-img:rounded-lg prose-img:border prose-img:border-border/50">${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(Astro.props.post.html)}` })}</div><!-- Author -->${Astro.props.post.authors?.length > 0 && renderTemplate`<footer class="reveal mt-12 border-t border-border/50 pt-6"><div class="flex items-center gap-3">${Astro.props.post.authors[0].profile_image && renderTemplate`<img${addAttribute(Astro.props.post.authors[0].profile_image, "src")}${addAttribute(Astro.props.post.authors[0].name, "alt")} class="h-10 w-10 rounded-full object-cover">`}<div><p class="text-sm font-medium">${Astro.props.post.authors[0].name}</p><p class="text-xs text-muted-foreground">${Astro.props.post.authors[0].bio}</p></div></div></footer>`}${(Astro.props.prevPost || Astro.props.nextPost) && renderTemplate`<nav class="reveal mt-12 grid grid-cols-1 gap-4 border-t border-border/50 pt-8 sm:grid-cols-2">${Astro.props.prevPost ? renderTemplate`<a${addAttribute(`/blog/${Astro.props.prevPost.slug}`, "href")} class="group card-hover rounded-xl border border-border/50 bg-card p-5"><span class="inline-flex items-center gap-1 text-xs text-muted-foreground"><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> Article precedent</span><p class="mt-1.5 text-sm font-medium transition-colors duration-200 group-hover:text-primary">${Astro.props.prevPost.title}</p></a>` : renderTemplate`<div></div>`}${Astro.props.nextPost ? renderTemplate`<a${addAttribute(`/blog/${Astro.props.nextPost.slug}`, "href")} class="group card-hover rounded-xl border border-border/50 bg-card p-5 text-right"><span class="inline-flex items-center gap-1 text-xs text-muted-foreground">Article suivant <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></span><p class="mt-1.5 text-sm font-medium transition-colors duration-200 group-hover:text-primary">${Astro.props.nextPost.title}</p></a>` : renderTemplate`<div></div>`}</nav>`}</article>` })}`}`;
}, "/workspace/portfolio-astro/src/pages/blog/[...slug].astro", void 0);
var $$file = "/workspace/portfolio-astro/src/pages/blog/[...slug].astro";
var $$url = "/blog/[...slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/[...slug]@_@astro
var page = () => ____slug__exports;
//#endregion
export { page };
