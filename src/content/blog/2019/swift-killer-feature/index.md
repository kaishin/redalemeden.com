---
pubDate: Jun 18 2019
title: "Swift's Killer Feature"
tags:
  - Programming
audience: "Apple platform developers interested in Swift and its adoption in the community"
image: default.jpg
---

Since its release 5 years ago, Swift has matured a great deal as a programming
language, both in terms of stability and expressive power. Its concise syntax
and type safety have been largely celebrated within the Apple developer
community, and increasingly noticed outside of it. But, as it is the case with
similar transitions, not everything is hunky-dory.

![SwiftUI](./header-image.jpg)

In addition to the source breaking changes that soured the language earlier on,
Swift is often criticized for lacking an indisputable selling point compared to
what was there before it (Cocoa and Objective-C), and what came after it
(JavaScript cross-platform frameworks).

Unfair as it may sound, programming languages are often evaluated based on their
ecosystem, not on their intrinsic merits. In the eyes of many, Swift is
indissociable from Apple and their platform UI frameworks, for better or for
worse. The mismatch between Cocoa APIs and Swift language features has been
brought up again and again in discussions about its appeal as a replacement for
Objective-C.

Expressiveness and type safety can certainly keep a handful of enthusiastic
developers engaged, but it won’t be enough to sustain Swift’s momentum on the
long run. As much as some of us hate to admit, the competition is colossal on
the server and scripting side of things, and it’s getting uncomfortably stronger
on the native platform front.

On top of that, the *write-preview-debug* development cycle that we’ve been
dealt since the dawn of Cocoa is considered sluggish and tedious by today’s
standards. A liability that’s long overdue for reconsideration. To make matters
worse, Apple's UI frameworks haven’t converged fast enough to alleviate some of
these issues---we are still required to implement half a dozen methods for each
platform to display a plain table view.

This state of affairs has pushed many to adventure outside first-party fences in
search of more exotic alternatives, while the holdouts stuck to their ~~guns~~
bows and arrows in the absence of a clear-cut perk of leaving their
tried-and-true programming language behind[^1].

But all of this is bound to change.

During this past WWDC, Apple introduced
*[SwiftUI](https://developer.apple.com/xcode/swiftui/)*---a modern, universal
framework for building user interfaces across their platforms. And it’s *packing
quite a punch.* SwiftUI is declarative, reactive, and ready to take us places;
the killer feature that Swift *deserved* all along. Not only is it tightly
integrated with the language, but it’s also pushing it forward by providing a
use case for new additions such as [function builders](https://github.com/apple/swift-evolution/blob/9992cf3c11c2d5e0ea20bee98657d93902d5b174/proposals/XXXX-function-builders.md)
and [property wrappers](https://github.com/DougGregor/swift-evolution/blob/property-wrappers/proposals/0258-property-wrappers.md).

Even though we have barely scratched the surface of SwiftUI since its
announcement, it’s already winning the hearts of large swaths of developers,
myself included. I don't have a shred of doubt that this is the future of UI
programming on Apple platforms, and I am thrilled to witness, and be part of,
this transition.

[^1]: Part of me appreciates the prudent approach with regard to adopting new
    technology that’s yet to prove itself. Another part of me fails to see the
    point of swimming against the current in a predominantly closed platform
    where a single company gets to call the shots.
