---
pubDate: Mar 27 2020
title: "Margin Considered Harmful"
tags:
  - Linklog
---

Max Stoiber on [using margins](https://mxstbr.com/thoughts/margin) in UI
components:

> Margin breaks component encapsulation. A well-built component should not
> affect anything outside itself.  

It’s very hard to disagree with this statement if you’ve been involved in any
capacity with creating reusable UI components. Baked-in margins can and will
hinder component reuse across different adaptive layouts.

A few years back, margins were the only way to create float-based grid layouts
in CSS. Today, [margin
gymnastics](https://redalemeden.com/microblog/post-1583342143001) are no longer
necessary.

> Instead of margin I have started using spacer components, which move the
> responsibility of managing space to the parent-level.  

Implementation details aside, delegating the spacing between adjacent items to
the wrapping component is the right approach. For instance, SwiftUI uses a
similar API to the one suggested in the blog post:

```swift
VStack(spacing: 8) {
  Text(”Item 1”)
  Text(”Item 2”)
  Text(”Item 3”)
}
```
