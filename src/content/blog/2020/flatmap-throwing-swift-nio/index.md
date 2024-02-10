---
pubDate: Jul 17 2020
title: "On flatMapThrowing in SwiftNIO"
tags:
  - Programming
---

Johannes Weiss
[answering](https://github.com/apple/swift-nio/issues/1559#issuecomment-645932212)
the question why `flatMapThrowing`
([docs](https://apple.github.io/swift-nio/docs/current/NIO/Classes/EventLoopFuture.html#/s:3NIO15EventLoopFutureC15flatMapThrowing4file4line_ACyqd__Gs12StaticStringV_Suqd__xKctlF))
is not a throwing `flatMap`:

> Functions that have this prototype: `f() throws -> EventLoopFuture<Void>` are
> in my view a bit user hostile. They can fail in _two_ different ways: by
> throwing [and] by returning a failed future. That means a user needs to look
> for errors in two different places. […] On top of that: If an asynchronous
> function throws synchronously, is it really asynchronous?  

This one caught me off-guard more than once. Considering the signatures of `map`
and `flatmap` (abridged for brevity):

```swift
func map<NewValue>(callback: @escaping (Value) -> NewValue) -> EventLoopFuture<NewValue>
func flatMap<NewValue>(callback: @escaping (Value) -> EventLoopFuture<NewValue>) -> EventLoopFuture<NewValue>
```

It’s easy to assume that `flatMapThrowing`  is a version of `flatMap` that takes
a throwing closure of type `(Value) throws -> EventLoopFuture<NewValue>`. But
that’s not the case.

```swift
func flatMapThrowing<NewValue>(callback: @escaping (Value) throws -> NewValue) -> EventLoopFuture<NewValue>
```

As for the name of the method, Johannes explains:

> Lots of people get confused by this, if I could choose again, I’d probably go
> for something like `combineThrowing` or so?
