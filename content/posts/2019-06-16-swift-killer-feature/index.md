---
date: 2019-06-18T09:05:50+01:00
title: "Swift's Killer Feature"
category: programming
tags:
  - Swift
  - Apple
---

*[Assumed Audience](https://www.chriskrycho.com/2018/assumed-audiences.html) --- App developers and designers woking on Apple platforms.*

Since its release 5 years ago,
Swift has matured a great deal as a programming language,
both in terms of stability and expressive power.
Its concise syntax and type safety have been largely celebrated within the Apple developer community,
and increasingly noticed outside of it.
But, as it is the case with similar transitions,
not everything is hunky-dory.

![SwiftUI](header-image.jpg)

In addition to the source breaking changes that soured the language earlier on,
Swift is often criticized for its lack of a clear use case vis-à-vis what was there before it (Cocoa and Objective-C),
and what came after it (JavaScript cross-platform frameworks).

Unfair as it may sound,
programming languages are often evaluated based on their ecosystem, not on their own merits.
In the eyes of many, Swift is indissociable from Apple and their platform frameworks,
for better or for worse.
Sadly, these two haven't played well together, and
their poor synergy have been brought up again and again in discussions about the appeal of Swift as a replacement for Objective-C.

Expressiveness and type safety can certainly keep a handful of enthusiastic developers engaged,
but it won’t be enough to sustain Swift’s momentum on the long run.
As much as some of us hate to admit,
the competition is colossal on the server and scripting side of things,
and it’s getting uncomfortably stronger on the native platform front.

The *write-preview-debug* development cycle that we’ve been dealt since the dawn of Cocoa is considered sluggish and tedious by today’s standards.
A liability that’s long overdue for reconsideration.
Adding to that, the platform-specific APIs haven’t converged fast enough either---we still need to implement half a dozen methods, per platform, to display a plain table view.

This state of affairs has pushed many to adventure outside first-party fences in search of more exotic alternatives, while the holdouts stuck to their ~~guns~~ bows and arrows in the absence of a clear-cut perk of leaving their tried-and-true programming language behind[^1].

But all of this is bound to change.

During this past WWDC, Apple introduced *[SwiftUI]*---a modern, universal framework for building user interfaces across their platforms.
I quite literally jumped out of bed when I saw the announcement; *this thing is packing quite a punch.*
It's declarative, reactive, and ready to take us places;
It's the killer feature that Swift needed.
The killer feature that Swift *deserved*.

[SwiftUI]: https://developer.apple.com/xcode/swiftui/

[^1]: Part of me appreciates the prudent approach with regard to adopting new technology that’s yet to prove itself. Another part of me fails to see the point of swimming against the current in a predominantly closed platform where a single company gets to call the shots.
