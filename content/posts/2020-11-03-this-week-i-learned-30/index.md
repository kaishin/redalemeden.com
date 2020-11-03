---
title: "This Week I Learned #30"
date: 2020-11-03T22:28+01:00
category: learning
audience: people interested in learning and metacognitive tools
tags:
  - TWIL
draft: false
---
Here are some of the things I learned this week, in the order I’ve noted them down.

### 是が非でも

<ruby><rb>是</rb><rp>(</rp><rt>ぜ</rt><rp>)</rp></ruby>が<ruby><rb>非</rb><rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>でも  (_ze-ga-hi-demo_). To do something at any cost. No matter what. Similar to 是非とも. On its own, 是非 (_zehi_) refers to the pros (是) and cons (非) of something.

### The Streisand Effect

Refers to the phenomenon that happens when the act of trying to hide or censor certain information ends up having the opposite effect of spreading it even further ((wiki)[https://en.wikipedia.org/wiki/Streisand_effect]).

### CryptoKit & Swift Crypto

I needed to migrate a few lines of code from [CryptoKit](https://developer.apple.com/documentation/cryptokit) in a Mac app to [Swift Crypto](https://github.com/apple/swift-crypto) in a server-side service, and was pleasantly surprised when I realized that the two frameworks expose the same APIs, making for a hassle-free migration and a happy Swift developer.

### Testing Executable Swift Packages

Is it only me or executable Swift packages can't be tested in [SPM](https://swift.org/package-manager/) and Xcode? I haven’t tried in the CLI but I was getting all sorts of cryptic errors that only went away when I moved the code to a standalone library. I need to take a closer look into this to get a more complete understanding of what’s going on.

### The Actor Model

While trying to follow along the [Swift Concurrency Roadmap](https://forums.swift.org/t/swift-concurrency-roadmap/41611), I came across the concept of the [actor model](https://en.wikipedia.org/wiki/Actor_model) which, beside yielding some noteworthy image results in DuckDuckGo, seems to be a tried-and-true computation concurrency model that draws some inspiration from certain laws of physics. I have a ton more reading to do to actually understand any of this, but I'm looking forward to that.