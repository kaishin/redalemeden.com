---
title: A Feel-Good Refactor
pubDate: Feb 21 2021
audience: Combine developers or people curious about how I spend my Sunday mornings
tags:
  - Programming
---

If you are using Combine's `Just`, `Fail`, or `Result.publisher` as much as I do
to mock publishers for SwiftUI's previews and tests, chances are you have grown
tired of manually setting either the output or the failure types, then erasing
to `AnyPublisher` in every occurrence.

Today I decided that it was time to honor the rule of three (or _thirty eight_?)
and come up with something better. For one, we can heavily lean on Swift's [type inference](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#ID322)
to improve the API at the call site. And while we're at it, we can make it
easier to remember by using a similar syntax to handle both success and failure
scenarios.

Since the goal here to create a type-erased publisher that emits either a value
or an error then completes, we can call the helper _"once"_. As for the
implementation, we have a couple of options: define a static function on
`Publisher`, or create a custom `Publisher` type. Since the latter would still
require type-erasure at the call site, I chose to go with the former.

Let's start with the far more common value-emitting path.

```swift
public extension Publisher {
  static func once<T, U: Error>(
   _ value: T,
    failAs error: U.Type // 1
  ) -> AnyPublisher<T, U> {
    Just(value)
      .setFailureType(to: U.self)
      .eraseToAnyPublisher()
  }
}
```

This does the job, but having to specify the error type (1) every time takes
away some of the _feel-goodness_ of this solution. Luckily, Swift's type
inference comes to the rescue. Time for take 2!

```swift
static func once<T, U: Error>(
  _ value: T
) -> AnyPublisher<T, U> {
  Just(value)
    .setFailureType(to: U.self)
    .eraseToAnyPublisher()
}
```

The type of the return value should be enough to identify the publisher's
failure type. For cases where there isn't enough type information at the call
site, we can keep the first iteration around to avoid the need for explicit
types when assigning values—but that's purely a matter of preference.

With the happy path case behind us, let's do the same for the failure-emitting
case.

```swift
static func once<T, U: Error>( // 1
  failing error: U // 2
) -> AnyPublisher<T, U> {
  Fail(
    outputType: T.self,
    failure: error
  )
  .eraseToAnyPublisher()
}
```

I chose to keep the same method name (1) to streamline the API at the call site.
Unfortunately this means an additional keyword is needed to help the compiler
tell them apart. I went with `failing` (2) on the spur of the moment, but
anything would do the job. If call site uniformity is a non-goal, then using
`just`/`fail` to match the Combine publishers would be preferable.

As a parting bonus, we can throw in an additional helper for publishers where
the output value is `Void`; quite common for write operations and `PUT`/`DELETE`
endpoints.

```swift
static func once<U: Error>() -> AnyPublisher<Void, U> {
  once((), failAs: U.self)
}

static func once<U: Error>(
  failing error: U
) -> AnyPublisher<Void, U> {
  once(Void.self, failing: error)
}
```

Armed with these new tools, mocking publishers is now as easy as calling
`once()` and `once(failing:)` with the value or error respectively.

Here's an example from the codebase that prompted me to write this post:

```swift
let cache = Cache(
  upsert: { value in // -> AnyPublisher<Value, CachingError> 
    Just(value)
      .setFailureType(to: CachingError.self)
      .eraseToAnyPublisher()
  },
  deleteOutdated: { // -> AnyPublisher<Int, CachingError>
    Just(2)
      .setFailureType(to: CachingError.self)
      .eraseToAnyPublisher()
  },
  deleteAll: { // -> AnyPublisher<Int, CachingError>
    Fail(
      outputType: Int.self,
      failure: CachingError.nothingToDelete
    )
  }
)
```

And here is the same section after the refactor:

```swift
let cache = Cache(
  upsert: { .once($0) }, // (Item) -> AnyPublisher<Value, Error>
  deleteOutdated: { .once(2) }, // () -> AnyPublisher<Int, Error>
  deleteAll: { .once(failing: .nothingToDelete) } // () -> AnyPublisher<Int, Error>
)
```

Now, tell me which scores higher in the _feel-good_ department?
