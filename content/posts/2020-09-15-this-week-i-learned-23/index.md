---
date: 2020-09-15T01:23+02:00
title: "This Week I Learned #23"
category: learning
audience: "people interested in learning and metacognitive tools"
tags:
  - TWIL
---

Here are some of the things I learned this week, in the order I’ve noted them down.

* _Parochialism_  is a term used to describe situations where solutions to small, local problems come with no consideration of their effect on the whole ([wikipedia](https://en.wikipedia.org/wiki/Parochialism)).

* Daiji (大字) are alternative kanji numerals used on bank notes in China and Japan to reduce the risk of forgery. This is necessary given that many everyday kanji numerals can be turned into other numerals with few additional strokes ([link](https://www.sljfaq.org/afaq/banknote-numbers.html)).

### Programming

* [Brenda Storer](https://brendastorer.com) reminded me of the `ch` unit in CSS and how it can be effectively used in type-centric layouts. Thanks Brenda!

* I recently hit a wall with protocols in Swift; they can only be conformed to once, which presents a challenge in certain use cases. For instance, when creating reusable, model-agnostic views using protocols, every business logic model is limited to a single conformance. This constraint is problematic when the model can have more than one data mapping, depending on the context, screen, etc. To remedy this, I replaced protocols with value types, or "protocol witnesses", allowing me to create several data mappings between a given model and the view.
