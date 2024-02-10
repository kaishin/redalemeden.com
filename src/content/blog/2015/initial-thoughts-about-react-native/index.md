---
pubDate: Mar 29 2015
title: "React Native: Initial Thoughts"
tags:
  - Programming
  - Web
audience: "iOS developers curious about React Native"
---

Facebook open-sourced [React Native](http://reactnative.com) last week, so I
spent a couple of days toying with it. Here are my initial thoughts, as someone
who works with both iOS and Web development:

### The Good

- *Immutable user interface*. You no longer have to track state in both the
  model and the view; the latter is a function of the former. As soon as the
  model changes, React Native re-renders a virtual tree of the view hierarchy,
  then applies the delta to the native views. This approach feels superior to
  bindings or <abbr title="Functional Reactive Programming">FRP</abbr>, and is certainly light-years ahead of the Apple-MVC that
  ships with iOS.

- *Instant feedback loop*. Once you build your app in Xcode, you can instantly
  refresh it from within the simulator using `Command + R`. You can even enable
  auto-refresh and forget about it. I will miss this feature in non-React
  projects.

- *Perceived performance*. I haven't experienced any hiccups while working on a
  simple navigation-based app. The interface is 100% native and performs like
  one.

## The Bad

- *JavaScript*.

- *No Swift support*. Native modules should be written in Objective-C.

- *Additional abstraction layer*. If you already do iOS development, you will be
  relearning a lot. For instance, `ListView` is the new `UITableView`.

- *SDK limitations*. Unless you want to subclass an unhealthy amount of `UIKit`
  using Objective-C (hint: I don't), you will be rather restrained in what you
  can do out-of-the-box. I have yet to figure out how to change the
  `barTintColor` of a `NavigatorIOS`, the `UINavigationBar` equivalent.

- *No Interface Builder support*. I typically use storyboards as a visual
  representation of user flow. Perhaps more importantly, I enjoy having the
  freedom of using the right tool for the job.

- *Component-based file structure*. Handling styles, view hierarchy, and
  business logic all in one file is a step backwards. Poor style reusability is
  one direct consequence of this approach.

- *`StyleSheet` is not CSS*. You will be quickly disappointed if you adventure
  outside of the handful CSS-inspired properties that React Native ships with.

- *Styling nested view controllers is a pain*. You are taken back to the root
  view controller after each refresh.

### The Meh

- *Flexbox*. The authors missed the opportunity of offering a better API and
  favored sticking to the official, confusing spec instead.

- *Chrome Dev Tools*. Browsers are doing too much already.

Even though a good number of these issues is very likely to be addressed as the
framework matures, I find the abstraction overhead off-putting considering the
current limitations. On the bright side, React Native introduces concepts that
could potentially change the way we build native applications, and I am looking
forward to seeing how that will unfold.
