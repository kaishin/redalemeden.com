---
date: 2020-09-29T10:59+02:00
title: "This Week I Learned #25"
category: learning
audience: "people interested in learning and metacognitive tools"
tags:
  - TWIL
---

Here are some of the things I learned this week, in the order I’ve noted them down. This one is a bit late, since I had to work this weekend in preparation for a busy week.

* The term _”bleeding edge”_ was first coined in the early 80s as a more extreme version of "cutting-edge" or "leading-edge" ([Source](https://www.contrast.app/posts/bleeding-edge-tech-means-youll-bleed-to-death)). You know that things are serious when blood is involved.

### Programming

* _Idempotence_ in the context of REST APIs refers to the ability to repeatedly call an endpoint without producing additional side effects on the server other than the ones produced by the first call ([Wikipedia](https://en.wikipedia.org/wiki/Idempotence), [link](https://restfulapi.net/idempotent-rest-apis/)). It’s typical for REST endpoints to be idempotent save for the ones using the `POST` HTTP method.
