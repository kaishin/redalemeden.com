---
date: 2019-07-07T10:05:50+01:00
title: "SwiftUI Recipes: Empty States in List Sections"
category: programming
draft: true
tags:
  - Swift
  - SwiftUI
---

```swift
struct LiveView: View {
  var body: some View {
    List {
      Section(header:
        Text("Shaanaiwa".uppercased()),
              footer:
        VStack(alignment: .leading) {
          HStack {
            Image(systemName: "text.badge.plus")
            Text("There are no items for the time being.")
          }
          Button("Add More") {}
        }

      ) {
        EmptyView()
      }
    }
    .listStyle(.grouped)
  }
}
```
