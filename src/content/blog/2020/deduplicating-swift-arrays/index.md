---
pubDate: Feb 28 2020
title: "Using Key Paths for Deduplicating Swift Arrays"
tags:
  - Programming
  - Tips
---

Today I needed to remove redundant elements from a Swift array based on the
value of a specific property. After some foraging, I came across [this
post](https://www.avanderlee.com/swift/unique-values-removing-duplicates-array/)
where Antoine extends `Sequence` to handle the more generic case of
deduplicating elements that conform to `Hashable`.

```swift
public extension Sequence where Iterator.Element: Hashable {
  func deduplicated() -> [Iterator.Element] {
    var seen = Set<Iterator.Element>()
    return filter { seen.insert($0).inserted }
  }
}
```

For my use case, I needed a bit more control over how the elements get
deduplicated. Since I am only interested in comparing a single property, I
resorted to key paths since they lend themselves quite well to this usage.

```swift
public extension Sequence {
  func deduplicated<T>(
    by keyPath: KeyPath<Iterator.Element, T>
  ) -> [Iterator.Element] where T: Hashable {
    var seen = [T: Iterator.Element]()

    return filter { element in
      let key = element[keyPath: keyPath]

      if seen[key] == nil {
        seen[key] = element
        return true
      } else {
        return false
      }
    }
  }
}
```

And here is an excerpt from the code where I am using this extension.

```swift
struct Game: Codable, Hashable {
  var name: String
  var releaseDates: [Date]
  /* ... */
}

/*
  The API reponse returns a list of non-unique games separated.
  by release date, but for this view we only want a single instance.
  of each game.
*/

let games: [Game] = /* ... */
let deduplicatedGames = games.deduplicated(by: \.name)

```

For the name, I chose to not go with `unique` because it describes the elements
of the sequence rather than the sequence itself. I instead took some hints from
Rust's similar-but-not-quite `Vec::dedup`.
