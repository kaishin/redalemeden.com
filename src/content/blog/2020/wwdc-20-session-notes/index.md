---
pubDate: Jun 22 2020
title: "WWDC 2020: Session Notes"
audience: "my future self. Apple platform developers"
tags:
  - Programming
  - Notes
---

Instead of doing live reactions this year, I opted to jot down some notes during
the Keynote and the State of the Union and share them in one go. So here goes
nothing!

* The home screen and _springboard_ changes in iOS 14—_App Library_ and
  _Widgets_—are clearly going towards adjusting the cognitive load in order to
  better surface the information that matters to the user at any given time.
  Let's be honest, the icon grid has reached its peak usability almost a decade
  ago.

* Another area that got a lot of attention in iOS 14 are the different
  _interruptive modes_ in the user interface. In iOS 13 and earlier, receiving a
  phone call or activating _Siri_ takes over the entire screen, making them
  effectively separate _modes_ that interrupt the user flow. Starting iOS 14,
  these are replaced with lightweight overlays that preserve the current
  context.

* _App Clips_ are yet another aspect of evolving the _app_ paradigm to better
  fit real world usage scenarios—the other two that come to mind are widgets and
  extensions.

* The _context preservation_ theme is salient in this year’s iPadOS update; not
  surprising given that context might be even more important on a large screen
  where multiple things could be happening at the same time.

* The introduction of sidebars for in-app navigation in iPadOS 14 is another net
  win on the information density front. Sadly, _App Library_ and inline widgets
  seem to be missing from the first beta.

* I am very happy to see that pencil handwriting recognition works across the
  OS, supports Chinese characters (Kanji), and detects different languages in
  the same sentence. Alongside built-in translation, these are powerful new
  additions for language enthusiasts like myself. _Update_: It seems like
  Japanese is not supported in Beta 1. Bummer.

* The reason Apple didn’t spend time talking about the ability to change the
  default browser and email client on iOS 14 is simple: most consumers couldn’t
  care less. If anything, antitrust regulators might be more into this one.

* Built-in _tracking control_ in Safari is looking to be intuitive and will
  likely make the current crop of content blockers obsolete; nothing beats
  what’s already there by default.

* The macOS 11 Big Sur redesign is substantial. I have mixed feelings about
  different aspects, but I will leave that for later.

* Control Center and the new Notification Center on Big Sur are welcome imports
  from iOS. The open nature of the Mac always allowed power users to devise ways
  to surface the information that matters to them (such as menubar apps), but
  for the majority of users, this is an accessibility upgrade.

* The transition to ARM is going to be the first major architectural transition
  that I witness as an Apple platform developer. My main takeaway is that the
  timeline seems to be much more aggressive than anticipated.

* _WebExtensions_ API support in Safari is excellent news for people building
  browser extensions. For those not familiar, it's a standard way of developing
  cross-browser extensions, currently supported by both Mozilla and Google.

* On the subject of Safari, several features and improvements made their way in
  this release. I'm particularly excited about the CSS bits, such as support for
  the `:is()` pseudo-selector, system font families, and [CSS Shadow
  Parts](https://www.w3.org/TR/css-shadow-parts-1/)—a way to allow [Web
  Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) to
  expose internal elements to the outside for styling purposes. Oh and
  [WebP](https://en.wikipedia.org/wiki/WebP) support.

* As part of the [Web
  Authentication](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)
  API implementation in Safari, you can now use Face ID and Touch ID for user
  sign-in _on your Web apps_. You heard that right.

* The new SwiftUI app life cycle is nothing short of impressive. I have been
  upgrading all my unreleased apps to this new API—since it's iOS 14 only—and
  it's been eye-opening to see how far this declarative approach goes in getting
  rid of boilerplate.

* Contextual menus are now generalized in iOS and can be invoked from any button
  without requiring a long press or adding an overlay on top of the view. This
  is my favorite new addition to iOS this year—by far. Action sheets were always
  clunky to work with, and popovers felt off on the iPhone. It's worth noting
  that SwiftUI doesn't seem to have access to this new API as of this beta
  (Feedback: `FB7776866`).

* I am quite happy with all the `WKWebView` improvements that made it in this
  release. In particular, `callAsyncJavascript` will make bridging async JS and
  Swift a less painful affair. That said, some of these APIs, including the
  aforementioned, seem to be missing from the first beta.

* Core Data didn’t get the overhaul many of us were hoping for, but it gained
  some useful APIs to help with batch operations. I’ll take that.

* I am happy that we got a couple of sessions about unsafe Swift, an area that’s
  becoming increasingly important for those of us using Swift for server-side
  development (C library wrappers, database drivers, etc).

* Speaking of server-side, it’s refreshing to see a session about using Swift on
  AWS Lambda. Apple has a lot of leverage when it comes to adopting Swift on the
  server, and sessions like these are a good sign that they are invested, at
  least to a certain degree, in promoting that.
