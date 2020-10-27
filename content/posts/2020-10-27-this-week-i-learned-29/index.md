---
date: 2020-10-27T11:03+01:00
title: "This Week I Learned #29"
category: learning
audience: people interested in learning and metacognitive tools
tags:
  - TWIL
draft: false
---

Here are some of the things I learned this week, in the order I’ve noted them down.

### Localized Errors in Swift

* In a typical [RTFM](https://en.wikipedia.org/wiki/RTFM) case, I just learned that [`localizedDescription`](https://developer.apple.com/documentation/swift/error/2292912-localizeddescription) was not defined in  `LocalizedError` like I've been incorrectly assuming.

* To make up for that, I am now more familiar with the properties that come with the [`LocalizedError`](https://developer.apple.com/documentation/foundation/localizederror) protocol and how to use each to improve error handling in both server and client apps.

### Sync and Async Error Handling

* Speaking of errors, dealing with synchronous errors using `do`/`catch` _alongside_ asynchronous ones in [SwiftNIO](https://github.com/apple/swift-nio) requires taking some special API design considerations. It's easy to fall into the trap of writing code that can both throw and return futures, thus requiring two forms of incompatible error handling. One possible, and rather straightforward, solution is to turn synchronous throws into failed futures that can be easily used in an async pipeline.

### Mongo & Swift

* I gave the official Mongo [driver](https://github.com/mongodb/mongo-swift-driver) for Swift a try and I am quite pleased with it. On the API-front, I have some quibbles with how it handles decoding errors for `Decodable` types, but I can live with those for now.
* I have mixed feelings about Mongo itself, but I appreciate not having to worry about schemas and migrations for every server app I am deploying. For certain micro-projects, the benefits of [NoSQL](https://en.wikipedia.org/wiki/NoSQL) far outweigh the drawbacks.

*[RTFM]: Read The F**king Manual
