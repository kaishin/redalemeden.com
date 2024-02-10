---
pubDate: Aug 02 2019
title: "Early Lessons in Adopting SwiftUI"
tags:
  - Programming
audience: "Apple platform developers interested in using SwiftUI in their projects"
---

We've been using SwiftUI day in and day out since the first beta to build a
non-trivial app at work---a bold move, but one that makes me like my job. Here
are some lessons I've learnt:

* Stick to standard navigation. As unstable as the APIs are for the time being,
  this will spare you the layout and accessibility headaches that come with
  custom transitions.

* Always investigate whether your UI can be implemented as a list view. It
  handles dynamic type, dark mode, and other accessibility features out of the
  box, and will likely look more polished as a result.

* Make good use of section headers and footers in `List`. Unlike `UITableView`,
  these are much easier to set up in SwiftUI's declarative syntax. They can be
  used for empty states, search fields, sorting controls, etc.

* Embrace the current limitations of the framework. If you have to fight it at
  every turn to get the result you want, consider taking a different route where
  you don't have to do that. You can revisit the same challenge later as the
  framework matures.

* Don’t use hard coded colors, i.e. the RGB initializer. Use system tint colors
  or asset catalogs instead, and stay clear of white and black as they don't
  adapt to appearance modes.

* Pay attention to the methods used to pass data down to and up from subviews.
  It’s easy to use the wrong method and the error won’t be very helpful. Spend
  some time to understand the difference between `@State`, `@Binding`,
  `@ObservedObject`, and `@EnvironmentObject`.

* Speaking of compiler errors, split your view hierarchy using variables,
  methods, and separate view structs to make the wide of the mark error messages
  slightly more relevant and helpful.

* Extract reoccurring view modifier chains into custom modifiers to DRY up the
  code. It's a bit more work that I anticipated, but it's worth it.

* UIKit appearance helpers still work in SwiftUI. call them from within the
  `init()` method of the view when needed. For instance, this is the only method
  to remove the opaque background from a `List` as of now.

* SwiftUI is still very rough around the edges, so keep your cool and stay
  hydrated.🥤
