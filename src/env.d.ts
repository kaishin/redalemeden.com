/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// CSS-only package: TypeScript 6 rejects side-effect imports that resolve to no
// types, so declare the module so the stylesheet import in BaseLayout checks.
declare module "@fontsource-variable/inter";

// markdown-it-footnote ships no types; its v4 default export is the standard
// markdown-it plugin shape, so declare it instead of the stale DefinitelyTyped
// package, whose types no longer line up with @types/markdown-it 14.
declare module "markdown-it-footnote" {
  import type MarkdownIt from "markdown-it";

  function footnote(md: MarkdownIt): void;
  export default footnote;
}
