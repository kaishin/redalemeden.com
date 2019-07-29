---
date: 2019-07-29T20:28+02:00
title: "SwiftUI: Early Lessons"
category: programming
draft: true
tags:
  - Swift
  - iOS
  - SwiftUI
---

*[Assumed Audience](https://www.chriskrycho.com/2018/assumed-audiences.html) 
--- Apple platform developers interested in using SwiftUI in their projects.*

We’ve been using SwiftUI to ship a non-trivial app at work---a bold move, but one that makes me like this job. Here are some key take-aways:

* Stick to standard navigation. As limited as the APIs are as of now, this will save you a lot of layout and accessibility headaches that come with custom transitions.

* Always investigate whether your UI can be implemented as a list view. It handles dynamic type, dark mode, and other accessibility features out of the box, and will likely look more polished than a shoddy  `ScrollView`/ `VStack` look-alike.

* Make good use of section headers and footers in `List`. Unlike `UITableView`, these are much easier to set up in SwiftUI's declarative syntax. They can be used for empty states, search fields, and sorting controls.

```swift
List {
  if (events.isEmpty) {
    Section(footer: Text("No events scheduled for today.")) {
      Button(action: { /* Add event */ }) {
        Text("Add a New Event")
      }
    }
  } else {
    Section {
      ForEach(events, id: \.id) { event in
        Text(event.title)
      }
    }
  }
}
```

* Embrace the current limitations of the framework. If you have to fight it at every turn to get the result you want, consider taking a different route where you don't have to do that. You can revisit the challenge later as the framework matures.

* Don’t use hard coded colors, i.e. the RGB initializer. Use system tint colors or asset catalogs instead. White and black are also to be avoided as they don't adapt to the appearance mode.[^1]

* Pay attention to the methods used to pass data down to and up from subviews. It’s easy to use the wrong method and the error won’t be very helpful. Understand the difference between `@State`, `@Binding`, `@ObservedObject`, `@EnvironmentObject`.

* Speaking of compiler errors, split your view hierarchy using variables, methods, and separate view structs to make the wide of the mark error messages slightly more relevant and helpful. It's brutal as of Beta 4, otherwise.

* Extract reoccurring view modifier chains into custom modifiers to DRY up the code.

* UIKit appearance helpers still work in SwiftUI. call them from within the `init()` method of the view when needed. For instance, this is the only method to remove the opaque background from a `List` as of now.

* Keep your cool and stay hydrated. 🥤

[^1]: As of this writing, SwiftUI doesn’t expose most of the new system colors introduced in iOS 13 as part of `UIKit`. I've written some helpers to glue the two worlds, but that could be the topic of another post.
