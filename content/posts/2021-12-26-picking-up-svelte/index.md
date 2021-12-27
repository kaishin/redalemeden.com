---
date: 2021-12-26T16:04+01:00
title: "Picking up Svelte"
category:
audience: "Web and front-end developers or people interested in the topic"
tags:
  - Web
  - JavaScript
  - Front-end
---

Last week I spent some of my time off learning [Svelte](https://svelte.dev), a relatively new Web framework (2016) with an increased focus on developer experience and performance. Most notably, Svelte does away with the virtual DOM approach popularized by *React.js*, opting instead to transform your application logic during build time into vanilla JavaScript that directly manipulates the DOM as a reaction to state changes. This results in production code that is free from client-side dependencies and thus has a smaller resource footprint.

At the time of this writing, my aim is to evaluate Svelte as a pure static site generator. [My dissatisfaction with Gatsby](https://redalemeden.com/microblog/post-1627249229000) has left me looking for alternatives, including building my own in Swift—a daunting task, given the long list of features I need to support for this website. 

I also briefly considered [Eleventy](https://www.11ty.dev), [Next.js](https://nextjs.org), [Hugo](https://gohugo.io), and [Gridsome](https://gridsome.org), but none made the right blend of compromises for my use case, nor allowed configuration to remedy that. So I turned to Svelte in this new installment of my static site generation escapades, and I'm hoping it’s the last one in a little while!

The first good news is that [SvelteKit](https://kit.svelte.dev/docs)—the official Svelte application framework currently in Beta—supports all kinds of rendering ~~acronyms~~ approaches, and in any combination within the same app: _server-side rendering_ (SSR), _static site generation_ (SSG), and _client-side rendering_ (CSR). My thinking is that if it ends up working for my personal website, there is a high chance I will come back to it for other projects that require SSR or CSR.

## Hands-on with Svelte

So to kick things off, I started with the [official guide](https://kit.svelte.dev/docs#introduction-getting-started), but soon took note that it's quite broad and largely irrelevant for static site generation. That led me to skim the [SSG](https://kit.svelte.dev/docs#appendix-ssg) and [Static sites](https://kit.svelte.dev/docs#adapters-supported-environments-static-sites) sections before jumping to the [adapters](https://kit.svelte.dev/docs#adapters) guide to learn more about `adapter-static`. 

It was a pleasant surprise to learn that both [_routing_](https://kit.svelte.dev/docs#ssr-and-javascript-router) and [_hydration_](https://kit.svelte.dev/docs#ssr-and-javascript-hydrate) are optional and can be turned off, effectively removing all JS from the final output; a basic amenity the Gatsby team [refuses](https://github.com/gatsbyjs/gatsby/issues/962#issuecomment-301392995) to provide, leaving developers no choice but to come up with [all sorts of hacks](https://ricard.dev/how-to-remove-client-side-javascript-from-gatsby/). Better yet, Svelte allows for these decisions to be made on a per-page basis, giving the developer full control over where and when to use these features.

After this brief documentation survey, I felt like it’s time to get my feet wet. I started by generating a blank app using the command borrowed from the [Getting Started](https://kit.svelte.dev/docs#introduction-getting-started) section:

```sh
pnpm init svelte@next my-app
```

Note that I am using `pnpm` instead of `npm` (more on the motivations in [their own words](https://pnpm.io/motivation)). I encountered issues with it when used alongside React and Gatsby, but I am more than willing to give it another go with Svelte as part of this evaluation.

After choosing _blank app_ during the setup process, I ran `pnpm run dev -- --open` to preview the output and make sure everything is fine and dandy. The next logical step for this evaluation was to try the syntax for disabling both hydration and routing as mentioned earlier—and it turns out it’s rather straightforward:

```html
<!-- In index.svelte -->
<script context="module">
  export const hydrate = false;
  export const router = false;
</script>
```

I then proceeded to swap the `@sveltejs/adapter-auto` in `devDependencies` with `@sveltejs/adapter-static` then ran `pnpm install` again. I also needed to update this line in `svelte.config.js`:

```diff
- import adapter from '@sveltejs/adapter-auto';
+ import adapter from '@sveltejs/adapter-static';
```

After making these changes, I ran `pnpm run build` and checked the `build/index.html` file to ensure that it doesn’t import any JavaScript, which it didn’t. The HTML output looked like this—omitting the `head` and the top `div`:

```html
<main class="svelte-g04a0w"><div class="container svelte-g04a0w"><h1 class="svelte-g04a0w">Homepage</h1>
    <hr class="svelte-g04a0w">
    <p class="svelte-g04a0w">This is my new SvelteKit app.</p></div>
</main>
```

If you’re like me, the `svelte-g04a0w` class littering the markup would have certainly grabbed your attention. This is a common approach in modern front-end tooling to ensure that styling remains scoped to a single page-component, but I still largely prefer to work with good ol' fashioned global CSS when it comes to static websites.

```html
<!-- In index.svelte -->
<style>
  main {
    font-family: sans-serif;
  }
</style>
```

Removing this `style` block in `index.svelte` and re-running `pnpm run build` gets rid of these scope classes altogether in the final output. Also starting with Svelte _v3.34.0_ it looks like you can modify the class naming convention though the `cssHash` [svelte.compile option](https://svelte.dev/docs#compile-time-svelte-compile) if you still want to use component-scoped CSS.

After this spike, I spent another 10 minutes following [the tutorial](https://svelte.dev/tutorial/basics), before stopping half way when I realized that I'm not particularly interested in state or props at this stage.

And this about wraps up my first foray into Svelte. This brief experience has left me with a very good impression, and I will do my best to share some more about it in the coming weeks!
