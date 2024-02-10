---
pubDate: May 23 2020
title: "A Stable Modular ABI for Rust"
audience: "people interested in programming language design"
tags:
  - Programming
---

Before _Swift Evolution_, I had no idea what an
[ABI](https://en.wikipedia.org/wiki/Application_binary_interface) was. Today,
even though I still get lost when it comes to the minutiae, I can at least
follow along threads like [this
one](https://internals.rust-lang.org/t/a-stable-modular-abi-for-rust/12347)
without feeling too uncomfortable.

It’s also eye-opening to see how different communities and companies prioritize
different aspects of a programming language. Rust got `async`/`await` since
version 1.39.0, released last November, but they have yet to stabilize the <abbr
title="Application binary interface">ABI</abbr>. Apple went about it the other
way around with Swift, given the importance of <abbr title="Application binary
interface">ABI</abbr> stability for their platforms.

> A stable <abbr title="Application binary interface">ABI</abbr> would allow
> Rust libraries to be loaded by other languages (such as Swift), and would
> allow Rust to interop with libraries defined in other programming languages.
> […] However, a stable <abbr title="Application binary interface">ABI</abbr> is
> not all peaches and roses. Having to standardize the memory layout of data can
> limit the number of optimizations the compiler can perform.
>
> A modularized <abbr title="Application binary interface">ABI</abbr> would be
> optional while compiling. This modular <abbr title="Application binary
> interface">ABI</abbr> could be published as a versioned crate. If the <abbr
> title="Application binary interface">ABI</abbr> ever needs a
> backward-compatibility breaking change, the change could be made within
> Semver. Alternatively, a new <abbr title="Application binary
> interface">ABI</abbr>-compliant compiler backend could be developed, or the
> current compiler backend could be extended to support an <abbr
> title="Application binary interface">ABI</abbr> feature flag that would toggle
> <abbr title="Application binary interface">ABI</abbr> compliant builds.
