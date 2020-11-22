---
date: 2020-11-22T22:22+01:00
title: "This Week I Learned #32"
category: learning
audience: people interested in learning and metacognitive tools
tags:
  - TWIL
draft: false
---

I have been rather busy during the past couple of weeks. While it's not much, here is what I learned since the last update.

### MeiliSearch & Swift

I learned a good deal about integrating [Vapor](https://vapor.codes) apps with [MeiliSearch](https://www.meilisearch.com), a lightweight alternative to ElasticSearch written in Rust. The bulk of the work consisted in writing a NIO-compatible API wrapper for MeiliSearch, since the [official one](https://github.com/meilisearch/meilisearch-swift) wasn’t meant to be used in server environments. I briefly considered using ElasticSearch, but I like the sound of a more focused library with a smaller footprint.

### Image GPT

GPT-2, the open-source predecessor to GPT-3, is perfectly capable of generating images when trained on pixel sequences ([paper](https://openai.com/blog/image-gpt/)). Here is [a project](https://github.com/MatthewRayfield/pokemon-gpt-2) that uses it to generate thousands of Pokémon-_like_ pixel illustrations. I am tempted to give this a go and see what fun applications I can come up with.
