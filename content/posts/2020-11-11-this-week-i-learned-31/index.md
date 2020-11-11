---
title: "This Week I Learned #31"
date: 2020-11-11T22:20+01:00
category: learning
audience: people interested in learning and metacognitive tools
tags:
  - TWIL
draft: false
---
Here are some of the things I learned this week, in the order I’ve noted them down.

### Chiasmus & Antimetabole

[This tweet](https://twitter.com/settern/status/1325255449982115840) by Serenity Caldwell taught me a new word: _chiasmus_. It's a literary device in which two or more clauses use similar words but in a reversed structure. While reading about it, I also came across another similar concept, _antimetabole_, which seems to be similar but with a subtle difference that I can't quite wrap my head around ([link](https://www.wisegeek.com/what-is-the-difference-between-chiasmus-and-antimetabole.htm)).

### Time Zones and Date Formatters in Swift

Every developer comes across a time zone bug some time during their career; and it was my turn last week. While using Swift's Foundation, I forgot to set the `timezone` property on the formatter that parses a string into a date, which resulted in different dates in the client and server apps. The fix was quite straightforward:

```swift
formatter.timeZone = TimeZone(identifier: "UTC")
```

### Core Data Concurrency

I finally decided to sit down and fix the myriad Core data issues that plagued my iOS app. I learned a ton regarding some APIs that I wasn't familiar with, including [`perform`/`performAndWait`](https://www.kairadiagne.com/2019/01/06/understanding-the-core-data-perform-methods.html), background contexts, and batch deletions. I recommend checking out [this blog](https://www.avanderlee.com/category/core-data/) to learn more about some of these topics.