---
pubDate: Nov 06 2019
title: "Inset Grouped Lists in SwiftUI"
tags:
  - Programming
---

When SwiftUI shipped earlier this fall, it didn't provide any APIs to use the
newly introduced inset style for grouped lists and table views. The latest
release seems to have addressed that, albeit silently and not in the way that I
had expected.

As of iOS 13.2, grouped lists will use the inset style when the _horizontal size
class_ environment value is `.regular`, such is the case with fullscreen scenes
on iPad.

[![Grouped Lists](@images/microblog/image-1573080693649.png)](@images/microblog/image-1573080693649.png)

If you want to forcibly enable or disable this style, you have to manually set
the size class environment variable, preferably directly on your list to avoid
any unintended side effects:

```swift
List {
  Text("Item 1")
  Text("Item 2")
  Text("Item 3")
}.listStyle(GroupedListStyle())
// To enable the inset style
.environment(\.horizontalSizeClass, .regular)
// To disable the inset style
.environment(\.horizontalSizeClass, .compact)
```

While I am not aware of any issues caused by this approach, I'd have preferred
if Apple introduced a dedicated `InsetGroupedListStyle` or, even better, exposed
the underlying `ListStyle` protocol instead.
