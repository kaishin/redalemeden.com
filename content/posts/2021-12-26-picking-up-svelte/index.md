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

Last week I spent some of my time off learning [Svelte](https://svelte.dev), a relatively new Web framework (2016) with an increased focus on developer experience and performance. Most notably, Svelte does away with the virtual DOM approach popularized by *React.js*, opting instead to transform your application logic during build time into vanilla JavaScript that directly manipulates the DOM as a reaction to state changes. This results in production code that is free from client-side dependencies and has a smaller resource footprint.

More importantly, [SvelteKit](https://kit.svelte.dev/docs)—the official Svelte application framework currently in Beta—supports all kinds of rendering ~~acronyms~~ approaches, and in any combination within the same app: _server-side rendering_ (SSR), _static site generation_ (SSG), and _client-side rendering_ (CSR).

At the time of this writing, my aim is to evaluate Svelte as a pure static site generator. [My dissatisfaction with Gatsby](https://redalemeden.com/microblog/post-1627249229000) has led me to consider cooking up a homemade solution in Swift, but as alluring as it sounds, I gave up on the idea as soon as I started listing all the features I need to support. I also briefly considered [Eleventy](https://www.11ty.dev), [Next.js](https://nextjs.org), [Hugo](https://gohugo.io), and [Gridsome](https://gridsome.org), but none made the right mix of compromises for my taste, nor allowed configuration to address those. So I turned to Svelte as a new episode in my SSG escapades, and I'm hoping it’s the last one in a little while!

So to kick things off, I started with the [official guide](https://kit.svelte.dev/docs#introduction-getting-started), but soon realized it's assuming an SSR or CSR workflow. I then skimmed the [SSG](https://kit.svelte.dev/docs#appendix-ssg) and [Static sites](https://kit.svelte.dev/docs#adapters-supported-environments-static-sites) sections before hopping to the [adapters](https://kit.svelte.dev/docs#adapters) guide to learn more about `adapter-static`. It was a pleasant surprise to learn that both [_routing_](https://kit.svelte.dev/docs#ssr-and-javascript-router) and [_hydration_](https://kit.svelte.dev/docs#ssr-and-javascript-hydrate) are optional and can be turned off, effectively removing all JS from the final output; a basic amenity the Gatsby team [refuses](https://github.com/gatsbyjs/gatsby/issues/962#issuecomment-301392995) to provide, leaving developers no choice but to come up with [all sorts of hacks](https://ricard.dev/how-to-remove-client-side-javascript-from-gatsby/). Better yet, Svelte allows for these decisions to be made on a per-page basis, giving the developer full control over where and when to use these features.

After this brief documentation survey, I felt like it’s time to get my feet wet. I started by generating a blank app using the command borrowed from the [Getting Started](https://kit.svelte.dev/docs#introduction-getting-started) section:

```sh
pnpm init svelte@next my-app
```

Note that I am using `pnpm` instead of `npm` and you can read more about the motivation [here](https://pnpm.io/motivation). I encountered issues here and there with _pnpm_ when I used it with React and Gatsby, but I am more than willing to give it another go with Svelte as part of this evaluation.

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

After making these changes, I ran `pnpm run build` and checked the `build/index.html` file to ensure that it doesn’t import any JavaScript, which it didn’t. My HTML looked like this—omitting the `head` and the top `div`:

```html
<main class="svelte-g04a0w"><div class="container svelte-g04a0w"><h1 class="svelte-g04a0w">Homepage</h1>
    <hr class="svelte-g04a0w">
    <p class="svelte-g04a0w">This is my new SvelteKit app.</p></div>
</main>
```

If you’re like me, the `svelte-g04a0w` would have certainly grabbed your attention. It’s there to ensure the CSS included in `index.svelte` stays scoped to this page/component.

```html
<style>
  main {
    font-family: sans-serif;
  }
</style>
```

Removing this `style` block and re-running `pnpm run build` gets rid of these scope classes in the final output. Also starting with Svelte _v3.34.0_ it looks like you can modify their structure though the `cssHash` [svelte.compile option](https://svelte.dev/docs#compile-time-svelte-compile) if you still want to use component-scoped CSS.

I spent another 10 minutes following [the tutorial](https://svelte.dev/tutorial/basics), but stopped half way since I am not particularly interested in state or props at this stage.

And this about wraps up my first foray into Svelte. This brief experience has left me with a very good impression, and I can hopefully share some more about it in the coming weeks!
