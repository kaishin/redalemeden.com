/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// CSS-only package: TypeScript 6 rejects side-effect imports that resolve to no
// types, so declare the module so the stylesheet import in BaseLayout checks.
declare module "@fontsource-variable/inter";
