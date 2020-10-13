---
title: "This Week I Learned #27"
date: 2020-10-13T23:01+02:00
category: learning
audience: people interested in learning and metacognitive tools
tags:
  - TWIL
draft: false
---
Here are some of the things I learned this week, in the order I’ve noted them down.

* 尻拭い (_shiri-nugui_). The literal meaning is "ass-wiping", but the figurative meaning is to _clean up somebody’s else mess_.

* 自業自得 (_jigou-jitoku_): Reap what you sow.

### Programming

* I have used SwiftUI’s `LazyVGrid` for the first time and I am quite pleased with the result. The API was easy to figure out, despite the lack of documentation, and the performance has been decent for my particular use case. I even managed to achieve an interesting visual effect by wrapping two lazy grids in a `ZStack`.

* In UI programming, working with states other than the happy path represents at least two thirds of the work. In particular, the transitions between success, error, and loading states take an inordinate amount of time to get right.